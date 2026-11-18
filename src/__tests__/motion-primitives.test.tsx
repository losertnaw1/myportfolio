import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

describe("Motion UI Primitives", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("updates --spotlight-x and --spotlight-y CSS variables on mouse move and supports article tag", () => {
    render(
      <SpotlightCard as="article" data-testid="spot-card" accent="sky" tilt>
        <span>Card Body</span>
      </SpotlightCard>
    );

    const card = screen.getByTestId("spot-card");
    expect(card.tagName).toBe("ARTICLE");

    vi.spyOn(card, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 50,
      width: 200,
      height: 100,
      right: 300,
      bottom: 150,
      x: 100,
      y: 50,
      toJSON: () => ({}),
    });

    fireEvent.mouseMove(card, { clientX: 160, clientY: 90 });
    expect(card.style.getPropertyValue("--spotlight-x")).toBe("60px");
    expect(card.style.getPropertyValue("--spotlight-y")).toBe("40px");

    fireEvent.mouseLeave(card);
    expect(card.style.transform).toBe("");
  });

  it("renders ScrollReveal immediately visible when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(
      <ScrollReveal>
        <span>Immediate Content</span>
      </ScrollReveal>
    );

    const wrapper = screen.getByText("Immediate Content").parentElement!;
    expect(wrapper.className).toContain("opacity-100");
  });

  it("renders ScrollReveal immediately visible when prefers-reduced-motion: reduce matches", () => {
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(() => ({ observe, disconnect: vi.fn(), unobserve: vi.fn() }))
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    );

    render(
      <ScrollReveal>
        <span>Reduced Motion Content</span>
      </ScrollReveal>
    );

    const wrapper = screen.getByText("Reduced Motion Content").parentElement!;
    expect(wrapper.className).toContain("opacity-100");
    expect(observe).not.toHaveBeenCalled();
  });

  it("transitions ScrollReveal from opacity-0 to opacity-100 when IntersectionObserver intersects", () => {
    let callback: IntersectionObserverCallback = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn((cb: IntersectionObserverCallback) => {
        callback = cb;
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

    render(
      <ScrollReveal delayMs={120} direction="up">
        <span>Animated Content</span>
      </ScrollReveal>
    );

    const wrapper = screen.getByText("Animated Content").parentElement!;
    expect(wrapper.className).toContain("opacity-0");

    act(() => {
      callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(wrapper.className).toContain("opacity-100");
    expect(disconnect).toHaveBeenCalled();
  });
});
