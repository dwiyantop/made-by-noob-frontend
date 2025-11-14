import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Grow a Garden Tools | Coming Soon | MadeByNoob",
  description:
    "Essential calculators and utilities for Grow a Garden players. Calculate profits, XP requirements, and optimize your gameplay. Coming soon.",
  keywords: [
    "grow a garden tools",
    "grow a garden calculator",
    "grow a garden profit calculator",
    "grow a garden xp calculator",
    "roblox grow a garden tools",
  ],
  openGraph: {
    title: "Grow a Garden Tools | Coming Soon | MadeByNoob",
    description:
      "Essential calculators and utilities for Grow a Garden players. Calculate profits, XP requirements, and optimize your gameplay. Coming soon.",
    type: "website",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://madebynoob.com"
    }/grow-a-garden/tools`,
  },
};

export default function ToolsPage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Tools"
        description="Level up your gameplay with powerful calculators and utilities! We're crafting essential tools to help you calculate profits, plan your XP journey, and make smarter decisions. Coming your way soon!"
      />
    </Container>
  );
}
