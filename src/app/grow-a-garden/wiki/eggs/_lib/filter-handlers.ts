import { useCallback, useEffect, useRef } from "react";
import type { EggsFilterState } from "./filter-config";

/**
 * Creates filter change handlers for eggs page.
 * Uses refs to avoid unnecessary re-renders when handlers are passed as props.
 *
 * @param updateFilter - Function to update a single filter
 * @param updateFilters - Function to update multiple filters
 * @param setFilters - Function to update URL filters
 * @param debouncedFilters - Current debounced filter values
 * @param setIsSearchExpanded - Function to control search expansion state
 */
export function useEggsFilterHandlers(
  updateFilter: <K extends keyof EggsFilterState>(
    key: K,
    value: EggsFilterState[K]
  ) => void,
  updateFilters: (updates: Partial<EggsFilterState>) => void,
  setFilters: (updates: {
    name?: string | null;
    rarityKeys?: string | null;
    itemTypes?: string | null;
    page?: number | null;
  }) => void,
  debouncedFilters: EggsFilterState,
  setIsSearchExpanded: (expanded: boolean) => void
) {
  // Use refs to store latest values without causing re-renders
  const debouncedFiltersRef = useRef(debouncedFilters);

  // Update ref in effect to avoid updating during render
  useEffect(() => {
    debouncedFiltersRef.current = debouncedFilters;
  }, [debouncedFilters]);

  const handleSearchChange = useCallback(
    (value: string) => {
      updateFilter("name", value);
    },
    [updateFilter]
  );

  const handleClear = useCallback(() => {
    updateFilter("name", "");
    setFilters({ name: "" });
    setIsSearchExpanded(false);
  }, [updateFilter, setFilters, setIsSearchExpanded]);

  const handleRarityChange = useCallback(
    (rarities: string[]) => {
      updateFilter("rarityKeys", rarities);
    },
    [updateFilter]
  );

  const handleItemTypeChange = useCallback(
    (types: string[]) => {
      updateFilter("itemTypes", types);
    },
    [updateFilter]
  );

  const handleClearAll = useCallback(() => {
    updateFilters({
      rarityKeys: [],
      itemTypes: [],
    });
    setFilters({
      name: debouncedFiltersRef.current.name || "",
      rarityKeys: "",
      itemTypes: "",
      page: 1, // Reset page to 1 when clearing all filters
    });
  }, [updateFilters, setFilters]);

  return {
    handleSearchChange,
    handleClear,
    handleRarityChange,
    handleItemTypeChange,
    handleClearAll,
  };
}
