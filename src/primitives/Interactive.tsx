import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "./Stage";

export function PillButton({
  label,
  href = "#book",
  bg = "#ffffff",
  color = "#030303",
  fill = "#030303",
  textClass = "text-[16px] leading-[22px] h-[22px]",
  className = "",
  style,
  onClick,
}: {
  label: string;
  href?: string;
  bg?: string;
  color?: string;
  fill?: string;
  textClass?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-[999px] px-[28px] py-[10px] font-medium transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] active:scale-[0.96] ${className}`}
      style={{ ...style, background: bg, color }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-[101%] rounded-[999px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
        style={{ background: fill }}
      />
      <span className={`relative block overflow-hidden ${textClass}`}>
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="absolute left-0 top-full block text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {label}
        </span>
      </span>
    </a>
  );
}

export function MonogramStack({
  items,
  tone = "dark",
}: {
  items: readonly string[];
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-center">
      {items.map((label, idx) => (
        <div
          key={label}
          className={`relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-solid text-[12px] font-semibold tracking-[-0.04em] transition-transform duration-300 hover:z-10 hover:-translate-y-[4px] ${
            tone === "dark"
              ? "border-white/90 bg-[#141414] text-[#f2f2f2] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.75)]"
              : "border-white bg-[#111111] text-[#f2f2f2] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.28)]"
          }`}
          style={{
            marginRight: idx < items.length - 1 ? -14 : 0,
            backgroundImage:
              idx % 2 === 0
                ? "radial-gradient(circle at 30% 25%, #2b2b2b, #0c0c0c)"
                : "radial-gradient(circle at 30% 25%, #3a3a3a, #141414)",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function useDisplacementMapDataUrl(): string {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 4;
      canvas.height = 173;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const maxAmplitude = 33.92;
      for (let y = 0; y < 173; y++) {
        const distTop = y + 0.5;
        const distBottom = 173 - y - 0.5;
        let offset = 0;
        if (distTop < 32) {
          offset += maxAmplitude * (1 - distTop / 32) ** 4;
        }
        if (distBottom < 32) {
          offset -= maxAmplitude * (1 - distBottom / 32) ** 4;
        }
        const gChannel = Math.round(128 + (offset / (2 * maxAmplitude)) * 255);
        ctx.fillStyle = `rgb(128,${Math.max(0, Math.min(255, gChannel))},128)`;
        ctx.fillRect(0, y, 4, 1);
      }

      setDataUrl(canvas.toDataURL());
    } catch {
      // jsdom or restricted canvas environment: skip displacement filter gracefully
    }
  }, []);

  return dataUrl;
}

function WordmarkLine({
  letters,
  shown,
  onLetterHover,
  style,
}: {
  letters: readonly string[];
  shown: boolean;
  onLetterHover?: (index: number) => void;
  style?: CSSProperties;
}) {
  const reducedMotion = useReducedMotion();
  const visible = reducedMotion || shown;

  return (
    <p
      aria-hidden="true"
      className="font-wordmark absolute select-none whitespace-nowrap text-[354.711px] font-medium leading-[319.264px] tracking-[-24.8322px] text-white"
      style={{ left: 40, top: 0, ...style }}
    >
      {letters.map((glyph, index) => (
        <span
          key={`${glyph}-${index}`}
          data-letter={index}
          onMouseEnter={onLetterHover ? () => onLetterHover(index) : undefined}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(45%) rotate(6deg)",
            transition: reducedMotion
              ? undefined
              : `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${90 * index}ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${90 * index}ms`,
          }}
        >
          {glyph}
        </span>
      ))}
    </p>
  );
}

export function RefractiveWordmark({
  letters,
}: {
  letters: readonly string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mapUrl = useDisplacementMapDataUrl();
  const rawId = useId();
  const filterId = `glass-${rawId.replace(/:/g, "")}`;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setShown(entry.isIntersecting);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const triggerLetterWave = (letterIndex: number) => {
    if (reducedMotion || !rootRef.current) return;
    const nodes = rootRef.current.querySelectorAll<HTMLElement>(
      `[data-letter="${letterIndex}"]`,
    );
    nodes.forEach((node) => {
      if (typeof node.animate !== "function") return;
      const alreadyRunning = node
        .getAnimations?.()
        .some((anim) => anim.id === "wave");
      if (alreadyRunning) return;

      const anim = node.animate(
        [
          { transform: "translateY(0) rotate(0deg)" },
          { transform: "translateY(-16%) rotate(-4deg)", offset: 0.35 },
          { transform: "translateY(4%) rotate(2deg)", offset: 0.7 },
          { transform: "translateY(0) rotate(0deg)" },
        ],
        {
          duration: 900,
          easing: "cubic-bezier(0.37, 0, 0.25, 1)",
          composite: "add",
        },
      );
      anim.id = "wave";
    });
  };

  const baseScale = 67.84;

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden"
      style={{ width: 1440, height: 313.6 }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter
          id={filterId}
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          {mapUrl && (
            <feImage
              href={mapUrl}
              x="0"
              y="0"
              width="1440"
              height="173"
              preserveAspectRatio="none"
              result="map"
            />
          )}
          {[0, 1, 2].map((channel) => (
            <feDisplacementMap
              key={channel}
              in="SourceGraphic"
              in2="map"
              scale={baseScale * (1 + (2 - channel) * 0.15)}
              xChannelSelector="R"
              yChannelSelector="G"
              result={`d${channel}`}
            />
          ))}
          <feColorMatrix
            in="d0"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="r"
          />
          <feColorMatrix
            in="d1"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="g"
          />
          <feColorMatrix
            in="d2"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="b"
          />
          <feBlend in="r" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="b" mode="screen" />
        </filter>
      </svg>

      <WordmarkLine
        letters={letters}
        shown={shown}
        onLetterHover={triggerLetterWave}
      />

      <div
        className="pointer-events-none absolute overflow-hidden bg-[#080808]"
        style={{
          left: 10,
          top: 140.6,
          width: 1440,
          height: 173,
          filter: mapUrl ? `url(#${filterId})` : undefined,
        }}
      >
        <WordmarkLine
          letters={letters}
          shown={shown}
          style={{ left: 30, top: -140.6 }}
        />
      </div>
    </div>
  );
}
