import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

interface ComingSoonProps {
  title: string;
  description?: string;
  className?: string;
}

export function ComingSoon({ title, description, className }: ComingSoonProps) {
  return (
    <div className={`flex min-h-[60vh] flex-col items-center justify-center text-center ${className || ''}`}>
      <div className="space-y-6 max-w-md">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center">
            <span className="i-lucide-construction h-16 w-16 text-accent-primary" aria-hidden />
          </div>
          <Heading variant="h1" className="text-3xl md:text-4xl">
            {title}
          </Heading>
        </div>
        {description ? (
          <Paragraph size="lg" className="text-text-secondary">
            {description}
          </Paragraph>
        ) : (
          <Paragraph size="lg" className="text-text-secondary">
            We&apos;re working hard to bring you the most comprehensive database for this category. Check back soon!
          </Paragraph>
        )}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-card/40 px-4 py-2">
            <span className="i-lucide-sparkles h-4 w-4 text-accent-primary" aria-hidden />
            <span className="text-sm font-medium text-text-primary">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
