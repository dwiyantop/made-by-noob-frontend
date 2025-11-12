'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BrandLogo } from '@/components/brand-logo';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Sheet } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#features', label: 'Features', icon: 'i-lucide-sparkles' },
  { href: '#supported-games', label: 'Games', icon: 'i-lucide-gamepad-2' },
] as const;

export function MainHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const sections = navItems
      .map(item => {
        const id = item.href.replace('#', '');
        return document.getElementById(id);
      })
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the section that is currently most visible in the viewport
      const visibleEntries = entries.filter(entry => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by intersection ratio and position, pick the one closest to top
        const sortedEntries = visibleEntries.sort((a, b) => {
          const aTop = a.boundingClientRect.top;
          const bTop = b.boundingClientRect.top;
          return aTop - bTop;
        });

        const activeEntry = sortedEntries[0];
        const id = activeEntry.target.id;
        setActiveItem(`#${id}`);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <BrandLogo />
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map(item => {
              const isActive = activeItem === item.href;
              const href = isHomePage ? item.href : `/${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    'group inline-flex items-center gap-2 px-0 py-1 text-[15px] font-medium text-text-primary/85 transition-colors no-underline hover:no-underline focus-visible:no-underline hover:text-accent-primary focus-visible:text-accent-primary',
                    isActive && 'text-accent-primary',
                  )}
                  onClick={() => setActiveItem(item.href)}
                >
                  <span
                    className={cn(
                      item.icon,
                      'text-base text-accent-primary transition-transform duration-200 group-hover:-translate-y-0.5',
                      isActive && '-translate-y-0.5',
                    )}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-md border border-border/30 bg-background/60 text-text-primary shadow-sm transition-colors hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden',
              isMobileMenuOpen && 'text-accent-primary border-accent-primary/40 bg-background/80',
            )}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-pressed={isMobileMenuOpen}
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span
                className={cn(
                  'hamburger-bar',
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 translate-y-0',
                )}
              />
              <span
                className={cn(
                  'hamburger-bar top-1/2 -translate-y-1/2',
                  isMobileMenuOpen ? 'opacity-0 scale-x-40' : 'opacity-100 scale-x-100',
                )}
              />
              <span
                className={cn(
                  'hamburger-bar',
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 translate-y-0',
                )}
              />
              <span
                className={cn(
                  'absolute -inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,220,130,0.25),transparent_65%)] opacity-0 transition-opacity duration-300',
                  isMobileMenuOpen && 'opacity-100',
                )}
              />
            </span>
            <span className="sr-only">{isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
          </button>
        </Container>
      </header>

      <Sheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <div className="flex h-16 items-center justify-between px-4">
          <BrandLogo />
          <Button
            variant="ghost"
            square
            leadingIcon="i-lucide-x"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
        </div>
        <nav className="mt-4 flex flex-col px-4 pb-6">
          {navItems.map(item => {
            const isActive = activeItem === item.href;
            const href = isHomePage ? item.href : `/home${item.href}`;
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'flex w-full items-center gap-3 justify-start px-0 py-2 text-base font-medium text-text-primary no-underline hover:text-accent-primary focus-visible:text-accent-primary',
                  isActive && 'text-accent-primary',
                )}
                onClick={() => {
                  setActiveItem(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className={cn(item.icon, 'text-base text-accent-primary')} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Sheet>
    </>
  );
}
