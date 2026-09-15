import * as React from 'react';

import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  function Input({ className, type = 'text', ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-graphite',
          'placeholder:text-muted/70 focus-visible:border-lab-blue',
          'aria-[invalid=true]:border-danger',
          'disabled:cursor-not-allowed disabled:bg-surface',
          className,
        )}
        {...props}
      />
    );
  },
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-32 w-full rounded-lg border border-line bg-white p-3 text-sm leading-relaxed text-graphite',
          'placeholder:text-muted/70 focus-visible:border-lab-blue aria-[invalid=true]:border-danger',
          className,
        )}
        {...props}
      />
    );
  },
);

export const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<'select'>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          'h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-graphite',
          'focus-visible:border-lab-blue aria-[invalid=true]:border-danger',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
