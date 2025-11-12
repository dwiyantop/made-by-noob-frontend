'use client';

import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { FiltersSheet } from '@/components/ui/filters-sheet';
import { WikiFiltersContent } from '@/app/grow-a-garden/wiki/_components/wiki-filters-content';
import { WikiSearch } from '@/app/grow-a-garden/wiki/_components/wiki-search';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent';

interface WikiFiltersBarProps {
  categoryName: string;
  selectedRarities: Rarity[];
  selectedTypes: string[];
  onRarityChange: (rarities: Rarity[]) => void;
  onTypeChange: (types: string[]) => void;
  availableTypes: string[];
  onSearchChange: (value: string) => void;
  filterBarRef?: React.RefObject<HTMLDivElement | null>;
  isFiltersOpen?: boolean;
  onFiltersOpenChange?: (open: boolean) => void;
  isSearchExpanded?: boolean;
  onSearchExpandedChange?: (expanded: boolean) => void;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
}

export function WikiFiltersBar({
  categoryName,
  selectedRarities,
  selectedTypes,
  onRarityChange,
  onTypeChange,
  availableTypes,
  onSearchChange,
  filterBarRef,
  isFiltersOpen: controlledIsFiltersOpen,
  onFiltersOpenChange,
  isSearchExpanded,
  onSearchExpandedChange,
  searchValue,
  onSearchValueChange,
}: WikiFiltersBarProps) {
  const [internalIsFiltersOpen, setInternalIsFiltersOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const internalFilterBarRef = useRef<HTMLDivElement>(null);

  // Use controlled state if provided, otherwise use internal state
  const isFiltersOpen = controlledIsFiltersOpen ?? internalIsFiltersOpen;
  const setIsFiltersOpen = onFiltersOpenChange ?? setInternalIsFiltersOpen;
  const ref = filterBarRef ?? internalFilterBarRef;

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const hasActiveFilters = selectedRarities.length > 0 || selectedTypes.length > 0;

  return (
    <>
      <div ref={ref} className="flex items-center gap-3">
        <WikiSearch
          placeholder={`Search ${categoryName.toLowerCase()}...`}
          onSearchChange={onSearchChange}
          isExpanded={isSearchExpanded}
          onExpandedChange={onSearchExpandedChange}
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
        />
        {/* Filter Button - Icon Only */}
        <button
          type="button"
          onClick={() => setIsFiltersOpen(true)}
          className="relative h-10 w-10 flex items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-text-primary hover:bg-card/50"
          aria-label="Open filters"
        >
          <span className="i-lucide-filter h-5 w-5" aria-hidden />
          {hasActiveFilters && (
            <Badge
              variant="solid"
              color="primary"
              size="xs"
              className="absolute -right-1 -top-1 h-4 min-w-4 flex items-center justify-center px-0.5"
            >
              {selectedRarities.length + selectedTypes.length}
            </Badge>
          )}
        </button>
      </div>

      {/* Filters Sheet - Desktop from right, Mobile from bottom */}
      <FiltersSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        side={isDesktop ? 'right' : 'bottom'}
      >
        <WikiFiltersContent
          selectedRarities={selectedRarities}
          selectedTypes={selectedTypes}
          onRarityChange={onRarityChange}
          onTypeChange={onTypeChange}
          availableTypes={availableTypes}
          onClose={() => setIsFiltersOpen(false)}
        />
      </FiltersSheet>
    </>
  );
}
