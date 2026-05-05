"use client";

import { useAppStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/omnischool/Header";
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
import { SubjectResourceLibrary } from "@/components/omnischool/SubjectResourceLibrary";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BookOpen, Zap, TrendingUp } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Loading Skeleton for lazy-loaded components                       */
/* ------------------------------------------------------------------ */
const LoadingSkeleton = () => (
  <div className="rounded-xl p-6 animate-pulse bg-muted/40">
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
const ProgressReport = dynamic(
  () => import("@/components/omnischool/ProgressReport").then((m) => m.ProgressReport),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
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
        {currentView === "home" && <HomePage />}
        {currentView === "dashboard" && <StudentDashboard />}
        {currentView === "subjects" && <SubjectsGrid />}
        {currentView === "subject-detail" && <SubjectDetail />}
        {currentView === "search" && <AdvancedSearch />}
        {currentView === "about" && <AboutPage />}
        {currentView === "planner" && <StudyPlanner />}
        {currentView === "timer" && <PomodoroTimer />}
        {currentView === "resources" && <SubjectResourceLibrary />}
      </motion.div>
    </AnimatePresence>
  );
}

/* Enhanced section divider: simple elegant line */
function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />
  );
}

/* Clean hero section */
function HomePage() {
  const { setView, selectSubject } = useAppStore();
  const quickSubjects = subjectsData.slice(0, 3);

  return (
    <motion.div
      className="w-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-omni-red/5 to-transparent py-16 sm:py-24">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground text-balance">
              منصة <span className="text-omni-red">تعليمية</span> متكاملة
            </h1>
            <p className="text-xl text-foreground/70 text-balance max-w-2xl mx-auto">
              منصة موحدة لإدارة مسارك الدراسي وتحقيق أهدافك الأكاديمية
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("dashboard")}
              className="inline-flex items-center gap-2 bg-omni-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-omni-red/90 transition-colors"
            >
              ابدأ الآن
              <span className="text-lg">→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Quick Access - 3 Features */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">المزايا الرئيسية</h2>
            <p className="text-foreground/60 mt-2">ثلاث أدوات قوية لتحسين مسارك التعليمي</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "إدارة المواد",
                desc: "تنظيم وتتبع جميع المواد الدراسية في مكان واحد",
                color: "#B91C1C",
                action: () => setView("subjects")
              },
              {
                icon: Zap,
                title: "أدوات الإنتاجية",
                desc: "مؤقت البومودورو والمخطط الدراسي لزيادة فعاليتك",
                color: "#D4A843",
                action: () => setView("timer")
              },
              {
                icon: TrendingUp,
                title: "تتبع التقدم",
                desc: "مراقبة أدائك بشكل مفصل وتحقيق أهدافك",
                color: "#16A34A",
                action: () => setView("dashboard")
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={idx}
                  onClick={feature.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group text-start p-6 rounded-xl border border-border bg-card hover:border-border/80 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/60 text-sm">{feature.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <SectionDivider />

        {/* Quick Subjects Preview */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">أحدث المواد</h2>
              <p className="text-foreground/60 mt-2">وصول سريع إلى موادك الدراسية</p>
            </div>
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => setView("subjects")}
              className="text-omni-red hover:text-omni-red/80 font-semibold text-sm transition-colors flex items-center gap-1"
            >
              عرض الكل
              <span>←</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickSubjects.map((subject, idx) => (
              <motion.button
                key={subject.id}
                onClick={() => selectSubject(subject.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="group text-start p-4 rounded-lg border border-border bg-card hover:border-border/80 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  <span style={{ color: subject.color }} className="font-bold">
                    {subject.nameAr.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{subject.nameAr}</h3>
                <p className="text-xs text-foreground/60 mt-1">{subject.category}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <SectionDivider />

        {/* Stats Section */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">عن المنصة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "مادة دراسية", value: subjectsData.length, accent: "#B91C1C" },
              { label: "تصنيف", value: categories.length, accent: "#D4A843" },
              { label: "مستوى تفاعل", value: "عالي", accent: "#16A34A" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-lg bg-gradient-to-br from-muted/50 to-transparent border border-border/50"
              >
                <p className="text-foreground/60 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-2" style={{ color: stat.accent }}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </motion.div>
  );
}

export default function Home() {
  const { theme } = useAppStore();

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

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
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
          className="fixed bottom-6 right-6 z-[70] w-11 h-11 rounded-full bg-omni-red text-white shadow-lg flex items-center justify-center hover:bg-omni-red/90 transition-colors"
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
