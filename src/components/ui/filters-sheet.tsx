'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface FiltersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  side?: 'left' | 'right' | 'bottom';
}

export function FiltersSheet({ isOpen, onClose, children, className, side = 'left' }: FiltersSheetProps) {
  const isLeft = side === 'left';
  const isRight = side === 'right';
  const isBottom = side === 'bottom';

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className={cn('absolute inset-0 flex', isBottom && 'items-end', isRight && 'justify-end')}>
            <Transition.Child
              as={Fragment}
              enter="transform duration-200 ease-out"
              enterFrom={isLeft ? '-translate-x-full' : isRight ? 'translate-x-full' : 'translate-y-full'}
              enterTo="translate-x-0 translate-y-0"
              leave="transform duration-150 ease-in"
              leaveFrom="translate-x-0 translate-y-0"
              leaveTo={isLeft ? '-translate-x-full' : isRight ? 'translate-x-full' : 'translate-y-full'}
            >
              <Dialog.Panel
                className={cn(
                  'flex flex-col bg-background/95 shadow-lg backdrop-blur-md',
                  (isLeft || isRight) && 'h-full w-full max-w-sm',
                  isLeft && 'border-r border-border/40',
                  isRight && 'border-l border-border/40',
                  isBottom && 'w-full max-h-[90vh] rounded-t-2xl',
                  className,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
