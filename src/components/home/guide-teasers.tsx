import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ArticleCard } from '@/components/guide/article-card';
import { guideArticles } from '@/lib/data/guide';

export function GuideTeasers() {
  return (
    <section className="container-lab py-14 sm:py-20" aria-labelledby="guide-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 id="guide-title" className="text-2xl font-bold text-graphite sm:text-3xl">
            케이블 가이드
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            구매 전에 알아 두면 시행착오를 줄일 수 있는 규격 해설입니다.
          </p>
        </div>
        <Link href="/guide" className="inline-flex items-center gap-1.5 text-sm font-semibold text-lab-blue">
          전체 가이드
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guideArticles.map((article) => (
          <li key={article.slug} className="h-full">
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
