import { ArrowRight, Mail, MessageSquare, Package } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { NAVER_STORE_URL } from '@/lib/navigation';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '고객지원',
  description:
    '연결이 되지 않을 때 확인할 사항, 자주 묻는 질문, 주문·교환·문의 경로를 안내합니다.',
  path: '/support',
  keywords: ['케이블 문의', '화면 안나옴', '케이블 교환', '고객지원'],
});

const faqs = [
  {
    q: '케이블을 연결했는데 화면이 나오지 않습니다.',
    a: '먼저 전송 방향을 확인하십시오. 변환 케이블은 대부분 단방향이라 반대로 연결하면 동작하지 않습니다. 다음으로 노트북·스마트폰의 USB-C 포트가 DP Alt Mode(영상 출력)를 지원하는지 확인하고, 디스플레이의 입력 소스가 해당 단자로 선택되어 있는지 확인하십시오.',
  },
  {
    q: '4K인데 60Hz가 아니라 30Hz로만 나옵니다.',
    a: '출력 기기, 케이블, 디스플레이 중 하나가 HDMI 1.4급이면 4K는 30Hz로 제한됩니다. 세 요소의 규격을 모두 확인하십시오. TV는 포트마다 지원 규격이 다를 수 있습니다.',
  },
  {
    q: 'HDMI 2.1 케이블로 바꾸면 화질이 좋아지나요?',
    a: '케이블은 신호를 전달할 뿐 생성하지 않습니다. 최종 성능은 출력 기기, 케이블, 디스플레이 중 가장 낮은 규격에 맞춰집니다. 다만 규격 미달 케이블을 쓰고 있었다면 개선 효과가 있습니다.',
  },
  {
    q: 'CAT.8 랜케이블을 쓰면 인터넷이 빨라지나요?',
    a: '실제 속도는 가입한 회선, 공유기, 랜카드 성능에 따라 결정됩니다. 가정용 1Gbps 환경에서는 CAT.6로도 충분합니다. 다만 노후된 CAT.5 케이블을 쓰고 있었다면 교체 효과가 있습니다.',
  },
  {
    q: 'DVI나 VGA로 연결했는데 소리가 나지 않습니다.',
    a: 'DVI와 VGA 규격에는 음성 신호가 포함되지 않습니다. 정상 동작입니다. 3.5mm 오디오 케이블이나 별도 스피커 연결이 필요합니다.',
  },
  {
    q: '주문·배송·교환은 어디에서 확인하나요?',
    a: '현재 소매 판매는 네이버 스마트스토어에서 진행되며, 주문 조회와 교환·반품 접수도 스토어의 구매 내역에서 처리하실 수 있습니다.',
  },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '고객지원', path: '/support' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold text-graphite sm:text-4xl">고객지원</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            연결이 되지 않을 때 대부분의 원인은 케이블 불량이 아니라 방향 또는 규격 불일치입니다. 아래 순서로
            먼저 확인해 보십시오.
          </p>
        </div>
      </div>

      <div className="container-lab grid gap-10 py-10 lg:grid-cols-[1fr_20rem] lg:gap-14 lg:py-14">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="checklist-title">
            <h2 id="checklist-title" className="text-xl font-bold text-graphite sm:text-2xl">
              연결 문제 점검 순서
            </h2>
            <ol className="mt-5 space-y-3">
              {[
                '케이블의 전송 방향이 내 구성과 일치하는지 확인합니다. (출력 → 입력)',
                '기기의 포트가 해당 기능을 지원하는지 사양표에서 확인합니다. (특히 USB-C의 DP Alt Mode)',
                '디스플레이의 입력 소스를 연결한 단자로 변경합니다.',
                '해상도·주사율 설정을 한 단계 낮춰 화면이 나오는지 확인합니다.',
                '다른 포트 또는 다른 기기에 연결해 원인을 좁힙니다.',
              ].map((step, index) => (
                <li key={step} className="flex gap-3 rounded-lg border border-line bg-white p-4">
                  <span className="font-tech flex size-6 shrink-0 items-center justify-center rounded-full bg-lab-blue text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-graphite">{step}</p>
                </li>
              ))}
            </ol>

            <Alert level="caution" className="mt-5" title="최대 성능은 포트가 결정합니다">
              케이블이 지원하는 최대 해상도·주사율·속도는 연결된 두 기기의 포트 규격에 따라 달라집니다. 한쪽이
              낮은 규격이면 그 규격에 맞춰 동작합니다.
            </Alert>
          </section>

          <section aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-xl font-bold text-graphite sm:text-2xl">
              자주 묻는 질문
            </h2>
            <div className="mt-5 rounded-card border border-line bg-white px-5 sm:px-6">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <noscript>
              <div className="mt-5 space-y-4 rounded-card border border-line bg-white p-5">
                {faqs.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="text-sm font-bold text-graphite">{faq.q}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </noscript>
          </section>
        </div>

        <aside aria-labelledby="contact-title" className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-card border border-line bg-white p-5 sm:p-6">
            <h2 id="contact-title" className="text-base font-bold text-graphite">
              문의 경로
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <Package className="mt-0.5 size-4 shrink-0 text-lab-blue" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-graphite">주문·배송·교환</p>
                  <a
                    href={NAVER_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm text-[#03C75A] underline underline-offset-4"
                  >
                    네이버 스마트스토어 문의
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MessageSquare className="mt-0.5 size-4 shrink-0 text-lab-blue" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-graphite">호환성 상담</p>
                  <Link href="/finder" className="mt-1 inline-flex items-center gap-1 text-sm text-lab-blue">
                    케이블 찾기 이용
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-lab-blue" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-graphite">기업·대량 구매</p>
                  <Link href="/business" className="mt-1 inline-flex items-center gap-1 text-sm text-lab-blue">
                    견적 문의하기
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            </ul>
            {/* TODO(content): 고객센터 전화번호, 운영 시간, 대표 이메일 기재 */}
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              고객센터 전화번호와 운영 시간은 확정 후 안내드립니다.
            </p>
            <Button asChild variant="secondary" className="mt-5 w-full">
              <Link href="/guide">케이블 가이드 보기</Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
