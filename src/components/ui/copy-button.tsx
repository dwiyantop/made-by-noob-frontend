'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      className={className}
      leadingIcon={copied ? 'i-lucide-check' : 'i-lucide-copy'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}
