import type { GuideArticle } from '@/lib/types';

/**
 * 가이드 아티클 레지스트리.
 * 본문은 `src/content/guide/<slug>.mdx` 에 있으며, 아래 맵을 통해 정적으로 연결됩니다.
 * (문자열 동적 import 대신 명시적 맵을 사용해 타입 안전성과 정적 생성 결과를 보장합니다.)
 */
export const guideArticles: GuideArticle[] = [
  {
    slug: 'hdmi-2-0-vs-2-1',
    titleKo: 'HDMI 2.0과 HDMI 2.1의 차이',
    summaryKo:
      '대역폭 18Gbps와 48Gbps가 실제 화면에서 어떤 차이를 만드는지, 언제 2.1이 필요한지 정리했습니다.',
    publishedAt: '2025-01-14',
    readingMinutes: 5,
    tags: ['HDMI', '8K', '게이밍'],
    relatedCategory: 'hdmi',
  },
  {
    slug: 'usb-c-monitor-checklist',
    titleKo: 'USB-C로 모니터를 연결하기 전에 확인할 것',
    summaryKo:
      '같은 USB-C 단자라도 화면이 나오지 않는 이유는 DP Alt Mode 때문입니다. 구매 전 확인 순서를 안내합니다.',
    publishedAt: '2025-02-03',
    readingMinutes: 6,
    tags: ['USB-C', 'DP Alt Mode', '노트북'],
    relatedCategory: 'usb',
  },
  {
    slug: 'cat6-cat7-cat8-guide',
    titleKo: 'CAT.6, CAT.7, CAT.8 선택 가이드',
    summaryKo:
      '가정용 기가 인터넷에 CAT.8이 필요한지, 차폐 방식은 어떤 기준으로 고르는지 실제 환경별로 비교했습니다.',
    publishedAt: '2025-02-20',
    readingMinutes: 7,
    tags: ['LAN', 'CAT.8', '네트워크'],
    relatedCategory: 'lan',
  },
  {
    slug: 'unidirectional-vs-bidirectional',
    titleKo: '단방향 케이블과 양방향 케이블의 차이',
    summaryKo:
      '변환 케이블이 "반대로는 안 되는" 이유를 신호 처리 구조로 설명하고, 구매 전 확인 방법을 정리했습니다.',
    publishedAt: '2025-03-06',
    readingMinutes: 5,
    tags: ['변환', '단방향', '기초'],
    relatedCategory: 'converter',
  },
];

export const guideArticleMap = new Map(guideArticles.map((a) => [a.slug, a]));

export function getArticleBySlug(slug: string): GuideArticle | undefined {
  return guideArticleMap.get(slug);
}

export function getRelatedArticles(slug: string, limit = 3): GuideArticle[] {
  return guideArticles.filter((a) => a.slug !== slug).slice(0, limit);
}
