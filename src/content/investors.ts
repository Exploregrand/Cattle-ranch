/** Investor brief content. Every figure is sourced; nothing here is an offer. */

export const investorTypes = [
  { value: "individual", label: "Individual" },
  { value: "chama", label: "Chama / investment group" },
  { value: "sacco", label: "SACCO or co-operative" },
  { value: "company", label: "Company or fund" },
] as const;

export const routes = [
  { value: "equity", label: "Backing Tangama (equity)" },
  { value: "livestock", label: "Owning managed livestock" },
  { value: "both", label: "Both" },
] as const;

export const tickets = [
  { value: "under_500k", label: "Under KES 500,000" },
  { value: "500k_2m", label: "KES 500,000 – 2 million" },
  { value: "2m_10m", label: "KES 2 – 10 million" },
  { value: "over_10m", label: "Over KES 10 million" },
  { value: "undisclosed", label: "Prefer not to say" },
] as const;

/** Kenya's 47 counties. */
export const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
];

export const marketFacts = [
  {
    value: "~42%",
    label: "of Kenya's agricultural GDP comes from livestock (≈12% of total GDP)",
    source: 1,
  },
  {
    value: "KSh 191bn",
    label: "earned from livestock and livestock products in 2023",
    source: 2,
  },
];

export const sources = [
  {
    n: 1,
    text: "State Department for Livestock (2021), reported by Kenya News Agency.",
    href: "https://www.kenyanews.go.ke/livestock-industry-spurs-kenyas-economic-growth/",
  },
  {
    n: 2,
    text: "Kenya National Bureau of Statistics, via Africa Check.",
    href: "https://africacheck.org/infofinder/explore-facts/how-much-does-livestock-contribute-kenyas-gross-domestic-product-gdp",
  },
];
