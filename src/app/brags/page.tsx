"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Calendar,
  ExternalLink,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  Code,
  Award,
  Target,
  Eye,
  X,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAchievementsStore } from "@/stores/useAchievementsStore";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categoryIcons: Record<string, React.ElementType> = {
  Performance: TrendingUp,
  Leadership: Users,
  Mentorship: Award,
  "Quality Assurance": Target,
  Product: Eye,
  "Open Source": Code,
};

const categoryColors: Record<string, string> = {
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
  const router = useRouter();
  const {
    achievements,
    isLoading,
    error,
    fetchAchievements,
    deleteAchievement,
  } = useAchievementsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const allCategories = useMemo(
    () => [...new Set(achievements.map((a) => a.category).filter(Boolean))],
    [achievements]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return achievements.filter((a) => {
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        (a.description ?? "").toLowerCase().includes(q) ||
        a.impact.toLowerCase().includes(q) ||
        (a.tags ?? []).some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !activeCategory || a.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [achievements, searchQuery, activeCategory]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteAchievement(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
    toast.success("Achievement deleted.");
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
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

        {/* Search */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search achievements by title, description, or tag…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-slate-200 dark:border-slate-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {allCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
                    !activeCategory
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  All
                </button>
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                    className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              {searchQuery || activeCategory
                ? "No achievements match your search."
                : "No achievements yet. Add your first brag!"}
            </p>
            {!searchQuery && !activeCategory && (
              <Link href="/brags/new">
                <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Brag
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Brags Grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid gap-6">
            {filtered.map((brag) => {
              const IconComponent = categoryIcons[brag.category] || Target;
              const categoryColor =
                categoryColors[brag.category] || "bg-gray-100 text-gray-800";

              return (
                <Card
                  key={brag.id}
                  className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 shrink-0">
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
                      <div className="flex items-center space-x-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl"
                          title="Edit Achievement"
                          aria-label="Edit Achievement"
                          onClick={() =>
                            router.push(`/brags/new?edit=${brag.id}`)
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          title="Delete Achievement"
                          aria-label="Delete Achievement"
                          onClick={() => setDeleteId(brag.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {brag.description && (
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          What I did:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {brag.description}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Impact:
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {brag.impact}
                      </p>
                    </div>

                    {brag.proofs && brag.proofs.length > 0 && (
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
                    )}

                    {brag.tags && brag.tags.length > 0 && (
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
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Delete Achievement</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              achievement from your records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setDeleteId(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
