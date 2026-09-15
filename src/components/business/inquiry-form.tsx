'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitBusinessInquiry, type InquiryState } from '@/app/business/actions';
import {
  businessInquirySchema,
  productTypeOptions,
  timelineOptions,
  type BusinessInquiryInput,
} from '@/lib/validation/business-inquiry';

type FormValues = BusinessInquiryInput;

export function InquiryForm({ defaultProductType }: { defaultProductType?: string }) {
  const [state, setState] = useState<InquiryState>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(businessInquirySchema),
    mode: 'onBlur',
    defaultValues: {
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      productType: (defaultProductType as FormValues['productType']) ?? 'hdmi',
      quantity: 100,
      timeline: 'within-1-month',
      message: '',
      website: '',
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined || value === null) continue;
      formData.append(key, String(value));
    }
    if (values.privacyConsent) formData.set('privacyConsent', 'on');

    const result = await submitBusinessInquiry({ status: 'idle' }, formData);
    setState(result);
    if (result.status === 'success') reset();
  }

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-card border border-compatible/30 bg-compatible-soft p-6 sm:p-8"
      >
        <CheckCircle2 className="size-8 text-compatible" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-bold text-graphite">문의가 접수되었습니다</h2>
        <p className="mt-2 text-sm leading-relaxed text-graphite/85">
          접수 번호는 <strong className="font-tech font-semibold">{state.referenceId}</strong> 입니다.
          영업일 기준 1~2일 이내에 담당자가 연락드립니다.
        </p>
        {/* TODO(integration): 실제 메일 발송 연동 전까지 접수 내용은 저장되지 않습니다. */}
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setState({ status: 'idle' })}
        >
          새 문의 작성
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-card border border-line bg-white p-5 sm:p-8"
    >
      {state.status === 'error' ? (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-danger/30 bg-danger-soft p-4 text-sm text-graphite"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
          <p>{state.message}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="companyName" labelKo="회사명" required error={errors.companyName?.message}>
          <Input
            id="companyName"
            autoComplete="organization"
            aria-invalid={Boolean(errors.companyName)}
            {...register('companyName')}
          />
        </Field>

        <Field id="contactName" labelKo="담당자명" required error={errors.contactName?.message}>
          <Input
            id="contactName"
            autoComplete="name"
            aria-invalid={Boolean(errors.contactName)}
            {...register('contactName')}
          />
        </Field>

        <Field id="phone" labelKo="연락처" required error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="02-0000-0000"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
        </Field>

        <Field id="email" labelKo="이메일" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>

        <Field id="productType" labelKo="제품 유형" required error={errors.productType?.message}>
          <Select id="productType" aria-invalid={Boolean(errors.productType)} {...register('productType')}>
            {productTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.labelKo}
              </option>
            ))}
          </Select>
        </Field>

        <Field id="quantity" labelKo="수량" required error={errors.quantity?.message}>
          <Input
            id="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            aria-invalid={Boolean(errors.quantity)}
            {...register('quantity')}
          />
        </Field>

        <Field id="timeline" labelKo="필요 일정" required error={errors.timeline?.message}>
          <Select id="timeline" aria-invalid={Boolean(errors.timeline)} {...register('timeline')}>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.labelKo}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field id="message" labelKo="문의 내용" required error={errors.message?.message}>
        <Textarea
          id="message"
          placeholder="사용 환경, 필요한 규격과 길이, 납품 조건 등을 적어 주시면 더 정확하게 안내해 드립니다."
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
      </Field>

      {/* 허니팟 — 사용자에게 노출되지 않습니다 */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div>
        <div className="flex items-start gap-2.5">
          <input
            id="privacyConsent"
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-[#155eef]"
            aria-invalid={Boolean(errors.privacyConsent)}
            {...register('privacyConsent')}
          />
          <label htmlFor="privacyConsent" className="text-sm leading-relaxed text-graphite">
            개인정보 수집 및 이용에 동의합니다. <span className="text-danger">*</span>
            <span className="mt-1 block text-xs text-muted">
              {/* TODO(legal): 개인정보 처리방침 페이지 링크 및 보유 기간 명시 */}
              수집 항목: 회사명, 담당자명, 연락처, 이메일. 이용 목적: 견적 및 구매 상담 회신.
            </span>
          </label>
        </div>
        {errors.privacyConsent ? (
          <p className="mt-2 text-sm text-danger" role="alert">
            {errors.privacyConsent.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            전송 중입니다
          </>
        ) : (
          '문의 보내기'
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  labelKo,
  required,
  error,
  children,
}: {
  id: string;
  labelKo: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {labelKo}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
