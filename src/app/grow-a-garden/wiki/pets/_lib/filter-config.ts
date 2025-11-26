import type { FilterFieldConfig } from "@/app/grow-a-garden/wiki/_hooks/use-debounced-filters";

export type { FilterFieldConfig };

/**
 * Filter configuration for pets page.
 * Defines how filter values are parsed from URL and serialized back.
 */
export interface PetsFilterState extends Record<string, unknown> {
  name: string;
  rarityKeys: string[];
  passiveStates: string[];
}

/**
 * Configuration for each filter field in the pets page.
 * Used by useDebouncedFilters hook to manage filter state.
 */
export const petsFilterConfig = {
  name: {
    parseUrlValue: (urlValue: string) => urlValue || "",
    serializeValue: (value: string) => value || "",
  },
  rarityKeys: {
    parseUrlValue: (urlValue: string) =>
      urlValue ? urlValue.split(",").filter(Boolean) : [],
    serializeValue: (value: string[]) =>
      value.length > 0 ? value.join(",") : null,
    compareValues: (a: string[], b: string[]) =>
      JSON.stringify([...a].sort()) === JSON.stringify([...b].sort()),
  },
  passiveStates: {
    parseUrlValue: (urlValue: string) =>
      urlValue ? urlValue.split(",").filter(Boolean) : [],
    serializeValue: (value: string[]) =>
      value.length > 0 ? value.join(",") : null,
    compareValues: (a: string[], b: string[]) =>
      JSON.stringify([...a].sort()) === JSON.stringify([...b].sort()),
  },
} as {
  [K in keyof PetsFilterState]: FilterFieldConfig<PetsFilterState[K]>;
};
