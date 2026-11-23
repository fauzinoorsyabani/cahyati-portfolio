import { type CSSProperties, useEffect, useRef, useState } from "react";
import type { CaseStudy } from "../domain/portfolio";
import { CloseIcon, WatermarkApertureSvg } from "../primitives/Icons";
import { PillButton } from "../primitives/Interactive";
import { ModalDialog } from "../primitives/ModalDialog";
import { Reveal } from "../primitives/Motion";
import {
  absBox,
  ScaledStage,
  StageShell,
  useReducedMotion,
} from "../primitives/Stage";

function RotatingWatermark({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof el.animate !== "function") return;
    const anim = el.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: 60000, iterations: Infinity },
    );
    return () => anim.cancel();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={style}
    >
      <WatermarkApertureSvg className="h-full w-full" />
    </div>
  );
}

function CaseStudyCard({
  study,
  imgClass,
  titleClass,
  onSelect,
}: {
  study: CaseStudy;
  imgClass: string;
  titleClass: string;
  onSelect: (study: CaseStudy) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(study)}
      className="group flex w-full cursor-pointer flex-col gap-[20px] text-left"
    >
      <div
        className={`relative w-full overflow-hidden rounded-[16px] bg-[#e5e0d5] ${imgClass}`}
      >
        <img
          src={study.imageSrc}
          alt={study.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className={`font-semibold text-[#0f172a] ${titleClass}`}>
          <span className="link-underline-reveal">{study.title}</span>
        </p>
        <p className="text-[14px] leading-[20px] tracking-[-0.14px] text-[#666]">
          {study.organization} · {study.period}
        </p>
      </div>
    </button>
  );
}

function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  return (
    <ModalDialog
      labelledBy="case-study-dialog-title"
      maxWidthClass="max-w-[680px]"
      panelClassName="p-[24px] md:p-[36px]"
      onClose={onClose}
    >
      <div className="flex items-start justify-between gap-[16px]">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#666]">
            {study.category} · {study.period}
          </p>
          <h3
            id="case-study-dialog-title"
            className="mt-[4px] text-[28px] font-semibold leading-[34px] tracking-[-1.1px] text-[#0f172a]"
          >
            {study.title}
          </h3>
          <p className="mt-[4px] text-[15px] font-medium text-[#475569]">
            {study.organization}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#0f172a] transition-transform duration-300 hover:scale-105"
        >
          <CloseIcon className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div className="mt-[20px] aspect-[16/9] w-full overflow-hidden rounded-[16px] bg-[#e5e0d5]">
        <img
          src={study.imageSrc}
          alt={study.imageAlt}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="mt-[20px] text-[16px] leading-[26px] text-[#333]">
        {study.summary}
      </p>

      <div className="mt-[20px] rounded-[16px] bg-white p-[20px]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#666]">
          Verified Outcomes
        </p>
        <ul className="mt-[10px] list-disc space-y-[8px] pl-[18px] text-[15px] leading-[24px] text-[#222]">
          {study.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>

      <div className="mt-[18px] flex flex-wrap gap-[8px]">
        {study.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-[999px] bg-[#2563eb] px-[14px] py-[6px] text-[13px] font-medium text-white"
          >
            {tool}
          </span>
        ))}
      </div>
    </ModalDialog>
  );
}

export function ProjectsSection({
  caseStudies,
}: {
  caseStudies: readonly CaseStudy[];
}) {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const desktop = (
    <ScaledStage id="portfolio" height={2050} className="bg-[#f7f5f0]">
      <RotatingWatermark style={absBox(338, 348, 664, 664)} />

      <div
        className="flex flex-col items-center gap-[40px]"
        style={absBox(280, 84, 880)}
      >
        <Reveal>
          <h2 className="text-center text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#0f172a]">
            1,000+ assets structured &amp; analyzed{" "}
            <span className="font-editorial text-[#1d4ed8] text-[70px] leading-[80px] tracking-[-2.8px]">
              - built for real operations
            </span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <PillButton label="View Capabilities" href="#capabilities" />
        </Reveal>
      </div>

      {caseStudies.map((study, idx) => (
        <Reveal
          key={study.id}
          delay={(idx % 2) * 120}
          style={absBox(
            study.desktopBox.x,
            study.desktopBox.y,
            study.desktopBox.w,
            436,
          )}
        >
          <CaseStudyCard
            study={study}
            imgClass="h-[366px]"
            titleClass="text-[18px] leading-[28px] tracking-[-0.18px]"
            onSelect={setSelected}
          />
        </Reveal>
      ))}
    </ScaledStage>
  );

  const mobile = (
    <section
      id="portfolio"
      className="relative scroll-mt-[84px] overflow-hidden bg-[#f7f5f0] pb-[48px] pt-[24px] md:pb-[140px] md:pt-[40px]"
    >
      <RotatingWatermark className="absolute left-[49px] top-[694px] h-[310px] w-[310px] md:left-1/2 md:top-[420px] md:h-[520px] md:w-[520px] md:-translate-x-1/2" />

      <div className="relative flex flex-col items-center gap-[30px] px-[16px] md:px-[40px]">
        <Reveal>
          <h2 className="text-center text-[32px] font-semibold leading-[40px] tracking-[-1.28px] text-[#0f172a] md:mx-auto md:max-w-[640px] md:text-[48px] md:leading-[58px] md:tracking-[-1.92px]">
            1,000+ assets structured &amp; analyzed{" "}
            <span className="font-editorial text-[#1d4ed8] text-[40px] leading-[40px] tracking-[-1.6px] md:text-[60px] md:leading-[68px]">
              - built for real operations
            </span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <PillButton label="View Capabilities" href="#capabilities" />
        </Reveal>
      </div>

      <div className="relative mt-[40px] grid grid-cols-1 gap-[36px] px-[16px] md:mt-[56px] md:grid-cols-2 md:gap-x-[24px] md:gap-y-[48px] md:px-[40px]">
        {caseStudies.map((study, idx) => (
          <div
            key={study.id}
            className={idx % 2 === 1 ? "md:translate-y-[60px]" : ""}
          >
            <Reveal delay={(idx % 2) * 100}>
              <CaseStudyCard
                study={study}
                imgClass="aspect-[343/340]"
                titleClass="text-[16px] leading-[22px] tracking-[-0.16px] md:text-[18px] md:leading-[28px]"
                onSelect={setSelected}
              />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <StageShell desktop={desktop} mobile={mobile} />
      {selected && (
        <CaseStudyModal study={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
