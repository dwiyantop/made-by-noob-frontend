"use client";

import { PetCard } from "@/app/grow-a-garden/wiki/pets/_components/pet-card";
import { PetCardSkeleton } from "@/app/grow-a-garden/wiki/pets/_components/pet-card";
import type { WikiPetItem } from "@/app/grow-a-garden/wiki/pets/_lib/transformers";
import { WikiItemsGrid } from "@/app/grow-a-garden/wiki/_components/wiki-items-grid";

interface PetsItemsGridProps {
  items: WikiPetItem[];
  isLoading?: boolean;
}

export function PetsItemsGrid({
  items,
  isLoading = false,
}: PetsItemsGridProps) {
  // Show skeleton only when loading and no items (initial load)
  const showSkeletonOnly = isLoading && items.length === 0;

  if (showSkeletonOnly) {
    return (
      <WikiItemsGrid isEmpty={false}>
        {Array.from({ length: 8 }).map((_, index) => (
          <PetCardSkeleton key={`pet-item-skeleton-${index}`} />
        ))}
      </WikiItemsGrid>
    );
  }

  return (
    <WikiItemsGrid isEmpty={items.length === 0 && !isLoading}>
      {items.length === 0 && !isLoading ? (
        <div className="col-span-full py-12 text-center">
          <p className="text-text-secondary">
            No pets found matching your search.
          </p>
        </div>
      ) : (
        // Always show items - placeholderData will keep previous items visible during loading
        // This prevents skeleton glitches during pagination/filter changes
        items.map((item) => <PetCard key={item.id} pet={item} />)
      )}
    </WikiItemsGrid>
  );
}
