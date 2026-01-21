"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "home", label: "Home", icon: "🏠", href: "/learn" },
  { id: "leagues", label: "Leagues", icon: "🏆", href: "/leagues" },
  { id: "feed", label: "Feed", icon: "👥", href: "/feed" },
  { id: "profile", label: "Profile", icon: "🎒", href: "/profile" },
  { id: "settings", label: "Settings", icon: "⚙️", href: "/settings" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4 pb-4 sm:max-w-lg">
      <div className="mx-auto flex h-16 items-center justify-between rounded-3xl bg-white/80 px-3 shadow-lg backdrop-blur">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/learn" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-all ${
                isActive
                  ? "text-sky-600"
                  : "text-slate-400 hover:text-sky-500"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all ${
                  isActive ? "bg-sky-100 shadow-sm" : "bg-transparent"
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
