import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('text-text-primary tracking-tight', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
    },
  },
  defaultVariants: {
    variant: 'h2',
  },
});

type HeadingVariant = NonNullable<VariantProps<typeof headingVariants>['variant']>;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

const headingTagMap: Record<HeadingVariant, HeadingTag> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  asChild?: boolean;
  as?: HeadingTag;
}

export function Heading({ variant, className, children, asChild = false, as, ...props }: HeadingProps) {
  const resolvedVariant = (variant ?? 'h2') as HeadingVariant;
  const Component = as ?? headingTagMap[resolvedVariant];
  const Comp = asChild ? Slot : Component;

  return (
    <Comp className={cn(headingVariants({ variant: resolvedVariant }), className)} {...props}>
      {children}
    </Comp>
  );
}
