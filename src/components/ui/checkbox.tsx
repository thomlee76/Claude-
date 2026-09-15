import type * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * 네이티브 체크박스 기반 컴포넌트.
 * 필터와 폼이 JavaScript 없이도 동작해야 하므로 의도적으로 native input 을 사용합니다.
 */
export function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type="checkbox"
      className={cn(
        'size-4 shrink-0 cursor-pointer rounded border-line text-lab-blue accent-[#155eef]',
        className,
      )}
      {...props}
    />
  );
}

export function CheckboxField({
  id,
  name,
  value,
  defaultChecked,
  children,
}: {
  id: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} name={name} value={value} defaultChecked={defaultChecked} />
      <label htmlFor={id} className="cursor-pointer text-sm text-graphite">
        {children}
      </label>
    </div>
  );
}
