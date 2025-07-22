"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReminders, setWeeklyReminders] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  return (
    <DashboardLayout>
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
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" className="rounded-xl">
                  Change Photo
                </Button>
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
                  defaultValue="John"
                  className="rounded-xl border-slate-200 dark:border-slate-700"
                />
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
                  defaultValue="Doe"
                  className="rounded-xl border-slate-200 dark:border-slate-700"
                />
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
                type="email"
                defaultValue="john@example.com"
                className="rounded-xl border-slate-200 dark:border-slate-700"
              />
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
                defaultValue="Senior Software Engineer"
                className="rounded-xl border-slate-200 dark:border-slate-700"
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
                defaultValue="Tech Corp"
                className="rounded-xl border-slate-200 dark:border-slate-700"
              />
            </div>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
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
                  <Button variant="outline" className="w-full rounded-xl">
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
                  <Button variant="outline" className="w-full rounded-xl">
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
                    Your data is automatically backed up weekly. Last backup:
                    December 15, 2024
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
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" className="rounded-xl">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
