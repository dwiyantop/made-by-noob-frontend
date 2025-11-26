import { fetchPets } from "@/app/grow-a-garden/_repositories/pet/pets/pets-data";
import { fetchRarities } from "@/app/grow-a-garden/_repositories/rarities/rarities-data";
import { fetchPassiveStateKeys } from "@/app/grow-a-garden/_repositories/pet/pet-passives/pet-passives-data";
import type { Pet } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import type { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import type { FindAllPetsQuery } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import type { PaginationMeta } from "@/types/global";

/**
 * Result of fetching pets page data
 */
interface PetsPageData {
  pets: Pet[];
  rarityNames: string[];
  passiveStateKeys: string[];
  pagination?: PaginationMeta;
}

/**
 * Extracts rarity names from rarities response.
 */
function extractRarityNames(rarities: Rarity[]): string[] {
  return rarities
    .map((rarity) => rarity.name)
    .filter((name): name is string => Boolean(name));
}

/**
 * Fetches all data required for the pets page SSR.
 * Handles errors gracefully and returns empty arrays on failure.
 *
 * @param queryParams - Validated query parameters for fetching pets
 * @returns Object containing pets, rarity names, and passive state keys
 */
export async function fetchPetsPageData(
  queryParams: FindAllPetsQuery
): Promise<PetsPageData> {
  const defaultData: PetsPageData = {
    pets: [],
    rarityNames: [],
    passiveStateKeys: [],
    pagination: undefined,
  };

  try {
    const [raritiesResponse, passiveStateKeysResponse, petsResponse] =
      await Promise.all([
        fetchRarities(),
        fetchPassiveStateKeys(),
        fetchPets(queryParams),
      ]);

    const rarityNames =
      raritiesResponse && "data" in raritiesResponse
        ? extractRarityNames((raritiesResponse.data as Rarity[]) ?? [])
        : [];

    const passiveStateKeys =
      passiveStateKeysResponse && "data" in passiveStateKeysResponse
        ? (passiveStateKeysResponse.data as string[])
        : [];

    const pets =
      petsResponse && "data" in petsResponse
        ? (petsResponse.data as Pet[])
        : [];

    const pagination =
      petsResponse && "meta" in petsResponse && petsResponse.meta?.pagination
        ? petsResponse.meta.pagination
        : undefined;

    return {
      pets,
      rarityNames,
      passiveStateKeys,
      pagination,
    };
  } catch (error) {
    console.error("Failed to fetch pets page data", error);
    return defaultData;
  }
}
