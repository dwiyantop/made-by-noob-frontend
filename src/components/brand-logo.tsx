import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const brandLogoVariants = cva(
  'inline-flex items-center gap-2 font-extrabold bg-linear-to-r from-accent-primary via-accent-primary to-[#00c4ff] bg-clip-text text-transparent bg-size-[200%_100%] bg-position-[0%_50%] animate-[gradient-pan_6s_linear_infinite]',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'from-accent-primary to-accent-primary',
      },
      size: {
        xs: 'text-sm',
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
        '2xl': 'text-4xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  },
);

type BrandLogoBaseProps = VariantProps<typeof brandLogoVariants> & {
  className?: string;
  showIcon?: boolean;
};

type BrandLogoLinkProps = BrandLogoBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className' | 'children' | 'href'> & {
    href?: string;
    asChild?: false;
  };

type BrandLogoAsChildProps = BrandLogoBaseProps &
  React.HTMLAttributes<HTMLElement> & {
    asChild: true;
  };

export type BrandLogoProps = BrandLogoLinkProps | BrandLogoAsChildProps;

const getIconSize = (size: BrandLogoBaseProps['size']): number => {
  switch (size) {
    case 'xs':
      return 14;
    case 'sm':
      return 18;
    case 'md':
      return 20;
    case 'lg':
      return 24;
    case 'xl':
      return 28;
    case '2xl':
      return 32;
    default:
      return 24;
  }
};

export function BrandLogo(props: BrandLogoProps) {
  const { className, variant, size, showIcon = true } = props;
  const classes = cn(brandLogoVariants({ variant, size }), className);
  const iconSize = getIconSize(size);

  if ('asChild' in props && props.asChild) {
    const { asChild: _unused, variant: _variant, size: _size, showIcon: _showIcon, ...rest } = props;
    void _unused;
    void _variant;
    void _size;
    void _showIcon;
    return (
      <Slot className={classes} {...rest}>
        {showIcon && <Image src="/favicon.svg" alt="" width={iconSize} height={iconSize} className="shrink-0" />}
        MadeByNoob
      </Slot>
    );
  }

  const { asChild: _ignored, variant: _variant, size: _size, showIcon: _showIcon, href = '/', ...rest } = props;
  void _ignored;
  void _variant;
  void _size;
  void _showIcon;

  return (
    <Link href={href} className={classes} {...rest}>
      {showIcon && <Image src="/favicon.svg" alt="" width={iconSize} height={iconSize} className="shrink-0" />}
      MadeByNoob
    </Link>
  );
}
