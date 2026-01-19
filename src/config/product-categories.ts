import type { ApplicationCategory } from "@/types/content.types";
import type { CategoryData } from "@/components/products/category-landing-page";

/**
 * Product category configuration for Tucsenberg Glass.
 * Defines metadata for each application category landing page.
 */
export const PRODUCT_CATEGORIES: Record<ApplicationCategory, CategoryData> = {
  "curtain-wall": {
    slug: "curtain-wall",
    title: "Curtain Wall Systems",
    description:
      "Premium architectural glazing solutions for commercial facades. Engineered for Australian conditions with superior thermal and acoustic performance.",
    heroImage: "/images/categories/curtain-wall-hero.jpg",
    certifications: ["AS 2047", "AS 1288", "CE Certified"],
    trustMetrics: [
      { label: "U-Value", value: "≤1.5 W/m²K" },
      { label: "Projects Delivered", value: "200+" },
      { label: "Years Experience", value: "15+" },
    ],
    climateFeature: {
      title: "Made for Australian Climate",
      description:
        "Tested and certified for extreme heat, UV exposure, and coastal conditions.",
    },
  },
  residential: {
    slug: "residential",
    title: "Residential Solutions",
    description:
      "Energy-efficient windows and doors designed for Australian homes. Maximize comfort while minimizing energy costs.",
    heroImage: "/images/categories/residential-hero.jpg",
    certifications: ["AS 2047", "AS 1288", "WERS Rated"],
    trustMetrics: [
      { label: "Energy Savings", value: "Up to 40%" },
      { label: "Homes Fitted", value: "5,000+" },
      { label: "Warranty", value: "10 Years" },
    ],
    climateFeature: {
      title: "Australian Climate Optimized",
      description:
        "Engineered for hot summers and cool winters across all Australian climate zones.",
    },
  },
  commercial: {
    slug: "commercial",
    title: "Commercial Solutions",
    description:
      "Professional glazing systems for retail, office, and hospitality projects. Combine aesthetics with functionality.",
    heroImage: "/images/categories/commercial-hero.jpg",
    certifications: ["AS 2047", "AS 1288", "AS 1905.1"],
    trustMetrics: [
      { label: "Commercial Projects", value: "500+" },
      { label: "Security Rating", value: "P2A-P5A" },
      { label: "Lead Time", value: "3-4 Weeks" },
    ],
    climateFeature: {
      title: "Built for Business",
      description:
        "Robust systems that meet commercial building codes and security requirements.",
    },
  },
  glass: {
    slug: "glass",
    title: "Glass Products",
    description:
      "High-performance architectural glass for any application. From energy-efficient Low-E to safety laminated glass.",
    heroImage: "/images/categories/glass-hero.jpg",
    certifications: ["AS 1288", "AS/NZS 2208", "CE EN 12150"],
    trustMetrics: [
      { label: "Glass Types", value: "20+" },
      { label: "Custom Sizes", value: "Available" },
      { label: "Quality Grade", value: "A+" },
    ],
    climateFeature: {
      title: "Premium Quality Glass",
      description:
        "Sourced from leading manufacturers, processed to Australian standards.",
    },
  },
};

/**
 * Valid category slugs for routing validation.
 */
export const VALID_CATEGORY_SLUGS = Object.keys(
  PRODUCT_CATEGORIES,
) as ApplicationCategory[];

/**
 * Get category data by slug.
 */
export function getCategoryData(slug: string): CategoryData | undefined {
  return PRODUCT_CATEGORIES[slug as ApplicationCategory];
}

/**
 * Check if a slug is a valid category.
 */
export function isValidCategory(slug: string): slug is ApplicationCategory {
  return VALID_CATEGORY_SLUGS.includes(slug as ApplicationCategory);
}
