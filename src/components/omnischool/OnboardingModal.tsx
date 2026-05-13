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
        className="sm:max-w-md bg-omni-cream"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-omni-red text-white">
            <GraduationCap className="h-8 w-8" />
          </div>
          <DialogTitle className="text-xl text-foreground">
            مرحباً بك في OmniSchool
          </DialogTitle>
          <DialogDescription className="text-omni-red/70">
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
                    ? "bg-omni-red text-white"
                    : s === step
                      ? "bg-omni-red/10 text-omni-red ring-2 ring-omni-red"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-8 rounded-full transition-all ${
                    s < step ? "bg-omni-red" : "bg-gray-200"
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
              <Label htmlFor="name" className="text-foreground">
                الاسم الكامل
              </Label>
              <Input
                id="name"
                placeholder="أدخل اسمك هنا..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-omni-gold/20 focus-visible:border-omni-red focus-visible:ring-omni-red/20"
                dir="rtl"
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className="w-full bg-omni-red hover:bg-omni-red-dark text-white"
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
              <Label className="text-foreground">الشعبة</Label>
              <div className="space-y-2">
                {tracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTrack(t.id)}
                    className={`w-full rounded-xl border-2 p-4 text-right transition-all ${
                      track === t.id
                        ? "border-omni-red bg-omni-red/5"
                        : "border-gray-200 hover:border-omni-gold/30 hover:bg-omni-gold/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="text-xs text-omni-gold-dark">
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
                className="flex-1 border-omni-gold/20 text-omni-red hover:bg-omni-red/5"
              >
                رجوع
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                className="flex-1 bg-omni-red hover:bg-omni-red-dark text-white"
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
              <Label className="text-foreground">المستوى</Label>
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
                          ? "border-omni-red bg-omni-red/5"
                          : "border-gray-200 hover:border-omni-gold/30 hover:bg-omni-gold/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-lg font-semibold ${l.isLocked ? "text-gray-400" : "text-foreground"}`}
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
                className="flex-1 border-omni-gold/20 text-omni-red hover:bg-omni-red/5"
              >
                رجوع
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!isStep3Valid}
                className="flex-1 text-white"
                style={{ background: "linear-gradient(135deg, #B91C1C, #D4A843)" }}
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
