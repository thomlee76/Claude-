import type { Metadata } from 'next';

/** TODO(deploy): 실제 운영 도메인으로 교체하고 환경변수로 분리 */
export const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://cable-lab.example.com';

export const SITE_NAME = '케이블연구소';
export const SITE_NAME_EN = 'Cable Lab';
export const SITE_DESCRIPTION =
  '모니터, TV, 노트북, 네트워크까지. 필요한 기기와 목적만 선택하면 알맞은 케이블을 찾아드립니다. 케이블연구소는 연결의 기준을 연구합니다.';

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function pageMetadata({ title, description, path, keywords }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
