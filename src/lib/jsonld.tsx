import { SITE_DESCRIPTION, SITE_NAME, SITE_NAME_EN, SITE_URL } from '@/lib/seo';
import { categoryMap, connectorMap } from '@/lib/data/taxonomy';
import type { GuideArticle, Product } from '@/lib/types';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    // TODO(legal): 실제 주소, 대표번호, 사업자 정보 추가
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?standard={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productJsonLd(product: Product) {
  const category = categoryMap.get(product.category)?.nameKo ?? product.category;
  const input = connectorMap.get(product.inputConnector)?.shortKo ?? product.inputConnector;
  const output = connectorMap.get(product.outputConnector)?.shortKo ?? product.outputConnector;

  const properties = [
    { name: '규격', value: product.standard },
    { name: '입력 단자', value: input },
    { name: '출력 단자', value: output },
    { name: '전송 방향', value: product.direction === 'bidirectional' ? '양방향' : '단방향' },
    ...(product.maxResolution ? [{ name: '최대 해상도', value: product.maxResolution }] : []),
    ...(product.maxRefreshRate ? [{ name: '최대 주사율', value: `${product.maxRefreshRate}Hz` }] : []),
    ...(product.dataRate ? [{ name: '전송 속도', value: product.dataRate }] : []),
    ...(product.powerDelivery ? [{ name: '전력 공급', value: `${product.powerDelivery}W` }] : []),
    { name: '길이', value: product.lengths.map((m) => `${m}m`).join(', ') },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameKo,
    sku: product.modelCode,
    mpn: product.modelCode,
    description: product.shortDescriptionKo,
    category,
    url: `${SITE_URL}/products/${product.slug}`,
    image: product.images.map((image) => `${SITE_URL}${image.src}`),
    brand: { '@type': 'Brand', name: SITE_NAME },
    additionalProperty: properties.map((property) => ({
      '@type': 'PropertyValue',
      name: property.name,
      value: property.value,
    })),
    // TODO(commerce): 판매 가격·재고 정보가 확정되면 offers 를 실제 값으로 채우세요.
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleJsonLd(article: GuideArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.titleKo,
    description: article.summaryKo,
    datePublished: article.publishedAt,
    inLanguage: 'ko-KR',
    url: `${SITE_URL}/guide/${article.slug}`,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD 는 신뢰할 수 있는 내부 데이터로만 구성됩니다.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
