"use client";

import { cn } from "@/lib/utils";

interface RarityBadgeProps {
  rarity: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const rarityStyles: Record<
  string,
  { bg: string; text: string; border?: string }
> = {
  Common: {
    bg: "bg-slate-500",
    text: "text-white",
    border: "border-slate-400",
  },
  Uncommon: {
    bg: "bg-green-500",
    text: "text-white",
    border: "border-green-400",
  },
  Rare: {
    bg: "bg-blue-500",
    text: "text-white",
    border: "border-blue-400",
  },
  Legendary: {
    bg: "bg-yellow-500",
    text: "text-white",
    border: "border-yellow-400",
  },
  Mythical: {
    bg: "bg-purple-500",
    text: "text-white",
    border: "border-purple-400",
  },
  Divine: {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-400",
  },
  Prismatic: {
    bg: "bg-[#00f5a0] animate-prismatic-color",
    text: "text-white",
    border: "border-transparent",
  },
  Transcendent: {
    bg: "bg-[#1e3a8a] animate-transcendent-color",
    text: "text-white",
    border: "border-transparent",
  },
};

const sizeStyles = {
  sm: "text-[10px] px-1.5 py-0.5 rounded-sm",
  md: "text-xs px-2 py-1 rounded-md",
  lg: "text-sm px-2.5 py-1 rounded-md",
};

export function RarityBadge({
  rarity,
  size = "sm",
  className,
}: RarityBadgeProps) {
  const styles = rarityStyles[rarity] || {
    bg: "bg-gray-500",
    text: "text-white",
    border: "border-gray-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wide",
        "border",
        styles.bg,
        styles.text,
        styles.border,
        sizeStyles[size],
        className
      )}
    >
      {rarity}
    </span>
  );
}
