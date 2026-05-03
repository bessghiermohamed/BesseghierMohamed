"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject, SubjectStatus } from "@/lib/types";
import { ProgressCircle } from "./ProgressCircle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BookOpen,
  Brain,
  GraduationCap,
  PenTool,
  Users,
  Monitor,
  History,
  Search,
  Globe,
  BarChart3,
  Languages,
  MessageSquare,
  Presentation,
  School,
  BookMarked,
  Target,
  Heart,
  Layout,
  Clock,
  ExternalLink,
  ChevronLeft,
  Edit3,
  CheckCircle2,
  PlayCircle,
  Save,
  Star,
  FileText,
  Download,
  Share2,
  Home,
  ChevronLeft as ChevronSep,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { SubjectFavoriteToggle } from "./SubjectFavoriteToggle";

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  GraduationCap,
  PenTool,
  Users,
  Monitor,
  History,
  Search,
  Globe,
  BarChart3,
  Languages,
  MessageSquare,
  Presentation,
  School,
  BookMarked,
  Target,
  Heart,
  Layout,
  Clock,
};

/* ------------------------------------------------------------------ */
/*  Status config                                                      */
/* ------------------------------------------------------------------ */
const statusConfig: Record<
  SubjectStatus,
  { label: string; color: string; bgColor: string }
> = {
  completed: { label: "مكتملة", color: "#16A34A", bgColor: "rgba(22,163,74,0.1)" },
  in_progress: { label: "قيد التقدم", color: "#D4A843", bgColor: "rgba(212,168,67,0.1)" },
  not_started: { label: "لم تبدأ", color: "#8B7E6A", bgColor: "rgba(139,126,106,0.1)" },
};

/* ================================================================== */
/*  SubjectDetail Component                                            */
/* ================================================================== */
export function SubjectDetail() {
  const { selectedSubjectId, progress, setView, updateProgress, subjectNotes, setSubjectNotes } = useAppStore();
  const [saving, setSaving] = useState(false);

  const notes = subjectNotes[selectedSubjectId ?? ""] ?? "";

  const subject = useMemo(
    () => subjectsData.find((s) => s.id === selectedSubjectId),
    [selectedSubjectId]
  );

  const subjectProgress = useMemo(
    () => progress.find((p) => p.subjectId === selectedSubjectId),
    [progress, selectedSubjectId]
  );

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <BookOpen className="size-16 text-muted-foreground/30 mb-4" />
        <p className="text-lg text-muted-foreground">لم يتم اختيار مادة</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setView("subjects")}
        >
          تصفح المواد
        </Button>
      </div>
    );
  }

  const status: SubjectStatus = subjectProgress?.status ?? "not_started";
  const progressValue = subjectProgress?.progress ?? 0;
  const statusInfo = statusConfig[status];
  const subjectColor = subject.color || "#B91C1C";
  const Icon = iconMap[subject.icon || ""] || BookOpen;

  const handleStatusChange = (newStatus: SubjectStatus) => {
    let newProgress = progressValue;
    if (newStatus === "completed") newProgress = 100;
    else if (newStatus === "not_started") newProgress = 0;
    else if (newStatus === "in_progress" && progressValue === 0) newProgress = 10;
    updateProgress(subject.id, newStatus, newProgress);
  };

  const handleProgressChange = (value: number) => {
    const newStatus: SubjectStatus =
      value >= 100 ? "completed" : value > 0 ? "in_progress" : "not_started";
    updateProgress(subject.id, newStatus, Math.min(100, Math.max(0, value)));
  };

  const relatedSubjects = subjectsData
    .filter(
      (s) =>
        s.category === subject.category &&
        s.id !== subject.id &&
        s.semester === subject.semester
    )
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Breadcrumb Navigation */}
      <motion.div variants={itemVariants}>
        <nav className="breadcrumb-nav" aria-label="التنقل">
          <span
            className="breadcrumb-item hover:underline"
            onClick={() => setView("home")}
          >
            <Home className="size-3.5 inline-block ml-1" />
            الرئيسية
          </span>
          <span className="breadcrumb-divider">‹</span>
          <span
            className="breadcrumb-item hover:underline"
            onClick={() => setView("subjects")}
          >
            المواد
          </span>
          <span className="breadcrumb-divider">‹</span>
          <span className="breadcrumb-item active">
            {subject.nameAr}
          </span>
        </nav>
      </motion.div>

      {/* Back button */}
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => setView("subjects")}
        >
          <ChevronLeft className="size-4" />
          العودة إلى المواد
        </Button>
      </motion.div>

      {/* Header Card */}
      <motion.div variants={itemVariants}>
        <Card className="glass card-depth overflow-hidden border-border">
          <div
            className="h-2"
            style={{ backgroundColor: subjectColor }}
          />
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Icon */}
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${subjectColor}15` }}
              >
                <Icon className="h-10 w-10" style={{ color: subjectColor }} />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {subject.nameAr}
                  </h1>
                  <SubjectFavoriteToggle subjectId={subject.id} size={20} />
                  {subject.nameEn && (
                    <span className="text-sm text-muted-foreground mt-1">
                      {subject.nameEn}
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="ltr-content"
                    style={{
                      borderColor: `${subjectColor}30`,
                      color: subjectColor,
                    }}
                  >
                    {subject.code}
                  </Badge>
                  <Badge
                    style={{
                      backgroundColor: `${subjectColor}12`,
                      color: subjectColor,
                      border: `1px solid ${subjectColor}25`,
                    }}
                  >
                    {subject.category}
                  </Badge>
                  <Badge variant="outline">السداسي {subject.semester}</Badge>
                  {subject.isShared && (
                    <Badge className="badge-omni-gold">مشترك</Badge>
                  )}
                  <Badge
                    style={{
                      backgroundColor: statusInfo.bgColor,
                      color: statusInfo.color,
                    }}
                  >
                    {statusInfo.label}
                  </Badge>
                </div>

                {/* Description */}
                {subject.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {subject.description}
                  </p>
                )}
              </div>

              {/* Progress Circle */}
              <div className="shrink-0 self-center">
                <ProgressCircle
                  percentage={progressValue}
                  size={130}
                  strokeWidth={11}
                  color={subjectColor}
                  textSize={24}
                />
              </div>
            </div>

            {/* Visual Progress Bar Below Progress Circle */}
            <div className="mt-6 pt-5 border-t border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-muted-foreground">مستوى الإنجاز</span>
                <span className="text-sm font-bold ltr-content" style={{ color: subjectColor }} dir="ltr">
                  {progressValue}%
                </span>
              </div>
              <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${subjectColor}, ${subjectColor}CC)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                {/* Milestone markers */}
                {[25, 50, 75].map((milestone) => (
                  <div
                    key={milestone}
                    className="absolute top-0 bottom-0 w-px bg-background/40"
                    style={{ left: `${milestone}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground/60">0%</span>
                <span className="text-[10px] text-muted-foreground/60">50%</span>
                <span className="text-[10px] text-muted-foreground/60">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions Row */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Status Update */}
          <Card className="glass card-depth border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Edit3 className="size-4 text-omni-red" />
                تحديث الحالة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={status === "not_started" ? "default" : "outline"}
                  size="sm"
                  className="gap-2 btn-ripple"
                  onClick={() => handleStatusChange("not_started")}
                >
                  <PlayCircle className="size-4" />
                  لم تبدأ
                </Button>
                <Button
                  variant={status === "in_progress" ? "default" : "outline"}
                  size="sm"
                  className="gap-2 btn-ripple"
                  onClick={() => handleStatusChange("in_progress")}
                >
                  <Clock className="size-4" />
                  قيد التقدم
                </Button>
                <Button
                  variant={status === "completed" ? "default" : "outline"}
                  size="sm"
                  className="gap-2 btn-ripple"
                  onClick={() => handleStatusChange("completed")}
                >
                  <CheckCircle2 className="size-4" />
                  مكتملة
                </Button>
              </div>

              {/* Progress slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">نسبة التقدم</span>
                  <span className="font-bold ltr-content" style={{ color: subjectColor }}>
                    {progressValue}%
                  </span>
                </div>
                <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const pct = Math.round((x / rect.width) * 100);
                    handleProgressChange(pct);
                  }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: subjectColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressValue}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                {/* Quick progress buttons — larger with glow on active */}
                <div className="flex gap-2 flex-wrap">
                  {[0, 25, 50, 75, 100].map((val) => {
                    const isActive = progressValue === val;
                    return (
                      <motion.button
                        key={val}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`progress-indicator inline-flex items-center justify-center h-9 min-w-[3rem] px-3 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                          isActive
                            ? "active"
                            : "border-border bg-background hover:border-omni-red/20 hover:bg-muted/50"
                        }`}
                        style={
                          isActive
                            ? {
                                color: "white",
                                borderColor: subjectColor,
                              }
                            : {}
                        }
                        onClick={() => handleProgressChange(val)}
                      >
                        {val}%
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="glass card-depth border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="size-4 text-omni-gold" />
                المصادر والملفات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full btn-omni-primary btn-ripple gap-2"
                onClick={() => {
                  if (subject.driveLink) {
                    window.open(subject.driveLink, "_blank");
                  }
                }}
              >
                <ExternalLink className="size-4" />
                فتح ملفات Google Drive
              </Button>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Download className="size-3.5" />
                  <span>محاضرات PDF</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="size-3.5" />
                  <span>تمارين وأعمال تطبيقية</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="size-3.5" />
                  <span>نماذج اختبارات سابقة</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div variants={itemVariants}>
        <Card className="glass card-depth border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Edit3 className="size-4 text-omni-gold" />
              ملاحظاتي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[140px] rounded-xl border border-border bg-background/50 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-omni-red/30 transition-all placeholder:text-muted-foreground/50"
              placeholder="أضف ملاحظاتك حول هذه المادة..."
              value={notes}
              onChange={(e) => {
                if (selectedSubjectId) {
                  setSubjectNotes(selectedSubjectId, e.target.value);
                }
              }}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {notes.length > 0 ? `${notes.length} حرف` : "يتم الحفظ تلقائياً"}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-prominent btn-ripple"
                onClick={() => {
                  setSaving(true);
                  setTimeout(() => setSaving(false), 500);
                }}
              >
                <Save className="size-5" />
                {saving ? "تم الحفظ ✓" : "حفظ الملاحظات"}
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Related Subjects */}
      {relatedSubjects.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="glass card-depth border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Share2 className="size-4 text-omni-red" />
                مواد ذات صلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedSubjects.map((rs) => {
                  const rsIcon = iconMap[rs.icon || ""] || BookOpen;
                  const rsColor = rs.color || "#B91C1C";
                  return (
                    <motion.div
                      key={rs.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="cursor-pointer"
                      onClick={() => {
                        useAppStore.getState().selectSubject(rs.id);
                      }}
                    >
                      <div className="flex items-center gap-3 rounded-xl border border-border p-3 transition-all hover:border-omni-red/30 hover:shadow-md card-depth">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${rsColor}15` }}
                        >
                          <rsIcon className="h-5 w-5" style={{ color: rsColor }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {rs.nameAr}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {rs.category}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
