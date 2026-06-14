import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

export interface Achievement {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  impact: string;
  date: string;
  category: string;
  proof_count: number;
  proofs?: string[];
  tags?: string[];
}

interface Stats {
  totalBrags: number;
  impactScore: string;
  categories: string;
  thisQuarter: number;
}

interface AchievementsState {
  achievements: Achievement[];
  stats: Stats;
  isLoading: boolean;
  error: string | null;
  fetchAchievements: () => Promise<void>;
  addAchievement: (
    achievement: Omit<Achievement, "id" | "user_id">
  ) => Promise<void>;
  updateAchievement: (
    id: string,
    achievement: Partial<Omit<Achievement, "id" | "user_id">>
  ) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
}

function calculateImpactScore(data: Achievement[]): string {
  if (!data.length) return "0/10";
  let total = 0;
  for (const a of data) {
    let score = 4;
    if (a.description && a.description.trim().length > 20) score += 1;
    if (/\d+/.test(a.impact)) score += 2;
    if (a.proof_count > 0 || (a.proofs && a.proofs.length > 0)) score += 2;
    if (a.tags && a.tags.length > 0) score += 1;
    total += Math.min(score, 10);
  }
  return (total / data.length).toFixed(1) + "/10";
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
  achievements: [],
  stats: {
    totalBrags: 0,
    impactScore: "0/10",
    categories: "0",
    thisQuarter: 0,
  },
  isLoading: false,
  error: null,
  fetchAchievements: async () => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (error) throw error;

      const totalBrags = data.length;
      const impactScore = calculateImpactScore(data);
      const categories =
        [...new Set(data.map((a) => a.category))].join(", ") || "None";
      const startOfQuarter = new Date();
      startOfQuarter.setMonth(
        startOfQuarter.getMonth() - (startOfQuarter.getMonth() % 3)
      );
      startOfQuarter.setDate(1);
      const thisQuarter = data.filter(
        (a) => new Date(a.date) >= startOfQuarter
      ).length;

      set({
        achievements: data,
        stats: { totalBrags, impactScore, categories, thisQuarter },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch achievements",
        isLoading: false,
      });
    }
  },
  addAchievement: async (achievement) => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("achievements")
        .insert({ ...achievement, user_id: user.id });
      if (error) throw error;

      await get().fetchAchievements();
    } catch (error: any) {
      set({
        error: error.message || "Failed to add achievement",
        isLoading: false,
      });
    }
  },
  updateAchievement: async (id, achievement) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from("achievements")
        .update(achievement)
        .eq("id", id);
      if (error) throw error;

      await get().fetchAchievements();
    } catch (error: any) {
      set({
        error: error.message || "Failed to update achievement",
        isLoading: false,
      });
    }
  },
  deleteAchievement: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from("achievements")
        .delete()
        .eq("id", id);
      if (error) throw error;

      set((state) => ({
        achievements: state.achievements.filter((a) => a.id !== id),
        isLoading: false,
      }));
      await get().fetchAchievements();
    } catch (error: any) {
      set({
        error: error.message || "Failed to delete achievement",
        isLoading: false,
      });
    }
  },
}));
