---
status: accepted
---

# Scaled 1440px Desktop Stage with Fluid Mobile Breakpoint

Desktop viewports (`>= 1024px`) render each editorial section inside a unified 1440px proportional stage scaled to viewport width (capped at `1.2×` / `1728px` and centered horizontally inside full-bleed section surfaces on ultrawide monitors), while viewports below `1024px` switch to native fluid CSS grids. This preserves the exact editorial negative space, staggered card geometry, and asymmetric bento proportions recovered from the Capture reference template without breaking legibility on phones, tablets, or ultrawide displays.

## Considered Options

- **Pure fluid CSS grid everywhere**: Simplifies container math, but causes staggered absolute editorial compositions (Hero crosshairs, overlapping Polaroid cluster, Projects vertical rhythm) to drift across desktop aspect ratios.
- **Per-section duplicated viewport listeners (as found in the reverse-engineered bundle)**: Rejected because duplicating `ResizeObserver` and scale math across 11 sections violates locality and creates drift between sections.

## Consequences

All proportional scaling, stage height observation, and reduced-motion detection live behind one shared viewport/stage module rather than inside individual sections.
