import type { NavItem, PractitionerProfile } from "../domain/portfolio";
import {
  ArrowUpRightIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "../primitives/Icons";
import { RefractiveWordmark } from "../primitives/Interactive";
import { Reveal } from "../primitives/Motion";
import {
  absBox,
  ScaledStage,
  StageShell,
  useViewportWidth,
} from "../primitives/Stage";

const MUTED_LABEL =
  "text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-[#767676]";
const LINK_VALUE =
  "text-[18px] font-semibold leading-[28px] tracking-[-0.18px] text-[#f2f2f2]";

function SocialLinks({ practitioner }: { practitioner: PractitionerProfile }) {
  const links = [
    {
      name: "LinkedIn",
      href: practitioner.linkedinUrl,
      external: true,
      icon: <LinkedInIcon className="h-[22px] w-[22px]" />,
    },
    {
      name: "WhatsApp",
      href: practitioner.whatsappUrl,
      external: true,
      icon: <WhatsAppIcon className="h-[23px] w-[23px]" />,
    },
    {
      name: "Email",
      href: `mailto:${practitioner.email}`,
      external: false,
      icon: <MailIcon className="h-[22px] w-[22px]" />,
    },
    {
      name: "Back to top",
      href: "#home",
      external: false,
      icon: <ArrowUpRightIcon className="h-[22px] w-[22px]" />,
    },
  ];

  return (
    <div className="flex items-center gap-[16px]">
      {links.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          aria-label={item.name}
          className="flex h-[48px] w-[48px] items-center justify-center rounded-[27px] bg-white text-[#010101] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[4px] hover:shadow-[0_10px_24px_-8px_rgba(255,255,255,0.45)] active:scale-95"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

function MobileWordmark({ letters }: { letters: readonly string[] }) {
  const scale = useViewportWidth() / 1320;
  return (
    <div
      className="relative mx-[-16px] mt-[40px] overflow-hidden md:mx-[-40px]"
      style={{ height: 313.6 * scale }}
    >
      <div
        className="absolute left-[-6px] top-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <RefractiveWordmark letters={letters} />
      </div>
    </div>
  );
}

export function FooterSection({
  practitioner,
  navigation,
}: {
  practitioner: PractitionerProfile;
  navigation: readonly NavItem[];
}) {
  const desktop = (
    <ScaledStage
      id="contact"
      as="footer"
      height={988}
      className="bg-[#010101]"
    >
      <Reveal style={absBox(135, 82, 540)}>
        <p className="text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#f2f2f2]">
          Let’s turn your data into{" "}
          <span className="font-editorial text-[70px] leading-[80px] tracking-[-2.8px]">
            clear impact
          </span>
        </p>
      </Reveal>

      <Reveal delay={100} style={absBox(135, 317, 360)}>
        <div className="flex flex-col gap-[14px]">
          <p className={MUTED_LABEL}>Email</p>
          <a
            href={`mailto:${practitioner.email}`}
            className={`${LINK_VALUE} link-underline-reveal w-fit`}
          >
            {practitioner.email}
          </a>
        </div>
      </Reveal>

      <Reveal delay={200} style={absBox(556, 317, 308)}>
        <div className="flex flex-col gap-[14px]">
          <p className={MUTED_LABEL}>Call or WhatsApp</p>
          <a
            href={practitioner.phoneHref}
            className={`${LINK_VALUE} link-underline-reveal w-fit`}
          >
            {practitioner.phoneDisplay}
          </a>
        </div>
      </Reveal>

      <Reveal delay={300} style={absBox(937, 317, 308)}>
        <div className="flex flex-col gap-[14px]">
          <p className={MUTED_LABEL}>Connect</p>
          <SocialLinks practitioner={practitioner} />
        </div>
      </Reveal>

      <div className="h-px bg-[#2c323b]" style={absBox(135, 458, 1170)} />

      <Reveal delay={100} style={absBox(135, 518, 308)}>
        <div className="flex flex-col gap-[10px]">
          <p className={MUTED_LABEL}>Menu</p>
          <div className="flex flex-wrap gap-x-[24px] gap-y-[8px]">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${LINK_VALUE} link-underline-reveal w-fit`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} style={absBox(937, 538)}>
        <p className={`${LINK_VALUE} whitespace-nowrap`}>
          © 2026 {practitioner.wordmark} · {practitioner.location}
        </p>
      </Reveal>

      <div style={absBox(0, 674.4)}>
        <RefractiveWordmark letters={practitioner.wordmarkLetters} />
      </div>
    </ScaledStage>
  );

  const mobile = (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#010101] px-[16px] pt-[60px] md:px-[40px] md:pt-[80px]"
    >
      <Reveal>
        <p className="max-w-[343px] text-[32px] font-semibold leading-[40px] tracking-[-1.28px] text-[#f2f2f2] md:max-w-[540px] md:text-[48px] md:leading-[58px]">
          Let’s turn your data into{" "}
          <span className="font-editorial text-[40px] leading-[40px] tracking-[-1.6px] md:text-[60px] md:leading-[68px]">
            clear impact
          </span>
        </p>
      </Reveal>

      <div className="mt-[40px] grid grid-cols-1 gap-[30px] md:mt-[56px] md:grid-cols-3 md:gap-[24px]">
        <Reveal>
          <div className="flex flex-col gap-[10px]">
            <p className={MUTED_LABEL}>Email</p>
            <a
              href={`mailto:${practitioner.email}`}
              className={`${LINK_VALUE} link-underline-reveal w-fit break-all`}
            >
              {practitioner.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-[10px]">
            <p className={MUTED_LABEL}>Call or WhatsApp</p>
            <a
              href={practitioner.phoneHref}
              className={`${LINK_VALUE} link-underline-reveal w-fit`}
            >
              {practitioner.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col gap-[14px]">
            <p className={MUTED_LABEL}>Connect</p>
            <SocialLinks practitioner={practitioner} />
          </div>
        </Reveal>
      </div>

      <div className="my-[40px] h-px bg-[#2c323b]" />

      <div className="grid grid-cols-1 gap-[40px] md:grid-cols-3 md:gap-[24px]">
        <Reveal>
          <div className="flex flex-col gap-[14px]">
            <p className={MUTED_LABEL}>Menu</p>
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${LINK_VALUE} link-underline-reveal w-fit`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="md:col-start-3">
          <p className={LINK_VALUE}>
            © 2026 {practitioner.wordmark} · {practitioner.location}
          </p>
        </Reveal>
      </div>

      <MobileWordmark letters={practitioner.wordmarkLetters} />
    </footer>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
