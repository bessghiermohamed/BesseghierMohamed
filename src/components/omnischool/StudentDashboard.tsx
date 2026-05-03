"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Circle,
  TrendingUp,
  GraduationCap,
  Brain,
  PenTool,
  Users,
  Monitor,
  Search,
  School,
  ChevronLeft,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject, SubjectStatus } from "@/lib/types";
import { ProgressCircle } from "./ProgressCircle";
import { StudyStreak } from "./StudyStreak";
import { SemesterComparisonChart } from "./SemesterComparisonChart";
import { DataExportImport } from "./DataExportImport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ------------------------------------------------------------------ */
/*  Icon mapping — maps string icon names from subjects-data to JSX   */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Brain,
  GraduationCap,
  PenTool,
  Users,
  Monitor,
  History: Clock,
  Search,
  Globe: TrendingUp,
  BarChart3: TrendingUp,
  Languages: PenTool,
  MessageSquare: PenTool,
  Presentation: GraduationCap,
  School,
  BookMarked: BookOpen,
  Target: Search,
  Heart: GraduationCap,
  Layout: Monitor,
  Clock,
};

function getSubjectIcon(iconName?: string): React.ElementType {
  if (!iconName) return BookOpen;
  return iconMap[iconName] || BookOpen;
}

/* ------------------------------------------------------------------ */
/*  Status helpers                                                     */
/* ------------------------------------------------------------------ */
const statusLabels: Record<SubjectStatus, string> = {
  not_started: "لم تبدأ",
  in_progress: "قيد التقدم",
  completed: "مكتملة",
};

const statusBadgeClass: Record<SubjectStatus, string> = {
  not_started: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
  in_progress: "badge-omni-gold",
  completed: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
};

function getStatusForSubject(
  subjectId: string,
  progress: { subjectId: string; status: SubjectStatus; progress: number }[]
): { status: SubjectStatus; progress: number } {
  const entry = progress.find((p) => p.subjectId === subjectId);
  return entry ? { status: entry.status, progress: entry.progress } : { status: "not_started", progress: 0 };
}

/* ------------------------------------------------------------------ */
/*  Motivational messages                                              */
/* ------------------------------------------------------------------ */
function getMotivationalMessage(pct: number): string {
  if (pct === 0) return "ابدأ رحلتك التعليمية اليوم! 🚀";
  if (pct < 25) return "بداية موفقة! واصل التقدم 💪";
  if (pct < 50) return "أنت في الطريق الصحيح، استمر! 🌟";
  if (pct < 75) return "إنجاز رائع! أنت تقترب من الهدف 🏆";
  if (pct < 100) return "مرحلة المتابعة الأخيرة، يمكنك فعلها! 🔥";
  return "تهانينا! أكملت جميع المواد 🎉";
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.25 } },
};

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export function StudentDashboard() {
  const { progress, selectSubject, selectedSemester, setSelectedSemester } = useAppStore();

  /* ---------- Computed stats ---------- */
  const stats = useMemo(() => {
    const total = subjectsData.length;
    const completed = progress.filter((p) => p.status === "completed").length;
    const inProgress = progress.filter((p) => p.status === "in_progress").length;
    const notStarted = total - completed - inProgress;
    const overallProgress =
      total > 0
        ? progress.reduce((acc, p) => acc + p.progress, 0) / total
        : 0;
    return { total, completed, inProgress, notStarted, overallProgress };
  }, [progress]);

  /* ---------- Category breakdown ---------- */
  const categoryBreakdown = useMemo(() => {
    return categories.map((cat) => {
      const catSubjects = subjectsData.filter((s) => s.category === cat.id);
      const total = catSubjects.length;
      const avgProgress =
        total > 0
          ? catSubjects.reduce((acc, s) => {
              const p = getStatusForSubject(s.id, progress);
              return acc + p.progress;
            }, 0) / total
          : 0;
      return {
        ...cat,
        total,
        avgProgress: Math.round(avgProgress),
      };
    });
  }, [progress]);

  /* ---------- Subjects by semester ---------- */
  const semesterSubjects = useMemo(() => {
    return {
      1: subjectsData.filter((s) => s.semester === 1).sort((a, b) => a.order - b.order),
      2: subjectsData.filter((s) => s.semester === 2).sort((a, b) => a.order - b.order),
    };
  }, []);

  /* ================================================================ */
  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page title */}
      <motion.div variants={itemVariants} className="text-center sm:text-start">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          لوحة المتعلم
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          نظرة شاملة على تقدّمك الدراسي
        </p>
      </motion.div>

      {/* ========== 1. Summary Cards ========== */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {/* Total */}
        <SummaryCard
          label="إجمالي المواد"
          value={stats.total}
          icon={<BookOpen className="h-6 w-6" />}
          gradient="from-red-600 to-red-800"
          iconBg="bg-white/20"
          delay={0}
        />
        {/* Completed */}
        <SummaryCard
          label="مكتملة"
          value={stats.completed}
          icon={<CheckCircle className="h-6 w-6" />}
          gradient="from-green-600 to-green-800"
          iconBg="bg-white/20"
          delay={0.1}
        />
        {/* In Progress */}
        <SummaryCard
          label="قيد التقدم"
          value={stats.inProgress}
          icon={<Clock className="h-6 w-6" />}
          gradient="from-omni-gold-dark to-omni-gold"
          iconBg="bg-white/20"
          delay={0.2}
        />
        {/* Not Started */}
        <SummaryCard
          label="لم تبدأ"
          value={stats.notStarted}
          icon={<Circle className="h-6 w-6" />}
          gradient="from-gray-500 to-gray-600"
          iconBg="bg-white/20"
          delay={0.3}
        />
      </motion.div>

      {/* ========== 2. Overall Progress ========== */}
      <motion.div variants={itemVariants}>
        <Card className="glass overflow-hidden border-border">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              {/* Circle */}
              <div className="flex-shrink-0">
                <ProgressCircle
                  percentage={stats.overallProgress}
                  size={160}
                  strokeWidth={12}
                  color="#B91C1C"
                  trackColor="rgba(185,28,28,0.1)"
                  textSize={28}
                  delay={0.3}
                />
              </div>
              {/* Text */}
              <div className="text-center sm:text-start flex-1 space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  التقدم العام
                </h2>
                <p className="text-3xl sm:text-4xl font-black text-omni-red ltr-content" dir="ltr">
                  {Math.round(stats.overallProgress)}%
                </p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {stats.completed} من {stats.total} مادة مكتملة
                </p>
                {/* Mini stats row */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2">
                  <Badge variant="outline" className="badge-omni-red">
                    {stats.completed} مكتملة
                  </Badge>
                  <Badge variant="outline" className="badge-omni-gold">
                    {stats.inProgress} قيد التقدم
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                    {stats.notStarted} لم تبدأ
                  </Badge>
                </div>
                {/* Motivational message */}
                <p className="text-sm font-medium text-omni-gold-dark dark:text-omni-gold pt-1">
                  {getMotivationalMessage(stats.overallProgress)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ========== 3. Subjects Progress Grid ========== */}
      <motion.div variants={itemVariants}>
        <Tabs
          value={String(selectedSemester)}
          onValueChange={(v) => setSelectedSemester(Number(v) as 1 | 2)}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="1">السداسي الأول</TabsTrigger>
            <TabsTrigger value="2">السداسي الثاني</TabsTrigger>
          </TabsList>

          {([1, 2] as const).map((sem) => (
            <TabsContent key={sem} value={String(sem)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {semesterSubjects[sem].map((subject, idx) => {
                  const { status, progress: pct } = getStatusForSubject(subject.id, progress);
                  const IconComp = getSubjectIcon(subject.icon);
                  const catColor =
                    categories.find((c) => c.id === subject.category)?.color || "#B91C1C";

                  return (
                    <motion.div
                      key={subject.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.05 }}
                    >
                      <motion.div
                        variants={cardHover}
                        initial="rest"
                        whileHover="hover"
                        className="cursor-pointer"
                        onClick={() => selectSubject(subject.id)}
                      >
                        <Card className="glass card-omni overflow-hidden h-full">
                          <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
                            {/* Subject icon */}
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${catColor}15`, color: catColor }}
                            >
                              <IconComp className="h-5 w-5" />
                            </div>
                            {/* Subject name */}
                            <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[2.5rem]">
                              {subject.nameAr}
                            </h3>
                            {/* Mini progress circle */}
                            <ProgressCircle
                              percentage={pct}
                              size={64}
                              strokeWidth={5}
                              color={catColor}
                              trackColor={`${catColor}15`}
                              textSize={13}
                              delay={idx * 0.04 + 0.3}
                            />
                            {/* Status badge */}
                            <Badge
                              variant="outline"
                              className={`text-[11px] px-2 py-0.5 ${statusBadgeClass[status]}`}
                            >
                              {statusLabels[status]}
                            </Badge>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* ========== 4. Category Breakdown ========== */}
      <motion.div variants={itemVariants}>
        <Card className="glass overflow-hidden border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">تقدم المواد حسب التصنيف</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-5">
              {categoryBreakdown.map((cat, idx) => {
                const catIcon = getSubjectIcon(cat.icon);
                return (
                  <div key={cat.id} className="space-y-1.5">
                    {/* Label row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                        >
                          <catIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-medium">{cat.label}</span>
                        <span className="text-muted-foreground text-xs">
                          ({cat.total} مادة)
                        </span>
                      </div>
                      <span className="font-bold ltr-content" dir="ltr" style={{ color: cat.color }}>
                        {cat.avgProgress}%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.avgProgress}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.1 * idx + 0.3,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ========== 5. Streak & Semester Comparison ========== */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudyStreak />
          <SemesterComparisonChart />
        </div>
      </motion.div>

      {/* ========== 6. Data Management ========== */}
      <motion.div variants={itemVariants}>
        <DataExportImport />
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/*  SummaryCard Sub-component                                          */
/* ================================================================== */
interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  delay: number;
}

function SummaryCard({ label, value, icon, gradient, iconBg, delay }: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-0 shadow-lg h-full">
        <div className={`bg-gradient-to-br ${gradient} p-5 sm:p-6 text-white relative`}>
          {/* Decorative circle */}
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <motion.p
                className="text-3xl sm:text-4xl font-black ltr-content"
                dir="ltr"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
              >
                {value}
              </motion.p>
              <p className="text-white/80 text-sm font-medium">{label}</p>
            </div>
            <motion.div
              className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center backdrop-blur-sm`}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.5,
              }}
            >
              {icon}
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
