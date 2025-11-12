import type { Metadata } from 'next';
import Link from 'next/link';

import { getGameBySlug } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ArticleCard } from './_components/article-card';
import { EventCard } from './_components/event-card';
import { GameHero } from './_components/game-hero';
import { QuickAccessGrid } from './_components/quick-access-grid';

export const metadata: Metadata = {
  title: 'Grow a Garden Wiki & Guides | MadeByNoob',
  description:
    'Complete Grow a Garden wiki with eggs, pets, plants, seed packs, gears, crates, and cosmetics database. Find guides, codes, and tools for the popular Roblox farming game.',
  keywords: [
    'grow a garden',
    'grow a garden wiki',
    'grow a garden guides',
    'grow a garden codes',
    'grow a garden pets',
    'grow a garden eggs',
    'roblox grow a garden',
    'grow a garden database',
    'grow a garden items',
  ],
  openGraph: {
    title: 'Grow a Garden Wiki & Guides | MadeByNoob',
    description:
      'Complete Grow a Garden wiki with eggs, pets, plants, seed packs, gears, crates, and cosmetics database. Find guides, codes, and tools for the popular Roblox farming game.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden`,
  },
};

const quickAccessItems = [
  {
    href: '/grow-a-garden/wiki/eggs',
    title: 'Eggs',
    icon: 'i-lucide-egg',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
  {
    href: '/grow-a-garden/wiki/pets',
    title: 'Pets',
    icon: 'i-lucide-dog',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
  {
    href: '/grow-a-garden/wiki/plants',
    title: 'Plants',
    icon: 'i-lucide-leaf',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
  {
    href: '/grow-a-garden/wiki/seed-packs',
    title: 'Seed Packs',
    icon: 'i-lucide-layers',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
  {
    href: '/grow-a-garden/wiki/gears',
    title: 'Gears',
    icon: 'i-lucide-wrench',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
  {
    href: '/grow-a-garden/wiki/crates',
    title: 'Crates',
    icon: 'i-lucide-box',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
  {
    href: '/grow-a-garden/wiki/cosmetics',
    title: 'Cosmetics',
    icon: 'i-lucide-sparkles',
    gradient: 'from-slate-800/50 via-slate-700/40 to-slate-800/50',
    iconBg: 'bg-accent-primary/10',
  },
] as const;

export default function GrowAGardenPage() {
  const game = getGameBySlug('grow-a-garden');
  const gameTitle = game?.title || 'Grow a Garden';
  const gameDescription =
    'A relaxing Roblox farming adventure. Plant seeds, harvest crops, collect Sheckles, raise rare pets, complete quests, and build your ultimate dream garden.';

  return (
    <Container className="py-12">
      <div className="space-y-12">
        <GameHero title={gameTitle} description={gameDescription} imageUrl={game?.imageUrl} />

        <QuickAccessGrid items={quickAccessItems} />

        {/* Events Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Ongoing Events */}
            <div className="space-y-6">
              <Heading variant="h2">Ongoing Event</Heading>
              <EventCard
                href="/grow-a-garden/events/spring-festival-2024"
                title="Spring Festival 2024"
                description="Collect special spring seeds and unlock limited-time pets"
                imageUrl="https://picsum.photos/800/500?random=spring-festival"
                badge={{ label: 'Active', color: 'success' }}
                timeInfo={{ icon: 'i-lucide-clock', text: '5 days left' }}
              />
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <Heading variant="h2">Upcoming Event</Heading>
              <EventCard
                href="/grow-a-garden/events/summer-update-launch"
                title="Summer Update Launch"
                description="New plants, pets, and features coming soon"
                imageUrl="https://picsum.photos/800/500?random=summer-update"
                badge={{ label: 'Soon', color: 'info' }}
                timeInfo={{ icon: 'i-lucide-calendar', text: 'Starts in 12 days' }}
              />
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Heading variant="h2">Latest Guides & Tips</Heading>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/grow-a-garden/wiki">
                View All
                <span className="i-lucide-arrow-right ml-1 h-3 w-3" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Beginner's Guide to Pet Collection",
                description:
                  'Learn the basics of collecting and hatching pets in Grow a Garden. Discover which pets are best for beginners.',
                category: 'Guides',
                categoryColor: 'success' as const,
                readTime: '5 min read',
                imageUrl: 'https://picsum.photos/800/500?random=pet-guide',
              },
              {
                title: 'Maximizing Seed Profitability',
                description:
                  'A comprehensive guide on which seeds to plant for maximum Sheckles per hour. Includes profit calculations and strategies.',
                category: 'Strategy',
                categoryColor: 'warning' as const,
                readTime: '8 min read',
                imageUrl: 'https://picsum.photos/800/500?random=seed-profit',
              },
              {
                title: 'Rare Egg Locations & Drop Rates',
                description:
                  'Complete list of rare egg locations and their drop rates. Find out where to farm for the best pets.',
                category: 'Wiki',
                categoryColor: 'info' as const,
                readTime: '6 min read',
                imageUrl: 'https://picsum.photos/800/500?random=egg-locations',
              },
            ].map((article, index) => (
              <ArticleCard
                key={index}
                href={`/grow-a-garden/wiki/guides/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                title={article.title}
                description={article.description}
                category={article.category}
                categoryColor={article.categoryColor}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
