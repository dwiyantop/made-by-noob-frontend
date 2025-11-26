import { useMemo } from "react";
import type { PetsFilterState } from "./filter-config";

/**
 * Generates a stable query key for TanStack Query cache.
 * Uses debounced filter values to prevent excessive API calls while filtering.
 *
 * @param debouncedFilters - Debounced filter values
 * @param pagination - Pagination parameters
 * @param sorting - Sorting parameters
 */
export function usePetsQueryKey(
  debouncedFilters: PetsFilterState,
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
    const passiveStatesString = debouncedFilters.passiveStates.join(",");

    return [
      "pets",
      pagination.page ?? 1,
      pagination.limit ?? 20,
      debouncedFilters.name || "",
      rarityKeysString,
      passiveStatesString,
      sorting.sort || "lastSyncedAt",
      sorting.order || "desc",
    ];
  }, [
    debouncedFilters.name,
    debouncedFilters.rarityKeys,
    debouncedFilters.passiveStates,
    pagination.page,
    pagination.limit,
    sorting.sort,
    sorting.order,
  ]);
}
