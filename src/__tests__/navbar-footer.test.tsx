import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

describe("Navbar & Footer Components", () => {
  it("renders Navbar with brand, /automation link, and working EN/VI switcher", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    expect(screen.getByText(/quocdat/i)).toBeInTheDocument();
    const autoLinks = screen.getAllByRole("link", {
      name: /tự động hóa|automation/i,
    });
    expect(autoLinks.length).toBeGreaterThan(0);
    expect(autoLinks[0]).toHaveAttribute("href", "/automation");

    const langToggle = screen.getByRole("button", {
      name: /switch language|chuyển ngôn ngữ|en|vi/i,
    });
    fireEvent.click(langToggle);
    expect(langToggle).toHaveTextContent(/EN/i);
  });

  it("renders Footer with contact details for Le Quoc Dat and GitHub link", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    expect(screen.getByText(/quale\.2112@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/0364261898/i)).toBeInTheDocument();
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/losertnaw1");
  });

  it("renders scroll progress bar safely at 0% on zero-scroll pages and updates on window scroll", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });

    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    const progressBar = screen.getByTestId("scroll-progress-bar");
    expect(progressBar.style.width).toBe("0%");

    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 1800,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 500,
    });
    fireEvent.scroll(window);

    expect(progressBar.style.width).toBe("50%");
  });

  it("closes open Side Projects dropdown when pressing Escape", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    const menuButton = screen.getByRole("button", {
      name: /dự án phụ|side projects/i,
    });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("shows BackToTop button only after scrolling past 420px and scrolls to top on click", () => {
    const scrollToSpy = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollToSpy,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 100,
    });

    render(
      <LanguageProvider>
        <BackToTop />
      </LanguageProvider>
    );

    expect(screen.queryByTestId("back-to-top-btn")).not.toBeInTheDocument();

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 500,
    });
    fireEvent.scroll(window);

    const btn = screen.getByTestId("back-to-top-btn");
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("activates #projects with threshold 0 and clears section highlight when scrolling into #side-projects-preview", () => {
    let observerCallback: IntersectionObserverCallback = () => {};
    let capturedOptions: IntersectionObserverInit | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn((cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => {
        observerCallback = cb;
        capturedOptions = opts;
        return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() };
      })
    );

    render(
      <LanguageProvider>
        <Navbar />
        <div id="about" />
        <div id="skills" />
        <div id="projects" />
        <div id="education" />
        <div id="side-projects-preview" />
      </LanguageProvider>
    );

    expect(capturedOptions?.threshold).toBe(0);

    const projectsEl = document.getElementById("projects")!;
    const sidePreviewEl = document.getElementById("side-projects-preview")!;

    fireEvent(window, new Event("scroll"));
    React.act(() => {
      observerCallback(
        [{ isIntersecting: true, target: projectsEl } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    const projectsLink = screen.getByRole("link", { name: /kinh nghiệm & dự án/i });
    expect(projectsLink).toHaveAttribute("data-active", "true");

    React.act(() => {
      observerCallback(
        [{ isIntersecting: true, target: sidePreviewEl } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(projectsLink).not.toHaveAttribute("data-active", "true");
    const eduLink = screen.getByRole("link", { name: /học vấn/i });
    expect(eduLink).not.toHaveAttribute("data-active", "true");

    vi.unstubAllGlobals();
  });
});
