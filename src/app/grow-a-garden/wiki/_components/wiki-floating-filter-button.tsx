"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WikiFloatingFilterButtonProps {
  activeFiltersCount?: number;
  filterBarRef?: React.RefObject<HTMLDivElement | null>;
  onOpenFilters: () => void;
}

export function WikiFloatingFilterButton({
  activeFiltersCount = 0,
  filterBarRef,
  onOpenFilters,
}: WikiFloatingFilterButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!filterBarRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If filter bar is NOT intersecting (not visible), show floating button
        setIsVisible(!entries[0].isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    observer.observe(filterBarRef.current);

    return () => {
      observer.disconnect();
    };
  }, [filterBarRef]);

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <button
      type="button"
      onClick={onOpenFilters}
      className={cn(
        "fixed bottom-6 left-1/2 z-40 flex h-11 -translate-x-1/2 items-center gap-2 rounded-full px-4",
        "border border-border/40 bg-card/80 backdrop-blur-sm text-text-secondary shadow-lg",
        "transition-all duration-300 ease-out hover:border-border/60 hover:bg-card hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
      aria-label="Open filters"
    >
      <span className="i-lucide-filter h-4 w-4" aria-hidden />
      <span className="text-sm font-medium">Filters</span>
      {hasActiveFilters && (
        <Badge
          variant="solid"
          color="primary"
          size="md"
          className="h-5 min-w-5 flex items-center justify-center px-1"
        >
          {activeFiltersCount}
        </Badge>
      )}
    </button>
  );
}
