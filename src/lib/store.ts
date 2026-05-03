import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ViewType, SubjectProgress, SubjectStatus, UserRole } from "./types";

interface AppState {
  // Navigation
  currentView: ViewType;
  selectedSubjectId: string | null;
  selectedSemester: 1 | 2;

  // User
  userName: string;
  userRole: UserRole;

  // Progress
  progress: SubjectProgress[];

  // Search
  searchQuery: string;
  searchCategory: string;

  // UI
  sidebarOpen: boolean;
  theme: "light" | "dark";

  // Actions
  setView: (view: ViewType) => void;
  selectSubject: (id: string) => void;
  setSelectedSemester: (semester: 1 | 2) => void;
  setUserName: (name: string) => void;
  setUserRole: (role: UserRole) => void;
  updateProgress: (subjectId: string, status: SubjectStatus, progress: number) => void;
  setSearchQuery: (query: string) => void;
  setSearchCategory: (category: string) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Navigation
      currentView: "home",
      selectedSubjectId: null,
      selectedSemester: 1,

      // User
      userName: "طالب",
      userRole: "student",

      // Progress
      progress: [],

      // Search
      searchQuery: "",
      searchCategory: "",

      // UI
      sidebarOpen: false,
      theme: "light",

      // Actions
      setView: (view) => set({ currentView: view }),

      selectSubject: (id) =>
        set({ selectedSubjectId: id, currentView: "subject-detail" }),

      setSelectedSemester: (semester) => set({ selectedSemester: semester }),

      setUserName: (name) => set({ userName: name }),

      setUserRole: (role) => set({ userRole: role }),

      updateProgress: (subjectId, status, progress) =>
        set((state) => {
          const existing = state.progress.find((p) => p.subjectId === subjectId);
          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.subjectId === subjectId ? { ...p, status, progress } : p
              ),
            };
          }
          return {
            progress: [...state.progress, { subjectId, status, progress }],
          };
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSearchCategory: (category) => set({ searchCategory: category }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      resetProgress: () => set({ progress: [] }),
    }),
    {
      name: "omnischool-storage",
      partialize: (state) => ({
        userName: state.userName,
        userRole: state.userRole,
        progress: state.progress,
        theme: state.theme,
      }),
    }
  )
);
