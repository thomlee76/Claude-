import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/layout/logo';
import { NAVER_STORE_URL, footerNav } from '@/lib/navigation';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="container-lab grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-base font-extrabold text-graphite">케이블연구소</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            정확한 규격. 안정적인 연결.
            <br />
            복잡한 연결 문제를 규격 단위로 검증해 정리합니다.
          </p>
          <a
            href={NAVER_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#03C75A]"
          >
            네이버 스마트스토어
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(새 창에서 열림)</span>
          </a>
        </div>

        {footerNav.map((group) => (
          <nav key={group.titleKo} aria-label={group.titleKo}>
            <h2 className="text-sm font-bold text-graphite">{group.titleKo}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-lab-blue">
                    {item.labelKo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-lab flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          {/* TODO(legal): 상호, 대표자, 사업자등록번호, 통신판매업 신고번호, 주소, 고객센터 번호 기재 */}
          <p>© {new Date().getFullYear()} 케이블연구소 (Cable Lab). 데모 사이트입니다.</p>
          <p>사업자 정보 및 이용약관은 확정 후 게시됩니다.</p>
        </div>
      </div>
    </footer>
  );
}
