import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle,
  Factory,
  FileCheck,
  Globe,
  HardHat,
  Mail,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export interface HeroSectionProps {
  badge: string;
  title: string;
  subtitle: string;
  ctaContact: string;
  ctaBrochure: string;
  locale: string;
}

export function HeroSection({
  badge,
  title,
  subtitle,
  ctaContact,
  ctaBrochure,
  locale,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-muted/80 via-muted/50 to-background" />
      <Container size="xl" className="relative z-10">
        <div className="max-w-2xl space-y-6">
          <Badge variant="secondary" className="mb-2">
            {badge}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground lg:text-xl">{subtitle}</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/contact`}>
                {ctaContact}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              {ctaBrochure}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export interface OverviewSectionProps {
  title: string;
  history: string;
  mission: string;
  highlights: string[];
}

export function OverviewSection({
  title,
  history,
  mission,
  highlights,
}: OverviewSectionProps) {
  return (
    <Section spacing="lg" background="default">
      <Container size="xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{history}</p>
              <p>{mission}</p>
            </div>
            <ul className="space-y-3 pt-4">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted lg:aspect-square">
            <div className="flex h-full w-full items-center justify-center">
              <Building2 className="h-16 w-16 text-muted-foreground/20" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export interface FactoryStat {
  value: string;
  label: string;
  unit: string;
}

export interface FactoryProcess {
  key: string;
  title: string;
  description: string;
}

export interface FactorySectionProps {
  title: string;
  subtitle: string;
  stats: FactoryStat[];
  processes: FactoryProcess[];
  galleryLabel: string;
}

export function FactorySection({
  title,
  subtitle,
  stats,
  processes,
  galleryLabel,
}: FactorySectionProps) {
  const processIcons: Record<string, typeof Factory> = {
    tempering: HardHat,
    coating: Factory,
    cnc: Building2,
  };

  return (
    <Section spacing="lg" background="muted">
      <Container size="xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-extrabold text-primary">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground/60">
                {stat.unit}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {processes.map((process) => {
            const IconComponent = processIcons[process.key] || Factory;
            return (
              <Card key={process.key} className="border-none shadow-sm">
                <CardHeader>
                  <IconComponent className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg border bg-background/50"
            >
              <span className="text-xs text-muted-foreground">
                {galleryLabel} {i}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export interface Certification {
  name: string;
  description: string;
  iconKey: string;
}

export interface CertificationsSectionProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  certifications: Certification[];
}

export function CertificationsSection({
  title,
  subtitle,
  viewAllLabel,
  certifications,
}: CertificationsSectionProps) {
  const iconMap: Record<string, typeof ShieldCheck> = {
    shield: ShieldCheck,
    file: FileCheck,
    award: Award,
    check: CheckCircle,
  };

  return (
    <Section spacing="lg">
      <Container size="xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <Button variant="outline" className="shrink-0">
            {viewAllLabel}
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => {
            const IconComponent = iconMap[cert.iconKey] || CheckCircle;
            return (
              <Card
                key={cert.name}
                className="flex flex-col items-center p-6 text-center"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold">{cert.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export interface GlobalPresenceSectionProps {
  badge: string;
  title: string;
  description: string;
  markets: string[];
  mapPlaceholder: string;
}

export function GlobalPresenceSection({
  badge,
  title,
  description,
  markets,
  mapPlaceholder,
}: GlobalPresenceSectionProps) {
  return (
    <Section spacing="lg" background="muted">
      <Container size="xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 flex aspect-[4/3] items-center justify-center rounded-xl border bg-background p-8 lg:order-1">
            <Globe className="h-32 w-32 text-muted-foreground/20" />
            <p className="absolute text-sm text-muted-foreground">
              {mapPlaceholder}
            </p>
          </div>
          <div className="order-1 space-y-6 lg:order-2">
            <Badge>{badge}</Badge>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {markets.map((market) => (
                <div
                  key={market}
                  className="flex items-center gap-2 font-medium"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {market}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export interface Project {
  title: string;
  location: string;
}

export interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  imagePlaceholder: string;
}

export function ProjectsSection({
  title,
  projects,
  imagePlaceholder,
}: ProjectsSectionProps) {
  return (
    <Section spacing="lg">
      <Container size="xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                  {imagePlaceholder}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.location}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface TeamSectionProps {
  title: string;
  members: TeamMember[];
}

export function TeamSection({ title, members }: TeamSectionProps) {
  return (
    <Section spacing="lg">
      <Container size="xl">
        <h2 className="mb-8 text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {members.map((member, index) => (
            <div key={index} className="group">
              <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full w-full items-center justify-center">
                  <Users className="h-12 w-12 text-muted-foreground/20" />
                </div>
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export interface FinalCTASectionProps {
  title: string;
  subtitle: string;
  emailLabel: string;
  callLabel: string;
  locale: string;
}

export function FinalCTASection({
  title,
  subtitle,
  emailLabel,
  callLabel,
  locale,
}: FinalCTASectionProps) {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-20">
      <Container size="lg" className="text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-primary-foreground/80">
          {subtitle}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href={`/${locale}/contact`}>
              <Mail className="h-4 w-4" />
              {emailLabel}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {callLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
