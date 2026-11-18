"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function BackToTop(): React.JSX.Element | null {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      data-testid="back-to-top-btn"
      aria-label={lang === "vi" ? "Cuộn lên đầu trang" : "Scroll to top"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="animate-scale-fade-in fixed right-6 bottom-6 z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-emerald-500/40 bg-slate-950/90 text-emerald-300 shadow-xl shadow-emerald-950/50 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-white"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
