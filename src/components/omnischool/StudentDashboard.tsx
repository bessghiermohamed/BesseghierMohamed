"use client"

import { useState } from "react"
import { BookOpen, FolderOpen, Sparkles, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useOmnischoolStore } from "@/lib/store"
import { getSubjectsBySemester } from "@/data/subjects-data"
import { getTrackById } from "@/data/tracks-data"
import { SubjectsGrid } from "./SubjectsGrid"
import { SubjectResourceLibrary } from "./SubjectResourceLibrary"
import { type Subject } from "@/data/subjects-data"

export function StudentDashboard() {
  const {
    selectedTrack,
    selectedLevel,
    selectedSemester,
    userName,
    hasSeenWelcome,
    dismissWelcome,
  } = useOmnischoolStore()
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const trackData = getTrackById(selectedTrack || "")
  const levelData = trackData?.levels.find((l) => l.id === selectedLevel)
  const semesterSubjects = getSubjectsBySemester(selectedSemester)

  const semesterLabel =
    selectedSemester === 1 ? "السداسي الأول" : "السداسي الثاني"

  if (selectedSubject) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SubjectResourceLibrary
          subject={selectedSubject}
          onBack={() => setSelectedSubject(null)}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* رسالة الترحيب - تظهر مرة واحدة فقط */}
      {!hasSeenWelcome && userName && (
        <div className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-l from-emerald-600 to-emerald-700 p-5 text-white shadow-lg">
          <button
            onClick={dismissWelcome}
            className="absolute top-3 left-3 rounded-lg p-1 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                مرحباً بك يا {userName}!
              </h2>
              <p className="mt-0.5 text-sm text-emerald-100">
                ابدأ رحلتك التعليمية اليوم واكتشف الموارد المتاحة لكل مادة
              </p>
            </div>
          </div>
        </div>
      )}

      {/* إحصائيات سريعة */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Card className="border-emerald-100 bg-emerald-50/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-600">المواد الدراسية</p>
              <p className="text-lg font-bold text-emerald-800">
                {semesterSubjects.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-amber-600">الشعبة</p>
              <p className="text-lg font-bold text-amber-800">
                {trackData?.name || "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-100 bg-teal-50/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-teal-600">المستوى</p>
              <p className="text-lg font-bold text-teal-800">
                {levelData?.name || "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rose-100 bg-rose-50/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-rose-600">السداسي</p>
              <p className="text-lg font-bold text-rose-800">{semesterLabel}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* عنوان قسم المواد */}
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-bold text-emerald-800">
          مواد {semesterLabel}
        </h2>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
          {semesterSubjects.length} مادة
        </span>
      </div>

      {/* شبكة المواد */}
      <SubjectsGrid
        subjects={semesterSubjects}
        onSubjectClick={setSelectedSubject}
      />
    </div>
  )
}
