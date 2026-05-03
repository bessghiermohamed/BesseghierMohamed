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
import { StudyStreak } from "@/components/omnischool/StudyStreak";
import { DataExportImport } from "@/components/omnischool/DataExportImport";
import { QuickStatsWidget } from "@/components/omnischool/QuickStatsWidget";
import { MotivationalQuoteWidget } from "@/components/omnischool/MotivationalQuoteWidget";
import { StudyCountdownTimer } from "@/components/omnischool/StudyCountdownTimer";
import { ActivityTimeline } from "@/components/omnischool/ActivityTimeline";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import { useEffect, useState } from "react";
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
  () => import("@/components/omnischool/SemesterComparisonChart").then((m) => m.SemesterComparisonChart),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
const WeeklyGoalsTracker = dynamic(
  () => import("@/components/omnischool/WeeklyGoalsTracker").then((m) => m.WeeklyGoalsTracker),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
const SubjectComparison = dynamic(
  () => import("@/components/omnischool/SubjectComparison").then((m) => m.SubjectComparison),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
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
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
              <QuickStatsWidget />
            </div>
            <QuickAccessSection />
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

function QuickAccessSection() {
  const { selectSubject, setView } = useAppStore();
  const quickSubjects = subjectsData.slice(0, 6);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Quick Access */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground section-header-line">
              أحدث المواد
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              الوصول السريع لموادك الدراسية
            </p>
          </div>
          <button
            onClick={() => setView("subjects")}
            className="text-sm text-omni-red hover:text-omni-red/80 font-medium transition-colors"
          >
            عرض الكل ←
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickSubjects.map((subject: Subject, idx: number) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer hover-lift"
              onClick={() => selectSubject(subject.id)}
            >
              <div className="card-depth bg-card border border-border rounded-xl p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden group transition-all duration-300 hover:border-omni-red/20 hover:shadow-lg">
                {/* Accent bar — thicker, gradient */}
                <div
                  className="absolute top-0 right-0 left-0 h-1 rounded-t-xl"
                  style={{ background: `linear-gradient(90deg, ${subject.color}, ${subject.color}80)` }}
                />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm border border-border/50"
                  style={{ backgroundColor: `${subject.color}12` }}
                >
                  <span className="text-xl sm:text-2xl font-black" style={{ color: subject.color }}>
                    {subject.nameAr.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base truncate text-foreground">
                    {subject.nameAr}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {subject.category} • السداسي {subject.semester}
                  </p>
                </div>
                {subject.isShared && (
                  <span className="badge-omni-gold text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    مشترك
                  </span>
                )}
                {/* Arrow indicator */}
                <svg className="w-4 h-4 text-muted-foreground/40 group-hover:text-omni-red/60 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Quick Feature Cards — with depth/parallax effect */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground section-header-line">
          أدوات الدراسة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -4, rotateX: -2 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer"
            onClick={() => setView("planner")}
            style={{ perspective: 1000 }}
          >
            <div className="card-depth bg-card border border-border rounded-2xl p-6 sm:p-8 text-center space-y-3 hover:shadow-xl hover:border-omni-red/20 transition-all relative overflow-hidden group">
              {/* Red gradient top accent */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-omni-red to-omni-red-dark rounded-t-2xl" />
              <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-omni-red/10 animate-float border border-omni-red/10 shadow-sm">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-bold text-foreground text-lg">مخطط الدراسة</h3>
              <p className="text-sm text-muted-foreground">نظّم جدولك الأسبوعي</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -4, rotateX: -2 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer"
            onClick={() => setView("timer")}
            style={{ perspective: 1000 }}
          >
            <div className="card-depth bg-card border border-border rounded-2xl p-6 sm:p-8 text-center space-y-3 hover:shadow-xl hover:border-omni-gold/20 transition-all relative overflow-hidden group">
              {/* Gold gradient top accent */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-omni-gold to-omni-gold-dark rounded-t-2xl" />
              <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-omni-gold/10 animate-float border border-omni-gold/10 shadow-sm" style={{ animationDelay: "0.5s" }}>
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="font-bold text-foreground text-lg">مؤقت البومودورو</h3>
              <p className="text-sm text-muted-foreground">ركّز بتقنية البومودورو</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -4, rotateX: -2 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer"
            onClick={() => setView("dashboard")}
            style={{ perspective: 1000 }}
          >
            <div className="card-depth bg-card border border-border rounded-2xl p-6 sm:p-8 text-center space-y-3 hover:shadow-xl hover:border-green-500/20 transition-all relative overflow-hidden group">
              {/* Green gradient top accent */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-green-600 to-green-500 rounded-t-2xl" />
              <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-green-500/10 animate-float border border-green-500/10 shadow-sm" style={{ animationDelay: "1s" }}>
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-bold text-foreground text-lg">لوحة المتعلم</h3>
              <p className="text-sm text-muted-foreground">تتبع تقدّمك الدراسي</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Study Streak, Semester Comparison & Weekly Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StudyStreak />
        <SemesterComparisonChart />
        <WeeklyGoalsTracker />
      </div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Subject Comparison */}
      <SubjectComparison />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Activity Timeline */}
      <ActivityTimeline />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Motivational Quote Widget */}
      <MotivationalQuoteWidget />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Study Countdown Timer */}
      <StudyCountdownTimer />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground section-header-line">
          التصنيفات
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat, idx) => {
            const count = subjectsData.filter(
              (s) => s.category === cat.id
            ).length;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer"
                onClick={() => {
                  useAppStore.getState().setSearchCategory(cat.id);
                  useAppStore.getState().setView("search");
                }}
              >
                <div
                  className="card-depth bg-card border border-border rounded-xl p-4 sm:p-5 text-center space-y-2 relative overflow-hidden group transition-all duration-300 hover:shadow-lg"
                >
                  {/* Accent bar at top — thicker gradient */}
                  <div
                    className="absolute top-0 right-0 left-0 h-1 rounded-t-xl"
                    style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }}
                  />
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mx-auto flex items-center justify-center transition-transform group-hover:scale-110 border border-border/50 shadow-sm"
                    style={{ backgroundColor: `${cat.color}12` }}
                  >
                    <span className="text-xl sm:text-2xl font-black" style={{ color: cat.color }}>
                      {count}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    {cat.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {count === 1 ? 'مادة واحدة' : count === 2 ? 'مادتين' : `${count} مواد`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* CTA Section — enhanced with decorative elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gradient-hero rounded-2xl p-8 sm:p-12 text-center text-white space-y-4 relative overflow-hidden islamic-pattern-bg"
      >
        {/* Decorative floating circles */}
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-omni-gold/5 pointer-events-none" />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-omni-red/5 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-white/3 pointer-events-none" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,168,67,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <h2 className="text-shadow-omni text-2xl sm:text-3xl font-bold mb-2">
            ابدأ رحلتك التعليمية اليوم
          </h2>

          {/* Decorative line under CTA heading */}
          <div className="decorative-line mx-auto max-w-xs my-4">
            <span className="diamond" />
          </div>

          <p className="text-white/80 max-w-lg mx-auto mb-6">
            تتبع تقدمك في جميع المواد، نظّم ملاحظاتك، وكن على الطريق الصحيح
            نحو التفوق
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("dashboard")}
              className="btn-omni-gold rounded-xl px-7 py-3 font-semibold transition-all shadow-lg"
            >
              لوحة المتعلم
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("subjects")}
              className="glass rounded-xl px-7 py-3 font-semibold text-white border-white/20 hover:bg-white/10 transition-all"
            >
              تصفح المواد
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
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

  // Apply theme on mount
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
