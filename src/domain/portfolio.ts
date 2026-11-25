export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface PractitionerProfile {
  readonly name: string;
  readonly wordmark: string;
  readonly wordmarkLetters: readonly string[];
  readonly preloaderTagline: string;
  readonly heroSubtitle: string;
  readonly heroStatementLead: string;
  readonly heroStatementBody: string;
  readonly heroBadgeLabel: string;
  readonly heroCardTitle: string;
  readonly heroCardYear: string;
  readonly roleShort: string;
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly whatsappUrl: string;
  readonly linkedinUrl: string;
  readonly location: string;
  readonly university: string;
  readonly degree: string;
  readonly educationPeriod: string;
  readonly gpa: string;
  readonly heroBackgroundSrc: string;
  readonly portraitSrc: string;
  readonly aboutPortraitSrc: string;
  readonly aboutParagraph: string;
  readonly technicalSkills: readonly string[];
  readonly softSkills: readonly string[];
  readonly interests: readonly string[];
}

export interface Credential {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly period: string;
  readonly shortLabel: string;
  readonly category: "certification" | "award" | "program";
}

export interface PartnerMark {
  readonly name: string;
  readonly subtitle: string;
  readonly monogram: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly period: string;
  readonly category: string;
  readonly summary: string;
  readonly outcomes: readonly string[];
  readonly tools: readonly string[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly objectPosition: string;
  readonly desktopBox: {
    readonly x: number;
    readonly y: number;
    readonly w: number;
  };
}

export interface Capability {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly objectPosition: string;
  readonly desktopRow: {
    readonly top: number;
    readonly height: number;
    readonly titleTop: number;
  };
}

export interface PolaroidFrame {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly box: readonly [number, number, number, number];
  readonly frame: readonly [number, number];
  readonly photo: readonly [number, number];
  readonly rotation: number;
}

export interface MarqueeTile {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

export interface MarqueeRow {
  readonly id: string;
  readonly offset: number;
  readonly top: number;
  readonly tiles: readonly MarqueeTile[];
}

export interface MetricHighlight {
  readonly value: string;
  readonly label: string;
}

export interface WhySectionData {
  readonly primaryMetric: MetricHighlight;
  readonly secondaryMetric: MetricHighlight;
  readonly highlightMetric: MetricHighlight;
  readonly viewfinderCaption: string;
  readonly viewfinderImageSrc: string;
  readonly viewfinderImageAlt: string;
  readonly detailImageSrc: string;
  readonly detailImageAlt: string;
  readonly polaroids: readonly PolaroidFrame[];
  readonly marqueeRows: readonly MarqueeRow[];
  readonly credentialBadges: readonly string[];
}

export interface TrackRecordHighlight {
  readonly id: string;
  readonly summary: string;
  readonly title: string;
  readonly subtitle: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly objectPosition: string;
}

export interface GalleryFrame {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly caption: string;
}

export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface LeadershipMandate {
  readonly role: string;
  readonly organization: string;
  readonly period: string;
  readonly impact: string;
}

export interface WorkExperience {
  readonly id: string;
  readonly role: string;
  readonly organization: string;
  readonly period: string;
  readonly highlights: readonly string[];
}

export interface PortfolioSnapshot {
  readonly practitioner: PractitionerProfile;
  readonly navigation: readonly NavItem[];
  readonly footerNavigation: readonly NavItem[];
  readonly partnerMarks: readonly PartnerMark[];
  readonly workExperience: readonly WorkExperience[];
  readonly caseStudies: readonly CaseStudy[];
  readonly capabilities: readonly Capability[];
  readonly whySection: WhySectionData;
  readonly trackRecordHighlights: readonly TrackRecordHighlight[];
  readonly galleryFrames: readonly GalleryFrame[];
  readonly faqEntries: readonly FaqEntry[];
  readonly credentials: readonly Credential[];
  readonly leadershipMandates: readonly LeadershipMandate[];
  readonly heroBadges: readonly string[];
}

const SNAPSHOT: PortfolioSnapshot = {
  practitioner: {
    name: "Cahyati",
    wordmark: "cahyati",
    wordmarkLetters: ["c", "a", "h", "y", "a", "t", "i", "®"],
    preloaderTagline: "Data engineering & analytics",
    heroSubtitle: "through data & systems",
    heroStatementLead: "Turning complex operational records",
    heroStatementBody:
      "into reliable ETL pipelines, clear executive dashboards, and structured systems that move organizations forward.",
    heroBadgeLabel: "3.92 GPA · BNSP Certified",
    heroCardTitle: "Data engineering",
    heroCardYear: "© 2026",
    roleShort: "Data Engineer · Information Systems",
    email: "cayaaproject2023@gmail.com",
    phoneDisplay: "+62 821-1611-9090",
    phoneHref: "tel:+6282116119090",
    whatsappUrl: "https://wa.me/6282116119090",
    linkedinUrl: "https://www.linkedin.com/in/cahyati-cayaaa",
    location: "Tasikmalaya, West Java",
    university: "Universitas Siliwangi",
    degree: "B.Sc. in Information Systems",
    educationPeriod: "August 2022 – June 2026",
    gpa: "3.92 / 4.00",
    heroBackgroundSrc: "/images/cahya-01.jpg",
    portraitSrc: "/images/cahya-02.jpg",
    aboutPortraitSrc: "/images/cahya-03.jpg",
    aboutParagraph:
      "Information Systems graduate from Universitas Siliwangi (GPA 3.92/4.00) with deep focus in data engineering, ETL workflows, and business intelligence. From designing QR-Code inventory verification for 1,000+ airport ground support units at PT Angkasa Pura Indonesia (YIA) to modernizing institutional governance, I build dependable data foundations.",
    technicalSkills: [
      "Google BigQuery",
      "Power BI",
      "Looker Studio",
      "Microsoft Excel",
      "ETL & Data Cleaning",
      "Data Architecture",
      "QR Inventory Systems",
      "Canva",
    ],
    softSkills: [
      "Leadership",
      "Public Speaking",
      "Cross-Team Collaboration",
      "Time Management",
      "Document Governance",
    ],
    interests: [
      "Data Analytics",
      "IT Infrastructure",
      "Document Management",
      "Administrative Governance",
    ],
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About me", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
  ],
  footerNavigation: [
    { label: "Home", href: "#home" },
    { label: "About me", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Capabilities", href: "#capabilities" },
  ],
  heroBadges: ["BQ", "BI", "BN", "3.9"],
  partnerMarks: [
    { name: "Angkasa Pura", subtitle: "YIA Commercial", monogram: "AP" },
    { name: "Univ. Siliwangi", subtitle: "GPA 3.92", monogram: "US" },
    { name: "BNSP Certified", subtitle: "Data Analyst", monogram: "BN" },
    { name: "RevoU Tech", subtitle: "Academy", monogram: "RV" },
    { name: "BigQuery & BI", subtitle: "Analytics Stack", monogram: "BQ" },
  ],
  workExperience: [
    {
      id: "yia-commercial-intern",
      role: "Airport Commercial Intern",
      organization: "PT Angkasa Pura Indonesia (YIA)",
      period: "June 2025 – August 2025",
      highlights: [
        "Designed a QR-Code inventory solution for 1,000+ Ground Support Equipment (GSE) units, including verification and maintenance monitoring workflows.",
        "Executed foundational ETL tasks: inventory data extraction, data cleaning, and transformation for weekly reporting.",
        "Conducted routine Commercial Tenant inspections using the Commercial Inspection application to ensure safety, upkeep, and airport SOP compliance.",
        "Carried out field surveys and accompanied business visits with the Commercial team across check-in and boarding lounge zones to gather location data and partner needs.",
        "Analyzed air cargo business workflows and delivered discovery questions plus data architecture and system integration recommendations for pipeline readiness.",
        "Collaborated across Commercial, Operations, and Secretariat teams to accelerate partner document validation and sign-off.",
      ],
    },
  ],
  caseStudies: [
    {
      id: "gse-qr-inventory",
      title: "Airport GSE QR-Code Inventory",
      organization: "PT Angkasa Pura Indonesia (YIA)",
      period: "Jun – Aug 2025",
      category: "Asset Data Engineering",
      summary:
        "Architected a QR-Code asset inventory system covering 1,000+ Ground Support Equipment units at Yogyakarta International Airport, unifying field verification and maintenance monitoring.",
      outcomes: [
        "Structured tracking for 1,000+ physical GSE units across airside operations.",
        "Standardized verification checkpoints and scheduled maintenance logs.",
        "Enabled cleaner asset handover between operational and commercial units.",
      ],
      tools: ["QR-Code Workflows", "Microsoft Excel", "Data Modeling", "SOP Verification"],
      imageSrc: "/images/cahya-04.jpg",
      imageAlt: "Cahyati tossing her graduation cap against a vibrant pastel-blue twilight sky",
      objectPosition: "center 42%",
      desktopBox: { x: 185, y: 370, w: 370 },
    },
    {
      id: "weekly-etl-reporting",
      title: "Weekly Airport ETL & Reporting",
      organization: "PT Angkasa Pura Indonesia (YIA)",
      period: "Jun – Aug 2025",
      category: "ETL & Data Cleaning",
      summary:
        "Executed recurring end-to-end ETL routines—extracting raw commercial inventory tables, resolving schema inconsistencies, and publishing reliable weekly management reports.",
      outcomes: [
        "Eliminated duplicate and incomplete inventory entries prior to weekly reviews.",
        "Transformed multi-sheet operational logs into clean analytical views.",
        "Accelerated cross-team partner document validation with Commercial and Secretariat.",
      ],
      tools: ["ETL Extraction", "Data Cleaning", "Microsoft Excel", "Weekly Reporting"],
      imageSrc: "/images/cahya-05.jpg",
      imageAlt: "Cahyati raising her Cahyati, S.Kom. graduation sash beneath a deep twilight blue sky",
      objectPosition: "center 44%",
      desktopBox: { x: 785, y: 422, w: 370 },
    },
    {
      id: "air-cargo-architecture",
      title: "Air Cargo Data Architecture",
      organization: "PT Angkasa Pura Indonesia (YIA)",
      period: "Jul – Aug 2025",
      category: "Pipeline Readiness Study",
      summary:
        "Analyzed end-to-end air cargo business workflows to map stakeholder data handoffs and deliver structured discovery checklists plus system integration recommendations.",
      outcomes: [
        "Documented upstream and downstream cargo data capture points.",
        "Authored technical discovery questionnaires for IT and operations alignment.",
        "Proposed integration pathways preparing cargo workflows for automated pipelines.",
      ],
      tools: ["Systems Analysis", "Data Architecture", "Pipeline Readiness", "Process Mapping"],
      imageSrc: "/images/cahya-06.jpg",
      imageAlt: "Warm color editorial reflection of Cahyati adjusting her golden graduation tassel in a carved wooden mirror",
      objectPosition: "center 42%",
      desktopBox: { x: 255, y: 937, w: 470 },
    },
    {
      id: "commercial-tenant-inspection",
      title: "Commercial Tenant Inspection",
      organization: "PT Angkasa Pura Indonesia (YIA)",
      period: "Jun – Aug 2025",
      category: "Field Audit & Spatial Survey",
      summary:
        "Performed routine commercial concourse inspections using the Commercial Inspection application alongside field surveys across check-in and boarding lounge zones.",
      outcomes: [
        "Monitored tenant facility safety, upkeep, and airport SOP adherence.",
        "Collected spatial data and partner commercial needs during business visits.",
        "Consolidated field observations into actionable commercial evaluations.",
      ],
      tools: ["Commercial Inspection App", "Field Data Collection", "SOP Compliance", "Reporting"],
      imageSrc: "/images/cahya-07.jpg",
      imageAlt: "Cahyati proudly holding her Universitas Siliwangi diploma folder in full graduation toga amid lush green fields",
      objectPosition: "center 48%",
      desktopBox: { x: 885, y: 1055, w: 370 },
    },
    {
      id: "bi-governance-dashboards",
      title: "BI Dashboards & Governance",
      organization: "RevoU · BLM FT-UNSIL · HMSI",
      period: "2024 – 2026",
      category: "Business Intelligence & Admin",
      summary:
        "Built clear visual analytics dashboards in Power BI and Looker Studio while reforming organizational archives, RAB budgets, and quarterly secretarial reporting.",
      outcomes: [
        "Delivered decision-ready visual KPI reporting using Power BI and Looker Studio.",
        "Rebuilt internal document archives and quarterly governance reports at BLM FT-UNSIL.",
        "Managed event budgets (RAB) and sponsorship targets across major campus programs.",
      ],
      tools: ["Power BI", "Looker Studio", "Google BigQuery", "Document Governance"],
      imageSrc: "/images/cahya-10.jpg",
      imageAlt: "Radiant full-color portrait of Cahyati holding a crimson floral graduation bouquet in a twilight garden",
      objectPosition: "center 40%",
      desktopBox: { x: 485, y: 1516, w: 370 },
    },
  ],
  capabilities: [
    {
      id: "etl-pipelines",
      title: "ETL & Data Pipelines",
      description:
        "Building structured extraction, data cleaning, and transformation routines that keep operational tables accurate and reporting-ready.",
      imageSrc: "/images/cahya-05.jpg",
      imageAlt: "Cahyati celebrating with her Cahyati, S.Kom. sash under a deep sapphire sky",
      objectPosition: "center 44%",
      desktopRow: { top: 0, height: 102, titleTop: 14 },
    },
    {
      id: "bi-visualization",
      title: "BI & Visualization",
      description:
        "Turning clean datasets into executive Power BI, Looker Studio, and Excel dashboards that surface clear trends at a glance.",
      imageSrc: "/images/cahya-11.jpg",
      imageAlt: "Cahyati smiling with a vibrant red bouquet beside emerald fields and a lavender sky",
      objectPosition: "center 45%",
      desktopRow: { top: 122, height: 102, titleTop: 14 },
    },
    {
      id: "bigquery-analytics",
      title: "BigQuery & Modeling",
      description:
        "Structuring scalable cloud datasets in Google BigQuery with disciplined schemas, validation logic, and repeatable metric definitions.",
      imageSrc: "/images/cahya-06.jpg",
      imageAlt: "Editorial wooden mirror portrait of Cahyati in burgundy kebaya and golden tassel",
      objectPosition: "center 42%",
      desktopRow: { top: 244, height: 98, titleTop: 10 },
    },
    {
      id: "asset-system-audits",
      title: "Asset & System Audits",
      description:
        "Designing QR-Code asset workflows, field inspection pipelines, and cargo integration blueprints bridging physical operations with IT.",
      imageSrc: "/images/cahya-09.jpg",
      imageAlt: "Cahyati in full Universitas Siliwangi graduation toga holding her diploma with lush greenery and a passing train",
      objectPosition: "center 54%",
      desktopRow: { top: 362, height: 98, titleTop: 10 },
    },
    {
      id: "governance-leadership",
      title: "Governance & Ops",
      description:
        "Bringing quarterly reporting discipline, RAB financial tracking, and cross-functional coordination forged across 12 leadership mandates.",
      imageSrc: "/images/cahya-12.jpg",
      imageAlt: "Cahyati walking joyfully along a green garden path in graduation toga and academic medal",
      objectPosition: "center 42%",
      desktopRow: { top: 480, height: 98, titleTop: 10 },
    },
  ],
  whySection: {
    primaryMetric: {
      value: "1,000+",
      label: "Airport GSE units structured via QR-Code workflows",
    },
    secondaryMetric: {
      value: "7",
      label: "Certifications & medals",
    },
    highlightMetric: {
      value: "3.92",
      label: "Cumulative GPA in Information Systems (Universitas Siliwangi)",
    },
    viewfinderCaption:
      "Delivering clean, validated datasets where every schema, metric, and report holds up under real operational scrutiny.",
    viewfinderImageSrc: "/images/cahya-06.jpg",
    viewfinderImageAlt: "Editorial wooden mirror portrait of Cahyati in burgundy kebaya with golden tassel",
    detailImageSrc: "/images/cahya-15.jpg",
    detailImageAlt: "Cahyati holding a vibrant crimson bouquet in a deep emerald twilight garden",
    credentialBadges: ["BN", "RV", "AU", "AG"],
    polaroids: [
      {
        id: "p1",
        imageSrc: "/images/cahya-04.jpg",
        imageAlt: "Cahyati tossing her graduation cap into the twilight sky",
        box: [0, 0, 180.733, 166.818],
        frame: [145.391, 118.13],
        photo: [140.847, 103.364],
        rotation: -23.84,
      },
      {
        id: "p2",
        imageSrc: "/images/cahya-07.jpg",
        imageAlt: "Cahyati holding her Universitas Siliwangi diploma folder",
        box: [139, 4, 167.156, 144.431],
        frame: [148.732, 120.845],
        photo: [144.085, 105.739],
        rotation: 9.82,
      },
      {
        id: "p3",
        imageSrc: "/images/cahya-13.jpg",
        imageAlt: "Cahyati on a stone garden walkway beneath a warm glowing lantern",
        box: [45.45, 72.98, 159.781, 138.646],
        frame: [141.096, 114.64],
        photo: [136.687, 100.31],
        rotation: -10.6,
      },
      {
        id: "p4",
        imageSrc: "/images/cahya-16.jpg",
        imageAlt: "Cahyati walking joyfully along a lush garden walkway in graduation regalia",
        box: [139.45, 85.33, 151.106, 131.553],
        frame: [132.654, 107.782],
        photo: [128.509, 94.309],
        rotation: -11.23,
      },
    ],
    marqueeRows: [
      {
        id: "row-1",
        offset: -37,
        top: -9,
        tiles: [
          { id: "r1-1", imageSrc: "/images/cahya-01.jpg", imageAlt: "Cahyati holding Cahyati, S.Kom. sash at twilight" },
          { id: "r1-2", imageSrc: "/images/cahya-02.jpg", imageAlt: "Cahyati twilight burgundy graduation portrait" },
          { id: "r1-3", imageSrc: "/images/cahya-03.jpg", imageAlt: "Cahyati portrait beside slate brick wall" },
          { id: "r1-4", imageSrc: "/images/cahya-04.jpg", imageAlt: "Cahyati tossing graduation cap into blue sky" },
          { id: "r1-5", imageSrc: "/images/cahya-05.jpg", imageAlt: "Cahyati raising graduation sash skyward" },
        ],
      },
      {
        id: "row-2",
        offset: -77,
        top: 100,
        tiles: [
          { id: "r2-1", imageSrc: "/images/cahya-06.jpg", imageAlt: "Cahyati wooden mirror editorial reflection" },
          { id: "r2-2", imageSrc: "/images/cahya-07.jpg", imageAlt: "Cahyati holding diploma in lush green fields" },
          { id: "r2-3", imageSrc: "/images/cahya-08.jpg", imageAlt: "Cahyati editorial studio spotlight portrait" },
          { id: "r2-4", imageSrc: "/images/cahya-09.jpg", imageAlt: "Cahyati in toga with green fields and train" },
          { id: "r2-5", imageSrc: "/images/cahya-10.jpg", imageAlt: "Cahyati smiling with crimson graduation bouquet" },
          { id: "r2-6", imageSrc: "/images/cahya-11.jpg", imageAlt: "Cahyati outdoors with red floral bouquet" },
        ],
      },
      {
        id: "row-3",
        offset: -27,
        top: 209,
        tiles: [
          { id: "r3-1", imageSrc: "/images/cahya-12.jpg", imageAlt: "Cahyati walking joyfully along a garden path" },
          { id: "r3-2", imageSrc: "/images/cahya-13.jpg", imageAlt: "Cahyati strolling beneath a hanging garden lantern" },
          { id: "r3-3", imageSrc: "/images/cahya-14.jpg", imageAlt: "Cahyati standing beside modern brick and palms" },
          { id: "r3-4", imageSrc: "/images/cahya-15.jpg", imageAlt: "Cahyati holding bouquet in emerald twilight garden" },
          { id: "r3-5", imageSrc: "/images/cahya-16.jpg", imageAlt: "Cahyati full-length graduation garden portrait" },
        ],
      },
    ],
  },
  trackRecordHighlights: [
    {
      id: "yia-internship",
      summary:
        "Architected a QR-Code inventory and maintenance monitoring workflow covering 1,000+ Ground Support Equipment units, paired with weekly ETL reporting, commercial tenant inspections, and air cargo pipeline readiness analysis.",
      title: "PT Angkasa Pura Indonesia (YIA)",
      subtitle: "Airport Commercial Intern · Jun – Aug 2025",
      imageSrc: "/images/cahya-05.jpg",
      imageAlt: "Cahyati raising her Cahyati, S.Kom. graduation sash against a cobalt twilight sky",
      objectPosition: "center 44%",
    },
    {
      id: "academic-bnsp",
      summary:
        "Maintained a 3.92/4.00 cumulative GPA in Information Systems at Universitas Siliwangi while earning national BNSP Data Analyst certification, RevoU Tech Academy completion, and Gold Medals in Math & Chemistry Olympiads.",
      title: "BNSP Certified & 3.92 GPA",
      subtitle: "Academic Excellence & Data Credentials · 2024 – 2026",
      imageSrc: "/images/cahya-07.jpg",
      imageAlt: "Cahyati holding her Universitas Siliwangi diploma folder in full graduation regalia",
      objectPosition: "center 48%",
    },
    {
      id: "governance-mandates",
      summary:
        "Modernized administrative archives and quarterly reporting as General Secretary of BLM FT-UNSIL, supervised Creative Economy & Secretariat divisions at HMSI, and directed budgets, PR, and execution across 12 campus initiatives.",
      title: "BLM & HMSI FT-UNSIL Leadership",
      subtitle: "12 Organizational Mandates · 2023 – 2025",
      imageSrc: "/images/cahya-14.jpg",
      imageAlt: "Cahyati standing gracefully beside modern brickwork and lush greenery in burgundy kebaya",
      objectPosition: "center 44%",
    },
  ],
  galleryFrames: [
    { id: "g-01", imageSrc: "/images/cahya-01.jpg", imageAlt: "Cahyati displaying her Cahyati, S.Kom. sash at blue hour", caption: "Cahyati, S.Kom." },
    { id: "g-02", imageSrc: "/images/cahya-02.jpg", imageAlt: "Cahyati twilight indigo portrait holding golden graduation tassel", caption: "Blue Hour Portrait" },
    { id: "g-03", imageSrc: "/images/cahya-03.jpg", imageAlt: "Cahyati smiling beside textured slate wall with academic medal", caption: "Universitas Siliwangi" },
    { id: "g-04", imageSrc: "/images/cahya-04.jpg", imageAlt: "Cahyati tossing her graduation cap into a pastel twilight sky", caption: "New Chapter" },
    { id: "g-05", imageSrc: "/images/cahya-05.jpg", imageAlt: "Cahyati celebrating with her Cahyati, S.Kom. sash raised high", caption: "3.92 GPA Honors" },
    { id: "g-06", imageSrc: "/images/cahya-06.jpg", imageAlt: "Warm wooden mirror reflection of Cahyati adjusting her golden tassel", caption: "Quiet Focus" },
    { id: "g-07", imageSrc: "/images/cahya-07.jpg", imageAlt: "Cahyati holding her diploma folder in full green-trimmed toga", caption: "B.Sc. Information Systems" },
    { id: "g-08", imageSrc: "/images/cahya-08.jpg", imageAlt: "Cahyati editorial studio portrait framed by a soft circular spotlight", caption: "Studio Editorial" },
    { id: "g-09", imageSrc: "/images/cahya-10.jpg", imageAlt: "Cahyati smiling warmly with a crimson floral graduation bouquet", caption: "Celebration" },
    { id: "g-10", imageSrc: "/images/cahya-11.jpg", imageAlt: "Cahyati holding a red bouquet beside emerald fields at dusk", caption: "Tasikmalaya Dusk" },
    { id: "g-11", imageSrc: "/images/cahya-12.jpg", imageAlt: "Cahyati walking joyfully along a lush garden walkway in toga", caption: "Forward Motion" },
    { id: "g-12", imageSrc: "/images/cahya-16.jpg", imageAlt: "Full-length garden graduation portrait of Cahyati under a warm lantern", caption: "Class of 2026" },
  ],
  faqEntries: [
    {
      id: "roles",
      question: "What roles are you currently open to?",
      answer:
        "I am actively seeking full-time, graduate program, or project-based roles as a Junior Data Engineer, Data Analyst, BI Analyst, or IT Data Operations specialist where I can build reliable pipelines and reporting systems.",
    },
    {
      id: "stack",
      question: "What is your core data engineering & analytics stack?",
      answer:
        "My core toolkit includes Google BigQuery, Power BI, Looker Studio, Microsoft Excel, foundational ETL extraction/cleaning/transformation, QR-Code operational workflows, and structured visual reporting with Canva.",
    },
    {
      id: "yia-impact",
      question: "What did you deliver at PT Angkasa Pura Indonesia (YIA)?",
      answer:
        "I designed a QR-Code inventory and maintenance verification workflow for 1,000+ Ground Support Equipment units, ran weekly ETL inventory reporting, conducted Commercial Tenant SOP inspections, and produced cargo data pipeline recommendations.",
    },
    {
      id: "certifications",
      question: "Which certifications validate your qualifications?",
      answer:
        "I hold national BNSP Data Analyst certification (May 2026), RevoU Tech Academy completion, Kampus Merdeka participation, ITC training, plus Gold Medals in Math & Chemistry Olympiads and a Silver Medal at Pekan Ilmiah Andalas 2025.",
    },
    {
      id: "location",
      question: "Where are you based, and are you open to relocation?",
      answer:
        "I am based in Tasikmalaya, West Java, and fully open to relocating across Indonesia—just as I did for my internship at Yogyakarta International Airport—as well as hybrid or remote engineering teams.",
    },
  ],
  credentials: [
    {
      id: "bnsp",
      title: "BNSP Data Analyst Certification (Data Management)",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      period: "May 2026",
      shortLabel: "BNSP Data Analyst",
      category: "certification",
    },
    {
      id: "revou",
      title: "Certificate of Completion — RevoU Tech Academy",
      issuer: "PT Revolusi Cita Edukasi",
      period: "Sep – Dec 2024",
      shortLabel: "RevoU Tech Academy",
      category: "program",
    },
    {
      id: "kampus-merdeka",
      title: "Certificate of Participation — Independent Campus",
      issuer: "Independent Campus Center Executor",
      period: "Sep – Dec 2024",
      shortLabel: "Kampus Merdeka",
      category: "program",
    },
    {
      id: "itc",
      title: "Certificate of Training — ITC (International Test Center)",
      issuer: "ITC (International Test Center)",
      period: "Dec 2024",
      shortLabel: "ITC Training",
      category: "certification",
    },
    {
      id: "andalas-silver",
      title: "Pekan Ilmiah Andalas — Silver Medalist (Environment & Energy)",
      issuer: "HIMAPOL UNAND",
      period: "May 2025",
      shortLabel: "Silver · Andalas",
      category: "award",
    },
    {
      id: "math-gold",
      title: "Math Olympiad — Gold Medalist Award",
      issuer: "Braindicator The Best Partner For Victory",
      period: "Aug 2024",
      shortLabel: "Gold · Math",
      category: "award",
    },
    {
      id: "chem-gold",
      title: "Chemistry Olympiad — Gold Medalist Award",
      issuer: "PUSKANTARA",
      period: "Sep 2024",
      shortLabel: "Gold · Chemistry",
      category: "award",
    },
  ],
  leadershipMandates: [
    {
      role: "General Secretary (Sekretaris Umum)",
      organization: "BLM FT-UNSIL",
      period: "Mar – Dec 2025",
      impact: "Reformed institutional administration, recorded internal and ORMAWA meetings, maintained archives, and delivered quarterly reports.",
    },
    {
      role: "Head of Household Affairs Department",
      organization: "HMSI FT-UNSIL",
      period: "Jun 2023 – Dec 2024",
      impact: "Supervised Creative Economy and Secretariat divisions with structured inter-division coordination.",
    },
    {
      role: "Event Operations Staff",
      organization: "Sivolution Festival 2.0 HMSI FT-UNSIL",
      period: "Sep – Nov 2024",
      impact: "Built competition rundowns, coordinated speakers, talent, and vendors, and evaluated post-event execution.",
    },
    {
      role: "Public Relations Coordinator",
      organization: "SMART 2024 HMSI FT-UNSIL",
      period: "Sep – Nov 2024",
      impact: "Distributed official correspondence, coordinated external stakeholders, and managed participant communications.",
    },
    {
      role: "Public Relations Coordinator",
      organization: "Kelas PKM HMSI FT-UNSIL",
      period: "Sep – Oct 2024",
      impact: "Coordinated with Marikator and led program outreach to participants and external parties.",
    },
    {
      role: "Treasurer (Bendahara)",
      organization: "OMBUS SI HMSI FT-UNSIL",
      period: "Aug 2024",
      impact: "Prepared event RAB budgets, archived transactions, and published final financial accountability reports.",
    },
    {
      role: "Secretary",
      organization: "Organization Training HMSI FT-UNSIL",
      period: "May – Jun 2024",
      impact: "Authored and archived proposals, attendance logs, correspondence, and final completion reports.",
    },
    {
      role: "Fundraising & Sponsorship Division",
      organization: "Kopma Expo 2023 Universitas Siliwangi",
      period: "Nov 2023",
      impact: "Set revenue targets, marketed products, and coordinated external sponsorship partnerships.",
    },
    {
      role: "Event Division Staff & MC",
      organization: "MABIM HMSI FT-UNSIL",
      period: "Oct – Nov 2023",
      impact: "Hosted opening-to-closing sessions as MC, managed participant flow, and synchronized cross-division event execution.",
    },
    {
      role: "Event Division",
      organization: "Graphic Design Training CSG JDCOM Kopma Unsil",
      period: "Oct 2023",
      impact: "Designed the event concept and coordinated end-to-end execution to maintain a smooth, conducive program.",
    },
    {
      role: "Fundraising & Sponsorship Division",
      organization: "DIKSARKOP 2023 Kopma Unsil",
      period: "Sep 2023",
      impact: "Managed fundraising targets, product marketing, and sponsorship outreach for member onboarding.",
    },
    {
      role: "Journalist Division",
      organization: "CSG JDCOM Kopma Unsil",
      period: "Mar – Nov 2023",
      impact: "Led JD. Expression editorial reporting and coverage across CSG programs and flagship KOPMA UNSIL events.",
    },
  ],
};

export function getPortfolioSnapshot(): PortfolioSnapshot {
  return SNAPSHOT;
}

export function formatIndexTag(zeroBasedIndex: number): string {
  const num = zeroBasedIndex + 1;
  return `{${String(num).padStart(2, "0")}}`;
}
