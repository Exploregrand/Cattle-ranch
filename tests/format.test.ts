import { describe, expect, it } from "vitest";

import { daysBetween, formatKES, formatKg, formatSignedKg, normaliseKenyanPhone } from "@/lib/format";

describe("normaliseKenyanPhone", () => {
  it.each([
    ["0712 345 678", "+254712345678"],
    ["+254 712 345 678", "+254712345678"],
    ["254712345678", "+254712345678"],
    ["0110 123 456", "+254110123456"],
    ["712345678", "+254712345678"],
  ])("accepts %s", (input, expected) => expect(normaliseKenyanPhone(input)).toBe(expected));

  it.each(["12345", "0812 345 678", "+1 415 555 0100", ""])("rejects %s", (input) =>
    expect(normaliseKenyanPhone(input)).toBeNull(),
  );
});

describe("money and weight", () => {
  it("formats KES with the KES prefix and no decimals", () => {
    expect(formatKES(14500)).toBe("KES 14,500");
    expect(formatKES(19050.4)).toBe("KES 19,050");
  });
  it("formats kilograms", () => {
    expect(formatKg(46.8)).toBe("46.8 kg");
    expect(formatSignedKg(18.4)).toBe("+18.4 kg");
    expect(formatSignedKg(-2)).toBe("−2 kg");
  });
  it("counts days between dates", () => {
    expect(daysBetween("2026-10-01", "2026-10-31")).toBe(30);
  });
});
