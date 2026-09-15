import { ArrowLeft, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleCard } from '@/components/guide/article-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getArticleBySlug, getRelatedArticles, guideArticles } from '@/lib/data/guide';
import { getArticleContent } from '@/lib/guide-content';
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/seo';

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: '문서를 찾을 수 없습니다' };

  const url = `${SITE_URL}/guide/${article.slug}`;
  return {
    title: article.titleKo,
    description: article.summaryKo,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${article.titleKo} | 케이블연구소`,
      description: article.summaryKo,
      locale: 'ko_KR',
      publishedTime: article.publishedAt,
    },
    twitter: { card: 'summary_large_image', title: article.titleKo, description: article.summaryKo },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const content = getArticleContent(slug);
  if (!article || !content) notFound();

  const related = getRelatedArticles(slug);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '케이블 가이드', path: '/guide' },
          { name: article.titleKo, path: `/guide/${article.slug}` },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-10 sm:py-14">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-lab-blue"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            케이블 가이드
          </Link>

          <article>
            <header className="mt-6 max-w-3xl">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="blue">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-graphite sm:text-4xl">
                {article.titleKo}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">{article.summaryKo}</p>
              <p className="font-tech mt-5 flex items-center gap-2 text-xs text-muted">
                <Clock className="size-3.5" aria-hidden="true" />
                <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                <span aria-hidden="true">·</span>
                읽는 시간 {article.readingMinutes}분
              </p>
            </header>
          </article>
        </div>
      </div>

      <div className="container-lab py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-card border border-line bg-white p-6 sm:p-10">
            {content}
          </div>

          <div className="mt-8 rounded-card border border-line bg-white p-6">
            <h2 className="text-base font-bold text-graphite">아직 결정하기 어려우신가요?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              연결 환경을 입력하시면 호환되는 제품만 골라 드립니다.
            </p>
            <Button asChild className="mt-4">
              <Link href="/finder">케이블 찾기</Link>
            </Button>
          </div>
        </div>

        {related.length > 0 ? (
          <section aria-labelledby="related-guide-title" className="mt-14">
            <h2 id="related-guide-title" className="text-xl font-bold text-graphite">
              다른 가이드
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
