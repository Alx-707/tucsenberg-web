# UI Analysis Report: vercel.com

**URL:** https://vercel.com/
**Captured:** 2026-01-15T05:27:11.945Z
**Viewports:** Desktop (1440x810)

## Executive Summary

Vercel.com uses a modern design system built on the **Geist** design language with **Tailwind CSS** utilities. The site features a light theme by default with dark mode support, extensive CSS variable theming, and container queries for responsive layouts.

## Design System Detection

| Signal | Evidence | Confidence |
|--------|----------|------------|
| Geist | `--geist-*` (103 vars), `--ds-*` (203 vars), Geist font family | High |
| Tailwind | `--tw-*` (47 vars), utility classes | High |
| Container Queries | CSSContainerRule detected | Confirmed |

## Color Palette

### Primary Colors
| Color | Hex | Usage | Count |
|-------|-----|-------|-------|
| Dark Gray | `#171717` | Text, Primary buttons | 2704 |
| Gray | `#666666` | Secondary text | 382 |
| White | `#ffffff` | Backgrounds, Button text | 103 |
| Black | `#000000` | Accents | 50 |

### Accent Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#0062d1` | CTA buttons |
| Red | `#e5484d` | Error states |
| Teal | `#45dec5` | Highlights |
| Light Blue | `#52aeff` | Links |

## Typography

### Font Families
- **Primary:** Geist, system fonts
- **Monospace:** Geist Mono, ui-monospace, SFMono-Regular

### Type Scale
| Level | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| H1 | 48px | 600 | 48px | -2.4px |
| H2 | 40px | 600 | 48px | -2.4px |
| H3 | 24px | 600 | 32px | -0.96px |
| Body | 16px | 400 | 24px | normal |
| Small | 14px | 400 | 20px | normal |

## Spacing Scale

| Value | Count | Usage |
|-------|-------|-------|
| 12px | 110 | Primary spacing |
| 8px | 64 | Compact spacing |
| 2px | 36 | Micro spacing |
| 10px | 9 | Medium spacing |
| 32px | 3 | Section spacing |
| 48px | 2 | Large spacing |
| 24px | 2 | Gap spacing |
| 64px | 1 | Header height |

## Border Radii

| Value | Count | Usage |
|-------|-------|-------|
| 6px | 90 | Buttons, cards |
| 64px | 50 | Pills |
| 4px | 41 | Small elements |
| 9999px | 35 | Circular elements |
| 2px | 20 | Subtle rounding |
| 50% | 11 | Circles |
| 100px | 4 | Large pills |

## Shadows

| Shadow | Usage |
|--------|-------|
| `rgba(0,0,0,0.04) 0px 2px 2px` | Subtle elevation |
| `rgba(0,0,0,0.08) 0px 0px 0px 1px, ...` | Card borders |
| `rgb(235,235,235) 0px 0px 0px 1px` | Light borders |

## Interactive States

### Button: Sign Up (Primary CTA)
| State | Background | Color |
|-------|------------|-------|
| Default | `#171717` | `#ffffff` |
| Hover | `#383838` | `#ffffff` |

**Transition:** `0.15s` with standard easing

## Theme Support

- **Current Theme:** Light
- **Dark Mode Toggle:** Found (`input[aria-label*="dark" i]`)
- **CSS Variable Theming:** Yes
- **Container Queries:** Supported

## Responsive Breakpoints

Key breakpoints detected (46 total):
- 375px (Mobile)
- 640px (Small tablet)
- 768px (Tablet)
- 1024px (Desktop)
- 1200px (Large desktop)
- 1400px (Extra large)

## Coverage Statistics

| Category | Extracted | Limit | Rate |
|----------|-----------|-------|------|
| CSS Variables | 80 | 80 | 100% |
| Colors | 15 | 40 | 38% |
| Spacing | 11 | 20 | 55% |
| Shadows | 4 | 10 | 40% |
| Radii | 7 | 10 | 70% |
| Keyframes | 12 | 12 | 100% |

## Recommendations

1. **Design Token Adoption:** The site uses a comprehensive CSS variable system that can be directly mapped to design tokens.
2. **Animation Library:** Consider extracting the keyframe animations for reuse.
3. **Component Patterns:** Button, card, and navigation patterns are well-defined and consistent.
