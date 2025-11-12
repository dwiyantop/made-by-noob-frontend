import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Paragraph } from '@/components/ui/paragraph';
import { cn } from '@/lib/utils';

export function MainFooter() {
  return (
    <footer>
      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <Paragraph size="sm" className="text-text-secondary">
          © 2025 MadeByNoob. All rights reserved.
        </Paragraph>
        <a
          href="mailto:collabs@madebynoob.com"
          aria-label="Contact us via email"
          className={cn(buttonVariants({ variant: 'ghost', size: 'md', square: false }), 'inline-flex')}
        >
          <span aria-hidden className="i-lucide-mail h-4 w-4" />
          <span>Contact</span>
        </a>
      </Container>
    </footer>
  );
}
