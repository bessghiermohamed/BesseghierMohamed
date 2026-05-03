"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Github, ExternalLink, BookOpen, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto relative">
      {/* Decorative top wave */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-8 sm:h-10">
          <path fill="var(--card)" fillOpacity="0.5" d="M0,20L60,18.7C120,17,240,15,360,16.7C480,18,600,23,720,23.3C840,23,960,18,1080,16.7C1200,15,1320,18,1380,18.7L1440,20L1440,40L0,40Z" />
        </svg>
      </div>

      <div className="bg-card/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {/* Logo & Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-6 text-omni-gold" />
                <span className="text-lg font-bold text-foreground">
                  Omni<span className="text-omni-gold">School</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                منصة تعليمية متكاملة لطلبة المدرسة العليا للأساتذة بالجزائر
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">روابط سريعة</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-3.5" />
                  <span>24 مادة دراسية</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5" />
                  <span>المدرسة العليا للأساتذة ENS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5" />
                  <span>فرع PEP — الأدب العربي</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">تواصل معنا</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
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
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/70">
            <p>
              صُمم بـ <Heart className="inline size-3 text-omni-red mx-0.5" /> بواسطة Besseghier Mohamed
            </p>
            <p>© {new Date().getFullYear()} OmniSchool — جميع الحقوق محفوظة 🇩🇿</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
