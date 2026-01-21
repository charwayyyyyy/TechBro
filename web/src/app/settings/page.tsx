export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <h1 className="text-center text-lg font-bold text-slate-400">
          Settings
        </h1>
      </div>

      <div className="flex-1 space-y-6 px-4 py-6">
        <section>
          <h2 className="mb-3 text-lg font-bold text-slate-800">Account</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 active:bg-slate-50">
              <span className="font-medium text-slate-700">Edit Profile</span>
              <span className="text-slate-400">›</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 p-4 active:bg-slate-50">
              <span className="font-medium text-slate-700">Preferences</span>
              <span className="text-slate-400">›</span>
            </div>
            <div className="flex items-center justify-between p-4 active:bg-slate-50">
              <span className="font-medium text-slate-700">Notifications</span>
              <span className="text-slate-400">›</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-slate-800">Support</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 active:bg-slate-50">
              <span className="font-medium text-slate-700">Help Center</span>
              <span className="text-slate-400">›</span>
            </div>
            <div className="flex items-center justify-between p-4 active:bg-slate-50">
              <span className="font-medium text-slate-700">Feedback</span>
              <span className="text-slate-400">›</span>
            </div>
          </div>
        </section>

        <button className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 font-bold uppercase tracking-wide text-red-500 shadow-sm transition hover:bg-red-50 active:scale-95">
          Sign Out
        </button>
      </div>
    </div>
  );
}
