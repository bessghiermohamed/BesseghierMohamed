"use client";

import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Search, BookOpen, Layers, Tag, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, type FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */
const STATS = [
  { icon: BookOpen, value: "24", label: "مادة" },
  { icon: Layers, value: "2", label: "سداسي" },
  { icon: Tag, value: "7", label: "تصنيفات" },
  { icon: Share2, value: "10", label: "مواد مشتركة" },
] as const;

/* ------------------------------------------------------------------ */
/*  Floating decorative particle                                       */
/* ------------------------------------------------------------------ */
function FloatingDot({
  size,
  top,
  left,
  delay,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full bg-omni-gold/20 dark:bg-omni-gold/10"
      style={{ width: size, height: size, top, left }}
      animate={{
        y: [0, -12, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero section                                                       */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const { setView, setSearchQuery } = useAppStore();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      setView("search");
    }
  };

  /* Container variants for staggered children */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="gradient-hero relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20 sm:py-28">
      {/* ---- Gold radial glow overlay ---- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 40% 30%, rgba(212,168,67,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ---- Floating decorative elements ---- */}
      <FloatingDot size={10} top="12%" left="10%" delay={0} />
      <FloatingDot size={6} top="22%" left="80%" delay={0.8} />
      <FloatingDot size={14} top="65%" left="15%" delay={1.6} />
      <FloatingDot size={8} top="75%" left="85%" delay={2.4} />
      <FloatingDot size={12} top="35%" left="90%" delay={0.4} />
      <FloatingDot size={6} top="85%" left="50%" delay={1.2} />
      <FloatingDot size={10} top="8%" left="55%" delay={2.0} />
      <FloatingDot size={8} top="50%" left="5%" delay={3.0} />

      {/* ---- Content ---- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Omni
          <span className="text-omni-gold">School</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-2 text-lg font-medium text-white/90 sm:text-xl"
        >
          منصة تعليمية متكاملة لطلبة المدرسة العليا للأساتذة
        </motion.p>

        {/* Sub-subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-10 text-base text-omni-gold-light/80 sm:text-lg"
        >
          فرع PEP — تخصص الأدب العربي
        </motion.p>

        {/* Search bar */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className="relative mb-10 w-full max-w-xl"
        >
          <div className="glow-gold-sm rounded-xl">
            <div className="glass-strong flex items-center rounded-xl border border-white/20 shadow-lg transition-shadow focus-within:shadow-xl focus-within:border-omni-gold/40">
              <Search className="ms-4 size-5 shrink-0 text-omni-gold" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن مادة، تصنيف، أو كود..."
                className="h-12 border-0 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
              <button
                type="submit"
                className="btn-omni-primary ms-2 me-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all"
              >
                بحث
              </button>
            </div>
          </div>
        </motion.form>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.08, y: -2 }}
                className="glass-gold flex items-center gap-2 rounded-full px-4 py-2 sm:px-5 sm:py-2.5"
              >
                <Icon className="size-4 text-omni-gold" />
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/80">{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ---- Bottom fade ---- */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
