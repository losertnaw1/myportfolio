import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { SkillsBento } from "@/components/SkillsBento";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SideProjectsPreview } from "@/components/SideProjectsPreview";

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
