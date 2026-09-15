import type { ReactElement } from 'react';

import HdmiArticle from '@/content/guide/hdmi-2-0-vs-2-1.mdx';
import LanArticle from '@/content/guide/cat6-cat7-cat8-guide.mdx';
import DirectionArticle from '@/content/guide/unidirectional-vs-bidirectional.mdx';
import UsbCArticle from '@/content/guide/usb-c-monitor-checklist.mdx';

/**
 * slug → 렌더링된 MDX 엘리먼트 정적 매핑.
 * 컴포넌트가 아닌 엘리먼트를 보관해 렌더 중 컴포넌트가 새로 만들어지지 않도록 합니다.
 */
const contentBySlug: Record<string, ReactElement> = {
  'hdmi-2-0-vs-2-1': <HdmiArticle />,
  'usb-c-monitor-checklist': <UsbCArticle />,
  'cat6-cat7-cat8-guide': <LanArticle />,
  'unidirectional-vs-bidirectional': <DirectionArticle />,
};

export function getArticleContent(slug: string): ReactElement | undefined {
  return contentBySlug[slug];
}
