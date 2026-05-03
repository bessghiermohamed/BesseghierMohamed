export type UserRole = "student" | "teacher" | "admin";

export type SubjectStatus = "not_started" | "in_progress" | "completed";

export type ViewType =
  | "home"
  | "dashboard"
  | "subjects"
  | "subject-detail"
  | "search"
  | "about";

export interface Subject {
  id: string;
  nameAr: string;
  nameEn?: string;
  code: string;
  semester: 1 | 2;
  isShared: boolean;
  category: string;
  description?: string;
  driveLink?: string;
  icon?: string;
  color?: string;
  order: number;
}

export interface SubjectProgress {
  subjectId: string;
  status: SubjectStatus;
  progress: number;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalSubjects: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  overallProgress: number;
}
