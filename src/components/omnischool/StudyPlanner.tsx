"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  CalendarDays,
  Plus,
  Trash2,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  Timer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/store";
import { subjectsData } from "@/lib/subjects-data";
import { StudySession } from "@/lib/types";

/* ------------------------------------------------------------------
   Icon Mapping — maps subject.icon string → lucide-react component
   ------------------------------------------------------------------ */
import {
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
  type LucideIcon,
} from "lucide-react";

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

function SubjectIcon({
  iconName,
  className,
  style,
}: {
  iconName?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = iconMap[iconName || ""] || BookOpen;
  return <Icon className={className} style={style} />;
}

/* ------------------------------------------------------------------
   Helper functions
   ------------------------------------------------------------------ */

// Format time for display (24h to Arabic-friendly 12h)
function formatTimeAr(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "م" : "ص";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

// Format duration for display
function formatDurationAr(minutes: number) {
  if (minutes < 60) return `${minutes} د`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} س`;
  return `${hours} س ${mins} د`;
}

// Format date as ISO string (YYYY-MM-DD)
function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Get today's date string
function getTodayStr(): string {
  return formatDateISO(new Date());
}

/* ------------------------------------------------------------------
   Arabic date formatting
   ------------------------------------------------------------------ */
const arabicMonths = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const arabicDaysFull = [
  "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت",
];

function formatArabicDateHeader(dateStr: string): string {
  const todayStr = getTodayStr();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDateISO(tomorrow);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateISO(yesterday);

  if (dateStr === todayStr) {
    const d = new Date(dateStr + "T00:00:00");
    return `اليوم — ${arabicDaysFull[d.getDay()]} ${d.getDate()} ${arabicMonths[d.getMonth()]}`;
  }
  if (dateStr === tomorrowStr) {
    const d = new Date(dateStr + "T00:00:00");
    return `غدًا — ${arabicDaysFull[d.getDay()]} ${d.getDate()} ${arabicMonths[d.getMonth()]}`;
  }
  if (dateStr === yesterdayStr) {
    const d = new Date(dateStr + "T00:00:00");
    return `أمس — ${arabicDaysFull[d.getDay()]} ${d.getDate()} ${arabicMonths[d.getMonth()]}`;
  }

  const d = new Date(dateStr + "T00:00:00");
  return `${arabicDaysFull[d.getDay()]} ${d.getDate()} ${arabicMonths[d.getMonth()]} ${d.getFullYear()}`;
}

/* ------------------------------------------------------------------
   Duration presets
   ------------------------------------------------------------------ */
const durationOptions = [
  { value: 30, label: "٣٠ دقيقة" },
  { value: 45, label: "٤٥ دقيقة" },
  { value: 60, label: "ساعة واحدة" },
  { value: 90, label: "ساعة ونصف" },
  { value: 120, label: "ساعتان" },
];

/* ------------------------------------------------------------------
   Extended session type (with time field)
   ------------------------------------------------------------------ */
type SessionWithTime = StudySession & { time: string };

/* ------------------------------------------------------------------
   Animation variants
   ------------------------------------------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const dateGroupVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------
   StudyPlanner Component
   ------------------------------------------------------------------ */
export function StudyPlanner() {
  const { studySessions, addStudySession, removeStudySession, toggleStudySession } =
    useAppStore();

  // Form state
  const [formSubjectId, setFormSubjectId] = useState("");
  const [formTime, setFormTime] = useState("09:00");
  const [formDuration, setFormDuration] = useState("60");
  const [formDate, setFormDate] = useState(getTodayStr());

  // Get subject info by id
  const getSubject = (id: string) => subjectsData.find((s) => s.id === id);

  // Add session handler
  const handleAddSession = () => {
    if (!formSubjectId || !formTime) return;

    addStudySession({
      id: uuidv4(),
      subjectId: formSubjectId,
      date: formDate,
      duration: parseInt(formDuration),
      completed: false,
      time: formTime,
    } as SessionWithTime);

    // Reset form
    setFormSubjectId("");
    setFormTime("09:00");
    setFormDuration("60");
  };

  // Group and sort sessions by date
  const groupedSessions = useMemo(() => {
    const todayStr = getTodayStr();

    // Cast sessions to include time field
    const sessions = studySessions as SessionWithTime[];

    // Group by date
    const groups: Record<string, SessionWithTime[]> = {};
    sessions.forEach((session) => {
      if (!groups[session.date]) {
        groups[session.date] = [];
      }
      groups[session.date].push(session);
    });

    // Sort sessions within each group by time
    Object.keys(groups).forEach((date) => {
      groups[date].sort((a, b) => {
        const timeA = a.time || "00:00";
        const timeB = b.time || "00:00";
        return timeA.localeCompare(timeB);
      });
    });

    // Sort date groups: today first, then future (ascending), then past (descending)
    const sortedDates = Object.keys(groups).sort((a, b) => {
      if (a === todayStr && b !== todayStr) return -1;
      if (b === todayStr && a !== todayStr) return 1;
      // Both are today? Won't happen, but:
      if (a === todayStr && b === todayStr) return 0;

      const aIsFuture = a > todayStr;
      const bIsFuture = b > todayStr;

      // Future dates come before past dates
      if (aIsFuture && !bIsFuture) return -1;
      if (!aIsFuture && bIsFuture) return 1;

      // Both future: sort ascending (nearest first)
      if (aIsFuture && bIsFuture) return a.localeCompare(b);

      // Both past: sort descending (most recent first)
      return b.localeCompare(a);
    });

    return sortedDates.map((date) => ({
      date,
      sessions: groups[date],
      isToday: date === todayStr,
      isPast: date < todayStr,
    }));
  }, [studySessions]);

  // Stats
  const todaySessions = studySessions.filter((s) => s.date === getTodayStr());
  const completedToday = todaySessions.filter((s) => s.completed).length;
  const totalStudyMinutes = studySessions
    .filter((s) => s.completed)
    .reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6" dir="rtl">
      {/* ===== Page Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl glass-red flex items-center justify-center">
            <CalendarDays className="h-6 w-6 text-omni-red" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              مخطط الدراسة
            </h1>
            <p className="text-muted-foreground text-sm">
              نظّم جلساتك الدراسية
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== Quick Stats ===== */}
      {studySessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-3 gap-3"
        >
          <Card className="glass p-3 sm:p-4 text-center">
            <p className="text-2xl font-bold text-omni-red">{todaySessions.length}</p>
            <p className="text-xs text-muted-foreground">جلسات اليوم</p>
          </Card>
          <Card className="glass p-3 sm:p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedToday}</p>
            <p className="text-xs text-muted-foreground">مكتملة</p>
          </Card>
          <Card className="glass p-3 sm:p-4 text-center">
            <p className="text-2xl font-bold text-omni-gold">{formatDurationAr(totalStudyMinutes)}</p>
            <p className="text-xs text-muted-foreground">إجمالي الدراسة</p>
          </Card>
        </motion.div>
      )}

      {/* ===== Add Session Form (Inline) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-omni-red" />
            <h2 className="text-lg font-bold text-foreground">إضافة جلسة جديدة</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* Subject */}
            <div className="space-y-1.5 lg:col-span-1">
              <Label className="text-xs font-semibold text-foreground">المادة</Label>
              <Select value={formSubjectId} onValueChange={setFormSubjectId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر المادة" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {subjectsData.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center gap-2">
                        <SubjectIcon
                          iconName={subject.icon}
                          className="h-4 w-4"
                          style={{ color: subject.color }}
                        />
                        <span>{subject.nameAr}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">الوقت</Label>
              <Input
                type="time"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">المدة</Label>
              <Select value={formDuration} onValueChange={setFormDuration}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر المدة" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">التاريخ</Label>
              <Input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Add Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Button
                onClick={handleAddSession}
                disabled={!formSubjectId || !formTime}
                className="btn-omni-primary rounded-xl w-full"
                size="default"
              >
                <Plus className="h-4 w-4 me-1" />
                إضافة
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ===== Timeline View ===== */}
      {groupedSessions.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass p-8 sm:p-12 text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl glass-red flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-omni-red/40" />
            </div>
            <div className="space-y-2">
              <p className="text-foreground font-semibold text-lg">
                لا توجد جلسات دراسية بعد
              </p>
              <p className="text-muted-foreground text-sm">
                لا توجد جلسات دراسية بعد — أضف أول جلسة فوق!
              </p>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {groupedSessions.map((group) => (
              <motion.div
                key={group.date}
                variants={dateGroupVariants}
                layout
                className="space-y-3"
              >
                {/* Date Header */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      group.isToday
                        ? "bg-omni-red/10 border border-omni-red/20"
                        : group.isPast
                        ? "bg-muted/50 border border-muted/20"
                        : "bg-omni-gold/10 border border-omni-gold/20"
                    }`}
                  >
                    <CalendarDays
                      className={`h-5 w-5 ${
                        group.isToday
                          ? "text-omni-red"
                          : group.isPast
                          ? "text-muted-foreground"
                          : "text-omni-gold"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-sm font-bold ${
                        group.isToday
                          ? "text-omni-red"
                          : group.isPast
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {formatArabicDateHeader(group.date)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {group.sessions.length} جلسة — {formatDurationAr(group.sessions.reduce((sum, s) => sum + s.duration, 0))}
                    </p>
                  </div>
                  {group.isToday && (
                    <Badge className="badge-omni-red text-[10px]">
                      <Timer className="h-3 w-3 me-1" />
                      اليوم
                    </Badge>
                  )}
                </div>

                {/* Timeline line + sessions */}
                <div className="relative me-5">
                  {/* Vertical line */}
                  <div
                    className={`absolute top-0 bottom-0 w-0.5 rounded-full ${
                      group.isToday
                        ? "bg-omni-red/20"
                        : group.isPast
                        ? "bg-muted/30"
                        : "bg-omni-gold/20"
                    }`}
                    style={{ right: "19px" }}
                  />

                  <motion.div
                    variants={containerVariants}
                    className="space-y-2 pe-10"
                  >
                    <AnimatePresence>
                      {group.sessions.map((session) => {
                        const subject = getSubject(session.subjectId);
                        if (!subject) return null;

                        return (
                          <motion.div
                            key={session.id}
                            variants={itemVariants}
                            layout
                            exit={{
                              opacity: 0,
                              x: -30,
                              scale: 0.95,
                              transition: { duration: 0.2 },
                            }}
                            className="relative"
                          >
                            {/* Timeline dot */}
                            <div
                              className="absolute rounded-full w-3 h-3 border-2 z-10"
                              style={{
                                right: "-32px",
                                top: "18px",
                                backgroundColor: session.completed
                                  ? "#22c55e"
                                  : `${subject.color}30`,
                                borderColor: session.completed
                                  ? "#22c55e"
                                  : subject.color,
                              }}
                            />

                            {/* Session card */}
                            <Card
                              className={`p-3 sm:p-4 transition-all ${
                                session.completed
                                  ? "bg-green-500/5 border-green-500/15 opacity-75"
                                  : "glass border-transparent hover:shadow-md"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Checkbox */}
                                <motion.div whileTap={{ scale: 0.85 }}>
                                  {session.completed ? (
                                    <button
                                      onClick={() => toggleStudySession(session.id)}
                                      className="h-5 w-5 rounded-md bg-green-500 border-green-500 flex items-center justify-center"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-white" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => toggleStudySession(session.id)}
                                      className="h-5 w-5 rounded-md border-2 border-muted-foreground/30 hover:border-omni-red/50 transition-colors"
                                    >
                                      <Circle className="h-4 w-4 text-transparent" />
                                    </button>
                                  )}
                                </motion.div>

                                {/* Subject icon */}
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: `${subject.color}15` }}
                                >
                                  <SubjectIcon
                                    iconName={subject.icon}
                                    className="h-5 w-5"
                                    style={{ color: subject.color }}
                                  />
                                </div>

                                {/* Subject info */}
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-bold truncate transition-all ${
                                      session.completed
                                        ? "line-through text-muted-foreground"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {subject.nameAr}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    {session.time && (
                                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {formatTimeAr(session.time)}
                                      </span>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      {formatDurationAr(session.duration)}
                                    </span>
                                    <Badge
                                      className="text-[9px] font-medium px-1.5 py-0 h-5"
                                      style={{
                                        backgroundColor: `${subject.color}12`,
                                        color: subject.color,
                                        border: `1px solid ${subject.color}25`,
                                      }}
                                    >
                                      {subject.category}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Delete button */}
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => removeStudySession(session.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
