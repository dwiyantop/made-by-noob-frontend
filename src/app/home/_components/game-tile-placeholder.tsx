import { Paragraph } from '@/components/ui/paragraph';
import { cn } from '@/lib/utils';

export interface GameTilePlaceholderProps {
  className?: string;
  label?: string;
}

export function GameTilePlaceholder({ className, label = 'Coming Soon' }: GameTilePlaceholderProps) {
  return (
    <div
      className={cn(
        'group relative flex aspect-3/2 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/40 bg-card/30 shadow-md shadow-black/10 transition-all duration-300 hover:border-border/60 hover:shadow-lg hover:shadow-black/20',
        className,
      )}
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23334155'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        <span
          className="i-lucide-plus-circle text-3xl text-text-secondary transition-opacity duration-300 group-hover:opacity-80"
          aria-hidden
        />
        <Paragraph size="sm" className="text-text-secondary">
          {label}
        </Paragraph>
      </div>
    </div>
  );
}
