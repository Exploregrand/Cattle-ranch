import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { SignInForm } from "@/app/sign-in/sign-in-form";
import { AuthFrame } from "@/components/site/auth-frame";
import { Button } from "@/components/ui/button";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  const configured = getSupabaseConfig() !== null;
  return (
    <AuthFrame
      title="Customer sign in"
      body={
        configured
          ? "For customers with livestock under Tangama management. We'll email you a secure sign-in link."
          : "Customer accounts open when livestock programmes launch. Until then, you can explore the dashboard with sample data."
      }
    >
      {configured ? (
        <Suspense>
          <SignInForm />
        </Suspense>
      ) : (
        <div className="flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href="/demo">View the dashboard demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/early-access">Register for early access</Link>
          </Button>
        </div>
      )}
    </AuthFrame>
  );
}
