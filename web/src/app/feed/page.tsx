export default function FeedPage() {
  const updates = [
    {
      id: 1,
      user: "Charway",
      avatar: "👨🏿‍💻",
      action: "completed the Python Basics course!",
      time: "2h ago",
      reactions: 5,
    },
    {
      id: 2,
      user: "Sarah",
      avatar: "👩🏻‍💻",
      action: "reached a 7 day streak! 🔥",
      time: "4h ago",
      reactions: 12,
    },
    {
      id: 3,
      user: "David",
      avatar: "👨🏼‍💻",
      action: "joined the Diamond League",
      time: "1d ago",
      reactions: 3,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <h1 className="text-center text-lg font-bold text-slate-400">Feed</h1>
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

        {updates.map((update) => (
          <div
            key={update.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
                {update.avatar}
              </div>
              <div>
                <p className="font-bold text-slate-700">
                  {update.user}{" "}
                  <span className="font-medium text-slate-500">
                    {update.action}
                  </span>
                </p>
                <p className="text-xs text-slate-400">{update.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-3">
              <button className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-sky-500">
                <span>👏</span>
                <span>{update.reactions}</span>
              </button>
              <button className="text-sm font-bold text-slate-400 hover:text-sky-500">
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
