'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:flex-row sm:justify-center">
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
  );
}
