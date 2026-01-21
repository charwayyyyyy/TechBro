"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { fetchClient } from "@/lib/api";

// Mock Data
const lessons = {
  variables: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which keyword is used to declare a variable in Python?",
      options: ["var", "let", "def", "x = 5 (No keyword needed)"],
      correctAnswer: "x = 5 (No keyword needed)",
      explanation: "Python is dynamically typed and doesn't use a keyword for variable declaration.",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What is the output of: print(5 + 3)?",
      options: ["53", "8", "Error", "None"],
      correctAnswer: "8",
      explanation: "Python adds the two numbers.",
    },
    {
      id: 3,
      type: "code-fill",
      question: "Complete the code to print 'Hello':",
      code: "print('_____')",
      options: ["Hello", "World", "Python", "Code"],
      correctAnswer: "Hello",
      explanation: "The string inside print() is outputted.",
    }
  ],
};

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const router = useRouter();
  const { addXp, hearts, decrementHeart } = useUserStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [completed, setCompleted] = useState(false);

  const lessonData = lessons[lessonId as keyof typeof lessons] || lessons.variables;
  const currentQuestion = lessonData[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / lessonData.length) * 100;

  const handleCheck = () => {
    if (!selectedOption) return;

    if (selectedOption === currentQuestion.correctAnswer) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
      decrementHeart();
    }
  };

  const handleNext = async () => {
    if (status === "incorrect") {
       // Retry logic: just reset state to let them try again (simplification)
       setStatus("idle");
       setSelectedOption(null);
       return;
    }

    if (currentQuestionIndex < lessonData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setStatus("idle");
    } else {
      setCompleted(true);
      addXp(20); // Award XP
      
      try {
        const { xp, level } = useUserStore.getState();
        await fetchClient("/users/me", {
          method: "PATCH",
          body: JSON.stringify({ xp, level }),
        });
      } catch (err) {
        console.error("Failed to sync progress", err);
      }
    }
  };

  if (hearts === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-6 text-center">
        <div className="mb-6 text-6xl">💔</div>
        <h1 className="mb-2 text-3xl font-bold text-slate-800">Out of Hearts!</h1>
        <p className="mb-8 text-slate-600">You need more hearts to continue learning.</p>
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-xs rounded-xl bg-sky-500 py-3 font-bold text-white shadow-[0_4px_0_0_#0284c7] active:translate-y-[4px] active:shadow-none"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 p-6 text-center">
        <div className="mb-6 text-6xl">🎉</div>
        <h1 className="mb-2 text-3xl font-bold text-slate-800">Lesson Complete!</h1>
        <p className="mb-8 text-slate-600">You earned 20 XP</p>
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-xs rounded-xl bg-sky-500 py-3 font-bold text-white shadow-[0_4px_0_0_#0284c7] active:translate-y-[4px] active:shadow-none"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-6">
        <button onClick={() => router.push("/")} className="text-slate-400 hover:text-slate-600">
          ✕
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-sky-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
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
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => {
                if (status === "idle") setSelectedOption(option);
              }}
              className={`rounded-xl border-2 p-4 text-left font-medium transition-all ${
                selectedOption === option
                  ? "border-sky-500 bg-sky-50 text-sky-600"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              {option}
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
            onClick={status === "idle" ? handleCheck : handleNext}
            disabled={!selectedOption && status === "idle"}
            className={`w-full rounded-xl py-3 font-bold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:translate-y-[4px] active:shadow-none transition-all ${
               status === "correct" ? "bg-green-500 shadow-green-700" :
               status === "incorrect" ? "bg-red-500 shadow-red-700" :
               !selectedOption ? "bg-slate-300 shadow-slate-400 cursor-not-allowed" : "bg-sky-500 shadow-sky-700"
            }`}
          >
            {status === "idle" ? "Check" : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  );
}
