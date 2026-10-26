import type { Metadata } from "next";
import { Suspense } from "react";

import { EarlyAccessForm } from "@/app/early-access/early-access-form";
import { AuthFrame } from "@/components/site/auth-frame";

export const metadata: Metadata = {
  title: "Early access",
  description: "Register your interest in Cattle Buy's future sheep, goat, cattle and Qurbani programmes.",
};

export default function EarlyAccessPage() {
  return (
    <AuthFrame
      wide
      title="Register for early access"
      body="Livestock programmes have not launched yet. Tell us what interests you and we'll contact you when they open — no payment, no commitment."
    >
      <Suspense>
        <EarlyAccessForm />
      </Suspense>
    </AuthFrame>
  );
}
