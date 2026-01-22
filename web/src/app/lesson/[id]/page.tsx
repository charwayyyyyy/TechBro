"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { fetchClient } from "@/lib/api";
import { X } from "lucide-react";

type LessonContent = {
  question: string;
  options: string[];
  correctIndex: number;
  code?: string;
  explanation?: string;
};

type Lesson = {
  id: string;
  title: string;
  type: string;
  xpReward: number;
  content: LessonContent;
};

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { hearts, decrementHeart, setUser } = useUserStore();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const data = await fetchClient(`/lessons/${id}`);
        setLesson(data);
      } catch (err) {
        console.error("Failed to load lesson", err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [id]);

  const handleCheck = async () => {
    if (selectedOption === null || !lesson) return;

    const isCorrect = selectedOption === lesson.content.correctIndex;
    
    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
      decrementHeart();
    }
  };

  const handleContinue = async () => {
    if (status === "incorrect") {
      setStatus("idle");
      setSelectedOption(null);
      return;
    }

    if (status === "correct" && lesson) {
      // Complete lesson
      setCompleted(true);
      
      try {
        const result = await fetchClient(`/lessons/${lesson.id}/complete`, {
          method: "POST",
          body: JSON.stringify({ score: 100 }),
        });

        // Update user state
        setUser((prev) => ({
          ...prev,
          xp: prev.xp + result.xpEarned,
          streak: result.streakUpdated ? prev.streak + 1 : prev.streak,
        }));
        
      } catch (err) {
        console.error("Failed to submit lesson", err);
      }
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-white text-sky-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white p-4 text-center">
        <h2 className="mb-2 text-xl font-bold text-red-500">Error</h2>
        <p className="mb-4 text-slate-600">{error}</p>
        <button
          onClick={() => router.push("/learn")}
          className="rounded-xl bg-sky-500 px-6 py-2 font-bold text-white shadow-md active:translate-y-[2px]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (hearts === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-6 text-center">
        <div className="mb-6 text-6xl">💔</div>
        <h1 className="mb-2 text-3xl font-bold text-slate-800">Out of Hearts!</h1>
        <p className="mb-8 text-slate-600">You need more hearts to continue learning.</p>
        <button
          onClick={() => router.push("/learn")}
          className="w-full max-w-xs rounded-xl bg-sky-500 py-3 font-bold text-white shadow-[0_4px_0_0_#0284c7] active:translate-y-[4px] active:shadow-none"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (completed || !lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 p-6 text-center">
        <div className="mb-6 text-6xl">🎉</div>
        <h1 className="mb-2 text-3xl font-bold text-slate-800">Lesson Complete!</h1>
        <p className="mb-8 text-slate-600">You earned {lesson?.xpReward || 0} XP</p>
        <button
          onClick={() => router.push("/learn")}
          className="w-full max-w-xs rounded-xl bg-sky-500 py-3 font-bold text-white shadow-[0_4px_0_0_#0284c7] active:translate-y-[4px] active:shadow-none"
        >
          Continue
        </button>
      </div>
    );
  }

  const currentQuestion = lesson.content;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-6">
        <button onClick={() => router.push("/learn")} className="text-slate-400 hover:text-slate-600">
          <X className="h-6 w-6" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-sky-500 transition-all duration-500"
            style={{ width: `50%` }} // TODO: Real progress
          />
        </div>
        <div className="flex items-center text-red-500">
          ❤️ <span className="ml-1 font-bold">{hearts}</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pb-32">
        <h1 className="mb-8 text-2xl font-bold text-slate-800">
          {currentQuestion.question}
        </h1>
        
        {currentQuestion.code && (
           <div className="mb-6 rounded-xl bg-slate-900 p-4 font-mono text-sm text-green-400">
             {currentQuestion.code}
           </div>
        )}

        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (status === "idle") setSelectedOption(index);
              }}
              className={`rounded-xl border-2 p-4 text-left font-medium transition-all ${
                selectedOption === index
                  ? "border-sky-500 bg-sky-50 text-sky-600"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded border text-xs ${
                    selectedOption === index ? "border-sky-500 text-sky-500" : "border-slate-300 text-slate-300"
                }`}>
                    {index + 1}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 w-full border-t p-4 pb-8 transition-colors ${
        status === "correct" ? "bg-green-100 border-green-200" : 
        status === "incorrect" ? "bg-red-100 border-red-200" : "bg-white border-slate-200"
      }`}>
        <div className="mx-auto max-w-md">
          {status === "correct" && (
            <div className="mb-4 flex items-center gap-2 text-green-700 font-bold">
              <span className="text-xl">✅</span> Excellent!
            </div>
          )}
          {status === "incorrect" && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-red-700 font-bold">
                <span className="text-xl">❌</span> Incorrect
              </div>
              <p className="text-sm text-red-600 mt-1">{currentQuestion.explanation}</p>
            </div>
          )}

          <button
            onClick={status === "idle" ? handleCheck : handleContinue}
            disabled={selectedOption === null && status === "idle"}
            className={`w-full rounded-xl py-3 font-bold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:translate-y-[4px] active:shadow-none transition-all ${
               status === "correct" ? "bg-green-500 shadow-green-700" :
               status === "incorrect" ? "bg-red-500 shadow-red-700" :
               selectedOption === null ? "bg-slate-300 shadow-slate-400 cursor-not-allowed" : "bg-sky-500 shadow-sky-700"
            }`}
          >
            {status === "idle" ? "Check" : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  );
}
