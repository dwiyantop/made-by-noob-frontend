export interface GameInfo {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  isComingSoon: boolean;
}

export const games: GameInfo[] = [
  {
    slug: 'grow-a-garden',
    title: 'Grow a Garden',
    description:
      'Idle farming game on Roblox. Plant seeds, harvest crops, collect Sheckles, and unlock pets. Complete wiki, code tracker, and trading hub.',
    imageUrl: '/images/grow-a-garden.webp',
    isComingSoon: true,
  },
  {
    slug: '99-nights-in-the-forest',
    title: '99 Nights in The Forest',
    description:
      'Survival horror game on Roblox. Survive 99 nights in a mysterious forest, gather resources, build shelter, and avoid dangers. Complete wiki and strategy guides.',
    imageUrl: '/images/99-nights-in-the-forest.webp',
    isComingSoon: true,
  },
  {
    slug: 'steal-a-brainrot',
    title: 'Steal a Brainrot',
    description:
      'Action-adventure game on Roblox. Steal items, complete missions, and navigate through challenging levels. Complete wiki, item database, and walkthrough guides.',
    imageUrl: '/images/steal-a-brainrot.webp',
    isComingSoon: true,
  },
];

export function getGameBySlug(slug: string): GameInfo | undefined {
  return games.find(game => game.slug === slug);
}
