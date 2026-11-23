import { useEffect, useState } from "react";
import type {
  Credential,
  LeadershipMandate,
  PartnerMark,
  PractitionerProfile,
} from "../domain/portfolio";
import {
  CloseIcon,
  NodeApertureIcon,
  PlaySnapshotIcon,
} from "../primitives/Icons";
import { Marquee, Reveal } from "../primitives/Motion";
import { absBox, ScaledStage, StageShell } from "../primitives/Stage";

function EditorialStatement({ big }: { big: boolean }) {
  const accentClass = big
    ? "font-editorial text-[70px] leading-[80px] tracking-[-2.8px]"
    : "font-editorial text-[40px] leading-[48px] tracking-[-1.6px] md:text-[60px] md:leading-[68px] md:tracking-[-2.4px]";

  return (
    <>
      “I don’t just collect data — I{" "}
      <span className={accentClass}>engineer</span> clean pipelines,{" "}
      <span className={accentClass}>clear insights</span>, and systems that make
      work <span className={accentClass}>measurable.</span>”
    </>
  );
}

function SectionLabel({ size = 22 }: { size?: number }) {
  return (
    <div className="flex items-center gap-[6px]">
      <NodeApertureIcon
        style={{ width: size, height: size }}
        className="text-[#030303] transition-transform duration-700 hover:rotate-180"
      />
      <p className="whitespace-nowrap text-[20px] leading-[30px] tracking-[-0.2px] text-[#444]">
        About me
      </p>
    </div>
  );
}

function FeaturePortrait({
  src,
  name,
  onOpenSnapshot,
}: {
  src: string;
  name: string;
  onOpenSnapshot: () => void;
}) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-[24px] bg-[#dcdcdc]">
      <img
        src={src}
        alt={`${name} at a minimalist studio workspace`}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
      <button
        type="button"
        aria-label="Open CV snapshot"
        onClick={onOpenSnapshot}
        className="absolute bottom-[20px] right-[20px] h-[64px] w-[64px] cursor-pointer transition-transform duration-500 hover:scale-110 active:scale-95"
      >
        <PlaySnapshotIcon className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]" />
      </button>
    </div>
  );
}

function PartnerMarkBadge({ mark }: { mark: PartnerMark }) {
  return (
    <div className="flex items-center gap-[8px] whitespace-nowrap opacity-85 transition-opacity duration-300 hover:opacity-100">
      <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#030303] text-[10px] font-semibold tracking-[-0.04em] text-white">
        {mark.monogram}
      </span>
      <span className="text-[16px] font-semibold tracking-[-0.4px] text-[#030303]">
        {mark.name}
      </span>
    </div>
  );
}

function CvSnapshotModal({
  practitioner,
  credentials,
  leadershipMandates,
  onClose,
}: {
  practitioner: PractitionerProfile;
  credentials: readonly Credential[];
  leadershipMandates: readonly LeadershipMandate[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-[16px] backdrop-blur-[4px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-snapshot-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[88vh] w-full max-w-[760px] overflow-y-auto rounded-[24px] bg-[#f1f1f1] p-[28px] text-[#030303] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)] md:p-[40px]"
      >
        <div className="flex items-start justify-between gap-[16px]">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#666]">
              Verified CV Dossier
            </p>
            <h3
              id="cv-snapshot-title"
              className="mt-[4px] text-[30px] font-semibold leading-[36px] tracking-[-1.2px] text-[#030303]"
            >
              {practitioner.name} — {practitioner.degree}
            </h3>
            <p className="mt-[6px] text-[15px] text-[#444]">
              {practitioner.university} ({practitioner.educationPeriod}) · GPA{" "}
              <span className="font-semibold text-[#030303]">
                {practitioner.gpa}
              </span>
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#030303] transition-transform duration-300 hover:scale-105"
          >
            <CloseIcon className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="mt-[24px] grid grid-cols-1 gap-[16px] md:grid-cols-2">
          <div className="rounded-[16px] bg-white p-[20px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#666]">
              Technical Stack
            </p>
            <div className="mt-[12px] flex flex-wrap gap-[8px]">
              {practitioner.technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-[999px] bg-[#f1f1f1] px-[12px] py-[5px] text-[13px] font-medium text-[#030303]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] bg-white p-[20px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#666]">
              Focus Areas &amp; Strengths
            </p>
            <div className="mt-[12px] flex flex-wrap gap-[8px]">
              {[...practitioner.interests, ...practitioner.softSkills].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-[999px] border border-[#e2e2e2] px-[12px] py-[5px] text-[13px] font-medium text-[#444]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-[20px] rounded-[16px] bg-white p-[20px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#666]">
            Certifications &amp; Awards ({credentials.length})
          </p>
          <ul className="mt-[12px] divide-y divide-[#ececec]">
            {credentials.map((cred) => (
              <li
                key={cred.id}
                className="flex flex-col justify-between gap-[4px] py-[10px] sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-[15px] font-semibold text-[#030303]">
                    {cred.title}
                  </p>
                  <p className="text-[13px] text-[#555]">{cred.issuer}</p>
                </div>
                <span className="shrink-0 text-[13px] font-medium text-[#666]">
                  {cred.period}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[20px] rounded-[16px] bg-white p-[20px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#666]">
            Selected Leadership Mandates
          </p>
          <ul className="mt-[12px] space-y-[10px]">
            {leadershipMandates.slice(0, 5).map((mandate) => (
              <li
                key={`${mandate.role}-${mandate.organization}`}
                className="flex flex-col gap-[2px]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-[8px]">
                  <p className="text-[15px] font-semibold text-[#030303]">
                    {mandate.role} · {mandate.organization}
                  </p>
                  <span className="text-[13px] text-[#666]">
                    {mandate.period}
                  </span>
                </div>
                <p className="text-[14px] text-[#444]">{mandate.impact}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AboutSection({
  practitioner,
  partnerMarks,
  credentials,
  leadershipMandates,
}: {
  practitioner: PractitionerProfile;
  partnerMarks: readonly PartnerMark[];
  credentials: readonly Credential[];
  leadershipMandates: readonly LeadershipMandate[];
}) {
  const [snapshotOpen, setSnapshotOpen] = useState(false);

  const desktop = (
    <ScaledStage id="about" height={1022} className="bg-[#f1f1f1]">
      <Reveal style={absBox(135, 120)}>
        <SectionLabel />
      </Reveal>

      <Reveal delay={200} style={absBox(355, 120, 950)}>
        <p className="text-right text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#030303]">
          <EditorialStatement big />
        </p>
      </Reveal>

      <Reveal delay={100} style={absBox(233, 420, 470, 410)}>
        <FeaturePortrait
          src={practitioner.aboutPortraitSrc}
          name={practitioner.name}
          onOpenSnapshot={() => setSnapshotOpen(true)}
        />
      </Reveal>

      <div style={absBox(735, 420, 570, 410)}>
        <Reveal delay={200}>
          <p className="text-[20px] font-medium leading-[30px] tracking-[-0.2px] text-[#444]">
            {practitioner.aboutParagraph}
          </p>
        </Reveal>

        <Reveal delay={300} className="absolute left-0 top-[374px] flex items-center gap-[36px]">
          <a
            href="#book"
            className="link-underline-reveal whitespace-nowrap text-[26px] font-medium leading-[36px] tracking-[-0.78px] text-[#444]"
          >
            Let’s chat
          </a>
          <button
            type="button"
            onClick={() => setSnapshotOpen(true)}
            className="link-underline-reveal cursor-pointer whitespace-nowrap text-[18px] font-medium leading-[28px] tracking-[-0.36px] text-[#030303]"
          >
            View CV dossier
          </button>
        </Reveal>
      </div>

      <div
        className="flex items-center justify-center gap-[68px]"
        style={absBox(155, 874, 1130, 36)}
      >
        {partnerMarks.map((mark, idx) => (
          <Reveal key={mark.name} delay={100 * idx}>
            <PartnerMarkBadge mark={mark} />
          </Reveal>
        ))}
      </div>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="about"
      className="bg-[#f1f1f1] pb-[48px] pt-[48px] md:pb-[72px] md:pt-[80px]"
    >
      <div className="flex flex-col gap-[16px] px-[16px] md:gap-[24px] md:px-[40px]">
        <Reveal>
          <SectionLabel size={20} />
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[36px] font-semibold leading-[44px] tracking-[-1.44px] text-[#030303] md:text-[48px] md:leading-[60px] md:tracking-[-1.92px]">
            <EditorialStatement big={false} />
          </p>
        </Reveal>
      </div>

      <div className="mt-[30px] flex flex-col gap-[30px] px-[16px] md:mt-[48px] md:grid md:grid-cols-2 md:items-stretch md:gap-[32px] md:px-[40px]">
        <Reveal className="aspect-[343/293] md:aspect-auto md:min-h-[360px]">
          <FeaturePortrait
            src={practitioner.aboutPortraitSrc}
            name={practitioner.name}
            onOpenSnapshot={() => setSnapshotOpen(true)}
          />
        </Reveal>

        <div className="flex flex-col justify-between gap-[46px]">
          <Reveal delay={150}>
            <p className="text-[18px] font-medium leading-[28px] tracking-[-0.18px] text-[#444] md:text-[20px] md:leading-[30px]">
              {practitioner.aboutParagraph}
            </p>
          </Reveal>
          <Reveal delay={250} className="flex flex-wrap items-center gap-[28px]">
            <a
              href="#book"
              className="link-underline-retract text-[22px] font-medium leading-[30px] tracking-[-0.66px] text-[#444] md:text-[26px] md:leading-[36px]"
            >
              Let’s chat
            </a>
            <button
              type="button"
              onClick={() => setSnapshotOpen(true)}
              className="link-underline-reveal cursor-pointer text-[16px] font-medium text-[#030303]"
            >
              View CV dossier
            </button>
          </Reveal>
        </div>
      </div>

      <Marquee className="mt-[46px] md:mt-[64px]" copies={3} duration={22000}>
        {partnerMarks.map((mark) => (
          <div key={mark.name} className="flex h-[32px] items-center px-[28px]">
            <PartnerMarkBadge mark={mark} />
          </div>
        ))}
      </Marquee>
    </section>
  );

  return (
    <>
      <StageShell desktop={desktop} mobile={mobile} />
      {snapshotOpen && (
        <CvSnapshotModal
          practitioner={practitioner}
          credentials={credentials}
          leadershipMandates={leadershipMandates}
          onClose={() => setSnapshotOpen(false)}
        />
      )}
    </>
  );
}
