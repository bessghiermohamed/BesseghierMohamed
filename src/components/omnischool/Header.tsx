"use client";

import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  BookOpen,
  LayoutDashboard,
  Search,
  Info,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { ViewType } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Nav link data                                                      */
/* ------------------------------------------------------------------ */
interface NavLink {
  label: string;
  view: ViewType;
  icon: React.ElementType;
}

const NAV_LINKS: NavLink[] = [
  { label: "الرئيسية", view: "home", icon: Home },
  { label: "المواد", view: "subjects", icon: BookOpen },
  { label: "لوحة الطالب", view: "dashboard", icon: LayoutDashboard },
  { label: "بحث متقدم", view: "search", icon: Search },
  { label: "حول المنصة", view: "about", icon: Info },
];

/* ------------------------------------------------------------------ */
/*  Header component                                                   */
/* ------------------------------------------------------------------ */
export default function Header() {
  const { currentView, setView, theme, toggleTheme } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Track scroll for enhanced glass effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Apply theme class to <html> */
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleNav = (view: ViewType) => {
    setView(view);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "glass"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ---- Logo (RTL → right side) ---- */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleNav("home")}
        >
          <GraduationCap className="size-8 text-omni-gold" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Omni
            <span className="text-omni-gold">School</span>
          </span>
        </motion.div>

        {/* ---- Desktop nav links ---- */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = currentView === link.view;
            const Icon = link.icon;
            return (
              <motion.button
                key={link.view}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNav(link.view)}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-omni-red dark:text-red-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span>{link.label}</span>
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute bottom-0 right-0 left-0 h-0.5 origin-center rounded-full bg-omni-red dark:bg-red-400"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* ---- Right actions: theme toggle + mobile menu ---- */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="تبديل المظهر"
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="size-5 text-omni-gold" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="size-5 text-omni-red" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="القائمة">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="glass-strong w-72 pt-12"
              >
                {/* Mobile nav header */}
                <div className="mb-6 flex items-center gap-2 px-2">
                  <GraduationCap className="size-7 text-omni-gold" />
                  <span className="text-lg font-bold text-foreground">
                    Omni<span className="text-omni-gold">School</span>
                  </span>
                </div>

                {/* Divider */}
                <div className="divider-omni mb-4" />

                {/* Mobile links */}
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = currentView === link.view;
                    const Icon = link.icon;
                    return (
                      <motion.button
                        key={link.view}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleNav(link.view)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-right text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-omni-red/10 text-omni-red dark:bg-red-900/20 dark:text-red-400"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="size-5" />
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="ms-auto h-2 w-2 rounded-full bg-omni-red dark:bg-red-400" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Bottom info */}
                <div className="mt-auto border-t border-border pt-4">
                  <p className="px-4 text-xs text-muted-foreground" dir="rtl">
                    منصة OmniSchool التعليمية
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
