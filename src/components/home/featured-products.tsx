import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ProductCard } from '@/components/product/product-card';
import { getFeaturedProducts } from '@/lib/data/products';

export function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section className="container-lab py-14 sm:py-20" aria-labelledby="featured-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 id="featured-title" className="text-2xl font-bold text-graphite sm:text-3xl">
            추천 제품
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            문의가 가장 많은 연결 구성을 기준으로 정리한 제품입니다.
          </p>
        </div>
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-lab-blue">
          전체 제품 보기
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <li key={product.id} className="h-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
