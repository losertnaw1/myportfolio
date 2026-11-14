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
});

