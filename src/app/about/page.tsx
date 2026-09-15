import { Layers, Microscope, MessagesSquare, Ruler } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ConnectionDiagram } from '@/components/product/connection-diagram';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '브랜드 소개',
  description:
    '케이블연구소는 연결 규격을 기준으로 제품을 정리하고, 안 되는 경우를 먼저 알려 드리는 브랜드입니다.',
  path: '/about',
});

const principles = [
  {
    icon: Ruler,
    titleKo: '규격을 기준으로 말합니다',
    bodyKo:
      '"고급", "프리미엄" 같은 표현 대신 대역폭, 해상도, 주사율, 전송 속도처럼 검증할 수 있는 수치로 설명합니다.',
  },
  {
    icon: Layers,
    titleKo: '구조를 먼저 보여 드립니다',
    bodyKo:
      '어떤 기기에서 어떤 기기로 신호가 흐르는지 도식으로 확인한 뒤 제품을 고를 수 있도록 구성했습니다.',
  },
  {
    icon: Microscope,
    titleKo: '제약을 숨기지 않습니다',
    bodyKo:
      '단방향 제한, DP Alt Mode 미지원, 포트 규격에 따른 성능 제한을 상세 페이지 상단에 먼저 배치합니다.',
  },
  {
    icon: MessagesSquare,
    titleKo: '질문을 자산으로 씁니다',
    bodyKo:
      '고객 문의에서 반복되는 혼선을 가이드 문서로 정리해, 같은 문제가 되풀이되지 않도록 합니다.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '브랜드 소개', path: '/about' },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-14 sm:py-20">
          <p className="font-tech text-xs font-semibold uppercase tracking-wide text-lab-blue">ABOUT</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-graphite sm:text-4xl lg:text-5xl">
            연결의 기준을 연구합니다.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
            케이블은 겉보기에 모두 비슷합니다. 그러나 같은 모양의 단자라도 지원하는 규격이 다르고, 같은
            규격이라도 연결된 기기에 따라 결과가 달라집니다. 케이블연구소는 이 차이를 사용자가 직접 확인할 수
            있도록 정리하는 일을 합니다.
          </p>
        </div>
      </div>

      <section aria-labelledby="principles-title" className="container-lab py-14 sm:py-20">
        <h2 id="principles-title" className="text-2xl font-bold text-graphite sm:text-3xl">
          우리가 일하는 방식
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <li key={principle.titleKo} className="rounded-card border border-line bg-white p-6">
                <span className="flex size-11 items-center justify-center rounded-lg bg-lab-blue/10">
                  <Icon className="size-5 text-lab-blue" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-graphite">{principle.titleKo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.bodyKo}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="how-title" className="border-y border-line bg-white py-14 sm:py-20">
        <div className="container-lab grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="how-title" className="text-2xl font-bold text-graphite sm:text-3xl">
              복잡한 연결, 케이블연구소가 답을 찾습니다.
            </h2>
            <p className="mt-4 text-base leading-[1.8] text-muted">
              대부분의 연결 문제는 케이블 품질이 아니라 구조에서 발생합니다. 출력과 입력의 방향이 반대이거나,
              포트가 해당 기능을 지원하지 않거나, 두 기기의 규격이 서로 다른 경우입니다. 그래서 저희는 제품을
              나열하기 전에 연결 구조부터 보여 드립니다.
            </p>
            <Button asChild className="mt-6">
              <Link href="/finder">연결 조건 입력하기</Link>
            </Button>
          </div>

          <ConnectionDiagram
            input="usb-c"
            output="hdmi"
            direction="unidirectional"
            sourceLabelKo="노트북"
            targetLabelKo="모니터"
            standard="DP Alt Mode → HDMI 2.0"
          />
        </div>
      </section>

      <section aria-labelledby="notice-title" className="container-lab py-14 sm:py-20">
        <div className="rounded-card border border-line bg-white p-6 sm:p-8">
          <h2 id="notice-title" className="text-lg font-bold text-graphite">
            공식 정보 안내
          </h2>
          {/* TODO(legal): 법인명, 설립 연도, 사업자등록번호, 주소, 인증 현황, 품질 정책을 확정 후 기재 */}
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            회사 정보, 인증 현황, 품질 관리 기준 등 공식 자료는 확정되는 대로 이 영역에 게시할 예정입니다.
            현재 사이트에 표시된 제품 데이터는 구조와 기능을 보여 주기 위한 데모 데이터입니다.
          </p>
        </div>
      </section>
    </>
  );
}
