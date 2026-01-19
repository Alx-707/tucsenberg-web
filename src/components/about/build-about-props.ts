import type {
  CertificationsSectionProps,
  FactorySectionProps,
  FinalCTASectionProps,
  GlobalPresenceSectionProps,
  HeroSectionProps,
  OverviewSectionProps,
  ProjectsSectionProps,
  TeamSectionProps,
} from "./about-sections";

type TranslationFunction = (key: string) => string;

export function buildHeroProps(
  t: TranslationFunction,
  locale: string,
): HeroSectionProps {
  return {
    badge: t("hero.badge"),
    title: t("hero.title"),
    subtitle: t("hero.subtitle"),
    ctaContact: t("cta.contact"),
    ctaBrochure: t("cta.downloadBrochure"),
    locale,
  };
}

export function buildOverviewProps(
  t: TranslationFunction,
): OverviewSectionProps {
  return {
    title: t("overview.title"),
    history: t("overview.history"),
    mission: t("overview.mission"),
    highlights: [
      t("overview.highlight1"),
      t("overview.highlight2"),
      t("overview.highlight3"),
    ],
  };
}

export function buildFactoryProps(t: TranslationFunction): FactorySectionProps {
  return {
    title: t("factory.title"),
    subtitle: t("factory.subtitle"),
    stats: [
      {
        value: "50,000",
        label: t("factory.stats.capacity"),
        unit: t("factory.stats.capacityUnit"),
      },
      {
        value: "15+",
        label: t("factory.stats.experience"),
        unit: t("factory.stats.experienceUnit"),
      },
      {
        value: "20+",
        label: t("factory.stats.markets"),
        unit: t("factory.stats.marketsUnit"),
      },
      {
        value: "500+",
        label: t("factory.stats.projects"),
        unit: t("factory.stats.projectsUnit"),
      },
    ],
    processes: [
      {
        key: "tempering",
        title: t("factory.process.tempering.title"),
        description: t("factory.process.tempering.description"),
      },
      {
        key: "coating",
        title: t("factory.process.coating.title"),
        description: t("factory.process.coating.description"),
      },
      {
        key: "cnc",
        title: t("factory.process.cnc.title"),
        description: t("factory.process.cnc.description"),
      },
    ],
    galleryLabel: t("factory.galleryLabel"),
  };
}

export function buildCertificationsProps(
  t: TranslationFunction,
): CertificationsSectionProps {
  return {
    title: t("certifications.title"),
    subtitle: t("certifications.subtitle"),
    viewAllLabel: t("certifications.viewAll"),
    certifications: [
      {
        name: "AS 2047",
        description: t("certifications.as2047"),
        iconKey: "shield",
      },
      {
        name: "AS 1288",
        description: t("certifications.as1288"),
        iconKey: "file",
      },
      {
        name: "ISO 9001",
        description: t("certifications.iso9001"),
        iconKey: "award",
      },
      {
        name: "CE Marking",
        description: t("certifications.ce"),
        iconKey: "check",
      },
    ],
  };
}

export function buildGlobalPresenceProps(
  t: TranslationFunction,
): GlobalPresenceSectionProps {
  return {
    badge: t("global.badge"),
    title: t("global.title"),
    description: t("global.description"),
    markets: [
      t("global.markets.australia"),
      t("global.markets.newZealand"),
      t("global.markets.germany"),
      t("global.markets.uk"),
    ],
    mapPlaceholder: t("global.mapPlaceholder"),
  };
}

export function buildProjectsProps(
  t: TranslationFunction,
): ProjectsSectionProps {
  return {
    title: t("projects.title"),
    projects: [
      {
        title: t("projects.case1.title"),
        location: t("projects.case1.location"),
      },
      {
        title: t("projects.case2.title"),
        location: t("projects.case2.location"),
      },
      {
        title: t("projects.case3.title"),
        location: t("projects.case3.location"),
      },
    ],
    imagePlaceholder: t("projects.imagePlaceholder"),
  };
}

export function buildTeamProps(t: TranslationFunction): TeamSectionProps {
  return {
    title: t("team.title"),
    members: [
      {
        name: t("team.member1.name"),
        role: t("team.member1.role"),
      },
      {
        name: t("team.member2.name"),
        role: t("team.member2.role"),
      },
      {
        name: t("team.member3.name"),
        role: t("team.member3.role"),
      },
      {
        name: t("team.member4.name"),
        role: t("team.member4.role"),
      },
    ],
  };
}

export function buildFinalCtaProps(
  t: TranslationFunction,
  locale: string,
): FinalCTASectionProps {
  return {
    title: t("cta.finalTitle"),
    subtitle: t("cta.finalSubtitle"),
    emailLabel: t("cta.emailUs"),
    callLabel: t("cta.callUs"),
    locale,
  };
}
