/**
 * Photography slots. Each is `null` until a real Tangama photo is supplied.
 * To use a photo, add it under /public/images and set its path and alt text here.
 * While a slot is empty, an illustrated scene is shown instead — never stock
 * photos that could be mistaken for Tangama's own farm or animals.
 */
export type MediaSlot = { src: string; alt: string } | null;

export const media: Record<"hero" | "farm" | "fodder", MediaSlot> = {
  hero: null,
  farm: null,
  fodder: null,
};
