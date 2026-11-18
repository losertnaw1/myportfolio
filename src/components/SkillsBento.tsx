"use client";

import React from "react";
import { Code2, Monitor, Database, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import {
  SpotlightCard,
  type SpotlightAccent,
} from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const groupIcons: Record<string, React.ReactNode> = {
  languages: <Code2 className="h-5 w-5 text-emerald-400" />,
  "frontend-desktop": <Monitor className="h-5 w-5 text-sky-400" />,
  "backend-database": <Database className="h-5 w-5 text-indigo-400" />,
  "industrial-tools": <Cpu className="h-5 w-5 text-amber-400" />,
};

const groupAccents: Record<string, SpotlightAccent> = {
  languages: "emerald",
  "frontend-desktop": "sky",
  "backend-database": "indigo",
  "industrial-tools": "amber",
};

export function SkillsBento(): React.JSX.Element {
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono text-xs font-bold tracking-wider uppercase text-emerald-400">
                {lang === "vi" ? "// NĂNG LỰC KỸ THUẬT" : "// TECHNICAL ARSENAL"}
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {lang === "vi"
                  ? "Hệ sinh thái Công nghệ & Kỹ năng"
                  : "Fullstack & Industrial Engineering Stack"}
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              {lang === "vi"
                ? "Kết hợp giữa phát triển Web/Desktop hiện đại và lập trình giao tiếp thiết bị công nghiệp thời gian thực."
                : "Combining modern web/desktop engineering with real-time industrial hardware integration."}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portfolioData.skillGroups.map((group, index) => (
            <ScrollReveal key={group.id} delayMs={index * 80} className="h-full">
              <SpotlightCard
                accent={groupAccents[group.id] ?? "emerald"}
                className="group h-full rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-emerald-950/20"
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {t(group.title)}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {t(group.subtitle)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 transition-transform duration-300 group-hover:scale-105">
                    {groupIcons[group.id] ?? (
                      <Code2 className="h-5 w-5 text-emerald-400" />
                    )}
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-1.5 font-mono text-xs font-medium text-slate-200 transition-all duration-200 group-hover:border-slate-700 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:text-emerald-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
