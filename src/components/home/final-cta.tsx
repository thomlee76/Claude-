import { ArrowRight, Building2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { NAVER_STORE_URL } from '@/lib/navigation';

export function FinalCta() {
  return (
    <section className="container-lab pb-20 pt-6" aria-labelledby="cta-title">
      <div className="rounded-card border border-line bg-white p-7 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 id="cta-title" className="text-2xl font-bold leading-snug text-graphite sm:text-3xl">
              정확한 규격. 안정적인 연결.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              어떤 케이블이 맞는지 아직 확신이 서지 않는다면, 조건을 입력하고 결과를 확인해 보십시오.
              기업·대량 구매는 별도 견적으로 안내해 드립니다.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg">
              <Link href="/finder">
                케이블 찾기
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="naver" size="lg">
              <a href={NAVER_STORE_URL} target="_blank" rel="noopener noreferrer">
                네이버 스토어에서 구매
                <ExternalLink aria-hidden="true" />
                <span className="sr-only">(새 창에서 열림)</span>
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/business">
                <Building2 aria-hidden="true" />
                기업 구매 문의
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
