"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  FileText,
  Plus,
  Calendar,
  ExternalLink,
  Star,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUserStore } from "@/stores/useUserStore";
import { useAchievementsStore } from "@/stores/useAchievementsStore";
import { Toaster, toast } from "sonner";

export default function Dashboard() {
  const {
    user,
    isLoading: userLoading,
    error: userError,
    fetchUser,
  } = useUserStore();
  const {
    achievements,
    stats,
    isLoading: achievementsLoading,
    error: achievementsError,
    fetchAchievements,
  } = useAchievementsStore();

  useEffect(() => {
    fetchUser();
    fetchAchievements();
  }, [fetchUser, fetchAchievements]);

  useEffect(() => {
    if (userError) toast.error(userError);
    if (achievementsError) toast.error(achievementsError);
  }, [userError, achievementsError]);

  if (userLoading || achievementsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Loading...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
            <CardContent className="p-6 text-center">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Please sign in to view your dashboard.
              </p>
              <Link href="/signin">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user.first_name || user.username}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Here's what you've accomplished recently
            </p>
          </div>
          <Link href="/brags/new">
            <Button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add New Brag
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Brags",
              value: stats.totalBrags.toString(),
              change: "+3 this month",
              icon: FileText,
              color: "text-indigo-600 dark:text-indigo-400",
            },
            {
              title: "Impact Score",
              value: stats.impactScore,
              change: "+0.5 from last month",
              icon: TrendingUp,
              color: "text-emerald-600 dark:text-emerald-400",
            },
            {
              title: "Categories",
              value: stats.categories,
              change: "Technical, Leadership, etc.",
              icon: Target,
              color: "text-purple-600 dark:text-purple-400",
            },
            {
              title: "This Quarter",
              value: stats.thisQuarter.toString(),
              change: "Strong performance period",
              icon: Award,
              color: "text-orange-600 dark:text-orange-400",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-700 ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Brags */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      Recent Achievements
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      Your latest documented wins
                    </CardDescription>
                  </div>
                  <Link href="/brags">
                    <Button variant="outline" className="rounded-xl">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.length === 0 ? (
                  <p className="text-center text-slate-600 dark:text-slate-300">
                    No achievements yet. Add your first brag!
                  </p>
                ) : (
                  achievements.slice(0, 3).map((brag: any) => (
                    <div
                      key={brag.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          {brag.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {brag.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                        {brag.impact}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(brag.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>
                            {brag.proof_count} proof
                            {brag.proof_count !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/brags/new">
                  <Button className="w-full justify-start rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Brag
                  </Button>
                </Link>
                <Link href="/brags">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View All Brags
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Document achievements as they happen! Set a weekly reminder to
                  log your wins.
                </p>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
