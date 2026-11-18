"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedText } from "@/data/portfolio";

export interface LightboxMediaItem {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface ImageLightboxProps {
  images: LightboxMediaItem[];
  initialIndex?: number;
  projectTitle: string;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  projectTitle,
  onClose,
}: ImageLightboxProps): React.JSX.Element | null {
  const { lang, t } = useLanguage();
  const safeInitial =
    images.length > 0
      ? Math.min(Math.max(0, initialIndex), images.length - 1)
      : 0;
  const [activeIndex, setActiveIndex] = useState<number>(safeInitial);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && images.length > 1) {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight" && images.length > 1) {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  if (images.length === 0) {
    return null;
  }

  const current = images[activeIndex] ?? images[0];
  const hasMultiple = images.length > 1;

  return (
    <div
      data-testid="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label={projectTitle}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-scale-fade-in relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="truncate font-mono text-sm font-bold text-white">
            {projectTitle}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            <span
              data-testid="lightbox-counter"
              className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-emerald-300"
            >
              {activeIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              data-testid="close-lightbox-btn"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-red-500/50 hover:text-white"
            >
              <X className="h-4 w-4" />
              <span>{lang === "vi" ? "Đóng" : "Close"}</span>
            </button>
          </div>
        </div>

        <div className="relative mt-4 flex items-center justify-center overflow-hidden rounded-xl bg-slate-900 p-2">
          <img
            key={current.src}
            src={current.src}
            alt={t(current.alt)}
            className="animate-scale-fade-in mx-auto max-h-[70vh] w-auto rounded-lg object-contain"
          />

          {hasMultiple && (
            <>
              <button
                type="button"
                data-testid="lightbox-prev-btn"
                aria-label={lang === "vi" ? "Ảnh trước" : "Previous image"}
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                className="absolute left-3 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700/90 bg-slate-950/85 text-slate-200 backdrop-blur-md transition-all hover:border-emerald-400 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                data-testid="lightbox-next-btn"
                aria-label={lang === "vi" ? "Ảnh tiếp theo" : "Next image"}
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % images.length)
                }
                className="absolute right-3 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700/90 bg-slate-950/85 text-slate-200 backdrop-blur-md transition-all hover:border-emerald-400 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-slate-300">
          {t(current.caption)}
        </p>
      </div>
    </div>
  );
}
