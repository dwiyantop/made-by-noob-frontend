import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'ring ring-inset',
        soft: '',
        subtle: 'ring ring-inset',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        info: '',
        warning: '',
        error: '',
        neutral: '',
      },
      size: {
        xs: 'text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm',
        sm: 'text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm',
        md: 'text-xs px-2 py-1 gap-1 rounded-md',
        lg: 'text-sm px-2 py-1 gap-1.5 rounded-md',
        xl: 'text-base px-2.5 py-1 gap-1.5 rounded-md',
      },
      square: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Primary
      {
        color: 'primary',
        variant: 'solid',
        className: 'bg-accent-primary text-accent-foreground',
      },
      {
        color: 'primary',
        variant: 'outline',
        className: 'text-accent-primary ring-accent-primary/50',
      },
      {
        color: 'primary',
        variant: 'soft',
        className: 'bg-accent-primary/10 text-accent-primary',
      },
      {
        color: 'primary',
        variant: 'subtle',
        className: 'bg-accent-primary/10 text-accent-primary ring-accent-primary/25',
      },
      // Secondary
      {
        color: 'secondary',
        variant: 'solid',
        className: 'bg-card border border-border text-text-secondary',
      },
      {
        color: 'secondary',
        variant: 'outline',
        className: 'border-border text-text-secondary ring-border/50',
      },
      {
        color: 'secondary',
        variant: 'soft',
        className: 'bg-card/50 text-text-secondary',
      },
      {
        color: 'secondary',
        variant: 'subtle',
        className: 'bg-card/50 text-text-secondary ring-border/25',
      },
      // Success
      {
        color: 'success',
        variant: 'solid',
        className: 'bg-green-500 text-white',
      },
      {
        color: 'success',
        variant: 'outline',
        className: 'text-green-500 ring-green-500/50',
      },
      {
        color: 'success',
        variant: 'soft',
        className: 'bg-green-500/10 text-green-500',
      },
      {
        color: 'success',
        variant: 'subtle',
        className: 'bg-green-500/10 text-green-500 ring-green-500/25',
      },
      // Info
      {
        color: 'info',
        variant: 'solid',
        className: 'bg-blue-500 text-white',
      },
      {
        color: 'info',
        variant: 'outline',
        className: 'text-blue-500 ring-blue-500/50',
      },
      {
        color: 'info',
        variant: 'soft',
        className: 'bg-blue-500/10 text-blue-500',
      },
      {
        color: 'info',
        variant: 'subtle',
        className: 'bg-blue-500/10 text-blue-500 ring-blue-500/25',
      },
      // Warning
      {
        color: 'warning',
        variant: 'solid',
        className: 'bg-yellow-500 text-white',
      },
      {
        color: 'warning',
        variant: 'outline',
        className: 'text-yellow-500 ring-yellow-500/50',
      },
      {
        color: 'warning',
        variant: 'soft',
        className: 'bg-yellow-500/10 text-yellow-500',
      },
      {
        color: 'warning',
        variant: 'subtle',
        className: 'bg-yellow-500/10 text-yellow-500 ring-yellow-500/25',
      },
      // Error
      {
        color: 'error',
        variant: 'solid',
        className: 'bg-red-500 text-white',
      },
      {
        color: 'error',
        variant: 'outline',
        className: 'text-red-500 ring-red-500/50',
      },
      {
        color: 'error',
        variant: 'soft',
        className: 'bg-red-500/10 text-red-500',
      },
      {
        color: 'error',
        variant: 'subtle',
        className: 'bg-red-500/10 text-red-500 ring-red-500/25',
      },
      // Neutral
      {
        color: 'neutral',
        variant: 'solid',
        className: 'bg-text-secondary text-background',
      },
      {
        color: 'neutral',
        variant: 'outline',
        className: 'ring-border text-text-primary bg-background',
      },
      {
        color: 'neutral',
        variant: 'soft',
        className: 'text-text-primary bg-card',
      },
      {
        color: 'neutral',
        variant: 'subtle',
        className: 'ring-border text-text-primary bg-card',
      },
      // Square variants
      {
        size: 'xs',
        square: true,
        className: 'p-0.5',
      },
      {
        size: 'sm',
        square: true,
        className: 'p-1',
      },
      {
        size: 'md',
        square: true,
        className: 'p-1',
      },
      {
        size: 'lg',
        square: true,
        className: 'p-1',
      },
      {
        size: 'xl',
        square: true,
        className: 'p-1',
      },
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
      size: 'md',
      square: false,
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  leadingIcon?: string;
  trailingIcon?: string;
}

function Badge({ className, variant, color, size, square, leadingIcon, trailingIcon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, color, size, square }), className)} {...props}>
      {leadingIcon && (
        <span
          className={cn(
            leadingIcon,
            'shrink-0',
            size === 'xs' && 'size-3',
            size === 'sm' && 'size-3',
            size === 'md' && 'size-4',
            size === 'lg' && 'size-5',
            size === 'xl' && 'size-6',
          )}
          aria-hidden
        />
      )}
      {children && <span className="truncate">{children}</span>}
      {trailingIcon && (
        <span
          className={cn(
            trailingIcon,
            'shrink-0',
            size === 'xs' && 'size-3',
            size === 'sm' && 'size-3',
            size === 'md' && 'size-4',
            size === 'lg' && 'size-5',
            size === 'xl' && 'size-6',
          )}
          aria-hidden
        />
      )}
    </div>
  );
}

export { Badge };
