'use client';

import Image from 'next/image';
import { useState } from 'react';

import { BrandLogo } from '@/components/brand-logo';
import { Badge } from '@/components/ui/badge';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Paragraph } from '@/components/ui/paragraph';

export default function DesignSystemPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  return (
    <main className="py-12">
      <Container className="space-y-12">
        <Heading variant="h1">Design System Preview</Heading>

        <section>
          <Heading variant="h2" className="mt-10">
            Brand Logo Variants
          </Heading>
          <div className="mt-4 space-y-4">
            <div>
              <Paragraph size="sm" className="mb-2 text-text-secondary">
                Default (gradient) - with favicon icon
              </Paragraph>
              <BrandLogo variant="default" />
            </div>
            <div>
              <Paragraph size="sm" className="mb-2 text-text-secondary">
                Minimal (single color) - with favicon icon
              </Paragraph>
              <BrandLogo variant="minimal" />
            </div>
            <div>
              <Paragraph size="sm" className="mb-2 text-text-secondary">
                Text only (without icon)
              </Paragraph>
              <BrandLogo showIcon={false} />
            </div>
          </div>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Brand Logo Sizes
          </Heading>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <BrandLogo size="xs" />
            <BrandLogo size="sm" />
            <BrandLogo size="md" />
            <BrandLogo size="lg" />
            <BrandLogo size="xl" />
            <BrandLogo size="2xl" />
          </div>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Favicon
          </Heading>
          <div className="mt-4 space-y-6">
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Default size (32x32)
              </Paragraph>
              <div className="flex items-center gap-4">
                <Image src="/favicon.svg" alt="Favicon" width={32} height={32} className="rounded" />
                <Image src="/favicon.svg" alt="Favicon" width={64} height={64} className="rounded" />
                <Image src="/favicon.svg" alt="Favicon" width={128} height={128} className="rounded" />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                On different backgrounds
              </Paragraph>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-background border border-border">
                  <Image src="/favicon.svg" alt="Favicon" width={48} height={48} />
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-card border border-border">
                  <Image src="/favicon.svg" alt="Favicon" width={48} height={48} />
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-accent-primary">
                  <Image src="/favicon.svg" alt="Favicon" width={48} height={48} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Brand Identity - Integrated Logo
          </Heading>
          <div className="mt-4 space-y-6">
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Favicon is now integrated in BrandLogo component (default behavior)
              </Paragraph>
              <div className="flex items-center gap-6">
                <BrandLogo size="lg" />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                In header context (simulated)
              </Paragraph>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4">
                <BrandLogo size="md" />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                With different logo variants (all include favicon)
              </Paragraph>
              <div className="flex flex-wrap items-center gap-6">
                <BrandLogo variant="default" size="md" />
                <BrandLogo variant="minimal" size="md" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Typography
          </Heading>
          <div className="mt-4 space-y-4">
            <Heading variant="h1">The quick brown fox (H1)</Heading>
            <Heading variant="h2">The quick brown fox (H2)</Heading>
            <Heading variant="h3">The quick brown fox (H3)</Heading>
            <Heading variant="h4">The quick brown fox (H4)</Heading>
          </div>
          <div className="mt-4 space-y-2">
            <Paragraph size="lg">Paragraph Large (lg). The quick brown fox jumps over the lazy dog.</Paragraph>
            <Paragraph>Paragraph Medium (md). The quick brown fox jumps over the lazy dog.</Paragraph>
            <Paragraph size="sm">Paragraph Small (sm). The quick brown fox jumps over the lazy dog.</Paragraph>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2" className="mt-10">
            Button Variants
          </Heading>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2">Sizes</Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2">States</Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" loading>
              Loading...
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="ghost" asChild>
              <a href="#" className="pointer-events-none opacity-70">
                As Child
              </a>
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2" className="mt-8">
            With Icons (Iconify)
          </Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" leadingIcon="i-lucide-rocket">
              Leading Icon
            </Button>
            <Button variant="secondary" trailingIcon="i-lucide-arrow-right">
              Trailing Icon
            </Button>
            <Button variant="ghost" square leadingIcon="i-lucide-rocket" aria-label="Rocket" />
            <Button variant="primary" loading>
              Loading...
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2" className="mt-10">
            Input
          </Heading>
          <div className="space-y-6">
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Default input
              </Paragraph>
              <Input type="text" placeholder="Enter your name" />
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Email input
              </Paragraph>
              <Input type="email" placeholder="your.email@domain.com" />
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Different sizes
              </Paragraph>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input type="text" placeholder="Small" size="sm" />
                <Input type="text" placeholder="Medium (default)" size="md" />
                <Input type="text" placeholder="Large" size="lg" />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Disabled state
              </Paragraph>
              <Input type="text" placeholder="Disabled input" disabled />
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                With label (example)
              </Paragraph>
              <div className="space-y-2">
                <label htmlFor="example-input" className="text-sm font-medium text-text-primary">
                  Email Address
                </label>
                <Input id="example-input" type="email" placeholder="your.email@domain.com" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2" className="mt-10">
            Badge Variants
          </Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="solid" color="primary">
              Solid Primary
            </Badge>
            <Badge variant="outline" color="primary">
              Outline Primary
            </Badge>
            <Badge variant="soft" color="primary">
              Soft Primary
            </Badge>
            <Badge variant="subtle" color="primary">
              Subtle Primary
            </Badge>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2">Badge Colors</Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="neutral">Neutral</Badge>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2">Badge Sizes</Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="xl">Extra Large</Badge>
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2">Badge with Icons</Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Badge leadingIcon="i-lucide-rocket" color="primary">
              Leading Icon
            </Badge>
            <Badge trailingIcon="i-lucide-arrow-right" color="primary">
              Trailing Icon
            </Badge>
            <Badge leadingIcon="i-lucide-check" trailingIcon="i-lucide-arrow-right" color="success">
              Both Icons
            </Badge>
            <Badge square leadingIcon="i-lucide-star" color="warning" aria-label="Star" />
          </div>
        </section>

        <section className="space-y-4">
          <Heading variant="h2" className="mt-10">
            Loading
          </Heading>
          <div className="mt-4 space-y-6">
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Different sizes
              </Paragraph>
              <div className="flex flex-wrap items-center gap-8">
                <Loading size="sm" />
                <Loading size="md" />
                <Loading size="lg" />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                With custom text
              </Paragraph>
              <div className="flex flex-wrap items-center gap-8">
                <Loading text="Loading..." />
                <Loading text="Please wait..." />
                <Loading text="Almost there..." />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Icon only (no text)
              </Paragraph>
              <div className="flex flex-wrap items-center gap-8">
                <Loading showText={false} size="md" />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                On different backgrounds (to see blink animation clearly)
              </Paragraph>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center justify-center rounded-lg bg-background border border-border p-6">
                  <Loading showText={false} size="md" />
                </div>
                <div className="flex items-center justify-center rounded-lg bg-card border border-border p-6">
                  <Loading showText={false} size="md" />
                </div>
                <div className="flex items-center justify-center rounded-lg bg-accent-primary/10 border border-accent-primary/20 p-6">
                  <Loading showText={false} size="md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Image Loader
          </Heading>
          <div className="mt-4 space-y-6">
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                With valid image (using fill)
              </Paragraph>
              <div className="relative aspect-3/2 w-full max-w-md overflow-hidden rounded-lg border border-border">
                <ImageLoader
                  src="https://picsum.photos/seed/image-loader/800/600"
                  alt="Valid image example"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                With broken image (fallback to logo with overlay)
              </Paragraph>
              <div className="relative aspect-3/2 w-full max-w-md overflow-hidden rounded-lg border border-border">
                <ImageLoader
                  src="https://picsum.photos/seed/fallback-demo/800/600"
                  alt="Broken image example"
                  fill
                  className="object-cover"
                  forceError
                />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Fixed dimensions (without fill)
              </Paragraph>
              <div className="flex flex-wrap gap-4">
                <ImageLoader
                  src="https://picsum.photos/seed/image-loader-square/300/300"
                  alt="Square image"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <ImageLoader
                  src="https://picsum.photos/seed/fallback-square/300/300"
                  alt="Broken square image"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                  forceError
                />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Custom overlay color
              </Paragraph>
              <div className="relative aspect-3/2 w-full max-w-md overflow-hidden rounded-lg border border-border">
                <ImageLoader
                  src="https://picsum.photos/seed/custom-overlay/800/600"
                  alt="Custom overlay"
                  fill
                  className="object-cover"
                  overlayClassName="bg-black/60"
                  forceError
                />
              </div>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Without fallback logo (showFallbackLogo=false)
              </Paragraph>
              <div className="relative aspect-3/2 w-full max-w-md overflow-hidden rounded-lg border border-border bg-card/90">
                <ImageLoader
                  src="https://picsum.photos/seed/no-fallback/800/600"
                  alt="No fallback"
                  fill
                  className="object-cover"
                  showFallbackLogo={false}
                  forceError
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Card
          </Heading>
          <Card className="mt-4 max-w-md">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is the supporting description inside the card component.</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph>
                This is the main body content of the card. You can place paragraphs, lists, or other interactive
                elements inside the content area.
              </Paragraph>
            </CardContent>
            <CardFooter>
              <Button variant="primary">Footer Action</Button>
            </CardFooter>
          </Card>
          <Card className="mt-6 max-w-md">
            <Image
              src="https://picsum.photos/seed/design-system/600/400"
              alt="Placeholder"
              width={600}
              height={400}
              className="w-full h-auto rounded-t-lg object-cover"
              priority={false}
            />
            <CardHeader>
              <CardTitle>Card With Image</CardTitle>
              <CardDescription>This card demonstrates media placed above textual content.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="secondary">View Details</Button>
            </CardFooter>
          </Card>
        </section>

        <section>
          <Heading variant="h2" className="mt-10">
            Bottom Sheet
          </Heading>
          <div className="mt-4 space-y-6">
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Click the button below to open the bottom sheet. It should slide up from the bottom on mobile devices.
              </Paragraph>
              <Button variant="primary" onClick={() => setIsBottomSheetOpen(true)}>
                Open Bottom Sheet
              </Button>
            </div>
            <div>
              <Paragraph size="sm" className="mb-3 text-text-secondary">
                Current state: {isBottomSheetOpen ? 'Open' : 'Closed'}
              </Paragraph>
            </div>
          </div>

          <BottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetOpen(false)}
            title="Bottom Sheet Example"
          >
            <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
              <Heading variant="h3">Bottom Sheet Example</Heading>
              <Button
                variant="ghost"
                square
                onClick={() => setIsBottomSheetOpen(false)}
                leadingIcon="i-lucide-x"
                aria-label="Close bottom sheet"
              />
            </div>
            <div className="overflow-y-auto px-4 py-6">
              <div className="space-y-4">
                <Paragraph>
                  This is a bottom sheet component built with Radix UI Dialog. It slides up from the bottom on mobile
                  devices.
                </Paragraph>
                <Paragraph size="sm" className="text-text-secondary">
                  You can add any content here. The sheet will automatically handle scrolling if the content is too
                  long.
                </Paragraph>
                <div className="space-y-2">
                  <Button variant="primary" className="w-full">
                    Primary Action
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Secondary Action
                  </Button>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="py-3">
                        <Paragraph size="sm">Item {i + 1}</Paragraph>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </BottomSheet>
        </section>
      </Container>
    </main>
  );
}
