"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  ZoomIn,
  X,
  CheckCircle2,
  Workflow,
  Layers,
  FolderPlus,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  portfolioData,
  type AutomationProjectBlock,
  type AutomationImage,
} from "@/data/portfolio";

type CategoryFilter = "all" | AutomationProjectBlock["category"];

export function AutomationShowcase() {
  const { lang, t, tList } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [activeImageIndexByProject, setActiveImageIndexByProject] = useState<
    Record<string, number>
  >({});
  const [lightboxImage, setLightboxImage] = useState<{
    image: AutomationImage;
    projectTitle: string;
  } | null>(null);

  const filterOptions: { id: CategoryFilter; label: { vi: string; en: string } }[] =
    [
      {
        id: "all",
        label: {
          vi: `Tất cả dự án (${portfolioData.automationProjects.length})`,
          en: `All Projects (${portfolioData.automationProjects.length})`,
        },
      },
      {
        id: "vision",
        label: {
          vi: "Camera Vision & Phân loại",
          en: "Machine Vision & Sorting",
        },
      },
      {
        id: "plc-mes",
        label: {
          vi: "Kết nối PLC & MES",
          en: "PLC & MES Telemetry",
        },
      },
      {
        id: "hmi-desktop",
        label: {
          vi: "Ứng dụng Desktop / HMI",
          en: "Desktop HMI & Control",
        },
      },
    ];

  const filteredProjects =
    selectedCategory === "all"
      ? portfolioData.automationProjects
      : portfolioData.automationProjects.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <section className="relative py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            {lang === "vi"
              ? "Quay lại Trang chính Portfolio"
              : "Back to Main Portfolio"}
          </span>
        </Link>

        {/* Page Hero Header */}
        <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-300">
            <Cpu className="h-3.5 w-3.5" />
            <span>
              {lang === "vi"
                ? "CHUYÊN TRANG DỰ ÁN TỰ ĐỘNG HÓA CÔNG NGHIỆP (03/2024 — NAY)"
                : "INDUSTRIAL AUTOMATION & MACHINE VISION PORTFOLIO (MAR 2024 — PRESENT)"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {lang === "vi"
              ? "Chi tiết Các Dự án Tự động hóa & Kết nối PLC / MES"
              : "Industrial Automation, PLC/MES & Vision Projects"}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {lang === "vi"
              ? "Trong thời gian làm việc mảng Tự động hóa công nghiệp, mình trực tiếp phụ trách end-to-end nhiều dự án thực tế tại nhà máy — từ giao tiếp PLC, thu thập dữ liệu sản xuất MES, đến tích hợp Camera công nghiệp cho hệ thống phân loại Cross-Belt Sorting. Mỗi dự án dưới đây được trình bày trong một block độc lập gồm hình ảnh/sơ đồ và thông tin kỹ thuật chi tiết."
              : "During my industrial automation tenure, I have owned multiple end-to-end factory software systems — spanning real-time PLC communication, MES telemetry reporting, and industrial camera integration for cross-belt sorting lines. Each project below is presented in a dedicated block with visual diagrams/media and engineering specifications."}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {filterOptions.map((option) => {
              const active = selectedCategory === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedCategory(option.id)}
                  className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-950/40"
                      : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {t(option.label)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dedicated Project Blocks (1 Block per Project) */}
        <div className="mt-12 space-y-10">
          {filteredProjects.map((project, blockIndex) => {
            const activeImgIdx = activeImageIndexByProject[project.id] ?? 0;
            const currentImage =
              project.images[activeImgIdx] ?? project.images[0];

            return (
              <article
                key={project.id}
                id={project.id}
                className="overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/65 shadow-2xl transition-all hover:border-emerald-500/40"
              >
                {/* Top Block Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/80 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-emerald-500/15 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                      #{String(blockIndex + 1).padStart(2, "0")} •{" "}
                      {project.code}
                    </span>
                    <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-0.5 font-mono text-xs text-sky-300">
                      {t(project.categoryLabel)}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-400">
                    {t(project.period)} • {t(project.role)}
                  </div>
                </div>

                {/* Main Block Grid: Image/Media Column + Description Column */}
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
                  {/* Left: Project Image / Diagram Gallery */}
                  <div className="flex flex-col justify-between lg:col-span-5">
                    <div>
                      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                        <img
                          src={currentImage.src}
                          alt={t(currentImage.alt)}
                          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <button
                          type="button"
                          data-testid="open-lightbox-btn"
                          onClick={() =>
                            setLightboxImage({
                              image: currentImage,
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

                      {/* Multi-image selector if project has > 1 image */}
                      {project.images.length > 1 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.images.map((img, idx) => (
                            <button
                              key={img.src + idx}
                              type="button"
                              onClick={() =>
                                setActiveImageIndexByProject((prev) => ({
                                  ...prev,
                                  [project.id]: idx,
                                }))
                              }
                              className={`cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                                activeImgIdx === idx
                                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                                  : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                              }`}
                            >
                              {lang === "vi"
                                ? `Ảnh / Sơ đồ ${idx + 1}`
                                : `Media ${idx + 1}`}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Key Metrics Strip */}
                    <div className="mt-6 grid grid-cols-3 gap-2.5 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3.5">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="font-mono text-xs font-bold text-emerald-400 sm:text-sm">
                            {metric.value}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {t(metric.label)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Project Description, Architecture & Highlights */}
                  <div className="flex flex-col justify-between lg:col-span-7">
                    <div>
                      <h2 className="text-xl font-bold text-white sm:text-2xl">
                        {t(project.title)}
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                        {t(project.summary)}
                      </p>

                      {/* Architecture Pipeline Note */}
                      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/90 p-3.5">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-sky-400">
                          <Workflow className="h-4 w-4" />
                          <span>
                            {lang === "vi"
                              ? "Luồng Kiến trúc & Tích hợp:"
                              : "System Integration Flow:"}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-xs leading-relaxed text-slate-300">
                          {t(project.architectureNote)}
                        </p>
                      </div>

                      {/* Detailed Bullet Highlights */}
                      <div className="mt-5">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-slate-400">
                          <Layers className="h-3.5 w-3.5 text-emerald-400" />
                          <span>
                            {lang === "vi"
                              ? "Chi tiết Triển khai & Giải pháp Kỹ thuật"
                              : "Engineering Implementation & Responsibilities"}
                          </span>
                        </div>

                        <ul className="mt-3 space-y-2.5">
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
                      </div>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="mt-6 border-t border-slate-800/80 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 font-mono text-xs font-medium text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Guide Box for Adding More Project Blocks */}
        <div className="mt-12 rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 p-6 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono font-semibold text-emerald-400">
            <FolderPlus className="h-4 w-4" />
            <span>
              {lang === "vi"
                ? "Cấu trúc Mở rộng Dễ dàng (Modular Project Blocks)"
                : "Modular Project Blocks Ready for Expansion"}
            </span>
          </div>
          <p className="mt-2 leading-relaxed">
            {lang === "vi"
              ? "Mỗi dự án tự động hóa trên trang này được render tự động từ mảng `automationProjects` trong file `src/data/portfolio.ts`. Khi bạn muốn thêm dự án mới hoặc thay ảnh chụp thực tế tại nhà máy, chỉ cần bỏ ảnh vào `public/images/automation/` và thêm block tương ứng hoặc gửi chi tiết cho mình cập nhật!"
              : "Each automation project block on this page is dynamically rendered from `automationProjects` in `src/data/portfolio.ts`. You can easily add more project blocks and factory images in `public/images/automation/`."}
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          data-testid="lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-mono text-sm font-bold text-white">
                {lightboxImage.projectTitle}
              </h3>
              <button
                type="button"
                data-testid="close-lightbox-btn"
                onClick={() => setLightboxImage(null)}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:border-red-500/50 hover:text-white"
              >
                <X className="h-4 w-4" />
                <span>{lang === "vi" ? "Đóng" : "Close"}</span>
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl bg-slate-900">
              <img
                src={lightboxImage.image.src}
                alt={t(lightboxImage.image.alt)}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <p className="mt-3 text-center text-xs text-slate-300">
              {t(lightboxImage.image.caption)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

