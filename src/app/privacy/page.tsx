import type { Metadata } from "next";
import Link from "next/link";
import {
  allowIndexing,
  privacyPolicyApproved,
  siteConfig,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${siteConfig.name} handles contact-form information and website measurement data.`,
  alternates: { canonical: "/privacy" },
  robots:
    allowIndexing && privacyPolicyApproved
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="text-link">← Return home</Link>
      <p className="eyebrow"><span>Privacy notice</span><i /></p>
      <h1>Privacy</h1>

      <h2>Information you submit</h2>
      <p>
        The project inquiry form may collect your name, work email, company, project type and the message you choose to provide. Please do not submit passwords, payment details, identity documents or other sensitive information through the form.
      </p>

      <h2>How the information is used</h2>
      <p>
        Dream Weavers uses inquiry information to review your request, contact you about the proposed work and maintain reasonable records of the conversation. When contact delivery is enabled, the submission is sent to the private provider configured by Dream Weavers.
      </p>

      <h2>Website measurement</h2>
      <p>
        The site can report performance measurements such as page path, loading speed and interaction timing to a configured measurement endpoint. Contact-form contents are not included in those performance reports.
      </p>

      <h2>Retention and requests</h2>
      <p>
        Final retention periods and provider-specific terms must be confirmed by Dream Weavers before this notice is approved for public indexing. You may request access, correction or deletion by emailing <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </main>
  );
}
