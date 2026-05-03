"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Users,
  Heart,
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Star,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: BookOpen,
    title: "24 مادة دراسية",
    description: "مواد كاملة للسداسيين الأول والثاني مع تصنيفات واضحة",
    color: "#B91C1C",
  },
  {
    icon: Zap,
    title: "تتبع التقدم",
    description: "تابع تقدمك في كل مادة مع إحصائيات ومخططات بصرية",
    color: "#D4A843",
  },
  {
    icon: Shield,
    title: "حفظ محلي",
    description: "بياناتك محفوظة بشكل آمن في متصفحك بدون حساب",
    color: "#059669",
  },
  {
    icon: Globe,
    title: "RTL عربي",
    description: "واجهة عربية بالكامل مع دعم كامل للاتجاه من اليمين",
    color: "#2563EB",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AboutPage() {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero */}
      <motion.div
        variants={itemVariants}
        className="text-center space-y-4 py-8"
      >
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-omni-red/10 flex items-center justify-center">
            <GraduationCap className="size-10 text-omni-red" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          حول{" "}
          <span className="gradient-text-red-gold">
            OmniSchool
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          منصة تعليمية متكاملة مصممة خصيصاً لطلبة المدرسة العليا للأساتذة
          بالجزائر، فرع PEP، تخصص الأدب العربي
        </p>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        variants={itemVariants}
        className="glass rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-omni-red/10 flex items-center justify-center">
              <MapPin className="size-5 text-omni-red" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المؤسسة</p>
              <p className="font-semibold">المدرسة العليا للأساتذة ENS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-omni-gold/10 flex items-center justify-center">
              <Users className="size-5 text-omni-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الفرع</p>
              <p className="font-semibold">PEP — تخصص الأدب العربي</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Calendar className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المدة</p>
              <p className="font-semibold">سداسيان — 24 مادة دراسية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Star className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المواد المشتركة</p>
              <p className="font-semibold">10 مواد مشتركة بين السداسيين</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="size-5 text-omni-gold" />
          مميزات المنصة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass card-omni h-full">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${feature.color}12` }}
                    >
                      <Icon
                        className="size-6"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Semester Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="size-5 text-omni-red" />
          نظرة على المواد
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="glass overflow-hidden border-border">
            <div className="h-1.5 bg-gradient-to-l from-omni-red to-red-400" />
            <CardContent className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-3">
                السداسي الأول
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 9 مواد تخصص + 3 مواد مشتركة</li>
                <li>• تصنيفات: تربوية، نفسية، لغوية، اجتماعية</li>
                <li>• مواد أساسية: أصول التربية، علم النفس العام</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="glass overflow-hidden border-border">
            <div className="h-1.5 bg-gradient-to-l from-omni-gold to-amber-400" />
            <CardContent className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-3">
                السداسي الثاني
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 9 مواد تخصص + 3 مواد مشتركة</li>
                <li>• تصنيفات: تربوية، نفسية، لغوية، منهجية</li>
                <li>• مواد أساسية: طرق التدريس، التربية العملية</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Globe className="size-5 text-omni-gold" />
          التقنيات المستخدمة
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js 16",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
            "Framer Motion",
            "Zustand",
            "Prisma",
            "SQLite",
          ].map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-sm px-3 py-1"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
      >
        <Button
          className="btn-omni-primary gap-2"
          onClick={() =>
            window.open(
              "https://github.com/BesseghierMohamed/OmniSchool",
              "_blank"
            )
          }
        >
          <Github className="size-4" />
          المشروع على GitHub
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() =>
            window.open(
              "https://besseghiermohamed.github.io/OmniSchool/",
              "_blank"
            )
          }
        >
          <ExternalLink className="size-4" />
          زيارة الموقع
        </Button>
      </motion.div>

      {/* Credits */}
      <motion.div variants={itemVariants} className="text-center pt-4">
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground">
          صُمم وطوّر بـ ❤️ بواسطة{" "}
          <span className="font-semibold text-omni-red">
            Besseghier Mohamed
          </span>
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          المدرسة العليا للأساتذة — الجزائر © {new Date().getFullYear()}
        </p>
      </motion.div>
    </motion.div>
  );
}
