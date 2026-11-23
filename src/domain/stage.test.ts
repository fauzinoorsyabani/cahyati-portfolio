import { describe, expect, it } from "vitest";
import {
  applyCarouselDrag,
  computeDesktopStage,
  computeHeroStage,
  cycleIndex,
  DESKTOP_BREAKPOINT,
  stepCarouselFrame,
} from "./stage";

describe("Stage scaling and 3D carousel physics seam", () => {
  it("computes exact proportional desktop stage dimensions at 1440px and 1024px", () => {
    expect(computeDesktopStage(1440, 1022)).toEqual({
      isDesktop: true,
      scale: 1,
      scaledHeight: 1022,
    });

    const halfWide = computeDesktopStage(DESKTOP_BREAKPOINT, 1000);
    expect(halfWide.isDesktop).toBe(true);
    expect(halfWide.scale).toBeCloseTo(1024 / 1440, 6);
    expect(halfWide.scaledHeight).toBeCloseTo((1024 / 1440) * 1000, 4);

    const tablet = computeDesktopStage(DESKTOP_BREAKPOINT - 1, 1000);
    expect(tablet.isDesktop).toBe(false);
  });

  it("clamps hero inner height to at least 600 * scale on short viewports", () => {
    const standard = computeHeroStage(1440, 900);
    expect(standard.scale).toBe(1);
    expect(standard.frameHeight).toBe(840);
    expect(standard.innerHeight).toBe(840);
    expect(standard.contentTop).toBe(399);

    const shortViewport = computeHeroStage(1440, 500);
    expect(shortViewport.frameHeight).toBe(600);
    expect(shortViewport.innerHeight).toBe(600);
    expect(shortViewport.contentTop).toBe(159);
  });

  it("advances 3D cylinder carousel with inertia decay and halts auto-spin under reduced motion", () => {
    const moving = stepCarouselFrame({ angle: 10, velocity: 2, isDragging: false }, 16.667, false);
    expect(moving.angle).toBeCloseTo(10 + 2 * 0.94 + 0.035, 3);
    expect(moving.velocity).toBeCloseTo(2 * 0.94, 4);

    const reduced = stepCarouselFrame({ angle: 10, velocity: 0, isDragging: false }, 16.667, true);
    expect(reduced.angle).toBe(10);
    expect(reduced.velocity).toBe(0);

    const dragging = stepCarouselFrame({ angle: 10, velocity: 2, isDragging: true }, 16.667, false);
    expect(dragging.angle).toBe(10);
  });

  it("updates carousel angle and velocity smoothly on pointer drag", () => {
    const next = applyCarouselDrag({ angle: 0, velocity: 0, isDragging: true }, 100, 1, 16);
    expect(next.angle).toBeCloseTo(12, 4);
    expect(next.velocity).toBeCloseTo(12, 4);
  });

  it("wraps cyclic carousel indices cleanly in both directions", () => {
    expect(cycleIndex(0, -1, 3)).toBe(2);
    expect(cycleIndex(2, 1, 3)).toBe(0);
    expect(cycleIndex(1, 1, 3)).toBe(2);
    expect(cycleIndex(0, 1, 0)).toBe(0);
  });
});
