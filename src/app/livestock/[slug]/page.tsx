import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import { wrap } from "@/components/sections";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { farmPhotos } from "@/content/farm-story";
import { photos } from "@/content/photos";
import { getSpeciesPage, speciesPages } from "@/content/species";

// Block on params so an unknown animal returns a real 404 (dynamicParams isn't available with
// Cache Components). The three known animals are still prerendered by generateStaticParams.
export const instant = false;

export function generateStaticParams() {
  return speciesPages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/livestock/[slug]">): Promise<Metadata> {
  const page = getSpeciesPage((await params).slug);
  if (!page) return {};
  return { title: page.name, description: `${page.intro} Breeds, feeding, care and how to own ${page.singular} with Herd & Field.` };
}

async function SpeciesContent({ params }: { params: Promise<{ slug: string }> }) {
  const page = getSpeciesPage((await params).slug);
  if (!page) notFound();
  const photo = page.farmPhoto ? { ...farmPhotos[page.farmPhoto], position: "50% 30%" } : photos[page.photo];
  const others = speciesPages.filter((s) => s.slug !== page.slug);

  return (
    <>
      <nav aria-label="Breadcrumb" className={`${wrap} pt-8`}>
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-ink-muted">
          <li>
            <Link href="/livestock" className="hover:text-ink">
              Livestock
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <li aria-current="page" className="text-ink">
            {page.name}
          </li>
        </ol>
      </nav>

      <section className={`${wrap} grid items-end gap-10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
        <div>
          <p className="eyebrow">
            {page.name} · {page.swahili}
          </p>
          <h1 className="t-display mt-5 max-w-[14ch]">{page.headline}</h1>
          <p className="t-lead mt-6 max-w-xl text-ink-soft">{page.intro}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-[0.875rem] text-ink-soft">
            <span className="size-1.5 rounded-full bg-ink-muted" aria-hidden="true" />
            Not yet available. Opening after launch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/early-access?interest=${page.slug}`}>Register interest in {page.name.toLowerCase()}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-it-works">How ownership works</Link>
            </Button>
          </div>
        </div>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
          <figcaption className="mt-3 text-[0.8125rem] text-ink-muted">{page.farmPhoto ? "On our farm in Isinya." : "Breed photograph for illustration."}</figcaption>
        </figure>
      </section>

      <section className={`${wrap} section-y`}>
        <p className="eyebrow">Why {page.name.toLowerCase()}</p>
        <dl className="mt-8 grid border-t border-ink/15 md:grid-cols-3">
          {page.why.map((w) => (
            <div key={w.title} className="border-b border-ink/10 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
              <dt className="t-h3">{w.title}</dt>
              <dd className="t-body mt-2 text-ink-soft">{w.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-border bg-white">
        <div className={`${wrap} section-y`}>
          <p className="eyebrow">Breeds</p>
          <h2 className="t-h1 mt-4 max-w-[20ch]">Breeds we&apos;re preparing to raise.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {page.breeds.map((b) => (
              <article key={b.name} className="rounded-xl border border-border p-6 sm:p-7">
                <h3 className="t-h2">{b.name}</h3>
                <p className="t-body mt-3 text-ink-soft">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} section-y grid gap-12 lg:grid-cols-2 lg:gap-20`}>
        <div>
          <p className="eyebrow">Feeding</p>
          <h2 className="t-h2 mt-4">Fed from our own farms.</h2>
          <p className="t-body mt-4 text-ink-soft">{page.feeding}</p>
          <Link href="/farm" className="label-caps mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-ink hover:underline">
            About our farms <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div>
          <p className="eyebrow">Care and records</p>
          <h2 className="t-h2 mt-4">Looked after, and written down.</h2>
          <ul className="mt-5 border-t border-ink/15">
            {page.care.map((c) => (
              <li key={c} className="flex gap-3 border-b border-ink/10 py-3.5 text-[0.9375rem] leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className={`${wrap} section-y`}>
          <p className="eyebrow">Ways to own {page.singular === "cattle" ? "cattle" : `a ${page.singular}`}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {page.ways.map((w) => (
              <Link key={w.title} href={w.href} className="group flex items-start justify-between gap-6 rounded-xl border border-border p-6 transition-colors hover:border-ink/40 sm:p-7">
                <div>
                  <h3 className="t-h2">{w.title}</h3>
                  <p className="t-body mt-2 text-ink-soft">{w.body}</p>
                </div>
                <ArrowRight className="mt-2 size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/15 pt-6">
            <span className="eyebrow">Other animals</span>
            {others.map((o) => (
              <Link key={o.slug} href={`/livestock/${o.slug}`} className="t-h3 underline-offset-4 hover:underline">
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function SpeciesPage({ params }: PageProps<"/livestock/[slug]">) {
  const { slug } = await params;
  if (!getSpeciesPage(slug)) notFound();
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-cream-50 text-ink">
        <SpeciesContent params={params} />
      </main>
      <SiteFooter />
    </>
  );
}
