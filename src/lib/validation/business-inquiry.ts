import { z } from 'zod';

/** 클라이언트와 서버가 공유하는 단일 검증 스키마 */
export const businessInquirySchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, { message: '회사명을 2자 이상 입력해 주세요.' })
    .max(100, { message: '회사명은 100자 이내로 입력해 주세요.' }),
  contactName: z
    .string()
    .trim()
    .min(2, { message: '담당자명을 2자 이상 입력해 주세요.' })
    .max(50, { message: '담당자명은 50자 이내로 입력해 주세요.' }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{8,20}$/, { message: '연락처를 숫자와 하이픈으로 입력해 주세요.' }),
  email: z
    .string()
    .trim()
    .max(254, { message: '이메일이 너무 깁니다.' })
    .pipe(z.email({ message: '올바른 이메일 주소를 입력해 주세요.' })),
  productType: z.enum(['hdmi', 'displayport', 'usb', 'lan', 'dvi-vga', 'converter', 'custom'], {
    message: '제품 유형을 선택해 주세요.',
  }),
  quantity: z.coerce
    .number({ message: '수량을 숫자로 입력해 주세요.' })
    .int({ message: '수량은 정수로 입력해 주세요.' })
    .min(1, { message: '수량은 1개 이상이어야 합니다.' })
    .max(1_000_000, { message: '수량은 1,000,000개 이하로 입력해 주세요.' }),
  timeline: z.enum(['asap', 'within-1-month', 'within-3-months', 'planning'], {
    message: '필요 일정을 선택해 주세요.',
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: '문의 내용을 10자 이상 입력해 주세요.' })
    .max(2000, { message: '문의 내용은 2,000자 이내로 입력해 주세요.' }),
  privacyConsent: z
    .union([z.literal('on'), z.literal(true), z.literal('true')])
    .transform(() => true)
    .pipe(z.literal(true, { message: '개인정보 처리 방침에 동의해 주세요.' })),
  /** 스팸 차단용 허니팟 — 사람은 볼 수 없는 필드입니다. */
  website: z.string().max(0).optional(),
});

export type BusinessInquiryInput = z.input<typeof businessInquirySchema>;
export type BusinessInquiry = z.output<typeof businessInquirySchema>;

export const productTypeOptions = [
  { value: 'hdmi', labelKo: 'HDMI 케이블' },
  { value: 'displayport', labelKo: 'DisplayPort 케이블' },
  { value: 'usb', labelKo: 'USB·USB-C 케이블' },
  { value: 'lan', labelKo: 'LAN 케이블' },
  { value: 'dvi-vga', labelKo: 'DVI·VGA 케이블' },
  { value: 'converter', labelKo: '컨버터·연장 케이블' },
  { value: 'custom', labelKo: '주문 제작·기타' },
] as const;

export const timelineOptions = [
  { value: 'asap', labelKo: '가능한 빨리' },
  { value: 'within-1-month', labelKo: '1개월 이내' },
  { value: 'within-3-months', labelKo: '3개월 이내' },
  { value: 'planning', labelKo: '검토 단계' },
] as const;
