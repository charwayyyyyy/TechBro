export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <h1 className="text-center text-lg font-bold text-slate-400">
          Profile
        </h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-sky-100 bg-white text-6xl shadow-md">
            👨🏿‍💻
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Charway</h2>
          <p className="text-slate-500">Joined January 2026</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">🔥</div>
            <div className="text-xl font-bold text-slate-700">12</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Day Streak
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">⚡</div>
            <div className="text-xl font-bold text-slate-700">1,450</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Total XP
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="mb-1 text-2xl">💎</div>
            <div className="text-xl font-bold text-slate-700">Diamond</div>
            <div className="text-xs font-bold uppercase text-slate-400">
              Current League
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
