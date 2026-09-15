import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white" aria-labelledby="hero-title">
      {/* 배경: 옅은 그리드 — 측정 환경을 암시하되 장식은 최소화합니다. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e4e9f2 1px, transparent 1px), linear-gradient(to bottom, #e4e9f2 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      <div className="container-lab relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-tech inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="inline-block size-1.5 rounded-full bg-compatible" aria-hidden="true" />
            CABLE LAB · 연결 규격 연구소
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-3xl font-extrabold leading-[1.25] text-graphite sm:text-4xl lg:text-5xl lg:leading-[1.2]"
          >
            연결의 기준을
            <br />
            연구합니다.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-[1.75] text-muted sm:text-lg">
            모니터, TV, 노트북, 네트워크까지. 필요한 기기와 목적만 선택하면 알맞은 케이블을 찾아드립니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/finder">
                <Search aria-hidden="true" />
                케이블 찾기
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/products">
                전체 제품 보기
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <SignalStrip />
      </div>
    </section>
  );
}

/** 신호 전달을 표현하는 가로 라인 — 장식 요소이므로 스크린리더에서 숨깁니다. */
function SignalStrip() {
  return (
    <div className="mt-14 hidden sm:block" aria-hidden="true">
      <svg viewBox="0 0 1200 40" className="h-10 w-full" preserveAspectRatio="none">
        <line x1="0" y1="20" x2="1200" y2="20" stroke="var(--color-line)" strokeWidth="2" />
        <line
          x1="0"
          y1="20"
          x2="1200"
          y2="20"
          stroke="var(--color-cyan-electric)"
          strokeWidth="2"
          strokeDasharray="14 34"
          className="animate-signal"
        />
        {[120, 420, 720, 1020].map((x) => (
          <g key={x}>
            <circle cx={x} cy="20" r="5" fill="var(--color-lab-blue)" />
            <circle cx={x} cy="20" r="10" fill="var(--color-lab-blue)" opacity="0.12" />
          </g>
        ))}
      </svg>
    </div>
  );
}
