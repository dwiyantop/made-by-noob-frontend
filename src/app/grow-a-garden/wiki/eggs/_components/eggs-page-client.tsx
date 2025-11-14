"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates, parseAsString } from "nuqs";

import { Heading } from "@/components/ui/heading";
import { WikiFiltersBar } from "@/app/grow-a-garden/wiki/_components/wiki-filters-bar";
import { WikiFloatingFilterButton } from "@/app/grow-a-garden/wiki/_components/wiki-floating-filter-button";
import { WikiExpandedSearchInput } from "@/app/grow-a-garden/wiki/_components/wiki-expanded-search-input";
import { EggsItemsGrid } from "@/app/grow-a-garden/wiki/eggs/_components/eggs-items-grid";
import { EggsFiltersContent } from "@/app/grow-a-garden/wiki/eggs/_components/eggs-filters-content";
import { buildEggList } from "@/app/grow-a-garden/wiki/eggs/_lib/transformers";
import type { PetEgg } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { fetchPetEggsClient } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-data";
import type { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";

interface EggsPageClientProps {
  initialPetEggs: PetEgg[];
  initialRarities: Rarity[];
  initialSearch?: string;
  initialRaritiesFilter?: string[];
  initialTypesFilter?: string[];
}

const DEFAULT_QUERY = {
  page: 1,
  limit: 50,
  sort: "rarityLevel" as const,
  order: "asc" as const,
};

export function EggsPageClient({
  initialPetEggs,
  initialRarities,
  initialSearch = "",
  initialRaritiesFilter = [],
  initialTypesFilter = [],
}: EggsPageClientProps) {
  const [filters, setFilters] = useQueryStates(
    {
      name: parseAsString.withDefault(initialSearch),
      rarityKeys: parseAsString,
      itemTypes: parseAsString,
    },
    {
      history: "push",
      shallow: true,
    }
  );

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Parse comma-separated strings to arrays
  // Use initial values from SSR if filters are null (not in URL)
  // Empty string means cleared, return empty array
  const rarityKeysArray = useMemo(() => {
    if (filters.rarityKeys === null) return initialRaritiesFilter;
    if (filters.rarityKeys === "") return [];
    return filters.rarityKeys.split(",").filter(Boolean);
  }, [filters.rarityKeys, initialRaritiesFilter]);
  const itemTypesArray = useMemo(() => {
    if (filters.itemTypes === null) return initialTypesFilter;
    if (filters.itemTypes === "") return [];
    return filters.itemTypes.split(",").filter(Boolean);
  }, [filters.itemTypes, initialTypesFilter]);

  // Debounced query params for API fetch (state changes immediately for UI)
  const [debouncedQueryParams, setDebouncedQueryParams] = useState(() => ({
    ...DEFAULT_QUERY,
    name: filters.name || undefined,
    rarityKeys: filters.rarityKeys || undefined,
    itemTypes: filters.itemTypes || undefined,
  }));

  // Debounce query params update - only affects API fetch, not UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQueryParams({
        ...DEFAULT_QUERY,
        name: filters.name || undefined,
        rarityKeys: filters.rarityKeys || undefined,
        itemTypes: filters.itemTypes || undefined,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters.name, filters.rarityKeys, filters.itemTypes]);

  // Create stable query key based on debounced params
  const queryKey = useMemo(() => {
    const search = debouncedQueryParams.name || "";
    const rarities = debouncedQueryParams.rarityKeys || "";
    const types = debouncedQueryParams.itemTypes || "";
    return ["pet-eggs", search, rarities, types];
  }, [debouncedQueryParams]);

  const {
    data: queryData,
    isFetching,
    error,
  } = useQuery<PetEgg[], Error>({
    queryKey,
    queryFn: async () => {
      return await fetchPetEggsClient(debouncedQueryParams);
    },
    placeholderData: (previousData) => {
      // Keep previous data while fetching new data
      if (previousData) return previousData;
      // Use initial data only if no filters are applied
      const hasFilters =
        debouncedQueryParams.name ||
        debouncedQueryParams.rarityKeys ||
        debouncedQueryParams.itemTypes;
      return hasFilters ? undefined : initialPetEggs;
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const petEggs = queryData ?? initialPetEggs;

  const handleSearchChange = (value: string) => {
    setFilters({ name: value });
  };

  const handleClear = () => {
    setFilters({ name: "" });
    setIsSearchExpanded(false);
  };

  const items = useMemo(() => buildEggList(petEggs), [petEggs]);

  // Get available types from initial data (all possible types, not filtered)
  const availableTypes = useMemo(() => {
    const initialItems = buildEggList(initialPetEggs);
    return Array.from(
      new Set(initialItems.map((item) => item.info).filter(Boolean) as string[])
    ).sort();
  }, [initialPetEggs]);

  const availableRarities = useMemo(
    () =>
      initialRarities
        .sort((a, b) => a.level - b.level)
        .map((rarity) => rarity.name)
        .filter((name): name is string => Boolean(name)),
    [initialRarities]
  );

  const activeFiltersCount = rarityKeysArray.length + itemTypesArray.length;

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch pet eggs", error);
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
            searchValue={filters.name}
            onSearchValueChange={handleSearchChange}
            filtersContent={
              <EggsFiltersContent
                selectedRarities={rarityKeysArray}
                selectedTypes={itemTypesArray}
                onRarityChange={(rarities) => {
                  setFilters({
                    name: filters.name || "",
                    rarityKeys: rarities.length > 0 ? rarities.join(",") : null,
                    itemTypes: filters.itemTypes || null,
                  });
                }}
                onTypeChange={(types) => {
                  setFilters({
                    name: filters.name || "",
                    rarityKeys: filters.rarityKeys || null,
                    itemTypes: types.length > 0 ? types.join(",") : null,
                  });
                }}
                onClearAll={() => {
                  setFilters({
                    name: filters.name || "",
                    rarityKeys: "",
                    itemTypes: "",
                  });
                }}
                availableTypes={availableTypes}
                availableRarities={availableRarities}
                onClose={() => setIsFiltersOpen(false)}
              />
            }
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        {/* Mobile: Search Input - between header and cards */}
        <WikiExpandedSearchInput
          value={filters.name}
          onChange={handleSearchChange}
          onClear={handleClear}
          isExpanded={isSearchExpanded}
          onExpandedChange={setIsSearchExpanded}
          placeholder="Search eggs..."
          excludeRefs={[filterBarRef]}
        />
      </div>

      <EggsItemsGrid items={items} isLoading={isFetching} />

      <WikiFloatingFilterButton
        selectedRarities={rarityKeysArray}
        selectedTypes={itemTypesArray}
        onOpenFilters={() => setIsFiltersOpen(true)}
        filterBarRef={filterBarRef}
      />
    </div>
  );
}
