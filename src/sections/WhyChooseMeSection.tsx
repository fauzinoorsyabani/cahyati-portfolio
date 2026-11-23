import type {
  MetricHighlight,
  PolaroidFrame,
  PractitionerProfile,
  WhySectionData,
} from "../domain/portfolio";
import { LinkedInIcon, NodeApertureIcon } from "../primitives/Icons";
import { MonogramStack } from "../primitives/Interactive";
import { Marquee, Reveal } from "../primitives/Motion";
import { absBox, ScaledStage, StageShell } from "../primitives/Stage";

const POLAROID_HOVER_TRANSFORMS = [
  "group-hover:-translate-x-[14px] group-hover:-translate-y-[6px] group-hover:-rotate-[4deg]",
  "group-hover:translate-x-[14px] group-hover:-translate-y-[8px] group-hover:rotate-[4deg]",
  "group-hover:-translate-x-[10px] group-hover:translate-y-[8px]",
  "group-hover:translate-x-[12px] group-hover:translate-y-[6px] group-hover:rotate-[3deg]",
] as const;

function PolaroidCluster({
  polaroids,
}: {
  polaroids: readonly PolaroidFrame[];
}) {
  return (
    <div className="group relative h-[243px] w-[307px]">
      {polaroids.map((item, idx) => {
        const [left, top, width, height] = item.box;
        const inset = (item.frame[0] - item.photo[0]) / 2;
        return (
          <div
            key={item.id}
            className={`absolute flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              POLAROID_HOVER_TRANSFORMS[idx] ?? ""
            }`}
            style={{ left, top, width, height }}
          >
            <div
              className="relative shrink-0 rounded-[12px] bg-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)]"
              style={{
                width: item.frame[0],
                height: item.frame[1],
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              <div
                className="absolute overflow-hidden rounded-[10px]"
                style={{
                  left: inset,
                  top: inset,
                  width: item.photo[0],
                  height: item.photo[1],
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MetricBlock({
  metric,
  big = false,
  className = "",
}: {
  metric: MetricHighlight;
  big?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${big ? "gap-[20px]" : ""} ${className}`}>
      <p
        className={
          big
            ? "text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#1d4ed8]"
            : "text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#0f172a]"
        }
      >
        {metric.value}
      </p>
      <p className="text-[16px] leading-[22px] tracking-[-0.16px] text-[#334155]">
        {metric.label}
      </p>
    </div>
  );
}

function TileMarqueeCard({
  rows,
}: {
  rows: WhySectionData["marqueeRows"];
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-white">
      {rows.map((row, idx) => (
        <Marquee
          key={row.id}
          copies={3}
          duration={26000 + 4000 * idx}
          reverse={idx === 1}
          className="absolute left-0"
          style={{
            top: row.top,
            marginLeft: row.offset,
            width: `calc(100% - ${row.offset}px)`,
          }}
        >
          {row.tiles.map((tile) => (
            <div
              key={tile.id}
              className="relative mr-[1px] h-[108px] w-[134px] shrink-0 overflow-hidden bg-[#1a1a1a]"
            >
              <img
                src={tile.imageSrc}
                alt={tile.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      ))}
    </div>
  );
}

function LinkedInHighlightCard({
  practitioner,
}: {
  practitioner: PractitionerProfile;
}) {
  return (
    <a
      href={practitioner.linkedinUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative block h-full w-full overflow-hidden rounded-[16px] bg-[#0f1a30]"
    >
      <img
        src={practitioner.portraitSrc}
        alt={`${practitioner.name} professional LinkedIn profile`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_18%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/80 via-transparent to-[#0b1221]/20"
      />
      <span className="absolute right-[20px] top-[20px] flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[#0a66c2] text-white shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
        <LinkedInIcon className="h-[20px] w-[20px]" />
      </span>
      <span className="absolute bottom-[24px] left-[26px] whitespace-nowrap text-[26px] font-medium leading-[36px] tracking-[-0.78px] text-[#f8fafc]">
        <span className="link-underline-retract">Connect on LinkedIn</span>
      </span>
    </a>
  );
}

function ViewfinderCard({ whySection }: { whySection: WhySectionData }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-[16px] bg-[#0f1a30]">
      <img
        src={whySection.viewfinderImageSrc}
        alt={whySection.viewfinderImageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/85 via-[#0b1221]/25 to-[#1d4ed8]/15"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[52px] h-[126px] w-[184px] -translate-x-1/2"
      >
        <span className="absolute left-0 top-0 h-[8px] w-[8px] border-l border-t border-white/80" />
        <span className="absolute right-0 top-0 h-[8px] w-[8px] border-r border-t border-white/80" />
        <span className="absolute bottom-0 left-0 h-[8px] w-[8px] border-b border-l border-white/80" />
        <span className="absolute bottom-0 right-0 h-[8px] w-[8px] border-b border-r border-white/80" />
      </div>
      <p className="absolute bottom-[24px] left-1/2 w-[288px] -translate-x-1/2 text-center text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-white">
        {whySection.viewfinderCaption}
      </p>
    </div>
  );
}

export function WhyChooseMeSection({
  practitioner,
  whySection,
}: {
  practitioner: PractitionerProfile;
  whySection: WhySectionData;
}) {
  const desktop = (
    <ScaledStage id="why" height={1343} className="bg-[#f7f5f0]">
      <Reveal style={absBox(350, 120, 740)}>
        <h2 className="h-[146px] text-center text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#0f172a]">
          Why work with me as your -{" "}
          <span className="font-editorial text-[#1d4ed8] text-[70px] leading-[80px] tracking-[-2.8px]">
            Data Engineer
          </span>
        </h2>
      </Reveal>

      <Reveal delay={100} style={absBox(135, 384, 570, 307)}>
        <div className="h-full w-full rounded-[16px] bg-white p-[40px]">
          <div className="flex w-[312px] flex-col gap-[90px]">
            <NodeApertureIcon className="h-[63px] w-[63px] text-[#2563eb] transition-transform duration-1000 hover:rotate-180" />
            <MetricBlock metric={whySection.primaryMetric} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={250} style={absBox(378, 326, 307, 243)}>
        <PolaroidCluster polaroids={whySection.polaroids} />
      </Reveal>

      <Reveal delay={200} style={absBox(735, 384, 570, 307)}>
        <TileMarqueeCard rows={whySection.marqueeRows} />
      </Reveal>

      <Reveal delay={100} style={absBox(135, 721, 370, 502)}>
        <LinkedInHighlightCard practitioner={practitioner} />
      </Reveal>

      <Reveal delay={200} style={absBox(535, 721, 370, 327)}>
        <ViewfinderCard whySection={whySection} />
      </Reveal>

      <Reveal delay={300} style={absBox(535, 1078, 370, 145)}>
        <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-white">
          <MetricBlock
            metric={whySection.secondaryMetric}
            className="absolute left-[24px] top-[39px]"
          />
          <div className="absolute left-[209px] top-[46px]">
            <MonogramStack items={whySection.credentialBadges} tone="light" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={300} style={absBox(935, 721, 370, 186)}>
        <div className="h-full w-full rounded-[16px] bg-white px-[24px] py-[26px]">
          <MetricBlock
            metric={whySection.highlightMetric}
            big
            className="w-[300px]"
          />
        </div>
      </Reveal>

      <Reveal delay={400} style={absBox(935, 937, 370, 286)}>
        <div className="group relative h-full w-full overflow-hidden rounded-[16px] bg-[#13203b]">
          <img
            src={whySection.detailImageSrc}
            alt={whySection.detailImageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        </div>
      </Reveal>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="why"
      className="scroll-mt-[84px] overflow-x-clip bg-[#f7f5f0] px-[16px] pb-[40px] pt-[60px] md:px-[40px] md:pb-[80px] md:pt-[80px]"
    >
      <Reveal>
        <h2 className="mx-auto max-w-[343px] text-center text-[32px] font-semibold leading-[40px] tracking-[-1.28px] text-[#0f172a] md:max-w-[580px] md:text-[48px] md:leading-[58px] md:tracking-[-1.92px]">
          Why work with me as your -{" "}
          <span className="font-editorial text-[#1d4ed8] text-[36px] leading-[40px] tracking-[-1.44px] md:text-[60px] md:leading-[68px]">
            Data Engineer
          </span>
        </h2>
      </Reveal>

      <div className="mt-[40px] grid grid-cols-1 gap-[30px] md:grid-cols-2 md:gap-[24px]">
        <Reveal className="relative pt-[68px]">
          <div className="flex h-[326px] flex-col justify-end rounded-[16px] bg-white px-[28px] pb-[32px] pt-[180px] sm:px-[36px]">
            <MetricBlock
              metric={whySection.primaryMetric}
              className="max-w-[271px]"
            />
          </div>
          <div className="pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2 origin-top max-[374px]:scale-[0.84]">
            <PolaroidCluster polaroids={whySection.polaroids} />
          </div>
        </Reveal>

        <Reveal delay={100} className="h-[307px] md:mt-[73px] md:h-[321px]">
          <TileMarqueeCard rows={whySection.marqueeRows} />
        </Reveal>

        <Reveal className="h-[502px]">
          <LinkedInHighlightCard practitioner={practitioner} />
        </Reveal>

        <div className="flex flex-col gap-[30px] md:gap-[24px]">
          <Reveal delay={100} className="h-[303px] md:h-[327px]">
            <ViewfinderCard whySection={whySection} />
          </Reveal>

          <Reveal delay={150}>
            <div className="flex h-[145px] items-center justify-between rounded-[16px] bg-white px-[24px]">
              <MetricBlock metric={whySection.secondaryMetric} />
              <MonogramStack items={whySection.credentialBadges} tone="light" />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-[16px] bg-white px-[24px] py-[28px]">
            <MetricBlock metric={whySection.highlightMetric} big />
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="relative h-[265px] overflow-hidden rounded-[16px] md:h-auto md:min-h-[265px]"
        >
          <img
            src={whySection.detailImageSrc}
            alt={whySection.detailImageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
