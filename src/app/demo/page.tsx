import { HomeView } from "@/components/dashboard/home-view";
import { demoPortfolio } from "@/lib/livestock/demo-data";

export default function DemoHomePage() {
  return <HomeView portfolio={demoPortfolio} base="/demo" isDemo />;
}
