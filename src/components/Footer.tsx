"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Cpu,
  FolderCode,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolio";

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Footer() {
  const { lang, t } = useLanguage();
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(
    null
  );

  const handleCopy = async (text: string, field: "email" | "phone") => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <footer
      id="contact"
      className="mt-24 border-t border-slate-800/80 bg-slate-950/90 py-16 text-slate-300"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left column: Identity & Quick CTA */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>
                {lang === "vi"
                  ? "LIÊN HỆ & HỢP TÁC"
                  : "CONNECT & COLLABORATE"}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {portfolioData.profile.name}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              {t(portfolioData.profile.tagline)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/automation"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                <Cpu className="h-4 w-4" />
                <span>
                  {lang === "vi"
                    ? "Trang Chi tiết Dự án Tự động hóa"
                    : "Industrial Automation Portfolio"}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/side-projects"
                className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2.5 text-xs font-semibold text-sky-300 transition-all hover:border-sky-400 hover:bg-sky-500/20"
              >
                <FolderCode className="h-4 w-4" />
                <span>
                  {lang === "vi"
                    ? "Dự án Cá nhân (Side Projects)"
                    : "Side Projects"}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <a
                href={portfolioData.profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-700 hover:text-white"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>GitHub ({portfolioData.profile.githubHandle})</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right column: Contact Cards with Quick Copy */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {/* Email Card */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 transition-colors hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Mail className="h-4 w-4" />
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(portfolioData.profile.email, "email")
                  }
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-white"
                >
                  {copiedField === "email" ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="mt-4 font-mono text-xs uppercase text-slate-400">
                Email
              </div>
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="mt-1 block truncate font-mono text-sm font-semibold text-white hover:text-emerald-400"
              >
                {portfolioData.profile.email}
              </a>
            </div>

            {/* Phone Card */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 transition-colors hover:border-sky-500/40">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <Phone className="h-4 w-4" />
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(portfolioData.profile.phone, "phone")
                  }
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-sky-500/50 hover:text-white"
                >
                  {copiedField === "phone" ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="mt-4 font-mono text-xs uppercase text-slate-400">
                {lang === "vi" ? "Điện thoại / Zalo" : "Phone / Zalo"}
              </div>
              <a
                href={`tel:${portfolioData.profile.phone}`}
                className="mt-1 block font-mono text-sm font-semibold text-white hover:text-sky-400"
              >
                {portfolioData.profile.phone}
              </a>
            </div>

            {/* Location & Personal details bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/40 px-5 py-4 sm:col-span-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{t(portfolioData.profile.location)}</span>
              </div>
              <div className="font-mono text-xs text-slate-400">
                DOB: {portfolioData.profile.dob} •{" "}
                {t(portfolioData.profile.gender)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {portfolioData.profile.name}.{" "}
            {lang === "vi"
              ? "Xây dựng với Next.js, TypeScript & Tailwind CSS."
              : "Built with Next.js, TypeScript & Tailwind CSS."}
          </p>
          <p className="font-mono">
            Fullstack Web/Desktop • PLC/MES • Machine Vision
          </p>
        </div>
      </div>
    </footer>
  );
}
