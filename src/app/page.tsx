"use client"

import { useOmnischoolStore } from "@/lib/store"
import { Header } from "@/components/omnischool/Header"
import { OnboardingModal } from "@/components/omnischool/OnboardingModal"
import { StudentDashboard } from "@/components/omnischool/StudentDashboard"

export default function HomePage() {
  const { isOnboarded } = useOmnischoolStore()

  if (!isOnboarded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-bl from-emerald-50 via-white to-amber-50">
        <OnboardingModal />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <Header />
      <StudentDashboard />
    </div>
  )
}
