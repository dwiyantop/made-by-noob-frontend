'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { cn } from '@/lib/utils';

export interface GameTileProps {
  href: string;
  title: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  className?: string;
}

export function GameTile({ href, title, description, imageUrl, badge, className }: GameTileProps) {
  const resolvedSrc = imageUrl ?? 'https://placehold.co/800x500/0f172a/1e293b?text=Coming+Soon';

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40',
        className,
      )}
    >
      <div className="relative aspect-3/2 w-full">
        <ImageLoader
          src={resolvedSrc}
          alt={title}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={href === '/grow-a-garden'}
          loading="eager"
          fallbackClassName="bg-card/90"
        />
        <div className="absolute inset-0 z-20 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.6)_60%,transparent_100%)] transition-opacity duration-300" />
        {badge && (
          <div className="absolute right-4 top-4 z-30">
            <Badge variant="solid" color="secondary" size="sm" className="backdrop-blur-sm shadow-lg">
              {badge}
            </Badge>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 space-y-1.5 px-5 pb-5 pt-12">
          <Heading variant="h3" className="text-2xl font-bold text-text-primary">
            {title}
          </Heading>
          {description && (
            <Paragraph size="sm" className="text-text-primary/80 line-clamp-2">
              {description}
            </Paragraph>
          )}
        </div>
      </div>
    </Link>
  );
}
