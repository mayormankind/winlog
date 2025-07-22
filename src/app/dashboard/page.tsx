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

// Mock data for recent brags
const recentBrags = [
  {
    id: 1,
    title: "Reduced API Response Time by 75%",
    impact: "Improved user experience for 50K+ users",
    date: "2024-12-15",
    category: "Performance",
    proofCount: 2,
  },
  {
    id: 2,
    title: "Led Cross-Team Initiative for New Feature",
    impact: "Delivered 3 weeks ahead of schedule",
    date: "2024-12-10",
    category: "Leadership",
    proofCount: 4,
  },
  {
    id: 3,
    title: "Mentored 3 Junior Developers",
    impact: "All received positive performance reviews",
    date: "2024-12-05",
    category: "Mentorship",
    proofCount: 1,
  },
];

const stats = [
  {
    title: "Total Brags",
    value: "24",
    change: "+3 this month",
    icon: FileText,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Impact Score",
    value: "8.7/10",
    change: "+0.5 from last month",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Categories",
    value: "6",
    change: "Technical, Leadership, etc.",
    icon: Target,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "This Quarter",
    value: "12",
    change: "Strong performance period",
    icon: Award,
    color: "text-orange-600 dark:text-orange-400",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, John! 👋
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
          {stats.map((stat, index) => (
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
                {recentBrags.map((brag) => (
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
                        <span>{new Date(brag.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>
                          {brag.proofCount} proof
                          {brag.proofCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
