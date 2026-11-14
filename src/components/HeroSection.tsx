"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  ArrowRight,
  Layers,
  Terminal,
  Activity,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";

export function HeroSection() {
  const { lang, t } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<number>(0);

  return (
    <section
      id="about"
      className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24"
    >
      {/* Ambient Radial Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-1/4 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Engineer Identity & CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{t(portfolioData.profile.status)}</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {portfolioData.profile.name}
              <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                {t(portfolioData.profile.role)}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t(portfolioData.profile.objective)}
            </p>

            {/* Quick Metadata Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                {t(portfolioData.profile.location)}
              </span>
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 transition-colors hover:border-emerald-500/50 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-sky-400" />
                {portfolioData.profile.email}
              </a>
              <a
                href={`tel:${portfolioData.profile.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 font-mono transition-colors hover:border-emerald-500/50 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-amber-400" />
                {portfolioData.profile.phone}
              </a>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/automation"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/60 transition-all hover:-translate-y-0.5 hover:from-emerald-400 hover:to-cyan-500"
              >
                <Cpu className="h-4 w-4" />
                <span>
                  {lang === "vi"
                    ? "Khám phá Dự án Tự động hóa (PLC / MES)"
                    : "Explore Industrial Automation Projects"}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                <span>
                  {lang === "vi"
                    ? "Xem Kinh nghiệm & Dự án"
                    : "View Experience"}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive End-to-End Architecture Pipeline */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-5 shadow-2xl backdrop-blur-md sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-200">
                    {lang === "vi"
                      ? "Kiến trúc Hệ thống End-to-End"
                      : "End-to-End System Architecture"}
                  </span>
                </div>
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
                  LIVE STACK
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {portfolioData.pipelineArchitecture.map((node, index) => {
                  const isSelected = activeLayer === index;
                  return (
                    <div key={node.step}>
                      <div
                        onClick={() => setActiveLayer(index)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all ${
                          isSelected
                            ? "border-emerald-500/60 bg-slate-950/95 shadow-lg shadow-emerald-950/30"
                            : "border-slate-800/90 bg-slate-950/60 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-emerald-400">
                            LAYER {node.step}
                          </span>
                          <span className="font-mono text-[11px] text-sky-300">
                            {node.tech}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-sm font-bold text-white">
                          {t(node.layer)}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {t(node.desc)}
                        </p>
                      </div>

                      {index < portfolioData.pipelineArchitecture.length - 1 && (
                        <div className="flex items-center justify-center py-1 font-mono text-[11px] text-emerald-400/80">
                          <span>⇅ Real-time Telemetry / IPC / REST</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-3.5 py-2.5 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-sky-400" />
                  <span>Fullstack + PLC/MES</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Production Proven</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

