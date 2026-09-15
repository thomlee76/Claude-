# 케이블연구소 (Cable Lab)

연결 규격을 기준으로 케이블을 설명하고 추천하는 브랜드 사이트입니다.
일반적인 쇼핑몰이 아니라 **"연결을 위한 디지털 실험실"** 을 콘셉트로,
사용자가 기기·단자·목적만 선택하면 호환되는 제품을 찾을 수 있도록 설계했습니다.

## 기술 스택

| 영역 | 선택 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript (strict, `noUncheckedIndexedAccess` 포함) |
| 스타일 | Tailwind CSS v4 (`@theme` 토큰) |
| UI | shadcn/ui 패턴 (Radix Primitives + CVA) |
| 아이콘 | Lucide (공통 UI) + 자체 SVG (커넥터) |
| 콘텐츠 | MDX (`@next/mdx` + remark-gfm) |
| 폼 | React Hook Form + Zod (클라이언트/서버 공용 스키마) |
| 서체 | Pretendard Variable (한국어) + Geist Mono (기술 수치) |

## 실행

```bash
npm install
npm run dev        # 개발 서버
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # 프로덕션 빌드
```

## 페이지 구성

| 경로 | 설명 | 렌더링 |
| --- | --- | --- |
| `/` | 브랜드 홈 (작업 선택 · 카테고리 · 추천 제품 · 가이드 · CTA) | Static |
| `/products` | 카탈로그 (12종 필터) | Dynamic (searchParams) |
| `/products/[slug]` | 제품 상세 | SSG |
| `/finder` | 6단계 케이블 추천 마법사 | Dynamic (searchParams) |
| `/guide` | 케이블 가이드 목록 | Static |
| `/guide/[slug]` | MDX 아티클 | SSG |
| `/about` | 브랜드 소개 | Static |
| `/business` | 기업 구매 문의 폼 | Dynamic |
| `/support` | 고객지원 · FAQ | Static |

`sitemap.xml`, `robots.txt` 는 `src/app/sitemap.ts`, `src/app/robots.ts` 에서 생성됩니다.

## 설계 원칙

### 1. JavaScript 없이도 핵심 콘텐츠가 동작합니다
카탈로그 필터와 `/finder` 마법사는 모두 `<form method="get">` 과 서버 렌더링으로 구현했습니다.
JavaScript 가 있으면 필터가 변경 즉시 제출되고, 없으면 "필터 적용" 버튼으로 동일하게 동작합니다.
따라서 제품·가이드 본문은 클라이언트 JS 없이 그대로 색인됩니다.

### 2. 맞지 않는 제품은 추천하지 않습니다
`src/lib/finder.ts` 의 매칭 엔진은 커넥터 구성과 목적이 맞지 않으면 점수와 관계없이 후보에서 제외합니다.
결과가 없으면 빈 상태와 문의 유도 화면을 보여 주며, 임의의 대체 상품을 노출하지 않습니다.

### 3. 제약을 먼저 보여 줍니다
`Product.warnings` 는 `critical / caution / info` 3단계이며,
`critical` 경고(단방향 제품, DP Alt Mode 확인, 포트 규격에 따른 성능 제한)는
상세 페이지 상단과 추천 결과 카드에 강조 배치됩니다.

## 콘텐츠 교체 가이드

### 제품 데이터
`src/lib/data/products.ts` 의 `Product` 배열을 수정합니다. 타입은 `src/lib/types.ts` 에 정의되어 있습니다.

### 제품 이미지
`public/images/products/<slug>/1~3.svg` 가 플레이스홀더입니다.
동일한 경로에 실제 촬영 이미지를 넣고 `products.ts` 의 `images[].src` 확장자를 바꾸면 됩니다.
JPG/PNG 로 교체하면 Next.js 이미지 최적화(AVIF/WebP 변환)가 자동 적용됩니다.
`width`/`height` 를 실제 비율에 맞춰 지정하면 레이아웃 시프트가 발생하지 않습니다.

### 가이드 아티클
1. `src/content/guide/<slug>.mdx` 파일 작성
2. `src/lib/data/guide.ts` 의 `guideArticles` 에 메타데이터 추가
3. `src/lib/guide-content.tsx` 의 `contentBySlug` 에 등록

### 다국어(영어) 추가
`src/lib/i18n/config.ts` 에 로케일 정의가, `src/lib/i18n/ko.ts` 에 UI 사전이 있습니다.
영어를 추가하려면 동일한 키 구조의 `en.ts` 를 작성해 `dictionaries` 에 등록하고,
`app/[locale]` 세그먼트를 도입하면 됩니다. MVP 에는 언어 전환 UI 를 넣지 않았습니다.

## 남은 작업 (TODO)

코드 내 `TODO(...)` 주석으로 표시되어 있습니다.

- `TODO(content)` — 실제 제품 정보, 네이버 스마트스토어 URL, 제품 사진, 고객센터 연락처
- `TODO(legal)` — 사업자 정보, 인증(KC 등), 보증·반품 정책, 개인정보 처리방침 페이지
- `TODO(commerce)` — 길이별 가격·재고, Product JSON-LD 의 `offers`
- `TODO(integration)` — 기업 구매 문의 메일 발송 또는 CRM/DB 연동
- `TODO(deploy)` — `NEXT_PUBLIC_SITE_URL` 운영 도메인 설정
- `TODO(observability)` — 오류 리포팅 연동

> 현재 사이트의 제품 데이터는 공개된 표준 규격을 기준으로 작성한 **데모 데이터**입니다.
> 인증 현황, 보증 기간, 시험 성적, 생산 능력 등은 기재하지 않았습니다.
