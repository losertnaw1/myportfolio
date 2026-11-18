"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FolderCode,
  Gamepad2,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { LazyAsciiSection } from "@/components/ui/LazyAsciiSection";

export function SideProjectsPreview(): React.JSX.Element {
  const { lang, t } = useLanguage();

  return (
    <section id="side-projects-preview" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono text-xs font-bold tracking-wider uppercase text-sky-400">
              {lang === "vi"
                ? "// DỰ ÁN CÁ NHÂN & SẢN PHẨM THỰC TẾ"
                : "// SIDE PROJECTS & LIVE PLAYGROUND"}
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {lang === "vi"
                ? "Sản phẩm Cá nhân & Sân chơi Ngoài giờ"
                : "Personal Products & Creative Side Builds"}
            </h2>
          </div>

          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition-all hover:border-sky-400 hover:bg-sky-500/20"
          >
            <FolderCode className="h-4 w-4" />
            <span>
              {lang === "vi"
                ? "Xem tất cả dự án phụ →"
                : "View all side projects →"}
            </span>
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {portfolioData.sideProjects.map((project) => {
            const isWeb = project.kind === "web";
            const KindIcon = isWeb ? Globe2 : Gamepad2;
            const coverImage = project.images[0];

            return (
              <LazyAsciiSection
                key={project.id}
                skeletonRows={10}
                className="h-full"
              >
                <SpotlightCard
                  as="article"
                  tilt
                  accent={isWeb ? "emerald" : "amber"}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/65 shadow-xl transition-all duration-300 hover:border-slate-700"
                >
                  {/* Visual Cover Frame */}
                  <div className="relative overflow-hidden border-b border-slate-800/80 bg-slate-950">
                    <img
                      src={coverImage.src}
                      alt={t(coverImage.alt)}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover/spotlight:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                      <span
                        data-ascii="fade"
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold backdrop-blur-md ${
                          isWeb
                            ? "border-emerald-500/40 bg-slate-950/85 text-emerald-300"
                            : "border-amber-500/40 bg-slate-950/85 text-amber-300"
                        }`}
                      >
                        <KindIcon className="h-3.5 w-3.5" />
                        {t(project.tag)}
                      </span>
                      <span
                        data-ascii="fade"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-950/85 px-2.5 py-1 font-mono text-[11px] text-slate-200 backdrop-blur-md"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isWeb ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {t(project.status)}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {t(project.title)}
                      </h3>
                      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-300">
                        {t(project.summary)}
                      </p>

                      {/* Metrics Strip */}
                      <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div
                              className={`font-mono text-xs font-bold sm:text-sm ${
                                isWeb ? "text-emerald-400" : "text-amber-400"
                              }`}
                            >
                              {metric.value}
                            </div>
                            <div className="mt-0.5 text-[11px] text-slate-400">
                              {t(metric.label)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                      <Link
                        data-ascii="fade"
                        href={`/side-projects#${project.id}`}
                        className="group inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 transition-colors hover:text-white"
                      >
                        <span>
                          {lang === "vi"
                            ? "Xem chi tiết & Bộ ảnh"
                            : "Explore Gallery & Details"}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          data-ascii="fade"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono text-[11px] font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </LazyAsciiSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
