import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  Pet,
  FindAllPetsQuery,
} from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import type { PetsFilterState } from "./filter-config";
import {
  fetchPetsClient,
  type PetsResponse,
} from "@/app/grow-a-garden/_repositories/pet/pets/pets-data";

/**
 * Query configuration constants
 */
export const QUERY_CONFIG = {
  STALE_TIME_INITIAL: 60 * 1000, // 1 minute for initial SSR data
  STALE_TIME_CHANGED: 0, // Always refetch when filters change
  GC_TIME: 5 * 60 * 1000, // 5 minutes garbage collection
  RETRY: 1,
} as const;

/**
 * Query response type including pagination metadata
 */
export interface PetsQueryResponse {
  pets: Pet[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalEntries: number;
  };
}

/**
 * Creates query options for fetching pets.
 *
 * @param queryKey - TanStack Query key
 * @param debouncedFilters - Debounced filter values
 * @param filters - Current URL filter state
 * @param initialPets - Initial pets from SSR
 * @param hasQueryKeyChanged - Whether query key changed from initial
 * @param initialPagination - Initial pagination metadata from SSR
 */
export function createPetsQueryOptions(
  queryKey: unknown[],
  debouncedFilters: PetsFilterState,
  filters: Pick<FindAllPetsQuery, "page" | "limit" | "sort" | "order"> & {
    page?: number | null;
    limit?: number | null;
    sort?: string | null;
    order?: string | null;
  },
  initialPets: Pet[],
  hasQueryKeyChanged: boolean,
  initialPagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalEntries: number;
  }
): UseQueryOptions<PetsQueryResponse, Error> {
  return {
    queryKey,
    queryFn: async () => {
      const sortValue: FindAllPetsQuery["sort"] =
        (filters.sort as FindAllPetsQuery["sort"]) || "lastSyncedAt";
      const orderValue: FindAllPetsQuery["order"] =
        (filters.order as FindAllPetsQuery["order"]) || "desc";

      const response: PetsResponse = await fetchPetsClient({
        page: filters.page ?? 1,
        limit: filters.limit ?? 20,
        name: debouncedFilters.name || undefined,
        rarityKeys:
          debouncedFilters.rarityKeys.length > 0
            ? debouncedFilters.rarityKeys.join(",")
            : undefined,
        passiveStates:
          debouncedFilters.passiveStates.length > 0
            ? debouncedFilters.passiveStates.join(",")
            : undefined,
        sort: sortValue,
        order: orderValue,
      });

      return {
        pets: response.data,
        pagination: response.pagination,
      };
    },
    initialData:
      initialPets.length > 0
        ? {
            pets: initialPets,
            pagination: initialPagination,
          }
        : undefined,
    placeholderData: (previousData) => {
      // Preserve previous data structure when refetching
      if (previousData) {
        return previousData;
      }
      return undefined;
    },
    staleTime: hasQueryKeyChanged
      ? QUERY_CONFIG.STALE_TIME_CHANGED
      : QUERY_CONFIG.STALE_TIME_INITIAL,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: QUERY_CONFIG.RETRY,
    refetchOnMount: hasQueryKeyChanged ? "always" : false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  };
}
