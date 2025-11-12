'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const hubNavItems = [
  { href: '/grow-a-garden', label: 'Wiki', icon: 'i-lucide-book-open' },
  { href: '/grow-a-garden/tools', label: 'Tools', icon: 'i-lucide-wrench' },
  { href: '/grow-a-garden/codes', label: 'Codes', icon: 'i-lucide-key' },
  { href: '/grow-a-garden/marketplace', label: 'Marketplace', icon: 'i-lucide-store' },
] as const;

export function HubNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-border/50">
      <Container className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
        {hubNavItems.map(item => {
          // Special case: /grow-a-garden should be active for Wiki
          const isActive =
            item.href === '/grow-a-garden'
              ? pathname === '/grow-a-garden' || pathname.startsWith('/grow-a-garden/wiki')
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                leadingIcon={item.icon}
                className={cn('whitespace-nowrap', isActive && 'bg-card border border-border/50')}
              >
                {item.label}
              </Button>
            </Link>
          );
        })}
      </Container>
    </nav>
  );
}
