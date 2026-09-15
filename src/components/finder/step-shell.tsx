import { Check } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const stepLabels = [
  '기기 선택',
  '출력 단자',
  '입력 단자',
  '연결 목적',
  '요구 사양',
  '길이',
] as const;

export function StepProgress({ current }: { current: number }) {
  return (
    <nav aria-label="케이블 찾기 진행 단계">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {stepLabels.map((label, index) => {
          const step = index + 1;
          const done = current > step;
          const active = current === step;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  'font-tech inline-flex size-6 items-center justify-center rounded-full border text-xs font-semibold',
                  done && 'border-compatible bg-compatible text-white',
                  active && 'border-lab-blue bg-lab-blue text-white',
                  !done && !active && 'border-line bg-white text-muted',
                )}
                aria-hidden="true"
              >
                {done ? <Check className="size-3.5" /> : step}
              </span>
              <span
                className={cn(
                  'text-xs sm:text-sm',
                  active ? 'font-semibold text-graphite' : 'text-muted',
                )}
                {...(active ? { 'aria-current': 'step' as const } : {})}
              >
                {label}
              </span>
              {step < stepLabels.length ? (
                <span className="hidden h-px w-4 bg-line sm:block" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function StepShell({
  step,
  titleKo,
  descriptionKo,
  backHref,
  children,
}: {
  step: number;
  titleKo: string;
  descriptionKo: string;
  backHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`step-${step}-title`} className="rounded-card border border-line bg-white p-5 sm:p-8">
      <p className="font-tech text-xs font-semibold uppercase tracking-wide text-lab-blue">
        STEP {step} / 6
      </p>
      <h2 id={`step-${step}-title`} className="mt-2 text-xl font-bold text-graphite sm:text-2xl">
        {titleKo}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{descriptionKo}</p>
      <div className="mt-6">{children}</div>
      {backHref ? (
        <p className="mt-6 border-t border-line pt-4">
          <Link href={backHref} className="text-sm font-medium text-muted underline underline-offset-4">
            이전 단계로 돌아가기
          </Link>
        </p>
      ) : null}
    </section>
  );
}

/** 선택지 버튼 — form 의 submit 버튼이므로 JavaScript 없이 동작합니다. */
export function OptionButton({
  name,
  value,
  titleKo,
  descriptionKo,
  selected,
  children,
}: {
  name: string;
  value: string;
  titleKo: string;
  descriptionKo?: string;
  selected?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors',
        selected
          ? 'border-lab-blue bg-lab-blue/[0.04]'
          : 'border-line bg-white hover:border-lab-blue/40 hover:bg-surface',
      )}
    >
      {children}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-graphite">{titleKo}</span>
        {descriptionKo ? <span className="mt-1 block text-xs text-muted">{descriptionKo}</span> : null}
      </span>
    </button>
  );
}

/** 이전 단계 선택값을 다음 요청으로 전달하기 위한 hidden 필드 */
export function HiddenState({ entries }: { entries: [string, string][] }) {
  return (
    <>
      {entries.map(([key, value], index) => (
        <input key={`${key}-${value}-${index}`} type="hidden" name={key} value={value} />
      ))}
    </>
  );
}
