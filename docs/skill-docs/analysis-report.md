# UI Analysis Report

**URL**: https://vercel.com/
**Captured**: 2026-01-15T00:07:19.977Z
**Viewports**: desktop (1440x810)

## Summary

- **Design System**: Geist (Vercel's design system)
- **Colors**: 15 primary tokens (80 CSS variables total)
- **Typography**: Geist Sans + Geist Mono font stacks, full heading hierarchy (H1-H5)
- **Spacing**: Base 4px (scale: 2, 4, 8, 10, 12, 24, 32, 48, 64)
- **Animation Coverage**: 100% (24 keyframes extracted, 0 blocked)

## Color Palette

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Text Primary | `color.semantic.text-primary` | #171717 | Body text, headings |
| Text Secondary | `color.semantic.text-secondary` | #666666 | Muted text, labels |
| Text Inverse | `color.semantic.text-inverse` | #ffffff | CTA button text |
| Background Canvas | `color.semantic.bg-canvas` | #ffffff | Page background |
| Background Surface | `color.semantic.bg-surface` | #fafafa | Card backgrounds |
| CTA Primary | `color.semantic.bg-cta-primary` | #171717 | Primary button bg |
| CTA Secondary | `color.semantic.bg-cta-secondary` | #fafafa | Secondary button bg |
| CTA Accent | `color.semantic.bg-cta-accent` | #0062d1 | Accent button bg |
| Border Default | `color.semantic.border-default` | #00000014 | Subtle borders |
| Border Strong | `color.semantic.border-strong` | #ebebeb | Visible borders |
| Error | `color.semantic.error` | #e5484d | Error states |
| Success | `color.semantic.success` | #45dec5 | Success states |
| Info | `color.semantic.info` | #52aeff | Info states |

## Typography

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| H1 | Geist | 48px | 600 | 48px | -2.4px |
| H2 | Geist | 40px | 600 | 48px | -2.4px |
| H3 | Geist | 32px | 600 | 40px | -1.28px |
| H4 | Geist | 24px | 600 | 32px | -0.96px |
| H5 | Geist | 14px | 500 | 20px | - |
| Body | Geist | 14px | 400 | 20px | - |
| Small | Geist | 12px | 400 | 16px | - |
| Label | Geist | 14px | 500 | 20px | - |
| Mono | Geist Mono | 14px | 400 | 20px | - |

## Spacing System

Base unit: **4px**
Scale: 2px, 4px, 8px, 10px, 12px, 24px, 32px, 48px, 64px

| Token | Value | Usage Count |
|-------|-------|-------------|
| `space.primitive.3` | 12px | 110x |
| `space.primitive.2` | 8px | 64x |
| `space.primitive.0.5` | 2px | 36x |
| `space.primitive.2.5` | 10px | 9x |
| `space.primitive.8` | 32px | 3x |
| `space.primitive.12` | 48px | 2x |
| `space.primitive.6` | 24px | 2x |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.primitive.md` | 6px | Buttons, cards (90x) |
| `radius.primitive.lg` | 64px | Tabs (50x) |
| `radius.primitive.sm` | 4px | Small elements (41x) |
| `radius.primitive.full` | 9999px | Pills (35x) |
| `radius.primitive.pill` | 100px | CTA buttons (4x) |
| `radius.primitive.circle` | 50% | Avatars (11x) |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow.primitive.sm` | rgba(0, 0, 0, 0.04) 0px 2px 2px 0px | Subtle elevation (60x) |
| `shadow.primitive.card` | Complex multi-layer shadow | Cards (10x) |
| `shadow.primitive.border-light` | rgb(235, 235, 235) 0px 0px 0px 1px | Button borders (2x) |
| `shadow.primitive.border` | rgba(0, 0, 0, 0.08) 0px 0px 0px 1px | Subtle borders (2x) |

## Key Components

### CTA Button (Primary)
- Background: #171717 (dark)
- Text: #ffffff (white)
- Border Radius: 6px (default) or 100px (pill)
- Height: 32px (header) or 40px (hero)
- Transition: 0.15s for all properties

### CTA Button (Secondary)
- Background: #ffffff or #fafafa
- Text: #171717
- Border: box-shadow border (1px #ebebeb)
- Border Radius: 6px or 100px

### CTA Button (Accent)
- Background: #0062d1 (brand blue)
- Text: #ffffff
- Border Radius: 6px
- Transition: 0.1s

### Navigation Button
- Background: transparent
- Text: #666666 → #171717 on hover
- Border Radius: 9999px (pill)
- Padding: 8px 12px
- Transition: 0.09s

### Tab
- Border Radius: 64px
- Height: 40px
- Min Width: 44px
- Padding: 0 16px

### Icon Button (Circular)
- Size: 40px × 40px
- Border Radius: 50%
- Background: #ffffff
- Shadow: card shadow

## Animations

### Keyframes (24 extracted)

**Navigation Menu**
- `scaleIn`: Scale 0.9 + rotateX(-30deg) → normal
- `scaleOut`: Normal → scale 0.95 + rotateX(-10deg)
- `enterFromRight/Left`: Translate ±200px → 0
- `exitToRight/Left`: Translate 0 → ±200px
- `fadeIn/fadeOut`: Opacity transitions

**Grid Responsive**
- `xsDisappear`, `smDisappear`, `smdDisappear`, `mdDisappear`, `lgDisappear`: Responsive fade out at 90%

**Accordion**
- `slideDown`: Height 0 → var(--radix-accordion-content-height)
- `slideUp`: Height var(--radix-accordion-content-height) → 0

**Special Effects**
- `reveal`: Transform translate(100%)
- `fluctuate`: Height animation 0 → 24px → 55.92px → 0
- `drawPath`: SVG stroke-dashoffset animation
- `hide/show`: Complex opacity + scale animation

### Transitions (observed)

| Transition | Count | Elements |
|------------|-------|----------|
| `all` | 743x | Most elements |
| `color 0.15s ease-in-out` | 36x | Paragraphs |
| `color 0.09s, background 0.09s` | 5x | Buttons, links |
| `border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s` | 5x | CTA links |
| `rotate 0.2s` | 3x | Chevrons |
| `box-shadow 0.2s` | 2x | Links, buttons |

## Coverage

| Category | Extracted | Blocked | Rate |
|----------|-----------|---------|------|
| CSS Variables | 80 | 0 | 100% |
| Colors | 15 | 0 | 100% |
| Typography | 15 | 0 | 100% |
| Keyframes | 24 | 0 | 100% |
| Components | 30 | - | 100% |
| Shadows | 4 | 0 | 100% |
| Radii | 7 | 0 | 100% |

**CORS-blocked sources**: None

## Preset Detection

| Signal | Pattern | Count |
|--------|---------|-------|
| CSS var prefix | `--ds-*` | 203 |
| CSS var prefix | `--geist-*` | 103 |
| CSS var prefix | `--tw-*` | 47 |
| CSS var prefix | `--accents-*` | 8 |
| Font family | Geist Sans | Yes |
| Font family | Geist Mono | Yes |

**Preset**: Geist (confidence: high)
**Secondary**: Tailwind CSS utilities detected

## Recommendations

1. **Typography**: Use the full heading hierarchy (H1-H5) with tight letter-spacing for large headings
2. **CTA Buttons**: Implement both 6px (default) and 100px (pill) border-radius variants
3. **Colors**: Include #ffffff as a key color for CTA button text
4. **Shadows**: Use the multi-layer card shadow for elevated components
5. **Animations**: Adopt the scaleIn/scaleOut pattern for dropdown menus
6. **Spacing**: Use 12px as the primary spacing unit (most common)
7. **Transitions**: Use 0.15s as the default transition duration
