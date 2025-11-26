import { parseAsString } from "nuqs/server";

/**
 * Creates a search params parser descriptor for wiki pages
 * Always includes `name` (search) and `rarityKeys` (rarity filter)
 * @template TAdditionalFilters - Additional filter keys beyond name and rarityKeys
 * @param additionalFilters - Additional filter parsers (e.g., passiveStates, itemTypes)
 * @returns Search params parser descriptor compatible with nuqs
 */
export function createWikiSearchParams<
  TAdditionalFilters extends Record<string, unknown>
>(additionalFilters: TAdditionalFilters) {
  return {
    name: parseAsString.withDefault(""),
    rarityKeys: parseAsString,
    ...additionalFilters,
  } as const;
}
