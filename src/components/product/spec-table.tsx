import type { SpecRow } from '@/lib/types';
import { cn } from '@/lib/utils';

export function SpecTable({ rows, caption }: { rows: SpecRow[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white">
      <table className="w-full min-w-[20rem] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.labelKo}
              className={cn('border-b border-line last:border-0', index % 2 === 1 && 'bg-surface/60')}
            >
              <th scope="row" className="w-2/5 px-4 py-3 text-left align-top font-medium text-muted">
                {row.labelKo}
              </th>
              <td className={cn('px-4 py-3 text-graphite', row.tech && 'font-tech')}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
