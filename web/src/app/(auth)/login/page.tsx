"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const data = await fetchClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      localStorage.setItem("token", data.access_token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    try {
      const data = await fetchClient("/auth/demo", {
        method: "POST",
      });
      localStorage.setItem("token", data.access_token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login as demo user");
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would redirect to OAuth provider
    // For now, we simulate a login or show a message
    alert(`This would redirect to ${provider} OAuth flow. Please use the Demo Account to see the full experience!`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 p-4">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Login to continue your streak!
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-bold text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button 
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
             Continue with Google
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('GitHub')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
             <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-5 w-5" />
             Continue with GitHub
          </button>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="mx-4 flex-shrink-0 text-xs font-bold uppercase text-slate-400">or email</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold uppercase text-slate-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3 font-medium text-slate-800 outline-none focus:border-sky-400 focus:bg-white transition"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold uppercase text-slate-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3 font-medium text-slate-800 outline-none focus:border-sky-400 focus:bg-white transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-500 py-3 font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-sky-600 active:scale-95 active:shadow-sm"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full rounded-xl bg-purple-500 py-3 font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-purple-600 active:scale-95 active:shadow-sm"
          >
            Try Demo Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm font-bold text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-sky-500 hover:text-sky-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
