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
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import { useEffect } from "react";

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
            <QuickAccessSection />
          </div>
        )}
        {currentView === "dashboard" && <StudentDashboard />}
        {currentView === "subjects" && <SubjectsGrid />}
        {currentView === "subject-detail" && <SubjectDetail />}
        {currentView === "search" && <AdvancedSearch />}
        {currentView === "about" && <AboutPage />}
      </motion.div>
    </AnimatePresence>
  );
}

function QuickAccessSection() {
  const { selectSubject, setView } = useAppStore();
  const quickSubjects = subjectsData.slice(0, 6);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Quick Access */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              أحدث المواد
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
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
              className="cursor-pointer"
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

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">التصنيفات</h2>
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
                className="cursor-pointer"
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

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gradient-hero rounded-2xl p-8 sm:p-12 text-center text-white space-y-4 relative overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,168,67,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            ابدأ رحلتك التعليمية اليوم
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            تتبع تقدمك في جميع المواد، نظّم ملاحظاتك، وكن على الطريق الصحيح
            نحو التفوق
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setView("dashboard")}
              className="btn-omni-gold rounded-xl px-6 py-3 font-semibold transition-all"
            >
              لوحة المتعلم
            </button>
            <button
              onClick={() => setView("subjects")}
              className="glass rounded-xl px-6 py-3 font-semibold text-white border-white/20 hover:bg-white/10 transition-all"
            >
              تصفح المواد
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { theme } = useAppStore();

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
      <Header />
      <main className="flex-1">
        <ViewRenderer />
      </main>
      <Footer />
    </div>
  );
}
