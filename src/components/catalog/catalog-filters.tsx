import Link from 'next/link';

import { FilterAutoSubmit } from '@/components/catalog/filter-auto-submit';
import { Button } from '@/components/ui/button';
import { CheckboxField } from '@/components/ui/checkbox';
import {
  categories,
  colorLabels,
  connectors,
  directionLabels,
  shieldingLabels,
} from '@/lib/data/taxonomy';
import {
  dataRateBuckets,
  lengthBuckets,
  refreshBuckets,
  resolutionBuckets,
  standardOptions,
  type CatalogFilterState,
} from '@/lib/filters';

const FORM_ID = 'catalog-filters';

function Group({ titleKo, children }: { titleKo: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-bold text-graphite">{titleKo}</legend>
      <div className="space-y-2.5">{children}</div>
    </fieldset>
  );
}

export function CatalogFilters({ state, resultCount }: { state: CatalogFilterState; resultCount: number }) {
  return (
    <form id={FORM_ID} method="get" action="/products" className="space-y-1">
      <FilterAutoSubmit formId={FORM_ID} />

      <div className="flex items-center justify-between gap-3 pb-3">
        <h2 className="text-base font-bold text-graphite">필터</h2>
        <Link href="/products" className="text-sm font-medium text-muted underline underline-offset-4">
          초기화
        </Link>
      </div>

      <Group titleKo="카테고리">
        {categories.map((category) => (
          <CheckboxField
            key={category.id}
            id={`cat-${category.id}`}
            name="category"
            value={category.id}
            defaultChecked={state.category.includes(category.id)}
          >
            {category.nameKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="입력 단자">
        {connectors.map((connector) => (
          <CheckboxField
            key={connector.id}
            id={`in-${connector.id}`}
            name="input"
            value={connector.id}
            defaultChecked={state.input.includes(connector.id)}
          >
            {connector.shortKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="출력 단자">
        {connectors.map((connector) => (
          <CheckboxField
            key={connector.id}
            id={`out-${connector.id}`}
            name="output"
            value={connector.id}
            defaultChecked={state.output.includes(connector.id)}
          >
            {connector.shortKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="전송 방향">
        {(['bidirectional', 'unidirectional'] as const).map((direction) => (
          <CheckboxField
            key={direction}
            id={`dir-${direction}`}
            name="direction"
            value={direction}
            defaultChecked={state.direction.includes(direction)}
          >
            {directionLabels[direction]}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="규격 버전">
        {standardOptions.map((standard) => (
          <CheckboxField
            key={standard}
            id={`std-${standard.replace(/[^a-zA-Z0-9]/g, '-')}`}
            name="standard"
            value={standard}
            defaultChecked={state.standard.includes(standard)}
          >
            <span className="font-tech">{standard}</span>
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="해상도">
        {resolutionBuckets.map((bucket) => (
          <CheckboxField
            key={bucket.id}
            id={`res-${bucket.id}`}
            name="resolution"
            value={bucket.id}
            defaultChecked={state.resolution.includes(bucket.id)}
          >
            {bucket.labelKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="주사율">
        {refreshBuckets.map((bucket) => (
          <CheckboxField
            key={bucket.id}
            id={`hz-${bucket.id}`}
            name="refresh"
            value={bucket.id}
            defaultChecked={state.refresh.includes(bucket.id)}
          >
            {bucket.labelKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="전송 속도">
        {dataRateBuckets.map((bucket) => (
          <CheckboxField
            key={bucket.id}
            id={`rate-${bucket.id}`}
            name="dataRate"
            value={bucket.id}
            defaultChecked={state.dataRate.includes(bucket.id)}
          >
            {bucket.labelKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="길이">
        {lengthBuckets.map((bucket) => (
          <CheckboxField
            key={bucket.id}
            id={`len-${bucket.id}`}
            name="length"
            value={bucket.id}
            defaultChecked={state.length.includes(bucket.id)}
          >
            {bucket.labelKo}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="색상">
        {(Object.keys(colorLabels) as (keyof typeof colorLabels)[]).map((color) => (
          <CheckboxField
            key={color}
            id={`color-${color}`}
            name="color"
            value={color}
            defaultChecked={state.color.includes(color)}
          >
            {colorLabels[color]}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="LAN 차폐">
        {(Object.keys(shieldingLabels) as (keyof typeof shieldingLabels)[]).map((shielding) => (
          <CheckboxField
            key={shielding}
            id={`shield-${shielding}`}
            name="shielding"
            value={shielding}
            defaultChecked={state.shielding.includes(shielding)}
          >
            {shieldingLabels[shielding]}
          </CheckboxField>
        ))}
      </Group>

      <Group titleKo="기타">
        <CheckboxField id="dex" name="dex" value="1" defaultChecked={state.dex}>
          삼성 DeX 지원
        </CheckboxField>
      </Group>

      <div className="sticky bottom-0 -mx-1 border-t border-line bg-white/95 px-1 pb-1 pt-3 backdrop-blur">
        <Button type="submit" className="w-full">
          필터 적용 ({resultCount})
        </Button>
      </div>
    </form>
  );
}
