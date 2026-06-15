"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Mail, User, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import { toast, Toaster } from "sonner";

// Zod schema for form validation
const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof signUpSchema>;
type Errors = Partial<Record<keyof FormData, string>>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form with Zod
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Supabase email/password signup
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { username: formData.username },
        },
      });

      if (error) {
        toast.error(
          error.message || "Failed to create account. Please try again."
        );
        setIsLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from("users").insert({
          id: data.user.id,
          username: formData.username,
          email: formData.email,
        });

        toast.success(
          "Account created successfully! A verification email has been sent."
        );
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };


  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 h-full">
      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">
                WinLog
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-600">
              Start tracking your career wins today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div>
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-700"
                >
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    leftIcon={<User className="h-5 w-5" />}
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`rounded-xl border-2 transition-all ${
                      errors.username
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    leftIcon={<Mail className="h-5 w-5" />}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`rounded-xl border-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    leftIcon={<Key className="h-5 w-5" />}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 rounded-xl border-2 transition-all ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
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
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <p className="text-center text-xs text-slate-500 mt-6">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-slate-700"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-slate-700"
          >
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
