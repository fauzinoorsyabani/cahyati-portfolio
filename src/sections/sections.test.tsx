import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getPortfolioSnapshot } from "../domain/portfolio";
import { AboutSection } from "./AboutSection";
import { ContactFormSection } from "./ContactFormSection";
import { FaqSection } from "./FaqSection";
import { ProjectsSection } from "./ProjectsSection";
import { ServicesSection } from "./ServicesSection";
import { TrackRecordSection } from "./TrackRecordSection";

const snapshot = getPortfolioSnapshot();

describe("Interactive UI section seams", () => {
  it("AboutSection opens and closes the interactive CV snapshot dialog with Cahyati's credentials", async () => {
    const user = userEvent.setup();
    render(
      <AboutSection
        practitioner={snapshot.practitioner}
        partnerMarks={snapshot.partnerMarks}
        credentials={snapshot.credentials}
        leadershipMandates={snapshot.leadershipMandates}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open cv snapshot/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Universitas Siliwangi");
    expect(dialog).toHaveTextContent("3.92 / 4.00");
    expect(dialog).toHaveTextContent("BNSP Data Analyst");

    await user.click(within(dialog).getByRole("button", { name: /^close$/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ProjectsSection opens a case study detail drawer showing verified outcomes and tools", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection caseStudies={snapshot.caseStudies} />);

    await user.click(
      screen.getByRole("button", { name: /Airport GSE QR-Code Inventory/i }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("PT Angkasa Pura Indonesia (YIA)");
    expect(dialog).toHaveTextContent("1,000+ physical GSE units");
    expect(dialog).toHaveTextContent("QR-Code Workflows");

    await user.click(within(dialog).getByRole("button", { name: /^close$/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ServicesSection activates capability description when selecting an item", async () => {
    const user = userEvent.setup();
    render(<ServicesSection capabilities={snapshot.capabilities} />);

    const bigQueryButton = screen.getByRole("button", {
      name: /BigQuery & Modeling/i,
    });
    await user.click(bigQueryButton);

    expect(bigQueryButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Structuring scalable cloud datasets in Google BigQuery/i),
    ).toBeVisible();
  });

  it("FaqSection expands and collapses FAQ entries via aria-expanded", async () => {
    const user = userEvent.setup();
    render(<FaqSection entries={snapshot.faqEntries} />);

    const firstTrigger = screen.getByRole("button", {
      name: /What roles are you currently open to/i,
    });
    const secondTrigger = screen.getByRole("button", {
      name: /What is your core data engineering/i,
    });

    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    await user.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");

    await user.click(secondTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");

    await user.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
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

    await user.type(screen.getByLabelText(/^Name$/i), "Rani Putri");
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
