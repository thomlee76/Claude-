import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container-lab flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-tech text-sm font-semibold text-lab-blue">404</p>
      <h1 className="mt-3 text-2xl font-bold text-graphite sm:text-3xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        주소가 변경되었거나 삭제된 페이지입니다. 아래 경로에서 다시 찾아보십시오.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/products">전체 제품 보기</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/finder">케이블 찾기</Link>
        </Button>
      </div>
    </div>
  );
}
