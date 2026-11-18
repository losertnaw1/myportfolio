import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { portfolioData } from "@/data/portfolio";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

function LanguageConsumer() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{lang}</span>
      <span data-testid="role-title">{t(portfolioData.profile.role)}</span>
      <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}>
        Toggle
      </button>
    </div>
  );
}

describe("Portfolio Data & Bilingual Context", () => {
  it("contains accurate personal info for Le Quoc Dat from CV", () => {
    expect(portfolioData.profile.name).toBe("Lê Quốc Đạt");
    expect(portfolioData.profile.email).toBe("quale.2112@gmail.com");
    expect(portfolioData.profile.phone).toBe("0364261898");
    expect(portfolioData.profile.github).toBe("https://github.com/losertnaw1");
  });

  it("curates featured projects and excludes student CRUD clones", () => {
    const projectIds = portfolioData.featuredProjects.map((p) => p.id);
    expect(projectIds).toContain("industrial-support-system");
    expect(projectIds).toContain("hofuri-currency-trading");
    expect(projectIds).toContain("vht-telecom-systems");
    expect(projectIds).not.toContain("soict-clone");
    expect(projectIds).not.toContain("teaching-schedules");
  });

  it("provides dedicated modular blocks for automation projects with bilingual fields and media", () => {
    expect(portfolioData.automationProjects.length).toBeGreaterThanOrEqual(4);
    for (const project of portfolioData.automationProjects) {
      expect(project.id).toBeTruthy();
      expect(project.title.vi).toBeTruthy();
      expect(project.title.en).toBeTruthy();
      expect(project.summary.vi).toBeTruthy();
      expect(project.summary.en).toBeTruthy();
      expect(project.highlights.vi.length).toBeGreaterThan(0);
      expect(project.highlights.en.length).toBeGreaterThan(0);
      expect(project.images.length).toBeGreaterThan(0);
      expect(project.techStack.length).toBeGreaterThan(0);
    }
  });

  it("defaults to EN and switches language between EN and VI via LanguageContext", () => {
    window.localStorage?.clear?.();
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId("current-lang")).toHaveTextContent("en");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByTestId("role-title").textContent).toBe(
      portfolioData.profile.role.en
    );

    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("current-lang")).toHaveTextContent("vi");
    expect(document.documentElement.lang).toBe("vi");
    expect(screen.getByTestId("role-title").textContent).toBe(
      portfolioData.profile.role.vi
    );
  });
});

