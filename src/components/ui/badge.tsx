import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        neutral: 'bg-surface text-muted border border-line',
        blue: 'bg-lab-blue/10 text-lab-blue',
        cyan: 'bg-cyan-electric/15 text-[#0c6ea8]',
        compatible: 'bg-compatible-soft text-[#067647]',
        warning: 'bg-warning-soft text-[#b54708]',
        danger: 'bg-danger-soft text-[#b42318]',
        dark: 'bg-graphite text-white',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
