import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import type * as React from 'react';

import type { WarningLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

const styles: Record<WarningLevel, { box: string; icon: React.ElementType; iconClass: string; labelKo: string }> =
  {
    critical: {
      box: 'border-danger/30 bg-danger-soft',
      icon: ShieldAlert,
      iconClass: 'text-danger',
      labelKo: '반드시 확인',
    },
    caution: {
      box: 'border-warning/30 bg-warning-soft',
      icon: AlertTriangle,
      iconClass: 'text-warning',
      labelKo: '확인 필요',
    },
    info: {
      box: 'border-line bg-surface',
      icon: Info,
      iconClass: 'text-muted',
      labelKo: '참고',
    },
  };

export function Alert({
  level = 'info',
  title,
  children,
  className,
}: {
  level?: WarningLevel;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const style = styles[level];
  const Icon = style.icon;
  return (
    <div className={cn('flex gap-3 rounded-lg border p-4', style.box, className)}>
      <Icon className={cn('mt-0.5 size-5 shrink-0', style.iconClass)} aria-hidden="true" />
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-bold text-graphite">{title ?? style.labelKo}</p>
        <div className="text-sm leading-relaxed text-graphite/85">{children}</div>
      </div>
    </div>
  );
}
