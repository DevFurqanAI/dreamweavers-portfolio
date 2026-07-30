import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${siteConfig.name} handles contact-form information and website measurement data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="text-link">← Return home</Link>
      <p className="eyebrow"><span>Privacy notice</span><i /></p>
      <h1>Privacy</h1>
      <p>
        The contact form collects the information you choose to submit so Dream Weavers can review and respond to your inquiry.
      </p>
      <p>
        The production form provider, retention period, analytics configuration and deletion process must be confirmed before public launch. Until those details are approved, this page remains a launch-ready draft rather than legal advice.
      </p>
      <p>
        Privacy questions can be sent to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </main>
  );
}
