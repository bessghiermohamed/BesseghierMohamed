"use client"

import { GraduationCap, RotateCcw } from "lucide-react"
import { useOmnischoolStore } from "@/lib/store"

export function Header() {
  const { userName, selectedSemester, setSelectedSemester, resetOnboarding } =
    useOmnischoolStore()

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-omni-gold/10"
      style={{ boxShadow: "0 4px 30px rgba(185, 28, 28, 0.06), 0 1px 0 rgba(212, 168, 67, 0.1)" }}
    >
      {/* Subtle gold gradient line at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212, 168, 67, 0.2) 30%, rgba(185, 28, 28, 0.15) 70%, transparent 100%)",
        }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* الشعار والاسم - على اليمين في RTL */}
        <div className="flex items-center gap-2.5 group cursor-default">
          {/* Logo icon with glow */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle, rgba(212, 168, 67, 0.4) 0%, transparent 70%)",
              }}
            />
            <GraduationCap className="size-8 text-omni-gold relative z-10 transition-transform duration-300 group-hover:rotate-[-5deg]" />
          </div>

          {/* Logo text with gold gradient */}
          <span className="text-xl font-bold tracking-tight">
            <span className="text-foreground">Omni</span>
            <span
              className="bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D4A843 0%, #E5C168 50%, #D4A843 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              School
            </span>
          </span>
        </div>

        {/* تبديل السداسي - في المنتصف */}
        <div className="hidden sm:flex items-center rounded-lg border border-omni-gold/20 bg-omni-cream/80 p-1">
          <button
            onClick={() => setSelectedSemester(1)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              selectedSemester === 1
                ? "bg-omni-red text-white shadow-sm"
                : "text-omni-red/70 hover:bg-omni-gold/10 hover:text-omni-red"
            }`}
          >
            السداسي الأول
          </button>
          <button
            onClick={() => setSelectedSemester(2)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              selectedSemester === 2
                ? "bg-omni-red text-white shadow-sm"
                : "text-omni-red/70 hover:bg-omni-gold/10 hover:text-omni-red"
            }`}
          >
            السداسي الثاني
          </button>
        </div>

        {/* تحية المستخدم وإعادة التعيين - على اليسار في RTL */}
        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-sm text-foreground/70">
              مرحباً، <span className="font-semibold text-omni-red">{userName}</span>
            </span>
          )}
          <button
            onClick={resetOnboarding}
            className="rounded-lg p-2 text-omni-gold transition-colors hover:bg-omni-red/5 hover:text-omni-red"
            title="إعادة التعيين"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* تبديل السداسي للموبايل */}
      <div className="flex sm:hidden items-center justify-center gap-2 border-t border-omni-gold/10 px-4 py-2">
        <button
          onClick={() => setSelectedSemester(1)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            selectedSemester === 1
              ? "bg-omni-red text-white shadow-sm"
              : "bg-omni-cream text-omni-red/70 hover:bg-omni-gold/10"
          }`}
        >
          السداسي الأول
        </button>
        <button
          onClick={() => setSelectedSemester(2)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            selectedSemester === 2
              ? "bg-omni-red text-white shadow-sm"
              : "bg-omni-cream text-omni-red/70 hover:bg-omni-gold/10"
          }`}
        >
          السداسي الثاني
        </button>
      </div>
    </header>
  )
}
