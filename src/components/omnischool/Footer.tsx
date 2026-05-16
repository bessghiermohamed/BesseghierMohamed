"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Github, BookOpen, Mail, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto relative">
      {/* Elaborate multi-layer wave divider */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
          <path fill="rgba(185, 28, 28, 0.08)" d="M0,30L80,28C160,26,320,22,480,26C640,30,800,42,960,44C1120,46,1280,38,1360,34L1440,30L1440,60L0,60Z" />
          <path fill="rgba(185, 28, 28, 0.15)" d="M0,40L60,38C120,36,240,32,360,34C480,36,600,44,720,46C840,48,960,42,1080,38C1200,34,1320,36,1380,38L1440,40L1440,60L0,60Z" />
          <path fill="#1A0A0A" d="M0,48L72,46.7C144,45,288,43,432,44.7C576,46,720,51,864,50.7C1008,50,1152,45,1296,43.3L1440,48L1440,60L0,60Z" />
        </svg>
      </div>

      {/* Dark gradient background with Islamic pattern */}
      <div className="bg-gradient-to-b from-[#1A0A0A] to-[#0F0505] islamic-pattern-bg border-t border-omni-red/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-7 text-omni-gold" />
                <span className="text-xl font-bold text-white">
                  Omni<span className="text-omni-gold">School</span>
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                منصة تعليمية متكاملة لطلبة المدرسة العليا للأساتذة بالجزائر
              </p>
              {/* Decorative gold line */}
              <div className="w-16 h-0.5 bg-gradient-to-l from-omni-gold/60 to-omni-red/30 rounded-full" />
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-omni-gold">روابط سريعة</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2 footer-link-hover text-white/50 cursor-pointer">
                  <BookOpen className="size-3.5" />
                  <span>24 مادة دراسية</span>
                </div>
                <div className="flex items-center gap-2 footer-link-hover text-white/50 cursor-pointer">
                  <MapPin className="size-3.5" />
                  <span>المدرسة العليا للأساتذة ENS</span>
                </div>
                <div className="flex items-center gap-2 footer-link-hover text-white/50 cursor-pointer">
                  <Mail className="size-3.5" />
                  <span>فرع PEP — الأدب العربي</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-omni-gold">تواصل معنا</h4>
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white/40 hover:text-omni-gold hover:bg-white/5"
                    onClick={() =>
                      window.open(
                        "https://github.com/BesseghierMohamed/OmniSchool",
                        "_blank"
                      )
                    }
                    aria-label="GitHub"
                  >
                    <Github className="size-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <Separator className="mb-6 bg-white/5" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">
              صُمم بـ <Heart className="inline size-3 text-omni-red mx-0.5" /> بواسطة Besseghier Mohamed
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-white/30">
                © {new Date().getFullYear()} OmniSchool — جميع الحقوق محفوظة 🇩🇿
              </p>
              {/* Back to top link */}
              <button
                onClick={scrollToTop}
                className="footer-link-hover flex items-center gap-1 text-xs text-white/30 hover:text-omni-gold transition-colors"
              >
                <ArrowUp className="size-3" />
                العودة للأعلى
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
