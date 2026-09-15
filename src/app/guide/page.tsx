import type { Metadata } from 'next';
import Link from 'next/link';

import { ArticleCard } from '@/components/guide/article-card';
import { Button } from '@/components/ui/button';
import { guideArticles } from '@/lib/data/guide';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '케이블 가이드',
  description:
    'HDMI 버전 차이, USB-C 영상 출력 조건, LAN 등급 선택, 단방향 케이블의 원리까지. 구매 전에 확인할 규격 지식을 정리했습니다.',
  path: '/guide',
  keywords: ['HDMI 2.1 차이', 'USB-C 모니터', 'CAT.8 랜케이블', '단방향 케이블'],
});

export default function GuideIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '케이블 가이드', path: '/guide' },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold text-graphite sm:text-4xl">케이블 가이드</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            규격의 숫자가 실제 화면과 속도에서 어떤 차이를 만드는지 정리했습니다. 구매 전에 한 번만 읽어 두면
            대부분의 시행착오를 줄일 수 있습니다.
          </p>
        </div>
      </div>

      <div className="container-lab py-10 sm:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guideArticles.map((article) => (
            <li key={article.slug} className="h-full">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-card border border-line bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-graphite">찾으시는 내용이 없나요?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            연결 환경을 입력하시면 조건에 맞는 제품과 확인해야 할 점을 함께 안내해 드립니다.
          </p>
          <Button asChild className="mt-5">
            <Link href="/finder">케이블 찾기</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
