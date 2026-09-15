'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { ProductImage } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * 제품 갤러리.
 * JavaScript 가 없어도 첫 번째 이미지는 서버 렌더링 결과에 그대로 포함됩니다.
 */
export function ProductGallery({ images, nameKo }: { images: ProductImage[]; nameKo: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-card border border-line bg-white">
        <Image
          src={active.src}
          alt={active.altKo}
          width={active.width}
          height={active.height}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2" role="list">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                aria-label={`${nameKo} 이미지 ${index + 1} 보기`}
                className={cn(
                  'block w-full overflow-hidden rounded-lg border-2 bg-white transition-colors',
                  index === activeIndex ? 'border-lab-blue' : 'border-line hover:border-muted/40',
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes="120px"
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
