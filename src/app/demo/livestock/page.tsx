import { LivestockView } from "@/components/dashboard/livestock-view";
import { demoPortfolio } from "@/lib/livestock/demo-data";

export default function DemoLivestockPage() {
  return <LivestockView animals={demoPortfolio.animals} base="/demo" />;
}
