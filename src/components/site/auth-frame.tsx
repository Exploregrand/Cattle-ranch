import { Woodcut } from "@/components/brand/woodcut";
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
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative hidden min-h-[600px] overflow-hidden rounded-[2.5rem] bg-clay lg:block">
            <div className="absolute left-1/2 top-[16%] size-[58%] -translate-x-1/2 rounded-full bg-gold-400/90" />
            <Woodcut species="cattle" ink="#1e1a16" paper="#b0502c" className="absolute inset-x-[14%] top-[12%] m-auto h-[62%]" />
            <p className="absolute bottom-10 left-10 right-10 font-display text-[2rem] leading-tight text-cream-50">
              Every animal, written down — from the day it arrives.
            </p>
          </div>
          <div className={wide ? "w-full" : "w-full max-w-md lg:py-10"}>
            <h1 className="font-display text-[2.4rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-[3rem]">{title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{body}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
