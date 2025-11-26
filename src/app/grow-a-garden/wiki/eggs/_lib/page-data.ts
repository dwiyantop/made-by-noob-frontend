import { fetchPetEggs } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-data";
import { fetchRarities } from "@/app/grow-a-garden/_repositories/rarities/rarities-data";
import type {
  PetEgg,
  PetEggItemType,
} from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import type { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import type { FindAllPetEggsQuery } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import type { PaginationMeta } from "@/types/global";

/**
 * Result of fetching eggs page data
 */
interface EggsPageData {
  eggs: PetEgg[];
  rarityNames: string[];
  itemTypes: string[];
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
 * Extracts unique item types directly from eggs' items.
 * Returns title-cased values: ["Pet", "Egg"]
 */
function extractItemTypes(eggs: PetEgg[]): string[] {
  const itemTypesSet = new Set<PetEggItemType>();

  for (const egg of eggs) {
    if (egg.items) {
      for (const item of egg.items) {
        if (item.itemType) {
          itemTypesSet.add(item.itemType);
        }
      }
    }
  }

  // Convert to title-cased strings: "pet" -> "Pet", "egg" -> "Egg"
  return Array.from(itemTypesSet)
    .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
    .sort();
}

/**
 * Fetches all data required for the eggs page SSR.
 * Handles errors gracefully and returns empty arrays on failure.
 *
 * @param queryParams - Validated query parameters for fetching eggs
 * @returns Object containing eggs, rarity names, item types, and pagination metadata
 */
export async function fetchEggsPageData(
  queryParams: FindAllPetEggsQuery
): Promise<EggsPageData> {
  const defaultData: EggsPageData = {
    eggs: [],
    rarityNames: [],
    itemTypes: [],
    pagination: undefined,
  };

  try {
    const [raritiesResponse, eggsResponse] = await Promise.all([
      fetchRarities(),
      fetchPetEggs(queryParams),
    ]);

    const rarityNames =
      raritiesResponse && "data" in raritiesResponse
        ? extractRarityNames((raritiesResponse.data as Rarity[]) ?? [])
        : [];

    const eggs =
      eggsResponse && "data" in eggsResponse
        ? (eggsResponse.data as PetEgg[])
        : [];

    const itemTypes = extractItemTypes(eggs);

    const pagination =
      eggsResponse && "meta" in eggsResponse && eggsResponse.meta?.pagination
        ? eggsResponse.meta.pagination
        : undefined;

    return {
      eggs,
      rarityNames,
      itemTypes,
      pagination,
    };
  } catch (error) {
    console.error("Failed to fetch eggs page data", error);
    return defaultData;
  }
}
