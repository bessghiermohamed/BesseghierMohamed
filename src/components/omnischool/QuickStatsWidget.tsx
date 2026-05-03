"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { subjectsData } from "@/lib/subjects-data";
import { BookOpen, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";

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

  const items = [
    {
      icon: BookOpen,
      value: stats.total,
      label: "مادة دراسية",
      color: "#B91C1C",
      bgColor: "rgba(185, 28, 28, 0.08)",
    },
    {
      icon: CheckCircle2,
      value: stats.completed,
      label: "مكتملة",
      color: "#16A34A",
      bgColor: "rgba(22, 163, 74, 0.08)",
    },
    {
      icon: TrendingUp,
      value: stats.inProgress,
      label: "قيد التقدم",
      color: "#D4A843",
      bgColor: "rgba(212, 168, 67, 0.08)",
    },
    {
      icon: BarChart3,
      value: `${stats.avgProgress}%`,
      label: "متوسط التقدم",
      color: "#7C3AED",
      bgColor: "rgba(124, 58, 237, 0.08)",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="glass card-ornament rounded-xl p-4 text-center cursor-default card-shine"
          >
            <div
              className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center mb-2"
              style={{ backgroundColor: item.bgColor }}
            >
              <Icon className="size-5" style={{ color: item.color }} />
            </div>
            <p
              className="text-2xl font-black ltr-content animate-count-up"
              dir="ltr"
              style={{ color: item.color }}
            >
              {item.value}
            </p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              {item.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
