// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useQueryStates } from "nuqs";

// import { Heading } from "@/components/ui/heading";
// import { WikiFiltersBar } from "@/app/grow-a-garden/wiki/_components/wiki-filters-bar";
// import { WikiFloatingFilterButton } from "@/app/grow-a-garden/wiki/_components/wiki-floating-filter-button";
// import { WikiExpandedSearchInput } from "@/app/grow-a-garden/wiki/_components/wiki-expanded-search-input";
// import { PetsItemsGrid } from "@/app/grow-a-garden/wiki/pets/_components/pets-items-grid";
// import { PetsFiltersContent } from "@/app/grow-a-garden/wiki/pets/_components/pets-filters-content";
// import { buildPetList } from "@/app/grow-a-garden/wiki/pets/_lib/transformers";
// import { petsSearchParams } from "@/app/grow-a-garden/_repositories/pet/pets/pets-search-params";
// import type { Pet } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
// import { fetchPetsClient } from "@/app/grow-a-garden/_repositories/pet/pets/pets-data";

// interface PetsPageClientProps {
//   initialPets: Pet[];
//   initialRarities: string[];
//   initialPassiveStateKeys: string[];
//   initialRaritiesFilter?: string[];
//   initialPassiveStatesFilter?: string[];
// }

// export function PetsPageClient({
//   initialPets,
//   initialRarities,
//   initialPassiveStateKeys,
//   initialRaritiesFilter = [],
//   initialPassiveStatesFilter = [],
// }: PetsPageClientProps) {
//   const [filters, setFilters] = useQueryStates(petsSearchParams, {
//     history: "push",
//     shallow: true,
//   });

//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
//   const filterBarRef = useRef<HTMLDivElement>(null);

//   // Parse URL filter params (comma-separated strings) to arrays
//   // Falls back to SSR initial values if params are null (not in URL)
//   // Empty string indicates cleared filter, returns empty array
//   const rarityKeysArray = useMemo(() => {
//     if (filters.rarityKeys === null) return initialRaritiesFilter;
//     if (filters.rarityKeys === "") return [];
//     return filters.rarityKeys.split(",").filter(Boolean);
//   }, [filters.rarityKeys, initialRaritiesFilter]);

//   const passiveStateKeysArray = useMemo(() => {
//     if (filters.passiveStates === null) return initialPassiveStatesFilter;
//     if (filters.passiveStates === "") return [];
//     return filters.passiveStates.split(",").filter(Boolean);
//   }, [filters.passiveStates, initialPassiveStatesFilter]);

//   // Generate stable query key for TanStack Query cache
//   // Changes when any filter value changes, triggering refetch
//   // Include: filter fields (name, rarityKeys, passiveStates), pagination (page, limit), and sorting (sort, order)
//   const queryKey = useMemo(() => {
//     return [
//       "pets",
//       filters.page ?? 1,
//       filters.limit ?? 20,
//       filters.name || "",
//       filters.rarityKeys || "",
//       filters.passiveStates || "",
//       filters.sort || "lastSyncedAt",
//       filters.order || "desc",
//     ];
//   }, [
//     filters.page,
//     filters.limit,
//     filters.name,
//     filters.rarityKeys,
//     filters.passiveStates,
//     filters.sort,
//     filters.order,
//   ]);

//   const { data, isFetching, error } = useQuery<Pet[], Error>({
//     queryKey,
//     queryFn: async () => {
//       const response = await fetchPetsClient({
//         page: filters.page ?? 1,
//         limit: filters.limit ?? 20,
//         name: filters.name || undefined,
//         rarityKeys: filters.rarityKeys || undefined,
//         passiveStates: filters.passiveStates || undefined,
//         sort: filters.sort || "lastSyncedAt",
//         order: filters.order || "desc",
//       });
//       return response.data;
//     },
//     placeholderData: (previousData) => previousData,
//     initialData: initialPets,
//     staleTime: 60 * 1000,
//     gcTime: 5 * 60 * 1000,
//     retry: 1,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//   });

//   const pets = data ?? initialPets;

//   // Store previous filter values for logging
//   const prevFiltersRef = useRef({
//     name: filters.name || "",
//     rarityKeys: [...rarityKeysArray],
//     passiveStates: [...passiveStateKeysArray],
//   });

//   const handleSearchChange = useCallback(
//     (value: string) => {
//       const previous = prevFiltersRef.current.name;
//       console.log("[PetsPageClient] Search changed:", {
//         value,
//         previous,
//       });
//       prevFiltersRef.current.name = value;
//       setFilters({ name: value });
//     },
//     [setFilters]
//   );

//   const handleClear = useCallback(() => {
//     console.log("[PetsPageClient] Search cleared");
//     prevFiltersRef.current.name = "";
//     setFilters({ name: "" });
//     setIsSearchExpanded(false);
//   }, [setFilters]);

//   const handleRarityChange = useCallback(
//     (rarities: string[]) => {
//       const previous = prevFiltersRef.current.rarityKeys;
//       console.log("[PetsPageClient] Rarity filter changed:", {
//         rarities,
//         previous,
//       });
//       prevFiltersRef.current.rarityKeys = rarities;
//       setFilters({
//         name: filters.name || "",
//         rarityKeys: rarities.length > 0 ? rarities.join(",") : null,
//         passiveStates: filters.passiveStates || null,
//       });
//     },
//     [filters.name, filters.passiveStates, setFilters]
//   );

//   const handlePassiveStateKeyChange = useCallback(
//     (keys: string[]) => {
//       const previous = prevFiltersRef.current.passiveStates;
//       console.log("[PetsPageClient] Passive state filter changed:", {
//         keys,
//         previous,
//       });
//       prevFiltersRef.current.passiveStates = keys;
//       setFilters({
//         name: filters.name || "",
//         rarityKeys: filters.rarityKeys || null,
//         passiveStates: keys.length > 0 ? keys.join(",") : null,
//       });
//     },
//     [filters.name, filters.rarityKeys, setFilters]
//   );

//   const handleClearAll = useCallback(() => {
//     const previousRarities = prevFiltersRef.current.rarityKeys;
//     const previousPassiveStates = prevFiltersRef.current.passiveStates;
//     console.log("[PetsPageClient] All filters cleared:", {
//       previousRarities,
//       previousPassiveStates,
//     });
//     prevFiltersRef.current.rarityKeys = [];
//     prevFiltersRef.current.passiveStates = [];
//     setFilters({
//       name: filters.name || "",
//       rarityKeys: "",
//       passiveStates: "",
//     });
//   }, [filters.name, setFilters]);

//   const items = buildPetList(pets);

//   const activeFiltersCount =
//     rarityKeysArray.length + passiveStateKeysArray.length;

//   useEffect(() => {
//     if (error) {
//       console.error("Failed to fetch pets", error);
//     }
//   }, [error]);

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between gap-4">
//           <Heading variant="h1">Pets</Heading>
//           <WikiFiltersBar
//             categoryName="Pets"
//             onSearchChange={handleSearchChange}
//             filterBarRef={filterBarRef}
//             isFiltersOpen={isFiltersOpen}
//             onFiltersOpenChange={setIsFiltersOpen}
//             isSearchExpanded={isSearchExpanded}
//             onSearchExpandedChange={setIsSearchExpanded}
//             searchValue={filters.name}
//             onSearchValueChange={handleSearchChange}
//             filtersContent={
//               <PetsFiltersContent
//                 availableRarities={initialRarities}
//                 availablePassiveStateKeys={initialPassiveStateKeys}
//                 selectedRarities={rarityKeysArray}
//                 selectedPassiveStateKeys={passiveStateKeysArray}
//                 onRarityChange={handleRarityChange}
//                 onPassiveStateKeyChange={handlePassiveStateKeyChange}
//                 onClearAll={handleClearAll}
//                 onClose={() => setIsFiltersOpen(false)}
//               />
//             }
//             activeFiltersCount={activeFiltersCount}
//           />
//         </div>

//         {/* Mobile: Expandable search input displayed between header and content */}
//         <WikiExpandedSearchInput
//           value={filters.name}
//           onChange={handleSearchChange}
//           onClear={handleClear}
//           isExpanded={isSearchExpanded}
//           onExpandedChange={setIsSearchExpanded}
//           placeholder="Search pets..."
//           excludeRefs={[filterBarRef]}
//         />
//       </div>

//       <PetsItemsGrid items={items} isLoading={isFetching} />

//       <WikiFloatingFilterButton
//         activeFiltersCount={activeFiltersCount}
//         onOpenFilters={() => setIsFiltersOpen(true)}
//         filterBarRef={filterBarRef}
//       />
//     </div>
//   );
// }
