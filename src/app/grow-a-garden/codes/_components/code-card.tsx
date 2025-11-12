import { Card, CardContent } from '@/components/ui/card';
import { CopyButton } from '@/components/ui/copy-button';
import { Paragraph } from '@/components/ui/paragraph';
import { cn } from '@/lib/utils';

interface CodeCardProps {
  code: string;
  reward: string;
  expired?: boolean;
}

export function CodeCard({ code, reward, expired = false }: CodeCardProps) {
  return (
    <Card className={cn('transition-opacity', expired && 'opacity-50')}>
      <CardContent className="flex items-center justify-between gap-4 py-4">
        <div className="flex-1 space-y-1">
          <Paragraph className="font-bold text-text-primary">{code}</Paragraph>
          <Paragraph size="sm" className={cn('text-text-secondary', expired && 'line-through')}>
            {reward}
          </Paragraph>
        </div>
        {!expired && <CopyButton textToCopy={code} />}
      </CardContent>
    </Card>
  );
}
