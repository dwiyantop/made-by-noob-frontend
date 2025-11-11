import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

const pillars = [
  {
    icon: 'i-lucide-database',
    title: 'Complete Wiki',
    description:
      "All the data, none of the noise. We filter out the junk so you can find exactly what you're looking for, from core stats to hidden secrets.",
  },
  {
    icon: 'i-lucide-wrench',
    title: 'Pro Tools & Trackers',
    description:
      'Get the winning edge. We build the smart utilities that pro players rely on, from live event trackers to tools that perfect your strategy.',
  },
  {
    icon: 'i-lucide-store',
    title: 'Player Marketplace',
    description:
      'The economy, evolved. Your central hub to find trade partners, manage your collection, and build your in-game wealth.',
  },
] as const;

export function PillarsSection() {
  return (
    <section id="features" className="relative scroll-mt-16 py-20 sm:py-24">
      <Container className="space-y-12">
        <Heading variant="h2" className="text-center text-3xl sm:text-4xl">
          Level Up Your Play
        </Heading>

        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map(pillar => (
            <div key={pillar.title} className="flex flex-col items-start gap-5">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-card/70 text-accent-primary ring-1 ring-border/40">
                <span className={`${pillar.icon} text-2xl`} aria-hidden />
              </div>
              <div className="space-y-3.5">
                <Heading variant="h3" className="text-xl font-bold sm:text-2xl">
                  {pillar.title}
                </Heading>
                <Paragraph size="md" className="text-text-secondary/90">
                  {pillar.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
