"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AsciiReveal, AsciiSkeleton, type PresetName } from "ascii-reveal";

const AsciiBootContext = createContext<boolean | null>(null);

export function useAsciiBootStatus(): boolean {
  return useContext(AsciiBootContext) ?? false;
}

export interface AsciiBootProviderProps {
  children: React.ReactNode;
  minDurationMs?: number;
}

export function AsciiBootProvider({
  children,
  minDurationMs = 2000,
}: AsciiBootProviderProps): React.JSX.Element {
  const [isBooting, setIsBooting] = useState<boolean>(true);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      setIsBooting(false);
      return;
    }

    const waitMs = Math.max(0, minDurationMs);
    const timer = window.setTimeout(() => {
      setIsBooting(false);
    }, waitMs);

    return () => window.clearTimeout(timer);
  }, [minDurationMs]);

  return (
    <AsciiBootContext.Provider value={isBooting}>
      {children}
    </AsciiBootContext.Provider>
  );
}

function BootSkeletonLayout({ layout }: { layout: "hero" | "banner" }) {
  if (layout === "banner") {
    return (
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/55 p-6 text-slate-600 sm:p-10">
        <AsciiSkeleton variant="terminal" lines={1} widths={["42%"]} seed={11} />
        <div className="mt-5">
          <AsciiSkeleton variant="scan" rows={3} height={64} seed={12} />
        </div>
        <div className="mt-5 max-w-3xl">
          <AsciiSkeleton variant="dither" lines={3} seed={13} />
        </div>
        <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <AsciiSkeleton
              key={n}
              variant="dither"
              rows={2}
              height={36}
              seed={20 + n}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-12 text-slate-600 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-7">
        <AsciiSkeleton variant="terminal" lines={1} widths={["52%"]} seed={1} />
        <AsciiSkeleton variant="scan" rows={4} height={96} seed={2} />
        <AsciiSkeleton variant="dither" lines={3} seed={3} />
        <div className="grid max-w-md grid-cols-2 gap-3">
          <AsciiSkeleton variant="scan" rows={2} height={46} seed={4} />
          <AsciiSkeleton variant="dither" rows={2} height={46} seed={5} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="rounded-xl border border-slate-800/70 bg-slate-900/45 p-3"
            >
              <AsciiSkeleton variant="dither" lines={2} seed={10 + n} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/55 p-5 sm:p-6 lg:col-span-5">
        <AsciiSkeleton variant="terminal" lines={1} widths={["68%"]} seed={6} />
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4"
            >
              <AsciiSkeleton variant="scan" lines={3} seed={30 + n} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <AsciiSkeleton variant="terminal" lines={1} seed={7} />
        </div>
      </div>
    </div>
  );
}

export interface AsciiBootSectionProps {
  children: React.ReactNode;
  minDurationMs?: number;
  preset?: PresetName;
  layout?: "hero" | "banner";
  className?: string;
}

export function AsciiBootSection({
  children,
  minDurationMs = 2000,
  preset = "decode",
  layout = "hero",
  className,
}: AsciiBootSectionProps): React.JSX.Element {
  const sharedBooting = useContext(AsciiBootContext);
  const [localLoading, setLocalLoading] = useState<boolean>(true);

  useEffect(() => {
    if (sharedBooting !== null) {
      return;
    }

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      setLocalLoading(false);
      return;
    }

    const waitMs = Math.max(0, minDurationMs);
    const timer = window.setTimeout(() => {
      setLocalLoading(false);
    }, waitMs);

    return () => window.clearTimeout(timer);
  }, [minDurationMs, sharedBooting]);

  const isLoading = sharedBooting !== null ? sharedBooting : localLoading;

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
      {isLoading ? <BootSkeletonLayout layout={layout} /> : children}
    </AsciiReveal>
  );
}
