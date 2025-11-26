import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WikiItemsGridProps {
  children: ReactNode;
  isEmpty?: boolean;
  mobileColumns?: 1 | 2 | 3;
  desktopColumns?: 2 | 3 | 4 | 5 | 6;
}

const mobileColsClass = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
} as const;

const desktopColsClass = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
} as const;

export function WikiItemsGrid({
  children,
  isEmpty = false,
  mobileColumns = 2,
  desktopColumns = 4,
}: WikiItemsGridProps) {
  if (isEmpty) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-secondary">
          No items found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-3",
        mobileColsClass[mobileColumns],
        desktopColsClass[desktopColumns]
      )}
    >
      {children}
    </div>
  );
}
