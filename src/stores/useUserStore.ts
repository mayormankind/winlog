import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  company?: string;
  avatar_url?: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          if (authUser) {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", authUser.id)
              .single();
            if (error) throw error;
            set({ user: data, isLoading: false });
          } else {
            set({ user: null, isLoading: false, error: "No user found" });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch user",
            isLoading: false,
          });
        }
      },
      clearUser: () => set({ user: null, isLoading: false, error: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
