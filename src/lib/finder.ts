import { products } from '@/lib/data/products';
import { connectorMap, deviceMap } from '@/lib/data/taxonomy';
import { parseDataRate } from '@/lib/filters';
import type { ConnectorId, DeviceId, Product, Purpose } from '@/lib/types';
import { toArray } from '@/lib/utils';

/** 요구 사양 옵션 — 목적에 따라 다른 항목이 노출됩니다. */
export const requirementOptions = {
  video: [
    { id: 'res-8k', labelKo: '8K 해상도' },
    { id: 'res-4k', labelKo: '4K 해상도' },
    { id: 'hz-120', labelKo: '120Hz 이상 고주사율' },
    { id: 'hz-60', labelKo: '60Hz 이상' },
    { id: 'dex', labelKo: '삼성 DeX 사용' },
  ],
  data: [
    { id: 'rate-40', labelKo: '40Gbps 이상' },
    { id: 'rate-10', labelKo: '10Gbps 이상' },
    { id: 'rate-5', labelKo: '5Gbps 이상' },
  ],
  charging: [
    { id: 'pd-100', labelKo: '100W 급속 충전' },
    { id: 'pd-60', labelKo: '60W 이상' },
  ],
  network: [
    { id: 'rate-40', labelKo: '10Gbps 초과 (CAT.8급)' },
    { id: 'rate-5', labelKo: '1Gbps 이상' },
    { id: 'shield', labelKo: '차폐(STP) 필요' },
  ],
} as const satisfies Record<Purpose, ReadonlyArray<{ id: string; labelKo: string }>>;

export const lengthOptions = [
  { id: 'any', labelKo: '상관없음', min: 0, max: Number.POSITIVE_INFINITY },
  { id: 'u1', labelKo: '1m 이하', min: 0, max: 1 },
  { id: 'u3', labelKo: '1~3m', min: 1, max: 3 },
  { id: 'u10', labelKo: '3~10m', min: 3, max: 10 },
  { id: 'o10', labelKo: '10m 이상', min: 10, max: Number.POSITIVE_INFINITY },
] as const;

export interface FinderState {
  devices: DeviceId[];
  source: ConnectorId | null;
  target: ConnectorId | null;
  purpose: Purpose | null;
  requirements: string[];
  /** 5단계(요구 사양)는 선택 없이 넘어갈 수 있어 통과 여부를 별도로 기록합니다. */
  requirementsSet: boolean;
  length: string | null;
}

export const finderStepCount = 6;

export const emptyFinderState: FinderState = {
  devices: [],
  source: null,
  target: null,
  purpose: null,
  requirements: [],
  requirementsSet: false,
  length: null,
};

export type FinderSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | null {
  if (value === undefined) return null;
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.length > 0 ? v : null;
}

export function parseFinderState(searchParams: FinderSearchParams): FinderState {
  const source = firstValue(searchParams['source']);
  const target = firstValue(searchParams['target']);
  const purpose = firstValue(searchParams['purpose']);
  return {
    devices: toArray(searchParams['device']) as DeviceId[],
    source: source && connectorMap.has(source as ConnectorId) ? (source as ConnectorId) : null,
    target: target && connectorMap.has(target as ConnectorId) ? (target as ConnectorId) : null,
    purpose:
      purpose === 'video' || purpose === 'data' || purpose === 'charging' || purpose === 'network'
        ? purpose
        : null,
    requirements: toArray(searchParams['req']),
    requirementsSet: firstValue(searchParams['reqset']) === '1',
    length: firstValue(searchParams['length']),
  };
}

/** 현재 진행해야 할 단계(1-6). 모든 단계를 마치면 7(결과 화면)을 반환합니다. */
export function currentStep(state: FinderState): number {
  if (state.devices.length === 0) return 1;
  if (state.source === null) return 2;
  if (state.target === null) return 3;
  if (state.purpose === null) return 4;
  if (!state.requirementsSet) return 5;
  if (state.length === null) return 6;
  return 7;
}

export function isComplete(state: FinderState): boolean {
  return currentStep(state) === 7;
}

export interface FinderMatch {
  product: Product;
  /** 100점 만점 적합도 */
  score: number;
  /** 왜 이 제품이 맞는지에 대한 설명 */
  reasonsKo: string[];
  /** 선택 조건과 어긋나는 부분 */
  cautionsKo: string[];
}

function connectorLabel(id: ConnectorId): string {
  return connectorMap.get(id)?.shortKo ?? id;
}

function connectorsMatch(product: Product, source: ConnectorId, target: ConnectorId): boolean {
  if (product.inputConnector === source && product.outputConnector === target) return true;
  // 양방향 제품은 반대로 연결해도 동작합니다.
  if (
    product.direction === 'bidirectional' &&
    product.inputConnector === target &&
    product.outputConnector === source
  ) {
    return true;
  }
  return false;
}

function meetsRequirement(product: Product, requirement: string): boolean {
  const rate = parseDataRate(product.dataRate);
  switch (requirement) {
    case 'res-8k':
      return product.maxResolution?.includes('8K') ?? false;
    case 'res-4k':
      return (product.maxResolution?.includes('4K') || product.maxResolution?.includes('8K')) ?? false;
    case 'hz-120':
      return (product.maxRefreshRate ?? 0) >= 120;
    case 'hz-60':
      return (product.maxRefreshRate ?? 0) >= 60;
    case 'dex':
      return product.supportsSamsungDex;
    case 'rate-40':
      return rate !== null && rate >= 40;
    case 'rate-10':
      return rate !== null && rate >= 10;
    case 'rate-5':
      return rate !== null && rate >= 5;
    case 'pd-100':
      return (product.powerDelivery ?? 0) >= 100;
    case 'pd-60':
      return (product.powerDelivery ?? 0) >= 60;
    case 'shield':
      return product.shielding === 'sftp' || product.shielding === 'ftp';
    default:
      return false;
  }
}

function requirementLabel(purpose: Purpose, id: string): string {
  const list: ReadonlyArray<{ id: string; labelKo: string }> = requirementOptions[purpose];
  return list.find((option) => option.id === id)?.labelKo ?? id;
}

function matchesLength(product: Product, lengthId: string | null): boolean {
  if (lengthId === null || lengthId === 'any') return true;
  const option = lengthOptions.find((o) => o.id === lengthId);
  if (!option) return true;
  return product.lengths.some((m) => m > option.min - 0.001 && m <= option.max);
}

/**
 * 호환되는 제품만 반환합니다.
 * 커넥터·목적이 맞지 않는 제품은 점수와 관계없이 제외합니다.
 * (조건에 맞는 제품이 없으면 빈 배열 — 임의의 대체 상품을 추천하지 않습니다.)
 */
export function findMatches(state: FinderState): FinderMatch[] {
  if (!isComplete(state) || state.source === null || state.target === null || state.purpose === null) {
    return [];
  }
  const { source, target, purpose } = state;

  const matches: FinderMatch[] = [];

  for (const product of products) {
    if (!connectorsMatch(product, source, target)) continue;
    if (!product.purposes.includes(purpose)) continue;
    if (!matchesLength(product, state.length)) continue;

    const reasonsKo: string[] = [];
    const cautionsKo: string[] = [];
    let score = 60;

    reasonsKo.push(
      `${connectorLabel(source)} 출력을 ${connectorLabel(target)} 입력으로 연결하는 ${product.standard} 규격 제품입니다.`,
    );

    if (product.direction === 'bidirectional') {
      score += 5;
      reasonsKo.push('양방향 제품이라 연결 순서를 바꿔도 동작합니다.');
    } else if (product.inputConnector === source) {
      reasonsKo.push(
        `단방향 제품이며, 선택하신 ${connectorLabel(source)} → ${connectorLabel(target)} 방향과 일치합니다.`,
      );
    }

    const unmet: string[] = [];
    for (const requirement of state.requirements) {
      if (meetsRequirement(product, requirement)) {
        score += 12;
        reasonsKo.push(`요청하신 "${requirementLabel(purpose, requirement)}" 조건을 충족합니다.`);
      } else {
        unmet.push(requirementLabel(purpose, requirement));
      }
    }

    if (unmet.length > 0) {
      score -= unmet.length * 25;
      cautionsKo.push(`다음 조건은 충족하지 못합니다: ${unmet.join(', ')}`);
    }

    if (state.devices.some((d) => product.devices.includes(d))) {
      score += 8;
      const matchedDevices = state.devices
        .filter((d) => product.devices.includes(d))
        .map((d) => deviceMap.get(d)?.nameKo ?? d);
      reasonsKo.push(`${matchedDevices.join(', ')} 환경에서 많이 사용되는 구성입니다.`);
    }

    if (product.featured) score += 3;

    // 요구 사양을 하나도 충족하지 못하면 추천하지 않습니다.
    if (state.requirements.length > 0 && unmet.length === state.requirements.length) continue;

    matches.push({ product, score: Math.max(0, Math.min(100, score)), reasonsKo, cautionsKo });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/** 커넥터 조합만 맞는(목적·사양은 다른) 대안 — 결과가 없을 때 참고용으로 안내합니다. */
export function findConnectorAlternatives(state: FinderState): Product[] {
  if (state.source === null || state.target === null) return [];
  const { source, target } = state;
  return products.filter((p) => connectorsMatch(p, source, target));
}

export function buildFinderQuery(state: Partial<FinderState>): string {
  const params = new URLSearchParams();
  state.devices?.forEach((d) => params.append('device', d));
  if (state.source) params.set('source', state.source);
  if (state.target) params.set('target', state.target);
  if (state.purpose) params.set('purpose', state.purpose);
  state.requirements?.forEach((r) => params.append('req', r));
  if (state.requirementsSet) params.set('reqset', '1');
  if (state.length) params.set('length', state.length);
  return params.toString();
}
