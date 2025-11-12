'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const placeholderItems = [
  { id: 'pets', label: 'Pets', href: '/grow-a-garden/wiki/pets' },
  { id: 'eggs', label: 'Eggs', href: '/grow-a-garden/wiki/eggs' },
  { id: 'codes', label: 'Code Tracker', href: '/grow-a-garden/codes' },
  { id: 'items', label: 'Item Database', href: '/grow-a-garden/wiki/plants' },
  { id: 'tools', label: 'Tools', href: '/grow-a-garden/tools' },
  { id: 'marketplace', label: 'Marketplace', href: '/grow-a-garden/marketplace' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation();
        setIsOpen(false);
        setSearch('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredItems = placeholderItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-[20vh]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl border border-border/40 bg-card shadow-xl transition-all">
                <Command className="overflow-hidden">
                  <div className="flex items-center border-b border-border/40 px-4">
                    <span className="i-lucide-search h-4 w-4 text-text-secondary" aria-hidden />
                    <Command.Input
                      className="flex h-14 w-full border-0 bg-transparent px-3 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-0"
                      placeholder="Search for pages, items, codes..."
                      value={search}
                      onValueChange={setSearch}
                    />
                    <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border border-border/40 bg-background px-2 font-mono text-[10px] font-medium text-text-secondary sm:flex">
                      <span className="text-xs">ESC</span>
                    </kbd>
                  </div>
                  <Command.List className="max-h-[400px] overflow-y-auto p-2">
                    {filteredItems.length === 0 ? (
                      <Command.Empty className="py-8 text-center text-sm text-text-secondary">
                        No results found.
                      </Command.Empty>
                    ) : (
                      filteredItems.map(item => (
                        <Command.Item
                          key={item.id}
                          value={item.label}
                          className={cn(
                            'relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none',
                            'data-selected:bg-accent-primary/20 data-selected:text-accent-primary',
                            'hover:bg-accent-primary/10',
                          )}
                          onSelect={() => {
                            router.push(item.href);
                            setIsOpen(false);
                            setSearch('');
                          }}
                        >
                          <span className="i-lucide-arrow-right h-4 w-4 shrink-0 opacity-50" aria-hidden />
                          <span className="flex-1">{item.label}</span>
                        </Command.Item>
                      ))
                    )}
                  </Command.List>
                </Command>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
