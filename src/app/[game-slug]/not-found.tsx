import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { MainFooter } from '@/components/main-footer';
import { MainHeader } from '@/components/main-header';
import { PageBackground } from '@/components/page-background';
import { Paragraph } from '@/components/ui/paragraph';

export default function NotFound() {
  return (
    <div className="min-h-screen text-text-primary">
      <MainHeader />
      <PageBackground />
      <main>
        <section className="relative -mt-16 flex min-h-[60vh] items-center justify-center pt-16 sm:-mt-20 sm:pt-20">
          <Container>
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center space-y-6 text-center">
              <Heading variant="h1" className="text-4xl sm:text-5xl md:text-6xl">
                Game Not Found
              </Heading>
              <Paragraph size="lg" className="text-lg sm:text-xl">
                Sorry, we couldn&apos;t find the game you&apos;re looking for. It might not be available yet or the URL
                might be incorrect.
              </Paragraph>
              <Button variant="primary" size="lg" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
