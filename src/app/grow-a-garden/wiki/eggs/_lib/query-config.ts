import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  PetEgg,
  FindAllPetEggsQuery,
} from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import type { EggsFilterState } from "./filter-config";
import {
  fetchPetEggsClient,
  type EggsResponse,
} from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-data";
import type { PaginationMeta } from "@/types/global";

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
export interface EggsQueryResponse {
  eggs: PetEgg[];
  pagination?: PaginationMeta;
}

/**
 * Creates query options for fetching pet eggs.
 *
 * @param queryKey - TanStack Query key
 * @param debouncedFilters - Debounced filter values
 * @param filters - Current URL filter state
 * @param initialEggs - Initial eggs from SSR
 * @param hasQueryKeyChanged - Whether query key changed from initial
 * @param initialPagination - Initial pagination metadata from SSR
 */
export function createEggsQueryOptions(
  queryKey: unknown[],
  debouncedFilters: EggsFilterState,
  filters: Pick<FindAllPetEggsQuery, "page" | "limit" | "sort" | "order"> & {
    page?: number | null;
    limit?: number | null;
    sort?: string | null;
    order?: string | null;
  },
  initialEggs: PetEgg[],
  hasQueryKeyChanged: boolean,
  initialPagination?: PaginationMeta
): UseQueryOptions<EggsQueryResponse, Error> {
  return {
    queryKey,
    queryFn: async () => {
      const sortValue: FindAllPetEggsQuery["sort"] =
        (filters.sort as FindAllPetEggsQuery["sort"]) || "rarityLevel";
      const orderValue: FindAllPetEggsQuery["order"] =
        (filters.order as FindAllPetEggsQuery["order"]) || "asc";

      // Convert title-cased item types ("Pet", "Egg") to lowercase ("pet", "egg") for API
      const itemTypesForApi =
        debouncedFilters.itemTypes.length > 0
          ? debouncedFilters.itemTypes
              .map((type) => type.toLowerCase())
              .join(",")
          : undefined;

      const response: EggsResponse = await fetchPetEggsClient({
        page: filters.page ?? 1,
        limit: filters.limit ?? 50,
        name: debouncedFilters.name || undefined,
        rarityKeys:
          debouncedFilters.rarityKeys.length > 0
            ? debouncedFilters.rarityKeys.join(",")
            : undefined,
        itemTypes: itemTypesForApi,
        sort: sortValue,
        order: orderValue,
      });

      return {
        eggs: response.data,
        pagination: response.pagination,
      };
    },
    initialData:
      initialEggs.length > 0
        ? {
            eggs: initialEggs,
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
