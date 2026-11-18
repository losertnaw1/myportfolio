import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { AsciiBootSection } from "@/components/ui/AsciiBootSection";
import { LazyAsciiSection } from "@/components/ui/LazyAsciiSection";

function BilingualHeroProbe() {
  const { lang, toggleLang } = useLanguage();
  return (
    <AsciiBootSection minDurationMs={2000}>
      <h1>{lang === "en" ? "System Ready" : "Hệ thống Sẵn sàng"}</h1>
      <button type="button" onClick={toggleLang}>
        Switch Lang
      </button>
    </AsciiBootSection>
  );
}

describe("ASCII Reveal Loading (>= 2s) & Viewport Lazy Loading", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("holds AsciiBootSection in loading state for at least 2000ms, decodes at 2000ms, and stays decoded on EN/VI language toggle", () => {
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
        <BilingualHeroProbe />
      </LanguageProvider>
    );

    const boot = screen.getByTestId("ascii-boot-section");
    expect(boot).toHaveAttribute("data-loading", "true");
    expect(boot).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("System Ready")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1999);
    });
    expect(boot).toHaveAttribute("data-loading", "true");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(boot).toHaveAttribute("data-loading", "false");
    expect(boot).not.toHaveAttribute("aria-busy", "true");

    // Switching language EN -> VI must NOT re-trigger the 2000ms loading lock
    fireEvent.click(screen.getByRole("button", { name: /switch lang/i }));
    expect(screen.getByText("Hệ thống Sẵn sàng")).toBeInTheDocument();
    expect(boot).toHaveAttribute("data-loading", "false");
  });

  it("skips the 2000ms loading hold immediately when prefers-reduced-motion: reduce is active", () => {
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
      <AsciiBootSection minDurationMs={2000}>
        <p>Reduced Motion Hero</p>
      </AsciiBootSection>
    );

    const boot = screen.getByTestId("ascii-boot-section");
    expect(boot).toHaveAttribute("data-loading", "false");
  });

  it("renders AsciiSkeleton lazily until IntersectionObserver intersects, then mounts children with AsciiReveal", () => {
    let observerCallback: IntersectionObserverCallback = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn((cb: IntersectionObserverCallback) => {
        observerCallback = cb;
        return { observe: vi.fn(), disconnect, unobserve: vi.fn() };
      })
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    );

    const { container } = render(
      <LazyAsciiSection skeletonLines={4}>
        <div data-testid="heavy-lazy-card">Lazy Project Content</div>
      </LazyAsciiSection>
    );

    const wrapper = screen.getByTestId("lazy-ascii-section");
    expect(wrapper).toHaveAttribute("data-revealed", "false");
    expect(container.querySelector("[data-ascii-skeleton]")).not.toBeNull();
    expect(screen.queryByTestId("heavy-lazy-card")).not.toBeInTheDocument();

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(wrapper).toHaveAttribute("data-revealed", "true");
    expect(container.querySelector("[data-ascii-skeleton]")).toBeNull();
    expect(screen.getByTestId("heavy-lazy-card")).toBeInTheDocument();
    expect(disconnect).toHaveBeenCalled();
  });

  it("mounts LazyAsciiSection children immediately when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <LazyAsciiSection>
        <span>Fallback Content</span>
      </LazyAsciiSection>
    );

    expect(screen.getByText("Fallback Content")).toBeInTheDocument();
    expect(screen.getByTestId("lazy-ascii-section")).toHaveAttribute(
      "data-revealed",
      "true"
    );
  });
});
