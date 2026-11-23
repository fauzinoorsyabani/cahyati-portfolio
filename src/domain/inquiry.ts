export interface InquiryInput {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface ValidInquiry {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export type InquiryDispatchResult =
  | {
      readonly ok: true;
      readonly normalized: ValidInquiry;
      readonly mailtoHref: string;
    }
  | {
      readonly ok: false;
      readonly error: string;
    };

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function prepareInquiryDispatch(
  input: InquiryInput,
  recipientEmail: string,
): InquiryDispatchResult {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name || !email || !message) {
    return {
      ok: false,
      error: "Please fill in your name, e-mail, and message.",
    };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      error: "Please enter a valid e-mail address.",
    };
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  return {
    ok: true,
    normalized: { name, email, message },
    mailtoHref: `mailto:${recipientEmail}?subject=${subject}&body=${body}`,
  };
}
