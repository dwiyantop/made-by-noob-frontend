import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { EggsPageClient } from "@/app/grow-a-garden/wiki/eggs/_components/eggs-page-client";
import { fetchPetEggs } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-data";
import { fetchRarities } from "@/app/grow-a-garden/_repositories/rarities/rarities-data";
import type {
  PetEgg,
  FindAllPetEggsQuery,
} from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { findAllPetEggsQuerySchema } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import type { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import { parseAndValidateQueryParams } from "@/helpers/query-params";

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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DEFAULT_QUERY: FindAllPetEggsQuery & { page: number; limit: number } = {
  page: 1,
  limit: 50,
  sort: "rarityLevel",
  order: "asc",
};

export default async function EggsPage({ searchParams }: EggsPageProps) {
  const params = await searchParams;

  // Parse and validate query params from URL
  // Only requires schema and default query, handles everything else automatically
  const { queryParams, validatedValues } = parseAndValidateQueryParams(
    params,
    findAllPetEggsQuerySchema,
    DEFAULT_QUERY
  );

  // Extract validated values (field names match schema)
  // Transform comma-separated strings to arrays for client component
  const validatedSearch = (validatedValues.name as string) || "";
  const validatedRarities =
    typeof validatedValues.rarityKeys === "string"
      ? validatedValues.rarityKeys.split(",").filter(Boolean)
      : [];
  const validatedTypes =
    typeof validatedValues.itemTypes === "string"
      ? validatedValues.itemTypes.split(",").filter(Boolean)
      : [];

  let petEggs: PetEgg[] = [];
  let rarities: Rarity[] = [];

  try {
    const [petEggsResponse, raritiesResponse] = await Promise.all([
      fetchPetEggs(queryParams),
      fetchRarities({
        page: 1,
        limit: 50,
        sort: "level",
        order: "asc",
      }),
    ]);

    if (petEggsResponse && "data" in petEggsResponse) {
      petEggs = petEggsResponse.data as PetEgg[];
    }

    if (raritiesResponse && "data" in raritiesResponse) {
      rarities = raritiesResponse.data as Rarity[];
    }
  } catch (error) {
    console.error("Failed to fetch eggs page data", error);
  }

  return (
    <Container className="py-12">
      <EggsPageClient
        initialPetEggs={petEggs}
        initialRarities={rarities}
        initialSearch={validatedSearch}
        initialRaritiesFilter={validatedRarities}
        initialTypesFilter={validatedTypes}
      />
    </Container>
  );
}
