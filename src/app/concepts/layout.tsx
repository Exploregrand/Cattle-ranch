import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design directions",
  robots: { index: false },
};

export default function ConceptsLayout({ children }: LayoutProps<"/concepts">) {
  return children;
}
