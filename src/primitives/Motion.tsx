import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "./Stage";

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, visible]);

  const isShown = reducedMotion || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isShown ? 1 : 0,
        transform: isShown ? "none" : "translateY(64px) scale(0.96)",
        filter: isShown ? "none" : "blur(12px)",
        transition: reducedMotion
          ? undefined
          : `opacity 850ms ${EASE_OUT_EXPO} ${delay}ms, transform 850ms ${EASE_OUT_EXPO} ${delay}ms, filter 850ms ${EASE_OUT_EXPO} ${delay}ms`,
        willChange: isShown ? undefined : "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

export function Marquee({
  children,
  copies = 3,
  duration = 30000,
  reverse = false,
  className = "",
  style,
}: {
  children: ReactNode;
  copies?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reducedMotion || typeof el.animate !== "function") return;

    const animation = el.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${100 / copies}%)` },
      ],
      {
        duration,
        iterations: Infinity,
        direction: reverse ? "reverse" : "normal",
      },
    );

    const onEnter = () => animation.pause();
    const onLeave = () => animation.play();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      animation.cancel();
    };
  }, [copies, duration, reverse, reducedMotion]);

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: copies }, (_, idx) => (
          <div
            key={idx}
            className="flex shrink-0"
            aria-hidden={idx > 0 || undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
