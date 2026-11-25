import { getPortfolioSnapshot } from "./domain/portfolio";
import { AboutSection } from "./sections/AboutSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FaqSection } from "./sections/FaqSection";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TaglineSection } from "./sections/TaglineSection";
import { TrackRecordSection } from "./sections/TrackRecordSection";
import { WhyChooseMeSection } from "./sections/WhyChooseMeSection";

export function App() {
  const portfolio = getPortfolioSnapshot();

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <HeroSection
        practitioner={portfolio.practitioner}
        navigation={portfolio.navigation}
        heroBadges={portfolio.heroBadges}
      />
      <AboutSection
        practitioner={portfolio.practitioner}
        partnerMarks={portfolio.partnerMarks}
        workExperience={portfolio.workExperience}
        credentials={portfolio.credentials}
        leadershipMandates={portfolio.leadershipMandates}
      />
      <ProjectsSection caseStudies={portfolio.caseStudies} />
      <CapabilitiesSection capabilities={portfolio.capabilities} />
      <WhyChooseMeSection
        practitioner={portfolio.practitioner}
        whySection={portfolio.whySection}
      />
      <FaqSection entries={portfolio.faqEntries} />
      <TrackRecordSection highlights={portfolio.trackRecordHighlights} />
      <GallerySection frames={portfolio.galleryFrames} />
      <ContactFormSection practitioner={portfolio.practitioner} />
      <TaglineSection />
      <FooterSection
        practitioner={portfolio.practitioner}
        navigation={portfolio.footerNavigation}
      />
    </main>
  );
}

export default App;
