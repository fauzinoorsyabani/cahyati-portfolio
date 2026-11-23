import { type ReactNode, useState } from "react";
import { formatIndexTag, type TrackRecordHighlight } from "../domain/portfolio";
import { cycleIndex } from "../domain/stage";
import {
  ArrowRightIcon,
  NodeApertureIcon,
  StarRowIcon,
} from "../primitives/Icons";
import { PillButton } from "../primitives/Interactive";
import { Reveal } from "../primitives/Motion";
import { absBox, ScaledStage, StageShell } from "../primitives/Stage";

function SectionLabel() {
  return (
    <div className="flex items-center gap-[6px]">
      <NodeApertureIcon className="h-[22px] w-[22px] text-[#030303] transition-transform duration-700 hover:rotate-180" />
      <p className="whitespace-nowrap text-[20px] leading-[30px] tracking-[-0.2px] text-[#444]">
        Track Record
      </p>
    </div>
  );
}

function Heading({ big }: { big: boolean }) {
  return big ? (
    <h2 className="h-[146px] w-[420px] text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#030303]">
      Proven results{" "}
      <span className="font-editorial text-[70px] leading-[80px] tracking-[-2.8px]">
        in practice
      </span>
    </h2>
  ) : (
    <h2 className="text-[32px] font-semibold leading-[40px] tracking-[-1.28px] text-[#030303] md:text-[48px] md:leading-[58px]">
      Proven results{" "}
      <span className="font-editorial text-[40px] leading-[40px] tracking-[-1.6px] md:text-[60px] md:leading-[68px]">
        in practice
      </span>
    </h2>
  );
}

function CrossfadeStack({
  highlights,
  activeIndex,
  renderItem,
}: {
  highlights: readonly TrackRecordHighlight[];
  activeIndex: number;
  renderItem: (item: TrackRecordHighlight, idx: number) => ReactNode;
}) {
  return (
    <div className="grid">
      {highlights.map((item, idx) => (
        <div
          key={item.id}
          aria-hidden={idx !== activeIndex}
          className="[grid-area:1/1]"
          style={{
            opacity: idx === activeIndex ? 1 : 0,
            transform: idx === activeIndex ? "none" : "translateY(12px)",
            transition:
              "opacity 600ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: idx === activeIndex ? "auto" : "none",
          }}
        >
          {renderItem(item, idx)}
        </div>
      ))}
    </div>
  );
}

function HighlightCard({
  highlights,
  activeIndex,
  big,
}: {
  highlights: readonly TrackRecordHighlight[];
  activeIndex: number;
  big: boolean;
}) {
  return (
    <div
      className={`flex h-[469px] flex-col justify-between rounded-[16px] bg-white p-[30px] ${
        big ? "w-[470px]" : "w-full"
      }`}
    >
      <div className="flex flex-col gap-[21px]">
        <StarRowIcon className="h-[14px] w-[82px]" />
        <CrossfadeStack
          highlights={highlights}
          activeIndex={activeIndex}
          renderItem={(item) => (
            <p className="text-[20px] font-semibold leading-[30px] tracking-[-0.2px] text-[#3d4858]">
              {item.summary}
            </p>
          )}
        />
      </div>

      <div className="flex items-start justify-between gap-[16px]">
        <div className={`flex-1 ${big ? "max-w-[330px]" : ""}`}>
          <CrossfadeStack
            highlights={highlights}
            activeIndex={activeIndex}
            renderItem={(item) => (
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-semibold leading-[28px] tracking-[-0.18px] text-[#030303]">
                  {item.title}
                </p>
                <p className="text-[16px] leading-[22px] tracking-[-0.16px] text-[#505e71]">
                  {item.subtitle}
                </p>
              </div>
            )}
          />
        </div>
        <p
          data-testid="active-highlight-index"
          className="whitespace-nowrap text-[20px] leading-[30px] tracking-[-0.2px] text-[#a8a8a8]"
        >
          {formatIndexTag(activeIndex)}
        </p>
      </div>
    </div>
  );
}

function ArrowControl({
  dir,
  onClick,
  small,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  small: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous highlight" : "Next highlight"}
      onClick={onClick}
      className={`group flex cursor-pointer items-center justify-center bg-[rgba(255,255,255,0.65)] text-[#030303] backdrop-blur-[4px] transition-[background-color,transform] duration-300 hover:bg-[rgba(255,255,255,0.92)] active:scale-95 ${
        small
          ? "h-[32px] w-[36px] rounded-[6px]"
          : "h-[44px] w-[49px] rounded-[8px]"
      }`}
    >
      <ArrowRightIcon
        className={`transition-transform duration-300 ${
          small ? "h-[16px] w-[16px]" : "h-[24px] w-[24px]"
        } ${
          dir === "prev"
            ? "rotate-180 group-hover:-translate-x-[3px]"
            : "group-hover:translate-x-[3px]"
        }`}
      />
    </button>
  );
}

function HighlightVisual({
  highlights,
  activeIndex,
  className = "",
}: {
  highlights: readonly TrackRecordHighlight[];
  activeIndex: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] bg-[#dcdcdc] ${className}`}
    >
      {highlights.map((item, idx) => (
        <img
          key={item.id}
          src={item.imageSrc}
          alt={item.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: item.objectPosition,
            opacity: idx === activeIndex ? 1 : 0,
            transform: idx === activeIndex ? "scale(1)" : "scale(1.06)",
            transition:
              "opacity 800ms ease, transform 1400ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
    </div>
  );
}

export function TrackRecordSection({
  highlights,
}: {
  highlights: readonly TrackRecordHighlight[];
}) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => cycleIndex(i, -1, highlights.length));
  const next = () => setIndex((i) => cycleIndex(i, 1, highlights.length));

  const desktop = (
    <ScaledStage id="testimonials" height={895} className="bg-[#f1f1f1]">
      <Reveal style={absBox(135, 120)}>
        <SectionLabel />
      </Reveal>

      <Reveal delay={200} style={absBox(536, 120)}>
        <Heading big />
      </Reveal>

      <Reveal delay={300} style={absBox(1177, 120)}>
        <PillButton label="Let’s chat" href="#book" />
      </Reveal>

      <Reveal delay={100} style={absBox(135, 306, 470, 469)}>
        <HighlightCard highlights={highlights} activeIndex={index} big />
      </Reveal>

      <Reveal delay={250} style={absBox(635, 306, 670, 469)}>
        <HighlightVisual
          highlights={highlights}
          activeIndex={index}
          className="h-[469px] w-[670px]"
        />
        <div className="absolute left-[545px] top-[405px] flex gap-[7px]">
          <ArrowControl dir="prev" onClick={prev} small={false} />
          <ArrowControl dir="next" onClick={next} small={false} />
        </div>
      </Reveal>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="testimonials"
      className="bg-[#f1f1f1] px-[16px] pb-[48px] pt-[24px] md:px-[40px] md:pb-[80px] md:pt-[72px]"
    >
      <div className="flex flex-col gap-[16px] md:gap-[24px]">
        <Reveal>
          <SectionLabel />
        </Reveal>
        <div className="flex flex-col gap-[20px] md:flex-row md:items-start md:justify-between">
          <Reveal delay={150}>
            <Heading big={false} />
          </Reveal>
          <Reveal delay={250}>
            <PillButton label="Let’s chat" href="#book" />
          </Reveal>
        </div>
      </div>

      <div className="mt-[40px] grid grid-cols-1 gap-[30px] md:grid-cols-2 md:gap-[24px]">
        <Reveal>
          <HighlightCard
            highlights={highlights}
            activeIndex={index}
            big={false}
          />
        </Reveal>

        <Reveal delay={150} className="relative">
          <HighlightVisual
            highlights={highlights}
            activeIndex={index}
            className="aspect-[343/240] w-full md:aspect-auto md:h-[469px]"
          />
          <div className="absolute bottom-[12px] right-[12px] flex gap-[6px] md:bottom-[20px] md:right-[20px] md:gap-[7px]">
            <ArrowControl dir="prev" onClick={prev} small />
            <ArrowControl dir="next" onClick={next} small />
          </div>
        </Reveal>
      </div>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
