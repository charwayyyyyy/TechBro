export default function LeaguesPage() {
  const users = [
    { rank: 1, name: "Charway", xp: 1250, avatar: "👨🏿‍💻" },
    { rank: 2, name: "Sarah", xp: 1100, avatar: "👩🏻‍💻" },
    { rank: 3, name: "David", xp: 950, avatar: "👨🏼‍💻" },
    { rank: 4, name: "Jessica", xp: 800, avatar: "👩🏾‍💻" },
    { rank: 5, name: "Michael", xp: 750, avatar: "👨🏻‍💻" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <h1 className="text-center text-lg font-bold text-slate-400">
          Diamond League
        </h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-sky-100 text-6xl shadow-inner">
            💎
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-700">Diamond League</h2>
            <p className="text-sm font-medium text-slate-400">
              Top 10 advance to the next league
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {users.map((user, index) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-0 ${
                index < 3 ? "bg-sky-50/50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`font-bold ${
                    index === 0
                      ? "text-yellow-500"
                      : index === 1
                      ? "text-slate-400"
                      : index === 2
                      ? "text-orange-400"
                      : "text-slate-700"
                  }`}
                >
                  {user.rank}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
                    {user.avatar}
                  </div>
                  <span className="font-bold text-slate-700">{user.name}</span>
                </div>
              </div>
              <span className="font-medium text-slate-500">{user.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
