import React from "react";
import dynamic from "next/dynamic";
import { AsciiSkeleton } from "ascii-reveal";
import { HeroSection } from "@/components/HeroSection";

function SectionSkeleton({ id, lines = 5 }: { id: string; lines?: number }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 text-slate-600">
        <AsciiSkeleton variant="dither" lines={lines} />
      </div>
    </section>
  );
}

const SkillsBento = dynamic(
  () => import("@/components/SkillsBento").then((mod) => mod.SkillsBento),
  { loading: () => <SectionSkeleton id="skills" lines={5} /> }
);

const ExperienceSection = dynamic(
  () =>
    import("@/components/ExperienceSection").then(
      (mod) => mod.ExperienceSection
    ),
  {
    loading: () => (
      <div>
        <SectionSkeleton id="projects" lines={6} />
        <SectionSkeleton id="education" lines={4} />
      </div>
    ),
  }
);

const SideProjectsPreview = dynamic(
  () =>
    import("@/components/SideProjectsPreview").then(
      (mod) => mod.SideProjectsPreview
    ),
  { loading: () => <SectionSkeleton id="side-projects-preview" lines={6} /> }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsBento />
      <ExperienceSection />
      <SideProjectsPreview />
    </>
  );
}
