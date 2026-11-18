"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Gamepad2,
  Globe2,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  portfolioData,
  type SideProject,
  type SideProjectImage,
} from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { AsciiBootSection } from "@/components/ui/AsciiBootSection";
import { LazyAsciiSection } from "@/components/ui/LazyAsciiSection";

function DeviceBadge({ device }: { device: SideProjectImage["device"] }) {
  const Icon = device === "mobile" ? Smartphone : Monitor;
  return (
    <span
      data-ascii="fade"
      className="inline-flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-950/90 px-2 py-1 font-mono text-[10px] font-semibold tracking-wide text-slate-300 uppercase backdrop-blur-md"
    >
      <Icon className="h-3 w-3" />
      {device === "mobile" ? "Mobile" : "Desktop"}
    </span>
  );
}

function ProjectGalleryImage({
  image,
  alt,
}: {
  image: SideProjectImage;
  alt: string;
}) {
  if (image.device === "mobile") {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_70%)] p-5">
        <img
          key={image.src}
          src={image.src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="animate-scale-fade-in h-full w-auto rounded-xl border border-slate-700 object-contain shadow-2xl shadow-black/60"
        />
      </div>
    );
  }

  return (
    <img
      key={image.src}
      src={image.src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="animate-scale-fade-in aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
    />
  );
}

export function SideProjectsShowcase(): React.JSX.Element {
  const { lang, t, tList } = useLanguage();
  const [activeImageIndexByProject, setActiveImageIndexByProject] = useState<
    Record<string, number>
  >({});
  const [lightboxState, setLightboxState] = useState<{
    images: SideProjectImage[];
    initialIndex: number;
    projectTitle: string;
  } | null>(null);

  const projects = portfolioData.sideProjects;

  const renderProject = (project: SideProject, blockIndex: number) => {
    const activeImgIdx = activeImageIndexByProject[project.id] ?? 0;
    const currentImage = project.images[activeImgIdx] ?? project.images[0];
    const KindIcon = project.kind === "web" ? Globe2 : Gamepad2;
    const isWeb = project.kind === "web";

    return (
      <div key={project.id} id={project.id} className="scroll-mt-28">
        <LazyAsciiSection skeletonRows={12}>
          <SpotlightCard
            as="article"
            accent={isWeb ? "emerald" : "amber"}
            className={`overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/65 shadow-2xl transition-all ${
              isWeb ? "hover:border-emerald-500/40" : "hover:border-amber-500/40"
            }`}
          >
            {/* Top Block Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/80 px-6 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  data-ascii="fade"
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-bold ${
                    isWeb
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  #{String(blockIndex + 1).padStart(2, "0")} • {project.code}
                </span>
                <span
                  data-ascii="fade"
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-mono text-xs ${
                    isWeb
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  <KindIcon className="h-3.5 w-3.5" />
                  {t(project.tag)}
                </span>
                <span
                  data-ascii="fade"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-0.5 font-mono text-xs text-slate-300"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isWeb ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                  {t(project.status)}
                </span>
              </div>
              <div className="font-mono text-xs text-slate-400">
                {t(project.platform)} • {t(project.role)}
              </div>
            </div>

            <div className="relative z-10 p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Left: Screenshot Gallery */}
                <div className="lg:col-span-7">
                  <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                    <ProjectGalleryImage
                      image={currentImage}
                      alt={t(currentImage.alt)}
                    />

                    <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-2">
                      <DeviceBadge device={currentImage.device} />
                    </div>

                    <button
                      type="button"
                      data-testid="open-lightbox-btn"
                      data-ascii="fade"
                      onClick={() =>
                        setLightboxState({
                          images: project.images,
                          initialIndex: activeImgIdx,
                          projectTitle: t(project.title),
                        })
                      }
                      className="absolute right-3 bottom-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700/90 bg-slate-950/90 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md transition-colors hover:border-emerald-400 hover:text-white"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                      <span>
                        {lang === "vi" ? "Phóng to ảnh" : "Zoom Image"}
                      </span>
                    </button>
                  </div>

                  <p className="mt-2.5 text-xs italic text-slate-400">
                    {t(currentImage.caption)}
                  </p>

                  {/* Thumbnail selector */}
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {project.images.map((img, idx) => (
                      <button
                        key={img.src + idx}
                        type="button"
                        data-ascii="fade"
                        aria-label={
                          lang === "vi"
                            ? `Xem ảnh ${idx + 1}`
                            : `View image ${idx + 1}`
                        }
                        onClick={() =>
                          setActiveImageIndexByProject((prev) => ({
                            ...prev,
                            [project.id]: idx,
                          }))
                        }
                        className={`group/thumb relative cursor-pointer overflow-hidden rounded-lg border transition-all ${
                          activeImgIdx === idx
                            ? isWeb
                              ? "border-emerald-400 ring-2 ring-emerald-500/30"
                              : "border-amber-400 ring-2 ring-amber-500/30"
                            : "border-slate-800 opacity-70 hover:border-slate-600 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="aspect-video w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Title, Summary, Metrics, CTA */}
                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {t(project.title)}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {t(project.summary)}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2.5 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3.5">
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

                    <div className="mt-5">
                      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-slate-400">
                        <Layers className="h-3.5 w-3.5 text-sky-400" />
                        <span>Tech Stack</span>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            data-ascii="fade"
                            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs font-medium text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    {project.liveUrl && project.liveLabel ? (
                      <a
                        data-ascii="fade"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:from-emerald-400 hover:to-cyan-500"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>{t(project.liveLabel)}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <div
                        data-ascii="fade"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 font-mono text-xs text-slate-400"
                      >
                        <Gamepad2 className="h-4 w-4 text-amber-400" />
                        <span>
                          {lang === "vi"
                            ? "Link game sẽ được cập nhật"
                            : "Game link coming soon"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Overview & Highlights */}
              <div className="mt-8 grid gap-6 border-t border-slate-800/80 pt-6 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-slate-400">
                    <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                    <span>
                      {lang === "vi" ? "Tổng quan dự án" : "Project Overview"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {tList(project.overview).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-slate-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{lang === "vi" ? "Điểm chính" : "Highlights"}</span>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {tList(project.highlights).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </LazyAsciiSection>
      </div>
    );
  };

  return (
    <section className="relative py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-sky-500/40 hover:text-sky-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            {lang === "vi"
              ? "Quay lại Trang chính Portfolio"
              : "Back to Main Portfolio"}
          </span>
        </Link>

        {/* Page Hero Header (>= 2000ms ASCII Boot Shimmer -> Cinematic Decode) */}
        <AsciiBootSection minDurationMs={2000} className="mt-8">
          <div
            data-ascii="surface"
            className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-sky-950/30 via-slate-900/90 to-slate-950 p-6 sm:p-10"
          >
            <div
              data-ascii="fade"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-sky-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {lang === "vi"
                  ? "SIDE PROJECTS • DỰ ÁN CÁ NHÂN"
                  : "SIDE PROJECTS • BUILT OUTSIDE OF WORK"}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {lang === "vi"
                ? "Dự án Cá nhân & Sân chơi Ngoài giờ"
                : "Side Projects & Things I Build for Fun"}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {lang === "vi"
                ? "Ngoài công việc chính, mình dành thời gian xây dựng các sản phẩm cá nhân: từ thư viện mẫu website giúp khách hàng chọn nhanh giao diện phù hợp đến game tycoon khai thác mỏ trên Roblox."
                : "Outside my main job, I build personal products: from a website template gallery that helps clients pick a fitting design quickly to a mining tycoon game on Roblox."}
            </p>

            {/* Quick jump to each project */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span
                data-ascii="fade"
                className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2 font-mono text-xs text-slate-400"
              >
                {lang === "vi"
                  ? `${projects.length} dự án`
                  : `${projects.length} projects`}
              </span>
              {projects.map((project) => {
                const Icon = project.kind === "web" ? Globe2 : Gamepad2;
                return (
                  <Link
                    key={project.id}
                    data-ascii="fade"
                    href={`#${project.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-sky-500/40 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5 text-sky-400" />
                    <span>{t(project.menuTitle)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </AsciiBootSection>

        {/* Project Blocks (Viewport Lazy Loaded + Fast ASCII Decode) */}
        <div className="mt-12 space-y-10">
          {projects.map((project, index) => renderProject(project, index))}
        </div>
      </div>

      {/* Shared Animated Lightbox Modal */}
      {lightboxState && (
        <ImageLightbox
          images={lightboxState.images}
          initialIndex={lightboxState.initialIndex}
          projectTitle={lightboxState.projectTitle}
          onClose={() => setLightboxState(null)}
        />
      )}
    </section>
  );
}
