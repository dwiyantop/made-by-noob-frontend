import Link from 'next/link';

import { AnimatedHeroHeadline } from '@/components/ui/animated-hero-headline';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Paragraph } from '@/components/ui/paragraph';

export function HeroSection() {
  return (
    <section className="relative -mt-16 flex min-h-screen items-center justify-center pt-16 sm:-mt-20 sm:pt-20">
      <Container>
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-8 text-center sm:space-y-10">
          <h1 className="sr-only">Stop Guessing. Start Mastering.</h1>
          <AnimatedHeroHeadline />
          <Paragraph size="lg" className="text-lg sm:text-xl">
            Tired of 10 minute searches for one item? We were too. Get the right info, right now, and get back in the
            game.
          </Paragraph>
          <Button variant="primary" size="lg" className="mt-6 sm:mt-8" asChild>
            <Link href="#supported-games">Find Your Game</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
