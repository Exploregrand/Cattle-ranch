"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Copies the update text (from the form's fields) for pasting into WhatsApp. */
export function CopyForWhatsApp({ formId }: { formId: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        const form = document.getElementById(formId) as HTMLFormElement | null;
        if (!form) return;
        const data = new FormData(form);
        await navigator.clipboard.writeText(`*${data.get("title")}*\n\n${data.get("body")}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy for WhatsApp"}
    </Button>
  );
}
