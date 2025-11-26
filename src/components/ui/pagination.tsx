"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  // Always show pagination if totalPages >= 1 (even if only 1 page for debugging)
  // In production, you might want to hide if totalPages <= 1
  if (totalPages < 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;

    // Always show at least page 1
    if (totalPages === 0) {
      pages.push(1);
      return pages;
    }

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show first 5 pages (excluding 1), then ellipsis, then last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push("ellipsis");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show first, then ellipsis, then last 5 pages (excluding duplicates)
        if (totalPages > 6) {
          pages.push("ellipsis");
        }
        const startPage = Math.max(2, totalPages - 4);
        for (let i = startPage; i <= totalPages; i++) {
          if (!pages.includes(i)) {
            pages.push(i);
          }
        }
      } else {
        // Show first, ellipsis, current-1, current, current+1, ellipsis, last
        pages.push("ellipsis");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Ensure we always have at least one page number
  if (pageNumbers.length === 0) {
    pageNumbers.push(1);
  }

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        square
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
        leadingIcon="i-lucide-chevron-left"
        aria-label="Previous page"
      />

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-xs text-text-secondary"
                aria-hidden
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant={isActive ? "primary" : "ghost"}
              size="sm"
              onClick={() => {
                onPageChange(pageNum);
              }}
              className={cn(isActive && "pointer-events-none", "min-w-10")}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="sm"
        square
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages}
        leadingIcon="i-lucide-chevron-right"
        aria-label="Next page"
      />
    </nav>
  );
}
