import { useCallback, useEffect, useRef } from "react";
import type { PetsFilterState } from "./filter-config";

/**
 * Creates filter change handlers for pets page.
 * Uses refs to avoid unnecessary re-renders when handlers are passed as props.
 *
 * @param updateFilter - Function to update a single filter
 * @param updateFilters - Function to update multiple filters
 * @param setFilters - Function to update URL filters
 * @param debouncedFilters - Current debounced filter values
 * @param setIsSearchExpanded - Function to control search expansion state
 */
export function usePetsFilterHandlers(
  updateFilter: <K extends keyof PetsFilterState>(
    key: K,
    value: PetsFilterState[K]
  ) => void,
  updateFilters: (updates: Partial<PetsFilterState>) => void,
  setFilters: (updates: {
    name?: string | null;
    rarityKeys?: string | null;
    passiveStates?: string | null;
  }) => void,
  debouncedFilters: PetsFilterState,
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

  const handlePassiveStateKeyChange = useCallback(
    (keys: string[]) => {
      updateFilter("passiveStates", keys);
    },
    [updateFilter]
  );

  const handleClearAll = useCallback(() => {
    updateFilters({
      rarityKeys: [],
      passiveStates: [],
    });
    setFilters({
      name: debouncedFiltersRef.current.name || "",
      rarityKeys: "",
      passiveStates: "",
    });
  }, [updateFilters, setFilters]);

  return {
    handleSearchChange,
    handleClear,
    handleRarityChange,
    handlePassiveStateKeyChange,
    handleClearAll,
  };
}
