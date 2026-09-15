import type {
  Category,
  ColorId,
  Connector,
  Device,
  Purpose,
  ShieldingId,
  SignalDirection,
  Task,
} from '@/lib/types';

export const connectors: Connector[] = [
  { id: 'hdmi', nameKo: 'HDMI (Type-A)', shortKo: 'HDMI' },
  { id: 'mini-hdmi', nameKo: 'Mini HDMI (Type-C)', shortKo: 'Mini HDMI' },
  { id: 'displayport', nameKo: 'DisplayPort', shortKo: 'DP' },
  { id: 'mini-displayport', nameKo: 'Mini DisplayPort', shortKo: 'Mini DP' },
  { id: 'usb-a', nameKo: 'USB Type-A', shortKo: 'USB-A' },
  { id: 'usb-b', nameKo: 'USB Type-B', shortKo: 'USB-B' },
  { id: 'usb-c', nameKo: 'USB Type-C', shortKo: 'USB-C' },
  { id: 'dvi', nameKo: 'DVI-D', shortKo: 'DVI' },
  { id: 'vga', nameKo: 'VGA (D-Sub 15)', shortKo: 'VGA' },
  { id: 'rj45', nameKo: 'RJ45 (LAN)', shortKo: 'RJ45' },
];

export const connectorMap = new Map(connectors.map((c) => [c.id, c]));

export const categories: Category[] = [
  {
    id: 'hdmi',
    nameKo: 'HDMI',
    descriptionKo: 'TV·모니터·콘솔까지 가장 널리 쓰이는 영상·음성 통합 규격입니다.',
    connectors: ['hdmi', 'mini-hdmi'],
  },
  {
    id: 'displayport',
    nameKo: 'DisplayPort',
    descriptionKo: '고주사율 게이밍과 다중 모니터 구성에 유리한 PC 중심 영상 규격입니다.',
    connectors: ['displayport', 'mini-displayport'],
  },
  {
    id: 'usb',
    nameKo: 'USB·USB-C',
    descriptionKo: '데이터 전송, 충전, 영상 출력을 한 단자로 처리하는 범용 규격입니다.',
    connectors: ['usb-a', 'usb-b', 'usb-c'],
  },
  {
    id: 'lan',
    nameKo: 'LAN',
    descriptionKo: '기가 인터넷과 사내 네트워크 배선을 위한 유선 랜 케이블입니다.',
    connectors: ['rj45'],
  },
  {
    id: 'dvi-vga',
    nameKo: 'DVI·VGA',
    descriptionKo: '기존 사무용 PC와 산업용 장비에 남아 있는 레거시 영상 단자입니다.',
    connectors: ['dvi', 'vga'],
  },
  {
    id: 'converter',
    nameKo: '컨버터·연장 케이블',
    descriptionKo: '서로 다른 단자를 잇거나 거리를 늘려야 할 때 사용하는 제품군입니다.',
    connectors: ['usb-a', 'hdmi', 'vga'],
  },
];

export const categoryMap = new Map(categories.map((c) => [c.id, c]));

export const tasks: Task[] = [
  {
    id: 'monitor',
    nameKo: '모니터 연결',
    descriptionKo: 'PC·노트북을 모니터에 연결해 화면을 출력합니다.',
    purpose: 'video',
  },
  {
    id: 'tv-projector',
    nameKo: 'TV·프로젝터 연결',
    descriptionKo: '거실 TV나 빔프로젝터로 영상과 소리를 함께 보냅니다.',
    purpose: 'video',
  },
  {
    id: 'laptop-dock',
    nameKo: '노트북 확장',
    descriptionKo: 'USB-C 한 포트로 화면 출력과 주변기기를 확장합니다.',
    purpose: 'video',
  },
  {
    id: 'fast-data',
    nameKo: '고속 데이터 전송',
    descriptionKo: '외장 SSD·저장장치의 대용량 파일을 빠르게 옮깁니다.',
    purpose: 'data',
  },
  {
    id: 'giga-internet',
    nameKo: '기가 인터넷',
    descriptionKo: '공유기와 PC를 유선으로 연결해 속도와 지연을 안정화합니다.',
    purpose: 'network',
  },
  {
    id: 'port-convert',
    nameKo: '기존 단자 변환',
    descriptionKo: '신형 기기와 구형 단자를 서로 이어 줍니다.',
    purpose: 'video',
  },
];

export const taskMap = new Map(tasks.map((t) => [t.id, t]));

export const devices: Device[] = [
  { id: 'pc', nameKo: '데스크톱 PC' },
  { id: 'laptop', nameKo: '노트북' },
  { id: 'monitor', nameKo: '모니터' },
  { id: 'tv', nameKo: 'TV' },
  { id: 'projector', nameKo: '프로젝터' },
  { id: 'console', nameKo: '게임 콘솔' },
  { id: 'router', nameKo: '공유기·모뎀' },
  { id: 'storage', nameKo: '외장 저장장치' },
  { id: 'smartphone', nameKo: '스마트폰·태블릿' },
];

export const deviceMap = new Map(devices.map((d) => [d.id, d]));

export const directionLabels: Record<SignalDirection, string> = {
  unidirectional: '단방향',
  bidirectional: '양방향',
};

export const purposeLabels: Record<Purpose, string> = {
  video: '영상 출력',
  data: '데이터 전송',
  charging: '충전·급전',
  network: '네트워크',
};

export const purposeDescriptions: Record<Purpose, string> = {
  video: '화면을 다른 기기로 내보냅니다.',
  data: '파일과 주변기기 신호를 주고받습니다.',
  charging: '전원을 공급하거나 충전합니다.',
  network: '인터넷·사내망에 유선으로 연결합니다.',
};

export const colorLabels: Record<ColorId, string> = {
  black: '블랙',
  white: '화이트',
  gray: '그레이',
};

export const shieldingLabels: Record<ShieldingId, string> = {
  utp: 'UTP (비차폐)',
  ftp: 'F/UTP (호일 차폐)',
  sftp: 'S/FTP (이중 차폐)',
};
