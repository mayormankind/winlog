"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Key,
  Mail,
  Moon,
  Sun,
  TrendingUp,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GoogleIcon } from "@/components/ui/google-icon";

export default function SignUpPage() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful signup
    }, 2000);
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false);
      // Handle Google signup
    }, 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center p-4 h-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-500/10"></div>

      {/* Theme Toggle */}
      <motion.div
        className="absolute top-6 right-6 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>

      {/* Back to Home */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              variants={itemVariants}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WinLog
              </span>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                Create Account
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Start tracking your career wins today
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-5">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={itemVariants}
            >
              {/* Username Field */}
              <div>
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  leftIcon={<User className="w-4 h-4" />}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`pl-10 rounded-xl border-2 transition-all ${
                    errors.username
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-purple-500"
                  }`}
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.username}
                </motion.p>
              )}

              {/* Email Field */}
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 rounded-xl border-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 dark:border-slate-700 focus:border-purple-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={"password"}
                    leftIcon={<Key className="w-4 h-4" />}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 rounded-xl border-2 transition-all ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 dark:border-slate-700 focus:border-purple-500"
                    }`}
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.password}
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Divider */}
            <motion.div className="relative" variants={itemVariants}>
              <Separator className="bg-slate-200 dark:bg-slate-700" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-slate-500 dark:text-slate-400">
                OR
              </span>
            </motion.div>

            {/* Google Sign Up */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="w-full rounded-xl py-3 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all bg-transparent"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <GoogleIcon className="w-5 h-5 mr-3" />
                    Continue with Google
                  </>
                )}
              </Button>
            </motion.div>

            {/* Sign In Link */}
            <motion.div className="text-center" variants={itemVariants}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Terms */}
        <motion.p
          className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-slate-700 dark:hover:text-slate-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-slate-700 dark:hover:text-slate-300"
          >
            Privacy Policy
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
