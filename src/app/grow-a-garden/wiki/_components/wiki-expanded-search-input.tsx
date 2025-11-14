"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WikiExpandedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  placeholder?: string;
  excludeRefs?: React.RefObject<HTMLElement | null>[];
}

export function WikiExpandedSearchInput({
  value,
  onChange,
  onClear,
  isExpanded,
  onExpandedChange,
  placeholder = "Search...",
  excludeRefs = [],
}: WikiExpandedSearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto focus when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle click outside to close
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is inside container
      if (containerRef.current && containerRef.current.contains(target)) {
        return;
      }

      // Check if click is inside excluded refs
      if (
        excludeRefs.some((ref) => ref.current && ref.current.contains(target))
      ) {
        return;
      }

      // Close if no value, otherwise keep open
      if (!value) {
        onExpandedChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, value, onExpandedChange, excludeRefs]);

  if (!isExpanded) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "md:hidden search-input-container block animate-[slide-in-from-top-2_300ms_ease-out]"
      )}
    >
      <div className="relative">
        <span
          className="i-lucide-search absolute left-3 top-1/2 z-10 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-text-secondary pointer-events-none"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full rounded-lg border border-border/40 bg-card/80 backdrop-blur-sm pl-10 pr-10 text-sm text-text-primary shadow-lg",
            "placeholder:text-text-secondary",
            "transition-all focus:border-accent-primary/40 focus:bg-card focus:outline-none focus:ring-0"
          )}
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Clear search"
          >
            <span className="i-lucide-x h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
