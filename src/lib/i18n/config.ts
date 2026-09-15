/**
 * 다국어 준비 레이어.
 * MVP 는 한국어만 노출하며 언어 전환 UI 는 제공하지 않습니다.
 * 영어 추가 시 `dictionaries` 에 `en` 사전을 등록하고
 * `app/[locale]` 세그먼트를 도입하면 됩니다.
 */
export const locales = ['ko', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
