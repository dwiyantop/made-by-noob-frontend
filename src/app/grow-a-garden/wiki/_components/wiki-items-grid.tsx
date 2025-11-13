'use client';

import { ItemCard } from '@/components/ui/item-card';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent';

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

interface WikiItemsGridProps {
  items: WikiItem[];
  selectedRarities: Rarity[];
  selectedTypes: string[];
  searchQuery: string;
  hideInfo?: boolean;
}

export function WikiItemsGrid({
  items,
  selectedRarities,
  selectedTypes,
  searchQuery,
  hideInfo = false,
}: WikiItemsGridProps) {
  const filteredItems = items.filter(item => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.rarity?.toLowerCase().includes(query) ||
        item.info?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Rarity filter
    if (selectedRarities.length > 0) {
      if (!item.rarity || !selectedRarities.includes(item.rarity)) {
        return false;
      }
    }

    // Type filter
    if (selectedTypes.length > 0) {
      if (!item.info || !selectedTypes.includes(item.info)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-secondary">No items found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              href={item.href}
              name={item.name}
              imageUrl={item.imageUrl}
              rarity={item.rarity}
              info={item.info}
              hatchTime={item.hatchTime}
              petCount={item.petCount}
              hideInfo={hideInfo}
            />
          ))}
        </div>
      )}
    </>
  );
}
