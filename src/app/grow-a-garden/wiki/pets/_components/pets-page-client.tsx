"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

import { Heading } from "@/components/ui/heading";
import { Pagination } from "@/components/ui/pagination";
import { WikiFiltersBar } from "@/app/grow-a-garden/wiki/_components/wiki-filters-bar";
import { WikiFloatingFilterButton } from "@/app/grow-a-garden/wiki/_components/wiki-floating-filter-button";
import { WikiExpandedSearchInput } from "@/app/grow-a-garden/wiki/_components/wiki-expanded-search-input";
import { PetsItemsGrid } from "@/app/grow-a-garden/wiki/pets/_components/pets-items-grid";
import { PetsFiltersContent } from "@/app/grow-a-garden/wiki/pets/_components/pets-filters-content";
import { buildPetList } from "@/app/grow-a-garden/wiki/pets/_lib/transformers";
import { petsSearchParams } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import type { Pet } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import { useDebouncedFilters } from "@/app/grow-a-garden/wiki/_hooks/use-debounced-filters";
import type { FilterFieldConfig } from "@/app/grow-a-garden/wiki/_hooks/use-debounced-filters";
import {
  petsFilterConfig,
  type PetsFilterState,
} from "@/app/grow-a-garden/wiki/pets/_lib/filter-config";
import { usePetsQueryKey } from "@/app/grow-a-garden/wiki/pets/_lib/query-key";
import {
  createPetsQueryOptions,
  type PetsQueryResponse,
} from "@/app/grow-a-garden/wiki/pets/_lib/query-config";
import { usePetsFilterHandlers } from "@/app/grow-a-garden/wiki/pets/_lib/filter-handlers";

interface PetsPageClientProps {
  initialPets: Pet[];
  initialRarities: string[];
  initialPassiveStateKeys: string[];
  initialPagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalEntries: number;
  };
}

export function PetsPageClient({
  initialPets,
  initialRarities,
  initialPassiveStateKeys,
  initialPagination,
}: PetsPageClientProps) {
  const [filters, setFilters] = useQueryStates(petsSearchParams, {
    history: "push",
    shallow: true,
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Debounce delay for filter updates (500ms)
  const DEBOUNCE_DELAY = 500;

  // Callback to update URL filters when debounced values change
  // Resets to page 1 when filters or search change
  const handleFiltersChange = useMemo(
    () => (updates: Partial<Record<keyof PetsFilterState, string | null>>) => {
      // Check if any filter or search changed
      const hasSearchChanged =
        updates.name !== undefined && updates.name !== filters.name;
      const hasFilterChanged =
        updates.rarityKeys !== undefined || updates.passiveStates !== undefined;
      const shouldResetPage =
        (hasSearchChanged || hasFilterChanged) && filters.page !== 1;

      setFilters({
        name: updates.name ?? filters.name ?? "",
        rarityKeys:
          updates.rarityKeys === "" || updates.rarityKeys === null
            ? null
            : updates.rarityKeys ?? filters.rarityKeys ?? null,
        passiveStates:
          updates.passiveStates === "" || updates.passiveStates === null
            ? null
            : updates.passiveStates ?? filters.passiveStates ?? null,
        // Reset to page 1 when filters or search change
        ...(shouldResetPage ? { page: 1 } : {}),
      });
    },
    [filters, setFilters]
  );

  // Use debounced filters hook for all filter fields
  const { internalFilters, debouncedFilters, updateFilter, updateFilters } =
    useDebouncedFilters<PetsFilterState>(
      {
        name: filters.name || "",
        rarityKeys: filters.rarityKeys || "",
        passiveStates: filters.passiveStates || "",
      },
      DEBOUNCE_DELAY,
      petsFilterConfig as {
        [K in keyof PetsFilterState]: FilterFieldConfig<PetsFilterState[K]>;
      },
      handleFiltersChange
    );

  // Generate stable query key for TanStack Query cache
  const queryKey = usePetsQueryKey(debouncedFilters, filters, filters);

  // Track initial query key to prevent refetch on first mount/refresh
  const queryKeyString = useMemo(() => JSON.stringify(queryKey), [queryKey]);
  const [initialQueryKeyString] = useState(() => queryKeyString);
  const hasQueryKeyChanged = queryKeyString !== initialQueryKeyString;

  // Create query options
  const queryOptions = useMemo(
    () =>
      createPetsQueryOptions(
        queryKey,
        debouncedFilters,
        filters,
        initialPets,
        hasQueryKeyChanged,
        initialPagination
      ),
    [
      queryKey,
      debouncedFilters,
      filters,
      initialPets,
      hasQueryKeyChanged,
      initialPagination,
    ]
  );

  // Fetch pets data with TanStack Query
  const { data, isFetching, error } = useQuery<PetsQueryResponse, Error>(
    queryOptions
  );

  const pets = data?.pets ?? initialPets;
  const pagination = data?.pagination;

  // Track previous page to detect page changes
  const prevPageRef = useRef(filters.page ?? 1);

  // Handle page change with scroll to top
  const handlePageChange = useMemo(
    () => (page: number) => {
      setFilters({ page });
      // Scroll to top smoothly when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setFilters]
  );

  // Auto-scroll to top when page changes (fallback for programmatic changes)
  useEffect(() => {
    const currentPage = filters.page ?? 1;
    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [filters.page]);

  // Create filter change handlers
  const {
    handleSearchChange,
    handleClear,
    handleRarityChange,
    handlePassiveStateKeyChange,
    handleClearAll,
  } = usePetsFilterHandlers(
    updateFilter as <K extends keyof PetsFilterState>(
      key: K,
      value: PetsFilterState[K]
    ) => void,
    updateFilters,
    setFilters,
    debouncedFilters,
    setIsSearchExpanded
  );

  // Transform pets data for display
  const items = useMemo(() => buildPetList(pets), [pets]);

  // Calculate active filters count from internal filter values (immediate UI feedback)
  const activeFiltersCount = useMemo(() => {
    return (
      internalFilters.rarityKeys.length + internalFilters.passiveStates.length
    );
  }, [internalFilters.rarityKeys.length, internalFilters.passiveStates.length]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch pets", error);
    }
  }, [error]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Heading variant="h1">Pets</Heading>
          <WikiFiltersBar
            categoryName="Pets"
            onSearchChange={handleSearchChange}
            filterBarRef={filterBarRef}
            isFiltersOpen={isFiltersOpen}
            onFiltersOpenChange={setIsFiltersOpen}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandedChange={setIsSearchExpanded}
            searchValue={internalFilters.name}
            onSearchValueChange={handleSearchChange}
            filtersContent={
              <PetsFiltersContent
                availableRarities={initialRarities}
                availablePassiveStateKeys={initialPassiveStateKeys}
                selectedRarities={internalFilters.rarityKeys}
                selectedPassiveStateKeys={internalFilters.passiveStates}
                onRarityChange={handleRarityChange}
                onPassiveStateKeyChange={handlePassiveStateKeyChange}
                onClearAll={handleClearAll}
                onClose={() => setIsFiltersOpen(false)}
              />
            }
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        {/* Mobile: Expandable search input displayed between header and content */}
        <WikiExpandedSearchInput
          value={internalFilters.name}
          onChange={handleSearchChange}
          onClear={handleClear}
          isExpanded={isSearchExpanded}
          onExpandedChange={setIsSearchExpanded}
          placeholder="Search pets..."
          excludeRefs={[filterBarRef]}
        />
      </div>

      <PetsItemsGrid items={items} isLoading={isFetching} />

      {/* Pagination - Shows when pagination metadata is available (from SSR or API) */}
      {(pagination || initialPagination) &&
        (pagination?.totalPages ?? initialPagination?.totalPages ?? 1) > 1 && (
          <Pagination
            currentPage={
              pagination?.currentPage ?? initialPagination?.currentPage ?? 1
            }
            totalPages={
              pagination?.totalPages ?? initialPagination?.totalPages ?? 1
            }
            onPageChange={handlePageChange}
          />
        )}

      <WikiFloatingFilterButton
        activeFiltersCount={activeFiltersCount}
        onOpenFilters={() => setIsFiltersOpen(true)}
        filterBarRef={filterBarRef}
      />
    </div>
  );
}
