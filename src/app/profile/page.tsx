"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  User,
  Bell,
  Download,
  Trash2,
  Save,
  FileText,
  Shield,
  Calendar,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    company: "",
    avatar_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    user,
    isLoading: userLoading,
    error: userError,
    fetchUser,
  } = useUserStore();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (user) {
  //       const { data: userData } = await supabase
  //         .from("users")
  //         .select("*")
  //         .eq("id", user.id)
  //         .single();
  //       const { data: preferences } = await supabase
  //         .from("user_preferences")
  //         .select("*")
  //         .eq("user_id", user.id)
  //         .single();

  //       if (userData) {
  //         setProfileData({
  //           first_name: userData.first_name || "",
  //           last_name: userData.last_name || "",
  //           email: userData.email || user.email || "",
  //           job_title: userData.job_title || "",
  //           company: userData.company || "",
  //           avatar_url: userData.avatar_url || "",
  //         });
  //       }
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleExportPDF = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      const { data: achievements } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id);

      const doc = new jsPDF();
      doc.text(`User: ${userData.first_name} ${userData.last_name}`, 10, 10);
      doc.text(`Achievements:`, 10, 20);
      if (achievements) {
        achievements.forEach((ach, i) => {
          doc.text(
            `${i + 1}. ${ach.title}: ${ach.description}`,
            10,
            30 + i * 10
          );
        });
      }
      const pdfBlob = doc.output("blob");
      await supabase.storage
        .from("backups")
        .upload(`pdf/${user.id}.pdf`, pdfBlob, { upsert: true });
      toast.success("PDF exported successfully!");
    } catch (error) {
      toast.error("Failed to export PDF. Please try again.");
    }
  };

  const handleExportJSON = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      const { data: preferences } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();
      const { data: achievements } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id);

      const json = JSON.stringify({
        user: userData,
        preferences,
        achievements,
      });
      const blob = new Blob([json], { type: "application/json" });
      await supabase.storage
        .from("backups")
        .upload(`json/${user.id}.json`, blob, { upsert: true });
      toast.success("Data exported successfully!");
    } catch (error) {
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            View your profile and see yourself for who you are.
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800 text-center md:text-left">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Update your personal information and profile settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-center md:justify-start space-x-6">
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={
                    profileData.avatar_url ||
                    "/placeholder.svg?height=80&width=80"
                  }
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-semibold">
                  {profileData.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl">
                {user?.first_name && user?.last_name
                  ? user?.first_name + " " + user?.last_name
                  : user?.username}
              </h1>
              {user?.job_title && user?.company && (
                // <p className="text-slate-500">
                <p>
                  <h2>
                    {user?.job_title} in {user?.company}
                  </h2>
                </p>
              )}
              <p className="text-slate-500">{user?.email}</p>
            </div>

            {/* <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button> */}
          </CardContent>
        </Card>

        {/* Export & Backup */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export & Backup
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Download your data and create backups of your achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-slate-200 dark:border-slate-700 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        PDF Report
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Professional summary
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={handleExportPDF}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 dark:border-slate-700 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        Data Backup
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Complete JSON export
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={handleExportJSON}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// here is my dashboard page: import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card";
//   import { Button } from "@/components/ui/button";
//   import { Badge } from "@/components/ui/badge";
//   import {
//     TrendingUp,
//     FileText,
//     Plus,
//     Calendar,
//     ExternalLink,
//     Star,
//     Target,
//     Award,
//   } from "lucide-react";
//   import Link from "next/link";
//   import { DashboardLayout } from "@/components/layout/dashboard-layout";

//   // Mock data for recent brags
//   const recentBrags = [
//     {
//       id: 1,
//       title: "Reduced API Response Time by 75%",
//       impact: "Improved user experience for 50K+ users",
//       date: "2024-12-15",
//       category: "Performance",
//       proofCount: 2,
//     },
//     {
//       id: 2,
//       title: "Led Cross-Team Initiative for New Feature",
//       impact: "Delivered 3 weeks ahead of schedule",
//       date: "2024-12-10",
//       category: "Leadership",
//       proofCount: 4,
//     },
//     {
//       id: 3,
//       title: "Mentored 3 Junior Developers",
//       impact: "All received positive performance reviews",
//       date: "2024-12-05",
//       category: "Mentorship",
//       proofCount: 1,
//     },
//   ];

//   const stats = [
//     {
//       title: "Total Brags",
//       value: "24",
//       change: "+3 this month",
//       icon: FileText,
//       color: "text-indigo-600 dark:text-indigo-400",
//     },
//     {
//       title: "Impact Score",
//       value: "8.7/10",
//       change: "+0.5 from last month",
//       icon: TrendingUp,
//       color: "text-emerald-600 dark:text-emerald-400",
//     },
//     {
//       title: "Categories",
//       value: "6",
//       change: "Technical, Leadership, etc.",
//       icon: Target,
//       color: "text-purple-600 dark:text-purple-400",
//     },
//     {
//       title: "This Quarter",
//       value: "12",
//       change: "Strong performance period",
//       icon: Award,
//       color: "text-orange-600 dark:text-orange-400",
//     },
//   ];

//   export default function Dashboard() {
//     return (
//       <DashboardLayout>
//         <div className="space-y-8">
//           {/* Welcome Section */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
//                 Welcome back, John! 👋
//               </h1>
//               <p className="text-slate-600 dark:text-slate-300 mt-2">
//                 Here's what you've accomplished recently
//               </p>
//             </div>
//             <Link href="/brags/new">
//               <Button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Brag
//               </Button>
//             </Link>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <Card
//                 key={index}
//                 className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
//                         {stat.title}
//                       </p>
//                       <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
//                         {stat.value}
//                       </p>
//                       <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
//                         {stat.change}
//                       </p>
//                     </div>
//                     <div
//                       className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-700 ${stat.color}`}
//                     >
//                       <stat.icon className="w-6 h-6" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Recent Brags */}
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
//                         Recent Achievements
//                       </CardTitle>
//                       <CardDescription className="text-slate-600 dark:text-slate-300">
//                         Your latest documented wins
//                       </CardDescription>
//                     </div>
//                     <Link href="/brags">
//                       <Button variant="outline" className="rounded-xl">
//                         View All
//                       </Button>
//                     </Link>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {recentBrags.map((brag) => (
//                     <div
//                       key={brag.id}
//                       className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
//                           {brag.title}
//                         </h3>
//                         <Badge variant="outline" className="text-xs">
//                           {brag.category}
//                         </Badge>
//                       </div>
//                       <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
//                         {brag.impact}
//                       </p>
//                       <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
//                         <div className="flex items-center space-x-2">
//                           <Calendar className="w-3 h-3" />
//                           <span>{new Date(brag.date).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <ExternalLink className="w-3 h-3" />
//                           <span>
//                             {brag.proofCount} proof
//                             {brag.proofCount !== 1 ? "s" : ""}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Quick Actions */}
//             <div className="space-y-6">
//               <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
//                     Quick Actions
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Link href="/brags/new">
//                     <Button className="w-full justify-start rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add New Brag
//                     </Button>
//                   </Link>
//                   <Link href="/brags">
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start rounded-xl"
//                     >
//                       <FileText className="w-4 h-4 mr-2" />
//                       View All Brags
//                     </Button>
//                   </Link>
//                   <Link href="/settings">
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start rounded-xl"
//                     >
//                       <ExternalLink className="w-4 h-4 mr-2" />
//                       Export Report
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>

//               <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
//                     Pro Tip
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
//                     Document achievements as they happen! Set a weekly reminder to
//                     log your wins.
//                   </p>
//                   <Button variant="outline" size="sm" className="rounded-xl">
//                     Set Reminder
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }
//   and as you can see, it is mostly filled with placeholder texts and dummy data. I want to use this opportunity to learn state management with zustand. So what do you think we can/ should do? If you were me, what approach would you follow?
