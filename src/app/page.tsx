import { BrandValues } from '@/components/home/brand-values';
import { CategoryGrid } from '@/components/home/category-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { FinalCta } from '@/components/home/final-cta';
import { GuideTeasers } from '@/components/home/guide-teasers';
import { Hero } from '@/components/home/hero';
import { TaskPicker } from '@/components/home/task-picker';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TaskPicker />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandValues />
      <GuideTeasers />
      <FinalCta />
    </>
  );
}
