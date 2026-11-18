import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { AutomationShowcase } from "@/components/AutomationShowcase";
import { portfolioData } from "@/data/portfolio";

describe("Dedicated Automation Showcase Page (/automation)", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function renderAndFinishBoot() {
    vi.useFakeTimers();
    const utils = render(
      <LanguageProvider>
        <AutomationShowcase />
      </LanguageProvider>
    );
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    return utils;
  }

  it("renders each automation project in its own block with image, description, and tech stack", () => {
    renderAndFinishBoot();

    for (const project of portfolioData.automationProjects) {
      expect(screen.getByText(project.title.en)).toBeInTheDocument();
    }

    const firstDiagram = screen.getByAltText(
      portfolioData.automationProjects[0].images[0].alt.en
    );
    expect(firstDiagram.className).not.toContain("animate-scale-fade-in");
  });

  it("filters automation project blocks by category", () => {
    renderAndFinishBoot();

    const visionFilter = screen.getByRole("button", { name: /Vision/i });
    fireEvent.click(visionFilter);

    const visionProjects = portfolioData.automationProjects.filter(
      (p) => p.category === "vision"
    );
    expect(visionProjects.length).toBeGreaterThan(0);
    expect(screen.getByText(visionProjects[0].title.en)).toBeInTheDocument();
  });

  it("opens and closes the image Lightbox modal when clicking a project preview image", () => {
    renderAndFinishBoot();

    const zoomButtons = screen.getAllByTestId("open-lightbox-btn");
    expect(zoomButtons.length).toBeGreaterThan(0);

    fireEvent.click(zoomButtons[0]);
    expect(screen.getByTestId("lightbox-modal")).toBeInTheDocument();

    const closeBtn = screen.getByTestId("close-lightbox-btn");
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
  });

  it("hides Prev/Next controls when opening Lightbox on a single-image automation project and restores body overflow on close", () => {
    document.body.style.overflow = "auto";
    renderAndFinishBoot();

    // AUTO-02 (index 1) has exactly 1 image
    const zoomButtons = screen.getAllByTestId("open-lightbox-btn");
    fireEvent.click(zoomButtons[1]);

    expect(screen.getByTestId("lightbox-modal")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.queryByTestId("lightbox-prev-btn")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lightbox-next-btn")).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("does not render developer or AI meta-guide instructions on the public showcase", () => {
    renderAndFinishBoot();

    expect(
      screen.queryAllByText(
        /Modular Project Blocks|Cấu trúc Mở rộng Dễ dàng|src\/data\/portfolio\.ts/i
      )
    ).toHaveLength(0);
  });

  it("shows only AsciiSkeleton during initial 2000ms boot while keeping project anchor IDs mounted, then decodes heading", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() }))
    );
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
        <AutomationShowcase />
      </LanguageProvider>
    );

    expect(screen.getByTestId("ascii-boot-section")).toHaveAttribute(
      "data-loading",
      "true"
    );
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();

    for (const project of portfolioData.automationProjects) {
      expect(document.getElementById(project.id)).not.toBeNull();
    }
    expect(
      document.querySelectorAll("[data-ascii-skeleton]").length
    ).toBeGreaterThan(0);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.closest("[data-scroll-reveal]")).toBeNull();
  });
});
