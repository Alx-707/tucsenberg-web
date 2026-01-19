import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { generateMetadataForPath, type Locale } from "@/lib/seo-metadata";
import {
  buildCertificationsProps,
  buildFactoryProps,
  buildFinalCtaProps,
  buildGlobalPresenceProps,
  buildHeroProps,
  buildOverviewProps,
  buildProjectsProps,
  buildTeamProps,
  CertificationsSection,
  FactorySection,
  FinalCTASection,
  GlobalPresenceSection,
  HeroSection,
  OverviewSection,
  ProjectsSection,
  TeamSection,
} from "@/components/about";
import { generateLocaleStaticParams } from "@/app/[locale]/generate-static-params";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

function AboutLoadingSkeleton() {
  return (
    <div>
      <div className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-4">
            <div className="h-6 w-32 animate-pulse rounded bg-muted" />
            <div className="h-12 w-96 animate-pulse rounded bg-muted" />
            <div className="h-6 w-80 animate-pulse rounded bg-muted" />
            <div className="flex gap-4 pt-4">
              <div className="h-10 w-36 animate-pulse rounded bg-muted" />
              <div className="h-10 w-36 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="h-8 w-64 animate-pulse rounded bg-muted" />
              <div className="h-24 w-full animate-pulse rounded bg-muted" />
              <div className="h-24 w-full animate-pulse rounded bg-muted" />
            </div>
            <div className="aspect-square animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  return generateMetadataForPath({
    locale: locale as Locale,
    pageType: "about",
    path: "/about",
    config: {
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  });
}

async function AboutContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection {...buildHeroProps(t, locale)} />
      <OverviewSection {...buildOverviewProps(t)} />
      <FactorySection {...buildFactoryProps(t)} />
      <CertificationsSection {...buildCertificationsProps(t)} />
      <GlobalPresenceSection {...buildGlobalPresenceProps(t)} />
      <ProjectsSection {...buildProjectsProps(t)} />
      <TeamSection {...buildTeamProps(t)} />
      <FinalCTASection {...buildFinalCtaProps(t, locale)} />
    </main>
  );
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  return (
    <Suspense fallback={<AboutLoadingSkeleton />}>
      <AboutContent locale={locale} />
    </Suspense>
  );
}
