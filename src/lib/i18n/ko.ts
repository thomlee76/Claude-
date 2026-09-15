import type { Locale } from './config';

/**
 * 한국어 UI 사전. 영어 로케일 추가 시 동일한 키 구조로 `en.ts` 를 작성합니다.
 */
export const ko = {
  brand: {
    name: '케이블연구소',
    nameEn: 'Cable Lab',
    tagline: '연결의 기준을 연구합니다.',
    slogan2: '복잡한 연결, 케이블연구소가 답을 찾습니다.',
    slogan3: '정확한 규격. 안정적인 연결.',
  },
  nav: {
    products: '제품',
    finder: '케이블 찾기',
    guide: '케이블 가이드',
    about: '브랜드 소개',
    business: '기업 구매',
    support: '고객지원',
    store: '네이버 스토어',
    menu: '메뉴 열기',
    close: '메뉴 닫기',
    skipToContent: '본문 바로가기',
  },
  common: {
    viewDetail: '자세히 보기',
    viewAll: '전체 제품 보기',
    buyNaver: '네이버에서 구매',
    inquiryB2B: '기업 구매 문의',
    findCable: '케이블 찾기',
    lengths: '길이',
    direction: '전송 방향',
    standard: '규격',
    loading: '불러오는 중입니다',
    modelCode: '모델 코드',
  },
  direction: {
    unidirectional: '단방향',
    bidirectional: '양방향',
  },
  purpose: {
    video: '영상 출력',
    data: '데이터 전송',
    charging: '충전·급전',
    network: '네트워크',
  },
} as const;

export type Dictionary = typeof ko;

const dictionaries: Record<Locale, Dictionary | null> = {
  ko,
  // TODO(i18n): 영어 로케일 사전 추가
  en: null,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? ko;
}
