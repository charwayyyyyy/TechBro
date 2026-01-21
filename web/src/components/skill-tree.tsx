import Link from "next/link";

type Lesson = {
  id: string;
  title: string;
  position: number;
  completed?: boolean;
};

type Course = {
  id: string;
  language: string;
  lessons: Lesson[];
};

type SkillTreeProps = {
  course?: Course;
  currentLessonId?: string;
};

export function SkillTree({ course, currentLessonId }: SkillTreeProps) {
  if (!course) return null;

  const lessons = course.lessons;

  // Simple zig-zag layout logic
  const getPosition = (index: number) => {
    const pattern = [1, 0, 1, 2]; // Center, Left, Center, Right
    return pattern[index % 4];
  };

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">{course.language} path</h2>
        <p className="text-xs font-medium text-sky-600">{lessons.length} skills</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 -z-10 h-full w-1 -translate-x-1/2 bg-sky-100" />
        <div className="space-y-4 pb-6">
          {lessons.map((lesson, index) => {
            const col = getPosition(index);
            const isCompleted = lesson.completed; // TODO: Pass this from parent
            const isNext = !isCompleted && (index === 0 || lessons[index - 1].completed);
            
            // For MVP, just assume linear progression based on currentLessonId or store
            // We'll fix this properly later. 
            
            const color = [
              "bg-emerald-400",
              "bg-sky-400",
              "bg-purple-400",
              "bg-orange-400",
              "bg-pink-400",
              "bg-indigo-400",
            ][index % 6];

            return (
              <div
                key={lesson.id}
                className={`flex items-center justify-center grid grid-cols-3 w-full`}
              >
                 <div className={`
                    ${col === 0 ? "col-start-1" : col === 1 ? "col-start-2" : "col-start-3"}
                    flex justify-center
                 `}>
                    <Link
                      href={`/lesson/${lesson.id}`}
                      className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 text-xs font-semibold shadow-md transition-all ${
                        color
                      } border-sky-50 text-white hover:scale-105 active:scale-95`}
                    >
                      <span className="text-[10px] leading-tight text-center px-1">
                        {lesson.title}
                      </span>
                    </Link>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

