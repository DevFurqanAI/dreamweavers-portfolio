"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type Status = { type: "idle" | "loading" | "success" | "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const renderedAt = useRef<number | null>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      startedAt: renderedAt.current,
    };
    setStatus({ type: "loading", message: "Preparing your inquiry…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message || "The message could not be delivered.");
      form.reset();
      setStatus({ type: "success", message: payload.message || "Your inquiry has been sent." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "The message could not be delivered.";
      setStatus({ type: "error", message });
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required suppressHydrationWarning />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" maxLength={160} required suppressHydrationWarning />
        </label>
      </div>
      <div className="form-grid">
        <label>
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" maxLength={100} suppressHydrationWarning />
        </label>
        <label>
          <span>Project type</span>
          <select name="projectType" defaultValue="" suppressHydrationWarning>
            <option value="" disabled>Select an area</option>
            <option>AI & automation</option>
            <option>ERP / CRM software</option>
            <option>E-commerce</option>
            <option>Web or mobile product</option>
            <option>Marketing & lead generation</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label>
        <span>About the project</span>
        <textarea
          name="message"
          minLength={20}
          maxLength={2000}
          required
          placeholder="What are you building, what needs to change, and what outcome matters?"
          suppressHydrationWarning
        />
      </label>
      <label className="contact-form__consent">
        <input name="privacyConsent" type="checkbox" required suppressHydrationWarning />
        <span>I agree that Dream Weavers may use these details to review and respond to this inquiry. Read the <Link href="/privacy">privacy notice</Link>.</span>
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </label>
      <div className="contact-form__footer">
        <button
          className="button button--solid"
          type="submit"
          disabled={status.type === "loading"}
          data-magnetic
          suppressHydrationWarning
        >
          <span>{status.type === "loading" ? "Sending" : "Start a project"}</span>
          <i aria-hidden="true">↗</i>
        </button>
        <p className={`form-status is-${status.type}`} role="status" aria-live="polite">
          {status.message || "Delivery activates after CONTACT_WEBHOOK_URL is configured."}
        </p>
      </div>
    </form>
  );
}
