import { describe, expect, it } from "vitest";
import { prepareInquiryDispatch } from "./inquiry";

describe("Inquiry domain seam", () => {
  const recipient = "cayaaproject2023@gmail.com";

  it("rejects empty or whitespace-only fields", () => {
    expect(
      prepareInquiryDispatch({ name: "", email: "recruiter@corp.id", message: "Hi" }, recipient),
    ).toEqual({
      ok: false,
      error: "Please fill in your name, e-mail, and message.",
    });

    expect(
      prepareInquiryDispatch({ name: "   ", email: "   ", message: "   " }, recipient),
    ).toEqual({
      ok: false,
      error: "Please fill in your name, e-mail, and message.",
    });
  });

  it("rejects malformed email addresses", () => {
    expect(
      prepareInquiryDispatch(
        { name: "Dina", email: "not-an-email", message: "Data Engineer opening" },
        recipient,
      ),
    ).toEqual({
      ok: false,
      error: "Please enter a valid e-mail address.",
    });

    expect(
      prepareInquiryDispatch(
        { name: "Dina", email: "dina@invalid", message: "Data Engineer opening" },
        recipient,
      ),
    ).toEqual({
      ok: false,
      error: "Please enter a valid e-mail address.",
    });
  });

  it("builds a properly encoded mailto URI for valid inquiries", () => {
    const result = prepareInquiryDispatch(
      {
        name: "  Budi Santoso  ",
        email: "  budi@enterprise.co.id ",
        message: "We have a Junior Data Engineer role & would love to chat.",
      },
      recipient,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.normalized).toEqual({
      name: "Budi Santoso",
      email: "budi@enterprise.co.id",
      message: "We have a Junior Data Engineer role & would love to chat.",
    });

    expect(result.mailtoHref).toBe(
      "mailto:cayaaproject2023@gmail.com?subject=Portfolio%20inquiry%20from%20Budi%20Santoso&body=We%20have%20a%20Junior%20Data%20Engineer%20role%20%26%20would%20love%20to%20chat.%0A%0A%E2%80%94%20Budi%20Santoso%20(budi%40enterprise.co.id)",
    );
  });
});
