"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type Resource, sampleResources } from "@/data/subjects-data"

interface OmnischoolState {
  // المستخدم
  userName: string | null
  selectedTrack: string | null
  selectedLevel: string | null
  selectedSemester: number
  isOnboarded: boolean
  hasSeenWelcome: boolean

  // الموارد المحفوظة
  resources: Resource[]

  // الإجراءات
  setUserName: (name: string) => void
  setSelectedTrack: (track: string) => void
  setSelectedLevel: (level: string) => void
  setSelectedSemester: (semester: number) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
  dismissWelcome: () => void
  addResource: (resource: Omit<Resource, "id" | "createdAt">) => void
  getResourcesBySubject: (subjectId: string) => Resource[]
}

export const useOmnischoolStore = create<OmnischoolState>()(
  persist(
    (set, get) => ({
      // الحالات الابتدائية
      userName: null,
      selectedTrack: null,
      selectedLevel: null,
      selectedSemester: 1,
      isOnboarded: false,
      hasSeenWelcome: false,

      // الموارد: نبدأ بالموارد التجريبية
      resources: sampleResources,

      // الإجراءات
      setUserName: (name) => set({ userName: name }),
      setSelectedTrack: (track) => set({ selectedTrack: track }),
      setSelectedLevel: (level) => set({ selectedLevel: level }),
      setSelectedSemester: (semester) => set({ selectedSemester: semester }),
      completeOnboarding: () => set({ isOnboarded: true }),
      resetOnboarding: () =>
        set({
          userName: null,
          selectedTrack: null,
          selectedLevel: null,
          selectedSemester: 1,
          isOnboarded: false,
          hasSeenWelcome: false,
        }),
      dismissWelcome: () => set({ hasSeenWelcome: true }),
      addResource: (resource) =>
        set((state) => ({
          resources: [
            {
              ...resource,
              id: `r-${Date.now()}`,
              createdAt: new Date().toISOString().split("T")[0],
            },
            ...state.resources,
          ],
        })),
      getResourcesBySubject: (subjectId) =>
        get().resources.filter((r) => r.subjectId === subjectId),
    }),
    {
      name: "omnischool-storage",
    }
  )
)
