import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { MainFooter } from '@/components/main-footer';
import { MainHeader } from '@/components/main-header';
import { PageBackground } from '@/components/page-background';
import { Paragraph } from '@/components/ui/paragraph';
import { EmailSubscriptionForm } from '@/components/email-subscription-form';
import { games, getGameBySlug } from '@/data/games';

interface GamePageProps {
  params: Promise<{ 'game-slug': string }>;
}

export async function generateStaticParams() {
  return games.map(game => ({
    'game-slug': game.slug,
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { 'game-slug': slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    return {
      title: 'Game Not Found | MadeByNoob',
    };
  }

  return {
    title: `${game.title} - MadeByNoob`,
    description: game.description,
    openGraph: {
      title: `${game.title} - MadeByNoob`,
      description: game.description,
      images: [
        {
          url: game.imageUrl,
          alt: game.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - MadeByNoob`,
      description: game.description,
      images: [game.imageUrl],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { 'game-slug': slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen text-text-primary">
      <MainHeader />
      <PageBackground />
      <main>
        {/* Hero Section */}
        <section className="relative -mt-16 flex min-h-[60vh] items-center justify-center pt-16 sm:-mt-20 sm:pt-20">
          <Container>
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-8 text-center sm:space-y-10">
              <div className="relative aspect-3/2 w-full max-w-2xl overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20">
                <ImageLoader
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]" />
                {game.isComingSoon && (
                  <div className="absolute right-4 top-4 z-30">
                    <Badge variant="solid" color="secondary" size="md" className="backdrop-blur-sm shadow-lg">
                      Coming Soon
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Heading variant="h1" className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
                  {game.title}
                </Heading>
                <Paragraph size="lg" className="text-lg sm:text-xl">
                  {game.description}
                </Paragraph>
              </div>
            </div>
          </Container>
        </section>

        {/* Coming Soon Content */}
        {game.isComingSoon && (
          <section className="relative py-20 sm:py-24">
            <Container>
              <div className="mx-auto max-w-3xl space-y-12">
                <div className="space-y-6 text-center">
                  <Heading variant="h2" className="text-3xl sm:text-4xl">
                    We&apos;re Building Something Amazing
                  </Heading>
                  <Paragraph size="lg" className="text-lg sm:text-xl">
                    Our team is hard at work creating the complete wiki, tools, and resources for {game.title}.
                    Here&apos;s what you can expect:
                  </Paragraph>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card/70 text-accent-primary ring-1 ring-border/40">
                      <span className="i-lucide-database text-3xl" aria-hidden />
                    </div>
                    <Heading variant="h3" className="text-xl font-bold">
                      Complete Wiki
                    </Heading>
                    <Paragraph size="md" className="text-text-secondary">
                      Comprehensive database of items, mechanics, and guides
                    </Paragraph>
                  </div>

                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card/70 text-accent-primary ring-1 ring-border/40">
                      <span className="i-lucide-wrench text-3xl" aria-hidden />
                    </div>
                    <Heading variant="h3" className="text-xl font-bold">
                      Pro Tools
                    </Heading>
                    <Paragraph size="md" className="text-text-secondary">
                      Code trackers, calculators, and utilities for players
                    </Paragraph>
                  </div>

                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card/70 text-accent-primary ring-1 ring-border/40">
                      <span className="i-lucide-store text-3xl" aria-hidden />
                    </div>
                    <Heading variant="h3" className="text-xl font-bold">
                      Trading Hub
                    </Heading>
                    <Paragraph size="md" className="text-text-secondary">
                      Connect with other players and manage your collection
                    </Paragraph>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-6 rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm sm:p-12">
                  <Heading variant="h3" className="text-xl font-bold sm:text-2xl">
                    Get Notified When {game.title} Launches
                  </Heading>
                  <Paragraph size="md" className="text-center text-text-secondary">
                    Be the first to know when we launch the complete wiki, tools, and resources for {game.title}.
                  </Paragraph>
                  <EmailSubscriptionForm />
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>
      <MainFooter />
    </div>
  );
}
