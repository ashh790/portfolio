import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "../../data/profile";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// NextRequest.json()/.text() crash on this project's pinned Next.js version when run
// under newer Node.js runtimes (a mismatch between Next 13.2's bundled fetch polyfill
// and Node's native one: "Cannot read private member #state..."). Reading the body
// stream manually sidesteps the broken Body-mixin methods entirely.
async function readJsonBody(request: NextRequest): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;

  const decoder = new TextDecoder();
  let raw = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += decoder.decode(value, { stream: true });
  }

  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, message } = body as Record<string, unknown>;

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (
    firstName.length > MAX_FIELD_LENGTH ||
    lastName.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const { SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER/SMTP_PASS are not configured.");
    return NextResponse.json({ error: "Email sending isn't configured yet. Please email directly instead." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const safeFirstName = escapeHtml(firstName.trim());
  const safeLastName = escapeHtml(lastName.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

  try {
    await transporter.sendMail({
      from: `"${firstName.trim()} ${lastName.trim()}" <${SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || profile.email,
      replyTo: email.trim(),
      subject: `Portfolio contact from ${firstName.trim()} ${lastName.trim()}`,
      text: `From: ${firstName.trim()} ${lastName.trim()} (${email.trim()})\n\n${message.trim()}`,
      html: `<p><strong>From:</strong> ${safeFirstName} ${safeLastName} (${safeEmail})</p><p>${safeMessage}</p>`,
    });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return NextResponse.json({ error: "Failed to send your message. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
