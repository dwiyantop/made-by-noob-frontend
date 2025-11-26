import { useMemo } from "react";
import type { EggsFilterState } from "./filter-config";

/**
 * Generates a stable query key for TanStack Query cache.
 * Uses debounced filter values to prevent excessive API calls while filtering.
 *
 * @param debouncedFilters - Debounced filter values
 * @param pagination - Pagination parameters
 * @param sorting - Sorting parameters
 */
export function useEggsQueryKey(
  debouncedFilters: EggsFilterState,
  pagination: {
    page?: number | null;
    limit?: number | null;
  },
  sorting: {
    sort?: string | null;
    order?: string | null;
  }
) {
  return useMemo(() => {
    const rarityKeysString = debouncedFilters.rarityKeys.join(",");
    const itemTypesString = debouncedFilters.itemTypes.join(",");

    return [
      "pet-eggs",
      pagination.page ?? 1,
      pagination.limit ?? 50,
      debouncedFilters.name || "",
      rarityKeysString,
      itemTypesString,
      sorting.sort || "rarityLevel",
      sorting.order || "asc",
    ];
  }, [
    debouncedFilters.name,
    debouncedFilters.rarityKeys,
    debouncedFilters.itemTypes,
    pagination.page,
    pagination.limit,
    sorting.sort,
    sorting.order,
  ]);
}
