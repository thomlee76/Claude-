export interface NavItem {
  href: string;
  labelKo: string;
  descriptionKo?: string;
}

/** TODO(content): 실제 네이버 스마트스토어 주소로 교체 */
export const NAVER_STORE_URL = 'https://smartstore.naver.com/';

export const mainNav: NavItem[] = [
  { href: '/products', labelKo: '제품', descriptionKo: '규격별 전체 카탈로그' },
  { href: '/finder', labelKo: '케이블 찾기', descriptionKo: '조건 입력형 추천' },
  { href: '/guide', labelKo: '케이블 가이드', descriptionKo: '규격 해설 아카이브' },
  { href: '/about', labelKo: '브랜드 소개', descriptionKo: '연구소의 기준' },
  { href: '/business', labelKo: '기업 구매', descriptionKo: '대량·B2B 문의' },
  { href: '/support', labelKo: '고객지원', descriptionKo: '자주 묻는 질문' },
];

export const footerNav: { titleKo: string; items: NavItem[] }[] = [
  {
    titleKo: '제품',
    items: [
      { href: '/products?category=hdmi', labelKo: 'HDMI' },
      { href: '/products?category=displayport', labelKo: 'DisplayPort' },
      { href: '/products?category=usb', labelKo: 'USB·USB-C' },
      { href: '/products?category=lan', labelKo: 'LAN' },
      { href: '/products?category=dvi-vga', labelKo: 'DVI·VGA' },
      { href: '/products?category=converter', labelKo: '컨버터·연장' },
    ],
  },
  {
    titleKo: '탐색',
    items: [
      { href: '/finder', labelKo: '케이블 찾기' },
      { href: '/guide', labelKo: '케이블 가이드' },
      { href: '/products', labelKo: '전체 제품' },
    ],
  },
  {
    titleKo: '회사',
    items: [
      { href: '/about', labelKo: '브랜드 소개' },
      { href: '/business', labelKo: '기업 구매' },
      { href: '/support', labelKo: '고객지원' },
    ],
  },
];
