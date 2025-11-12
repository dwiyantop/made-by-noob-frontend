import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { cn } from '@/lib/utils';

interface EventCardProps {
  href: string;
  title: string;
  description: string;
  imageUrl: string;
  badge: {
    label: string;
    color: 'success' | 'info';
  };
  timeInfo: {
    icon: string;
    text: string;
  };
}

export function EventCard({ href, title, description, imageUrl, badge, timeInfo }: EventCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40',
      )}
    >
      <div className="relative aspect-3/2 w-full">
        <ImageLoader
          src={imageUrl}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          fallbackClassName="bg-card/90"
        />
        <div className="absolute inset-0 z-20 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.6)_60%,transparent_100%)] transition-opacity duration-300" />
        <div className="absolute right-4 top-4 z-30">
          <Badge variant="subtle" color={badge.color} size="md" className="shadow-lg">
            {badge.label}
          </Badge>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 space-y-1.5 px-5 pb-5 pt-12">
          <Heading variant="h3" className="text-2xl font-bold text-text-primary line-clamp-2">
            {title}
          </Heading>
          <Paragraph size="sm" className="text-text-primary/80 line-clamp-2">
            {description}
          </Paragraph>
          <div className="flex items-center gap-1.5 text-xs text-text-primary/60">
            <span className={cn(timeInfo.icon, 'h-3 w-3')} aria-hidden />
            {timeInfo.text}
          </div>
        </div>
      </div>
    </Link>
  );
}
