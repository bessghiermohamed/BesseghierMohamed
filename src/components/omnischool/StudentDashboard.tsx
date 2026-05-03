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
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject, SubjectStatus } from "@/lib/types";
import { ProgressCircle } from "./ProgressCircle";
import { StudyStreak } from "./StudyStreak";
import { DataExportImport } from "./DataExportImport";
import { ActivityTimeline } from "./ActivityTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

/* ------------------------------------------------------------------ */
/*  Loading Skeleton for lazy-loaded components                       */
/* ------------------------------------------------------------------ */
const LoadingSkeleton = () => (
  <div className="glass-dashboard rounded-xl p-6 animate-pulse">
    <div className="h-6 w-48 bg-muted rounded mb-4" />
    <div className="h-40 bg-muted rounded" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Lazy-loaded heavy components                                      */
/* ------------------------------------------------------------------ */
const SemesterComparisonChart = dynamic(
  () => import("./SemesterComparisonChart").then((m) => m.SemesterComparisonChart),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
const GPACalculator = dynamic(
  () => import("./GPACalculator").then((m) => m.GPACalculator),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
const SubjectComparison = dynamic(
  () => import("./SubjectComparison").then((m) => m.SubjectComparison),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
const ProgressReport = dynamic(
  () => import("./ProgressReport").then((m) => m.ProgressReport),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
const SubjectRadarChart = dynamic(
  () => import("./SubjectRadarChart").then((m) => m.SubjectRadarChart),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

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
  not_started:
    "bg-gray-200/80 text-gray-700 border-gray-300 dark:bg-gray-700/60 dark:text-gray-300 dark:border-gray-600",
  in_progress: "badge-omni-gold",
  completed:
    "bg-green-100/80 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-400 dark:border-green-700",
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
  hover: { scale: 1.04, transition: { duration: 0.25 } },
};

/* ------------------------------------------------------------------ */
/*  Mini Sparkline SVG Component — 7-bar micro chart                  */
/* ------------------------------------------------------------------ */
interface MiniSparklineProps {
  color: string;
  values?: number[];
  height?: number;
  barWidth?: number;
  gap?: number;
}

function MiniSparkline({
  color,
  values = [30, 50, 40, 70, 55, 80, 65],
  height = 28,
  barWidth = 4,
  gap = 3,
}: MiniSparklineProps) {
  const maxVal = Math.max(...values, 1);
  const totalWidth = values.length * barWidth + (values.length - 1) * gap;

  return (
    <svg width={totalWidth} height={height} viewBox={`0 0 ${totalWidth} ${height}`} className="opacity-60">
      {values.map((val, i) => {
        const barHeight = Math.max(3, (val / maxVal) * (height - 2));
        const x = i * (barWidth + gap);
        const y = height - barHeight;
        const isLast = i === values.length - 1;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={barWidth / 2}
            fill={isLast ? color : color}
            opacity={isLast ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Milestone Progress Bar — Horizontal bar with milestone markers    */
/* ------------------------------------------------------------------ */
interface MilestoneBarProps {
  percentage: number;
  color?: string;
}

function MilestoneBar({ percentage, color = "#B91C1C" }: MilestoneBarProps) {
  const milestones = [
    { pct: 25, label: "٢٥٪" },
    { pct: 50, label: "٥٠٪" },
    { pct: 75, label: "٧٥٪" },
  ];

  return (
    <div className="w-full space-y-1.5">
      {/* The bar */}
      <div className="relative h-3 w-full rounded-full bg-muted/60 dark:bg-muted/40 border border-border/50 overflow-visible">
        {/* Milestone markers */}
        {milestones.map((m) => (
          <div
            key={m.pct}
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-border/80 dark:bg-border/60"
            style={{ left: `${m.pct}%` }}
          />
        ))}
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 start-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, #D4A843)`,
            maxWidth: "100%",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />
        {/* Tip marker */}
        {percentage > 0 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-omni-gold border-2 border-background shadow-sm"
            style={{ left: `${Math.min(percentage, 100)}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
          />
        )}
      </div>
      {/* Labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground/70 px-0.5">
        <span>٠٪</span>
        {milestones.map((m) => (
          <span key={m.pct} className="hidden sm:inline">
            {m.label}
          </span>
        ))}
        <span>١٠٠٪</span>
      </div>
    </div>
  );
}

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
        <h1 className="text-3xl sm:text-4xl font-black gradient-text-red-gold">
          لوحة المتعلم
        </h1>
        <p className="text-foreground/70 mt-2 text-sm sm:text-base font-medium">
          نظرة شاملة على تقدّمك الدراسي
        </p>
      </motion.div>

      {/* ========== 1. Summary Cards ========== */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        {/* Total */}
        <SummaryCard
          label="إجمالي المواد"
          value={stats.total}
          icon={<BookOpen className="h-6 w-6" />}
          accentColor="#B91C1C"
          gradientClass="stat-card-gradient-red"
          sparklineColor="#B91C1C"
          sparklineValues={[12, 18, 15, 20, 22, 24, stats.total]}
          delay={0}
        />
        {/* Completed */}
        <SummaryCard
          label="مكتملة"
          value={stats.completed}
          icon={<CheckCircle className="h-6 w-6" />}
          accentColor="#16A34A"
          gradientClass="stat-card-gradient-green"
          sparklineColor="#16A34A"
          sparklineValues={[2, 4, 5, 7, 8, 10, stats.completed]}
          delay={0.1}
        />
        {/* In Progress */}
        <SummaryCard
          label="قيد التقدم"
          value={stats.inProgress}
          icon={<Clock className="h-6 w-6" />}
          accentColor="#D4A843"
          gradientClass="stat-card-gradient-gold"
          sparklineColor="#D4A843"
          sparklineValues={[1, 3, 5, 4, 6, 7, stats.inProgress]}
          delay={0.2}
        />
        {/* Not Started */}
        <SummaryCard
          label="لم تبدأ"
          value={stats.notStarted}
          icon={<Circle className="h-6 w-6" />}
          accentColor="#8B7E6A"
          gradientClass="stat-card-gradient-purple"
          sparklineColor="#8B7E6A"
          sparklineValues={[20, 18, 16, 14, 12, 10, stats.notStarted]}
          delay={0.3}
        />
      </motion.div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ========== 2. Overall Progress ========== */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-summary-card overflow-hidden border-border/60 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              {/* Circle with glow */}
              <div className="flex-shrink-0 progress-ring-glow">
                <ProgressCircle
                  percentage={stats.overallProgress}
                  size={180}
                  strokeWidth={14}
                  color="#B91C1C"
                  trackColor="rgba(185,28,28,0.08)"
                  textSize={32}
                  delay={0.3}
                />
              </div>
              {/* Text & stats */}
              <div className="text-center sm:text-start flex-1 space-y-3 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground section-header-line">
                  التقدم العام
                </h2>
                <p className="text-5xl sm:text-6xl font-black text-omni-red dark:text-omni-red-light ltr-content" dir="ltr">
                  {Math.round(stats.overallProgress)}%
                </p>
                <p className="text-foreground/70 text-sm sm:text-base font-medium">
                  {stats.completed} من {stats.total} مادة مكتملة
                </p>

                {/* Mini stats row */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                  <Badge variant="outline" className="badge-omni-red text-xs font-semibold px-3 py-1">
                    ✓ {stats.completed} مكتملة
                  </Badge>
                  <Badge variant="outline" className="badge-omni-gold text-xs font-semibold px-3 py-1">
                    ◐ {stats.inProgress} قيد التقدم
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-gray-200/70 text-gray-700 border-gray-300 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600 text-xs font-semibold px-3 py-1"
                  >
                    ○ {stats.notStarted} لم تبدأ
                  </Badge>
                </div>

                {/* Milestone progress bar */}
                <div className="pt-2">
                  <MilestoneBar percentage={stats.overallProgress} />
                </div>

                {/* Motivational message */}
                <p className="text-sm font-bold text-omni-gold-dark dark:text-omni-gold pt-1">
                  {getMotivationalMessage(stats.overallProgress)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section divider */}
      <div className="section-divider" />

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
                        <Card className="dashboard-summary-card overflow-hidden h-full border-border/50">
                          {/* Top accent bar with category color */}
                          <div
                            className="h-1.5 w-full"
                            style={{
                              background: `linear-gradient(90deg, ${catColor}, ${catColor}88, #D4A843)`,
                            }}
                          />
                          <CardContent className="p-4 flex flex-col items-center gap-2.5 text-center">
                            {/* Subject icon — larger and more prominent */}
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/30"
                              style={{ backgroundColor: `${catColor}18`, color: catColor }}
                            >
                              <IconComp className="h-6 w-6" />
                            </div>

                            {/* Subject name */}
                            <h3 className="text-sm font-bold leading-tight line-clamp-2 min-h-[2.5rem] text-foreground">
                              {subject.nameAr}
                            </h3>

                            {/* Larger mini progress circle */}
                            <div className="progress-ring-glow-sm my-1">
                              <ProgressCircle
                                percentage={pct}
                                size={80}
                                strokeWidth={7}
                                color={catColor}
                                trackColor={`${catColor}12`}
                                textSize={16}
                                delay={idx * 0.04 + 0.3}
                              />
                            </div>

                            {/* Status badge — more prominent */}
                            <Badge
                              variant="outline"
                              className={`text-[11px] px-3 py-1 font-semibold ${statusBadgeClass[status]}`}
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

      {/* Section divider */}
      <div className="section-divider" />

      {/* ========== 4. Category Breakdown ========== */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-summary-card overflow-hidden border-border/60 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold section-header-line">تقدم المواد حسب التصنيف</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="space-y-5">
              {categoryBreakdown.map((cat, idx) => {
                const catIcon = getSubjectIcon(cat.icon);
                return (
                  <div key={cat.id} className="space-y-2">
                    {/* Label row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border border-border/30"
                          style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                        >
                          <catIcon className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-sm text-foreground">{cat.label}</span>
                        <span className="text-muted-foreground text-xs font-medium">
                          ({cat.total} مادة)
                        </span>
                      </div>
                      <span
                        className="stat-value-xl font-black text-base ltr-content"
                        dir="ltr"
                        style={{ color: cat.color }}
                      >
                        {cat.avgProgress}%
                      </span>
                    </div>
                    {/* Progress bar — thicker with better contrast */}
                    <div className="h-5 w-full rounded-full bg-muted/50 dark:bg-muted/30 border border-border/30 overflow-hidden relative">
                      {/* Milestone markers inside the bar */}
                      {[25, 50, 75].map((m) => (
                        <div
                          key={m}
                          className="absolute top-0 bottom-0 w-px bg-border/50 dark:bg-border/30"
                          style={{ left: `${m}%` }}
                        />
                      ))}
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}cc)`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.avgProgress}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.1 * idx + 0.3,
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ========== 5. Activity Timeline ========== */}
      <div className="section-divider" />
      <motion.div variants={itemVariants}>
        <ActivityTimeline />
      </motion.div>

      {/* ========== 6. Subject Comparison ========== */}
      <motion.div variants={itemVariants}>
        <SubjectComparison />
      </motion.div>

      {/* ========== 6. Streak & Semester Comparison ========== */}
      <div className="section-divider" />
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudyStreak />
          <SemesterComparisonChart />
        </div>
      </motion.div>

      {/* ========== 7. GPA Calculator ========== */}
      <motion.div variants={itemVariants}>
        <GPACalculator />
      </motion.div>

      {/* ========== 7b. Subject Radar Chart ========== */}
      <motion.div variants={itemVariants}>
        <SubjectRadarChart />
      </motion.div>

      {/* ========== 8. Data Management ========== */}
      <motion.div variants={itemVariants}>
        <DataExportImport />
      </motion.div>

      {/* ========== 9. Progress Report (PDF) ========== */}
      <motion.div variants={itemVariants}>
        <ProgressReport />
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/*  SummaryCard — Redesigned with high contrast, solid bg, sparkline  */
/* ================================================================== */
interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accentColor: string;
  gradientClass: string;
  sparklineColor: string;
  sparklineValues: number[];
  delay: number;
}

function SummaryCard({
  label,
  value,
  icon,
  accentColor,
  gradientClass,
  sparklineColor,
  sparklineValues,
  delay,
}: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="dashboard-summary-card rounded-xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Thick gradient accent bar at top */}
      <div
        className="h-2 w-full"
        style={{ background: `linear-gradient(90deg, #B91C1C, ${accentColor}, #D4A843)` }}
      />

      <div className={`p-5 sm:p-6 relative ${gradientClass}`}>
        {/* Decorative background circles */}
        <div
          className="absolute -top-10 -left-10 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor}06 0%, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, #D4A84304 0%, transparent 70%)` }}
        />

        {/* Top row: icon + sparkline */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/30"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {icon}
          </div>
          <MiniSparkline color={sparklineColor} values={sparklineValues} />
        </div>

        {/* Large number */}
        <motion.p
          className="stat-value-xl text-5xl sm:text-6xl font-black ltr-content animate-number-pop"
          dir="ltr"
          style={{ color: accentColor }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
        >
          {value}
        </motion.p>

        {/* Label */}
        <p className="text-xs uppercase tracking-wider text-foreground/60 font-bold mt-2 relative z-10">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
