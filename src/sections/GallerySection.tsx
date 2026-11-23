import { useEffect, useRef, useState } from "react";
import type { GalleryFrame } from "../domain/portfolio";
import {
  applyCarouselDrag,
  CAROUSEL_PAIR_ANGLES,
  CAROUSEL_WIDTH,
  type CarouselMotionState,
  stepCarouselFrame,
} from "../domain/stage";
import { Reveal } from "../primitives/Motion";
import {
  ScaledStage,
  StageShell,
  useReducedMotion,
  useViewportWidth,
} from "../primitives/Stage";

function CylinderCarousel({ frames }: { frames: readonly GalleryFrame[] }) {
  const rotorRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<CarouselMotionState>({
    angle: 0,
    velocity: 0,
    isDragging: false,
  });
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let lastX = 0;
    let lastPointerTime = 0;
    let rafId = 0;
    let lastTick = performance.now();
    let inView = true;

    const syncRotor = () => {
      if (rotorRef.current) {
        rotorRef.current.style.transform = `rotateY(${motionRef.current.angle}deg)`;
      }
    };

    const tick = (now: number) => {
      const dt = now - lastTick;
      lastTick = now;

      if (inView) {
        motionRef.current = stepCarouselFrame(
          motionRef.current,
          dt,
          reducedMotion,
        );
        syncRotor();
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry) inView = entry.isIntersecting;
    });
    observer.observe(stage);

    const onPointerDown = (event: PointerEvent) => {
      motionRef.current = {
        ...motionRef.current,
        velocity: 0,
        isDragging: true,
      };
      setDragging(true);
      lastX = event.clientX;
      lastPointerTime = performance.now();
      stage.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const stageScale = rect.width > 0 ? rect.width / CAROUSEL_WIDTH : 1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${(event.clientX - rect.left) / stageScale}px, ${(event.clientY - rect.top) / stageScale}px) translate(-50%, -50%)`;
      }

      if (!motionRef.current.isDragging) return;
      const now = performance.now();
      motionRef.current = applyCarouselDrag(
        motionRef.current,
        event.clientX - lastX,
        stageScale,
        now - lastPointerTime,
      );
      lastX = event.clientX;
      lastPointerTime = now;
      syncRotor();
    };

    const onPointerUp = () => {
      if (!motionRef.current.isDragging) return;
      motionRef.current = { ...motionRef.current, isDragging: false };
      setDragging(false);
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={stageRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`relative select-none touch-pan-y ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ width: CAROUSEL_WIDTH, height: 640 }}
    >
      <div
        className="absolute"
        style={{
          left: 115,
          top: 200,
          width: 1440,
          height: 240,
          perspective: 500,
          perspectiveOrigin: "720px 120px",
        }}
      >
        <div
          ref={rotorRef}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "720px 120px",
          }}
        >
          {CAROUSEL_PAIR_ANGLES.map((angle, pairIdx) => (
            <div
              key={angle}
              className="absolute"
              style={{
                left: 20,
                top: 0,
                width: 1400,
                height: 240,
                transformStyle: "preserve-3d",
                transformOrigin: "700px 120px",
                transform: `rotateY(${angle}deg)`,
              }}
            >
              {[0, 1].map((side) => {
                const frame = frames[2 * pairIdx + side];
                if (!frame) return null;
                return (
                  <div
                    key={frame.id}
                    className="absolute overflow-hidden rounded-[20px] bg-[#e4e4e4]"
                    style={{
                      left: side === 0 ? 0 : 1140,
                      top: -65,
                      width: 260,
                      height: 370,
                      transform: `rotateY(${side === 0 ? 90 : -90}deg)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={frame.imageSrc}
                      alt={frame.imageAlt}
                      draggable={false}
                      loading="lazy"
                      className="pointer-events-none h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-10"
        style={{
          transform: "translate(1085px, 320px) translate(-50%, -50%)",
        }}
      >
        <div
          className="whitespace-nowrap rounded-[999px] bg-[rgba(255,255,255,0.78)] px-[20px] py-[11px] text-[18px] font-medium leading-[24px] tracking-[-0.18px] text-[#030303] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[6px] transition-[opacity,transform] duration-300"
          style={{
            opacity: hovered && !dragging ? 1 : 0,
            transform: hovered && !dragging ? "scale(1)" : "scale(0.85)",
          }}
        >
          Drag to view
        </div>
      </div>
    </div>
  );
}

export function GallerySection({
  frames,
}: {
  frames: readonly GalleryFrame[];
}) {
  const viewportWidth = useViewportWidth();
  const mobileScale = Math.max(viewportWidth / CAROUSEL_WIDTH, 0.42);

  const desktop = (
    <ScaledStage id="gallery" height={585} className="bg-[#f1f1f1]">
      <Reveal
        style={{
          position: "absolute",
          left: 94,
          top: 52,
          width: 1252.5,
          height: 480,
        }}
      >
        <div
          style={{
            transform: "scale(0.75)",
            transformOrigin: "top left",
            width: CAROUSEL_WIDTH,
            height: 640,
          }}
        >
          <CylinderCarousel frames={frames} />
        </div>
      </Reveal>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#f1f1f1] py-[24px] md:py-[48px]"
    >
      <Reveal>
        <div className="relative" style={{ height: 440 * mobileScale }}>
          <div
            className="absolute left-1/2 top-0"
            style={{
              width: CAROUSEL_WIDTH,
              height: 640,
              transform: `translate(-50%, ${-100 * mobileScale}px) scale(${mobileScale})`,
              transformOrigin: "top center",
            }}
          >
            <CylinderCarousel frames={frames} />
          </div>
        </div>
      </Reveal>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
