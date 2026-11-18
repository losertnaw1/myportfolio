"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AsciiSkeleton } from "ascii-reveal";
import { HeroSection } from "@/components/HeroSection";
import { AsciiBootProvider } from "@/components/ui/AsciiBootSection";

function SectionSkeleton({
  id,
  lines = 5,
  minHeightClassName = "min-h-[360px]",
}: {
  id: string;
  lines?: number;
  minHeightClassName?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div
        className={`rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 text-slate-600 ${minHeightClassName}`}
      >
        <AsciiSkeleton variant="dither" lines={lines} />
      </div>
    </section>
  );
}

const SkillsBento = dynamic(
  () => import("@/components/SkillsBento").then((mod) => mod.SkillsBento),
  {
    ssr: false,
    loading: () => (
      <SectionSkeleton
        id="skills"
        lines={6}
        minHeightClassName="min-h-[420px]"
      />
    ),
  }
);

const ExperienceSection = dynamic(
  () =>
    import("@/components/ExperienceSection").then(
      (mod) => mod.ExperienceSection
    ),
  {
    ssr: false,
    loading: () => (
      <div>
        <SectionSkeleton
          id="projects"
          lines={8}
          minHeightClassName="min-h-[760px]"
        />
        <SectionSkeleton
          id="education"
          lines={5}
          minHeightClassName="min-h-[320px]"
        />
      </div>
    ),
  }
);

const SideProjectsPreview = dynamic(
  () =>
    import("@/components/SideProjectsPreview").then(
      (mod) => mod.SideProjectsPreview
    ),
  {
    ssr: false,
    loading: () => (
      <SectionSkeleton
        id="side-projects-preview"
        lines={7}
        minHeightClassName="min-h-[520px]"
      />
    ),
  }
);

export default function HomePage() {
  return (
    <AsciiBootProvider minDurationMs={2000}>
      <HeroSection />
      <SkillsBento />
      <ExperienceSection />
      <SideProjectsPreview />
    </AsciiBootProvider>
  );
}
