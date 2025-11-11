'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const loadingVariants = cva('flex flex-col items-center justify-center gap-3', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const iconSizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
};

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingVariants> {
  text?: string;
  showText?: boolean;
}

export function Loading({ className, size = 'md', text = 'Loading...', showText = true, ...props }: LoadingProps) {
  const iconSize = iconSizeMap[size ?? 'md'];
  const viewBoxSize = 32;

  return (
    <div className={cn(loadingVariants({ size }), className)} {...props}>
      <div className="relative">
        {/* Animated SVG favicon with gradient stroke */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left eye - looking */}
          <g transform="translate(11, 16)">
            <circle r="5.5" fill="none" stroke="#00DC82" strokeWidth="2" />
            <ellipse rx="4" ry="4" fill="#00DC82" fillOpacity="0.15" />
            <circle cx="-1.5" cy="-1.5" r="1" fill="#00DC82" className="eye-look" />
          </g>

          {/* Right eye - looking */}
          <g transform="translate(21, 16)">
            <circle r="5.5" fill="none" stroke="#00DC82" strokeWidth="2" />
            <ellipse rx="4" ry="4" fill="#00DC82" fillOpacity="0.15" />
            <circle cx="1.5" cy="-1.5" r="1" fill="#00DC82" className="eye-look" style={{ animationDelay: '0.05s' }} />
          </g>

          {/* Connecting element */}
          <line x1="16.5" y1="16" x2="15.5" y2="16" stroke="#00DC82" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
      </div>
      {showText && <p className="text-sm font-medium text-text-secondary animate-pulse">{text}</p>}
    </div>
  );
}
