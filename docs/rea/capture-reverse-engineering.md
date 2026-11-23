# REA Dossier — Jiro Capture Portfolio Template

Evidence-based reverse-engineering record of `https://jiro.build/templates/portfolio/photography-portfolio-landing-page-capture` and its live preview iframe `/preview/template/portfolio/photography-portfolio-landing-page-capture`.

## 1. Recovered Module Graph (Turbopack Manifest)

Entry composition (`108497` / `index.tsx` -> `0r17c4.r7a2r~.js`) renders 11 sections in exact top-to-bottom sequence:

| Order | Source Module | Turbopack ID | Section Role | Background |
|------:|---------------|-------------:|--------------|------------|
| 1 | `Hero.tsx` | `116196` | 6-bar shutter preloader, floating pill nav, framed hero (`30px` inset, `24px` radius), 5 `+` marks, wordmark, bio, avatar stack, floating dark card | `#f1f1f1` frame / dark media |
| 2 | `About.tsx` | `281434` | Aperture label, editorial Playfair-accented quote, `470×410` feature photo + action trigger, bio copy, underline CTA, 5 institutional logos / mobile marquee | `#f1f1f1` |
| 3 | `Projects.tsx` | `461460` | 60s rotating watermark SVG behind 5 staggered editorial cards + centered Playfair heading + pill CTA | `#f1f1f1` |
| 4 | `Services.tsx` | `667813` | Interactive `{01}`–`{05}` hover/focus/click capability list with white underline sweep + crossfading preview & copy | `#010101` |
| 5 | `WhyChooseMe.tsx` | `700978` | Asymmetric bento grid: metric card + 4-Polaroid hover fan cluster, 3-row alternating marquee, tall social portrait card, viewfinder-framed card, metric + stack card, big stat card, tactile detail card | `#f1f1f1` |
| 6 | `Faq.tsx` | `913359` | Left label, right heading + CTA, 5 white accordion cards (`grid-template-rows: 0fr -> 1fr`, `+` rotating `135deg`) | `#f1f1f1` |
| 7 | `Testimonial.tsx` | `174117` | 3-slide split showcase: left white card with 5 marks + crossfade copy + `{01}` counter, right crossfade image + glass prev/next buttons | `#f1f1f1` |
| 8 | `Gallery.tsx` | `40222` | Interactive 3D perspective cylinder (`perspective: 500`, 7 angles × 2 opposing cards = 14 frames), pointer drag + velocity inertia (`0.94^dt`), gentle auto-spin (`0.035 deg/frame`), floating `"Drag to view"` glass pill | `#f1f1f1` |
| 9 | `ContactForm.tsx` | `192166` | Centered portrait header, Playfair heading, white form card with direct `mailto:` link, Name/Email/Message validation, sliding-fill submit pill, confirmation state | `#f1f1f1` |
| 10 | `Tagline.tsx` | `808199` | Giant `120px` continuous horizontal marquee statement with Playfair italic `#a8a8a8` accent word | `#f1f1f1` |
| 11 | `Footer.tsx` | `500582` | Closing headline, Email / Call / Social circular pills, divider `#2c323b`, menu + copyright, giant `354.7px` wordmark with per-letter Web Animations hover wave + real-time Canvas-generated SVG RGB chromatic displacement glass prism (`feDisplacementMap` × 3 channels screened) | `#010101` |

## 2. Recovered Design System Tokens

- **Typography**:
  - Primary UI & Editorial Sans: `Manrope` (weights 400, 500, 600), tight negative display tracking (`-2.16px` at `54px`, `-5.6px` at `80px`, `-7.2px` at `120px`)
  - Editorial Italic Accent: `Playfair Display` italic 400 (`70px` desktop / `40px–60px` responsive)
  - Wordmark Display: `Inter` (weights 400, 500, 600; giant footer wordmark `354.711px`, `-24.8322px` tracking)
- **Color Palette**:
  - Light Surface: `#f1f1f1`
  - Elevated Card Surface: `#ffffff`
  - Dark Surface / Shutter / Nav Pill: `#010101` (refraction band `#080808`)
  - Primary Ink (Light): `#030303` / `#040404` / `#080808`
  - Secondary Ink (Light): `#444444`, Muted Counter: `#a8a8a8`, Hairline Border: `#e2e2e2` / `#ececec`
  - Primary Ink (Dark): `#f2f2f2` / `#ffffff`, Muted Ink (Dark): `#767676`, Dark Divider: `#444444` / `#2c323b`
- **Motion Language**:
  - Primary Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Scroll Reveal: `opacity: 0 -> 1`, `translateY(64px) scale(0.96) -> none`, `blur(12px) -> none`, `1100ms`, `IntersectionObserver` threshold `0.15`, disabled cleanly under `prefers-reduced-motion: reduce`.
  - Preloader: 6 vertical bars lifting with `transformOrigin: "50% -15.6%"`, `scaleY(1 -> 0)`, `580ms`, `105ms` stagger, preceded by rolling character slot reels (`36ms` stagger).
  - Pill CTA: Dual stacked label vertical shift (`-translate-y-full`) paired with horizontal rounded fill sweep (`-translate-x-[101%] -> 0`).

## 3. Adaptation to Cahyati (`CV ATS Cahyati_Update.docx`)

- **Wordmark Symmetry**: `capture®` (7 letters + `®`) maps directly to `cahyati®` (7 letters + `®`), preserving exact preloader reel cadence and giant footer refraction width.
- **Authentic Data Only**: Every biography line, internship project (PT Angkasa Pura Indonesia YIA GSE 1,000+ QR-Code & ETL), academic metric (`3.92 / 4.00`, Universitas Siliwangi S1 Sistem Informasi), tool (`Google BigQuery`, `Power BI`, `Looker Studio`, `Microsoft Excel`, `Canva`), certification (7 verified entries including `BNSP Data Analyst` & `RevoU Tech Academy`), and leadership mandate (`BLM FT-UNSIL`, `HMSI FT-UNSIL`, `Kopma Unsil`) is sourced verbatim from the CV.
- **Refactored Deep Architecture**: Replaces Capture's 11-way copy-pasted utility hooks with deep, tested modules (`src/domain/`, `src/primitives/`, `src/sections/`).
