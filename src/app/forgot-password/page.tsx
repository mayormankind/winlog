"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  TrendingUp,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/change-password`,
      });
      toast.success("Account Password changed successfully");
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">

      {/* Back to Sign In */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/signin">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              variants={itemVariants}
            >
              <motion.div
                className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="text-2xl font-bold text-primary">
                WinLog
              </span>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                {isSuccess ? "Check Your Email" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-slate-600">
                {isSuccess
                  ? "We've sent a password reset link to your email"
                  : "Enter your email to receive a password reset link"}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isSuccess ? (
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-slate-600">
                  If an account with <strong>{email}</strong> exists, you'll
                  receive a password reset email shortly.
                </p>
                <Link href="/signin">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-semibold">
                    Back to Sign In
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={itemVariants}
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className={`pl-10 rounded-xl border-2 transition-all ${
                        error
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-primary"
                      }`}
                    />
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}

            {!isSuccess && (
              <motion.div className="text-center" variants={itemVariants}>
                <p className="text-sm text-slate-600">
                  Remember your password?{" "}
                  <Link
                    href="/signin"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
