"use client"

import { type Subject } from "@/data/subjects-data"

// خريطة ألوان المادة - يجب أن تكون كاملة لأن Tailwind لا يدعم الأنماط الديناميكية
const subjectColorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", iconBg: "bg-emerald-100" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", iconBg: "bg-teal-100" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", iconBg: "bg-amber-100" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", iconBg: "bg-orange-100" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", iconBg: "bg-rose-100" },
  sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700", iconBg: "bg-sky-100" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", iconBg: "bg-violet-100" },
  slate: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", iconBg: "bg-slate-100" },
  lime: { bg: "bg-lime-50", border: "border-lime-200", text: "text-lime-700", iconBg: "bg-lime-100" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", iconBg: "bg-cyan-100" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", iconBg: "bg-pink-100" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", iconBg: "bg-yellow-100" },
  fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-700", iconBg: "bg-fuchsia-100" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", iconBg: "bg-indigo-100" },
}

interface SubjectsGridProps {
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
}

export function SubjectsGrid({ subjects, onSubjectClick }: SubjectsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {subjects.map((subject) => {
        const colors = subjectColorMap[subject.color] || subjectColorMap.emerald
        const Icon = subject.icon

        return (
          <button
            key={subject.id}
            onClick={() => onSubjectClick(subject)}
            className={`group relative overflow-hidden rounded-xl border-2 ${colors.border} ${colors.bg} p-4 text-right transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]`}
          >
            {/* أيقونة المادة */}
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg} ${colors.text} transition-transform group-hover:scale-110`}
            >
              <Icon className="h-6 w-6" />
            </div>

            {/* اسم المادة */}
            <h3 className={`text-sm font-bold leading-tight ${colors.text} sm:text-base`}>
              {subject.name}
            </h3>

            {/* وصف مختصر */}
            <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
              {subject.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
