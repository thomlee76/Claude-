'use client';

import { useEffect } from 'react';

/**
 * 점진적 향상: JavaScript 가 있으면 필터 변경 즉시 폼을 제출합니다.
 * JavaScript 가 없어도 "필터 적용" 버튼으로 동일하게 동작합니다.
 */
export function FilterAutoSubmit({ formId }: { formId: string }) {
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) return;

    function handleChange() {
      if (form instanceof HTMLFormElement) form.requestSubmit();
    }

    form.addEventListener('change', handleChange);
    return () => form.removeEventListener('change', handleChange);
  }, [formId]);

  return null;
}
