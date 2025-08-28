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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Plus,
  X,
  LinkIcon,
  Target,
  FileText,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Listdisc } from "@/components/ui/list-disc";

const categories = [
  "Performance",
  "Leadership",
  "Mentorship",
  "Quality Assurance",
  "Product",
  "Open Source",
  "Innovation",
  "Cost Savings",
  "Process Improvement",
];

const impactTypes = [
  "Time Saved",
  "Cost Reduction",
  "Revenue Increase",
  "User Growth",
  "Performance Improvement",
  "Quality Enhancement",
  "Team Development",
];

export default function NewBragPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [proofLinks, setProofLinks] = useState<string[]>([""]);
  const [customTag, setCustomTag] = useState("");

  const addProofLink = () => {
    setProofLinks([...proofLinks, ""]);
  };

  const removeProofLink = (index: number) => {
    setProofLinks(proofLinks.filter((_, i) => i !== index));
  };

  const updateProofLink = (index: number, value: string) => {
    const updated = [...proofLinks];
    updated[index] = value;
    setProofLinks(updated);
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const addCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag("");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Add New Brag
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Document your latest achievement with measurable impact
            </p>
          </div>
          <Link href="/brags">
            <Button variant="outline" className="rounded-xl">
              Cancel
            </Button>
          </Link>
        </div>

        {/* Tips Card */}
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Pro Tips for Great Brags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start">
                <Listdisc />
                Be specific with numbers and metrics (e.g., "reduced load time
                by 75%" vs "made it faster")
              </li>
              <li className="flex items-start">
                <Listdisc />
                Include the business impact and who benefited from your work
              </li>
              <li className="flex items-start">
                <Listdisc />
                Add proof like GitHub links, screenshots, or performance reports
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="border-0 shadow-lg rounded-2xl bg-indigo-50 dark:bg-slate-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Achievement Details
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Provide clear details about what you accomplished
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                Achievement Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Reduced API response time by 75%"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className="rounded-xl border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-900 dark:text-white">
                Category *
              </Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    type="button"
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className="rounded-xl"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                What did you do? *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the specific actions you took, technologies used, and approach..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="rounded-xl border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Impact */}
            <div className="space-y-2">
              <Label
                htmlFor="impact"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                What was the impact? *
              </Label>
              <Textarea
                id="impact"
                placeholder="Quantify the results: time saved, costs reduced, users affected, performance improvements..."
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                rows={3}
                className="rounded-xl border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Impact Type Suggestions */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-900 dark:text-white">
                Impact Type (optional)
              </Label>
              <div className="flex flex-wrap gap-2">
                {impactTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="outline"
                    className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => addTag(type)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proof Section */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <LinkIcon className="w-5 h-5 mr-2" />
              Proof & Evidence
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Add links to code, reports, screenshots, or other evidence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {proofLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://github.com/user/repo/pull/123 or description"
                  value={link}
                  onChange={(e: any) => updateProofLink(index, e.target.value)}
                  className="rounded-xl border-slate-200 dark:border-slate-700"
                />
                {proofLinks.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeProofLink(index)}
                    className="rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addProofLink}
              className="rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Proof
            </Button>
          </CardContent>
        </Card>

        {/* Tags Section */}
        <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Tags & Keywords
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Add tags to help organize and search your achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-indigo-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add Custom Tag */}
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e: any) => setCustomTag(e.target.value)}
                onKeyPress={(e: any) => e.key === "Enter" && addCustomTag()}
                className="rounded-xl border-slate-200 dark:border-slate-700"
              />
              <Button
                type="button"
                onClick={addCustomTag}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit Section */}
        <div className="flex justify-end space-x-4">
          <Link href="/brags">
            <Button variant="outline" className="rounded-xl">
              Cancel
            </Button>
          </Link>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
            <Save className="w-4 h-4 mr-2" />
            Save Brag
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
