/**
 * 케이블연구소 도메인 타입 정의.
 * 모든 콘텐츠는 이 타입을 통해 로컬 파일에 저장됩니다.
 */

/** 커넥터(단자) 종류 — 자체 SVG 아이콘 키와 1:1 대응합니다. */
export type ConnectorId =
  | 'hdmi'
  | 'mini-hdmi'
  | 'displayport'
  | 'mini-displayport'
  | 'usb-a'
  | 'usb-b'
  | 'usb-c'
  | 'dvi'
  | 'vga'
  | 'rj45';

/** 제품 카테고리 */
export type CategoryId = 'hdmi' | 'displayport' | 'usb' | 'lan' | 'dvi-vga' | 'converter';

/** 신호 전송 방향 */
export type SignalDirection = 'unidirectional' | 'bidirectional';

/** 사용자의 연결 목적 */
export type Purpose = 'video' | 'data' | 'charging' | 'network';

/** 홈 화면의 "무엇을 연결하나요?" 과제 */
export type TaskId =
  | 'monitor'
  | 'tv-projector'
  | 'laptop-dock'
  | 'fast-data'
  | 'giga-internet'
  | 'port-convert';

/** 연결 대상 기기 */
export type DeviceId =
  | 'pc'
  | 'laptop'
  | 'monitor'
  | 'tv'
  | 'projector'
  | 'console'
  | 'router'
  | 'storage'
  | 'smartphone';

/** LAN 케이블 차폐 방식 */
export type ShieldingId = 'utp' | 'ftp' | 'sftp';

/** 제품 색상 */
export type ColorId = 'black' | 'white' | 'gray';

/** 경고 수준 — critical 은 구매 전 반드시 확인해야 하는 제약입니다. */
export type WarningLevel = 'critical' | 'caution' | 'info';

export interface ProductWarning {
  level: WarningLevel;
  textKo: string;
}

export interface ProductImage {
  /** `/images/products/<slug>/<n>.svg` — 실제 촬영 이미지로 교체 가능 */
  src: string;
  altKo: string;
  width: number;
  height: number;
}

export interface SpecRow {
  labelKo: string;
  value: string;
  /** 고정폭 서체로 표기할지 여부 (규격·코드·수치) */
  tech?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  /** LAB-XXXX-000 형식의 모델 코드 */
  modelCode: string;
  nameKo: string;
  shortDescriptionKo: string;
  category: CategoryId;
  inputConnector: ConnectorId;
  outputConnector: ConnectorId;
  direction: SignalDirection;
  /** 예: 'HDMI 2.1', 'CAT.8', 'USB 3.0' */
  standard: string;
  maxResolution: string | null;
  /** Hz */
  maxRefreshRate: number | null;
  /** 예: '48Gbps' */
  dataRate: string | null;
  /** USB PD 전력(W). 해당 없으면 null */
  powerDelivery: number | null;
  /** 판매 길이(m) */
  lengths: number[];
  color: ColorId[];
  features: string[];
  compatibilityNotes: string[];
  warnings: ProductWarning[];
  images: ProductImage[];
  /** 네이버 스마트스토어 상품 URL — TODO(content): 실제 링크로 교체 */
  naverUrl: string;
  featured: boolean;

  /* ── 검색·추천 엔진용 메타데이터 ─────────────────────────── */
  purposes: Purpose[];
  tasks: TaskId[];
  devices: DeviceId[];
  shielding: ShieldingId | null;
  /** LAN 케이블 대역폭(MHz) */
  bandwidthMhz: number | null;
  supportsSamsungDex: boolean;
  /** 사양표 추가 행 */
  specs: SpecRow[];
  relatedIds: string[];
}

export interface Category {
  id: CategoryId;
  nameKo: string;
  descriptionKo: string;
  connectors: ConnectorId[];
}

export interface Task {
  id: TaskId;
  nameKo: string;
  descriptionKo: string;
  purpose: Purpose;
}

export interface Connector {
  id: ConnectorId;
  nameKo: string;
  shortKo: string;
}

export interface Device {
  id: DeviceId;
  nameKo: string;
}

export interface GuideArticle {
  slug: string;
  titleKo: string;
  summaryKo: string;
  /** ISO-8601 (YYYY-MM-DD) */
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  relatedCategory: CategoryId | null;
}
