import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[2rem] font-medium leading-[1.08] tracking-[-0.025em] text-forest-950 text-balance sm:text-[2.6rem]">
        {title}
      </h2>
      {body && <p className="mt-4 text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">{body}</p>}
    </div>
  );
}
