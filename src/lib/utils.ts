import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** 길이 배열을 "1m · 2m · 3m" 형태로 표기 */
export function formatLengths(lengths: readonly number[]): string {
  return lengths.map((m) => `${m}m`).join(' · ');
}

/** searchParams 값을 항상 배열로 정규화 */
export function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}
