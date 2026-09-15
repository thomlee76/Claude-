import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ConnectorIcon } from '@/components/icons/connectors';
import { categories } from '@/lib/data/taxonomy';
import { products } from '@/lib/data/products';

export function CategoryGrid() {
  return (
    <section className="border-y border-line bg-white py-14 sm:py-20" aria-labelledby="category-title">
      <div className="container-lab">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="category-title" className="text-2xl font-bold text-graphite sm:text-3xl">
              인기 카테고리
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              규격별로 정리된 카탈로그에서 필요한 조건만 좁혀 보십시오.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-lab-blue"
          >
            전체 카탈로그
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = products.filter((p) => p.category === category.id).length;
            return (
              <li key={category.id}>
                <Link
                  href={`/products?category=${category.id}`}
                  className="group flex h-full flex-col gap-4 rounded-card border border-line bg-surface/60 p-5 transition-colors hover:border-lab-blue/40 hover:bg-white"
                >
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {category.connectors.slice(0, 3).map((connector) => (
                      <ConnectorIcon
                        key={connector}
                        connector={connector}
                        className="h-6 w-9 text-graphite/70 transition-colors group-hover:text-lab-blue"
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-graphite">{category.nameKo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{category.descriptionKo}</p>
                  </div>
                  <p className="font-tech mt-auto text-xs text-muted">{count}개 제품</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
