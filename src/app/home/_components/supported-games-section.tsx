import { games } from '@/data/games';

import { GameTile } from '@/app/home/_components/game-tile';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';

export function SupportedGamesSection() {
  return (
    <section id="supported-games" className="relative scroll-mt-16 py-20 sm:py-24">
      <Container className="space-y-12">
        <Heading variant="h2" className="text-center text-3xl sm:text-4xl">
          Supported Games
        </Heading>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map(game => (
            <GameTile
              key={game.slug}
              href={`/${game.slug}`}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              badge={game.isComingSoon ? 'Coming Soon' : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
