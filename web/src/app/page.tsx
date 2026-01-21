"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Zap, Trophy, Sparkles, Gamepad2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Header/Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white">
              <Code className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">TechBro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden text-sm font-semibold text-slate-600 hover:text-sky-600 sm:block"
            >
              I have an account
            </Link>
            <Link 
              href="/signup"
              className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_0_#0ea5e9] transition-all hover:bg-sky-400 hover:shadow-[0_4px_0_0_#38bdf8] active:translate-y-[2px] active:shadow-[0_2px_0_0_#0ea5e9]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pt-32">
          <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-2xl text-center lg:text-left"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                Learn Programming <br />
                <span className="text-sky-500">Like a Game.</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="mt-6 text-lg text-slate-600 sm:text-xl"
              >
                XP. Streaks. Leagues. Real coding skills. 
                Master Python, JavaScript, and more with bite-sized, gamified lessons.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link 
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-sky-500 px-8 text-lg font-bold text-white shadow-[0_4px_0_0_#0ea5e9] transition-all hover:bg-sky-400 hover:shadow-[0_4px_0_0_#38bdf8] active:translate-y-[2px] active:shadow-[0_2px_0_0_#0ea5e9]"
                >
                  Get Started
                </Link>
                <Link 
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 text-lg font-bold text-slate-700 shadow-[0_4px_0_0_#e2e8f0] transition-all hover:bg-slate-50 hover:text-sky-500 active:translate-y-[2px] active:shadow-[0_2px_0_0_#e2e8f0]"
                >
                  Try Demo Account
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image / Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-md lg:max-w-full"
            >
              <div className="relative z-10 aspect-square rounded-3xl bg-slate-900 p-6 shadow-2xl">
                {/* Mock Code Editor */}
                <div className="flex items-center gap-2 border-b border-slate-700 pb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mt-4 space-y-2 font-mono text-sm text-slate-300">
                  <p><span className="text-purple-400">def</span> <span className="text-blue-400">solve_challenge</span>(user):</p>
                  <p className="pl-4">xp = <span className="text-orange-400">100</span></p>
                  <p className="pl-4">streak = user.streak + <span className="text-orange-400">1</span></p>
                  <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-400">&quot;Level Up!&quot;</span></p>
                  <br />
                  <p className="animate-pulse border-l-2 border-sky-500 pl-1">_</p>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -right-6 -top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-3xl shadow-lg"
                >
                  🔥
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500 text-4xl shadow-lg"
                >
                  🏆
                </motion.div>
              </div>
              {/* Background Blob */}
              <div className="absolute -inset-4 -z-10 rounded-full bg-sky-500/20 blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                The Gamified Way to Master Code
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Zap, color: "bg-yellow-400", title: "Bite-sized Lessons", desc: "Short, interactive exercises that fit into your day." },
                { icon: Trophy, color: "bg-purple-500", title: "Climb the Leagues", desc: "Compete with others and rise to the Diamond League." },
                { icon: Sparkles, color: "bg-green-500", title: "Earn XP & Rewards", desc: "Unlock avatars and power-ups as you learn." },
                { icon: Gamepad2, color: "bg-sky-500", title: "Build Real Skills", desc: "From Python basics to advanced algorithms." },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${item.color} text-white shadow-lg`}>
                    <item.icon className="h-10 w-10" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Avatar Preview Section (Placeholder for Part 2) */}
        <section className="overflow-hidden bg-slate-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                 {/* Placeholder for Animated Avatar */}
                 <div className="relative mx-auto flex h-96 w-full max-w-sm items-center justify-center rounded-full bg-sky-100">
                    <div className="text-9xl">😎</div>
                    <div className="absolute bottom-10 right-10 rounded-xl bg-white p-4 shadow-xl">
                       <p className="font-bold text-slate-900">Customize</p>
                       <p className="text-sm text-slate-500">Your Style</p>
                    </div>
                 </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Your Coder. Your Style.
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Express yourself with thousands of unique combinations. Unlock cool outfits, accessories, and backgrounds as you level up.
                </p>
                <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
                  {/* Mock customization options */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 w-16 flex-shrink-0 rounded-xl border-2 border-slate-200 bg-white" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-20 text-center text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl">
              Ready to start your coding journey?
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link 
                href="/signup"
                className="w-full rounded-2xl bg-sky-500 px-8 py-4 text-xl font-bold text-white shadow-[0_4px_0_0_#0ea5e9] transition-all hover:bg-sky-400 hover:shadow-[0_4px_0_0_#38bdf8] active:translate-y-[2px] active:shadow-[0_2px_0_0_#0ea5e9] sm:w-auto"
              >
                Join for Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-12 text-center text-slate-500">
        <div className="container mx-auto px-4">
          <p>© 2026 TechBro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
