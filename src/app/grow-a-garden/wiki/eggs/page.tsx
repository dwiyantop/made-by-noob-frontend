import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

import { Container } from "@/components/ui/container";
import { EggsPageClient } from "@/app/grow-a-garden/wiki/eggs/_components/eggs-page-client";
import { findAllPetEggsQuerySchema } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { parseAndValidateQueryParams } from "@/helpers/query-params";
import { fetchEggsPageData } from "@/app/grow-a-garden/wiki/eggs/_lib/page-data";

export const metadata: Metadata = {
  title: "Grow a Garden Eggs Database | Complete Eggs List | MadeByNoob",
  description:
    "Complete database of all Grow a Garden eggs with rarity, hatch times, and pet counts. Find the best eggs to hatch for rare pets.",
  keywords: [
    "grow a garden eggs",
    "grow a garden eggs list",
    "grow a garden eggs database",
    "grow a garden eggs wiki",
    "roblox grow a garden eggs",
    "grow a garden all eggs",
  ],
  openGraph: {
    title: "Grow a Garden Eggs Database | MadeByNoob",
    description:
      "Complete database of all Grow a Garden eggs with rarity, hatch times, and pet counts. Find the best eggs to hatch for rare pets.",
    type: "website",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://madebynoob.com"
    }/grow-a-garden/wiki/eggs`,
  },
};

interface EggsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function EggsPage({ searchParams }: EggsPageProps) {
  const params = await searchParams;

  // Parse and validate URL search params against Zod schema for API fetch.
  // Schema defaults are applied automatically by Zod.
  const { queryParams } = parseAndValidateQueryParams(
    params,
    findAllPetEggsQuerySchema
  );

  // Fetch initial data for SSR
  const { eggs, rarityNames, itemTypes, pagination } = await fetchEggsPageData(
    queryParams
  );

  return (
    <Container className="py-12">
      <EggsPageClient
        initialEggs={eggs}
        initialRarities={rarityNames}
        initialItemTypes={itemTypes}
        initialPagination={pagination}
      />
    </Container>
  );
}
