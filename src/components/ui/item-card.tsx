import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';
import { cn } from '@/lib/utils';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent';

interface ItemCardProps {
  href: string;
  name: string;
  imageUrl: string;
  rarity?: Rarity;
  info?: string;
  hatchTime?: string;
  petCount?: number;
  className?: string;
}

export function ItemCard({ href, name, imageUrl, rarity, info, hatchTime, petCount, className }: ItemCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40',
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <ImageLoader
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25%, (min-width: 640px) 33.33%, 50%"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          fallbackClassName="bg-card/90"
        />
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
          {info && (
            <Badge
              variant="soft"
              color="neutral"
              size="sm"
              className="relative z-20 bg-background/30 backdrop-blur-sm border border-border/20"
            >
              {info}
            </Badge>
          )}
          {rarity && <RarityBadge rarity={rarity} size="sm" className="relative z-10" />}
        </div>
      </div>
      <div className="relative space-y-1 bg-card/40 p-3 backdrop-blur-sm">
        <Paragraph size="sm" className="font-semibold text-text-primary line-clamp-1">
          {name}
        </Paragraph>
        {(hatchTime || petCount !== undefined) && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-text-secondary">
            {hatchTime && (
              <div className="flex items-center gap-1.5">
                <span className="i-lucide-clock h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="line-clamp-1">Hatches in {hatchTime}</span>
              </div>
            )}
            {petCount !== undefined && (
              <div className="flex items-center gap-1.5">
                <span className="i-lucide-dog h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="line-clamp-1">
                  Has {petCount} {petCount === 1 ? 'pet' : 'pets'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
