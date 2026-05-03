"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { subjectsData, categories } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import { SubjectCard } from "./SubjectCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  BookOpen,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";

export function SubjectsGrid() {
  const { progress, selectSubject, selectedSemester, setSelectedSemester } =
    useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredSubjects = useMemo(() => {
    let subjects = subjectsData.filter(
      (s) => s.semester === selectedSemester
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      subjects = subjects.filter(
        (s) =>
          s.nameAr.includes(q) ||
          s.nameEn?.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.description?.includes(q)
      );
    }

    if (selectedCategory) {
      subjects = subjects.filter((s) => s.category === selectedCategory);
    }

    return subjects.sort((a, b) => a.order - b.order);
  }, [selectedSemester, searchQuery, selectedCategory]);

  const getProgress = (subjectId: string) =>
    progress.find((p) => p.subjectId === subjectId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          المواد الدراسية
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          تصفح جميع المواد الدراسية حسب السداسي والتصنيف
        </p>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المواد..."
              className="pe-10 h-11 glass border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-11 w-11"
            >
              <Grid3X3 className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-11 w-11"
            >
              <List className="size-4" />
            </Button>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-11 gap-2 px-4"
            >
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">تصفية</span>
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Filter className="size-4 text-omni-red" />
                    تصفية حسب التصنيف
                  </h3>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="text-xs text-muted-foreground hover:text-omni-red transition-colors flex items-center gap-1"
                    >
                      <X className="size-3" />
                      إزالة التصفية
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === "" ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => setSelectedCategory("")}
                  >
                    الكل
                  </Badge>
                  {categories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={
                        selectedCategory === cat.id ? "default" : "outline"
                      }
                      className="cursor-pointer transition-all hover:scale-105"
                      style={
                        selectedCategory === cat.id
                          ? {
                              backgroundColor: cat.color,
                              borderColor: cat.color,
                            }
                          : {
                              borderColor: `${cat.color}40`,
                              color: cat.color,
                            }
                      }
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Semester Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          value={String(selectedSemester)}
          onValueChange={(v) => setSelectedSemester(Number(v) as 1 | 2)}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="1" className="gap-2">
              <BookOpen className="size-4" />
              السداسي الأول
            </TabsTrigger>
            <TabsTrigger value="2" className="gap-2">
              <BookOpen className="size-4" />
              السداسي الثاني
            </TabsTrigger>
          </TabsList>

          {([1, 2] as const).map((sem) => (
            <TabsContent key={sem} value={String(sem)}>
              {/* Results count */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredSubjects.length === 0
                    ? "لا توجد نتائج"
                    : `${filteredSubjects.length} مادة`}
                </p>
              </div>

              {/* Subjects Grid/List */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sem}-${viewMode}-${selectedCategory}-${searchQuery}`}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      : "flex flex-col gap-3"
                  }
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredSubjects.map((subject) => (
                    <motion.div key={subject.id} variants={itemVariants}>
                      <SubjectCard
                        subject={subject}
                        progress={getProgress(subject.id)}
                        onClick={() => selectSubject(subject.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredSubjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <BookOpen className="size-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    لا توجد مواد مطابقة
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    حاول تغيير معايير البحث أو التصفية
                  </p>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
