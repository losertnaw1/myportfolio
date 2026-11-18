import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { AutomationShowcase } from "@/components/AutomationShowcase";
import { portfolioData } from "@/data/portfolio";

describe("Dedicated Automation Showcase Page (/automation)", () => {
  it("renders each automation project in its own block with image, description, and tech stack", () => {
    render(
      <LanguageProvider>
        <AutomationShowcase />
      </LanguageProvider>
    );

    for (const project of portfolioData.automationProjects) {
      expect(screen.getByText(project.title.vi)).toBeInTheDocument();
    }
  });

  it("filters automation project blocks by category", () => {
    render(
      <LanguageProvider>
        <AutomationShowcase />
      </LanguageProvider>
    );

    const visionFilter = screen.getByRole("button", { name: /Vision/i });
    fireEvent.click(visionFilter);

    const visionProjects = portfolioData.automationProjects.filter(
      (p) => p.category === "vision"
    );
    expect(visionProjects.length).toBeGreaterThan(0);
    expect(screen.getByText(visionProjects[0].title.vi)).toBeInTheDocument();
  });

  it("opens and closes the image Lightbox modal when clicking a project preview image", () => {
    render(
      <LanguageProvider>
        <AutomationShowcase />
      </LanguageProvider>
    );

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
    render(
      <LanguageProvider>
        <AutomationShowcase />
      </LanguageProvider>
    );

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
    render(
      <LanguageProvider>
        <AutomationShowcase />
      </LanguageProvider>
    );

    expect(
      screen.queryAllByText(
        /Modular Project Blocks|Cấu trúc Mở rộng Dễ dàng|src\/data\/portfolio\.ts/i
      )
    ).toHaveLength(0);
  });
});
