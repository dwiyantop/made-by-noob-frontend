'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';

export function FinalCtaSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    console.log('Email submitted:', email);
  };

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Heading variant="h2" className="text-3xl sm:text-4xl">
            We&apos;re Just Getting Started.
          </Heading>
          <Paragraph size="lg" className="mt-6">
            Want to be the first to know when new games launch or when we&apos;re looking for collaborators? Join the
            list.
          </Paragraph>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Input
              type="email"
              placeholder="your.email@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              size="lg"
              className="sm:max-w-xs"
            />
            <Button variant="primary" type="submit" size="lg" className="sm:w-auto">
              Get Notified
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
