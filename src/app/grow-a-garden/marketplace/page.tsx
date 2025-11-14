import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Grow a Garden Marketplace | Coming Soon | MadeByNoob",
  description:
    "Trade, buy, and sell Grow a Garden items with other players. Find the best deals and connect with the community. Coming soon.",
  keywords: [
    "grow a garden marketplace",
    "grow a garden trading",
    "grow a garden buy sell",
    "roblox grow a garden marketplace",
    "grow a garden item trading",
  ],
  openGraph: {
    title: "Grow a Garden Marketplace | Coming Soon | MadeByNoob",
    description:
      "Trade, buy, and sell Grow a Garden items with other players. Find the best deals and connect with the community. Coming soon.",
    type: "website",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://madebynoob.com"
    }/grow-a-garden/marketplace`,
  },
};

export default function MarketplacePage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Marketplace"
        description="Get ready to trade, buy, and sell with fellow players! We're building a safe and easy-to-use marketplace where you can find the best deals on pets, eggs, and items. Stay tuned!"
      />
    </Container>
  );
}
