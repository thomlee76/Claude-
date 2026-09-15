import { AlertTriangle, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FinderMatch } from '@/lib/finder';
import type { Product } from '@/lib/types';

export function ResultList({ matches }: { matches: FinderMatch[] }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-compatible/30 bg-compatible-soft p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-[#067647]">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          호환되는 제품 {matches.length}개를 찾았습니다
        </p>
        <p className="mt-1.5 text-sm text-[#067647]/85">
          아래 결과는 선택하신 단자 구성과 목적에 실제로 맞는 제품만 표시한 것입니다.
        </p>
      </div>

      <ul className="space-y-5">
        {matches.map((match) => (
          <li key={match.product.id}>
            <ResultRow match={match} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultRow({ match }: { match: FinderMatch }) {
  const { product, reasonsKo, cautionsKo, score } = match;
  return (
    <article className="grid gap-5 rounded-card border border-line bg-white p-5 sm:p-6 lg:grid-cols-[18rem_1fr]">
      <div>
        <ProductCard product={product} />
      </div>

      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={score >= 80 ? 'compatible' : 'blue'}>적합도 {score}점</Badge>
          {product.direction === 'unidirectional' ? <Badge variant="warning">단방향</Badge> : null}
        </div>

        <div>
          <h3 className="text-sm font-bold text-graphite">이 제품을 추천하는 이유</h3>
          <ul className="mt-2.5 space-y-2">
            {reasonsKo.map((reason) => (
              <li key={reason} className="flex gap-2 text-sm leading-relaxed text-graphite/90">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-compatible" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {cautionsKo.length > 0 ? (
          <div>
            <h3 className="text-sm font-bold text-graphite">확인이 필요한 부분</h3>
            <ul className="mt-2.5 space-y-2">
              {cautionsKo.map((caution) => (
                <li key={caution} className="flex gap-2 text-sm leading-relaxed text-graphite/90">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
                  {caution}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {product.warnings.filter((w) => w.level === 'critical').length > 0 ? (
          <div className="rounded-lg border border-danger/25 bg-danger-soft p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-graphite">
              <Info className="size-4 text-danger" aria-hidden="true" />
              구매 전 반드시 확인하세요
            </h3>
            <ul className="mt-2 space-y-1.5">
              {product.warnings
                .filter((w) => w.level === 'critical')
                .map((warning) => (
                  <li key={warning.textKo} className="text-sm leading-relaxed text-graphite/85">
                    {warning.textKo}
                  </li>
                ))}
            </ul>
          </div>
        ) : null}

        <Button asChild variant="secondary" size="sm">
          <Link href={`/products/${product.slug}`}>
            제품 상세 보기
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function EmptyResult({
  alternatives,
  resetHref,
}: {
  alternatives: Product[];
  resetHref: string;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-card border border-dashed border-line bg-white px-6 py-12 text-center">
        <h2 className="text-lg font-bold text-graphite">조건에 맞는 제품을 찾지 못했습니다</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          선택하신 단자 구성과 요구 사양을 모두 만족하는 제품이 현재 카탈로그에 없습니다. 맞지 않는 제품을
          임의로 추천하지 않기 위해 결과를 비워 두었습니다. 조건을 조정하시거나, 필요한 사양을 알려 주시면
          검토 후 회신드리겠습니다.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="secondary">
            <Link href={resetHref}>조건 다시 선택</Link>
          </Button>
          <Button asChild>
            <Link href="/business?topic=custom">필요 사양 문의하기</Link>
          </Button>
        </div>
      </div>

      {alternatives.length > 0 ? (
        <section aria-labelledby="alt-title" className="rounded-card border border-line bg-white p-5 sm:p-6">
          <h3 id="alt-title" className="text-sm font-bold text-graphite">
            단자 구성만 같은 제품
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            아래 제품은 단자 구성은 일치하지만 선택하신 목적이나 요구 사양과는 차이가 있습니다. 사양을 직접
            확인한 뒤 판단하십시오.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((product) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
