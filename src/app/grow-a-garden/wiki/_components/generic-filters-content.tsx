'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent';

interface GenericFiltersContentProps {
  selectedRarities: Rarity[];
  selectedTypes: string[];
  onRarityChange: (rarities: Rarity[]) => void;
  onTypeChange: (types: string[]) => void;
  availableTypes: string[];
  onClose?: () => void;
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

export function GenericFiltersContent({
  selectedRarities,
  selectedTypes,
  onRarityChange,
  onTypeChange,
  availableTypes,
  onClose,
}: GenericFiltersContentProps) {
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
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/40 px-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-0 text-xs">
              Clear All
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" square onClick={onClose} leadingIcon="i-lucide-x" aria-label="Close filters" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {/* Rarity Filter */}
          <div className="space-y-3">
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
                <Chip key={rarity} onClick={() => toggleRarity(rarity)} selected={selectedRarities.includes(rarity)}>
                  {rarity}
                </Chip>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          {availableTypes.length > 0 && (
            <div className="space-y-3">
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
                  <Chip key={type} onClick={() => toggleType(type)} selected={selectedTypes.includes(type)}>
                    {type}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-border/40">
              <div className="space-y-2">
                <p className="text-xs font-medium text-text-secondary">Active Filters</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRarities.map(rarity => (
                    <Badge key={rarity} variant="subtle" color="primary" size="sm">
                      {rarity}
                    </Badge>
                  ))}
                  {selectedTypes.map(type => (
                    <Badge key={type} variant="subtle" color="neutral" size="sm">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
