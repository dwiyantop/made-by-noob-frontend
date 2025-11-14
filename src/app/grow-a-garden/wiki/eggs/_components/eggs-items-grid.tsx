"use client";

import { EggCard } from "@/app/grow-a-garden/wiki/eggs/_components/egg-card";
import type { WikiEggItem } from "@/app/grow-a-garden/wiki/eggs/_lib/transformers";

interface EggsItemsGridProps {
  items: WikiEggItem[];
  isLoading?: boolean;
}

export function EggsItemsGrid({
  items,
  isLoading = false,
}: EggsItemsGridProps) {
  const showSkeleton = isLoading && items.length === 0;

  if (showSkeleton) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`egg-item-skeleton-${index}`}
            className="h-52 animate-pulse rounded-2xl border border-border/20 bg-card/30"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-secondary">
            No items found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <EggCard key={item.id} egg={item} />
          ))}
        </div>
      )}
    </>
  );
}
