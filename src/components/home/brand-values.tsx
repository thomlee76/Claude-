import { ClipboardCheck, Ruler, ShieldCheck, Workflow } from 'lucide-react';

const values = [
  {
    icon: Ruler,
    titleKo: '규격 단위로 검증합니다',
    bodyKo:
      '해상도·주사율·대역폭을 제품 설명이 아니라 표준 규격 기준으로 정리해 표기합니다.',
  },
  {
    icon: Workflow,
    titleKo: '연결 구조를 먼저 보여 드립니다',
    bodyKo:
      '어떤 기기에서 어떤 기기로 신호가 가는지 도식으로 확인한 뒤 제품을 고를 수 있습니다.',
  },
  {
    icon: ShieldCheck,
    titleKo: '안 되는 경우를 먼저 말합니다',
    bodyKo:
      '단방향 제한, DP Alt Mode 미지원, 포트 규격에 따른 성능 제한을 구매 전에 안내합니다.',
  },
  {
    icon: ClipboardCheck,
    titleKo: '기업 환경도 같은 기준으로',
    bodyKo:
      '사무실·회의실·산업 현장 구성도 동일한 규격 기준으로 검토해 견적을 제안합니다.',
  },
];

export function BrandValues() {
  return (
    <section className="border-y border-line bg-graphite py-14 text-white sm:py-20" aria-labelledby="values-title">
      <div className="container-lab">
        <div className="max-w-2xl">
          <h2 id="values-title" className="text-2xl font-bold sm:text-3xl">
            복잡한 연결, 케이블연구소가 답을 찾습니다.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            제품을 파는 방식이 아니라, 문제를 정의하고 해결하는 방식으로 접근합니다.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li key={value.titleKo} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="size-5 text-cyan-electric" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold">{value.titleKo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{value.bodyKo}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
