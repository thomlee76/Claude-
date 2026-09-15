import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { MobileNav } from '@/components/layout/mobile-nav';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { NAVER_STORE_URL, mainNav } from '@/lib/navigation';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container-lab flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="케이블연구소 홈">
          <Logo className="h-8 w-8" />
          <span className="text-base font-extrabold tracking-tight text-graphite">케이블연구소</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-graphite transition-colors hover:bg-surface hover:text-lab-blue"
                >
                  {item.labelKo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="naver" size="sm" className="hidden sm:inline-flex">
            <a href={NAVER_STORE_URL} target="_blank" rel="noopener noreferrer">
              네이버 스토어
              <ExternalLink className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(새 창에서 열림)</span>
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
