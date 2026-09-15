import { Boxes, FileText, Headset, Truck } from 'lucide-react';
import type { Metadata } from 'next';

import { InquiryForm } from '@/components/business/inquiry-form';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { getProductBySlug } from '@/lib/data/products';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '기업 구매',
  description:
    '사무실, 회의실, 산업 현장 등 다량 구매와 주문 제작 문의를 받습니다. 사용 환경과 수량을 알려 주시면 규격 검토 후 견적을 제안해 드립니다.',
  path: '/business',
  keywords: ['케이블 대량구매', 'B2B 케이블', '기업 견적', '케이블 납품'],
});

const benefits = [
  { icon: Boxes, titleKo: '수량별 견적', bodyKo: '필요 수량과 길이 구성에 맞춰 견적을 산출합니다.' },
  { icon: FileText, titleKo: '규격 검토', bodyKo: '설치 환경을 확인해 적합한 규격을 먼저 제안합니다.' },
  { icon: Truck, titleKo: '납기 협의', bodyKo: '일정에 맞춰 분할 납품과 입고 일정을 협의합니다.' },
  { icon: Headset, titleKo: '담당자 배정', bodyKo: '접수 후 담당자가 직접 연락드려 상담을 진행합니다.' },
];

export default async function BusinessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const productSlug = typeof params['product'] === 'string' ? params['product'] : undefined;
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  const topic = typeof params['topic'] === 'string' ? params['topic'] : undefined;
  const defaultProductType = product?.category ?? (topic === 'custom' ? 'custom' : undefined);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '기업 구매', path: '/business' },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold text-graphite sm:text-4xl">기업 구매 문의</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            사무실 이전, 회의실 구축, 공장 설비, 관공서 납품 등 다량 구매와 주문 제작 문의를 받습니다. 사용
            환경과 필요 수량을 알려 주시면 규격 검토 후 견적을 제안해 드립니다.
          </p>
          {product ? (
            <p className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-graphite">
              문의 대상 제품:
              <strong className="font-semibold">{product.nameKo}</strong>
              <span className="font-tech text-muted">{product.modelCode}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-lab grid gap-10 py-10 lg:grid-cols-[1fr_20rem] lg:gap-14 lg:py-14">
        <div className="min-w-0">
          <noscript>
            <div className="mb-5 rounded-lg border border-warning/30 bg-warning-soft p-4 text-sm leading-relaxed text-graphite">
              문의 양식은 JavaScript 가 필요합니다. 브라우저 설정에서 JavaScript 를 허용하시거나, 네이버
              스마트스토어의 문의하기를 이용해 주십시오.
            </div>
          </noscript>
          <InquiryForm {...(defaultProductType ? { defaultProductType } : {})} />
        </div>

        <aside aria-labelledby="benefit-title" className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-card border border-line bg-white p-5 sm:p-6">
            <h2 id="benefit-title" className="text-base font-bold text-graphite">
              기업 구매 진행 방식
            </h2>
            <ul className="mt-5 space-y-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <li key={benefit.titleKo} className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-lab-blue/10">
                      <Icon className="size-4 text-lab-blue" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-graphite">{benefit.titleKo}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{benefit.bodyKo}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* TODO(content): 실제 기업 구매 담당 연락처와 운영 시간 기재 */}
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              담당자 직통 연락처와 상담 가능 시간은 확정 후 안내드립니다.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
