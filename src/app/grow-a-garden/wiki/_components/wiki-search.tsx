'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface WikiSearchProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
}

export function WikiSearch({
  placeholder = 'Search items...',
  onSearchChange,
  className,
  isExpanded: controlledIsExpanded,
  onExpandedChange,
  searchValue: controlledSearchValue,
  onSearchValueChange,
}: WikiSearchProps) {
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchValue = controlledSearchValue ?? internalSearchValue;
  const setSearchValue = onSearchValueChange ?? setInternalSearchValue;
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;
  const setIsExpanded = onExpandedChange ?? setInternalIsExpanded;

  useEffect(() => {
    onSearchChange?.(searchValue);
  }, [searchValue, onSearchChange]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleClear = () => {
    setSearchValue('');
    setIsExpanded(false);
  };

  return (
    <>
      {/* Mobile: Icon Only */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'md:hidden h-10 w-10 flex items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-text-primary hover:bg-card/50',
          isExpanded && 'text-accent-primary bg-card/50',
          className,
        )}
        aria-label="Search"
        aria-pressed={isExpanded}
      >
        <span className="i-lucide-search h-5 w-5" aria-hidden />
      </button>

      {/* Desktop: Full Input */}
      <div className={cn('hidden md:block relative w-full', className)}>
        <span
          className="i-lucide-search absolute left-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-text-secondary"
          aria-hidden
        />
        <input
          type="text"
          value={searchValue}
          onChange={e => {
            const value = e.target.value;
            setSearchValue(value);
            onSearchChange?.(value);
          }}
          placeholder={placeholder}
          className={cn(
            'h-10 w-full rounded-lg border border-border/40 bg-card/40 pl-10 pr-10 text-sm text-text-primary',
            'placeholder:text-text-secondary',
            'transition-all focus:border-accent-primary/40 focus:bg-card/60 focus:outline-none focus:ring-0',
          )}
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Clear search"
          >
            <span className="i-lucide-x h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </>
  );
}
