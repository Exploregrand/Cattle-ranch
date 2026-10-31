/**
 * Public contact details. Leave a field null until it is real — the site only shows what is set.
 * Buyers and investors look for a phone number and a physical location before they trust a farm.
 */
export const contact: {
  phone: string | null; // e.g. "+254 7XX XXX XXX"
  whatsapp: string | null; // digits only with country code, e.g. "2547XXXXXXXX"
  email: string | null;
  visits: string | null; // e.g. "Farm visits by appointment, Monday to Saturday"
} = {
  phone: null,
  whatsapp: null,
  email: null,
  visits: null,
};

export const hasContact = Object.values(contact).some(Boolean);
