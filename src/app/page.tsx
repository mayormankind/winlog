"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  TrendingUp,
  Star,
  Sun,
  Moon,
  Sparkles,
  Brain,
  Download,
  Share,
  Zap,
  Target,
  Award,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import EnhancementModal from "@/components/modal/enhancement-modal";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [sampleAchievement, setSampleAchievement] = useState("");
  const [enhancedAchievement, setEnhancedAchievement] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancingModal, setEnhancingModal] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check for authenticated user and redirect to dashboard
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/dashboard");
      }
      setUser(user);
    };
    checkUser();
  }, [supabase, router]);

  const handleAIEnhancement = async () => {
    if (!sampleAchievement.trim()) return;
    setEnhancingModal(true);
    setIsEnhancing(true);
    // Simulate AI enhancement with xAI API
    setTimeout(() => {
      const enhanced = `Optimized database queries and implemented Redis caching for user authentication service, resulting in 75% reduction in API response time (from 2.4s to 600ms), improving user experience for 50,000+ daily active users and reducing server costs by $800/month. Delivered measurable performance improvements that directly impacted user satisfaction and operational efficiency.`;
      setEnhancedAchievement(enhanced);
      setIsEnhancing(false);
    }, 2000);
  };

  // const handleAIEnhancement = async () => {
  //   setIsEnhancing(true);
  //   try {
  //     const response = await fetch("https://api.x.ai/v1/text-generation", {
  //       // Replace with actual endpoint
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.XAI_API_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         prompt: `Enhance this achievement for a professional resume: ${sampleAchievement}`,
  //         max_tokens: 150,
  //       }),
  //     });
  //     const data = await response.json();
  //     setEnhancedAchievement(data.result || "Error enhancing achievement.");
  //   } catch (error) {
  //     setEnhancedAchievement(
  //       "Failed to enhance achievement. Please try again!"
  //     );
  //     console.error("xAI API error:", error);
  //   } finally {
  //     setIsEnhancing(false);
  //   }
  // };

  const shareOnX = (text: string) => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Head>
        <title>WinLog - Track Your Career Wins</title>
        <meta
          name="description"
          content="Document your achievements with AI-powered insights and export as PDF. Track Your Wins, Build Your Future."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WinLog - Track Your Career Wins" />
        <meta
          name="twitter:description"
          content="Document your achievements with AI-powered insights and export as PDF. #WinLog #BuildWithAI"
        />
        <meta property="og:title" content="WinLog - Track Your Career Wins" />
        <meta
          property="og:description"
          content="Document your achievements with AI-powered insights and export as PDF."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WinLog
                </span>
              </motion.div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-xl"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                      Sign Up
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative  w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-500/10 animate-pulse"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Badge className="mb-6 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Track Your Wins, Build Your Future
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Never forget your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
                  achievements
                </span>{" "}
                again
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Build a comprehensive record of your professional wins with AI
                enhancement.
                {/* Perfect for performance reviews, job interviews, */}
                {/* and career advancement. */}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/dashboard" className="min-">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all w-full"
                    >
                      Start Logging Wins
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>

                <Link href="#demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-8 py-4 font-semibold border-slate-300 dark:border-slate-600 bg-transparent w-full"
                  >
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                How it works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Four simple steps to build your AI-enhanced professional brag
                document
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto h-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 hover:shadow-xl transition-shadow min-h-80 gap-1 h-full">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      1. Log Your Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Turn "Optimized database" into a detailed entry with
                      specific metrics, timelines, and business impact.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 hover:shadow-xl transition-shadow gap-1 h-full">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      2. Review & Organize
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Organize achievements by impact, date, or category. Keep
                      everything searchable and accessible for quick retrieval.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 hover:shadow-xl transition-shadow gap-1 h-full">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      3. Promote Yourself
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Use documented wins for performance reviews, interviews,
                      and career advancement conversations.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 hover:shadow-xl transition-shadow gap-1 h-full">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      4. Powered by AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Our xAI integration refines achievements into compelling
                      narratives with quantified impact and professional
                      language.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits with Stats and Testimonials */}
        <section className="py-20 bg-gray-50 dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why professionals choose WinLog
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                Stop underselling yourself. Start documenting your impact with
                AI-powered insights.
              </p>

              {/* Key Stat */}
              <motion.div
                className="inline-block bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-2xl p-6 mb-12"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                  90%
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">
                  of professionals forget key achievements by year-end
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No More Forgotten Wins
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Capture achievements as they happen, so you never forget
                    your impact when review time comes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    AI-Enhanced Impact
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Transform basic achievements into compelling narratives with
                    quantified business impact using xAI.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    PDF Export Ready
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Export your wins as polished PDFs perfect for performance
                    reviews and job applications.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Career Advancement
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Build compelling cases for promotions, raises, and new
                    opportunities with data-driven achievements.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    "WinLog helped me ace my performance review! The AI
                    enhancement turned my basic notes into compelling
                    achievement stories."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      SK
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Sarah K.
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Software Engineer
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    "The PDF export feature is a game-changer. I now have a
                    professional document ready for any opportunity."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      MR
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Mike R.
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Product Manager
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* See It in Action with Interactive Demo */}
        <section id="demo" className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                See it in action
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Try our AI enhancement and see how WinLog transforms your
                achievements
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Interactive Demo Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-bold text-slate-900 dark:text-white">
                      <Zap className="w-5 h-5 mr-2 text-purple-600" />
                      Try AI Enhancement
                    </CardTitle>
                    <CardDescription>
                      Enter a basic achievement and see how our AI transforms it
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="achievement">Your Achievement</Label>
                      <Textarea
                        id="achievement"
                        placeholder="e.g., Improved app performance"
                        value={sampleAchievement}
                        onChange={(e) => setSampleAchievement(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={handleAIEnhancement}
                      disabled={isEnhancing || !sampleAchievement.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isEnhancing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-4 h-4 mr-2"
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          Enhancing with AI...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enhance with AI
                        </>
                      )}
                    </Button>
                    {/* {enhancedAchievement && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800"
                      >
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                          AI Enhanced Result:
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {enhancedAchievement}
                        </p>
                      </motion.div>
                    )} */}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Example Brag Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="pt-0 border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 text-white p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold mb-2">
                          Reduced API Response Time by 75%
                        </CardTitle>
                        <Badge className="bg-white/20 text-white border-white/30">
                          Performance Optimization
                        </Badge>
                      </div>
                      <span className="text-sm opacity-90">Dec 2024</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          What I did:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          Identified and optimized database queries in our user
                          authentication service, implemented Redis caching, and
                          refactored the API endpoints.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          Impact:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          Reduced average API response time from 2.4s to 600ms,
                          improving user experience for 50,000+ daily active
                          users and reducing server costs by $800/month.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          Proof:
                        </h4>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="outline" className="text-xs">
                            GitHub PR #1234
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Performance Report
                          </Badge>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Button
                          onClick={() =>
                            shareOnX(
                              "I logged a win with WinLog! 🚀 Reduced API response time by 75% and saved my company $800/month. #WinLog #BuildWithAI"
                            )
                          }
                          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                        >
                          <Share className="w-4 h-4 mr-2" />
                          Tweet Your Win
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to build your future?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Document, enhance, and export your wins for career success. Join
              thousands of professionals advancing their careers with AI-powered
              insights.
            </p>
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size={"lg"}
                  className="bg-white text-black hover:bg-gray-200 rounded-2xl px-8 md:w-1/4 py-4 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">WinLog</span>
                </div>
                <p className="text-slate-400 mb-4">
                  Track Your Wins, Build Your Future
                </p>
                <Button
                  onClick={() =>
                    shareOnX(
                      "Track your career wins with WinLog! AI-powered achievement tracking and PDF export. #WinLog #BuildWithAI"
                    )
                  }
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-600 dark:text-slate-300 hover:bg-slate-800"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share WinLog
                </Button>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <Link
                      href="/features"
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="hover:text-white transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#demo"
                      className="hover:text-white transition-colors"
                    >
                      Demo
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/winlog"
                      className="hover:text-white transition-colors"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <Link
                      href="/help"
                      className="hover:text-white transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://x.ai/api"
                      className="hover:text-white transition-colors"
                    >
                      xAI API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>
                &copy; 2024 WinLog. All rights reserved. Built with AI for the
                future of career growth.
              </p>
            </div>
          </div>
        </footer>
        {enhancingModal && (
          <EnhancementModal
            open={enhancingModal}
            onOpenChange={setEnhancingModal}
            achievement={enhancedAchievement}
            initial={sampleAchievement}
            loading={isEnhancing}
          />
        )}
      </div>
    </>
  );
}
