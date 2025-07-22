"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Users,
  Code,
  Award,
  Target,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

// Mock data for brags
const brags = [
  {
    id: 1,
    title: "Reduced API Response Time by 75%",
    description:
      "Identified and optimized database queries in our user authentication service, implemented Redis caching, and refactored the API endpoints.",
    impact:
      "Reduced average API response time from 2.4s to 600ms, improving user experience for 50,000+ daily active users and reducing server costs by $800/month.",
    category: "Performance",
    date: "2024-12-15",
    proofs: ["GitHub PR #1234", "Performance Report"],
    tags: ["Backend", "Optimization", "Cost Savings"],
  },
  {
    id: 2,
    title: "Led Cross-Team Initiative for New Feature",
    description:
      "Coordinated with design, product, and QA teams to deliver a new user dashboard feature that had been requested by 40% of our user base.",
    impact:
      "Delivered 3 weeks ahead of schedule, resulting in 25% increase in user engagement and 15% reduction in support tickets.",
    category: "Leadership",
    date: "2024-12-10",
    proofs: ["Project Timeline", "User Metrics", "Team Feedback", "Demo Video"],
    tags: ["Project Management", "Cross-functional", "User Experience"],
  },
  {
    id: 3,
    title: "Mentored 3 Junior Developers",
    description:
      "Provided weekly 1:1 mentoring sessions, code reviews, and career guidance to three junior developers on the team.",
    impact:
      "All three mentees received positive performance reviews and one was promoted to mid-level developer.",
    category: "Mentorship",
    date: "2024-12-05",
    proofs: ["Performance Reviews"],
    tags: ["Mentoring", "Team Development", "Knowledge Sharing"],
  },
  {
    id: 4,
    title: "Implemented Automated Testing Suite",
    description:
      "Built comprehensive end-to-end testing framework using Cypress and integrated it into our CI/CD pipeline.",
    impact:
      "Reduced manual testing time by 60% and caught 15+ critical bugs before production deployment.",
    category: "Quality Assurance",
    date: "2024-11-28",
    proofs: ["GitHub Repository", "Test Coverage Report"],
    tags: ["Testing", "Automation", "DevOps"],
  },
  {
    id: 5,
    title: "Redesigned User Onboarding Flow",
    description:
      "Collaborated with UX team to redesign the user onboarding process based on user feedback and analytics.",
    impact:
      "Increased user completion rate from 45% to 78% and reduced time-to-first-value by 40%.",
    category: "Product",
    date: "2024-11-20",
    proofs: ["Analytics Dashboard", "A/B Test Results", "User Feedback"],
    tags: ["UX", "Product Design", "User Research"],
  },
  {
    id: 6,
    title: "Open Source Contribution",
    description:
      "Contributed a major feature to a popular React library used by our team, fixing a long-standing issue.",
    impact:
      "Feature was merged and is now used by 10,000+ developers. Improved our team's development velocity by 20%.",
    category: "Open Source",
    date: "2024-11-15",
    proofs: ["GitHub PR", "Community Feedback"],
    tags: ["Open Source", "React", "Community"],
  },
];

const categoryIcons = {
  Performance: TrendingUp,
  Leadership: Users,
  Mentorship: Award,
  "Quality Assurance": Target,
  Product: Eye,
  "Open Source": Code,
};

const categoryColors = {
  Performance:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  Leadership:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  Mentorship:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Quality Assurance":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Product: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "Open Source":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export default function BragsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Brags
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Track and manage your professional achievements
            </p>
          </div>
          <Link href="/brags/new">
            <Button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add New Brag
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search your achievements..."
                  className="pl-10 rounded-xl border-slate-200 dark:border-slate-700"
                />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Brags Grid */}
        <div className="grid gap-6">
          {brags.map((brag) => {
            const IconComponent =
              categoryIcons[brag.category as keyof typeof categoryIcons] ||
              Target;
            const categoryColor =
              categoryColors[brag.category as keyof typeof categoryColors] ||
              "bg-gray-100 text-gray-800";

            return (
              <Card
                key={brag.id}
                className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700">
                          <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <Badge className={`${categoryColor} border-0`}>
                          {brag.category}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(brag.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {brag.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      What I did:
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {brag.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Impact:
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {brag.impact}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Proof:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brag.proofs.map((proof, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {proof}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {brag.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="rounded-xl">
            Load More Brags
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
