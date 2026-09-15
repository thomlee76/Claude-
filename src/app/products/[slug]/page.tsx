import { Building2, Check, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ConnectionDiagram } from '@/components/product/connection-diagram';
import { ProductCard } from '@/components/product/product-card';
import { ProductGallery } from '@/components/product/product-gallery';
import { SpecTable } from '@/components/product/spec-table';
import { WarningList } from '@/components/product/warning-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  categoryMap,
  colorLabels,
  connectorMap,
  directionLabels,
  purposeLabels,
  shieldingLabels,
} from '@/lib/data/taxonomy';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/data/products';
import { breadcrumbJsonLd, JsonLd, productJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/seo';
import type { Product, SpecRow } from '@/lib/types';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: '제품을 찾을 수 없습니다' };

  const url = `${SITE_URL}/products/${product.slug}`;
  const description = `${product.shortDescriptionKo} 모델 코드 ${product.modelCode}, 길이 ${product.lengths
    .map((m) => `${m}m`)
    .join('/')}.`;

  return {
    title: product.nameKo,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${product.nameKo} | 케이블연구소`,
      description,
      locale: 'ko_KR',
      images: product.images[0]
        ? [{ url: product.images[0].src, width: product.images[0].width, height: product.images[0].height }]
        : undefined,
    },
    twitter: { card: 'summary_large_image', title: product.nameKo, description },
  };
}

/** 사양표 기본 행 + 제품별 추가 행 */
function buildSpecRows(product: Product): SpecRow[] {
  const base: SpecRow[] = [
    { labelKo: '모델 코드', value: product.modelCode, tech: true },
    { labelKo: '카테고리', value: categoryMap.get(product.category)?.nameKo ?? product.category },
    {
      labelKo: '단자 구성',
      value: `${connectorMap.get(product.inputConnector)?.nameKo ?? ''} ↔ ${
        connectorMap.get(product.outputConnector)?.nameKo ?? ''
      }`,
    },
    { labelKo: '전송 방향', value: directionLabels[product.direction] },
    { labelKo: '판매 길이', value: product.lengths.map((m) => `${m}m`).join(', '), tech: true },
    { labelKo: '색상', value: product.color.map((c) => colorLabels[c]).join(', ') },
    ...(product.shielding ? [{ labelKo: '차폐 방식', value: shieldingLabels[product.shielding] }] : []),
    ...(product.supportsSamsungDex ? [{ labelKo: '삼성 DeX', value: '지원' }] : []),
  ];
  // 기본 행과 제품별 행에 같은 항목이 있으면 제품별 값을 우선해 한 번만 노출합니다.
  const merged = new Map<string, SpecRow>();
  for (const row of [...base, ...product.specs]) merged.set(row.labelKo, row);
  return [...merged.values()];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categoryMap.get(product.category);
  const related = getRelatedProducts(product);
  const criticalWarnings = product.warnings.filter((w) => w.level === 'critical');

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '제품', path: '/products' },
          { name: product.nameKo, path: `/products/${product.slug}` },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-8 sm:py-10">
          <nav aria-label="현재 위치" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-lab-blue">
                  홈
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-lab-blue">
                  제품
                </Link>
              </li>
              {category ? (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={`/products?category=${category.id}`} className="hover:text-lab-blue">
                      {category.nameKo}
                    </Link>
                  </li>
                </>
              ) : null}
            </ol>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ProductGallery images={product.images} nameKo={product.nameKo} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {category ? <Badge variant="blue">{category.nameKo}</Badge> : null}
                <Badge variant={product.direction === 'unidirectional' ? 'warning' : 'compatible'}>
                  {directionLabels[product.direction]}
                </Badge>
                {product.purposes.map((purpose) => (
                  <Badge key={purpose}>{purposeLabels[purpose]}</Badge>
                ))}
              </div>

              <p className="font-tech mt-4 text-sm text-muted">{product.modelCode}</p>
              <h1 className="mt-1.5 text-2xl font-extrabold leading-snug text-graphite sm:text-3xl">
                {product.nameKo}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">{product.shortDescriptionKo}</p>

              {/* 길이 옵션 */}
              <section aria-labelledby="length-title" className="mt-7">
                <h2 id="length-title" className="text-sm font-bold text-graphite">
                  길이 옵션
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.lengths.map((meters) => (
                    <li
                      key={meters}
                      className="font-tech rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-graphite"
                    >
                      {meters}m
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  {/* TODO(commerce): 길이별 가격·재고는 네이버 스토어 상품 옵션과 연동 */}
                  길이별 가격과 재고는 네이버 스토어에서 확인하실 수 있습니다.
                </p>
              </section>

              {criticalWarnings.length > 0 ? (
                <div className="mt-7 space-y-3">
                  <WarningList warnings={criticalWarnings} />
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="naver" size="lg" className="flex-1">
                  <a href={product.naverUrl} target="_blank" rel="noopener noreferrer">
                    네이버에서 구매
                    <ExternalLink aria-hidden="true" />
                    <span className="sr-only">(새 창에서 열림)</span>
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="flex-1">
                  <Link href={`/business?product=${product.slug}`}>
                    <Building2 aria-hidden="true" />
                    기업 구매 문의
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lab grid gap-10 py-12 lg:grid-cols-[1fr_20rem] lg:gap-14 lg:py-16">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="diagram-title">
            <h2 id="diagram-title" className="text-xl font-bold text-graphite sm:text-2xl">
              연결 구조
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              신호가 어느 방향으로 흐르는지 먼저 확인하십시오.
            </p>
            <ConnectionDiagram
              className="mt-5"
              input={product.inputConnector}
              output={product.outputConnector}
              direction={product.direction}
              standard={product.standard}
            />
          </section>

          <section aria-labelledby="features-title">
            <h2 id="features-title" className="text-xl font-bold text-graphite sm:text-2xl">
              주요 특징
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2.5 rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-graphite"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-compatible" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="compat-title">
            <h2 id="compat-title" className="text-xl font-bold text-graphite sm:text-2xl">
              이런 경우에 사용합니다
            </h2>
            <ul className="mt-5 space-y-2.5">
              {product.compatibilityNotes.map((note) => (
                <li key={note} className="flex gap-2.5 text-sm leading-relaxed text-graphite/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lab-blue" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="limits-title">
            <h2 id="limits-title" className="text-xl font-bold text-graphite sm:text-2xl">
              제한 사항 및 확인할 점
            </h2>
            <div className="mt-5">
              <WarningList warnings={product.warnings} />
            </div>
          </section>

          <section aria-labelledby="spec-title">
            <h2 id="spec-title" className="text-xl font-bold text-graphite sm:text-2xl">
              상세 사양
            </h2>
            <div className="mt-5">
              <SpecTable rows={buildSpecRows(product)} caption={`${product.nameKo} 상세 사양표`} />
            </div>
            {/* TODO(legal): KC 인증번호, 보증 기간, A/S 정책은 확정 후 이 영역에 추가 */}
            <p className="mt-3 text-xs text-muted">
              표기된 성능은 표준 규격 기준값이며, 실제 동작은 연결된 기기의 포트 규격에 따라 달라집니다.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit" aria-labelledby="summary-title">
          <div className="rounded-card border border-line bg-white p-5">
            <h2 id="summary-title" className="text-sm font-bold text-graphite">
              한눈에 보기
            </h2>
            <Separator className="my-4" />
            <dl className="space-y-3 text-sm">
              <SummaryRow labelKo="규격" value={product.standard} tech />
              {product.maxResolution ? (
                <SummaryRow labelKo="최대 해상도" value={product.maxResolution} tech />
              ) : null}
              {product.maxRefreshRate ? (
                <SummaryRow labelKo="최대 주사율" value={`${product.maxRefreshRate}Hz`} tech />
              ) : null}
              {product.dataRate ? <SummaryRow labelKo="전송 속도" value={product.dataRate} tech /> : null}
              {product.powerDelivery ? (
                <SummaryRow labelKo="전력 공급" value={`${product.powerDelivery}W`} tech />
              ) : null}
              <SummaryRow labelKo="전송 방향" value={directionLabels[product.direction]} />
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-white py-12 sm:py-16">
          <div className="container-lab">
            <h2 id="related-title" className="text-xl font-bold text-graphite sm:text-2xl">
              연관 제품
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="h-full">
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

function SummaryRow({ labelKo, value, tech }: { labelKo: string; value: string; tech?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="shrink-0 text-muted">{labelKo}</dt>
      <dd className={`text-right font-semibold text-graphite${tech ? ' font-tech' : ''}`}>{value}</dd>
    </div>
  );
}
