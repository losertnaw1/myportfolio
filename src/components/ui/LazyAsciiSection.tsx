"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AsciiReveal,
  AsciiSkeleton,
  type PresetName,
  type SkeletonVariant,
} from "ascii-reveal";
import { useAsciiBootStatus } from "@/components/ui/AsciiBootSection";

export interface LazyAsciiSectionProps {
  children: React.ReactNode;
  skeletonLines?: number;
  skeletonRows?: number;
  minDurationMs?: number;
  minHeightClassName?: string;
  variant?: SkeletonVariant;
  preset?: PresetName;
  className?: string;
}

export function LazyAsciiSection({
  children,
  skeletonLines = 4,
  skeletonRows,
  minDurationMs = 1400,
  minHeightClassName = "",
  variant = "dither",
  preset = "decode",
  className = "",
}: LazyAsciiSectionProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPageBooting = useAsciiBootStatus();
  const [hasIntersected, setHasIntersected] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    if (isPageBooting || isRevealed || hasIntersected) {
      return;
    }

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    ) {
      setIsRevealed(true);
      return;
    }

    const node = containerRef.current;
    if (!node) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -30px 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isPageBooting, isRevealed, hasIntersected]);

  useEffect(() => {
    if (!hasIntersected || isRevealed) {
      return;
    }

    const waitMs = Math.max(0, minDurationMs);
    const timer = window.setTimeout(() => {
      setIsRevealed(true);
    }, waitMs);

    return () => window.clearTimeout(timer);
  }, [hasIntersected, isRevealed, minDurationMs]);

  return (
    <div
      ref={containerRef}
      data-testid="lazy-ascii-section"
      data-revealed={String(isRevealed)}
      className={className}
    >
      {isRevealed ? (
        <AsciiReveal
          preset={preset}
          duration="cinematic"
          speed={1.5}
          revealOnMount
          lazy={false}
          className="h-full"
        >
          {children}
        </AsciiReveal>
      ) : (
        <div
          className={`rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 text-slate-600 ${minHeightClassName}`.trim()}
        >
          <AsciiSkeleton
            variant={variant}
            lines={skeletonRows ? undefined : skeletonLines}
            rows={skeletonRows}
          />
        </div>
      )}
    </div>
  );
}
