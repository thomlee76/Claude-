import { Alert } from '@/components/ui/alert';
import type { ProductWarning } from '@/lib/types';

const order = { critical: 0, caution: 1, info: 2 } as const;

export function WarningList({ warnings }: { warnings: ProductWarning[] }) {
  if (warnings.length === 0) return null;
  const sorted = [...warnings].sort((a, b) => order[a.level] - order[b.level]);
  return (
    <ul className="space-y-3">
      {sorted.map((warning) => (
        <li key={warning.textKo}>
          <Alert level={warning.level}>{warning.textKo}</Alert>
        </li>
      ))}
    </ul>
  );
}
