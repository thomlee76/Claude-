import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/** MDX 본문에 적용되는 타이포그래피. Tailwind typography 플러그인 대신 직접 지정합니다. */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-12 scroll-mt-24 border-t border-line pt-8 text-xl font-bold text-graphite sm:text-2xl" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 text-lg font-bold text-graphite" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-[1.8] text-graphite/90" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-[1.8] text-graphite/90" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-[1.8] text-graphite/90" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-bold text-graphite" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-lab-blue bg-surface py-3 pl-4 pr-3 text-base italic text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-tech rounded bg-surface px-1.5 py-0.5 text-[0.9em] text-graphite" {...props} />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto rounded-card border border-line bg-white">
      <table className="w-full min-w-[32rem] border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface" {...props} />,
  th: (props) => (
    <th className="border-b border-line px-4 py-3 text-left font-semibold text-graphite" {...props} />
  ),
  td: (props) => <td className="border-b border-line px-4 py-3 align-top text-graphite/90" {...props} />,
  a: ({ href, children, ...props }) => {
    const target = href ?? '#';
    if (target.startsWith('/')) {
      return (
        <Link href={target} className="font-semibold text-lab-blue underline underline-offset-4">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-lab-blue underline underline-offset-4"
        {...props}
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="mt-10 border-0 border-t border-line" />,
};
