import type { CSSProperties } from "react";

export function CrosshairPlusIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M12 4.5V19.5M4.5 12H19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NodeApertureIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14.31 8L20.05 17.94M9.69 8H21.17M7.38 12L13.12 2.06M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12L10.88 21.94"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WatermarkApertureSvg({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 664 664"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <circle
        cx="332"
        cy="332"
        r="298"
        stroke="#030303"
        strokeOpacity="0.06"
        strokeWidth="18"
      />
      <circle
        cx="332"
        cy="332"
        r="128"
        stroke="#030303"
        strokeOpacity="0.055"
        strokeWidth="12"
      />
      <path
        d="M396 221L555 496M268 221H585M204 332L363 57M268 443L109 168M396 443H79M460 332L301 607"
        stroke="#030303"
        strokeOpacity="0.055"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RegisteredMarkIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M6.2 11.2V4.8h2.3c1.3 0 2 .7 2 1.8 0 .9-.5 1.5-1.3 1.7l1.5 2.9H9.5L8.2 8.5H7.3v2.7H6.2Zm1.1-3.6h1.2c.7 0 1-.4 1-.9 0-.6-.3-.9-1-.9H7.3v1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlaySnapshotIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 74 74"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="37"
        cy="37"
        r="35.5"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.5"
      />
      <circle cx="37" cy="37" r="24" fill="#ffffff" />
      <path d="M33.5 29.8L45.2 37L33.5 44.2V29.8Z" fill="#030303" />
    </svg>
  );
}

export function StarRowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 82 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {[7, 24, 41, 58, 75].map((cx) => (
        <path
          key={cx}
          d={`M${cx} 1.2l1.62 3.45 3.8.52-2.77 2.65.68 3.78L${cx} 9.78l-3.33 1.82.68-3.78-2.77-2.65 3.8-.52L${cx} 1.2z`}
          fill="#030303"
        />
      ))}
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12H19M13.5 6.5L19 12L13.5 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.21 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.61V19.5H20.44V13.02Z" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4.5 7.5L12 13L19.5 7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3.5C7.31 3.5 3.5 7.31 3.5 12C3.5 13.59 3.94 15.08 4.71 16.36L3.6 20.4L7.76 19.31C9 20.01 10.45 20.5 12 20.5C16.69 20.5 20.5 16.69 20.5 12C20.5 7.31 16.69 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 9.1C9.2 8.7 8.9 8.7 8.7 8.7H8.2C8 8.7 7.6 8.8 7.4 9.1C7.1 9.4 6.5 10 6.5 11.2C6.5 12.4 7.4 13.6 7.5 13.7C7.6 13.9 9.2 16.4 11.7 17.4C13.7 18.2 14.2 18 14.6 18C15.1 17.9 16.1 17.4 16.3 16.8C16.5 16.2 16.5 15.7 16.4 15.6C16.4 15.5 16.1 15.4 15.8 15.2C15.5 15.1 14.3 14.5 14 14.4C13.8 14.3 13.6 14.3 13.4 14.5C13.2 14.8 12.7 15.4 12.6 15.5C12.4 15.7 12.3 15.7 12 15.6C11.7 15.4 10.8 15.1 9.7 14.1C8.8 13.3 8.3 12.4 8.1 12.1C8 11.8 8.1 11.7 8.2 11.5C8.4 11.4 8.5 11.2 8.7 11C8.8 10.8 8.9 10.7 9 10.5C9.1 10.3 9 10.1 8.9 10L9.4 9.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
