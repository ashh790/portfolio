"use client";
import { FormEvent, useState } from "react";
import { profile } from "../data/profile";

const inputClass =
  "w-full bg-white px-4 py-3.5 text-[13px] text-[#111] outline-none placeholder:text-[#777] focus:ring-2 focus:ring-[#d92525]";

type Status = "idle" | "sending" | "success" | "error";

const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("Thanks for reaching out! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-[#0b0b0b] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[40px] font-extrabold leading-tight text-white md:text-[52px]">
              Lets work together on your
            </h2>
            <h2 className="text-[40px] font-extrabold leading-tight text-[#9a9a9a] md:text-[52px]">
              next project
            </h2>
            <p className="mt-5 max-w-[420px] text-[12px] text-[#6f6f6f]">
              Collaboration is key! Let&apos;s join forces and combine our skills to tackle your next project with a powerful
              synergy that guarantees success.
            </p>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block self-start bg-[#d92525] px-8 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#a51b1b] md:self-auto"
          >
            Contact
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-16 flex max-w-[420px] flex-col gap-4" id="contact-form">
          <h2 className="mb-2 text-center text-[30px] font-extrabold text-white">
            I&apos;d love to hear from you!!
          </h2>

          <label htmlFor="contact-firstName" className="sr-only">
            First Name
          </label>
          <input id="contact-firstName" type="text" name="firstName" placeholder="First Name" required className={inputClass} />

          <label htmlFor="contact-lastName" className="sr-only">
            Last Name
          </label>
          <input id="contact-lastName" type="text" name="lastName" placeholder="Last Name" required className={inputClass} />

          <label htmlFor="contact-email" className="sr-only">
            E-Mail
          </label>
          <input id="contact-email" type="email" name="email" placeholder="E-Mail" required className={inputClass} />

          <label htmlFor="contact-message" className="sr-only">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Message..."
            rows={6}
            required
            className={`${inputClass} resize-y`}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-[#d92525] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#a51b1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
          <p
            role="status"
            className={`min-h-[18px] text-center text-[12px] ${status === "error" ? "text-[#d92525]" : "text-[#aab4c8]"}`}
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
