import { SlidersHorizontal } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CatalogFilters } from '@/components/catalog/catalog-filters';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/products';
import { countActiveFilters, filterProducts, parseFilters, type CatalogSearchParams } from '@/lib/filters';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '제품 카탈로그',
  description:
    'HDMI, DisplayPort, USB-C, LAN, DVI·VGA, 컨버터까지. 단자와 규격, 해상도와 길이 조건으로 케이블을 좁혀서 찾아보십시오.',
  path: '/products',
  keywords: ['케이블 카탈로그', 'HDMI 케이블', '랜케이블', 'USB-C 케이블'],
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const state = parseFilters(params);
  const filtered = filterProducts(state);
  const activeCount = countActiveFilters(state);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '제품', path: '/products' },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-10 sm:py-14">
          <nav aria-label="현재 위치" className="text-sm text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-lab-blue">
                  홈
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-graphite">
                제품
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">제품 카탈로그</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            전체 {products.length}개 제품을 단자·규격·성능 조건으로 정리했습니다. 조건을 선택하면 목록이
            바로 좁혀집니다.
          </p>
        </div>
      </div>

      <div className="container-lab grid gap-8 py-10 lg:grid-cols-[17rem_1fr] lg:gap-10">
        {/* 모바일: 접이식 필터 (details 요소로 JavaScript 없이도 동작) */}
        <details className="rounded-card border border-line bg-white p-4 lg:hidden" open={activeCount > 0}>
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-bold text-graphite">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            필터 {activeCount > 0 ? `(${activeCount}개 적용)` : ''}
          </summary>
          <div className="mt-4">
            <CatalogFilters state={state} resultCount={filtered.length} />
          </div>
        </details>

        <aside className="hidden lg:block" aria-label="제품 필터">
          <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-card border border-line bg-white p-5">
            <CatalogFilters state={state} resultCount={filtered.length} />
          </div>
        </aside>

        <section aria-label="제품 목록">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
            <p className="text-sm text-muted">
              <span className="font-tech font-semibold text-graphite">{filtered.length}</span>개 제품
              {activeCount > 0 ? ` · 필터 ${activeCount}개 적용` : ''}
            </p>
          </div>

          {filtered.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <li key={product.id} className="h-full">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
      <h2 className="text-lg font-bold text-graphite">조건에 맞는 제품이 없습니다</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        선택한 조건을 모두 만족하는 제품을 찾지 못했습니다. 조건을 일부 해제하거나, 연결 환경을 입력해
        추천을 받아 보십시오.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild variant="secondary">
          <Link href="/products">필터 초기화</Link>
        </Button>
        <Button asChild>
          <Link href="/finder">케이블 찾기</Link>
        </Button>
      </div>
    </div>
  );
}
