import { SkillTree } from "../components/skill-tree";

export default function Home() {
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
                <p className="text-3xl font-extrabold">20 XP</p>
                <p className="text-xs opacity-90">Complete 1 lesson to stay on track</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-2xl shadow-lg">
                🎯
              </div>
            </div>
          </div>

          <SkillTree />
        </section>
      </main>
    </div>
  );
}
