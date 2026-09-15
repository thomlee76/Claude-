import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { tasks } from '@/lib/data/taxonomy';

/** 사용자가 "무엇을 하려는지"에서 시작하도록 유도하는 진입 블록입니다. */
export function TaskPicker() {
  return (
    <section className="container-lab py-14 sm:py-20" aria-labelledby="task-title">
      <div className="max-w-2xl">
        <h2 id="task-title" className="text-2xl font-bold text-graphite sm:text-3xl">
          무엇을 연결하려고 하시나요?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          규격 이름을 몰라도 괜찮습니다. 목적을 선택하면 필요한 조건부터 정리해 드립니다.
        </p>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <Link
              href={`/finder?task=${task.id}`}
              className="group flex h-full items-start justify-between gap-4 rounded-card border border-line bg-white p-5 transition-colors hover:border-lab-blue/40 hover:bg-lab-blue/[0.03]"
            >
              <span className="min-w-0">
                <span className="block text-base font-bold text-graphite">{task.nameKo}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                  {task.descriptionKo}
                </span>
              </span>
              <ArrowRight
                className="mt-0.5 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-lab-blue"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
