'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const sequences = [
  'Stop Guessing. Start Mastering.',
  'Find any item instantly.',
  'Track every code.',
  'Player Marketplace.',
] as const;

interface AnimatedHeroHeadlineProps {
  className?: string;
}

export function AnimatedHeroHeadline({ className }: AnimatedHeroHeadlineProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = sequences[currentIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting backward
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        // Finished deleting, move to next sequence
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % sequences.length);
          setCharIndex(0);
        }, 100);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [charIndex, currentIndex, isDeleting]);

  return (
    <div className={cn('font-extrabold text-4xl text-text-primary tracking-tight sm:text-5xl md:text-6xl', className)}>
      {displayText}
      <span className="inline-block ml-1 h-[1em] w-0.5 bg-accent-primary animate-[blink_1s_infinite]" />
    </div>
  );
}
