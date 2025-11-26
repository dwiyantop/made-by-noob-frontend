"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

import { Heading } from "@/components/ui/heading";
import { Pagination } from "@/components/ui/pagination";
import { WikiFiltersBar } from "@/app/grow-a-garden/wiki/_components/wiki-filters-bar";
import { WikiFloatingFilterButton } from "@/app/grow-a-garden/wiki/_components/wiki-floating-filter-button";
import { WikiExpandedSearchInput } from "@/app/grow-a-garden/wiki/_components/wiki-expanded-search-input";
import { EggsItemsGrid } from "@/app/grow-a-garden/wiki/eggs/_components/eggs-items-grid";
import { EggsFiltersContent } from "@/app/grow-a-garden/wiki/eggs/_components/eggs-filters-content";
import { buildEggList } from "@/app/grow-a-garden/wiki/eggs/_lib/transformers";
import { petEggsSearchParams } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import type { PetEgg } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { useDebouncedFilters } from "@/app/grow-a-garden/wiki/_hooks/use-debounced-filters";
import type { FilterFieldConfig } from "@/app/grow-a-garden/wiki/_hooks/use-debounced-filters";
import {
  eggsFilterConfig,
  type EggsFilterState,
} from "@/app/grow-a-garden/wiki/eggs/_lib/filter-config";
import { useEggsQueryKey } from "@/app/grow-a-garden/wiki/eggs/_lib/query-key";
import {
  createEggsQueryOptions,
  type EggsQueryResponse,
} from "@/app/grow-a-garden/wiki/eggs/_lib/query-config";
import { useEggsFilterHandlers } from "@/app/grow-a-garden/wiki/eggs/_lib/filter-handlers";

interface EggsPageClientProps {
  initialEggs: PetEgg[];
  initialRarities: string[];
  initialItemTypes: string[];
  initialPagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalEntries: number;
  };
}

export function EggsPageClient({
  initialEggs,
  initialRarities,
  initialItemTypes,
  initialPagination,
}: EggsPageClientProps) {
  const [filters, setFilters] = useQueryStates(petEggsSearchParams, {
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
    () => (updates: Partial<Record<keyof EggsFilterState, string | null>>) => {
      // Check if any filter or search changed
      const hasSearchChanged =
        updates.name !== undefined && updates.name !== filters.name;
      const hasFilterChanged =
        updates.rarityKeys !== undefined || updates.itemTypes !== undefined;
      const shouldResetPage =
        (hasSearchChanged || hasFilterChanged) && filters.page !== 1;

      setFilters({
        name: updates.name ?? filters.name ?? "",
        rarityKeys:
          updates.rarityKeys === "" || updates.rarityKeys === null
            ? null
            : updates.rarityKeys ?? filters.rarityKeys ?? null,
        itemTypes:
          updates.itemTypes === "" || updates.itemTypes === null
            ? null
            : updates.itemTypes ?? filters.itemTypes ?? null,
        // Reset to page 1 when filters or search change
        ...(shouldResetPage ? { page: 1 } : {}),
      });
    },
    [filters, setFilters]
  );

  // Use debounced filters hook for all filter fields
  const { internalFilters, debouncedFilters, updateFilter, updateFilters } =
    useDebouncedFilters<EggsFilterState>(
      {
        name: filters.name || "",
        rarityKeys: filters.rarityKeys || "",
        itemTypes: filters.itemTypes || "",
      },
      DEBOUNCE_DELAY,
      eggsFilterConfig as {
        [K in keyof EggsFilterState]: FilterFieldConfig<EggsFilterState[K]>;
      },
      handleFiltersChange
    );

  // Generate stable query key for TanStack Query cache
  const queryKey = useEggsQueryKey(debouncedFilters, filters, filters);

  // Track initial query key to prevent refetch on first mount/refresh
  const queryKeyString = useMemo(() => JSON.stringify(queryKey), [queryKey]);
  const [initialQueryKeyString] = useState(() => queryKeyString);
  const hasQueryKeyChanged = queryKeyString !== initialQueryKeyString;

  // Create query options
  const queryOptions = useMemo(
    () =>
      createEggsQueryOptions(
        queryKey,
        debouncedFilters,
        filters,
        initialEggs,
        hasQueryKeyChanged,
        initialPagination
      ),
    [
      queryKey,
      debouncedFilters,
      filters,
      initialEggs,
      hasQueryKeyChanged,
      initialPagination,
    ]
  );

  // Fetch eggs data with TanStack Query
  const { data, isFetching, error } = useQuery<EggsQueryResponse, Error>(
    queryOptions
  );

  const eggs = data?.eggs ?? initialEggs;
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
    handleItemTypeChange,
    handleClearAll,
  } = useEggsFilterHandlers(
    updateFilter as <K extends keyof EggsFilterState>(
      key: K,
      value: EggsFilterState[K]
    ) => void,
    updateFilters,
    setFilters,
    debouncedFilters,
    setIsSearchExpanded
  );

  // Transform eggs data for display
  const items = useMemo(() => buildEggList(eggs), [eggs]);

  // Calculate active filters count from internal filter values (immediate UI feedback)
  const activeFiltersCount = useMemo(() => {
    return internalFilters.rarityKeys.length + internalFilters.itemTypes.length;
  }, [internalFilters.rarityKeys.length, internalFilters.itemTypes.length]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch eggs", error);
    }
  }, [error]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Heading variant="h1">Eggs</Heading>
          <WikiFiltersBar
            categoryName="Eggs"
            onSearchChange={handleSearchChange}
            filterBarRef={filterBarRef}
            isFiltersOpen={isFiltersOpen}
            onFiltersOpenChange={setIsFiltersOpen}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandedChange={setIsSearchExpanded}
            searchValue={internalFilters.name}
            onSearchValueChange={handleSearchChange}
            filtersContent={
              <EggsFiltersContent
                availableRarities={initialRarities}
                availableItemTypes={initialItemTypes}
                selectedRarities={internalFilters.rarityKeys}
                selectedTypes={internalFilters.itemTypes}
                onRarityChange={handleRarityChange}
                onTypeChange={handleItemTypeChange}
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
          placeholder="Search eggs..."
          excludeRefs={[filterBarRef]}
        />
      </div>

      <EggsItemsGrid items={items} isLoading={isFetching} />

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
