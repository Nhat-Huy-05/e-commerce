---
name: NextCommerce
colors:
  surface: '#faf8ff'
  surface-dim: '#d4d9ee'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e2e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#151b2a'
  on-surface-variant: '#46464c'
  inverse-surface: '#2a3040'
  inverse-on-surface: '#edf0ff'
  outline: '#77767d'
  outline-variant: '#c7c6cc'
  surface-tint: '#5a5e6e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#171b29'
  on-primary-container: '#808395'
  inverse-primary: '#c3c5d9'
  secondary: '#4b39e6'
  on-secondary: '#ffffff'
  secondary-container: '#6557ff'
  on-secondary-container: '#fbf7ff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410006'
  on-tertiary-container: '#e94b50'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe1f6'
  primary-fixed-dim: '#c3c5d9'
  on-primary-fixed: '#171b29'
  on-primary-fixed-variant: '#424656'
  secondary-fixed: '#e3dfff'
  secondary-fixed-dim: '#c4c0ff'
  on-secondary-fixed: '#120068'
  on-secondary-fixed-variant: '#3619d4'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b0'
  on-tertiary-fixed: '#410006'
  on-tertiary-fixed-variant: '#92011a'
  background: '#faf8ff'
  on-background: '#151b2a'
  surface-variant: '#dce2f7'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.025em
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  price-lg:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  price-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  gutter-mobile: 1rem
  margin: 1.5rem
  margin-desktop: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an **Editorial Commerce** aesthetic for high-end electronics, computing, and acoustic technology tailored for the Vietnamese market. Rejecting typical saturated, banner-heavy e-commerce patterns, the aesthetic merges the restrained rigor of Swiss graphic modernism with the refined pacing of high-fashion print monographs.

### Brand Persona & Tone
- **Curated & Authoritative:** Treats consumer hardware, audiophile gear, and creative tools as industrial art. The interface functions as an exhibition catalogue rather than a bargain bin.
- **Architectural & Intentional:** Rooted in disciplined rule systems, hairline dividers, asymmetric column structures, and generous negative space that honors hardware engineering.
- **Dynamic Modernity:** Expresses technical speed and contemporary prestige through an electric violet interactive thread, punctuated by tactile micro-interactions and sharp typographic hierarchy.

### Creative Direction: Editorial Commerce
- **Structural Lines over Cards:** Rely on crisp structural borders (`1px` hairline rules) and background shifts rather than floating soft-pill cards.
- **Typography as Architecture:** Extreme typographic scale contracts—monumental headlines juxtaposed with compact, monospaced or tabular metadata and prices.
- **Photography Dominance:** Silhouetted hardware, full-bleed spatial mockups, and monochromatic environments grounded by warm bone paper-like backdrops.

## Colors

The palette operates on stark typographic contrast, warm bone backgrounds, and surgical accent hits:

- **Primary (`#121624` - Deep Ink Navy):** The structural backbone. Applied to all high-contrast typography, primary buttons, borders, and brand marks. Replaces harsh synthetic pure black with an inky, deep charcoal navy.
- **Secondary (`#5B4CF5` - Electric Violet):** Reserved strictly for interactive engagement—primary conversion funnels, active navigation pills, hover highlights, and active audio/tech indicators.
- **Tertiary (`#E5484D` - Restrained Carmine Red):** High-urgency micro-moments only: discount tags, flash sale counters, stock alerts, and destructive actions. Never used as large fill backgrounds.
- **Success (`#10B981` - Mint Emerald):** In-stock notifications, authenticated warranties, and order completion receipts.
- **Neutrals & Surfaces:**
  - `Surface Base`: `#FFFFFF` (pure white for crisp photographic isolation).
  - `Surface Canvas`: `#FBFBFA` (warm off-white foundation that eliminates eye strain).
  - `Surface Subdued`: `#F4F4F2` (editorial spec blocks, spec sheets, table headers).
  - `Border Hairline`: `#E7E8EC` (subtle spatial partition rules).
  - `Border Structural`: `#D3D5DE` (active structural boundaries and form strokes).
  - `Text Muted / Secondary`: `#6C7284` (metadata, technical specs, breadcrumbs).

## Typography

The typographic hierarchy juxtaposes modern, geometric sans-serif structural weights with a disciplined monospaced family for technical spec readouts and Vietnamese Dong currency representations.

### Font System & Role Assignment
- **Primary Typeface (Plus Jakarta Sans):** Handles headlines, body copy, and UI calls to action. Offers balanced diacritics rendering for Vietnamese tone marks (`ả`, `ã`, `ắ`, `ặ`, `ệ`, `ộ`) without vertical clipping.
- **Technical & Commerce Monospace (JetBrains Mono):** Exclusively designated for SKU codes, technical specifications, tabular data grids, stock counters, and currency displays (`18.490.000 ₫`). The monospaced numerals ensure rock-solid baseline alignment across comparative commerce tables and cart line items.

### Vietnamese Typographic Considerations
- Diacritic accents require open line heights. `line-height` must not fall below `1.25x` on display typography and `1.5x` on body copy to prevent accent mark collision.
- `label-caps` must use `text-transform: uppercase` cautiously on long Vietnamese phrases to maintain natural readability; apply primarily to single-word badges (`MỚI`, `HOT`, `PRO`, `CHÍNH HÃNG`).

## Layout & Spacing

The layout model is anchored by an editorial 12-column grid featuring asymmetric spanning and clean grid-line bounding.

### Grid & Canvas Structure
- **Desktop (1280px+):** 12-column fluid grid, `max-width: 1440px`, centered with `margin-desktop: 3rem` (48px) and `gutter-desktop: 2rem` (32px).
- **Tablet (768px – 1279px):** 8-column layout, `margin: 1.5rem` (24px), `gutter: 1.5rem` (24px).
- **Mobile (< 767px):** 4-column layout, `margin-mobile: 1.25rem` (20px), `gutter-mobile: 1rem` (16px).

### Editorial Layout Patterns
- **Hero Asymmetry:** 7:5 or 8:4 column split. Major product photography anchors the wide column; high-contrast headline, technical specifications ticker, and purchase trigger stack within the narrower column.
- **Magazine Index Grid:** Category listings eschew rounded tiles in favor of full-width rows bordered by `1px` horizontal rules with left-aligned typographic labels, dynamic hover image previews, and right-aligned product counts.
- **Rhythm & Padding:** Component spacing adheres strictly to an 8px base rhythm (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 40px). Negative space between editorial feature blocks expands to `4rem` (64px) to `6rem` (96px) on desktop to preserve exhibition-level breathing room.

## Elevation & Depth

This design system deliberately eschews blurred multi-stop drop shadows and generic floating cards in favor of **structural line boundaries, tonal shifts, and tactical surface stepping**.

### Depth Techniques
1. **Low-Contrast Hairlines:** Spatial separation is established using a strict `1px` border system (`#E7E8EC` default, `#121624` for focused or featured states).
2. **Surface Layering (Tonal Stepping):**
   - Canvas background: `#FBFBFA`
   - Active section container / Product card back: `#FFFFFF`
   - Spec tables / Technical callouts: `#F4F4F2`
   - Inverted focus zone / Editorial dark mode blocks: `#121624` with `#FFFFFF` text.
3. **Hard Edge Shadows (Interactive States Only):** For floating cart drawers, hover previews, and quick-view modals, depth is executed with minimal, razor-sharp offset shadows rather than soft clouds:
   - `elevation-modal`: `0 12px 32px -4px rgba(18, 22, 36, 0.08), 0 2px 6px 0 rgba(18, 22, 36, 0.04)`
   - `elevation-hover`: `0 4px 12px -2px rgba(18, 22, 36, 0.06)`

## Shapes

The design system enforces a **Soft (Level 1)** geometric shape language. Sharp precision reflects high-grade industrial tech hardware: machined aluminum, cut optical glass, and minimalist silicon wafers.

### Shape Geometry Rules
- **Base Components (Inputs, Buttons, Badges):** `4px` (`0.25rem`) corner radius. Maintains structural discipline without appearing brittle.
- **Containers & Cards:** `4px` or crisp square `0px` when flush against grid rules. Large modal containers max out at `8px` (`0.5rem`).
- **Pills / Status Chips:** Restricted to small circular indicator dots (`50%`) and select micro-tags (`4px` radius).
- **Dividers & Strokes:** Fixed `1px` solid hairlines across all layout divides.

## Components

### Buttons & Interactive Triggers
- **Primary CTA:** Deep Ink Navy (`#121624`) background, pure white text, 4px radius, `font-weight: 600`. Hover state transitions to Electric Violet (`#5B4CF5`) in 150ms.
- **Direct Cart / Instant Buy:** Electric Violet (`#5B4CF5`) background with crisp white typography.
- **Secondary CTA:** Pure white background, `1px` structural border (`#121624`), `#121624` text. On hover, background shifts to `#F4F4F2`.
- **Text Link CTA:** Inline editorial link underlined with a `1px` offset stroke; transforms to Electric Violet on interaction with an arrow glyph (`→`).

### Product Cards (Editorial Specimen Card)
- **Structure:** Zero drop shadow in resting state. Bordered by `1px` `#E7E8EC` hairline or sitting on a solid `#FFFFFF` island surrounded by `#FBFBFA`.
- **Media Frame:** Minimum 1:1 or 4:5 aspect ratio with hardware silhouetted on a neutral canvas.
- **Content Hierarchy:**
  1. Top metadata: Category / Brand in `label-caps` (`#6C7284`).
  2. Headline: Product Name in `title-md` (`#121624`), clamp to 2 lines max.
  3. Key spec ticker: Single-line monospaced hardware highlights (e.g., `M3 MAX · 36GB · 1TB`).
  4. Footer: Tabular formatted VND price (`price-md`) in `JetBrains Mono` paired with a compact square quick-add button (`+`).

### Category Index & Navigation Rules
- List-based interactive index featuring large editorial titles (`headline-md`). Hovering any category reveals a floating high-resolution product preview thumbnail while the item title shifts right by 8px, bounded by top and bottom `1px` border lines.

### Inputs & Form Controls
- **Text Inputs:** Background `#FFFFFF`, border `1px` `#D3D5DE`, text `#121624`, radius 4px. Focus state triggers a clean `1px` `#5B4CF5` ring with zero blur outline.
- **Checkboxes & Radios:** Sharp 2px radius for checkboxes, circle for radios. Checked state fills with `#121624` or `#5B4CF5` with an instant, crisp tick icon.

### Status Badges & Deal Tags
- **Authentic Warranty / Stock:** Tinted mint badge (`#10B981` at 10% opacity) with solid `#059669` label text in `label-caps`.
- **Flash Sale / Promotion:** Restrained Carmine Red outline (`1px` `#E5484D`) on `#FFFFFF` with red text (`-15%`, `ƯU ĐÃI GIỚI HẠN`).

### Technical Specification Drawer
- Dual-column tabular display. Left column: spec attribute (`JetBrains Mono`, `body-sm`, `#6C7284`). Right column: spec value (`Plus Jakarta Sans`, `body-sm`, `#121624`). Interleaved rows alternating between `#FFFFFF` and `#F4F4F2`.