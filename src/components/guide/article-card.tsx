import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { GuideArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ArticleCard({ article, className }: { article: GuideArticle; className?: string }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col gap-3 rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-card-hover sm:p-6',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {article.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="blue">
            {tag}
          </Badge>
        ))}
      </div>

      <h3 className="text-base font-bold leading-snug text-graphite sm:text-lg">
        <Link href={`/guide/${article.slug}`} className="after:absolute after:inset-0">
          {article.titleKo}
        </Link>
      </h3>

      <p className="text-sm leading-relaxed text-muted">{article.summaryKo}</p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <p className="font-tech inline-flex items-center gap-1.5 text-xs text-muted">
          <Clock className="size-3.5" aria-hidden="true" />
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          <span aria-hidden="true">·</span>
          {article.readingMinutes}분
        </p>
        <ArrowRight
          className="size-4 text-lab-blue transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
