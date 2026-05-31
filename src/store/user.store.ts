import { create } from "zustand";
import type { UserProfile } from "@/types";

interface UserStore {
  profile: UserProfile | null;
  isLoading: boolean;

  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  isLoading: false,

  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  clearProfile: () => set({ profile: null }),
}));
