import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

import { Container } from "@/components/ui/container";
import { PetsPageClient } from "@/app/grow-a-garden/wiki/pets/_components/pets-page-client";
import { findAllPetsQuerySchema } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import { parseAndValidateQueryParams } from "@/helpers/query-params";
import { fetchPetsPageData } from "@/app/grow-a-garden/wiki/pets/_lib/page-data";

export const metadata: Metadata = {
  title: "Grow a Garden Pets Database | Complete Pets List | MadeByNoob",
  description:
    "Browse all Grow a Garden pets with stats, rarities, and abilities. Discover the best pets for your collection.",
  keywords: [
    "grow a garden pets",
    "grow a garden pets list",
    "grow a garden pets database",
    "grow a garden pets wiki",
    "roblox grow a garden pets",
    "grow a garden all pets",
  ],
  openGraph: {
    title: "Grow a Garden Pets Database | MadeByNoob",
    description:
      "Browse all Grow a Garden pets with stats, rarities, and abilities. Discover the best pets for your collection.",
    type: "website",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://madebynoob.com"
    }/grow-a-garden/wiki/pets`,
  },
};

interface PetsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function PetsPage({ searchParams }: PetsPageProps) {
  const params = await searchParams;

  // Parse and validate URL search params against Zod schema for API fetch.
  // Schema defaults are applied automatically by Zod.
  const { queryParams } = parseAndValidateQueryParams(
    params,
    findAllPetsQuerySchema
  );

  // Fetch initial data for SSR
  const { pets, rarityNames, passiveStateKeys, pagination } =
    await fetchPetsPageData(queryParams);

  return (
    <Container className="py-12">
      <PetsPageClient
        initialPets={pets}
        initialRarities={rarityNames}
        initialPassiveStateKeys={passiveStateKeys}
        initialPagination={pagination}
      />
    </Container>
  );
}
