"use client"

import { useState } from "react"
import { GraduationCap, Lock, ArrowLeft, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useOmnischoolStore } from "@/lib/store"
import { tracks } from "@/data/tracks-data"

export function OnboardingModal() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [track, setTrack] = useState("")
  const [level, setLevel] = useState("")

  const {
    setUserName,
    setSelectedTrack,
    setSelectedLevel,
    completeOnboarding,
  } = useOmnischoolStore()

  const isStep1Valid = name.trim().length >= 2
  const isStep2Valid = track.length > 0
  const isStep3Valid = level.length > 0

  const handleComplete = () => {
    setUserName(name.trim())
    setSelectedTrack(track)
    setSelectedLevel(level)
    completeOnboarding()
  }

  const selectedTrackData = tracks.find((t) => t.id === track)

  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <GraduationCap className="h-8 w-8" />
          </div>
          <DialogTitle className="text-xl text-emerald-800">
            مرحباً بك في أومني سكول
          </DialogTitle>
          <DialogDescription className="text-emerald-600">
            {step === 1 && "أخبرنا باسمك للبدء"}
            {step === 2 && "اختر الشعبة الدراسية"}
            {step === 3 && "اختر المستوى الدراسي"}
          </DialogDescription>
        </DialogHeader>

        {/* مؤشر الخطوات */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  s < step
                    ? "bg-emerald-600 text-white"
                    : s === step
                      ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-8 rounded-full transition-all ${
                    s < step ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* الخطوة 1: الاسم */}
        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-emerald-800">
                الاسم الكامل
              </Label>
              <Input
                id="name"
                placeholder="أدخل اسمك هنا..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                dir="rtl"
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              التالي
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* الخطوة 2: الشعبة */}
        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-emerald-800">الشعبة</Label>
              <div className="space-y-2">
                {tracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTrack(t.id)}
                    className={`w-full rounded-xl border-2 p-4 text-right transition-all ${
                      track === t.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-emerald-800">
                        {t.name}
                      </span>
                      <span className="text-xs text-emerald-600">
                        {t.semesters} سداسي
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                رجوع
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                التالي
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* الخطوة 3: المستوى */}
        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-emerald-800">المستوى</Label>
              <div className="space-y-2">
                {selectedTrackData?.levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => !l.isLocked && setLevel(l.id)}
                    disabled={l.isLocked}
                    className={`w-full rounded-xl border-2 p-4 text-right transition-all ${
                      l.isLocked
                        ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                        : level === l.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-lg font-semibold ${l.isLocked ? "text-gray-400" : "text-emerald-800"}`}
                      >
                        {l.name}
                      </span>
                      {l.isLocked && (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                رجوع
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!isStep3Valid}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                ابدأ التعلم
                <Check className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
