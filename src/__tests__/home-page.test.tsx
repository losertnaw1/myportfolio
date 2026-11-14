import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { HeroSection } from "@/components/HeroSection";
import { SkillsBento } from "@/components/SkillsBento";
import { ExperienceSection } from "@/components/ExperienceSection";

describe("Main Portfolio Page Sections", () => {
  it("renders HeroSection with pipeline architecture and link to /automation", () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(screen.getByText(/Lê Quốc Đạt/i)).toBeInTheDocument();
    expect(screen.getAllByText(/PLC/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\.NET 6\+/i).length).toBeGreaterThan(0);

    const automationCta = screen.getByRole("link", {
      name: /tự động hóa|automation/i,
    });
    expect(automationCta).toHaveAttribute("href", "/automation");
  });

  it("renders SkillsBento with fullstack and industrial automation skills", () => {
    render(
      <LanguageProvider>
        <SkillsBento />
      </LanguageProvider>
    );

    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Next\.js/i)).toBeInTheDocument();
    expect(screen.getByText(/C# \/ \.NET 6\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Electron/i)).toBeInTheDocument();
  });

  it("renders ExperienceSection with HOFURI, VHT systems, and prominent link to /automation", () => {
    render(
      <LanguageProvider>
        <ExperienceSection />
      </LanguageProvider>
    );

    expect(screen.getAllByText(/HOFURI/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/VHTMSC/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/soict\.hust\.edu\.vn/i)).not.toBeInTheDocument();

    const detailLinks = screen.getAllByRole("link", {
      name: /xem chi tiết|tự động hóa|automation/i,
    });
    expect(
      detailLinks.some((link) => link.getAttribute("href") === "/automation")
    ).toBe(true);
  });
});

