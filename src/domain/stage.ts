export const DESIGN_WIDTH = 1440;
export const DESKTOP_BREAKPOINT = 1024;
export const MAX_DESKTOP_SCALE = 1.2;
export const HERO_FRAME_INSET = 30;
export const HERO_INNER_WIDTH = 1380;
export const CAROUSEL_WIDTH = 1670;
export const CAROUSEL_PAIR_ANGLES = [90, 120, 150, 0, 30, 60] as const;

export interface DesktopStageMetrics {
  readonly isDesktop: boolean;
  readonly scale: number;
  readonly scaledHeight: number;
}

export interface HeroStageMetrics {
  readonly scale: number;
  readonly frameHeight: number;
  readonly innerHeight: number;
  readonly contentTop: number;
}

export interface CarouselMotionState {
  readonly angle: number;
  readonly velocity: number;
  readonly isDragging: boolean;
}

export function computeDesktopStage(
  viewportWidth: number,
  designHeight: number,
): DesktopStageMetrics {
  const safeWidth = Math.max(320, viewportWidth);
  const scale = Math.min(safeWidth / DESIGN_WIDTH, MAX_DESKTOP_SCALE);
  return {
    isDesktop: safeWidth >= DESKTOP_BREAKPOINT,
    scale,
    scaledHeight: designHeight * scale,
  };
}

export function computeHeroStage(
  viewportWidth: number,
  viewportHeight: number,
): HeroStageMetrics {
  const safeWidth = Math.max(DESKTOP_BREAKPOINT, viewportWidth);
  const safeHeight = Math.max(400, viewportHeight);
  const scale = Math.min(
    (safeWidth - 2 * HERO_FRAME_INSET) / HERO_INNER_WIDTH,
    MAX_DESKTOP_SCALE,
  );
  const frameHeight = Math.max(600 * scale, safeHeight - 2 * HERO_FRAME_INSET);
  const innerHeight = frameHeight / scale;
  const contentTop = innerHeight - 800 + 359;

  return {
    scale,
    frameHeight,
    innerHeight,
    contentTop,
  };
}

export function stepCarouselFrame(
  state: CarouselMotionState,
  deltaTimeMs: number,
  reducedMotion: boolean,
): CarouselMotionState {
  if (state.isDragging) {
    return state;
  }

  const dt = Math.min(64, Math.max(0, deltaTimeMs)) / 16.667;
  const velocity = state.velocity * Math.pow(0.94, dt);
  const drift = reducedMotion ? 0 : 0.035 * dt;
  const angle = state.angle + velocity * dt + drift;

  return {
    angle,
    velocity,
    isDragging: false,
  };
}

export function applyCarouselDrag(
  state: CarouselMotionState,
  deltaPx: number,
  viewportScale: number,
  deltaTimeMs: number,
): CarouselMotionState {
  const safeScale = Math.max(0.1, viewportScale);
  const deltaAngle = (deltaPx / safeScale) * 0.12;
  const normalizedDt = Math.max(1, deltaTimeMs / 16);

  return {
    angle: state.angle + deltaAngle,
    velocity: deltaAngle / normalizedDt,
    isDragging: true,
  };
}

export function cycleIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return (((current + delta) % total) + total) % total;
}
