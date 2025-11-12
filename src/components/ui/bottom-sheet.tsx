'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

const BottomSheetOverlay = Dialog.Overlay;
const BottomSheetClose = Dialog.Close;

const BottomSheetVariants = cva('fixed z-[110] gap-4 bg-background p-0 shadow-lg', {
  variants: {
    side: {
      bottom:
        'inset-x-0 bottom-0 will-change-transform data-[state=closed]:animate-[slide-out-to-bottom-full_200ms_cubic-bezier(0.4,0,1,1)] data-[state=open]:animate-[slide-in-from-bottom-full_300ms_cubic-bezier(0,0,0.2,1)]',
    },
  },
  defaultVariants: {
    side: 'bottom',
  },
});

export interface BottomSheetProps extends VariantProps<typeof BottomSheetVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  className,
  side = 'bottom',
  title = 'Dialog',
  description = '',
}: BottomSheetProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <BottomSheetOverlay className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm data-[state=open]:animate-[fade-in_300ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in] lg:hidden" />
        <Dialog.Content
          className={cn(
            BottomSheetVariants({ side }),
            'max-h-[90vh] rounded-t-2xl flex flex-col overflow-hidden lg:hidden',
            className,
          )}
          onEscapeKeyDown={onClose}
          onPointerDownOutside={onClose}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </VisuallyHidden.Root>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

BottomSheet.displayName = 'BottomSheet';

export { BottomSheet, BottomSheetOverlay, BottomSheetClose };
