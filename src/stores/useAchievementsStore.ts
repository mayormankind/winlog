import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface Achievement {
  id: string;
  user_id: string;
  title: string;
  impact: string;
  date: string;
  category: string;
  proof_count: number;
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

      // Calculate stats
      const totalBrags = data.length;
      const impactScore = data.length
        ? (
            data.reduce((sum, a) => sum + (a.proof_count || 1), 0) / data.length
          ).toFixed(1) + "/10"
        : "0/10";
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

      // Refetch achievements to update state
      get().fetchAchievements();
    } catch (error: any) {
      set({
        error: error.message || "Failed to add achievement",
        isLoading: false,
      });
    }
  },
}));
