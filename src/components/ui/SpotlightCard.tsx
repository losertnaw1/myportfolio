"use client";

import React, { useRef } from "react";

export type SpotlightAccent = "emerald" | "sky" | "amber" | "indigo";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "div" | "article";
  accent?: SpotlightAccent;
  tilt?: boolean;
}

const ACCENT_GRADIENTS: Record<SpotlightAccent, string> = {
  emerald: "rgba(16, 185, 129, 0.14)",
  sky: "rgba(14, 165, 233, 0.14)",
  amber: "rgba(245, 158, 11, 0.14)",
  indigo: "rgba(99, 102, 241, 0.14)",
};

export function SpotlightCard({
  children,
  as = "div",
  accent = "emerald",
  tilt = false,
  className = "",
  onMouseMove,
  onMouseLeave,
  ...rest
}: SpotlightCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      el.style.setProperty("--spotlight-x", `${x}px`);
      el.style.setProperty("--spotlight-y", `${y}px`);

      if (
        tilt &&
        rect.width > 0 &&
        rect.height > 0 &&
        !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      ) {
        const normX = (x / rect.width - 0.5) * 2;
        const normY = (y / rect.height - 0.5) * 2;
        const rotateY = Math.max(-3, Math.min(3, normX * 3));
        const rotateX = Math.max(-3, Math.min(3, -normY * 3));
        el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }
    }
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (el && tilt) {
      el.style.transform = "";
    }
    onMouseLeave?.(event);
  };

  const Component = as;
  const glowColor = ACCENT_GRADIENTS[accent];

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        cardRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group/spotlight relative overflow-hidden ${className}`.trim()}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${glowColor}, transparent 45%)`,
        }}
      />
      {children}
    </Component>
  );
}
