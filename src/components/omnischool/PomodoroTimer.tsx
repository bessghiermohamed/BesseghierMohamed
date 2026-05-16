"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Coffee,
  Brain,
  BookOpen,
  Flame,
  Trophy,
  CheckCircle2,
  Zap,
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
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { subjectsData } from "@/lib/subjects-data";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------
   Icon Mapping — maps subject.icon string → lucide-react component
   ------------------------------------------------------------------ */
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
   Timer modes
   ------------------------------------------------------------------ */
type TimerMode = "focus" | "shortBreak" | "longBreak";

const modeConfig: Record<
  TimerMode,
  {
    label: string;
    duration: number; // seconds
    icon: LucideIcon;
    color: string;
    bgClass: string;
    description: string;
  }
> = {
  focus: {
    label: "تركيز",
    duration: 25 * 60,
    icon: Brain,
    color: "#B91C1C",
    bgClass: "glass-red",
    description: "٢٥ دقيقة من التركيز الكامل",
  },
  shortBreak: {
    label: "استراحة قصيرة",
    duration: 5 * 60,
    icon: Coffee,
    color: "#D4A843",
    bgClass: "glass-gold",
    description: "٥ دقائق من الاستراحة",
  },
  longBreak: {
    label: "استراحة طويلة",
    duration: 15 * 60,
    icon: Coffee,
    color: "#059669",
    bgClass: "glass",
    description: "١٥ دقيقة من الاستراحة الطويلة",
  },
};

/* ------------------------------------------------------------------
   Helper: format seconds to MM:SS
   ------------------------------------------------------------------ */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/* ------------------------------------------------------------------
   Stagger animation variants
   ------------------------------------------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------
   PomodoroTimer Component
   ------------------------------------------------------------------ */
export function PomodoroTimer() {
  const { studySessions, addStudySession } = useAppStore();
  const { toast } = useToast();

  // Timer state
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(modeConfig.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  // Session tracking for auto-logging
  const sessionStartRef = useRef<Date | null>(null);

  // Refs for accessing latest state in interval callback
  const modeRef = useRef(mode);
  const pomodorosRef = useRef(pomodorosCompleted);
  const selectedSubjectRef = useRef(selectedSubjectId);

  // Keep refs in sync
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { pomodorosRef.current = pomodorosCompleted; }, [pomodorosCompleted]);
  useEffect(() => { selectedSubjectRef.current = selectedSubjectId; }, [selectedSubjectId]);

  // Get current mode config
  const config = modeConfig[mode];
  const totalDuration = config.duration;
  const progress = (totalDuration - timeLeft) / totalDuration;

  // Switch mode — defined before useEffect that references it
  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeConfig[newMode].duration);
  };

  // Timer complete handler — defined before useEffect that references it
  const handleTimerComplete = () => {
    const currentMode = modeRef.current;
    const currentPomodoros = pomodorosRef.current;
    const currentSubjectId = selectedSubjectRef.current;

    if (currentMode === "focus") {
      const newCount = currentPomodoros + 1;
      setPomodorosCompleted(newCount);

      // Auto-log study session if subject is selected
      if (currentSubjectId && sessionStartRef.current) {
        const subject = subjectsData.find((s) => s.id === currentSubjectId);
        if (subject) {
          addStudySession({
            id: crypto.randomUUID(),
            subjectId: currentSubjectId,
            date: new Date().toISOString().split("T")[0],
            duration: Math.round(modeConfig.focus.duration / 60),
            completed: true,
          });
        }
      }

      // Show completion toast
      toast({
        title: "🎉 أحسنت! انتهت جلسة التركيز",
        description: `أكملت البومودورو رقم ${newCount}. ${
          newCount % 4 === 0
            ? "حان وقت استراحة طويلة!"
            : "خذ استراحة قصيرة ثم تابع."
        }`,
        duration: 5000,
      });

      // Auto-switch to break
      if (newCount % 4 === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      // Break complete
      toast({
        title: "☕ انتهت الاستراحة!",
        description: "حان وقت العودة للتركيز. استعد!",
        duration: 4000,
      });
      switchMode("focus");
    }
  };

  // Countdown effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          // Use setTimeout to defer the handler call outside the setState updater
          setTimeout(() => handleTimerComplete(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Start/Pause
  const toggleTimer = () => {
    if (!isRunning && mode === "focus" && !sessionStartRef.current) {
      sessionStartRef.current = new Date();
    }
    setIsRunning(!isRunning);
  };

  // Reset
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(config.duration);
    sessionStartRef.current = null;
  };

  // Get subject info
  const selectedSubject = subjectsData.find((s) => s.id === selectedSubjectId);

  // SVG circle calculations
  const timerSize = 280;
  const strokeWidth = 10;
  const radius = (timerSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;
  const center = timerSize / 2;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl glass-red flex items-center justify-center">
            <Timer className="h-6 w-6 text-omni-red" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              مؤقت البومودورو
            </h1>
            <p className="text-muted-foreground text-sm">
              ركّز، استرح، وحقق أهدافك الدراسية
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass p-6 sm:p-8 space-y-6">
            {/* Mode Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {(Object.keys(modeConfig) as TimerMode[]).map((m) => {
                const cfg = modeConfig[m];
                const ModeIcon = cfg.icon;
                const isActive = mode === m;
                return (
                  <motion.button
                    key={m}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => switchMode(m)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? m === "focus"
                          ? "bg-omni-red text-white shadow-lg glow-red-sm"
                          : m === "shortBreak"
                          ? "bg-omni-gold text-white shadow-lg glow-gold-sm"
                          : "bg-green-600 text-white shadow-lg"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ModeIcon className="h-4 w-4" />
                    {cfg.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Mode Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={mode}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="text-center text-sm text-muted-foreground"
              >
                {config.description}
              </motion.p>
            </AnimatePresence>

            {/* Circular Timer */}
            <div className="flex justify-center py-4">
              <div className="relative" style={{ width: timerSize, height: timerSize }}>
                {/* Background glow effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-xl"
                  style={{
                    background: isRunning
                      ? `radial-gradient(circle, ${config.color}40 0%, transparent 70%)`
                      : "transparent",
                  }}
                />

                <svg
                  width={timerSize}
                  height={timerSize}
                  viewBox={`0 0 ${timerSize} ${timerSize}`}
                  className="transform -rotate-90"
                >
                  {/* Track */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="text-muted/30"
                  />

                  {/* Progress arc */}
                  <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={config.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Mode icon */}
                  <motion.div
                    key={`icon-${mode}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${config.color}15` }}
                    >
                      {mode === "focus" ? (
                        <Brain className="h-6 w-6" style={{ color: config.color }} />
                      ) : (
                        <Coffee className="h-6 w-6" style={{ color: config.color }} />
                      )}
                    </div>
                  </motion.div>

                  {/* Time display */}
                  <motion.span
                    key={timeLeft}
                    className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight"
                    style={{ color: config.color }}
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {formatTime(timeLeft)}
                  </motion.span>

                  {/* Mode label */}
                  <span className="text-sm font-medium text-muted-foreground mt-1">
                    {config.label}
                  </span>

                  {/* Selected subject indicator */}
                  {selectedSubject && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <SubjectIcon
                        iconName={selectedSubject.icon}
                        className="h-3.5 w-3.5"
                        style={{ color: selectedSubject.color }}
                      />
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {selectedSubject.nameAr}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                  disabled={isRunning && timeLeft === totalDuration}
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={toggleTimer}
                  className="btn-omni-primary h-14 w-14 rounded-2xl shadow-lg"
                  size="icon"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isRunning ? "pause" : "play"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isRunning ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ms-0.5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => {
                    if (mode === "focus") switchMode("shortBreak");
                    else switchMode("focus");
                  }}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                >
                  <Zap className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground text-center">
                ماذا تدرس؟
              </p>
              <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                <SelectTrigger className="w-full max-w-xs mx-auto">
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
          </Card>
        </motion.div>

        {/* Sidebar Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Session Counter Card */}
          <Card className="glass-red p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-omni-red" />
              <h3 className="text-base font-bold text-foreground">تقدم اليوم</h3>
            </div>

            {/* Pomodoro count */}
            <div className="text-center space-y-2">
              <motion.div
                key={pomodorosCompleted}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-5xl font-bold text-omni-red"
              >
                {pomodorosCompleted}
              </motion.div>
              <p className="text-sm text-muted-foreground">بومودورو مكتمل</p>
            </div>

            {/* Pomodoro indicators */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    i < pomodorosCompleted % 4
                      ? "bg-omni-red text-white"
                      : "bg-omni-red/10 text-omni-red/40"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </motion.div>
              ))}
            </div>

            {/* Cycle indicator */}
            {pomodorosCompleted > 0 && (
              <div className="text-center">
                <Badge className="badge-omni-gold">
                  الدورة {Math.floor(pomodorosCompleted / 4) + 1}
                </Badge>
              </div>
            )}
          </Card>

          {/* Today's Logged Sessions */}
          <Card className="glass p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-omni-gold" />
              <h3 className="text-base font-bold text-foreground">جلسات اليوم</h3>
            </div>

            {(() => {
              const todayStr = new Date().toISOString().split("T")[0];
              const todaySessions = studySessions.filter(
                (s) => s.date === todayStr && s.completed
              );

              if (todaySessions.length === 0) {
                return (
                  <div className="text-center py-6 space-y-2">
                    <BookOpen className="h-8 w-8 mx-auto text-muted-foreground/30" />
                    <p className="text-xs text-muted-foreground">
                      لم تسجّل أي جلسات بعد
                    </p>
                  </div>
                );
              }

              return (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2 max-h-64 overflow-y-auto"
                >
                  {todaySessions.map((session) => {
                    const subject = subjectsData.find(
                      (s) => s.id === session.subjectId
                    );
                    if (!subject) return null;

                    return (
                      <motion.div
                        key={session.id}
                        variants={itemVariants}
                        className="flex items-center gap-2 p-2 rounded-lg glass"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${subject.color}15` }}
                        >
                          <SubjectIcon
                            iconName={subject.icon}
                            className="h-4 w-4"
                            style={{ color: subject.color }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">
                            {subject.nameAr}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {session.duration} دقيقة
                          </p>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })()}
          </Card>

          {/* Tips Card */}
          <Card className="glass-gold p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-omni-gold" />
              <h3 className="text-base font-bold text-foreground">نصائح</h3>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-muted-foreground space-y-2"
            >
              <p>• اضبط المؤقت على ٢٥ دقيقة للتركيز</p>
              <p>• خذ استراحة ٥ دقائق بعد كل جلسة</p>
              <p>• بعد ٤ جلسات، خذ استراحة ١٥ دقيقة</p>
              <p>• اختر المادة قبل البدء لتتبع تقدمك</p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
