import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "Lê Quốc Đạt | Fullstack & Industrial Automation Software Engineer",
  description:
    "Portfolio của Lê Quốc Đạt — Software Engineer chuyên về Fullstack Web/Desktop (React, Next.js, Vue, .NET, Node.js, Electron) và Tự động hóa Công nghiệp (PLC/MES, Camera Vision, Cross-Belt Sorting).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
