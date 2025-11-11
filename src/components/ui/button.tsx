import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-primary focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent-primary text-accent-foreground shadow-[rgba(0,220,130,0.25)] hover:opacity-90',
        secondary: 'border border-border bg-card text-text-secondary shadow-slate-900/20 hover:bg-card/80',
        ghost: 'text-text-secondary hover:bg-card hover:text-text-primary',
        link: 'text-text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
      },
      square: {
        true: 'px-0',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'sm', square: true, className: 'w-9' },
      { size: 'md', square: true, className: 'w-10' },
      { size: 'lg', square: true, className: 'w-11' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      square: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  loadingIcon?: string;
  square?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      square,
      asChild = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      loadingIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    const resolvedSize: 'sm' | 'md' | 'lg' = size ?? 'md';
    const resolvedSquare = square ?? false;
    const resolvedDisabled = disabled ?? loading;

    const resolvedLeadingIcon = leadingIcon;
    const resolvedTrailingIcon = trailingIcon;
    const resolvedLoadingIcon = loadingIcon ?? 'i-lucide-loader-2';

    const leadingContent =
      !loading && resolvedLeadingIcon ? <span aria-hidden className={cn(resolvedLeadingIcon, 'h-4 w-4')} /> : null;

    const trailingContent =
      !loading && resolvedTrailingIcon ? <span aria-hidden className={cn(resolvedTrailingIcon, 'h-4 w-4')} /> : null;

    const loadingContent = loading ? (
      <span aria-hidden className={cn(resolvedLoadingIcon, 'h-4 w-4 animate-spin')} />
    ) : null;

    const content = (
      <>
        {loadingContent}
        {leadingContent}
        {children ? <span className={cn(resolvedSquare && 'sr-only')}>{children}</span> : null}
        {trailingContent}
      </>
    );

    if (asChild) {
      // When using asChild, Slot expects exactly one child element
      // We only pass children (the Link) and exclude disabled prop
      const slotProps = { ...props };
      delete (slotProps as { disabled?: boolean }).disabled;
      return (
        <Component
          ref={ref}
          className={cn(buttonVariants({ variant, size: resolvedSize, square: resolvedSquare }), className)}
          {...slotProps}
        >
          {children}
        </Component>
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size: resolvedSize, square: resolvedSquare }), className)}
        disabled={resolvedDisabled}
        {...props}
      >
        {content}
      </Component>
    );
  },
);

Button.displayName = 'Button';
