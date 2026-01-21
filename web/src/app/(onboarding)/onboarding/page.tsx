"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/use-user-store";

const levels = [
  { id: "new", label: "I'm new to coding", icon: "🌱" },
  { id: "beginner", label: "I know the basics", icon: "🔨" },
  { id: "intermediate", label: "I can build apps", icon: "🚀" },
  { id: "advanced", label: "I'm a pro", icon: "👑" },
];

const goals = [
  { id: "casual", label: "Casual", sub: "5 mins / day" },
  { id: "regular", label: "Regular", sub: "10 mins / day" },
  { id: "serious", label: "Serious", sub: "15 mins / day" },
  { id: "insane", label: "Insane", sub: "20 mins / day" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { setExperienceLevel, setDailyGoal } = useUserStore();
  const [selectedLevel, setSelectedLevel] = useState("new");
  const [selectedGoal, setSelectedGoal] = useState("regular");

  const handleNext = () => {
    if (step === 1) {
      setExperienceLevel(selectedLevel);
      setStep(2);
    } else if (step === 2) {
      setDailyGoal(selectedGoal);
      // Proceed to signup to create account
      router.push("/signup");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <div className="h-4 w-full rounded-full bg-slate-200">
                <div 
                    className="h-full rounded-full bg-sky-500 transition-all duration-300"
                    style={{ width: `${(step / 2) * 100}%` }}
                />
            </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h1 className="text-center text-2xl font-bold text-slate-700">
                How much coding do you know?
              </h1>
              <div className="space-y-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      selectedLevel === level.id
                        ? "border-sky-500 bg-sky-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-2xl">{level.icon}</span>
                    <span className="font-bold text-slate-700">{level.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h1 className="text-center text-2xl font-bold text-slate-700">
                How much time can you commit?
              </h1>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all ${
                      selectedGoal === goal.id
                        ? "border-sky-500 bg-sky-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold text-slate-700">{goal.label}</span>
                    <span className="text-slate-500">{goal.sub}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="mt-8 w-full rounded-xl bg-sky-500 py-3 font-bold text-white shadow-[0_4px_0_0_#0ea5e9] transition-all hover:bg-sky-600 hover:shadow-[0_4px_0_0_#0284c7] active:translate-y-[2px] active:shadow-none"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
