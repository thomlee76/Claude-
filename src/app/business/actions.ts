'use server';

import { businessInquirySchema } from '@/lib/validation/business-inquiry';

export type InquiryState =
  | { status: 'idle' }
  | { status: 'success'; referenceId: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> };

/** 요청 폭주를 막기 위한 아주 단순한 인메모리 제한 (단일 인스턴스 기준). */
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  submissionLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function referenceId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CL-${date}-${random}`;
}

/**
 * 기업 구매 문의 접수 (모의 처리).
 *
 * 현재는 서버에서 검증만 수행하고 접수 번호를 반환합니다.
 * TODO(integration): 메일 발송(예: Resend, AWS SES) 또는 CRM·DB 연동을 이 위치에 추가하세요.
 *                    개인정보는 저장 기간과 파기 절차를 정한 뒤에 보관해야 합니다.
 */
export async function submitBusinessInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = businessInquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: '입력 내용을 다시 확인해 주세요.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // 허니팟이 채워졌다면 자동 제출로 간주하고 조용히 성공 응답을 반환합니다.
  if (parsed.data.website) {
    return { status: 'success', referenceId: referenceId() };
  }

  if (isRateLimited(parsed.data.email)) {
    return {
      status: 'error',
      message: '짧은 시간에 너무 많이 제출되었습니다. 잠시 후 다시 시도해 주세요.',
    };
  }

  // TODO(integration): 외부 시스템 전송. 현재는 접수 사실만 확인합니다.
  return { status: 'success', referenceId: referenceId() };
}
