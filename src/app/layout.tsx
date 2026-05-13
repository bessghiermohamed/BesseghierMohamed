import type { Metadata } from "next"
import { Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "أومني سكول - منصة تعليمية",
  description: "منصة أومني سكول التعليمية - تعلم بسهولة وفعالية",
  keywords: ["تعليم", "أومني سكول", "منصة تعليمية", "دراسة", "موارد تعليمية"],
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${notoSansArabic.variable} antialiased bg-background text-foreground font-[family-name:var(--font-noto-arabic)]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
