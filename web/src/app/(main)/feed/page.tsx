"use client";

import { useEffect, useState } from "react";
import { fetchClient } from "@/lib/api";
import { UserAvatar } from "@/components/user-avatar";
import { formatDistanceToNow } from "date-fns";

type FeedEvent = {
  id: string;
  type: 'LESSON_COMPLETED' | 'ACHIEVEMENT_UNLOCKED' | 'LEAGUE_PROMOTION' | 'STREAK_MILESTONE';
  payload: any;
  createdAt: string;
  user: {
    username: string;
    avatar?: any;
  };
};

export default function FeedPage() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchClient("/feed");
        setEvents(data);
      } catch (err) {
        console.error("Failed to load feed", err);
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  const getEventText = (event: FeedEvent) => {
    switch (event.type) {
      case 'LESSON_COMPLETED':
        return `completed a lesson!`;
      case 'ACHIEVEMENT_UNLOCKED':
        return `unlocked the ${event.payload.achievementName || 'Unknown'} achievement!`;
      case 'LEAGUE_PROMOTION':
        return `was promoted to ${event.payload.leagueTier || 'a new'} League!`;
      case 'STREAK_MILESTONE':
        return `reached a ${event.payload.days || 0} day streak! 🔥`;
      default:
        return "did something cool!";
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-sky-50 text-sky-500">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <h1 className="text-center text-lg font-bold text-slate-700">Feed</h1>
      </div>

      <div className="flex-1 space-y-4 px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-bold text-slate-700">
            Find Friends
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            See how your friends are doing and compete with them!
          </p>
          <button className="w-full rounded-xl bg-sky-500 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-sky-600 active:scale-95">
            Find Friends
          </button>
        </div>

        {events.length === 0 ? (
           <div className="text-center text-slate-400 py-10">
             No recent activity. Time to learn!
           </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="h-12 w-12 flex-shrink-0">
                  <UserAvatar 
                    size="sm"
                    skinColor={event.user.avatar?.skinColor || "#fca"}
                    skinItem={event.user.avatar?.skinItem}
                    faceItem={event.user.avatar?.faceItem}
                    hairItem={event.user.avatar?.hairItem}
                    outfitItem={event.user.avatar?.outfitItem}
                    accessoryItem={event.user.avatar?.accessoryItem}
                    backgroundItem={event.user.avatar?.backgroundItem}
                  />
                </div>
                <div>
                  <p className="font-bold text-slate-700">
                    {event.user.username}{" "}
                    <span className="font-medium text-slate-500">
                      {getEventText(event)}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {/* Simple relative time fallback since we don't have date-fns installed yet? 
                        Actually let's check package.json or just use simple js */}
                    {new Date(event.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-3">
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-sky-500">
                  <span>👏</span>
                  <span>0</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
