"use client"

import { GraduationCap, RotateCcw } from "lucide-react"
import { useOmnischoolStore } from "@/lib/store"

export function Header() {
  const { userName, selectedSemester, setSelectedSemester, resetOnboarding } =
    useOmnischoolStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* الشعار والاسم - على اليمين في RTL */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-emerald-800">أومني سكول</h1>
        </div>

        {/* تبديل السداسي - في المنتصف */}
        <div className="hidden sm:flex items-center rounded-lg border border-emerald-200 bg-emerald-50 p-1">
          <button
            onClick={() => setSelectedSemester(1)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              selectedSemester === 1
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            السداسي الأول
          </button>
          <button
            onClick={() => setSelectedSemester(2)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              selectedSemester === 2
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            السداسي الثاني
          </button>
        </div>

        {/* تحية المستخدم وإعادة التعيين - على اليسار في RTL */}
        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-sm text-emerald-700">
              مرحباً، <span className="font-semibold">{userName}</span>
            </span>
          )}
          <button
            onClick={resetOnboarding}
            className="rounded-lg p-2 text-emerald-600 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
            title="إعادة التعيين"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* تبديل السداسي للموبايل */}
      <div className="flex sm:hidden items-center justify-center gap-2 border-t px-4 py-2">
        <button
          onClick={() => setSelectedSemester(1)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            selectedSemester === 1
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          السداسي الأول
        </button>
        <button
          onClick={() => setSelectedSemester(2)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            selectedSemester === 2
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          السداسي الثاني
        </button>
      </div>
    </header>
  )
}
