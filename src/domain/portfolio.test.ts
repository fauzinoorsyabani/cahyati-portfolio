import { describe, expect, it } from "vitest";
import { formatIndexTag, getPortfolioSnapshot } from "./portfolio";

describe("Portfolio domain seam (CV ATS Cahyati_Update.docx fidelity)", () => {
  it("exposes Cahyati's authentic practitioner identity and contact details", () => {
    const { practitioner } = getPortfolioSnapshot();

    expect(practitioner.name).toBe("Cahyati");
    expect(practitioner.wordmark).toBe("cahyati");
    expect(practitioner.email).toBe("cayaaproject2023@gmail.com");
    expect(practitioner.phoneDisplay).toBe("+62 821-1611-9090");
    expect(practitioner.phoneHref).toBe("tel:+6282116119090");
    expect(practitioner.linkedinUrl).toBe("https://www.linkedin.com/in/cahyati-cayaaa");
    expect(practitioner.location).toBe("Tasikmalaya, West Java");
    expect(practitioner.university).toBe("Universitas Siliwangi");
    expect(practitioner.degree).toBe("B.Sc. in Information Systems");
    expect(practitioner.gpa).toBe("3.92 / 4.00");
  });

  it("includes all 7 verified credentials and awards from her CV", () => {
    const { credentials } = getPortfolioSnapshot();

    expect(credentials).toHaveLength(7);
    const titles = credentials.map((c) => c.title).join(" | ");
    expect(titles).toMatch(/BNSP/i);
    expect(titles).toMatch(/RevoU/i);
    expect(titles).toMatch(/Independent Campus|Kampus Merdeka/i);
    expect(titles).toMatch(/ITC/i);
    expect(titles).toMatch(/Math Olympiad/i);
    expect(titles).toMatch(/Chemistry Olympiad/i);
    expect(titles).toMatch(/Pekan Ilmiah Andalas/i);
  });

  it("grounds case studies, capabilities, track record, and FAQs in authentic data engineering facts with zero leftover Capture copy", () => {
    const snapshot = getPortfolioSnapshot();
    const serialized = JSON.stringify(snapshot);

    expect(snapshot.caseStudies).toHaveLength(5);
    expect(snapshot.capabilities).toHaveLength(5);
    expect(snapshot.trackRecordHighlights).toHaveLength(3);
    expect(snapshot.faqEntries).toHaveLength(5);
    expect(snapshot.galleryFrames).toHaveLength(14);
    expect(snapshot.leadershipMandates.length).toBeGreaterThanOrEqual(6);

    // Authentic CV markers must exist
    expect(serialized).toMatch(/Angkasa Pura/i);
    expect(serialized).toMatch(/1,000\+/);
    expect(serialized).toMatch(/BigQuery/i);
    expect(serialized).toMatch(/Power BI/i);
    expect(serialized).toMatch(/Looker Studio/i);

    // Zero leftover photography template markers or external Jiro CDN hotlinks
    expect(serialized).not.toMatch(/cdn\.jiro\.build/i);
    expect(serialized).not.toMatch(/capture@gmail\.com/i);
    expect(serialized).not.toMatch(/Wick Million/i);
    expect(serialized).not.toMatch(/FORMA STUDIO/i);
    expect(serialized).not.toMatch(/Weddings|Bride and Groom|photographer/i);
  });

  it("serves every visual asset from local /images/ paths", () => {
    const snapshot = getPortfolioSnapshot();
    const imagePaths = [
      snapshot.practitioner.heroBackgroundSrc,
      snapshot.practitioner.portraitSrc,
      snapshot.practitioner.aboutPortraitSrc,
      ...snapshot.caseStudies.map((cs) => cs.imageSrc),
      ...snapshot.capabilities.map((cap) => cap.imageSrc),
      ...snapshot.trackRecordHighlights.map((tr) => tr.imageSrc),
      ...snapshot.galleryFrames.map((frame) => frame.imageSrc),
      ...snapshot.whySection.polaroids.map((p) => p.imageSrc),
      ...snapshot.whySection.marqueeRows.flatMap((row) => row.tiles.map((t) => t.imageSrc)),
      snapshot.whySection.viewfinderImageSrc,
      snapshot.whySection.detailImageSrc,
    ];

    expect(imagePaths.length).toBeGreaterThan(20);
    for (const src of imagePaths) {
      expect(src).toMatch(/^\/images\/[a-z0-9-]+\.jpg$/);
    }
  });

  it("formats zero-based indices into Capture-style brace tags", () => {
    expect(formatIndexTag(0)).toBe("{01}");
    expect(formatIndexTag(4)).toBe("{05}");
    expect(formatIndexTag(9)).toBe("{10}");
  });
});
