'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import { NAVER_STORE_URL, mainNav } from '@/lib/navigation';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? '메뉴 닫기' : '메뉴 열기'}</span>
      </Button>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-white">
          <div className="container-lab flex items-center justify-between py-4">
            <p className="text-sm font-semibold text-muted">전체 메뉴</p>
            <Button type="button" variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">메뉴 닫기</span>
            </Button>
          </div>
          <nav id={panelId} aria-label="모바일 주요 메뉴" className="container-lab pb-10">
            <ul className="divide-y divide-line border-y border-line">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col gap-0.5 py-4"
                  >
                    <span className="text-base font-semibold text-graphite">{item.labelKo}</span>
                    {item.descriptionKo ? (
                      <span className="text-sm text-muted">{item.descriptionKo}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="naver" size="lg" className="mt-6 w-full">
              <a href={NAVER_STORE_URL} target="_blank" rel="noopener noreferrer">
                네이버 스토어에서 구매
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
