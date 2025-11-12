'use client';

import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent';

interface WikiFiltersProps {
  selectedRarities: Rarity[];
  selectedTypes: string[];
  onRarityChange: (rarities: Rarity[]) => void;
  onTypeChange: (types: string[]) => void;
  availableTypes: string[];
  className?: string;
}

const allRarities: Rarity[] = [
  'Common',
  'Uncommon',
  'Rare',
  'Legendary',
  'Mythical',
  'Divine',
  'Prismatic',
  'Transcendent',
];

export function WikiFilters({
  selectedRarities,
  selectedTypes,
  onRarityChange,
  onTypeChange,
  availableTypes,
  className,
}: WikiFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleRarity = (rarity: Rarity) => {
    if (selectedRarities.includes(rarity)) {
      onRarityChange(selectedRarities.filter(r => r !== rarity));
    } else {
      onRarityChange([...selectedRarities, rarity]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const hasActiveFilters = selectedRarities.length > 0 || selectedTypes.length > 0;

  const clearFilters = () => {
    onRarityChange([]);
    onTypeChange([]);
  };

  return (
    <div ref={filterRef} className={cn('relative', className)}>
      <Button
        variant="secondary"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        leadingIcon={isOpen ? 'i-lucide-chevron-up' : 'i-lucide-filter'}
      >
        Filters
        {hasActiveFilters && (
          <Badge variant="solid" color="primary" size="xs" className="ml-1">
            {selectedRarities.length + selectedTypes.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border/40 bg-card p-4 shadow-xl">
          <div className="space-y-4">
            {/* Rarity Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Rarity</h3>
                {selectedRarities.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onRarityChange([])}
                    className="text-xs text-text-secondary hover:text-accent-primary"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allRarities.map(rarity => (
                  <button
                    key={rarity}
                    type="button"
                    onClick={() => toggleRarity(rarity)}
                    className={cn(
                      'rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
                      selectedRarities.includes(rarity)
                        ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                        : 'border-border bg-card text-text-secondary hover:border-border/60 hover:bg-card/80',
                    )}
                  >
                    {rarity}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            {availableTypes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text-primary">Type</h3>
                  {selectedTypes.length > 0 && (
                    <button
                      type="button"
                      onClick={() => onTypeChange([])}
                      className="text-xs text-text-secondary hover:text-accent-primary"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleType(type)}
                      className={cn(
                        'rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
                        selectedTypes.includes(type)
                          ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                          : 'border-border bg-card text-text-secondary hover:border-border/60 hover:bg-card/80',
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear All */}
            {hasActiveFilters && (
              <div className="border-t border-border/40 pt-4">
                <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
