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
        <div
          className="mb-6 relative overflow-hidden rounded-xl p-5 text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #B91C1C 0%, #991B1B 40%, #B8922E 100%)",
          }}
        >
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
              <p className="mt-0.5 text-sm text-white/80">
                ابدأ رحلتك التعليمية اليوم واكتشف الموارد المتاحة لكل مادة
              </p>
            </div>
          </div>
        </div>
      )}

      {/* إحصائيات سريعة */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Card className="border-omni-red/10 bg-white/60" style={{ boxShadow: "0 1px 3px rgba(185, 28, 28, 0.06)" }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omni-red/10 text-omni-red">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-omni-red/70">المواد الدراسية</p>
              <p className="text-lg font-bold text-omni-red-dark">
                {semesterSubjects.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-omni-gold/10 bg-white/60" style={{ boxShadow: "0 1px 3px rgba(212, 168, 67, 0.06)" }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omni-gold/10 text-omni-gold-dark">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-omni-gold-dark/70">الشعبة</p>
              <p className="text-lg font-bold text-omni-gold-dark">
                {trackData?.name || "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-omni-red/10 bg-white/60" style={{ boxShadow: "0 1px 3px rgba(185, 28, 28, 0.06)" }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omni-red/10 text-omni-red">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-omni-red/70">المستوى</p>
              <p className="text-lg font-bold text-omni-red-dark">
                {levelData?.name || "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-omni-gold/10 bg-white/60" style={{ boxShadow: "0 1px 3px rgba(212, 168, 67, 0.06)" }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omni-gold/10 text-omni-gold-dark">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-omni-gold-dark/70">السداسي</p>
              <p className="text-lg font-bold text-omni-gold-dark">{semesterLabel}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* عنوان قسم المواد */}
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-omni-red" />
        <h2 className="text-lg font-bold text-foreground">
          مواد {semesterLabel}
        </h2>
        <span className="rounded-full bg-omni-red/10 px-2 py-0.5 text-xs font-medium text-omni-red">
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
