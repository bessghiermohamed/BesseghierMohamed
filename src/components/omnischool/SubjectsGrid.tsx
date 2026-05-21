"use client"

import { type Subject } from "@/data/subjects-data"

// خريطة ألوان المادة - ألوان دافئة تتناسب مع الثيم الأحمر-الذهبي
const subjectColorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: { bg: "bg-omni-cream", border: "border-omni-red/15", text: "text-omni-red-dark", iconBg: "bg-omni-red/8" },
  teal: { bg: "bg-omni-cream", border: "border-omni-gold/15", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/8" },
  amber: { bg: "bg-omni-cream", border: "border-omni-gold/20", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/10" },
  orange: { bg: "bg-omni-cream", border: "border-omni-red/15", text: "text-omni-red-dark", iconBg: "bg-omni-red/8" },
  rose: { bg: "bg-omni-cream", border: "border-omni-red/20", text: "text-omni-red", iconBg: "bg-omni-red/10" },
  sky: { bg: "bg-omni-cream", border: "border-omni-gold/15", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/8" },
  violet: { bg: "bg-omni-cream", border: "border-omni-red/15", text: "text-omni-red-dark", iconBg: "bg-omni-red/8" },
  slate: { bg: "bg-omni-cream", border: "border-omni-gold/10", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/6" },
  lime: { bg: "bg-omni-cream", border: "border-omni-gold/15", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/8" },
  cyan: { bg: "bg-omni-cream", border: "border-omni-gold/15", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/8" },
  pink: { bg: "bg-omni-cream", border: "border-omni-red/15", text: "text-omni-red", iconBg: "bg-omni-red/8" },
  yellow: { bg: "bg-omni-cream", border: "border-omni-gold/20", text: "text-omni-gold-dark", iconBg: "bg-omni-gold/10" },
  fuchsia: { bg: "bg-omni-cream", border: "border-omni-red/15", text: "text-omni-red-dark", iconBg: "bg-omni-red/8" },
  indigo: { bg: "bg-omni-cream", border: "border-omni-red/15", text: "text-omni-red-dark", iconBg: "bg-omni-red/8" },
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
            className={`group relative overflow-hidden rounded-xl border-2 ${colors.border} ${colors.bg} p-4 text-right transition-all hover:scale-[1.02] hover:border-omni-gold/30 active:scale-[0.98]`}
            style={{ boxShadow: "0 1px 3px rgba(185, 28, 28, 0.04), 0 1px 2px rgba(212, 168, 67, 0.04)" }}
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
