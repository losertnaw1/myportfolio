"use client";

import React, { useEffect, useState } from "react";
import { AsciiReveal, type PresetName } from "ascii-reveal";

export interface AsciiBootSectionProps {
  children: React.ReactNode;
  minDurationMs?: number;
  preset?: PresetName;
  className?: string;
}

export function AsciiBootSection({
  children,
  minDurationMs = 2000,
  preset = "decode",
  className,
}: AsciiBootSectionProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      setIsLoading(false);
      return;
    }

    const waitMs = Math.max(0, minDurationMs);
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, waitMs);

    return () => window.clearTimeout(timer);
  }, [minDurationMs]);

  return (
    <AsciiReveal
      data-testid="ascii-boot-section"
      data-loading={String(isLoading)}
      preset={preset}
      duration="cinematic"
      loading={isLoading}
      shimmer
      lazy={false}
      className={className}
    >
      {children}
    </AsciiReveal>
  );
}
