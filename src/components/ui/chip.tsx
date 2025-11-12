import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const chipVariants = cva(
  'inline-flex items-center gap-1 rounded-full text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-card/60 text-text-secondary hover:bg-card/80 hover:text-text-primary',
        selected: 'bg-accent-primary/15 text-accent-primary hover:bg-accent-primary/20',
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'variant'>,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
  showCheckmark?: boolean;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, selected = false, showCheckmark = true, children, ...props }, ref) => {
    const resolvedVariant = selected ? 'selected' : variant || 'default';

    return (
      <button
        ref={ref}
        type="button"
        className={cn(chipVariants({ variant: resolvedVariant, size }), className)}
        aria-pressed={selected}
        {...props}
      >
        {children}
        {selected && showCheckmark && <span className="i-lucide-check h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      </button>
    );
  },
);

Chip.displayName = 'Chip';
