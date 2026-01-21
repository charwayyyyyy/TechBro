import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AvatarItem {
  id: string;
  type: string;
  name: string;
  assetUrl: string;
  rarity: string;
  price: number;
}

interface UserState {
  xp: number;
  level: number;
  streak: number;
  hearts: number;
  gems: number;
  
  // Onboarding data
  dailyGoal: string; // 'casual' | 'regular' | 'serious' | 'insane'
  experienceLevel: string; // 'new' | 'beginner' | 'intermediate' | 'advanced'
  avatar: {
    skinColor: string;
    skinItem: AvatarItem | null;
    faceItem: AvatarItem | null;
    hairItem: AvatarItem | null;
    outfitItem: AvatarItem | null;
    accessoryItem: AvatarItem | null;
    backgroundItem: AvatarItem | null;
  };

  // Actions
  setDailyGoal: (goal: string) => void;
  setExperienceLevel: (level: string) => void;
  setAvatar: (avatar: Partial<UserState['avatar']>) => void;
  addXp: (amount: number) => void;
  setUser: (user: Partial<UserState> | ((state: UserState) => Partial<UserState>)) => void;
  decrementHeart: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      streak: 0,
      hearts: 5,
      gems: 0,
      dailyGoal: 'regular',
      experienceLevel: 'new',
      avatar: {
        skinColor: '#ffdbac',
        skinItem: null,
        faceItem: null,
        hairItem: null,
        outfitItem: null,
        accessoryItem: null,
        backgroundItem: null,
      },

      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      setExperienceLevel: (experienceLevel) => set({ experienceLevel }),
      setAvatar: (avatar) => set((state) => ({ avatar: { ...state.avatar, ...avatar } })),
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        // Simple leveling formula: Level * 100 XP required for next level
        // e.g. Level 1 needs 100 XP total to reach Level 2? 
        // Or Level 1 -> 2 needs 100 XP. Total XP is cumulative.
        // Let's say threshold is level * 100.
        const threshold = state.level * 100;
        let newLevel = state.level;
        if (newXp >= threshold) {
          newLevel = state.level + 1;
        }
        return { xp: newXp, level: newLevel };
      }),
      setUser: (userOrFn) => set((state) => {
        const user = typeof userOrFn === 'function' ? userOrFn(state) : userOrFn;
        return { ...state, ...user };
      }),
      decrementHeart: () => set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),
    }),
    {
      name: 'user-storage',
    }
  )
);
