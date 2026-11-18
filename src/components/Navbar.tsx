"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Cpu,
  FolderCode,
  Gamepad2,
  Globe,
  Globe2,
  Mail,
  Menu,
  X,
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

const HOME_SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "education",
  "side-projects-preview",
] as const;

export function Navbar(): React.JSX.Element {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState<string>("about");

  React.useEffect(() => {
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        maxScroll > 0
          ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100))
          : 0;
      setScrollProgress(pct);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  React.useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("about");
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    let io: IntersectionObserver | null = null;
    let boundElements: HTMLElement[] = [];

    const bindObserver = () => {
      const nextElements = HOME_SECTION_IDS.map((id) =>
        document.getElementById(id)
      ).filter((el): el is HTMLElement => el !== null);

      if (
        nextElements.length === boundElements.length &&
        nextElements.every((el, idx) => el === boundElements[idx])
      ) {
        return;
      }

      io?.disconnect();
      boundElements = nextElements;
      if (nextElements.length === 0) {
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          }
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
      );

      for (const el of nextElements) {
        io.observe(el);
      }
    };

    bindObserver();

    const mo =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(() => bindObserver())
        : null;
    mo?.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo?.disconnect();
      io?.disconnect();
    };
  }, [pathname]);

  React.useEffect(() => {
    if (!sideMenuOpen && !mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSideMenuOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sideMenuOpen, mobileOpen]);

  const navItems = [
    {
      id: "about",
      href: "/#about",
      label: lang === "vi" ? "Tổng quan" : "Overview",
    },
    {
      id: "skills",
      href: "/#skills",
      label: lang === "vi" ? "Kỹ năng" : "Tech Stack",
    },
    {
      id: "projects",
      href: "/#projects",
      label: lang === "vi" ? "Kinh nghiệm & Dự án" : "Projects",
    },
    {
      id: "education",
      href: "/#education",
      label: lang === "vi" ? "Học vấn" : "Education",
    },
  ];

  const isAutomationActive = pathname.startsWith("/automation");
  const isSideProjectsActive =
    pathname.startsWith("/side-projects") ||
    (pathname === "/" && activeSection === "side-projects-preview");

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="relative mx-auto max-w-6xl rounded-2xl border border-slate-800/80 bg-slate-950/85 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl sm:px-6">
        {/* Top 2px Scroll Progress Bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-0 h-[2px] overflow-hidden rounded-t-2xl"
        >
          <div
            data-testid="scroll-progress-bar"
            style={{ width: `${scrollProgress}%` }}
            className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 transition-[width] duration-150"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-slate-100 transition-colors hover:text-emerald-400"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>
              quocdat<span className="text-emerald-400">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === "/" && activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive ? "true" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/automation"
              className={`ml-2 hidden items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all lg:inline-flex ${
                isAutomationActive
                  ? "border-emerald-400 bg-emerald-500/25 text-emerald-200 shadow-md shadow-emerald-950/40"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-200"
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              <span>{lang === "vi" ? "Tự động hóa" : "Automation"}</span>
            </Link>

            {/* Side Projects dropdown menu */}
            <div
              className="relative ml-1"
              onMouseEnter={() => setSideMenuOpen(true)}
              onMouseLeave={() => setSideMenuOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setSideMenuOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={sideMenuOpen}
                aria-haspopup="menu"
                onClick={() => setSideMenuOpen((open) => !open)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSideProjectsActive || sideMenuOpen
                    ? "border-sky-400 bg-sky-500/25 text-sky-200"
                    : "border-sky-500/40 bg-sky-500/10 text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 hover:text-sky-200"
                }`}
              >
                <FolderCode className="h-3.5 w-3.5 text-sky-400" />
                <span>{lang === "vi" ? "Dự án phụ" : "Side Projects"}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    sideMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sideMenuOpen && (
                <div className="absolute top-full right-0 z-50 w-80 pt-2">
                  <div className="animate-scale-fade-in rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                    <div className="px-3 pt-1.5 pb-1 font-mono text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                      {lang === "vi"
                        ? `${portfolioData.sideProjects.length} dự án cá nhân`
                        : `${portfolioData.sideProjects.length} side projects`}
                    </div>

                    {portfolioData.sideProjects.map((project) => {
                      const Icon =
                        project.kind === "web" ? Globe2 : Gamepad2;
                      return (
                        <Link
                          key={project.id}
                          href={`/side-projects#${project.id}`}
                          onClick={() => setSideMenuOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-800/70"
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 group-hover:text-sky-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-100 group-hover:text-white">
                              {t(project.menuTitle)}
                              <ArrowUpRight className="h-3 w-3 shrink-0 text-slate-500 group-hover:text-sky-400" />
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-relaxed text-slate-400">
                              {t(project.menuSummary)}
                            </span>
                          </span>
                        </Link>
                      );
                    })}

                    <Link
                      href="/side-projects"
                      onClick={() => setSideMenuOpen(false)}
                      className="mt-1 flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2 font-mono text-[11px] font-semibold text-sky-300 transition-colors hover:bg-slate-800 hover:text-sky-200"
                    >
                      <span>
                        {lang === "vi"
                          ? "Xem tất cả dự án phụ"
                          : "View all side projects"}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions: Language Toggle & Contact */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Switch language EN/VI"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900 px-3 py-1.5 font-mono text-xs font-semibold text-sky-300 transition-colors hover:border-sky-500/60 hover:bg-slate-800"
            >
              <Globe className="h-3.5 w-3.5 text-sky-400" />
              <span>{lang === "vi" ? "VI ✓ | EN" : "EN ✓ | VI"}</span>
            </button>

            <a
              href={portfolioData.profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="hidden rounded-lg border border-slate-800 bg-slate-900/90 p-2 text-slate-300 transition-colors hover:border-slate-700 hover:text-white lg:inline-flex"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-emerald-950/50 transition-all hover:from-emerald-500 hover:to-cyan-500 sm:inline-flex"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{lang === "vi" ? "Liên hệ" : "Contact"}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Mobile Drawer"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="animate-scale-fade-in mt-3 flex flex-col gap-1.5 border-t border-slate-800/80 pt-3 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/automation"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-sm font-semibold text-emerald-300"
            >
              <Cpu className="h-4 w-4 text-emerald-400" />
              <span>
                {lang === "vi"
                  ? "Dự án Tự động hóa (PLC/MES)"
                  : "Automation Projects"}
              </span>
            </Link>

            {/* Side Projects menu (mobile) */}
            <div className="mt-2 rounded-xl border border-sky-500/30 bg-sky-500/5 p-2">
              <div className="flex items-center gap-2 px-2 pt-1 pb-2 font-mono text-[10px] font-semibold tracking-wider uppercase text-sky-400">
                <FolderCode className="h-3.5 w-3.5" />
                <span>{lang === "vi" ? "Dự án phụ" : "Side Projects"}</span>
              </div>
              {portfolioData.sideProjects.map((project) => {
                const Icon = project.kind === "web" ? Globe2 : Gamepad2;
                return (
                  <Link
                    key={project.id}
                    href={`/side-projects#${project.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-start gap-2.5 rounded-lg px-2 py-2.5 transition-colors hover:bg-slate-800/60"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-100">
                        {t(project.menuTitle)}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-relaxed text-slate-400">
                        {t(project.menuSummary)}
                      </span>
                    </span>
                  </Link>
                );
              })}
              <Link
                href="/side-projects"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center justify-between rounded-lg bg-slate-900/80 px-3 py-2 font-mono text-[11px] font-semibold text-sky-300"
              >
                <span>
                  {lang === "vi"
                    ? "Xem tất cả dự án phụ"
                    : "View all side projects"}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
