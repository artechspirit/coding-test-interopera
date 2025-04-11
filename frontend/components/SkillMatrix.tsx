import { SalesRep } from "@/types";

interface SkillMatrixProps {
  data: SalesRep[] | undefined;
}

export function SkillMatrix({ data }: SkillMatrixProps) {
  if (!data) return null;

  const allSkills = Array.from(new Set(data.flatMap((rep) => rep.skills)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((rep) => {
        const skillCount = rep.skills.length;
        const totalSkills = allSkills.length;
        const progress = Math.round((skillCount / totalSkills) * 100);

        return (
          <div
            key={rep.id}
            className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-sm border border-gray-100 dark:border-gray-800 transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {rep.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {rep.role}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {allSkills.map((skill) => {
                const hasSkill = rep.skills.includes(skill);
                return (
                  <div
                    key={skill}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                    <span
                      className={`text-xs font-medium px-3 py-2 rounded-full ${
                        hasSkill
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                      }`}
                    >
                      {hasSkill ? "✔" : "✘"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {skillCount}
              </span>{" "}
              of {totalSkills} skills matched
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded mt-1">
                <div
                  className="h-1.5 bg-green-500 rounded transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
