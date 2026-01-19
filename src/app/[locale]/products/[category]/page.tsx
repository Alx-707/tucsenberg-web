import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { ApplicationCategory, Locale } from "@/types/content.types";
import {
  getCategoryData,
  isValidCategory,
  VALID_CATEGORY_SLUGS,
} from "@/config/product-categories";
import { getAllProductsCached } from "@/lib/content/products";
import {
  generateMetadataForPath,
  type Locale as SeoLocale,
} from "@/lib/seo-metadata";
import {
  CategoryLandingPage,
  type CategoryProduct,
} from "@/components/products/category-landing-page";
import { routing } from "@/i18n/routing-config";

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: string; category: string }> = [];

  for (const locale of routing.locales) {
    for (const category of VALID_CATEGORY_SLUGS) {
      params.push({ locale, category });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;

  if (!isValidCategory(category)) {
    return { title: "Category Not Found" };
  }

  const categoryData = getCategoryData(category);
  if (!categoryData) {
    return { title: "Category Not Found" };
  }

  return generateMetadataForPath({
    locale: locale as SeoLocale,
    pageType: "products",
    path: `/products/${category}`,
    config: {
      title: categoryData.title,
      description: categoryData.description,
    },
  });
}

function CategoryLoadingSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-[500px] animate-pulse bg-muted lg:h-[600px]" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function CategoryContent({
  locale,
  category,
}: {
  locale: string;
  category: ApplicationCategory;
}) {
  setRequestLocale(locale);

  const categoryData = getCategoryData(category);
  if (!categoryData) {
    notFound();
  }

  const allProducts = await getAllProductsCached(locale as Locale);

  const categoryProducts: CategoryProduct[] = allProducts
    .filter((p) => {
      const appCategory = (p as { applicationCategory?: string })
        .applicationCategory;
      return appCategory === category;
    })
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description ?? "",
      coverImage: p.coverImage,
      specs: {
        ...(p.moq ? { MOQ: p.moq } : {}),
        ...(p.leadTime ? { "Lead Time": p.leadTime } : {}),
      },
    }));

  return (
    <CategoryLandingPage
      category={categoryData}
      products={categoryProducts}
      locale={locale as Locale}
    />
  );
}

export default async function ProductCategoryPage({
  params,
}: CategoryPageProps) {
  const { locale, category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  return (
    <Suspense fallback={<CategoryLoadingSkeleton />}>
      <CategoryContent locale={locale} category={category} />
    </Suspense>
  );
}
