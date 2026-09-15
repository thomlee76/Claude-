import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  images: {
    // 실제 상품 사진을 외부 CDN에서 제공할 경우 remotePatterns 를 추가하세요.
    // TODO(content): 실제 제품 이미지 호스트 등록
    formats: ['image/avif', 'image/webp'],
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack 은 직렬화 가능한 옵션만 허용하므로 플러그인을 문자열로 지정합니다.
    remarkPlugins: [['remark-gfm', {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
