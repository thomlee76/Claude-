import { Skeleton } from '@/components/ui/skeleton';

export default function RootLoading() {
  return (
    <div className="container-lab py-20" aria-busy="true" aria-live="polite">
      <span className="sr-only">페이지를 불러오는 중입니다</span>
      <Skeleton className="h-12 w-3/4 max-w-xl" />
      <Skeleton className="mt-5 h-5 w-full max-w-2xl" />
      <Skeleton className="mt-3 h-5 w-2/3 max-w-xl" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-72 w-full" />
        ))}
      </div>
    </div>
  );
}
