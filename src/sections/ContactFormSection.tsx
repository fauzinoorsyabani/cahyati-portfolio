import { type FormEvent, useState } from "react";
import { prepareInquiryDispatch } from "../domain/inquiry";
import type { PractitionerProfile } from "../domain/portfolio";
import { Reveal } from "../primitives/Motion";
import { ScaledStage, StageShell } from "../primitives/Stage";

const INPUT_CLASS =
  "w-full rounded-[10px] border border-solid border-[#dfd9cc] bg-[#f7f5f0] px-[14px] text-[16px] leading-[22px] tracking-[-0.16px] text-[#0f172a] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#64748b] hover:border-[#c4bdb0] focus:border-[#2563eb] focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]";

const LABEL_CLASS =
  "text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-[#0f172a]";

function defaultOpenMailto(href: string) {
  window.location.href = href;
}

function PractitionerBadge({
  practitioner,
}: {
  practitioner: PractitionerProfile;
}) {
  return (
    <div className="flex items-center gap-[20px]">
      <div className="group relative h-[73px] w-[79px] overflow-hidden rounded-[8px] bg-[#13203b]">
        <img
          src={practitioner.portraitSrc}
          alt={practitioner.name}
          className="absolute inset-0 h-full w-full object-cover object-[center_44%] transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-[18px] font-semibold leading-[28px] tracking-[-0.18px] text-[#0f172a]">
          {practitioner.name}
        </p>
        <p className="text-[16px] leading-[22px] tracking-[-0.16px] text-[#475569]">
          {practitioner.roleShort}
        </p>
      </div>
    </div>
  );
}

function ContactHeading({ big }: { big: boolean }) {
  return big ? (
    <h2 className="text-center text-[54px] font-semibold leading-[68px] tracking-[-2.16px] text-[#0f172a]">
      Have a role or data project?
      <br />
      <span className="font-editorial text-[#1d4ed8] text-[70px] leading-[80px] tracking-[-2.8px]">
        Let’s build together.
      </span>
    </h2>
  ) : (
    <h2 className="text-center text-[32px] font-semibold leading-[40px] tracking-[-1.28px] text-[#0f172a] md:text-[48px] md:leading-[58px]">
      Have a role or data project?
      <br />
      <span className="font-editorial text-[#1d4ed8] text-[40px] leading-[48px] tracking-[-1.6px] md:text-[60px] md:leading-[68px]">
        Let’s build together.
      </span>
    </h2>
  );
}

function InquiryCard({
  practitioner,
  onOpenMailto,
}: {
  practitioner: PractitionerProfile;
  onOpenMailto: (href: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = prepareInquiryDispatch(
      {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      },
      practitioner.email,
    );

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    onOpenMailto(result.mailtoHref);
    setSubmitted(true);
  };

  return (
    <div className="w-full rounded-[16px] bg-white p-[30px] max-[767px]:p-[20px]">
      <div className="flex flex-col items-center gap-[8px] text-center">
        <p className="text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-[#475569]">
          E-mail me at
        </p>
        <a
          href={`mailto:${practitioner.email}`}
          className="link-underline-reveal break-all text-[26px] font-medium leading-[36px] tracking-[-0.78px] text-[#0f172a] max-[767px]:text-[20px] max-[767px]:leading-[28px]"
        >
          {practitioner.email}
        </a>
      </div>

      <div className="my-[30px] h-px bg-[#e8e3d9]" />

      {submitted ? (
        <div className="flex flex-col items-center gap-[10px] py-[40px] text-center">
          <p className="text-[26px] font-medium leading-[36px] tracking-[-0.78px] text-[#0f172a]">
            Thank you!
          </p>
          <p className="max-w-[420px] text-[16px] leading-[22px] tracking-[-0.16px] text-[#475569]">
            Your mail app should open with your message ready for{" "}
            {practitioner.name}. I’ll get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="link-underline-reveal mt-[10px] cursor-pointer text-[16px] font-medium text-[#0f172a]"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-[24px]"
        >
          <p className="text-[16px] leading-[22px] tracking-[-0.16px] text-[#475569]">
            Or simply leave your details, and I’ll respond as soon as possible.
          </p>

          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[35px]">
            <label className="flex flex-col gap-[10px]" htmlFor="cf-name">
              <span className={LABEL_CLASS}>Name</span>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Budi Santoso"
                className={`${INPUT_CLASS} h-[44px]`}
              />
            </label>

            <label className="flex flex-col gap-[10px]" htmlFor="cf-email">
              <span className={LABEL_CLASS}>Email</span>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="budi@company.co.id"
                className={`${INPUT_CLASS} h-[44px]`}
              />
            </label>
          </div>

          <label className="flex flex-col gap-[10px]" htmlFor="cf-message">
            <span className={LABEL_CLASS}>Message</span>
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              placeholder="Tell me about the role, dataset challenge, or collaboration"
              className={`${INPUT_CLASS} h-[110px] resize-y py-[11px]`}
            />
          </label>

          {error && (
            <p
              role="alert"
              className="-mt-[8px] text-[14px] leading-[20px] text-[#c0392b]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="group relative flex h-[52px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[999px] bg-[#2563eb] text-[16px] font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] active:scale-[0.98]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-[101%] rounded-[999px] bg-[#1d4ed8] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative block h-[22px] overflow-hidden leading-[22px]">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                Send Message
              </span>
              <span
                aria-hidden="true"
                className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
              >
                Send Message
              </span>
            </span>
          </button>
        </form>
      )}
    </div>
  );
}

export function ContactFormSection({
  practitioner,
  onOpenMailto = defaultOpenMailto,
}: {
  practitioner: PractitionerProfile;
  onOpenMailto?: (href: string) => void;
}) {
  const desktop = (
    <ScaledStage id="inquiry" height={900} className="bg-[#f7f5f0]">
      <div className="relative mx-auto flex w-[770px] flex-col items-center pb-[120px] pt-[80px]">
        <Reveal>
          <PractitionerBadge practitioner={practitioner} />
        </Reveal>
        <Reveal delay={200} className="mt-[40px] w-[1000px]">
          <ContactHeading big />
        </Reveal>
        <Reveal delay={300} className="mt-[40px] w-full">
          <InquiryCard
            practitioner={practitioner}
            onOpenMailto={onOpenMailto}
          />
        </Reveal>
      </div>
    </ScaledStage>
  );

  const mobile = (
    <section
      id="inquiry"
      className="scroll-mt-[84px] bg-[#f7f5f0] px-[16px] pb-[60px] pt-[40px] md:px-[40px] md:pb-[80px] md:pt-[64px]"
    >
      <div className="mx-auto flex max-w-[770px] flex-col items-center">
        <Reveal>
          <PractitionerBadge practitioner={practitioner} />
        </Reveal>
        <Reveal delay={150} className="mt-[30px]">
          <ContactHeading big={false} />
        </Reveal>
        <Reveal delay={250} className="mt-[30px] w-full">
          <InquiryCard
            practitioner={practitioner}
            onOpenMailto={onOpenMailto}
          />
        </Reveal>
      </div>
    </section>
  );

  return <StageShell desktop={desktop} mobile={mobile} />;
}
