"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Language, LocalizedText, LocalizedList } from "@/data/portfolio";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (item: LocalizedText) => string;
  tList: (item: LocalizedList) => string[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "quocdat-portfolio-lang";

export function LanguageProvider({
  children,
  defaultLang = "vi",
}: {
  children: React.ReactNode;
  defaultLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(defaultLang);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "vi" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLang = () => {
    setLang(lang === "vi" ? "en" : "vi");
  };

  const t = (item: LocalizedText): string => item[lang];
  const tList = (item: LocalizedList): string[] => item[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, tList }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

