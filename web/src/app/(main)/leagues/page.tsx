"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { fetchClient } from "@/lib/api";
import { UserAvatar } from "@/components/user-avatar";
import { motion } from "framer-motion";

type LeagueEntry = {
  id: string;
  rank: number;
  xpThisWeek: number;
  user: {
    id: string;
    username: string;
    avatar: any;
  };
  isCurrentUser: boolean;
};

const LEAGUE_TIERS = [
  { name: "Bronze", color: "text-orange-700", bg: "bg-orange-100", border: "border-orange-200" },
  { name: "Silver", color: "text-slate-500", bg: "bg-slate-100", border: "border-slate-200" },
  { name: "Gold", color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-200" },
  { name: "Sapphire", color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" },
  { name: "Ruby", color: "text-red-600", bg: "bg-red-100", border: "border-red-200" },
  { name: "Emerald", color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200" },
  { name: "Diamond", color: "text-cyan-600", bg: "bg-cyan-100", border: "border-cyan-200" },
];

export default function LeaguesPage() {
  const [leaderboard, setLeaderboard] = useState<LeagueEntry[]>([]);
  const [currentLeague, setCurrentLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lbData, leagueData] = await Promise.all([
          fetchClient("/leagues/leaderboard"),
          fetchClient("/leagues/current"),
        ]);
        setLeaderboard(lbData);
        setCurrentLeague(leagueData);
      } catch (err) {
        console.error("Failed to load leagues", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-sky-50 text-sky-500">Loading...</div>;

  const tierInfo = LEAGUE_TIERS.find(t => t.name.toUpperCase() === currentLeague?.league?.tier) || LEAGUE_TIERS[0];

  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <h1 className="text-center text-lg font-bold text-slate-400">Leaderboards</h1>
      </div>

      <div className="flex-1 px-4 py-6">
        {/* League Header */}
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className={`mb-3 flex h-24 w-24 items-center justify-center rounded-2xl border-4 shadow-lg ${tierInfo.bg} ${tierInfo.border}`}>
            <span className="text-5xl">🏆</span>
          </div>
          <h2 className={`text-2xl font-black uppercase tracking-wide ${tierInfo.color}`}>
            {tierInfo.name} League
          </h2>
          <p className="text-sm font-semibold text-slate-400">
            Top 10 advance to the next league!
          </p>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {leaderboard.map((entry, index) => {
            const isPromotion = index < 10;
            const isDemotion = index > 25; // Example
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 border-b border-slate-100 p-3 last:border-0 ${
                  entry.isCurrentUser ? "bg-sky-50" : ""
                }`}
              >
                <div className={`flex w-8 justify-center font-bold ${
                  index < 3 ? "text-xl" : "text-slate-400"
                }`}>
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : entry.rank}
                </div>
                
                <div className="relative">
                  <UserAvatar 
                    skinColor={entry.user.avatar?.skinColor || '#f5d0c5'}
                    skinItem={entry.user.avatar?.skinItem}
                    faceItem={entry.user.avatar?.faceItem}
                    hairItem={entry.user.avatar?.hairItem}
                    outfitItem={entry.user.avatar?.outfitItem}
                    accessoryItem={entry.user.avatar?.accessoryItem}
                    backgroundItem={entry.user.avatar?.backgroundItem}
                    size="sm"
                  />
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold ${entry.isCurrentUser ? "text-sky-600" : "text-slate-700"}`}>
                    {entry.user.username}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-600">{entry.xpThisWeek} XP</span>
                </div>
              </motion.div>
            );
          })}
          
          {leaderboard.length === 0 && (
             <div className="p-8 text-center text-slate-400">
                No one here yet. Start learning to join the league!
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
