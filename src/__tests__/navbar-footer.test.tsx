import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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

    const langToggle = screen.getByRole("button", { name: /switch language|chuyển ngôn ngữ|en|vi/i });
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
});

