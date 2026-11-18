import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { SideProjectsShowcase } from "@/components/SideProjectsShowcase";
import { Navbar } from "@/components/Navbar";
import { portfolioData } from "@/data/portfolio";

describe("Side Projects Page (/side-projects)", () => {
  it("renders both side projects with their overview, images and live link", () => {
    render(
      <LanguageProvider>
        <SideProjectsShowcase />
      </LanguageProvider>
    );

    for (const project of portfolioData.sideProjects) {
      expect(screen.getByText(project.title.en)).toBeInTheDocument();
    }

    const lucinox = portfolioData.sideProjects[0];
    expect(screen.getByText(lucinox.overview.en[0])).toBeInTheDocument();
    expect(screen.getByText(lucinox.highlights.en[0])).toBeInTheDocument();

    const liveLink = screen.getByRole("link", {
      name: /open live website|mở website trực tiếp/i,
    });
    expect(liveLink).toHaveAttribute("href", "https://lucinox.vercel.app");

    const minersHaven = portfolioData.sideProjects[1];
    expect(screen.getByText(minersHaven.overview.en[0])).toBeInTheDocument();
    expect(screen.getByAltText(minersHaven.images[0].alt.en)).toHaveAttribute(
      "src",
      minersHaven.images[0].src
    );
  });

  it("switches gallery screenshots and opens the Lightbox modal", () => {
    render(
      <LanguageProvider>
        <SideProjectsShowcase />
      </LanguageProvider>
    );

    const thumbnails = screen.getAllByLabelText(/view image \d+|xem ảnh \d+/i);
    expect(thumbnails.length).toBe(
      portfolioData.sideProjects.reduce((total, p) => total + p.images.length, 0)
    );

    fireEvent.click(thumbnails[1]);
    expect(
      screen.getByText(portfolioData.sideProjects[0].images[1].caption.en)
    ).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("open-lightbox-btn")[0]);
    expect(screen.getByTestId("lightbox-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-lightbox-btn"));
    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
  });

  it("exposes the Side Projects menu in the navbar", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    const menuButton = screen.getByRole("button", {
      name: /dự án phụ|side projects/i,
    });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const projectLink = screen.getByRole("link", {
      name: new RegExp(portfolioData.sideProjects[1].menuTitle.en, "i"),
    });
    expect(projectLink).toHaveAttribute("href", "/side-projects#miners-haven");
  });

  it("cycles Lightbox images with wrap-around via ArrowLeft/ArrowRight and Prev/Next buttons", () => {
    render(
      <LanguageProvider>
        <SideProjectsShowcase />
      </LanguageProvider>
    );

    const lucinoxImages = portfolioData.sideProjects[0].images;
    fireEvent.click(screen.getAllByTestId("open-lightbox-btn")[0]);

    expect(screen.getByTestId("lightbox-counter")).toHaveTextContent(
      `1 / ${lucinoxImages.length}`
    );

    // Wrap backward from index 0 -> last image
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("lightbox-counter")).toHaveTextContent(
      `${lucinoxImages.length} / ${lucinoxImages.length}`
    );

    // Wrap forward from last image -> index 0 via Next button
    fireEvent.click(screen.getByTestId("lightbox-next-btn"));
    expect(screen.getByTestId("lightbox-counter")).toHaveTextContent(
      `1 / ${lucinoxImages.length}`
    );
  });

  it("renders above-the-fold page h1 without an opacity-0 ScrollReveal wrapper", () => {
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
        <SideProjectsShowcase />
      </LanguageProvider>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.closest("[data-scroll-reveal]")).toBeNull();
    vi.unstubAllGlobals();
  });
});
