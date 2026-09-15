import type { MetadataRoute } from 'next';

import { guideArticles } from '@/lib/data/guide';
import { products } from '@/lib/data/products';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/finder`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/guide`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/business`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideArticles.map((article) => ({
    url: `${SITE_URL}/guide/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...guideRoutes];
}
