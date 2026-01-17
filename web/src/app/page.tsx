import { SkillTree } from "../components/skill-tree";

const tabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "leagues", label: "Leagues", icon: "🏆" },
  { id: "feed", label: "Feed", icon: "👥" },
  { id: "profile", label: "Profile", icon: "🎒" },
  { id: "settings", label: "Settings", icon: "⚙️" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const activeTab: TabId = "home";

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

      <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4 pb-4">
        <div className="mx-auto flex h-16 items-center justify-between rounded-3xl bg-white/80 px-3 shadow-lg backdrop-blur">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-all ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-400 hover:text-sky-500"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all ${
                    isActive
                      ? "bg-sky-100 shadow-sm"
                      : "bg-transparent"
                  }`}
                >
                  {tab.icon}
                </span>
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
