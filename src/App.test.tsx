import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Full portfolio application seam", () => {
  it("mounts all 11 Capture-structured sections with domain-aligned IDs and resolves every internal hash link to a real element", () => {
    const { container } = render(<App />);

    const expectedIds = [
      "home",
      "about",
      "portfolio",
      "capabilities",
      "why",
      "faq",
      "track-record",
      "gallery",
      "inquiry",
      "contact",
    ];

    for (const id of expectedIds) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }

    // Zero leftover Capture photography section IDs
    expect(container.querySelector("#services")).toBeNull();
    expect(container.querySelector("#testimonials")).toBeNull();
    expect(container.querySelector("#book")).toBeNull();

    const hashLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    expect(hashLinks.length).toBeGreaterThan(5);

    for (const link of hashLinks) {
      const targetId = link.getAttribute("href")?.slice(1);
      expect(targetId).toBeTruthy();
      expect(container.querySelector(`#${targetId}`)).not.toBeNull();
    }
  });

  it("references only existing local image files under public/images and zero external Capture URLs", () => {
    const { container } = render(<App />);
    const images = Array.from(container.querySelectorAll("img"));
    expect(images.length).toBeGreaterThan(25);

    const publicDir = path.resolve(process.cwd(), "public");
    for (const img of images) {
      const src = img.getAttribute("src") ?? "";
      expect(src).toMatch(/^\/images\/[a-z0-9-]+\.jpg$/);
      expect(fs.existsSync(path.join(publicDir, src))).toBe(true);
    }
  });

  it("toggles the mobile navigation drawer when viewport is below 1024px", async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(
      document.documentElement,
      "clientWidth",
    );
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 390,
    });

    try {
      const user = userEvent.setup();
      render(<App />);

      const menuButton = screen.getByRole("button", { name: /open menu/i });
      expect(menuButton).toHaveAttribute("aria-expanded", "false");

      await user.click(menuButton);
      expect(
        screen.getByRole("button", { name: /close menu/i }),
      ).toHaveAttribute("aria-expanded", "true");

      await user.keyboard("{Escape}");
      expect(
        screen.getByRole("button", { name: /open menu/i }),
      ).toHaveAttribute("aria-expanded", "false");
    } finally {
      if (originalClientWidth) {
        Object.defineProperty(
          document.documentElement,
          "clientWidth",
          originalClientWidth,
        );
      } else {
        Object.defineProperty(document.documentElement, "clientWidth", {
          configurable: true,
          value: 1440,
        });
      }
    }
  });
});
