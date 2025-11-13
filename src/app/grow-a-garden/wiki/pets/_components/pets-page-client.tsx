'use client';

import { useEffect, useRef, useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { WikiFiltersBar } from '@/app/grow-a-garden/wiki/_components/wiki-filters-bar';
import { WikiFloatingFilterButton } from '@/app/grow-a-garden/wiki/_components/wiki-floating-filter-button';
import { WikiItemsGrid } from '@/app/grow-a-garden/wiki/_components/wiki-items-grid';
import { PetsFiltersContent } from '@/app/grow-a-garden/wiki/pets/_components/pets-filters-content';
import { cn } from '@/lib/utils';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent';

interface WikiItem {
  id: number;
  name: string;
  imageUrl: string;
  rarity?: Rarity;
  info?: string;
  href: string;
}

interface PetsPageClientProps {
  items: WikiItem[];
  availableTypes: string[];
}

export function PetsPageClient({ items, availableTypes }: PetsPageClientProps) {
  const [selectedRarities, setSelectedRarities] = useState<Rarity[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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
        !expandedInputRef.current.closest('.search-input-container')?.contains(event.target as Node) &&
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        if (!searchValue) {
          setIsSearchExpanded(false);
        }
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded, searchValue]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchQuery('');
    setIsSearchExpanded(false);
  };

  const activeFiltersCount = selectedRarities.length + selectedTypes.length;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Heading variant="h1">Pets</Heading>
          <WikiFiltersBar
            categoryName="Pets"
            onSearchChange={setSearchQuery}
            filterBarRef={filterBarRef}
            isFiltersOpen={isFiltersOpen}
            onFiltersOpenChange={setIsFiltersOpen}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandedChange={setIsSearchExpanded}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            filtersContent={
              <PetsFiltersContent
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
            'md:hidden search-input-container',
            isSearchExpanded ? 'block animate-[slide-in-from-top-2_300ms_ease-out]' : 'hidden',
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
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search pets..."
              className={cn(
                'h-10 w-full rounded-lg border border-border/40 bg-card/80 backdrop-blur-sm pl-10 pr-10 text-sm text-text-primary shadow-lg',
                'placeholder:text-text-secondary',
                'transition-all focus:border-accent-primary/40 focus:bg-card focus:outline-none focus:ring-0',
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

      <WikiItemsGrid
        items={items}
        selectedRarities={selectedRarities}
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        hideInfo={true}
      />

      <WikiFloatingFilterButton
        selectedRarities={selectedRarities}
        selectedTypes={selectedTypes}
        onOpenFilters={() => setIsFiltersOpen(true)}
        filterBarRef={filterBarRef}
      />
    </div>
  );
}
