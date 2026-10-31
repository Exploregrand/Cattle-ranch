import type { Metadata } from "next";
import Link from "next/link";

import { wrap } from "@/components/sections";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Herd & Field collects, uses and protects your personal information.",
};

const sections = [
  {
    title: "What we collect",
    body: [
      "When you register interest as a customer: your name, mobile number, optional email, optional town or county, the animals or services you're interested in, and any message you send.",
      "When you register investor interest: your name, mobile number, optional email, county, the type of investor you are, what interests you, an optional indicative amount, and any message you send.",
      "When you have an account (after launch): your sign-in email and the records of animals you own.",
    ],
  },
  {
    title: "Why we collect it",
    body: [
      "To contact you about the programmes, Qurbani service or investment discussions you asked about, and to manage your account and animals once programmes open. We do not sell your information or use it for unrelated marketing.",
    ],
  },
  {
    title: "Our basis for using it",
    body: ["Your consent, which you give when you submit a form. You can withdraw it at any time and we will stop contacting you."],
  },
  {
    title: "Who can see it",
    body: [
      "Only authorised members of the Herd & Field team. Our website and database are run by service providers who store data on our behalf under their own security terms. Customer and investor records are protected by access controls so that each person sees only what they are permitted to.",
    ],
  },
  {
    title: "How long we keep it",
    body: ["Registration details are kept while we are preparing to launch and for as long as you want to hear from us. Ask us and we will delete them."],
  },
  {
    title: "Your rights",
    body: [
      "Under Kenya's Data Protection Act, 2019 you can ask to see the personal information we hold about you, have it corrected or deleted, object to how we use it, and withdraw your consent. You can also complain to the Office of the Data Protection Commissioner.",
    ],
  },
];

export default function PrivacyPage() {
  const reach = [contact.email && `email ${contact.email}`, contact.phone && `call ${contact.phone}`].filter(Boolean).join(" or ");
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-cream-50 text-ink">
        <section className={`${wrap} section-y max-w-4xl`}>
          <p className="eyebrow">Privacy notice</p>
          <h1 className="t-h1 mt-4">How we handle your information.</h1>
          <p className="t-lead mt-6 text-ink-soft">
            Herd & Field, a Tangama Farm company (Isinya, Kajiado County), collects only what we need to contact you and, after launch, to
            keep your animal&apos;s records.
          </p>
          <div className="mt-12 border-t border-ink/15">
            {sections.map((s) => (
              <section key={s.title} className="grid gap-3 border-b border-ink/10 py-7 md:grid-cols-[14rem_1fr] md:gap-10">
                <h2 className="t-h3">{s.title}</h2>
                <div className="space-y-3">
                  {s.body.map((p) => (
                    <p key={p} className="t-body text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            <section className="grid gap-3 py-7 md:grid-cols-[14rem_1fr] md:gap-10">
              <h2 className="t-h3">Contact us</h2>
              <p className="t-body text-ink-soft">
                {reach
                  ? `To make a request, ${reach}.`
                  : "To make a request, reply to any message we have sent you, or register again with a note and we will respond."}{" "}
                <Link href="/early-access" className="text-ink underline underline-offset-4">
                  Register interest
                </Link>
              </p>
            </section>
          </div>
          <p className="mt-8 text-[0.8125rem] text-ink-muted">Last updated 1 November 2026. Draft pending legal review.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
