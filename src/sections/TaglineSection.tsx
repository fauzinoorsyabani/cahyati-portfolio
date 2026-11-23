import { Marquee } from "../primitives/Motion";
import { ScaledStage, StageShell } from "../primitives/Stage";

function TaglineText({ big }: { big: boolean }) {
  return (
    <p
      className={`shrink-0 whitespace-nowrap font-semibold text-[#030303] ${
        big
          ? "pr-[96px] text-[120px] leading-[150px] tracking-[-7.2px]"
          : "pr-[40px] text-[64px] leading-[80px] tracking-[-3.84px] md:text-[88px] md:leading-[110px] md:tracking-[-5.28px]"
      }`}
    >
      I don’t just gather{" "}
      <span className="font-editorial text-[#a8a8a8]">data</span>—I engineer
      clarity.
    </p>
  );
}

export function TaglineSection() {
  const desktop = (
    <ScaledStage height={246} className="bg-[#f1f1f1]">
      <Marquee
        copies={3}
        duration={32000}
        className="absolute left-0 top-[48px] w-[1440px]"
      >
        <TaglineText big />
      </Marquee>
    </ScaledStage>
  );

  const mobile = (
    <section className="bg-[#f1f1f1] py-[12px] md:py-[32px]">
      <Marquee copies={3} duration={20000}>
        <TaglineText big={false} />
      </Marquee>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
