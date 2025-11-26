"use client";

import { memo, useCallback, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";

interface EggsFiltersContentProps {
  availableRarities: string[];
  availableItemTypes: string[];
  selectedRarities: string[];
  selectedTypes: string[];
  onRarityChange: (rarities: string[]) => void;
  onTypeChange: (types: string[]) => void;
  onClose?: () => void;
  onClearAll?: () => void;
}

/**
 * Filter section component for a single filter type.
 */
interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
}

const FilterSection = memo(function FilterSection({
  title,
  options,
  selected,
  onToggle,
  onClear,
}: FilterSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-text-secondary hover:text-accent-primary"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option}
            onClick={() => onToggle(option)}
            selected={selected.includes(option)}
          >
            {option}
          </Chip>
        ))}
      </div>
    </div>
  );
});

/**
 * Active filters summary component.
 */
interface ActiveFiltersSummaryProps {
  selectedRarities: string[];
  selectedTypes: string[];
}

const ActiveFiltersSummary = memo(function ActiveFiltersSummary({
  selectedRarities,
  selectedTypes,
}: ActiveFiltersSummaryProps) {
  return (
    <div className="pt-4 border-t border-border/40">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          Active Filters
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedRarities.map((rarity) => (
            <Badge key={rarity} variant="subtle" color="primary" size="sm">
              {rarity}
            </Badge>
          ))}
          {selectedTypes.map((type) => (
            <Badge key={type} variant="subtle" color="primary" size="sm">
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
});

export const EggsFiltersContent = memo(function EggsFiltersContent({
  availableRarities,
  availableItemTypes,
  selectedRarities,
  selectedTypes,
  onRarityChange,
  onTypeChange,
  onClose,
  onClearAll,
}: EggsFiltersContentProps) {
  const toggleRarity = useCallback(
    (rarity: string) => {
      if (selectedRarities.includes(rarity)) {
        onRarityChange(selectedRarities.filter((r) => r !== rarity));
      } else {
        onRarityChange([...selectedRarities, rarity]);
      }
    },
    [selectedRarities, onRarityChange]
  );

  const toggleType = useCallback(
    (type: string) => {
      if (selectedTypes.includes(type)) {
        onTypeChange(selectedTypes.filter((t) => t !== type));
      } else {
        onTypeChange([...selectedTypes, type]);
      }
    },
    [selectedTypes, onTypeChange]
  );

  const handleClearRarities = useCallback(() => {
    onRarityChange([]);
  }, [onRarityChange]);

  const handleClearTypes = useCallback(() => {
    onTypeChange([]);
  }, [onTypeChange]);

  const hasActiveFilters = useMemo(
    () => selectedRarities.length > 0 || selectedTypes.length > 0,
    [selectedRarities.length, selectedTypes.length]
  );

  const clearFilters = useCallback(() => {
    if (onClearAll) {
      onClearAll();
    } else {
      onRarityChange([]);
      onTypeChange([]);
    }
  }, [onClearAll, onRarityChange, onTypeChange]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/40 px-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-auto p-0 text-xs"
            >
              Clear All
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              square
              onClick={onClose}
              leadingIcon="i-lucide-x"
              aria-label="Close filters"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {/* Rarity Filter */}
          <FilterSection
            title="Rarity"
            options={availableRarities}
            selected={selectedRarities}
            onToggle={toggleRarity}
            onClear={handleClearRarities}
          />

          {/* Type Filter */}
          {availableItemTypes.length > 0 && (
            <FilterSection
              title="Type"
              options={availableItemTypes}
              selected={selectedTypes}
              onToggle={toggleType}
              onClear={handleClearTypes}
            />
          )}

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <ActiveFiltersSummary
              selectedRarities={selectedRarities}
              selectedTypes={selectedTypes}
            />
          )}
        </div>
      </div>
    </div>
  );
});
