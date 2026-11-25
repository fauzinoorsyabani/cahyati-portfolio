import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { NavItem, PractitionerProfile } from "../domain/portfolio";
import {
  computeHeroStage,
  DESIGN_WIDTH,
  DESKTOP_BREAKPOINT,
  HERO_FRAME_INSET,
  HERO_INNER_WIDTH,
  MAX_DESKTOP_SCALE,
} from "../domain/stage";
import { CrosshairPlusIcon, RegisteredMarkIcon } from "../primitives/Icons";
import { MonogramStack, PillButton } from "../primitives/Interactive";
import { Reveal } from "../primitives/Motion";
import {
  StageShell,
  useReducedMotion,
  useViewportHeight,
  useViewportWidth,
} from "../primitives/Stage";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function ShutterPreloader({
  wordmark,
  tagline,
}: {
  wordmark: string;
  tagline: string;
}) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<number>(reducedMotion ? 3 : 0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase(3);
      return;
    }

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setPhase(1), 450),
      window.setTimeout(() => setPhase(2), 1120),
      // Bar 5 starts at 1120 + 5 * 105 = 1645ms and lasts 580ms -> finishes at 2225ms
      window.setTimeout(() => {
        setPhase(3);
        document.documentElement.style.overflow = prevOverflow;
      }, 2280),
    ];

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [reducedMotion]);

  if (phase === 3) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] font-['Manrope',sans-serif] antialiased"
      style={{ pointerEvents: phase >= 2 ? "none" : "auto" }}
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }, (_, idx) => (
          <div
            key={idx}
            className="h-full flex-1 bg-[#0b1221]"
            style={{
              marginRight: idx < 5 ? -1 : 0,
              transformOrigin: "50% -15.6%",
              transform: phase >= 2 ? "scaleY(0)" : "scaleY(1)",
              transition: `transform 580ms cubic-bezier(0.3,0.15,0.45,1) ${105 * idx}ms`,
            }}
          />
        ))}
      </div>

      {phase < 2 && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[10px]">
          <div className="relative flex h-[68px] items-start">
            <div className="flex h-[68px] overflow-hidden">
              {wordmark.split("").map((char, idx) => (
                <span
                  key={`${char}-${idx}`}
                  className="block h-[79px] overflow-hidden"
                  style={{ marginTop: -6 }}
                >
                  <span
                    className="flex flex-col"
                    style={{
                      transform: phase >= 1 ? "translateY(-158px)" : "none",
                      transition: `transform 500ms cubic-bezier(0.25,0.46,0.45,0.94) ${36 * idx}ms`,
                    }}
                  >
                    {[0, 1, 2].map((slot) => (
                      <span
                        key={slot}
                        className="block h-[79px] text-[56.33px] font-semibold leading-[78.862px] tracking-[-2.2532px] text-white"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </div>
            <RegisteredMarkIcon className="ml-[3px] mt-[15px] h-[16px] w-[17px] text-white" />
          </div>
          <p className="whitespace-nowrap text-[20px] font-medium leading-[30px] tracking-[-0.2px] text-white">
            {tagline}
          </p>
        </div>
      )}
    </div>
  );
}

function BrandWordmark({
  wordmark,
  className = "",
}: {
  wordmark: string;
  className?: string;
}) {
  return (
    <a
      href="#home"
      className={`font-wordmark whitespace-nowrap text-white ${className}`}
    >
      <span className="font-semibold">{wordmark}</span>
      <span className="font-normal">®</span>
    </a>
  );
}

function FloatingHeader({
  wordmark,
  navigation,
}: {
  wordmark: string;
  navigation: readonly NavItem[];
}) {
  const viewportWidth = useViewportWidth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileHeaderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (viewportWidth >= DESKTOP_BREAKPOINT && menuOpen) {
      setMenuOpen(false);
    }
  }, [viewportWidth, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        mobileHeaderRef.current &&
        !mobileHeaderRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  if (viewportWidth >= DESKTOP_BREAKPOINT) {
    const headerScale = Math.max(
      0.85,
      Math.min(viewportWidth / DESIGN_WIDTH, MAX_DESKTOP_SCALE),
    );
    return (
      <header
        className="fixed left-1/2 top-0 z-50 font-['Manrope',sans-serif] antialiased"
        style={{
          transform: `translate(-50%, ${scrolled ? 10 : HERO_FRAME_INSET + 30}px) scale(${headerScale})`,
          transformOrigin: "top center",
          transition: `transform 500ms ${EASE}`,
        }}
      >
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-center gap-[80px] rounded-[999px] bg-[#0b1221] py-[10px] pl-[20px] pr-[10px] ring-1 ring-white/10"
        >
          <BrandWordmark
            wordmark={wordmark}
            className="text-[19.225px] leading-[24.718px] tracking-[-0.9613px]"
          />
          <div className="flex items-center gap-[24px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#f8fafc]">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline-reveal"
              >
                {item.label}
              </a>
            ))}
          </div>
          <PillButton
            label="Contact me"
            href="#inquiry"
            bg="#f1f2f4"
            color="#181c23"
            fill="#2563eb"
            textClass="text-[14px] leading-[20px] h-[20px]"
          />
        </nav>
      </header>
    );
  }

  return (
    <header
      ref={mobileHeaderRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-[26px] font-['Manrope',sans-serif] antialiased"
      style={{
        transform: `translateY(${scrolled ? 10 : viewportWidth >= 768 ? HERO_FRAME_INSET + 24 : 28}px)`,
        transition: `transform 500ms ${EASE}`,
      }}
    >
      <div className="relative z-20">
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-center gap-[56px] rounded-[999px] bg-[#0b1221] px-[24px] py-[12px] ring-1 ring-white/10 sm:gap-[80px] md:gap-[56px] md:py-[10px] md:pl-[20px] md:pr-[10px]"
        >
          <BrandWordmark
            wordmark={wordmark}
            className="text-[18.239px] leading-[23.451px] tracking-[-0.912px]"
          />
          <div className="hidden items-center gap-[24px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#f8fafc] md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline-reveal"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <PillButton
              label="Contact me"
              href="#inquiry"
              bg="#f1f2f4"
              color="#181c23"
              fill="#2563eb"
              textClass="text-[14px] leading-[20px] h-[20px]"
            />
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative h-[23px] w-[22px] md:hidden"
          >
            <span
              className={`absolute left-[2px] right-[2px] top-[5px] h-[1.6px] rounded bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-[2px] right-[2px] top-[11px] h-[1.6px] rounded bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-[2px] right-[2px] top-[17px] h-[1.6px] rounded bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        <div
          aria-hidden={!menuOpen}
          className={`absolute left-0 right-0 top-[calc(100%+8px)] origin-top rounded-[24px] bg-[#0b1221] p-[8px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)] transition-all duration-300 md:hidden ${
            menuOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-[16px] px-[16px] py-[12px] text-[16px] font-medium text-[#f8fafc] transition-colors hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#inquiry"
            onClick={() => setMenuOpen(false)}
            className="mt-[4px] block rounded-[999px] bg-[#f1f2f4] px-[16px] py-[12px] text-center text-[16px] font-medium text-[#181c23]"
          >
            Contact me
          </a>
        </div>
      </div>
    </header>
  );
}

function useHeroZoomStyle() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return {
    transform: ready || reducedMotion ? "scale(1)" : "scale(1.1)",
    transition: reducedMotion
      ? undefined
      : "transform 600ms cubic-bezier(0.12,0.23,0.5,1) 1500ms",
  };
}

function HeroBackground({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const zoomStyle = useHeroZoomStyle();

  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
        style={zoomStyle}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,18,33,0.22)_0%,rgba(11,18,33,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0b1221]/85 via-[#0b1221]/35 to-transparent"
      />
    </>
  );
}

function HeroPortraitCard({
  practitioner,
  height,
}: {
  practitioner: PractitionerProfile;
  height: number;
}) {
  return (
    <div
      className="group relative flex w-full flex-col items-center justify-between overflow-hidden rounded-[20px] border border-solid border-white/15 bg-[#0f1a30] px-[16px] pb-[16px] pt-[16px]"
      style={{ height }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={practitioner.portraitSrc}
          alt={`Twilight graduation portrait of ${practitioner.name}`}
          className="h-full w-full object-cover object-[center_42%] opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0b1221]/70 via-transparent to-[#0b1221]/75"
        />
      </div>

      <p className="relative w-full text-[24px] font-medium leading-[32px] tracking-[-0.72px] text-[#f8fafc]">
        {practitioner.heroCardTitle}
      </p>

      <div className="relative flex w-full items-end justify-between gap-[12px]">
        <p className="flex-1 text-[14px] leading-[20px] tracking-[-0.28px] text-[#f8fafc]">
          {practitioner.heroCardYear}
        </p>
        <PillButton label="Let’s chat" href="#inquiry" />
      </div>
    </div>
  );
}

function DesktopHero({
  practitioner,
  heroBadges,
}: {
  practitioner: PractitionerProfile;
  heroBadges: readonly string[];
}) {
  const viewportWidth = useViewportWidth();
  const viewportHeight = useViewportHeight();
  const reducedMotion = useReducedMotion();
  const [marksVisible, setMarksVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMarksVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const { scale, frameHeight, innerHeight, contentTop } = computeHeroStage(
    viewportWidth,
    viewportHeight,
  );

  return (
    <section
      id="home"
      className="bg-[#f7f5f0]"
      style={{ padding: HERO_FRAME_INSET }}
    >
      <div
        className="relative overflow-hidden rounded-[24px] bg-[#0b1221]"
        style={{ height: frameHeight }}
      >
        <HeroBackground
          src={practitioner.heroBackgroundSrc}
          className="object-[center_36%]"
        />

        <div
          className="absolute left-1/2 top-0"
          style={{
            width: HERO_INNER_WIDTH,
            height: innerHeight,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {[106, 392, 678, 964, 1250].map((left, idx) => (
            <CrosshairPlusIcon
              key={left}
              className="absolute h-[24px] w-[24px] text-[#93c5fd] transition-transform duration-700 hover:rotate-90"
              style={{
                left,
                top: contentTop - 32,
                opacity: marksVisible || reducedMotion ? 1 : 0,
                transition: reducedMotion
                  ? undefined
                  : `opacity 900ms ease ${400 + 90 * idx}ms, transform 700ms`,
              }}
            />
          ))}

          <div
            className="flex items-center justify-between"
            style={{
              position: "absolute",
              left: 62,
              top: contentTop,
              width: 1288,
            }}
          >
            <div className="flex w-[440px] flex-col gap-[102px]">
              <Reveal>
                <div className="relative h-[132px] whitespace-nowrap">
                  <h1 className="text-[80px] font-semibold leading-[98px] tracking-[-5.6px] text-white">
                    {practitioner.wordmark}®
                  </h1>
                  <p className="absolute left-[152px] top-[98px] text-right text-[20px] leading-[30px] tracking-[-0.2px] text-[#f8fafc]">
                    {practitioner.heroSubtitle}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-[20px] leading-[30px] tracking-[-0.2px] text-white">
                  —{" "}
                  <span className="text-[#bfdbfe]">
                    {practitioner.heroStatementLead}
                  </span>{" "}
                  {practitioner.heroStatementBody}
                </p>
              </Reveal>
            </div>

            <div className="flex w-[290px] flex-col items-end gap-[28px]">
              <Reveal delay={150}>
                <div className="flex flex-col items-end gap-[8px]">
                  <MonogramStack items={heroBadges} tone="dark" />
                  <p className="whitespace-nowrap text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-[#f8fafc]">
                    {practitioner.heroBadgeLabel}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300} className="w-full">
                <HeroPortraitCard practitioner={practitioner} height={280} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHero({
  practitioner,
  heroBadges,
}: {
  practitioner: PractitionerProfile;
  heroBadges: readonly string[];
}) {
  return (
    <section
      id="home"
      className="flex flex-col bg-[#f7f5f0] px-[15px] py-[16px] md:h-[100svh] md:min-h-[600px] md:p-[30px]"
    >
      <div className="relative flex min-h-[815px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#0b1221] px-[16px] pb-[22px] pt-[118px] md:min-h-0 md:flex-1 md:px-[40px] md:pb-[40px] md:pt-[110px]">
        <HeroBackground
          src={practitioner.heroBackgroundSrc}
          className="object-[52%_38%]"
        />

        <div className="relative flex flex-col gap-[30px] md:gap-[40px] md:landscape:grid md:landscape:grid-cols-[1fr_290px] md:landscape:items-end md:landscape:gap-[32px]">
          <div className="flex flex-col items-end gap-[20px] md:items-start md:gap-[40px]">
            <Reveal className="self-stretch">
              <div className="relative mx-auto w-fit max-w-full whitespace-nowrap pb-[30px] md:mx-0">
                <h1 className="text-[clamp(50px,17vw,76px)] font-semibold leading-[1.12] tracking-[-0.065em] text-white md:text-[116px] md:leading-[124px] md:tracking-[-7.6px]">
                  {practitioner.wordmark}®
                </h1>
                <p className="absolute bottom-0 right-0 text-[15px] leading-[24px] tracking-[-0.18px] text-[#f8fafc] sm:text-[18px] sm:leading-[28px] md:text-[20px]">
                  {practitioner.heroSubtitle}
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[18px] leading-[28px] tracking-[-0.18px] text-white md:max-w-[420px] md:text-[20px] md:leading-[30px]">
                —{" "}
                <span className="text-[#bfdbfe]">
                  {practitioner.heroStatementLead}
                </span>{" "}
                {practitioner.heroStatementBody}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col items-end gap-[22px] md:ml-auto md:w-[340px] md:landscape:ml-0 md:landscape:w-full">
            <Reveal delay={200}>
              <div className="flex flex-col items-end gap-[8px]">
                <MonogramStack items={heroBadges} tone="dark" />
                <p className="whitespace-nowrap text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-[#f8fafc]">
                  {practitioner.heroBadgeLabel}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300} className="w-full">
              <HeroPortraitCard practitioner={practitioner} height={240} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection({
  practitioner,
  navigation,
  heroBadges,
}: {
  practitioner: PractitionerProfile;
  navigation: readonly NavItem[];
  heroBadges: readonly string[];
}) {
  return (
    <>
      <ShutterPreloader
        wordmark={practitioner.wordmark}
        tagline={practitioner.preloaderTagline}
      />
      <FloatingHeader
        wordmark={practitioner.wordmark}
        navigation={navigation}
      />
      <StageShell
        desktop={
          <DesktopHero practitioner={practitioner} heroBadges={heroBadges} />
        }
        mobile={
          <MobileHero practitioner={practitioner} heroBadges={heroBadges} />
        }
      />
    </>
  );
}
