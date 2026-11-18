"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "none";
}

const HIDDEN_OFFSET: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6",
  none: "",
};

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: ScrollRevealProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    ) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stateClasses = isVisible
    ? "opacity-100 translate-x-0 translate-y-0"
    : `opacity-0 ${HIDDEN_OFFSET[direction]}`.trim();

  return (
    <div
      ref={containerRef}
      data-scroll-reveal=""
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${stateClasses} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
