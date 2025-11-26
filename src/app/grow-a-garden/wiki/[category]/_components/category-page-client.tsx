"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Heading } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";
import { RarityBadge } from "@/app/grow-a-garden/_components/rarity-badge";
import { WikiFiltersBar } from "@/app/grow-a-garden/wiki/_components/wiki-filters-bar";
import { WikiFloatingFilterButton } from "@/app/grow-a-garden/wiki/_components/wiki-floating-filter-button";
import { WikiItemsGrid } from "@/app/grow-a-garden/wiki/_components/wiki-items-grid";
import { GenericFiltersContent } from "@/app/grow-a-garden/wiki/_components/generic-filters-content";
import { cn } from "@/lib/utils";

type Rarity =
  | "Common"
  | "Uncommon"
  | "Rare"
  | "Legendary"
  | "Mythical"
  | "Divine"
  | "Prismatic"
  | "Transcendent";

interface WikiItem {
  id: number;
  name: string;
  imageUrl: string;
  rarity?: Rarity;
  info?: string;
  hatchTime?: string;
  petCount?: number;
  href: string;
}

interface CategoryPageClientProps {
  categoryName: string;
  items: WikiItem[];
  availableTypes: string[];
}

export function CategoryPageClient({
  categoryName,
  items,
  availableTypes,
}: CategoryPageClientProps) {
  const [selectedRarities, setSelectedRarities] = useState<Rarity[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const filterBarRef = useRef<HTMLDivElement>(null);
  const expandedInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && expandedInputRef.current) {
      expandedInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        expandedInputRef.current &&
        !expandedInputRef.current
          .closest(".search-input-container")
          ?.contains(event.target as Node) &&
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        if (!searchValue) {
          setIsSearchExpanded(false);
        }
      }
    };

    if (isSearchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchExpanded, searchValue]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchQuery("");
    setIsSearchExpanded(false);
  };

  // Filter items based on search query, selected rarities, and selected types
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Rarity filter
      const matchesRarity =
        selectedRarities.length === 0 ||
        (item.rarity && selectedRarities.includes(item.rarity));

      // Type filter
      const matchesType =
        selectedTypes.length === 0 ||
        (item.info && selectedTypes.includes(item.info));

      return matchesSearch && matchesRarity && matchesType;
    });
  }, [items, searchQuery, selectedRarities, selectedTypes]);

  const activeFiltersCount = selectedRarities.length + selectedTypes.length;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Heading variant="h1">{categoryName}</Heading>
          <WikiFiltersBar
            categoryName={categoryName}
            onSearchChange={setSearchQuery}
            filterBarRef={filterBarRef}
            isFiltersOpen={isFiltersOpen}
            onFiltersOpenChange={setIsFiltersOpen}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandedChange={setIsSearchExpanded}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            filtersContent={
              <GenericFiltersContent
                selectedRarities={selectedRarities}
                selectedTypes={selectedTypes}
                onRarityChange={setSelectedRarities}
                onTypeChange={setSelectedTypes}
                availableTypes={availableTypes}
                onClose={() => setIsFiltersOpen(false)}
              />
            }
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        {/* Mobile: Search Input - between header and cards */}
        <div
          className={cn(
            "md:hidden search-input-container",
            isSearchExpanded
              ? "block animate-[slide-in-from-top-2_300ms_ease-out]"
              : "hidden"
          )}
        >
          <div className="relative">
            <span
              className="i-lucide-search absolute left-3 top-1/2 z-10 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-text-secondary pointer-events-none"
              aria-hidden
            />
            <input
              ref={expandedInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={`Search ${categoryName.toLowerCase()}...`}
              className={cn(
                "h-10 w-full rounded-lg border border-border/40 bg-card/80 backdrop-blur-sm pl-10 pr-10 text-sm text-text-primary shadow-lg",
                "placeholder:text-text-secondary",
                "transition-all focus:border-accent-primary/40 focus:bg-card focus:outline-none focus:ring-0"
              )}
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                aria-label="Clear search"
              >
                <span className="i-lucide-x h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>
      </div>

      <WikiItemsGrid isEmpty={filteredItems.length === 0}>
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative transition-all duration-300 ease-out"
                  style={{
                    width: "75%",
                    height: "75%",
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25%, (min-width: 640px) 33.33%, 50%"
                    className="object-contain transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                    loading="lazy"
                    quality={85}
                  />
                </div>
              </div>
              <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
                {item.rarity && (
                  <RarityBadge
                    rarity={item.rarity}
                    size="sm"
                    className="relative z-10"
                  />
                )}
              </div>
            </div>
            <div className="relative space-y-1 bg-card/40 p-3 backdrop-blur-sm">
              <Paragraph
                size="sm"
                className="font-semibold text-text-primary line-clamp-1"
              >
                {item.name}
              </Paragraph>
              {(item.hatchTime || item.petCount !== undefined) && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                  {item.hatchTime && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="i-lucide-clock h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      />
                      <span className="line-clamp-1">
                        Hatches in {item.hatchTime}
                      </span>
                    </div>
                  )}
                  {item.petCount !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="i-lucide-dog h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      />
                      <span className="line-clamp-1">
                        Has {item.petCount}{" "}
                        {item.petCount === 1 ? "pet" : "pets"}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </WikiItemsGrid>

      <WikiFloatingFilterButton
        activeFiltersCount={activeFiltersCount}
        onOpenFilters={() => setIsFiltersOpen(true)}
        filterBarRef={filterBarRef}
      />
    </div>
  );
}
