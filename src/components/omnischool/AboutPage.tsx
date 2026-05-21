"use client";

import { useEffect, useState } from "react";
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
  Eye,
  Target,
  Sparkles,
  ArrowLeft,
  Quote,
  Code2,
  Palette,
  TrendingUp,
  MousePointerClick,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 24, label: "مادة دراسية", icon: BookOpen, color: "#B91C1C" },
  { value: 2, label: "سداسي", icon: Calendar, color: "#D4A843" },
  { value: 7, label: "تصنيفات", icon: Target, color: "#059669" },
  { value: 10, label: "+ مواد مشتركة", icon: Star, color: "#7C3AED" },
];

const features = [
  {
    icon: BookOpen,
    title: "24 مادة دراسية",
    description: "مواد كاملة للسداسيين الأول والثاني مع تصنيفات واضحة",
    color: "#B91C1C",
  },
  {
    icon: TrendingUp,
    title: "تتبع التقدم",
    description: "تابع تقدمك في كل مادة مع إحصائيات ومخططات بصرية",
    color: "#D4A843",
  },
  {
    icon: Shield,
    title: "حفظ محلي آمن",
    description: "بياناتك محفوظة بشكل آمن في متصفحك بدون حساب أو تسجيل",
    color: "#059669",
  },
  {
    icon: Palette,
    title: "وضع مظلم وفاتح",
    description: "واجهة بألوان دافئة تناسب جميع الأوقات والظروف",
    color: "#7C3AED",
  },
  {
    icon: MousePointerClick,
    title: "تفاعل سلس",
    description: "حركات وانتقالات سلسة مع دعم كامل للعربية RTL",
    color: "#0891B2",
  },
  {
    icon: Sparkles,
    title: "ذكاء اصطناعي",
    description: "مساعد دراسي ذكي يجيب على أسئلتك ويرشدك في دراستك",
    color: "#E11D48",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "اختر مادتك",
    description: "تصفح المواد مصنفة حسب السداسي والنوع واختر ما تريد دراسته",
    icon: BookOpen,
    color: "#B91C1C",
  },
  {
    step: 2,
    title: "تتبع تقدمك",
    description: "حدد نسبة إنجازك وحالة كل مادة واحفظ ملاحظاتك الشخصية",
    icon: Target,
    color: "#D4A843",
  },
  {
    step: 3,
    title: "حقق أهدافك",
    description: "استخدم جدول الدراسة ومؤقت بومودورو لتنظيم وقتك بفعالية",
    icon: CheckCircle2,
    color: "#059669",
  },
];

const testimonials = [
  {
    name: "أمينة بوعلام",
    role: "طالبة — السداسي الثاني",
    text: "ساعدتني المنصة كثيراً في تنظيم دراستي وتتبع تقدمي في كل مادة. أصبحت أكثر التزاماً بخطتي الدراسية!",
    avatar: "أ",
    color: "#B91C1C",
  },
  {
    name: "محمد أمين حمداني",
    role: "طالب — السداسي الأول",
    text: "واجهة جميلة وسهلة الاستخدام. ميزة الملاحظات والروابط لمصادر Drive وفّرت علي وقتاً كبيراً في البحث.",
    avatar: "م",
    color: "#D4A843",
  },
  {
    name: "فاطمة الزهراء بلقاسم",
    role: "طالبة — السداسي الثاني",
    text: "المؤقت بومودورو وجدول الدراسة الأسبوعي غيّرا طريقة مذاكرتي بالكامل. أنصح كل طالب باستخدامهما!",
    avatar: "ف",
    color: "#059669",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter Component                                          */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                  */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ================================================================== */
/*  AboutPage Component                                                */
/* ================================================================== */
export function AboutPage() {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ============================================================ */}
      {/* Hero Section with Islamic Pattern Overlay                    */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 islamic-pattern-bg opacity-100">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(212,168,67,0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(212,168,67,0.08) 0%, transparent 40%)
            `,
          }} />
        </div>
        {/* Decorative floating shapes */}
        <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-white/10 animate-float" />
        <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full border border-white/5 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full bg-omni-gold/10 animate-float" style={{ animationDelay: "2s" }} />

        {/* Content */}
        <div className="relative z-10 text-center py-16 sm:py-20 space-y-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-2"
          >
            <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
              <GraduationCap className="size-12 text-white drop-shadow-lg" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white text-shadow-omni"
          >
            حول{" "}
            <span className="text-omni-gold-light">OmniSchool</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            منصة تعليمية متكاملة مصممة خصيصاً لطلبة المدرسة العليا للأساتذة
            بالجزائر، فرع PEP، تخصص الأدب العربي
          </motion.p>

          {/* Decorative ornamental divider */}
          <div className="decorative-line max-w-xs mx-auto pt-2">
            <div className="diamond" />
          </div>

          {/* Info pills row */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 pt-2"
          >
            {[
              { icon: MapPin, text: "ENS — الجزائر" },
              { icon: Users, text: "PEP — أدب عربي" },
              { icon: Calendar, text: "سداسيان — 24 مادة" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/15"
              >
                <item.icon className="size-4 text-omni-gold-light" />
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Animated Statistics Counter Row                              */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={scaleVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                className="card-depth bg-card border border-border rounded-2xl p-5 text-center relative overflow-hidden"
              >
                {/* Decorative accent bar */}
                <div
                  className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${stat.color}, ${stat.color}88)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}12` }}
                >
                  <Icon className="size-6" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold ltr-content" style={{ color: stat.color }} dir="ltr">
                  <AnimatedCounter target={stat.value} />
                </div>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Features Showcase — 3x2 Grid with Card Depth                 */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Sparkles className="size-5 text-omni-gold" />
          <span className="section-header-line">مميزات المنصة</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <Card className="card-depth bg-card border border-border h-full">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${feature.color}12` }}
                    >
                      <Icon className="size-7" style={{ color: feature.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
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

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* How It Works — 3 Steps with Connecting Lines                 */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <Eye className="size-5 text-omni-red" />
          <span className="section-header-line">كيف تعمل المنصة؟</span>
        </h2>
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden sm:block absolute top-16 right-[16.67%] left-[16.67%] h-0.5 bg-gradient-to-l from-[#B91C1C]/30 via-[#D4A843]/50 to-[#059669]/30" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="relative text-center"
                >
                  {/* Step number circle */}
                  <div className="relative mx-auto mb-5">
                    <div
                      className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border-4 border-background shadow-lg relative z-10"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <span
                        className="text-2xl font-black"
                        style={{ color: step.color }}
                      >
                        {step.step}
                      </span>
                    </div>
                    {/* Glow ring */}
                    <div
                      className="absolute inset-0 rounded-full animate-pulse opacity-30"
                      style={{
                        boxShadow: `0 0 20px ${step.color}40, 0 0 40px ${step.color}20`,
                      }}
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}12` }}
                  >
                    <Icon className="size-6" style={{ color: step.color }} />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Semester Overview                                            */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <BookOpen className="size-5 text-omni-red" />
          <span className="section-header-line">نظرة على المواد</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="card-depth bg-card border border-border overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-l from-omni-red to-red-400" />
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-omni-red/10 flex items-center justify-center">
                    <BookOpen className="size-4 text-omni-red" />
                  </div>
                  السداسي الأول
                </h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-omni-red mt-2 shrink-0" />
                    9 مواد تخصص + 3 مواد مشتركة
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-omni-red mt-2 shrink-0" />
                    تصنيفات: تربوية، نفسية، لغوية، اجتماعية
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-omni-red mt-2 shrink-0" />
                    مواد أساسية: أصول التربية، علم النفس العام
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="card-depth bg-card border border-border overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-l from-omni-gold to-amber-400" />
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-omni-gold/10 flex items-center justify-center">
                    <BookOpen className="size-4 text-omni-gold" />
                  </div>
                  السداسي الثاني
                </h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-omni-gold mt-2 shrink-0" />
                    9 مواد تخصص + 3 مواد مشتركة
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-omni-gold mt-2 shrink-0" />
                    تصنيفات: تربوية، نفسية، لغوية، منهجية
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-omni-gold mt-2 shrink-0" />
                    مواد أساسية: طرق التدريس، التربية العملية
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Testimonials Section                                         */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Heart className="size-5 text-omni-red" />
          <span className="section-header-line">آراء الطلاب</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Card className="card-depth bg-card border border-border h-full relative overflow-hidden">
                {/* Accent bar at top */}
                <div
                  className="absolute top-0 right-0 left-0 h-1"
                  style={{ backgroundColor: testimonial.color }}
                />
                <CardContent className="p-6 pt-7">
                  <Quote
                    className="size-8 mb-3 opacity-15"
                    style={{ color: testimonial.color }}
                  />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Tech Stack                                                   */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Code2 className="size-5 text-omni-gold" />
          <span className="section-header-line">التقنيات المستخدمة</span>
        </h2>
        <Card className="card-depth bg-card border border-border">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Next.js 16", color: "#000000" },
                { name: "TypeScript", color: "#3178C6" },
                { name: "Tailwind CSS", color: "#06B6D4" },
                { name: "shadcn/ui", color: "#000000" },
                { name: "Framer Motion", color: "#FF0055" },
                { name: "Zustand", color: "#764ABC" },
                { name: "Prisma", color: "#2D3748" },
                { name: "SQLite", color: "#003B57" },
              ].map((tech) => (
                <Badge
                  key={tech.name}
                  variant="outline"
                  className="text-sm px-4 py-1.5 hover:bg-muted/50 transition-colors"
                  style={{
                    borderColor: `${tech.color}30`,
                    color: tech.color === "#000000" ? undefined : tech.color,
                  }}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Team / Credits Section                                       */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Users className="size-5 text-omni-red" />
          <span className="section-header-line">فريق العمل</span>
        </h2>
        <Card className="card-depth bg-card border border-border relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-[0.03] islamic-pattern-bg" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-omni-red/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-omni-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <CardContent className="relative z-10 p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-omni-red/10 flex items-center justify-center border border-omni-red/15">
                <span className="text-3xl font-black text-omni-red">B</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Besseghier Mohamed
            </h3>
            <p className="text-muted-foreground text-sm">
              مطور ومصمم المنصة — طالب في المدرسة العليا للأساتذة
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-omni-red" />
              <span>المدرسة العليا للأساتذة ENS — الجزائر</span>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  window.open("https://github.com/BesseghierMohamed", "_blank")
                }
              >
                <Github className="size-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  window.open("mailto:besseghiermohamed@gmail.com", "_blank")
                }
              >
                <Mail className="size-4" />
                البريد الإلكتروني
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* ============================================================ */}
      {/* Action Links                                                 */}
      {/* ============================================================ */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Button
          className="btn-omni-primary btn-ripple gap-2 text-base px-6 py-5"
          onClick={() =>
            window.open(
              "https://github.com/BesseghierMohamed/OmniSchool",
              "_blank"
            )
          }
        >
          <Github className="size-5" />
          المشروع على GitHub
        </Button>
        <Button
          variant="outline"
          className="gap-2 text-base px-6 py-5"
          onClick={() =>
            window.open(
              "https://besseghiermohamed.github.io/OmniSchool/",
              "_blank"
            )
          }
        >
          <ExternalLink className="size-5" />
          زيارة الموقع
        </Button>
      </motion.div>

      {/* ============================================================ */}
      {/* Footer Credits                                               */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants} className="text-center pt-6 pb-2">
        <div className="decorative-line max-w-xs mx-auto mb-4">
          <div className="diamond" />
        </div>
        <p className="text-sm text-muted-foreground">
          صُمم وطوّر بـ <Heart className="size-3.5 inline-block text-omni-red mx-0.5" /> بواسطة{" "}
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
