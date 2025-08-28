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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAchievementsStore } from "@/stores/useAchievementsStore";
import { useUserStore } from "@/stores/useUserStore";

const profileSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  email: z.string().email("Please enter a valid email"),
  job_title: z
    .string()
    .max(100, "Job title must be 100 characters or less")
    .optional(),
  company: z
    .string()
    .max(100, "Company must be 100 characters or less")
    .optional(),
  avatar_url: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    company: "",
    avatar_url: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReminders, setWeeklyReminders] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileData, string>>
  >({});
  const router = useRouter();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Avatar must be less than 2MB.");
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        toast.error("Avatar must be JPG, PNG, or GIF.");
        return;
      }
      setAvatarFile(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    const result = profileSchema.safeParse(profileData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof ProfileData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ProfileData;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be signed in to update your profile.");
        return;
      }

      // Update auth email if changed
      // if (profileData.email !== user.email) {
      //   await supabase.auth.updateUser({ email: profileData.email });
      // }

      // Upload avatar if changed
      let avatar_url = null;
      if (avatarFile) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`public/${user.id}.jpg`, avatarFile, { upsert: true });
        if (error) {
          toast.error("Failed to upload avatar. Please try again.");
          setIsLoading(false);
          return;
        }
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("avatars")
          .getPublicUrl(`public/${user.id}.jpg`);
        avatar_url = publicUrl;
      }

      // Update profile data
      const { error: profileError } = await supabase
        .from("users")
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          email: profileData.email,
          job_title: profileData.job_title || null,
          company: profileData.company || null,
          avatar_url,
        })
        .eq("id", user.id);

      if (profileError) {
        toast.error("Failed to update profile. Please try again.");
        setIsLoading(false);
        return;
      }

      // Update preferences
      const { error: prefError } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          email_notifications: emailNotifications,
          weekly_reminders: weeklyReminders,
          public_profile: publicProfile,
        });

      if (prefError) {
        toast.error("Failed to update preferences. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Profile updated successfully!");
      setIsLoading(false);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

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

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.auth.admin.deleteUser(user.id);
      toast.success("Account deleted successfully.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Manage your account preferences and data
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Update your personal information and profile settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    user?.avatar_url || "/placeholder.svg?height=80&width=80"
                  }
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-semibold">
                  {user?.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatar"
                />
                <label htmlFor="avatar">
                  <Button variant="outline" className="rounded-xl" asChild>
                    <span>Change Photo</span>
                  </Button>
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-slate-900 dark:text-white"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="first_name"
                  value={user?.first_name}
                  onChange={handleProfileChange}
                  disabled={isLoading}
                  className={`rounded-xl border-2 transition-all ${
                    errors.first_name
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">{errors.first_name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-slate-900 dark:text-white"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="last_name"
                  value={user?.last_name}
                  onChange={handleProfileChange}
                  disabled={isLoading}
                  className={`rounded-xl border-2 transition-all ${
                    errors.last_name
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">{errors.last_name}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user?.email}
                onChange={() =>
                  toast.info("You are not allowed to change your email")
                }
                disabled
                className={`rounded-xl border-2 transition-all ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="jobTitle"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                Job Title
              </Label>
              <Input
                id="jobTitle"
                name="job_title"
                value={user?.job_title}
                onChange={handleProfileChange}
                disabled={isLoading}
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="company"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={user?.company}
                onChange={handleProfileChange}
                disabled={isLoading}
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700"
              />
            </div>

            <Button
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
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Configure how you want to be notified about your achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-slate-900 dark:text-white">
                  Email Notifications
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Receive email updates about your brag documentation
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-slate-900 dark:text-white">
                  Weekly Reminders
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Get reminded to log your weekly achievements
                </p>
              </div>
              <Switch
                checked={weeklyReminders}
                onCheckedChange={setWeeklyReminders}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-slate-900 dark:text-white">
                  Public Profile
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Allow others to view your achievement summary
                </p>
              </div>
              <Switch
                checked={publicProfile}
                onCheckedChange={setPublicProfile}
                disabled={isLoading}
              />
            </div>
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

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">
                    Automatic Backups
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Your data is automatically backed up weekly. Last backup:{" "}
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800 border-red-200 dark:border-red-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Irreversible actions that will permanently affect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800 ">
              <div className="flex flex-col md:items-center md:justify-between gap-4 md:flex-row">
                <div>
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="rounded-xl"
                  onClick={() => setConfirmDeleteModal(true)}
                  title="Delete Account"
                  aria-label="Delete Account"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {confirmDeleteModal && (
        <Dialog open={confirmDeleteModal} onOpenChange={setConfirmDeleteModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setConfirmDeleteModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
