import type { Metadata } from 'next';
import Link from 'next/link';

import { ConnectorIcon } from '@/components/icons/connectors';
import { EmptyResult, ResultList } from '@/components/finder/result-list';
import { HiddenState, OptionButton, StepProgress, StepShell } from '@/components/finder/step-shell';
import { Button } from '@/components/ui/button';
import { CheckboxField } from '@/components/ui/checkbox';
import {
  connectorMap,
  connectors,
  deviceMap,
  devices,
  purposeDescriptions,
  purposeLabels,
  taskMap,
} from '@/lib/data/taxonomy';
import {
  buildFinderQuery,
  currentStep,
  findConnectorAlternatives,
  findMatches,
  lengthOptions,
  parseFinderState,
  requirementOptions,
  type FinderSearchParams,
  type FinderState,
} from '@/lib/finder';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';
import type { DeviceId, Purpose, TaskId } from '@/lib/types';

export const metadata: Metadata = pageMetadata({
  title: '케이블 찾기',
  description:
    '연결할 기기와 단자, 목적과 필요한 사양을 선택하면 호환되는 케이블만 추려서 보여 드립니다. 맞지 않는 제품은 추천하지 않습니다.',
  path: '/finder',
  keywords: ['케이블 추천', '케이블 호환', 'HDMI 호환', 'USB-C 모니터 연결'],
});

/** 상태를 hidden 필드용 [key, value] 배열로 변환 */
function stateEntries(state: FinderState, until: number): [string, string][] {
  const entries: [string, string][] = [];
  if (until >= 1) state.devices.forEach((d) => entries.push(['device', d]));
  if (until >= 2 && state.source) entries.push(['source', state.source]);
  if (until >= 3 && state.target) entries.push(['target', state.target]);
  if (until >= 4 && state.purpose) entries.push(['purpose', state.purpose]);
  if (until >= 5) {
    state.requirements.forEach((r) => entries.push(['req', r]));
    if (state.requirementsSet) entries.push(['reqset', '1']);
  }
  return entries;
}

function hrefForStep(state: FinderState, step: number): string {
  const partial: Partial<FinderState> = {};
  if (step > 1) partial.devices = state.devices;
  if (step > 2) partial.source = state.source;
  if (step > 3) partial.target = state.target;
  if (step > 4) partial.purpose = state.purpose;
  if (step > 5) {
    partial.requirements = state.requirements;
    partial.requirementsSet = state.requirementsSet;
  }
  const query = buildFinderQuery(partial);
  return query ? `/finder?${query}` : '/finder';
}

export default async function FinderPage({
  searchParams,
}: {
  searchParams: Promise<FinderSearchParams>;
}) {
  const params = await searchParams;
  const state = parseFinderState(params);
  const step = currentStep(state);

  // 홈의 "무엇을 연결하나요?" 블록에서 넘어온 경우 목적을 미리 안내합니다.
  const taskParam = typeof params['task'] === 'string' ? (params['task'] as TaskId) : null;
  const task = taskParam ? taskMap.get(taskParam) : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '케이블 찾기', path: '/finder' },
        ])}
      />

      <div className="border-b border-line bg-white">
        <div className="container-lab py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold text-graphite sm:text-4xl">케이블 찾기</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            연결할 기기와 단자, 목적을 차례로 선택하시면 호환되는 제품만 추려 드립니다. 조건에 맞지 않는
            제품은 추천하지 않습니다.
          </p>
          {task ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-graphite">
              선택하신 목적: <strong className="font-semibold">{task.nameKo}</strong>
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-lab py-10 sm:py-14">
        <StepProgress current={step} />

        <div className="mt-8">
          {step === 1 ? <StepDevices state={state} /> : null}
          {step === 2 ? <StepSource state={state} /> : null}
          {step === 3 ? <StepTarget state={state} /> : null}
          {step === 4 ? <StepPurpose state={state} /> : null}
          {step === 5 ? <StepRequirements state={state} /> : null}
          {step === 6 ? <StepLength state={state} /> : null}
          {step === 7 ? <StepResults state={state} /> : null}
        </div>
      </div>
    </>
  );
}

function StepDevices({ state }: { state: FinderState }) {
  return (
    <StepShell
      step={1}
      titleKo="어떤 기기를 연결하시나요?"
      descriptionKo="연결에 사용하는 기기를 모두 선택하십시오. 두 개 이상 선택할 수 있습니다."
    >
      <form method="get" action="/finder" className="space-y-6">
        <fieldset>
          <legend className="sr-only">연결할 기기 선택</legend>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <div key={device.id} className="rounded-lg border border-line bg-white p-4">
                <CheckboxField
                  id={`device-${device.id}`}
                  name="device"
                  value={device.id}
                  defaultChecked={state.devices.includes(device.id as DeviceId)}
                >
                  <span className="font-semibold">{device.nameKo}</span>
                </CheckboxField>
              </div>
            ))}
          </div>
        </fieldset>
        <Button type="submit" size="lg">
          다음 단계
        </Button>
      </form>
    </StepShell>
  );
}

function StepSource({ state }: { state: FinderState }) {
  return (
    <StepShell
      step={2}
      titleKo="신호를 내보내는 단자를 선택하세요"
      descriptionKo="PC, 노트북, 콘솔처럼 화면이나 데이터를 내보내는 쪽의 단자입니다."
      backHref={hrefForStep(state, 1)}
    >
      <form method="get" action="/finder" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        <HiddenState entries={stateEntries(state, 1)} />
        {connectors.map((connector) => (
          <OptionButton
            key={connector.id}
            name="source"
            value={connector.id}
            titleKo={connector.shortKo}
            descriptionKo={connector.nameKo}
          >
            <ConnectorIcon connector={connector.id} className="h-7 w-10 shrink-0 text-lab-blue" />
          </OptionButton>
        ))}
      </form>
    </StepShell>
  );
}

function StepTarget({ state }: { state: FinderState }) {
  return (
    <StepShell
      step={3}
      titleKo="신호를 받는 단자를 선택하세요"
      descriptionKo="모니터, TV, 프로젝터처럼 화면을 표시하거나 데이터를 받는 쪽의 단자입니다."
      backHref={hrefForStep(state, 2)}
    >
      <form method="get" action="/finder" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        <HiddenState entries={stateEntries(state, 2)} />
        {connectors.map((connector) => (
          <OptionButton
            key={connector.id}
            name="target"
            value={connector.id}
            titleKo={connector.shortKo}
            descriptionKo={connector.nameKo}
          >
            <ConnectorIcon connector={connector.id} className="h-7 w-10 shrink-0 text-lab-blue" />
          </OptionButton>
        ))}
      </form>
    </StepShell>
  );
}

function StepPurpose({ state }: { state: FinderState }) {
  const purposes: Purpose[] = ['video', 'data', 'charging', 'network'];
  return (
    <StepShell
      step={4}
      titleKo="무엇을 하려고 하시나요?"
      descriptionKo="연결의 목적에 따라 필요한 규격이 달라집니다."
      backHref={hrefForStep(state, 3)}
    >
      <form method="get" action="/finder" className="grid gap-2.5 sm:grid-cols-2">
        <HiddenState entries={stateEntries(state, 3)} />
        {purposes.map((purpose) => (
          <OptionButton
            key={purpose}
            name="purpose"
            value={purpose}
            titleKo={purposeLabels[purpose]}
            descriptionKo={purposeDescriptions[purpose]}
          />
        ))}
      </form>
    </StepShell>
  );
}

function StepRequirements({ state }: { state: FinderState }) {
  const purpose = state.purpose ?? 'video';
  const options: ReadonlyArray<{ id: string; labelKo: string }> = requirementOptions[purpose];
  return (
    <StepShell
      step={5}
      titleKo="필요한 사양이 있으신가요?"
      descriptionKo="꼭 필요한 조건만 선택하십시오. 선택하지 않고 넘어가셔도 됩니다."
      backHref={hrefForStep(state, 4)}
    >
      <form method="get" action="/finder" className="space-y-6">
        <HiddenState entries={stateEntries(state, 4)} />
        <input type="hidden" name="reqset" value="1" />
        <fieldset>
          <legend className="sr-only">요구 사양 선택</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {options.map((option) => (
              <div key={option.id} className="rounded-lg border border-line bg-white p-4">
                <CheckboxField
                  id={`req-${option.id}`}
                  name="req"
                  value={option.id}
                  defaultChecked={state.requirements.includes(option.id)}
                >
                  <span className="font-semibold">{option.labelKo}</span>
                </CheckboxField>
              </div>
            ))}
          </div>
        </fieldset>
        <Button type="submit" size="lg">
          다음 단계
        </Button>
      </form>
    </StepShell>
  );
}

function StepLength({ state }: { state: FinderState }) {
  return (
    <StepShell
      step={6}
      titleKo="필요한 길이를 선택하세요"
      descriptionKo="설치 거리보다 조금 여유 있는 길이를 고르는 편이 안전합니다."
      backHref={hrefForStep(state, 5)}
    >
      <form method="get" action="/finder" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        <HiddenState entries={stateEntries(state, 5)} />
        {lengthOptions.map((option) => (
          <OptionButton key={option.id} name="length" value={option.id} titleKo={option.labelKo} />
        ))}
      </form>
    </StepShell>
  );
}

function StepResults({ state }: { state: FinderState }) {
  const matches = findMatches(state);
  const alternatives = findConnectorAlternatives(state).filter(
    (product) => !matches.some((m) => m.product.id === product.id),
  );

  return (
    <section aria-labelledby="result-title" className="space-y-6">
      <div className="rounded-card border border-line bg-white p-5 sm:p-6">
        <h2 id="result-title" className="text-xl font-bold text-graphite sm:text-2xl">
          추천 결과
        </h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <SelectionItem
            labelKo="기기"
            value={
              state.devices.length > 0
                ? state.devices.map((d) => deviceMap.get(d)?.nameKo ?? d).join(', ')
                : '-'
            }
          />
          <SelectionItem
            labelKo="출력 단자"
            value={state.source ? (connectorMap.get(state.source)?.shortKo ?? state.source) : '-'}
          />
          <SelectionItem
            labelKo="입력 단자"
            value={state.target ? (connectorMap.get(state.target)?.shortKo ?? state.target) : '-'}
          />
          <SelectionItem
            labelKo="목적"
            value={state.purpose ? purposeLabels[state.purpose] : '-'}
          />
        </dl>
        <p className="mt-5 border-t border-line pt-4">
          <Link href="/finder" className="text-sm font-medium text-muted underline underline-offset-4">
            처음부터 다시 선택하기
          </Link>
        </p>
      </div>

      {matches.length > 0 ? (
        <ResultList matches={matches} />
      ) : (
        <EmptyResult alternatives={alternatives} resetHref={hrefForStep(state, 4)} />
      )}
    </section>
  );
}

function SelectionItem({ labelKo, value }: { labelKo: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-2.5">
      <dt className="text-xs text-muted">{labelKo}</dt>
      <dd className="font-tech mt-0.5 text-sm font-semibold text-graphite">{value}</dd>
    </div>
  );
}
