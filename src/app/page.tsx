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
import { SemesterComparisonChart } from "@/components/omnischool/SemesterComparisonChart";
import { DataExportImport } from "@/components/omnischool/DataExportImport";
import { QuickStatsWidget } from "@/components/omnischool/QuickStatsWidget";
import { WeeklyGoalsTracker } from "@/components/omnischool/WeeklyGoalsTracker";
import { KeyboardShortcutsHelp } from "@/components/omnischool/KeyboardShortcutsHelp";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import { useEffect, useState } from "react";

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
              <div className="glass card-omni rounded-xl p-4 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  <span className="text-lg font-bold" style={{ color: subject.color }}>
                    {subject.nameAr.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">
                    {subject.nameAr}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {subject.category} • السداسي {subject.semester}
                  </p>
                </div>
                {subject.isShared && (
                  <span className="badge-omni-gold text-[10px] px-1.5 py-0.5 rounded-full">
                    مشترك
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider">
        <span className="diamond" />
      </div>

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
            <div className="glass-red gradient-border rounded-2xl p-6 sm:p-8 text-center space-y-3 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-omni-red/10 animate-float">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-bold text-foreground">مخطط الدراسة</h3>
              <p className="text-xs text-muted-foreground">نظّم جدولك الأسبوعي</p>
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
            <div className="glass-gold gradient-border rounded-2xl p-6 sm:p-8 text-center space-y-3 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-omni-gold/10 animate-float" style={{ animationDelay: "0.5s" }}>
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="font-bold text-foreground">مؤقت البومودورو</h3>
              <p className="text-xs text-muted-foreground">ركّز بمتقنية البومودورو</p>
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
            <div className="glass gradient-border rounded-2xl p-6 sm:p-8 text-center space-y-3 border border-border hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-green-500/10 animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-bold text-foreground">لوحة المتعلم</h3>
              <p className="text-xs text-muted-foreground">تتبع تقدّمك الدراسي</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider">
        <span className="diamond" />
      </div>

      {/* Study Streak, Semester Comparison & Weekly Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StudyStreak />
        <SemesterComparisonChart />
        <WeeklyGoalsTracker />
      </div>

      {/* Section Divider */}
      <div className="section-divider">
        <span className="diamond" />
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground section-header-line">
          التصنيفات
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const count = subjectsData.filter(
              (s) => s.category === cat.id
            ).length;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer hover-lift"
                onClick={() => {
                  useAppStore.getState().setSearchCategory(cat.id);
                  useAppStore.getState().setView("search");
                }}
              >
                <div
                  className="glass rounded-xl p-4 text-center space-y-2"
                  style={{ borderColor: `${cat.color}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    <span className="font-bold" style={{ color: cat.color }}>
                      {count}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {cat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider">
        <span className="diamond" />
      </div>

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
