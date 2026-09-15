import { cn } from '@/lib/utils';

/** 케이블연구소 심볼 — 두 단자를 잇는 신호선을 단순화한 형태입니다. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('shrink-0', className)} role="img" aria-label="케이블연구소">
      <rect width="32" height="32" rx="8" fill="var(--color-graphite)" />
      <circle cx="10" cy="16" r="3" fill="var(--color-cyan-electric)" />
      <circle cx="22" cy="16" r="3" fill="var(--color-lab-blue)" />
      <path
        d="M10 16h12"
        stroke="var(--color-cyan-electric)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}
