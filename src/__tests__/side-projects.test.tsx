import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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
      expect(screen.getByText(project.title.vi)).toBeInTheDocument();
    }

    const lucinox = portfolioData.sideProjects[0];
    expect(screen.getByText(lucinox.overview.vi[0])).toBeInTheDocument();
    expect(screen.getByText(lucinox.highlights.vi[0])).toBeInTheDocument();

    const liveLink = screen.getByRole("link", { name: /mở website trực tiếp/i });
    expect(liveLink).toHaveAttribute("href", "https://lucinox.vercel.app");

    const minersHaven = portfolioData.sideProjects[1];
    expect(screen.getByText(minersHaven.overview.vi[0])).toBeInTheDocument();
    expect(screen.getByAltText(minersHaven.images[0].alt.vi)).toHaveAttribute(
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

    const thumbnails = screen.getAllByLabelText(/xem ảnh \d+/i);
    expect(thumbnails.length).toBe(
      portfolioData.sideProjects.reduce((total, p) => total + p.images.length, 0)
    );

    fireEvent.click(thumbnails[1]);
    expect(
      screen.getByText(portfolioData.sideProjects[0].images[1].caption.vi)
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

    const menuButton = screen.getByRole("button", { name: /dự án phụ|side projects/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const projectLink = screen.getByRole("link", {
      name: new RegExp(portfolioData.sideProjects[1].menuTitle.vi, "i"),
    });
    expect(projectLink).toHaveAttribute("href", "/side-projects#miners-haven");
  });
});
