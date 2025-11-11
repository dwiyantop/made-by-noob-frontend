import { Container } from '@/components/ui/container';
import { Paragraph } from '@/components/ui/paragraph';

export function MainFooter() {
  return (
    <footer>
      <Container className="flex flex-col items-center justify-center gap-4 py-6 sm:flex-row">
        <Paragraph size="sm" className="text-text-secondary">
          © 2025 MadeByNoob. All rights reserved.
        </Paragraph>
      </Container>
    </footer>
  );
}
