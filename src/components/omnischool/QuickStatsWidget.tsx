"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { subjectsData } from "@/lib/subjects-data";
import { BookOpen, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated Counter — Counts up from 0 to target value               */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card accent bar colors                                        */
/* ------------------------------------------------------------------ */
const cardConfigs = [
  {
    icon: BookOpen,
    label: "مادة دراسية",
    color: "#B91C1C",
    gradientClass: "stat-card-gradient-red",
    accentBg: "linear-gradient(90deg, #B91C1C, #DC2626)",
    iconBg: "rgba(185, 28, 28, 0.1)",
    darkIconBg: "rgba(239, 68, 68, 0.12)",
  },
  {
    icon: CheckCircle2,
    label: "مكتملة",
    color: "#16A34A",
    gradientClass: "stat-card-gradient-green",
    accentBg: "linear-gradient(90deg, #16A34A, #22C55E)",
    iconBg: "rgba(22, 163, 74, 0.1)",
    darkIconBg: "rgba(34, 197, 94, 0.12)",
  },
  {
    icon: TrendingUp,
    label: "قيد التقدم",
    color: "#D4A843",
    gradientClass: "stat-card-gradient-gold",
    accentBg: "linear-gradient(90deg, #D4A843, #E5C168)",
    iconBg: "rgba(212, 168, 67, 0.1)",
    darkIconBg: "rgba(212, 168, 67, 0.12)",
  },
  {
    icon: BarChart3,
    label: "متوسط التقدم",
    color: "#7C3AED",
    gradientClass: "stat-card-gradient-purple",
    accentBg: "linear-gradient(90deg, #7C3AED, #A78BFA)",
    iconBg: "rgba(124, 58, 237, 0.1)",
    darkIconBg: "rgba(167, 139, 250, 0.12)",
  },
];

/* ------------------------------------------------------------------ */
/*  Quick Stats Widget                                                 */
/* ------------------------------------------------------------------ */
export function QuickStatsWidget() {
  const { progress } = useAppStore();

  const stats = useMemo(() => {
    const total = subjectsData.length;
    const completed = progress.filter((p) => p.status === "completed").length;
    const inProgress = progress.filter((p) => p.status === "in_progress").length;
    const avgProgress =
      total > 0
        ? Math.round(
            subjectsData.reduce((acc, s) => {
              const p = progress.find((pr) => pr.subjectId === s.id);
              return acc + (p?.progress || 0);
            }, 0) / total
          )
        : 0;
    return { total, completed, inProgress, avgProgress };
  }, [progress]);

  const values = [stats.total, stats.completed, stats.inProgress, stats.avgProgress];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {cardConfigs.map((cfg, idx) => {
        const Icon = cfg.icon;
        const isPercent = idx === 3;
        return (
          <motion.div
            key={cfg.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.04,
              y: -3,
              transition: { duration: 0.2 },
            }}
            className={`${cfg.gradientClass} glass card-ornament rounded-xl p-4 sm:p-5 text-center cursor-default card-shine animate-border-glow relative overflow-hidden group`}
          >
            {/* Accent bar at top */}
            <div
              className="absolute top-0 right-0 left-0 h-1 rounded-t-xl"
              style={{ background: cfg.accentBg }}
            />

            {/* Decorative corner element */}
            <div
              className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
              style={{ background: cfg.color }}
            />

            {/* Icon — larger and more prominent */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mx-auto flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
              style={{ backgroundColor: cfg.iconBg }}
            >
              <Icon className="size-6 sm:size-7" style={{ color: cfg.color }} />
            </div>

            {/* Animated counter value */}
            <p
              className="text-2xl sm:text-3xl font-black ltr-content animate-count-up"
              dir="ltr"
              style={{ color: cfg.color }}
            >
              <AnimatedCounter
                target={values[idx]}
                suffix={isPercent ? "%" : ""}
              />
            </p>

            {/* Label */}
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              {cfg.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
