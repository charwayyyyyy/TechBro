"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { fetchClient } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const { avatar } = useUserStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await fetchClient("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          avatar,
        }),
      });

      localStorage.setItem("token", data.access_token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 p-4">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Create Profile</h1>
          <p className="mt-2 text-sm text-slate-500">
            Join TechBro and start learning!
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-bold text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold uppercase text-slate-500"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3 font-medium text-slate-800 outline-none focus:border-sky-400 focus:bg-white transition"
              placeholder="TechBroMaster"
            />
          </div>

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
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm font-bold text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sky-500 hover:text-sky-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
