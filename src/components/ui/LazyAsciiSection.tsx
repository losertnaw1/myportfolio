"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AsciiReveal,
  AsciiSkeleton,
  type PresetName,
  type SkeletonVariant,
} from "ascii-reveal";

export interface LazyAsciiSectionProps {
  children: React.ReactNode;
  skeletonLines?: number;
  skeletonRows?: number;
  variant?: SkeletonVariant;
  preset?: PresetName;
  className?: string;
}

export function LazyAsciiSection({
  children,
  skeletonLines = 4,
  skeletonRows,
  variant = "dither",
  preset = "decode",
  className = "",
}: LazyAsciiSectionProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
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
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
          duration="fast"
          revealOnMount
          lazy={false}
          className="h-full"
        >
          {children}
        </AsciiReveal>
      ) : (
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 text-slate-600">
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
