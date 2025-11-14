"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface ImageLoaderProps
  extends Omit<React.ComponentProps<typeof Image>, "onError" | "onLoad"> {
  fallbackClassName?: string;
  showFallbackLogo?: boolean;
  overlayClassName?: string;
  forceError?: boolean;
  onError?: () => void;
  onLoad?: () => void;
}

export function ImageLoader({
  src,
  alt,
  className,
  fallbackClassName,
  showFallbackLogo = true,
  overlayClassName,
  fill,
  forceError = false,
  onError,
  onLoad,
  ...props
}: ImageLoaderProps) {
  const [hasError, setHasError] = React.useState(forceError);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handleLoad = () => {
    setHasError(false);
    onLoad?.();
  };

  React.useEffect(() => {
    // Reset error state when src changes
    setHasError(forceError);
  }, [forceError, src]);

  const isFill = fill ?? false;

  if (hasError && showFallbackLogo) {
    const fallbackContent = (
      <>
        <div className={cn("absolute inset-0 bg-black/40", overlayClassName)} />
        <div className="relative z-10 flex items-center justify-center">
          <Image
            src="/favicon.svg"
            alt={alt || "MadeByNoob"}
            width={64}
            height={64}
            className="opacity-80"
          />
        </div>
      </>
    );

    if (isFill) {
      return (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-card/90",
            fallbackClassName
          )}
        >
          {fallbackContent}
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative flex items-center justify-center bg-card/90",
          className,
          fallbackClassName
        )}
      >
        {fallbackContent}
      </div>
    );
  }

  if (hasError && !showFallbackLogo) {
    if (isFill) {
      return (
        <div className={cn("absolute inset-0 bg-card/90", fallbackClassName)}>
          <div
            className={cn("absolute inset-0 bg-black/40", overlayClassName)}
          />
        </div>
      );
    }
    return (
      <div className={cn("relative bg-card/90", className, fallbackClassName)}>
        <div className={cn("absolute inset-0 bg-black/40", overlayClassName)} />
      </div>
    );
  }

  return (
    <Image
      key={typeof src === "string" ? src : undefined}
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      fill={fill}
      loading={props.loading ?? (props.priority ? undefined : "lazy")}
      {...props}
    />
  );
}
