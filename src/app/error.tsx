'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(observability): 오류 리포팅 도구(Sentry 등) 연동
    console.error(error);
  }, [error]);

  return (
    <div className="container-lab flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold text-graphite sm:text-3xl">일시적인 오류가 발생했습니다</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        페이지를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.
      </p>
      {error.digest ? <p className="font-tech mt-3 text-xs text-muted">오류 코드: {error.digest}</p> : null}
      <Button type="button" onClick={reset} className="mt-8">
        <RotateCcw aria-hidden="true" />
        다시 시도
      </Button>
    </div>
  );
}
