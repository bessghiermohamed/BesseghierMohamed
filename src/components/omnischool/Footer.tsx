"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GraduationCap className="size-6 text-omni-gold" />
            <span className="text-lg font-bold text-foreground">
              Omni<span className="text-omni-gold">School</span>
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>المدرسة العليا للأساتذة ENS</span>
            <span className="hidden sm:inline">•</span>
            <span>فرع PEP — الأدب العربي</span>
            <span className="hidden sm:inline">•</span>
            <span>الجزائر 🇩🇿</span>
          </div>

          {/* Links */}
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

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/70">
          <p>
            صُمم بـ <Heart className="inline size-3 text-omni-red mx-0.5" /> بواسطة Besseghier Mohamed
          </p>
          <p>© {new Date().getFullYear()} OmniSchool — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
