import { useState } from "react";
import { type Capability, formatIndexTag } from "../domain/portfolio";
import { Reveal } from "../primitives/Motion";
import { absBox, ScaledStage, StageShell } from "../primitives/Stage";

export function CapabilitiesSection({
  capabilities,
}: {
  capabilities: readonly Capability[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const desktop = (
    <ScaledStage id="capabilities" height={862} className="bg-[#0b1221]">
      <Reveal style={absBox(135, 120, 370, 281)}>
        <div className="relative h-[281px] w-[370px] overflow-hidden rounded-[16px] bg-[#13203b]">
          {capabilities.map((cap, idx) => (
            <div
              key={cap.id}
              className="absolute inset-0"
              style={{
                opacity: idx === activeIndex ? 1 : 0,
                transform: idx === activeIndex ? "scale(1)" : "scale(1.06)",
                transition:
                  "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 1200ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <img
                src={cap.imageSrc}
                alt={cap.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: cap.objectPosition }}
              />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={150} style={absBox(135, 421, 370)}>
        <div className="relative">
          {capabilities.map((cap, idx) => (
            <p
              key={cap.id}
              aria-hidden={idx !== activeIndex}
              className={`${idx === 0 ? "relative" : "absolute inset-x-0 top-0"} text-[20px] font-medium leading-[30px] tracking-[-0.2px] text-[#f8fafc]`}
              style={{
                opacity: idx === activeIndex ? 1 : 0,
                transform: idx === activeIndex ? "none" : "translateY(10px)",
                transition:
                  "opacity 500ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {cap.description}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={250} style={absBox(135, 706)}>
        <a
          href="#portfolio"
          className="link-underline-retract whitespace-nowrap text-[26px] font-medium leading-[36px] tracking-[-0.78px] text-[#f8fafc]"
        >
          Check out my work
        </a>
      </Reveal>

      <div style={absBox(635, 120, 670, 578)}>
        {capabilities.map((cap, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Reveal
              key={cap.id}
              delay={100 * idx}
              style={{
                position: "absolute",
                left: 0,
                top: cap.desktopRow.top,
                width: 670,
                height: cap.desktopRow.height,
              }}
            >
              <button
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className="group relative block h-full w-full cursor-pointer rounded-[6px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1221]"
              >
                <span
                  className="absolute left-0 top-0 flex items-start gap-[4px] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ color: isActive ? "#f8fafc" : "#64748b" }}
                >
                  <span
                    className="text-[54px] font-semibold leading-[68px] tracking-[-2.16px]"
                    style={{ marginTop: cap.desktopRow.titleTop }}
                  >
                    {cap.title}
                  </span>
                  <span className="text-[20px] leading-[30px] tracking-[-0.2px]">
                    {formatIndexTag(idx)}
                  </span>
                </span>
                <span
                  className="absolute left-0 h-px w-full bg-[#1e2f4f]"
                  style={{ top: cap.desktopRow.height }}
                />
                <span
                  className="absolute left-0 h-px bg-[#3b82f6] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    top: cap.desktopRow.height,
                    width: isActive ? "100%" : "0%",
                  }}
                />
              </button>
            </Reveal>
          );
        })}
      </div>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="capabilities"
      className="scroll-mt-[84px] bg-[#0b1221] px-[16px] pb-[60px] pt-[40px] md:px-[40px] md:pb-[80px] md:pt-[72px]"
    >
      <div className="grid grid-cols-1 gap-[40px] md:grid-cols-2 md:gap-x-[24px] md:gap-y-[48px]">
        {capabilities.map((cap, idx) => (
          <Reveal key={cap.id} delay={(idx % 2) * 100}>
            <div className="flex flex-col gap-[36px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="flex items-start gap-[5px] text-left text-[#f8fafc]">
                  <span className="mt-[14px] max-w-[280px] text-[32px] font-semibold leading-[40px] tracking-[-0.64px]">
                    {cap.title}
                  </span>
                  <span className="text-[16px] leading-[22px] tracking-[-0.16px]">
                    {formatIndexTag(idx)}
                  </span>
                </h3>
                <div className="group relative aspect-[343/190] w-full overflow-hidden rounded-[16px] bg-[#13203b]">
                  <img
                    src={cap.imageSrc}
                    alt={cap.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    style={{ objectPosition: cap.objectPosition }}
                  />
                </div>
                <p className="text-[18px] font-medium leading-[28px] tracking-[-0.18px] text-[#f8fafc]">
                  {cap.description}
                </p>
              </div>
              <div className="h-px w-full bg-[#1e2f4f]" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-[40px]">
        <a
          href="#portfolio"
          className="link-underline-retract text-[26px] font-medium leading-[36px] tracking-[-0.78px] text-[#f8fafc]"
        >
          Check out my work
        </a>
      </Reveal>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
