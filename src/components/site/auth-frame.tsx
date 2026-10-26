import { Landscape } from "@/components/brand/landscape";
import { SiteHeader } from "@/components/site/site-header";

/** Split layout for short, focused flows (sign in, early access). */
export function AuthFrame({
  title,
  body,
  children,
  wide = false,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-cream-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative hidden min-h-[560px] overflow-hidden rounded-[1.75rem] lg:block">
            <Landscape scene="dusk" id="auth-frame" className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
            <p className="absolute bottom-8 left-8 right-8 font-display text-2xl leading-snug text-cream-50">
              Transparent records for every animal, from intake to outcome.
            </p>
          </div>
          <div className={wide ? "w-full" : "w-full max-w-md lg:py-10"}>
            <h1 className="font-display text-[2rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-[2.5rem]">
              {title}
            </h1>
            <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
