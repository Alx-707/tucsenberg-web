import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Thermometer, Wind } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content.types";
import { getBlurPlaceholder } from "@/lib/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Category data for landing page configuration.
 * Used to display hero, trust indicators, and metadata.
 */
export interface CategoryData {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  certifications: string[];
  trustMetrics: Array<{ label: string; value: string }>;
  climateFeature?: {
    title: string;
    description: string;
  };
}

/**
 * Product item for category grid display.
 * Subset of ProductSummary for landing page use.
 */
export interface CategoryProduct {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  specs: Record<string, string>;
}

/**
 * Props for the CategoryLandingPage component.
 */
export interface CategoryLandingPageProps {
  category: CategoryData;
  products: CategoryProduct[];
  locale: Locale;
  i18nNamespace?: string;
}

interface HeroSectionProps {
  category: CategoryData;
  locale: Locale;
  labels: {
    viewProducts: string;
    requestQuote: string;
  };
}

function HeroSection({ category, locale, labels }: HeroSectionProps) {
  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-foreground text-background lg:min-h-[600px]"
      aria-labelledby="category-hero-title"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={category.heroImage}
          alt={category.title}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
          {...getBlurPlaceholder("neutral")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 text-center lg:py-20">
        <h1
          id="category-hero-title"
          className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {category.title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-background/90 sm:text-lg md:text-xl">
          {category.description}
        </p>

        {category.certifications.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {category.certifications.map((cert) => (
              <Badge
                key={cert}
                variant="secondary"
                className="bg-background/10 px-2 py-1 text-xs font-medium text-background backdrop-blur-sm hover:bg-background/20 sm:px-3 sm:text-sm"
              >
                <ShieldCheck className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                {cert}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Button
            size="lg"
            className="min-w-[140px] text-sm sm:min-w-[160px] sm:text-base"
            asChild
          >
            <Link href="#products">{labels.viewProducts}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[140px] border-background text-sm text-background hover:bg-background hover:text-foreground sm:min-w-[160px] sm:text-base"
            asChild
          >
            <Link href={`/${locale}/contact`}>{labels.requestQuote}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface TrustIndicatorsSectionProps {
  category: CategoryData;
  labels: {
    climateTitle: string;
    climateDescription: string;
    compliant: string;
  };
}

function TrustIndicatorsSection({
  category,
  labels,
}: TrustIndicatorsSectionProps) {
  const climateTitle = category.climateFeature?.title ?? labels.climateTitle;
  const climateDesc =
    category.climateFeature?.description ?? labels.climateDescription;

  return (
    <section
      className="border-b bg-muted/50 py-12 lg:py-16"
      aria-label="Trust indicators and certifications"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
              <Wind className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="mb-2 text-base font-semibold lg:text-lg">
              {climateTitle}
            </h3>
            <p className="text-sm text-muted-foreground">{climateDesc}</p>
          </div>

          {category.trustMetrics.map((metric, index) => (
            <div
              key={`metric-${index}`}
              className="flex flex-col items-center justify-center rounded-lg border bg-background p-4 text-center shadow-sm sm:p-6"
            >
              <span className="text-2xl font-bold text-primary sm:text-3xl">
                {metric.value}
              </span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                {metric.label}
              </span>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/5 p-4 text-center sm:p-6">
            <Thermometer className="mb-2 h-6 w-6 text-primary sm:h-8 sm:w-8" />
            <span className="text-sm font-semibold text-primary sm:text-base">
              AS 2047 &amp; AS 1288
            </span>
            <span className="text-xs text-muted-foreground">
              {labels.compliant}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductCardItemProps {
  product: CategoryProduct;
  categorySlug: string;
  locale: Locale;
  viewDetailsLabel: string;
}

function ProductCardItem({
  product,
  categorySlug,
  locale,
  viewDetailsLabel,
}: ProductCardItemProps) {
  const specEntries = Object.entries(product.specs).slice(0, 3);

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-primary/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          {...getBlurPlaceholder("neutral")}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/${locale}/products/${categorySlug}/${product.slug}`}>
              {viewDetailsLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base lg:text-lg">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {specEntries.length > 0 && (
          <div className="space-y-1.5 text-sm">
            {specEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between border-b border-border/50 pb-1 last:border-0"
              >
                <span className="font-medium text-muted-foreground">{key}</span>
                <span className="text-foreground">{value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ProductsGridSectionProps {
  products: CategoryProduct[];
  categorySlug: string;
  locale: Locale;
  labels: {
    viewDetails: string;
    productsTitle: string;
  };
}

function ProductsGridSection({
  products,
  categorySlug,
  locale,
  labels,
}: ProductsGridSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="products"
      className="py-16 lg:py-20"
      aria-labelledby="products-grid-title"
    >
      <div className="container mx-auto px-4">
        <h2 id="products-grid-title" className="sr-only">
          {labels.productsTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <ProductCardItem
              key={product.slug}
              product={product}
              categorySlug={categorySlug}
              locale={locale}
              viewDetailsLabel={labels.viewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CTASectionProps {
  locale: Locale;
  labels: {
    readyToStart: string;
    contactDescription: string;
    contactUs: string;
    learnMore: string;
  };
}

function CTASection({ locale, labels }: CTASectionProps) {
  return (
    <section
      className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-20"
      aria-labelledby="cta-section-title"
    >
      <div className="container mx-auto px-4 text-center">
        <h2
          id="cta-section-title"
          className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl"
        >
          {labels.readyToStart}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          {labels.contactDescription}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="group min-w-[140px] sm:min-w-[160px]"
            asChild
          >
            <Link href={`/${locale}/contact`}>
              {labels.contactUs}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[140px] sm:min-w-[160px]"
            asChild
          >
            <Link href={`/${locale}/about`}>{labels.learnMore}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Reusable category landing page component for product categories.
 *
 * Server Component designed for B2B glass/window manufacturer categories:
 * - Curtain Wall Systems
 * - Residential Solutions
 * - Commercial Solutions
 * - Glass Products
 *
 * Features:
 * - Full-width hero with image overlay
 * - Certification badges display
 * - Trust indicators with metrics
 * - Responsive product grid (3/2/1 columns)
 * - CTA section for inquiries
 */
export async function CategoryLandingPage({
  category,
  products,
  locale,
  i18nNamespace = "products.category",
}: CategoryLandingPageProps) {
  const t = await getTranslations({ locale, namespace: i18nNamespace });

  const heroLabels = {
    viewProducts: t("hero.viewProducts"),
    requestQuote: t("hero.requestQuote"),
  };

  const trustLabels = {
    climateTitle: t("trust.climateTitle"),
    climateDescription: t("trust.climateDescription"),
    compliant: t("trust.compliant"),
  };

  const gridLabels = {
    viewDetails: t("grid.viewDetails"),
    productsTitle: t("grid.title"),
  };

  const ctaLabels = {
    readyToStart: t("cta.readyToStart"),
    contactDescription: t("cta.contactDescription"),
    contactUs: t("cta.contactUs"),
    learnMore: t("cta.learnMore"),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection category={category} locale={locale} labels={heroLabels} />

      <TrustIndicatorsSection category={category} labels={trustLabels} />

      <ProductsGridSection
        products={products}
        categorySlug={category.slug}
        locale={locale}
        labels={gridLabels}
      />

      <CTASection locale={locale} labels={ctaLabels} />
    </div>
  );
}

/**
 * Static variant that accepts pre-loaded messages.
 * Use for LCP optimization or when translations are already available.
 */
export interface CategoryLandingPageStaticProps extends Omit<
  CategoryLandingPageProps,
  "i18nNamespace"
> {
  messages: {
    hero: { viewProducts: string; requestQuote: string };
    trust: {
      climateTitle: string;
      climateDescription: string;
      compliant: string;
    };
    grid: { viewDetails: string; productsTitle: string };
    cta: {
      readyToStart: string;
      contactDescription: string;
      contactUs: string;
      learnMore: string;
    };
  };
}

export function CategoryLandingPageStatic({
  category,
  products,
  locale,
  messages,
}: CategoryLandingPageStaticProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection category={category} locale={locale} labels={messages.hero} />

      <TrustIndicatorsSection category={category} labels={messages.trust} />

      <ProductsGridSection
        products={products}
        categorySlug={category.slug}
        locale={locale}
        labels={messages.grid}
      />

      <CTASection locale={locale} labels={messages.cta} />
    </div>
  );
}
