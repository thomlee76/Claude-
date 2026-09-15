import { products } from '@/lib/data/products';
import type { CategoryId, ColorId, ConnectorId, Product, ShieldingId, SignalDirection } from '@/lib/types';
import { toArray } from '@/lib/utils';

export interface CatalogFilterState {
  category: CategoryId[];
  input: ConnectorId[];
  output: ConnectorId[];
  direction: SignalDirection[];
  standard: string[];
  resolution: string[];
  refresh: string[];
  dataRate: string[];
  length: string[];
  color: ColorId[];
  shielding: ShieldingId[];
  dex: boolean;
}

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

export const emptyFilterState: CatalogFilterState = {
  category: [],
  input: [],
  output: [],
  direction: [],
  standard: [],
  resolution: [],
  refresh: [],
  dataRate: [],
  length: [],
  color: [],
  shielding: [],
  dex: false,
};

/** 해상도 필터 구간 — 사용자가 이해하기 쉬운 단위로 묶었습니다. */
export const resolutionBuckets = [
  { id: '8k', labelKo: '8K', test: (p: Product) => p.maxResolution?.includes('8K') ?? false },
  {
    id: '4k',
    labelKo: '4K 이상',
    test: (p: Product) => (p.maxResolution?.includes('4K') || p.maxResolution?.includes('8K')) ?? false,
  },
  {
    id: 'fhd',
    labelKo: 'FHD (1080p)',
    test: (p: Product) => p.maxResolution !== null,
  },
] as const;

export const refreshBuckets = [
  { id: '120', labelKo: '120Hz 이상', min: 120 },
  { id: '60', labelKo: '60Hz 이상', min: 60 },
  { id: '30', labelKo: '30Hz 이상', min: 30 },
] as const;

export const dataRateBuckets = [
  { id: '40', labelKo: '40Gbps 이상', min: 40 },
  { id: '10', labelKo: '10Gbps 이상', min: 10 },
  { id: '5', labelKo: '5Gbps 이상', min: 5 },
] as const;

export const lengthBuckets = [
  { id: 'short', labelKo: '1m 이하', test: (m: number) => m <= 1 },
  { id: 'mid', labelKo: '1m 초과 3m 이하', test: (m: number) => m > 1 && m <= 3 },
  { id: 'long', labelKo: '3m 초과 10m 이하', test: (m: number) => m > 3 && m <= 10 },
  { id: 'xlong', labelKo: '10m 초과', test: (m: number) => m > 10 },
] as const;

/** 제품 데이터에서 실제 존재하는 규격 목록만 추출 */
export const standardOptions: string[] = Array.from(
  new Set(products.map((p) => p.standard)),
).sort((a, b) => a.localeCompare(b, 'ko'));

/** Gbps 문자열을 숫자로 변환 ('48Gbps' → 48, '480Mbps' → 0.48) */
export function parseDataRate(value: string | null): number | null {
  if (!value) return null;
  const match = /([\d.]+)\s*(G|M)bps/i.exec(value);
  if (!match?.[1] || !match[2]) return null;
  const num = Number.parseFloat(match[1]);
  return match[2].toUpperCase() === 'G' ? num : num / 1000;
}

export function parseFilters(searchParams: CatalogSearchParams): CatalogFilterState {
  return {
    category: toArray(searchParams['category']) as CategoryId[],
    input: toArray(searchParams['input']) as ConnectorId[],
    output: toArray(searchParams['output']) as ConnectorId[],
    direction: toArray(searchParams['direction']) as SignalDirection[],
    standard: toArray(searchParams['standard']),
    resolution: toArray(searchParams['resolution']),
    refresh: toArray(searchParams['refresh']),
    dataRate: toArray(searchParams['dataRate']),
    length: toArray(searchParams['length']),
    color: toArray(searchParams['color']) as ColorId[],
    shielding: toArray(searchParams['shielding']) as ShieldingId[],
    dex: toArray(searchParams['dex']).includes('1'),
  };
}

export function countActiveFilters(state: CatalogFilterState): number {
  const arrays: (keyof CatalogFilterState)[] = [
    'category',
    'input',
    'output',
    'direction',
    'standard',
    'resolution',
    'refresh',
    'dataRate',
    'length',
    'color',
    'shielding',
  ];
  const listed = arrays.reduce((sum, key) => {
    const value = state[key];
    return sum + (Array.isArray(value) ? value.length : 0);
  }, 0);
  return listed + (state.dex ? 1 : 0);
}

export function filterProducts(state: CatalogFilterState, source: Product[] = products): Product[] {
  return source.filter((product) => {
    if (state.category.length > 0 && !state.category.includes(product.category)) return false;
    if (state.input.length > 0 && !state.input.includes(product.inputConnector)) return false;
    if (state.output.length > 0 && !state.output.includes(product.outputConnector)) return false;
    if (state.direction.length > 0 && !state.direction.includes(product.direction)) return false;
    if (state.standard.length > 0 && !state.standard.includes(product.standard)) return false;
    if (state.color.length > 0 && !state.color.some((c) => product.color.includes(c))) return false;
    if (state.dex && !product.supportsSamsungDex) return false;

    if (state.shielding.length > 0) {
      if (product.shielding === null || !state.shielding.includes(product.shielding)) return false;
    }

    if (state.resolution.length > 0) {
      const matched = state.resolution.some((id) => {
        const bucket = resolutionBuckets.find((b) => b.id === id);
        return bucket ? bucket.test(product) : false;
      });
      if (!matched) return false;
    }

    if (state.refresh.length > 0) {
      const matched = state.refresh.some((id) => {
        const bucket = refreshBuckets.find((b) => b.id === id);
        return bucket ? (product.maxRefreshRate ?? 0) >= bucket.min : false;
      });
      if (!matched) return false;
    }

    if (state.dataRate.length > 0) {
      const rate = parseDataRate(product.dataRate);
      const matched = state.dataRate.some((id) => {
        const bucket = dataRateBuckets.find((b) => b.id === id);
        return bucket && rate !== null ? rate >= bucket.min : false;
      });
      if (!matched) return false;
    }

    if (state.length.length > 0) {
      const matched = state.length.some((id) => {
        const bucket = lengthBuckets.find((b) => b.id === id);
        return bucket ? product.lengths.some((m) => bucket.test(m)) : false;
      });
      if (!matched) return false;
    }

    return true;
  });
}
