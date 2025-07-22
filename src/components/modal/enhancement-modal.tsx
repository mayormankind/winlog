import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface EnhancementModalProps {
  achievement: string;
  initial: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
}

export default function EnhancementModal({
  open,
  onOpenChange,
  achievement,
  initial,
  loading,
}: EnhancementModalProps) {
  console.log(initial);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            AI-Powered Achievement Enhancement
          </DialogTitle>
          <DialogDescription>
            See how our xAI integration transforms basic achievements into
            compelling career stories.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-red-200 dark:border-red-800 gap-1">
              <CardHeader>
                <CardTitle className="text-sm text-red-600 dark:text-red-400">
                  Before (Basic)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {initial}
                  {/* "Improved app performance" */}
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200 dark:border-green-800 gap-1">
              <CardHeader>
                <CardTitle className="text-sm text-green-600 dark:text-green-400">
                  After (AI Enhanced)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="m-auto text-center">
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    <p className="animate-pulse">Loading...</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {achievement}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
