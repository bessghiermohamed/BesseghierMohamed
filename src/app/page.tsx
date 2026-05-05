"use client";

import { useAppStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/omnischool/Header";
import HeroSection from "@/components/omnischool/HeroSection";
import { StudentDashboard } from "@/components/omnischool/StudentDashboard";
import { SubjectsGrid } from "@/components/omnischool/SubjectsGrid";
import { SubjectDetail } from "@/components/omnischool/SubjectDetail";
import { AdvancedSearch } from "@/components/omnischool/AdvancedSearch";
import { AboutPage } from "@/components/omnischool/AboutPage";
import { Footer } from "@/components/omnischool/Footer";
import { StudyPlanner } from "@/components/omnischool/StudyPlanner";
import { PomodoroTimer } from "@/components/omnischool/PomodoroTimer";
import { OnboardingModal } from "@/components/omnischool/OnboardingModal";
import { AchievementToast } from "@/components/omnischool/AchievementToast";
import { AIChatPanel } from "@/components/omnischool/AIChatPanel";
import { AnnouncementBanner } from "@/components/omnischool/AnnouncementBanner";
import { subjectsData } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { BookOpen, Clock, CheckCircle2, ChevronLeft } from "lucide-react";

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
const KeyboardShortcutsHelp = dynamic(
  () => import("@/components/omnischool/KeyboardShortcutsHelp").then((m) => m.KeyboardShortcutsHelp),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

function ViewRenderer() {
  const { currentView } = useAppStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
      >
        {currentView === "home" && (
          <div>
            <HeroSection />
            <HomePage />
          </div>
        )}
        {currentView === "dashboard" && <StudentDashboard />}
        {currentView === "subjects" && <SubjectsGrid />}
        {currentView === "subject-detail" && <SubjectDetail />}
        {currentView === "search" && <AdvancedSearch />}
        {currentView === "about" && <AboutPage />}
        {currentView === "planner" && <StudyPlanner />}
        {currentView === "timer" && <PomodoroTimer />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  Simplified Home Page — 3 Sections Only                            */
/*  1. Quick Stats (only real data, hidden if all zeros)              */
/*  2. Subject Cards (6 most recent)                                  */
/*  3. One CTA Button                                                 */
/* ================================================================== */
function HomePage() {
  const { progress, selectSubject, setView } = useAppStore();

  // Compute real stats
  const stats = useMemo(() => {
    const completed = progress.filter((p) => p.status === "completed").length;
    const inProgress = progress.filter((p) => p.status === "in_progress").length;
    const notStarted = subjectsData.length - completed - inProgress;
    const avgProgress =
      subjectsData.length > 0
        ? Math.round(
            subjectsData.reduce((acc, s) => {
              const p = progress.find((pr) => pr.subjectId === s.id);
              return acc + (p?.progress || 0);
            }, 0) / subjectsData.length
          )
        : 0;
    const hasAnyProgress = progress.length > 0;
    return { completed, inProgress, notStarted, avgProgress, hasAnyProgress };
  }, [progress]);

  // Get 6 subjects with progress (in-progress first), then remaining
  const displaySubjects = useMemo(() => {
    const withProgress = subjectsData
      .filter((s) => {
        const p = progress.find((pr) => pr.subjectId === s.id);
        return p && p.status !== "not_started";
      })
      .sort((a, b) => {
        const pa = progress.find((p) => p.subjectId === a.id);
        const pb = progress.find((p) => p.subjectId === b.id);
        return (pb?.progress || 0) - (pa?.progress || 0);
      });

    const withoutProgress = subjectsData.filter((s) => {
      const p = progress.find((pr) => pr.subjectId === s.id);
      return !p || p.status === "not_started";
    });

    return [...withProgress, ...withoutProgress].slice(0, 6);
  }, [progress]);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ──── Section 1: Quick Stats ──── */}
      {stats.hasAnyProgress ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-4"
        >
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            value={stats.completed}
            label="مكتملة"
            color="#16A34A"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            value={stats.inProgress}
            label="قيد التقدم"
            color="#D4A843"
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            value={stats.notStarted}
            label="لم تبدأ"
            color="#8B7E6A"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-omni-red/5 border border-omni-red/10">
            <span className="text-2xl">🎓</span>
            <p className="text-sm font-semibold text-foreground">
              {subjectsData.length} مادة دراسية بانتظارك — ابدأ الآن!
            </p>
          </div>
        </motion.div>
      )}

      {/* ──── Section 2: Subject Cards ──── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            موادك الدراسية
          </h2>
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setView("subjects")}
            className="text-sm text-omni-red hover:text-omni-red/80 font-medium transition-colors flex items-center gap-1"
          >
            عرض الكل
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {displaySubjects.map((subject: Subject, idx: number) => {
            const p = progress.find((pr) => pr.subjectId === subject.id);
            const pct = p?.progress || 0;
            const status = p?.status || "not_started";

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => selectSubject(subject.id)}
              >
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-omni-red/15">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${subject.color}10` }}
                  >
                    <span className="text-xl font-black" style={{ color: subject.color }}>
                      {subject.nameAr.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm truncate text-foreground">
                      {subject.nameAr}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subject.category} • السداسي {subject.semester}
                    </p>
                    {/* Mini progress bar */}
                    {pct > 0 && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: status === "completed"
                                ? "#16A34A"
                                : subject.color,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.06 }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground ltr-content" dir="ltr">
                          {pct}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status indicator */}
                  {status === "completed" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-green-100/80 text-green-700 border border-green-200">
                      مكتملة
                    </span>
                  )}
                  {status === "in_progress" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      جارية
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ──── Section 3: Single CTA ──── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="gradient-hero rounded-2xl p-6 sm:p-10 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            ابدأ رحلتك التعليمية اليوم
          </h2>
          <p className="text-white/70 max-w-md mx-auto text-sm leading-relaxed">
            تتبع تقدمك في جميع المواد، نظّم ملاحظاتك، وكن على الطريق الصحيح نحو التفوق
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("subjects")}
              className="btn-omni-gold rounded-xl px-6 py-3 text-sm font-bold transition-all shadow-lg"
            >
              📚 تصفح المواد
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("dashboard")}
              className="glass rounded-xl px-6 py-3 text-sm font-semibold text-white border-white/20 hover:bg-white/10 transition-all"
            >
              📊 لوحة المتعلم
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ──── Minimal Stat Card ──── */
function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-4 text-center space-y-2"
    >
      <div
        className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center"
        style={{ backgroundColor: `${color}12`, color }}
      >
        {icon}
      </div>
      <p className="text-2xl sm:text-3xl font-black" style={{ color }}>
        {value}
      </p>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[70] w-11 h-11 rounded-full bg-gradient-to-br from-omni-red to-omni-red-dark text-white shadow-lg glow-red-sm flex items-center justify-center"
          aria-label="العودة للأعلى"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { theme, hasOnboarded } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBanner />
      <Header />
      <main className="flex-1">
        <ViewRenderer />
      </main>
      <Footer />

      {/* Global Overlays */}
      <OnboardingModal />
      <AchievementToast />
      <AIChatPanel />
      <KeyboardShortcutsHelp />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
