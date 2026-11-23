import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  computeDesktopStage,
  DESIGN_WIDTH,
  DESKTOP_BREAKPOINT,
} from "../domain/stage";

function readViewportWidth(): number {
  if (typeof document === "undefined") return DESIGN_WIDTH;
  return document.documentElement.clientWidth || window.innerWidth || DESIGN_WIDTH;
}

function readViewportHeight(): number {
  if (typeof window === "undefined") return 900;
  return window.innerHeight || 900;
}

export function useViewportWidth(): number {
  const [width, setWidth] = useState<number>(readViewportWidth);

  useEffect(() => {
    const update = () => setWidth(readViewportWidth());
    update();
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return width;
}

export function useViewportHeight(): number {
  const [height, setHeight] = useState<number>(readViewportHeight);

  useEffect(() => {
    const update = () => setHeight(readViewportHeight());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function StageShell({
  desktop,
  mobile,
}: {
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  const width = useViewportWidth();
  return (
    <div className="font-['Manrope',sans-serif] text-[#0f172a] antialiased">
      {width >= DESKTOP_BREAKPOINT ? desktop : mobile}
    </div>
  );
}

export function ScaledStage({
  id,
  height,
  className = "",
  as = "section",
  children,
}: {
  id?: string;
  height: number;
  className?: string;
  as?: "section" | "footer";
  children: ReactNode;
}) {
  const width = useViewportWidth();
  const { scale } = computeDesktopStage(width, height);
  const innerRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number>(height);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setMeasuredHeight(Math.max(height, el.offsetHeight));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [height]);

  const Tag = as;

  return (
    <Tag
      id={id}
      className={`relative w-full overflow-hidden scroll-mt-[84px] ${className}`}
      style={{ height: measuredHeight * scale }}
    >
      <div
        ref={innerRef}
        className="absolute left-1/2 top-0"
        style={{
          width: DESIGN_WIDTH,
          minHeight: height,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </Tag>
  );
}

export function absBox(
  left: number,
  top: number,
  width?: number,
  height?: number,
): CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
  };
}
