const skills = [
  { id: "variables", title: "Variables", color: "bg-emerald-400", row: 0, col: 1 },
  { id: "data-types", title: "Data Types", color: "bg-sky-400", row: 1, col: 0 },
  { id: "conditionals", title: "Conditionals", color: "bg-purple-400", row: 1, col: 2 },
  { id: "loops", title: "Loops", color: "bg-orange-400", row: 2, col: 1 },
  { id: "functions", title: "Functions", color: "bg-pink-400", row: 3, col: 0 },
  { id: "oop", title: "OOP", color: "bg-indigo-400", row: 3, col: 2 },
  { id: "algorithms", title: "Algorithms", color: "bg-teal-400", row: 4, col: 1 },
] as const;

type SkillId = (typeof skills)[number]["id"];

type SkillTreeProps = {
  activeSkill?: SkillId;
};

export function SkillTree({ activeSkill = "variables" }: SkillTreeProps) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Python path</h2>
        <p className="text-xs font-medium text-sky-600">Beginner · 7 skills</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 -z-10 h-full w-1 -translate-x-1/2 bg-sky-100" />
        <div className="space-y-4 pb-6">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3">
              {skills
                .filter((s) => s.row === rowIndex)
                .map((skill) => {
                  const isActive = skill.id === activeSkill;
                  const isLocked = skills.findIndex((s) => s.id === skill.id) > 0;
                  const unlocked = !isLocked || skill.id === activeSkill;

                  return (
                    <div
                      key={skill.id}
                      className={`flex items-center justify-center ${
                        skill.col === 1 ? "col-start-2" : skill.col === 2 ? "col-start-3" : "col-start-1"
                      }`}
                    >
                      <button
                        className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 text-xs font-semibold shadow-md transition-all ${
                          unlocked
                            ? `${skill.color} border-sky-50 text-white`
                            : "border-slate-200 bg-slate-100 text-slate-300"
                        } ${isActive ? "scale-110 shadow-lg ring-4 ring-sky-200" : ""}`}
                      >
                        <span className="text-[10px] leading-tight">
                          {skill.title.split(" ").map((word) => (
                            <span key={word} className="block">
                              {word}
                            </span>
                          ))}
                        </span>
                      </button>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

