import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { HubNavigation } from '@/components/hub-navigation';

export default function GrowAGardenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-text-primary">
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
        <div className="w-full [&_header]:bg-transparent [&_header]:backdrop-blur-none">
          <MainHeader />
        </div>
        <HubNavigation />
      </div>
      {children}
      <MainFooter />
    </div>
  );
}
