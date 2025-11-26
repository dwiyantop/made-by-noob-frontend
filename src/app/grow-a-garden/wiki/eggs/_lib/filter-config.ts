import type { FilterFieldConfig } from "@/app/grow-a-garden/wiki/_hooks/use-debounced-filters";

export type { FilterFieldConfig };

/**
 * Filter configuration for eggs page.
 * Defines how filter values are parsed from URL and serialized back.
 */
export interface EggsFilterState extends Record<string, unknown> {
  name: string;
  rarityKeys: string[];
  itemTypes: string[];
}

/**
 * Configuration for each filter field in the eggs page.
 * Used by useDebouncedFilters hook to manage filter state.
 */
export const eggsFilterConfig = {
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
  itemTypes: {
    // Parse from URL (lowercase "pet,egg") to UI format (title-case ["Pet", "Egg"])
    parseUrlValue: (urlValue: string) =>
      urlValue
        ? urlValue
            .split(",")
            .filter(Boolean)
            .map(
              (type) =>
                type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
            )
        : [],
    // Serialize from UI format (title-case ["Pet", "Egg"]) to URL (lowercase "pet,egg")
    serializeValue: (value: string[]) =>
      value.length > 0
        ? value.map((type) => type.toLowerCase()).join(",")
        : null,
    compareValues: (a: string[], b: string[]) =>
      JSON.stringify([...a].sort()) === JSON.stringify([...b].sort()),
  },
} as {
  [K in keyof EggsFilterState]: FilterFieldConfig<EggsFilterState[K]>;
};
