import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type {
  ApplicationCategory,
  Locale,
  ProductDetail,
} from "@/types/content.types";
import {
  getCategoryData,
  isValidCategory,
  VALID_CATEGORY_SLUGS,
} from "@/config/product-categories";
import { getProductBySlugCached } from "@/lib/content/products";
import { getProductListing } from "@/lib/content/products-source";
import { routing } from "@/i18n/routing-config";
import {
  generateMetadataForPath,
  type Locale as SeoLocale,
} from "@/lib/seo-metadata";
import { generateProductSchema } from "@/lib/structured-data";
import { MDXContent } from "@/components/mdx";
import {
  ProductActions,
  ProductCertifications,
  ProductGallery,
  ProductInquiryForm,
  ProductSpecs,
  ProductTradeInfo,
} from "@/components/products";
import { JsonLdScript } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/config/paths";

interface ProductDetailPageProps {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: string; category: string; slug: string }> = [];

  for (const locale of routing.locales) {
    const products = getProductListing(locale as Locale);

    for (const product of products) {
      const appCategory = product.applicationCategory;
      if (
        appCategory &&
        VALID_CATEGORY_SLUGS.includes(appCategory as ApplicationCategory)
      ) {
        params.push({
          locale,
          category: appCategory,
          slug: product.slug,
        });
      }
    }
  }

  return params;
}

function ProductDetailLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 h-6 w-48 animate-pulse rounded bg-muted" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-square animate-pulse rounded-lg bg-muted" />
        <div className="space-y-6">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-20 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;

  if (!isValidCategory(category)) {
    return { title: "Product Not Found" };
  }

  try {
    const product = await getProductBySlugCached(locale as Locale, slug);
    const title = product.seo?.title ?? product.title;
    const description = product.seo?.description ?? product.description;

    const config: Parameters<typeof generateMetadataForPath>[0]["config"] = {
      title,
      image: product.seo?.ogImage ?? product.coverImage,
      type: "product",
      publishedTime: product.publishedAt,
    };

    if (description !== undefined) {
      config.description = description;
    }

    return generateMetadataForPath({
      locale: locale as SeoLocale,
      pageType: "products",
      path: `/products/${category}/${slug}`,
      config,
    });
  } catch {
    return { title: "Product Not Found" };
  }
}

function buildTradeInfoProps(product: ProductDetail): Record<string, string> {
  return {
    ...(product.moq !== undefined && { moq: product.moq }),
    ...(product.leadTime !== undefined && { leadTime: product.leadTime }),
    ...(product.supplyCapacity !== undefined && {
      supplyCapacity: product.supplyCapacity,
    }),
    ...(product.packaging !== undefined && { packaging: product.packaging }),
    ...(product.portOfLoading !== undefined && {
      portOfLoading: product.portOfLoading,
    }),
  };
}

function getSafePdfHref(product: ProductDetail): string | undefined {
  const pdfUrl = product.pdfUrl?.trim();
  if (!pdfUrl) return undefined;

  if (
    pdfUrl.startsWith("/") ||
    pdfUrl.startsWith("https://") ||
    pdfUrl.startsWith("http://")
  ) {
    return pdfUrl;
  }

  return undefined;
}

async function buildProductSchema(
  locale: Locale,
  product: ProductDetail,
): Promise<Record<string, unknown>> {
  const title = product.seo?.title ?? product.title;
  const description =
    product.seo?.description ??
    product.description ??
    SITE_CONFIG.seo.defaultDescription;
  const imageUrl = new URL(
    product.seo?.ogImage ?? product.coverImage,
    SITE_CONFIG.baseUrl,
  ).toString();

  const schema = await generateProductSchema(
    { name: title, description, image: imageUrl },
    locale,
  );
  return schema;
}

interface BreadcrumbNavProps {
  locale: string;
  category: string;
  categoryTitle: string;
  productTitle: string;
  productsLabel: string;
}

function BreadcrumbNav({
  locale,
  category,
  categoryTitle,
  productTitle,
  productsLabel,
}: BreadcrumbNavProps) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link href={`/${locale}/products`} className="hover:text-foreground">
            {productsLabel}
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <Link
            href={`/${locale}/products/${category}`}
            className="hover:text-foreground"
          >
            {categoryTitle}
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li className="font-medium text-foreground" aria-current="page">
          {productTitle}
        </li>
      </ol>
    </nav>
  );
}

async function ProductDetailContent({
  locale,
  category,
  slug,
}: {
  locale: string;
  category: string;
  slug: string;
}) {
  setRequestLocale(locale);

  const categoryData = getCategoryData(category);
  if (!categoryData) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "products" });

  const product = await getProductBySlugCached(locale as Locale, slug).catch(
    () => notFound(),
  );

  const images = [product.coverImage, ...(product.images ?? [])];
  const downloadPdfHref = getSafePdfHref(product);
  const productSchema = await buildProductSchema(locale as Locale, product);

  const tradeInfoLabels = {
    moq: t("detail.labels.moq"),
    leadTime: t("detail.labels.leadTime"),
    supplyCapacity: t("detail.labels.supplyCapacity"),
    packaging: t("detail.labels.packaging"),
    portOfLoading: t("detail.labels.portOfLoading"),
  };

  const hasCertifications =
    product.certifications !== undefined && product.certifications.length > 0;

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <JsonLdScript data={productSchema} />

      <BreadcrumbNav
        locale={locale}
        category={category}
        categoryTitle={categoryData.title}
        productTitle={product.title}
        productsLabel={t("pageTitle")}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={images} title={product.title} />

        <div className="space-y-6">
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-heading">{product.title}</h1>

          {product.description && (
            <p className="text-body text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            {product.moq && (
              <div className="flex items-center gap-1">
                <span className="font-medium">{t("card.moq")}:</span>
                <span className="text-muted-foreground">{product.moq}</span>
              </div>
            )}
            {product.leadTime && (
              <div className="flex items-center gap-1">
                <span className="font-medium">{t("card.leadTime")}:</span>
                <span className="text-muted-foreground">
                  {product.leadTime}
                </span>
              </div>
            )}
          </div>

          {hasCertifications && (
            <ProductCertifications
              certifications={product.certifications as string[]}
              title={t("detail.certifications")}
            />
          )}

          <div className="pt-4">
            <ProductActions
              productSlug={product.slug}
              productName={product.title}
              productImage={product.coverImage}
              requestQuoteLabel={t("requestQuote")}
              {...(downloadPdfHref !== undefined && {
                pdfHref: downloadPdfHref,
                downloadPdfLabel: t("detail.downloadPdf"),
              })}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {product.specs && Object.keys(product.specs).length > 0 && (
          <ProductSpecs
            specs={product.specs}
            title={t("detail.specifications")}
          />
        )}
        <ProductTradeInfo
          {...buildTradeInfoProps(product)}
          labels={tradeInfoLabels}
          title={t("detail.tradeInfo")}
        />
      </div>

      {product.content.trim() && (
        <article className="prose mt-12 max-w-none prose-neutral dark:prose-invert">
          <MDXContent type="products" locale={locale as Locale} slug={slug} />
        </article>
      )}

      <section className="mt-12">
        <ProductInquiryForm
          productName={product.title}
          productSlug={product.slug}
        />
      </section>
    </main>
  );
}

export default async function CategoryProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, category, slug } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductDetailLoadingSkeleton />}>
      <ProductDetailContent locale={locale} category={category} slug={slug} />
    </Suspense>
  );
}
