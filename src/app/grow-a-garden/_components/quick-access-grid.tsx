import Link from 'next/link';

import { Card, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickAccessItem {
  href: string;
  title: string;
  icon: string;
  iconBg: string;
}

interface QuickAccessGridProps {
  items: readonly QuickAccessItem[];
}

export function QuickAccessGrid({ items }: QuickAccessGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
      {items.map(item => (
        <Link key={item.href} href={item.href}>
          <Card
            className={cn(
              'group relative overflow-hidden border border-border/50 backdrop-blur-md transition-all duration-300',
              'bg-card/60 hover:border-accent-primary/60 hover:bg-card/70 hover:shadow-lg hover:shadow-accent-primary/10',
            )}
          >
            <CardHeader className="flex flex-row items-center gap-3 p-4">
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg m-0', item.iconBg)}>
                <span
                  className={cn(
                    item.icon,
                    'h-4 w-4 text-accent-primary transition-all duration-300 group-hover:scale-110 m-0',
                  )}
                  aria-hidden
                />
              </div>
              <span
                className="text-base font-semibold leading-none text-text-primary"
                style={{ display: 'flex', alignItems: 'center', lineHeight: '1', height: '32px' }}
              >
                {item.title}
              </span>
            </CardHeader>
            <div className="absolute inset-0 bg-linear-to-t from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Card>
        </Link>
      ))}
    </div>
  );
}
