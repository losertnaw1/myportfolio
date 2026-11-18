import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { HeroSection } from "@/components/HeroSection";
import { SkillsBento } from "@/components/SkillsBento";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SideProjectsPreview } from "@/components/SideProjectsPreview";
import { portfolioData } from "@/data/portfolio";

describe("Main Portfolio Page Sections", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

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

  it("renders Hero impact metrics strip and auto-cycles pipeline layers every 3500ms while pausing on hover", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    );

    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(screen.getByText("4+")).toBeInTheDocument();
    expect(screen.getByText("< 15 ms")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /tự động hóa|automation/i })
    ).toHaveLength(1);

    const telemetryBar = screen.getByTestId("pipeline-telemetry-bar");
    expect(telemetryBar).toHaveTextContent(/10ms/i);

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(telemetryBar).toHaveTextContent(/\.NET WORKER/i);

    const pipelineCard = screen.getByTestId("hero-pipeline-card");
    fireEvent.mouseEnter(pipelineCard);

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(telemetryBar).toHaveTextContent(/\.NET WORKER/i);

    fireEvent.mouseLeave(pipelineCard);
    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(telemetryBar).toHaveTextContent(/ELECTRON IPC/i);
  });

  it("disables Hero pipeline auto-cycling when prefers-reduced-motion: reduce is active", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    );

    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    const telemetryBar = screen.getByTestId("pipeline-telemetry-bar");
    expect(telemetryBar).toHaveTextContent(/10ms/i);

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(telemetryBar).toHaveTextContent(/10ms/i);
  });

  it("keeps Hero pipeline paused when blurring focus while pointer is still hovering over the pipeline card", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    );

    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    const pipelineCard = screen.getByTestId("hero-pipeline-card");
    const telemetryBar = screen.getByTestId("pipeline-telemetry-bar");

    fireEvent.mouseEnter(pipelineCard);
    fireEvent.focus(pipelineCard);
    fireEvent.blur(pipelineCard, { relatedTarget: null });

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(telemetryBar).toHaveTextContent(/10ms/i);
  });

  it("renders illuminated career timeline rail inside ExperienceSection", () => {
    render(
      <LanguageProvider>
        <ExperienceSection />
      </LanguageProvider>
    );

    expect(screen.getByTestId("career-timeline-rail")).toBeInTheDocument();
  });

  it("renders SideProjectsPreview with cover screenshots, metrics, and deep links to /side-projects", () => {
    render(
      <LanguageProvider>
        <SideProjectsPreview />
      </LanguageProvider>
    );

    for (const sp of portfolioData.sideProjects) {
      expect(screen.getByText(sp.title.en)).toBeInTheDocument();
      expect(screen.getByAltText(sp.images[0].alt.en)).toHaveAttribute(
        "src",
        sp.images[0].src
      );
    }

    const viewAllLink = screen.getByRole("link", {
      name: /xem tất cả dự án phụ|view all side projects/i,
    });
    expect(viewAllLink).toHaveAttribute("href", "/side-projects");
  });
});
