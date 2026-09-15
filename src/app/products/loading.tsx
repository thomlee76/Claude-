import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <div className="container-lab py-14" aria-busy="true" aria-live="polite">
      <span className="sr-only">제품 목록을 불러오는 중입니다</span>
      <Skeleton className="h-10 w-56" />
      <Skeleton className="mt-4 h-5 w-full max-w-lg" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <Skeleton className="hidden h-[32rem] w-full lg:block" />
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <li key={index}>
              <Skeleton className="h-80 w-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
