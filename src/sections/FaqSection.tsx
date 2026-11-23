import { useState } from "react";
import { type FaqEntry, formatIndexTag } from "../domain/portfolio";
import { CrosshairPlusIcon, NodeApertureIcon } from "../primitives/Icons";
import { PillButton } from "../primitives/Interactive";
import { Reveal } from "../primitives/Motion";
import { absBox, ScaledStage, StageShell } from "../primitives/Stage";

function FaqLabel() {
  return (
    <div className="flex items-center gap-[6px]">
      <NodeApertureIcon className="h-[22px] w-[22px] text-[#030303] transition-transform duration-700 hover:rotate-180" />
      <p className="whitespace-nowrap text-[20px] leading-[30px] tracking-[-0.2px] text-[#444]">
        FAQ
      </p>
    </div>
  );
}

function FaqAccordion({
  entries,
  big,
}: {
  entries: readonly FaqEntry[];
  big: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col gap-[30px]">
      {entries.map((entry, idx) => {
        const isOpen = openIndex === idx;
        return (
          <Reveal key={entry.id} delay={90 * idx}>
            <div
              className={`rounded-[14px] bg-white transition-shadow duration-300 hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ${
                big ? "px-[29px]" : "px-[26px]"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`flex w-full cursor-pointer items-center justify-between gap-[16px] text-left ${
                  big ? "h-[88px]" : "min-h-[88px] py-[22px]"
                }`}
              >
                <span className="flex items-start gap-[5px]">
                  <span
                    className={
                      big
                        ? "whitespace-nowrap text-[20px] font-medium leading-[30px] tracking-[-0.2px] text-[#080808]"
                        : "text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-[#080808]"
                    }
                  >
                    {entry.question}
                  </span>
                  <span className="shrink-0 text-[14px] leading-[20px] tracking-[-0.28px] text-[#a8a8a8]">
                    {formatIndexTag(idx)}
                  </span>
                </span>
                <CrosshairPlusIcon
                  className="h-[24px] w-[24px] shrink-0 text-[#080808] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: isOpen ? "rotate(135deg)" : "none" }}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    className={`${
                      big
                        ? "pb-[29px] pr-[60px] text-[16px] leading-[24px]"
                        : "pb-[22px] text-[15px] leading-[22px]"
                    } tracking-[-0.16px] text-[#444] transition-opacity duration-500`}
                    style={{ opacity: isOpen ? 1 : 0 }}
                  >
                    {entry.answer}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function FaqSection({ entries }: { entries: readonly FaqEntry[] }) {
  const desktop = (
    <ScaledStage id="faq" height={1006} className="bg-[#f1f1f1]">
      <Reveal style={absBox(135, 120)}>
        <FaqLabel />
      </Reveal>

      <div className="relative ml-[535px] w-[770px] pb-[120px] pt-[120px]">
        <div className="flex items-start justify-between">
          <Reveal delay={200}>
            <h2 className="h-[146px] w-[440px] text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#030303]">
              Frequently
              <br />
              asked{" "}
              <span className="font-editorial text-[70px] leading-[80px] tracking-[-2.8px]">
                questions
              </span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <PillButton label="Let’s chat" href="#book" />
          </Reveal>
        </div>

        <div className="mt-[60px]">
          <FaqAccordion entries={entries} big />
        </div>
      </div>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="faq"
      className="bg-[#f1f1f1] px-[16px] pb-[40px] pt-[24px] md:px-[40px] md:pb-[80px] md:pt-[72px]"
    >
      <div className="md:grid md:grid-cols-[240px_1fr] md:gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          <Reveal>
            <FaqLabel />
          </Reveal>
          <Reveal delay={150}>
            <h2 className="max-w-[260px] text-[32px] font-semibold leading-[40px] tracking-[-1.28px] text-[#030303]">
              Frequently asked{" "}
              <span className="font-editorial text-[40px] leading-[40px] tracking-[-1.6px]">
                questions
              </span>
            </h2>
          </Reveal>
          <Reveal delay={250} className="mt-[14px]">
            <PillButton label="Let’s chat" href="#book" />
          </Reveal>
        </div>

        <div className="mt-[40px] md:mt-0">
          <FaqAccordion entries={entries} big={false} />
        </div>
      </div>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
