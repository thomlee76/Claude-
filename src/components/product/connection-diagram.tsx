import { ConnectorIcon } from '@/components/icons/connectors';
import { connectorMap } from '@/lib/data/taxonomy';
import type { ConnectorId, SignalDirection } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * "기기 → 케이블 → 기기" 연결 구조를 보여 주는 도식.
 * 신호 전달은 SVG dash 애니메이션으로 표현하며, prefers-reduced-motion 을 존중합니다.
 */
export function ConnectionDiagram({
  input,
  output,
  direction,
  sourceLabelKo = '출력 기기',
  targetLabelKo = '입력 기기',
  standard,
  className,
}: {
  input: ConnectorId;
  output: ConnectorId;
  direction: SignalDirection;
  sourceLabelKo?: string;
  targetLabelKo?: string;
  standard?: string;
  className?: string;
}) {
  const inputName = connectorMap.get(input)?.shortKo ?? input;
  const outputName = connectorMap.get(output)?.shortKo ?? output;
  const directionText =
    direction === 'bidirectional'
      ? '양방향 — 어느 쪽으로 연결해도 동작합니다'
      : `단방향 — ${inputName}(출력)에서 ${outputName}(입력) 방향으로만 동작합니다`;

  return (
    <figure className={cn('rounded-card border border-line bg-white p-5 sm:p-7', className)}>
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <DeviceNode labelKo={sourceLabelKo} connector={input} connectorName={inputName} role="출력" />

        <div className="flex flex-col items-center gap-2 py-2">
          <svg
            viewBox="0 0 120 24"
            className="h-6 w-28 sm:w-32"
            role="img"
            aria-label={directionText}
          >
            <line x1="4" y1="12" x2="116" y2="12" stroke="var(--color-line)" strokeWidth="3" strokeLinecap="round" />
            <line
              x1="4"
              y1="12"
              x2="116"
              y2="12"
              stroke="var(--color-cyan-electric)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 36"
              className="animate-signal"
            />
            {direction === 'bidirectional' ? (
              <>
                <path d="M12 7 5 12l7 5" fill="none" stroke="var(--color-lab-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M108 7l7 5-7 5" fill="none" stroke="var(--color-lab-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <path d="M108 7l7 5-7 5" fill="none" stroke="var(--color-lab-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
          <span className="rounded-md bg-surface px-2 py-1 text-center text-xs font-medium text-muted">
            {standard ?? (direction === 'bidirectional' ? '양방향' : '단방향')}
          </span>
        </div>

        <DeviceNode labelKo={targetLabelKo} connector={output} connectorName={outputName} role="입력" />
      </div>
      <figcaption className="mt-5 border-t border-line pt-4 text-sm text-muted">
        {directionText}
      </figcaption>
    </figure>
  );
}

function DeviceNode({
  labelKo,
  connector,
  connectorName,
  role,
}: {
  labelKo: string;
  connector: ConnectorId;
  connectorName: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 sm:flex-col sm:gap-2 sm:text-center">
      <ConnectorIcon connector={connector} className="h-7 w-10 shrink-0 text-lab-blue" />
      <div className="min-w-0">
        <p className="font-tech text-sm font-semibold text-graphite">{connectorName}</p>
        <p className="text-xs text-muted">
          {labelKo} · {role}
        </p>
      </div>
    </div>
  );
}
