"use client";

import { useUserStore } from "@/store/use-user-store";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { Edit2 } from "lucide-react";

export default function ProfilePage() {
  const { xp, streak, level, avatar, gems } = useUserStore();
  
  // Ensure avatar exists with defaults to prevent runtime errors
  const safeAvatar = avatar || {
    skinColor: '#ffdbac',
    skinItem: null,
    faceItem: null,
    hairItem: null,
    outfitItem: null,
    accessoryItem: null,
    backgroundItem: null,
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <h1 className="text-center text-lg font-bold text-slate-400">
          Profile
        </h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative mb-4">
            <UserAvatar 
              skinColor={safeAvatar.skinColor}
              skinItem={safeAvatar.skinItem}
              faceItem={safeAvatar.faceItem}
              hairItem={safeAvatar.hairItem}
              outfitItem={safeAvatar.outfitItem}
              accessoryItem={safeAvatar.accessoryItem}
              backgroundItem={safeAvatar.backgroundItem}
              size="xl"
            />
            <Link 
              href="/avatar"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white shadow-lg transition hover:bg-sky-400"
            >
              <Edit2 className="h-4 w-4" />
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900">User</h2>
          <p className="text-slate-500">Level {level}</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">🔥</div>
            <div className="text-xl font-bold text-slate-700">{streak}</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Day Streak
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">⚡</div>
            <div className="text-xl font-bold text-slate-700">{xp}</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Total XP
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">💎</div>
            <div className="text-xl font-bold text-slate-700">{gems}</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Gems
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">🥇</div>
            <div className="text-xl font-bold text-slate-700">3</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Top 3 Finishes
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Achievements</h3>
          <div className="rounded-2xl border border-slate-200 bg-white">
            {[
              { title: "Wildfire", desc: "Reach a 3 day streak", level: 1 },
              { title: "Sage", desc: "Earn 1000 XP", level: 2 },
              { title: "Scholar", desc: "Learn 50 new words", level: 1 },
            ].map((achievement, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-0"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-100 text-3xl">
                  🏅
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-700">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-slate-500">{achievement.desc}</p>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
