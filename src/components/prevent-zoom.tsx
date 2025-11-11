'use client';

import { useEffect } from 'react';

export function PreventZoom() {
  useEffect(() => {
    // Prevent zoom with keyboard shortcuts (Ctrl/Cmd + Plus/Minus/0)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        // Prevent Ctrl/Cmd + Plus, Minus, Equal, 0
        if (
          e.key === '+' ||
          e.key === '-' ||
          e.key === '=' ||
          e.key === '0' ||
          e.keyCode === 187 || // Plus/Equal
          e.keyCode === 189 || // Minus
          e.keyCode === 48 || // 0
          e.keyCode === 96 || // Numpad 0
          e.keyCode === 107 || // Numpad +
          e.keyCode === 109 // Numpad -
        ) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    // Prevent zoom with mouse wheel + Ctrl/Cmd
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent zoom with pinch gesture (touchpad)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent zoom with double tap
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
        return false;
      }
      lastTouchEnd = now;
    };

    // Prevent context menu zoom (right-click zoom)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null;
}
