"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ExperienceSection(): React.JSX.Element {
  const { lang, t, tList } = useLanguage();

  return (
    <div className="space-y-20 py-16">
      {/* Featured Projects & Experience */}
      <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono text-xs font-bold tracking-wider uppercase text-emerald-400">
                {lang === "vi"
                  ? "// DỰ ÁN & KINH NGHIỆM TRỌNG TÂM"
                  : "// FEATURED PROJECTS & PRODUCTION EXPERIENCE"}
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {lang === "vi"
                  ? "Các Hệ thống & Dự án Tiêu biểu"
                  : "Key Software & Industrial Systems"}
              </h2>
            </div>
            <Link
              href="/automation"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-500/20"
            >
              <Cpu className="h-4 w-4" />
              <span>
                {lang === "vi"
                  ? "Mở trang Chi tiết Dự án Tự động hóa →"
                  : "Open Dedicated Automation Projects Page →"}
              </span>
            </Link>
          </div>
        </ScrollReveal>

        <div
          data-testid="career-timeline-rail"
          className="relative mt-10 space-y-8 md:pl-10"
        >
          {/* Illuminated Vertical Career Timeline Rail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-3 bottom-3 left-3 hidden w-px bg-gradient-to-b from-emerald-400 via-sky-500/60 to-slate-800 md:block"
          />

          {portfolioData.featuredProjects.map((project, index) => {
            const isAutomation = Boolean(project.isAutomationUmbrella);
            return (
              <ScrollReveal key={project.id} delayMs={index * 90}>
                <div className="relative">
                  {/* Chronological Glowing Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-7 -left-[33px] hidden h-4 w-4 items-center justify-center rounded-full border md:flex ${
                      isAutomation
                        ? "border-emerald-400 bg-emerald-950 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                        : "border-sky-400/70 bg-slate-950"
                    }`}
                  >
                    {isAutomation && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    )}
                    <span
                      className={`relative h-1.5 w-1.5 rounded-full ${
                        isAutomation ? "bg-emerald-400" : "bg-sky-400"
                      }`}
                    />
                  </span>

                  <SpotlightCard
                    as="article"
                    accent={isAutomation ? "emerald" : "sky"}
                    className={`rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                      isAutomation
                        ? "border-emerald-500/50 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 shadow-xl shadow-emerald-950/20 hover:border-emerald-400/70"
                        : "border-slate-800/90 bg-slate-900/60 hover:-translate-y-0.5 hover:border-slate-700"
                    }`}
                  >
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                          {t(project.period)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/80 px-3 py-1 font-mono text-xs text-slate-300">
                          <Users className="h-3.5 w-3.5 text-sky-400" />
                          {t(project.teamSize)}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-sky-400">
                        {t(project.domain)}
                      </span>
                    </div>

                    <h3 className="relative z-10 mt-4 text-xl font-bold text-white sm:text-2xl">
                      {t(project.title)}
                    </h3>
                    <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {t(project.summary)}
                    </p>

                    <ul className="relative z-10 mt-5 grid gap-2.5 sm:grid-cols-2">
                      {tList(project.highlights).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-800 bg-slate-950/90 px-2.5 py-1 font-mono text-xs text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.detailUrl && project.detailLabel && (
                        <Link
                          href={project.detailUrl}
                          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:from-emerald-400 hover:to-cyan-500"
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>{t(project.detailLabel)}</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </SpotlightCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Education & Early Career Training */}
      <section id="education" className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="font-mono text-xs font-bold tracking-wider uppercase text-sky-400">
            {lang === "vi"
              ? "// HỌC VẤN & ĐÀO TẠO CHUYÊN MÔN"
              : "// EDUCATION & TRAINING"}
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {lang === "vi"
              ? "Nền tảng Học vấn & Thực tập"
              : "Academic Background & Fellowships"}
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {portfolioData.educationAndTraining.map((edu, index) => (
            <ScrollReveal key={edu.id} delayMs={index * 80} className="h-full">
              <SpotlightCard
                accent={index === 0 ? "sky" : "emerald"}
                className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-700"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-emerald-400">
                    {edu.period}
                  </span>
                  {index === 0 ? (
                    <GraduationCap className="h-5 w-5 text-sky-400" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-emerald-400" />
                  )}
                </div>
                <h3 className="relative z-10 mt-3 text-base font-bold text-white">
                  {t(edu.institution)}
                </h3>
                <div className="relative z-10 mt-1 font-mono text-xs text-sky-300">
                  {t(edu.program)}
                </div>
                <ul className="relative z-10 mt-4 space-y-2 text-xs leading-relaxed text-slate-400">
                  {tList(edu.details).map((line, i) => (
                    <li key={i}>• {line}</li>
                  ))}
                </ul>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
