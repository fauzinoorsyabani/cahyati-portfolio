import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getPortfolioSnapshot } from "../domain/portfolio";
import { AboutSection } from "./AboutSection";
import { CapabilitiesSection } from "./CapabilitiesSection";
import { ContactFormSection } from "./ContactFormSection";
import { FaqSection } from "./FaqSection";
import { GallerySection } from "./GallerySection";
import { ProjectsSection } from "./ProjectsSection";
import { TrackRecordSection } from "./TrackRecordSection";

const snapshot = getPortfolioSnapshot();

describe("Interactive UI section seams", () => {
  it("AboutSection opens the complete CV dossier (including YIA internship and all 12 mandates), locks scroll, and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(
      <AboutSection
        practitioner={snapshot.practitioner}
        partnerMarks={snapshot.partnerMarks}
        workExperience={snapshot.workExperience}
        credentials={snapshot.credentials}
        leadershipMandates={snapshot.leadershipMandates}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /open cv snapshot/i });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("bg-[#f7f5f0]");
    expect(dialog.className).toContain("text-[#0f172a]");
    expect(dialog.className).not.toContain("bg-[#f1f1f1]");
    expect(dialog).toHaveTextContent("Universitas Siliwangi");
    expect(dialog).toHaveTextContent("3.92 / 4.00");
    expect(dialog).toHaveTextContent("PT Angkasa Pura Indonesia (YIA)");
    expect(dialog).toHaveTextContent("1,000+ Ground Support Equipment");
    expect(dialog).toHaveTextContent("BNSP Data Analyst");
    expect(dialog).toHaveTextContent("MABIM HMSI FT-UNSIL");
    expect(dialog).toHaveTextContent("Leadership Mandates (12)");
    expect(document.body.style.overflow).toBe("hidden");
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(trigger);
  });

  it("ProjectsSection opens a case study detail modal with scroll lock and restores focus on close", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection caseStudies={snapshot.caseStudies} />);

    const cardButton = screen.getByRole("button", {
      name: /Airport GSE QR-Code Inventory/i,
    });
    await user.click(cardButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("PT Angkasa Pura Indonesia (YIA)");
    expect(dialog).toHaveTextContent("1,000+ physical GSE units");
    expect(dialog).toHaveTextContent("QR-Code Workflows");
    expect(document.body.style.overflow).toBe("hidden");
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.click(within(dialog).getByRole("button", { name: /^close$/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(cardButton);
  });

  it("CapabilitiesSection activates capability description when selecting an item", async () => {
    const user = userEvent.setup();
    render(<CapabilitiesSection capabilities={snapshot.capabilities} />);

    const bigQueryButton = screen.getByRole("button", {
      name: /BigQuery & Modeling/i,
    });
    await user.click(bigQueryButton);

    expect(bigQueryButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Structuring scalable cloud datasets in Google BigQuery/i),
    ).toBeVisible();
  });

  it("FaqSection expands and collapses FAQ entries via aria-expanded and aria-controls", async () => {
    const user = userEvent.setup();
    render(<FaqSection entries={snapshot.faqEntries} />);

    const firstTrigger = screen.getByRole("button", {
      name: /What roles are you currently open to/i,
    });
    const secondTrigger = screen.getByRole("button", {
      name: /What is your core data engineering/i,
    });

    const firstPanelId = firstTrigger.getAttribute("aria-controls");
    expect(firstPanelId).toBeTruthy();
    const firstPanel = document.getElementById(firstPanelId!);
    expect(firstPanel).toHaveAttribute("aria-hidden", "true");

    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    await user.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(firstPanel).toHaveAttribute("aria-hidden", "false");

    await user.click(secondTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    expect(firstPanel).toHaveAttribute("aria-hidden", "true");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");

    await user.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
  });

  it("GallerySection exposes a keyboard-accessible 3D carousel rotating on ArrowLeft and ArrowRight", async () => {
    const user = userEvent.setup();
    render(<GallerySection frames={snapshot.galleryFrames} />);

    const carousel = screen.getByRole("region", {
      name: /gallery/i,
    });
    carousel.focus();
    const rotor = carousel.querySelector<HTMLElement>('[data-testid="gallery-rotor"]');
    expect(rotor).not.toBeNull();

    const readAngle = () => {
      const match = rotor?.style.transform.match(/rotateY\(([-\d.]+)deg\)/);
      return match?.[1] ? Number(match[1]) : 0;
    };

    const initial = readAngle();
    await user.keyboard("{ArrowRight}");
    const afterRight = readAngle();
    expect(afterRight - initial).toBeCloseTo(-30, 0);

    await user.keyboard("{ArrowLeft}");
    const afterLeft = readAngle();
    expect(afterLeft - afterRight).toBeCloseTo(30, 0);
  });

  it("TrackRecordSection cycles forward and backward with wrap-around", async () => {
    const user = userEvent.setup();
    render(<TrackRecordSection highlights={snapshot.trackRecordHighlights} />);

    const prevButton = screen.getByRole("button", { name: /previous highlight/i });
    const nextButton = screen.getByRole("button", { name: /next highlight/i });

    expect(screen.getByTestId("active-highlight-index")).toHaveTextContent("{01}");

    await user.click(prevButton);
    expect(screen.getByTestId("active-highlight-index")).toHaveTextContent("{03}");

    await user.click(nextButton);
    expect(screen.getByTestId("active-highlight-index")).toHaveTextContent("{01}");
  });

  it("ContactFormSection validates inputs, dispatches mailto through its adapter seam, and resets", async () => {
    const user = userEvent.setup();
    const openMailto = vi.fn();
    render(
      <ContactFormSection
        practitioner={snapshot.practitioner}
        onOpenMailto={openMailto}
      />,
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(
      screen.getByText(/Please fill in your name, e-mail, and message/i),
    ).toBeVisible();
    expect(openMailto).not.toHaveBeenCalled();

    const nameInput = screen.getByLabelText(/^Name$/i);
    expect(nameInput.className).toContain("placeholder:text-[#64748b]");
    expect(nameInput.className).not.toContain("placeholder:text-[#2563eb]");

    await user.type(nameInput, "Rani Putri");
    await user.type(screen.getByLabelText(/^Email$/i), "bad-email");
    await user.type(
      screen.getByLabelText(/^Message$/i),
      "Interested in discussing a Data Engineer opening.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/Please enter a valid e-mail address/i)).toBeVisible();
    expect(openMailto).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText(/^Email$/i));
    await user.type(screen.getByLabelText(/^Email$/i), "rani@company.id");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(openMailto).toHaveBeenCalledTimes(1);
    expect(openMailto.mock.calls[0]?.[0]).toMatch(
      /^mailto:cayaaproject2023@gmail\.com\?subject=Portfolio%20inquiry%20from%20Rani%20Putri/,
    );
    expect(screen.getByText(/Thank you!/i)).toBeVisible();

    await user.click(
      screen.getByRole("button", { name: /send another message/i }),
    );
    expect(screen.getByLabelText(/^Name$/i)).toBeVisible();
  });
});
