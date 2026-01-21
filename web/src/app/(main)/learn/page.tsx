"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { fetchClient } from "@/lib/api";
import { SkillTree } from "@/components/skill-tree";

type Course = {
  id: string;
  language: string;
  difficulty: string;
  lessons: {
    id: string;
    title: string;
    position: number;
    completed?: boolean;
  }[];
};

export default function Home() {
  const router = useRouter();
  const { xp, setUser } = useUserStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/onboarding");
      return;
    }

    const loadData = async () => {
      try {
        const [user, allCourses] = await Promise.all([
          fetchClient("/auth/profile"),
          fetchClient("/lessons/courses"),
        ]);
        setUser(user);
        setCourses(allCourses);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router, setUser]);

  if (loading) {
     return <div className="flex min-h-screen items-center justify-center bg-sky-50 text-sky-600">Loading...</div>;
  }

  const activeCourse = courses[0]; // Default to first course

  return (
    <div className="flex min-h-screen flex-col bg-sky-50">
      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
              Welcome to TechBro
            </p>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Learn to code. Compete. Level up.
            </h1>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-xl shadow-inner">
            🔥
          </div>
        </header>

        <section className="space-y-3">
          <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-4 text-white shadow-md">
            <p className="text-sm font-medium">Daily goal</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-3xl font-extrabold">{xp} XP</p>
                <p className="text-xs opacity-90">Complete 1 lesson to stay on track</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-2xl shadow-lg">
                🎯
              </div>
            </div>
          </div>

          <SkillTree course={activeCourse} />
        </section>
      </main>
    </div>
  );
}
