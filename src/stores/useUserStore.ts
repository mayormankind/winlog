import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
  email: string;
  username?: string;
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
            // Try to get user profile from users table
            const { data: profile, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", authUser.id)
              .single();
            
            if (profile) {
              set({ user: profile, isLoading: false });
            } else {
              // Fallback to auth user if profile doesn't exist yet
              const user: User = {
                id: authUser.id,
                email: authUser.email || "",
                username: authUser.user_metadata?.username || authUser.email?.split('@')[0],
                first_name: authUser.user_metadata?.first_name,
                last_name: authUser.user_metadata?.last_name,
                avatar_url: authUser.user_metadata?.avatar_url,
              };
              set({ user, isLoading: false });
            }
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
