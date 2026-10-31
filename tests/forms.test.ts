import { describe, expect, it } from "vitest";

import { bedRange } from "@/lib/admin/fodder";
import { registrationSchema } from "@/lib/early-access";
import { investorSchema } from "@/lib/investor-interest";

const lead = {
  fullName: "Amina Wanjiru",
  phone: "0712 345 678",
  email: "",
  location: "",
  interests: ["sheep"],
  message: "",
  consent: true,
};

describe("early-access registration", () => {
  it("accepts a valid registration and normalises the phone", () => {
    const r = registrationSchema.parse(lead);
    expect(r.phone).toBe("+254712345678");
    expect(r.email).toBeUndefined();
  });
  it("requires consent, an interest and a Kenyan number", () => {
    expect(registrationSchema.safeParse({ ...lead, consent: false }).success).toBe(false);
    expect(registrationSchema.safeParse({ ...lead, interests: [] }).success).toBe(false);
    expect(registrationSchema.safeParse({ ...lead, phone: "12345" }).success).toBe(false);
  });
});

describe("investor interest", () => {
  const investor = {
    fullName: "Test Chama",
    phone: "0722 111 222",
    email: "",
    county: "Kajiado",
    investorType: "chama",
    route: "goats",
    ticket: "",
    message: "",
    acknowledgedNoOffer: true,
    consent: true,
  };
  it("accepts livestock ownership interest", () => {
    expect(investorSchema.parse(investor).route).toBe("goats");
  });
  it("never accepts equity", () => {
    expect(investorSchema.safeParse({ ...investor, route: "equity" }).success).toBe(false);
  });
  it("requires the no-offer acknowledgement", () => {
    expect(investorSchema.safeParse({ ...investor, acknowledgedNoOffer: false }).success).toBe(false);
  });
});

describe("bed ranges", () => {
  it("expands and orders a range, padding single digits", () => {
    expect(bedRange("A", 3, 1)).toEqual(["A01", "A02", "A03"]);
    expect(bedRange("C", 99, 100)).toEqual(["C99", "C100"]);
  });
});
