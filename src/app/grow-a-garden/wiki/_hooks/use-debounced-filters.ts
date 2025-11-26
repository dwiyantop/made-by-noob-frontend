import {
  useEffect,
  useRef,
  useState,
  startTransition,
  useCallback,
  useMemo,
} from "react";
import { useDebounce } from "@/hooks/use-debounce";

/**
 * Configuration for a debounced filter field
 */
export interface FilterFieldConfig<T> {
  /** Parse URL string value to internal format */
  parseUrlValue: (urlValue: string) => T;
  /** Serialize internal format to URL string */
  serializeValue: (value: T) => string | null;
  /** Compare two values (default: deep equality) */
  compareValues?: (a: T, b: T) => boolean;
}

/**
 * Hook for managing debounced filters with immediate UI updates.
 * This version handles a fixed set of filters to avoid calling hooks in loops.
 *
 * @param urlFilters - Current filter values from URL params
 * @param delay - Debounce delay in milliseconds (default: 500)
 * @param config - Configuration for each filter field
 * @param onFiltersChange - Callback to update URL params when debounced values change
 */
export function useDebouncedFilters<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>(
  urlFilters: Partial<Record<K, string | null | undefined>>,
  delay: number,
  config: {
    [Key in K]: FilterFieldConfig<T[Key]>;
  },
  onFiltersChange: (updates: Partial<Record<K, string | null>>) => void
) {
  // Initialize internal state from URL filters
  const [internalFilters, setInternalFilters] = useState<T>(() => {
    const initial = {} as T;
    for (const key in config) {
      const urlValue = urlFilters[key as K];
      const fieldConfig = config[key as K];

      if (urlValue === null || urlValue === undefined) {
        (initial as Record<string, unknown>)[key as string] =
          fieldConfig.parseUrlValue("");
      } else if (typeof urlValue === "string") {
        (initial as Record<string, unknown>)[key as string] =
          fieldConfig.parseUrlValue(urlValue);
      }
    }
    return initial;
  });

  const filterKeys = Object.keys(config) as K[];

  // For each key, we need to call useDebounce - but we can't do this in a loop
  // So we'll use a different approach: create a single debounced state object
  // and update it when internalFilters change

  // Serialize internalFilters to a string for debouncing (ensures change detection)
  // This works around the issue where useDebounce compares objects by reference
  const internalFiltersSerialized = useMemo(
    () => JSON.stringify(internalFilters),
    [internalFilters]
  );

  // Debounce the serialized string
  const debouncedSerialized = useDebounce(internalFiltersSerialized, delay);

  // Parse back to object and create new array references
  const debouncedAllFilters = useMemo(() => {
    try {
      const parsed = JSON.parse(debouncedSerialized) as T;
      // Create new object with new array references
      const result = {} as T;
      for (const key in parsed) {
        const value = parsed[key];
        if (Array.isArray(value)) {
          result[key] = [...value] as T[typeof key];
        } else {
          result[key] = value;
        }
      }
      return result;
    } catch {
      // Fallback to empty object if parsing fails
      return {} as T;
    }
  }, [debouncedSerialized]);

  // Create a new object reference with new array references to ensure React detects changes
  // This is important because React compares by reference, and arrays need new references
  // Use JSON.stringify to create a stable dependency that changes when contents change
  const debouncedFilters = useMemo(() => {
    // Create a new object with new array references to ensure change detection
    const result = {} as T;
    for (const key in debouncedAllFilters) {
      const value = debouncedAllFilters[key];
      // Create new array references for arrays to ensure change detection
      if (Array.isArray(value)) {
        result[key] = [...value] as T[typeof key];
      } else {
        result[key] = value;
      }
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedAllFilters)]);

  // Track previous debounced values to detect external changes
  const prevDebouncedRef = useRef<T>(debouncedFilters);

  // Track if we're updating URL internally to prevent sync loop
  const isInternalUpdateRef = useRef(false);

  // Update URL params when debounced values change
  useEffect(() => {
    const updates: Partial<Record<K, string | null>> = {};
    let hasChanges = false;

    for (const key of filterKeys) {
      const fieldConfig = config[key];
      const currentUrlValue = urlFilters[key];
      const serializedDebounced = fieldConfig.serializeValue(
        debouncedFilters[key]
      );

      // Normalize empty string to null for comparison (treat empty as "not set")
      const currentUrlString =
        typeof currentUrlValue === "string" && currentUrlValue !== ""
          ? currentUrlValue
          : null;

      // For comparison: normalize empty string to null
      // But keep the original serialized value for the update (empty string vs null matters for nuqs)
      const normalizedForComparison =
        serializedDebounced === "" ? null : serializedDebounced;

      if (normalizedForComparison !== currentUrlString) {
        // Pass the original serialized value (not normalized) to preserve empty string vs null distinction
        updates[key] = serializedDebounced;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      isInternalUpdateRef.current = true;
      prevDebouncedRef.current = { ...debouncedFilters };
      onFiltersChange(updates);
      // Reset flag after URL has a chance to update
      // Use requestAnimationFrame to ensure it happens after React's state update
      requestAnimationFrame(() => {
        setTimeout(() => {
          isInternalUpdateRef.current = false;
        }, 0);
      });
    }
  }, [debouncedFilters, urlFilters, config, onFiltersChange, filterKeys]);

  // Sync internal filters with URL on external changes (browser navigation, etc.)
  // Skip sync if we just updated URL internally
  useEffect(() => {
    if (isInternalUpdateRef.current) {
      return;
    }

    for (const key of filterKeys) {
      const fieldConfig = config[key];
      const urlValue = urlFilters[key];
      // Normalize empty string/null to empty string for parsing
      const urlString = urlValue && urlValue !== "" ? urlValue : "";
      const urlParsed = fieldConfig.parseUrlValue(urlString);

      const compare =
        fieldConfig.compareValues ||
        ((a: T[typeof key], b: T[typeof key]) =>
          JSON.stringify(a) === JSON.stringify(b));

      const debouncedMatchesUrl = compare(debouncedFilters[key], urlParsed);
      const prevDebouncedMatchesUrl = compare(
        prevDebouncedRef.current[key],
        urlParsed
      );
      const internalMatchesUrl = compare(internalFilters[key], urlParsed);

      // Only sync if:
      // 1. Debounced value doesn't match URL (meaning URL changed)
      // 2. Previous debounced value matched URL (meaning it was in sync before)
      // 3. Internal value doesn't match URL (meaning we need to sync)
      // This indicates an external change (browser navigation, etc.)
      if (
        !debouncedMatchesUrl &&
        prevDebouncedMatchesUrl &&
        !internalMatchesUrl
      ) {
        startTransition(() => {
          setInternalFilters((prev) => ({
            ...prev,
            [key]: urlParsed,
          }));
          prevDebouncedRef.current[key] = urlParsed;
        });
      }
    }
  }, [urlFilters, debouncedFilters, internalFilters, config, filterKeys]);

  // Update a single filter field
  const updateFilter = useCallback(<Key extends K>(key: Key, value: T[Key]) => {
    setInternalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Update multiple filter fields at once
  const updateFilters = useCallback((updates: Partial<T>) => {
    setInternalFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  return {
    /** Internal filter values for immediate UI updates */
    internalFilters,
    /** Debounced filter values for URL/API updates */
    debouncedFilters,
    /** Update a single filter field */
    updateFilter,
    /** Update multiple filter fields at once */
    updateFilters,
  };
}
