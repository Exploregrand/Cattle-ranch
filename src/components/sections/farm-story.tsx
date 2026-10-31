import Image from "next/image";

import { wrap } from "@/components/sections";
import { farmPhotos, organicPractices, plantingStory } from "@/content/farm-story";

export function OrganicPractices() {
  return (
    <section className={`${wrap} section-y`}>
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="eyebrow">How we farm</p>
          <h2 className="t-h1 mt-4 max-w-[18ch]">Organic practices, from the soil up.</h2>
        </div>
        <p className="t-body max-w-sm text-ink-soft md:justify-self-end">
          Good feed starts with healthy soil. What our animals give back goes into the ground that feeds them.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
        {organicPractices.map((p) => {
          const photo = farmPhotos[p.photo];
          return (
            <article key={p.title} className="overflow-hidden rounded-xl border border-border bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="t-h3">{p.title}</h3>
                <p className="t-body mt-2 text-ink-soft">{p.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function PlantingStory() {
  return (
    <section className="border-y border-border bg-white">
      <div className={`${wrap} section-y`}>
        <p className="eyebrow">This planting season</p>
        <h2 className="t-h1 mt-4 max-w-[18ch]">From bare soil to green rows.</h2>
        <ol className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {plantingStory.map((s, i) => {
            const photo = farmPhotos[s.photo];
            return (
              <li key={s.step}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
                </div>
                <p className="eyebrow mt-4">
                  {String(i + 1).padStart(2, "0")} · {s.step}
                </p>
                <p className="t-h3 mt-1.5">{s.title}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** The farm's most dedicated worker. */
export function FarmCatCard() {
  return (
    <section className={`${wrap} section-y`}>
      <article className="grid overflow-hidden rounded-xl border border-border bg-white md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[440px]">
          <Image src={farmPhotos.cat.src} alt={farmPhotos.cat.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-[50%_35%]" />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-12">
          <p className="eyebrow">Meet the team</p>
          <h2 className="t-h1 mt-4">Head of Pest Control.</h2>
          <dl className="mt-8 grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-4 border-t border-ink/15 pt-6 text-[0.9375rem]">
            <dt className="text-ink-muted">Role</dt>
            <dd>Rodent management, fence inspections</dd>
            <dt className="text-ink-muted">Method</dt>
            <dd>100% organic. No chemicals, just whiskers</dd>
            <dt className="text-ink-muted">Hours</dt>
            <dd>Mostly nights. Naps by day</dd>
            <dt className="text-ink-muted">Pay</dt>
            <dd>Paid in purrs (and the odd saucer of milk)</dd>
          </dl>
          <p className="t-body mt-6 text-ink-soft">The most purr-sistent member of the farm team — and the only one who never misses a fence check.</p>
        </div>
      </article>
    </section>
  );
}

/** Farm page: life around the farm, in our own photographs. */
export function FarmGallery() {
  const shots = [
    { ...farmPhotos.herdCurious, span: "md:col-span-2 md:row-span-2", pos: "50% 35%" },
    { ...farmPhotos.cowResting, span: "", pos: "40% 45%" },
    { ...farmPhotos.napierStand, span: "", pos: "50% 50%" },
    { ...farmPhotos.herdGrazing, span: "", pos: "30% 55%" },
    { ...farmPhotos.cowPortrait, span: "", pos: "50% 30%" },
  ];
  return (
    <section className={`${wrap} section-y`}>
      <p className="eyebrow">Around the farm</p>
      <h2 className="t-h1 mt-4 max-w-[18ch]">Life on the land in Isinya.</h2>
      <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 lg:gap-4">
        {shots.map((p) => (
          <figure key={p.src} className={`relative overflow-hidden rounded-xl ${p.span}`}>
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" style={{ objectPosition: p.pos }} />
          </figure>
        ))}
      </div>
    </section>
  );
}
