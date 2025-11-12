'use client';

import type { CSSProperties } from 'react';

export function PageBackground() {
  return (
    <>
      {/* Floating Icons */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-screen -z-10">
        <span
          className="hero-icon absolute left-[6%] top-[18%] inline-flex h-14 w-14 -rotate-6 items-center justify-center rounded-3xl border border-border/20 bg-card/20 text-3xl text-border/60 shadow-[0_12px_40px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:left-[12%] sm:top-[18%] sm:h-20 sm:w-20 sm:text-4xl"
          style={{ '--float-x': '14px', '--float-y': '16px' } as CSSProperties}
        >
          <span className="i-lucide-gamepad-2" />
        </span>
        <span
          className="hero-icon absolute right-[12%] top-[30%] inline-flex h-12 w-12 rotate-3 items-center justify-center rounded-2xl border border-border/15 bg-card/15 text-2xl text-border/55 shadow-[0_10px_32px_rgba(15,23,42,0.30)] backdrop-blur-sm sm:right-[16%] sm:top-[32%] sm:h-16 sm:w-16 sm:text-3xl"
          style={{ '--float-x': '-12px', '--float-y': '12px' } as CSSProperties}
        >
          <span className="i-lucide-shield-check" />
        </span>
        <span
          className="hero-icon absolute left-[14%] bottom-[20%] inline-flex h-14 w-14 rotate-[8deg] items-center justify-center rounded-3xl border border-border/20 bg-card/25 text-3xl text-border/60 shadow-[0_14px_40px_rgba(15,23,42,0.32)] backdrop-blur-sm sm:left-[22%] sm:bottom-[26%] sm:h-18 sm:w-18 sm:text-4xl"
          style={{ '--float-x': '12px', '--float-y': '-12px' } as CSSProperties}
        >
          <span className="i-lucide-database" />
        </span>
        <span
          className="hero-icon absolute right-[18%] bottom-[18%] inline-flex h-12 w-12 -rotate-12 items-center justify-center rounded-2xl border border-border/15 bg-card/20 text-2xl text-border/55 shadow-[0_12px_32px_rgba(15,23,42,0.28)] backdrop-blur-sm sm:right-[26%] sm:bottom-[24%] sm:h-14 sm:w-14 sm:text-3xl"
          style={{ '--float-x': '-14px', '--float-y': '-10px' } as CSSProperties}
        >
          <span className="i-lucide-sparkles" />
        </span>
        <span
          className="hero-icon absolute left-[40%] top-[16%] inline-flex h-12 w-12 rotate-12 items-center justify-center rounded-3xl border border-border/20 bg-card/15 text-2xl text-border/55 shadow-[0_10px_28px_rgba(15,23,42,0.26)] backdrop-blur-sm sm:left-[48%] sm:top-[20%] sm:h-16 sm:w-16 sm:text-3xl"
          style={{ '--float-x': '10px', '--float-y': '10px' } as CSSProperties}
        >
          <span className="i-lucide-diamond" />
        </span>
        <span
          className="hero-icon absolute right-[6%] top-[60%] inline-flex h-14 w-14 rotate-[-4deg] items-center justify-center rounded-3xl border border-border/18 bg-card/20 text-3xl text-border/60 shadow-[0_14px_38px_rgba(15,23,42,0.3)] backdrop-blur-sm sm:right-[12%] sm:top-[54%] sm:h-18 sm:w-18 sm:text-4xl"
          style={{ '--float-x': '-12px', '--float-y': '14px' } as CSSProperties}
        >
          <span className="i-lucide-swords" />
        </span>
      </div>
    </>
  );
}
