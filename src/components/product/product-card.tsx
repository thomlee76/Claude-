import { ArrowLeftRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ConnectorIcon } from '@/components/icons/connectors';
import { Badge } from '@/components/ui/badge';
import { categoryMap, connectorMap, directionLabels } from '@/lib/data/taxonomy';
import type { Product } from '@/lib/types';
import { cn, formatLengths } from '@/lib/utils';

/** 제품의 핵심 스펙 한 줄 요약 */
function headlineSpec(product: Product): string {
  if (product.maxResolution && product.maxRefreshRate) {
    return `${product.maxResolution.replace(/\s*\(.*\)/, '')} ${product.maxRefreshRate}Hz`;
  }
  if (product.dataRate && product.bandwidthMhz) return `${product.dataRate} · ${product.bandwidthMhz}MHz`;
  if (product.dataRate) return product.dataRate;
  if (product.powerDelivery) return `${product.powerDelivery}W PD`;
  return product.standard;
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const image = product.images[0];
  const category = categoryMap.get(product.category);
  const input = connectorMap.get(product.inputConnector);
  const output = connectorMap.get(product.outputConnector);
  const isUnidirectional = product.direction === 'unidirectional';

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        {image ? (
          <Image
            src={image.src}
            alt={image.altKo}
            width={image.width}
            height={image.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        {category ? (
          <Badge variant="dark" className="absolute left-3 top-3">
            {category.nameKo}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1">
          <p className="font-tech text-xs text-muted">{product.modelCode}</p>
          <h3 className="text-base font-bold leading-snug text-graphite">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
              {product.nameKo}
            </Link>
          </h3>
        </div>

        {/* 단자 구성과 전송 방향 */}
        <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2">
          <ConnectorIcon connector={product.inputConnector} className="h-5 w-8 text-graphite" />
          <span className="font-tech text-xs text-muted">{input?.shortKo}</span>
          {isUnidirectional ? (
            <ArrowRight className="size-4 shrink-0 text-lab-blue" aria-hidden="true" />
          ) : (
            <ArrowLeftRight className="size-4 shrink-0 text-lab-blue" aria-hidden="true" />
          )}
          <span className="font-tech text-xs text-muted">{output?.shortKo}</span>
          <ConnectorIcon connector={product.outputConnector} className="h-5 w-8 text-graphite" />
          <span className="sr-only">
            {input?.nameKo}에서 {output?.nameKo} {directionLabels[product.direction]} 연결
          </span>
        </div>

        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">핵심 사양</dt>
            <dd className="font-tech font-semibold text-graphite">{headlineSpec(product)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">길이</dt>
            <dd className="font-tech text-right text-graphite">{formatLengths(product.lengths)}</dd>
          </div>
        </dl>

        {isUnidirectional ? (
          <Badge variant="warning" className="w-fit">
            단방향 제품
          </Badge>
        ) : null}

        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lab-blue">
            자세히 보기
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
