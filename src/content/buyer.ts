/**
 * Buyer-confidence content. Plain, specific, honest about the stage we're at.
 * Commit to what will be written down — never invent terms that haven't been set.
 */

export const pathways = [
  {
    id: "own",
    photo: "sheep" as const,
    title: "Own managed livestock",
    body: "Own a specific, ear-tagged animal. We house, feed and care for it on our farm; you follow every record from your phone.",
    cta: "Register interest",
    href: "/early-access?interest=managed",
  },
  {
    id: "qurbani",
    photo: "goat" as const,
    title: "Qurbani",
    body: "Reserve a healthy, well-fed goat, sheep or bull ahead of Eid al-Adha, raised and checked on our farm.",
    cta: "About Qurbani",
    href: "/qurbani",
  },
  {
    id: "invest",
    photo: "cattle" as const,
    title: "Invest in Tangama",
    body: "For Kenyan investors and chamas who want to back the business itself as it grows.",
    cta: "Read the investor brief",
    href: "/investors",
  },
];

export const howItWorks = [
  { title: "Register your interest", body: "Tell us what you're looking for. It's free and commits you to nothing." },
  { title: "Choose your animal", body: "When programmes open, see each animal's ID, breed, age, weight and health before you decide." },
  { title: "Sign a clear agreement", body: "Every price, fee and condition in writing, before you pay a single shilling." },
  { title: "Follow it, then decide", body: "Weigh-ins, treatments and photos as they happen. Collect, sell or renew at the end." },
];

export const agreementCovers = [
  "The exact animal you own — its ID, breed, age and weight on the day",
  "The purchase price and the monthly care fee, in KES",
  "What feeding, housing and veterinary care is included",
  "What happens if your animal falls ill or dies",
  "When and how you can collect your animal or ask us to sell it",
  "How either side can end the agreement",
];

export const buyerFaqs = [
  {
    q: "Can I buy or reserve an animal today?",
    a: "Not yet. We are developing our fodder base first so every animal is raised on feed we control. Register your interest and we'll contact you as soon as programmes open — there's no payment and no commitment.",
  },
  {
    q: "Who is behind Tangama Livestock?",
    a: "Tangama Farm, a working fodder farm in Isinya, Kajiado County, with 4 acres under cultivation and a further 5 acres planned for early 2027. The same team that grows the feed will care for the animals.",
  },
  {
    q: "What happens if my animal falls ill or dies?",
    a: "Your written agreement will set this out in full — veterinary care, who covers the cost, and how a loss is handled — before you pay anything. Every treatment is recorded and visible to you.",
  },
  {
    q: "How will I know the animal is real, and mine?",
    a: "Each animal carries a permanent ear-tag ID linked to its own record: weigh-ins, health, feeding, costs and photos. You'll see that record any time, and you can ask to see your animal at the farm.",
  },
  {
    q: "Is this an investment?",
    a: "No. Managed ownership means you own a specific animal and pay us to care for it. We report actual weights, costs and sale prices — we never promise profits or returns.",
  },
  {
    q: "How will payment work?",
    a: "We plan to accept M-Pesa, with a receipt for every payment in your account. No payments are taken today.",
  },
];
