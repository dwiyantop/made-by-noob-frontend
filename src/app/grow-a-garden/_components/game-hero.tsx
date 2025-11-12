import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

interface GameHeroProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export function GameHero({ title, description, imageUrl }: GameHeroProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      {/* Visual Column */}
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-linear-to-br from-green-900/20 via-emerald-800/20 to-lime-700/20">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: imageUrl
              ? `url('${imageUrl}')`
              : "url('https://picsum.photos/800/450?random=grow-a-garden')",
          }}
        />
      </div>

      {/* Info Column */}
      <div className="space-y-6">
        <div className="space-y-4">
          <Heading variant="h1">{title}</Heading>
          <Paragraph size="lg">{description}</Paragraph>
        </div>

        {/* Key Info */}
        <dl className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="min-w-[100px] text-sm font-semibold text-text-secondary">Developer:</dt>
            <dd className="text-sm text-text-primary">Roblox Community</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="min-w-[100px] text-sm font-semibold text-text-secondary">Genre:</dt>
            <dd className="text-sm text-text-primary">Farming, Simulation</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="min-w-[100px] text-sm font-semibold text-text-secondary">Platform:</dt>
            <dd className="text-sm text-text-primary">Roblox</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
