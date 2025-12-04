# TrueWorth AI - Design Guidelines

## Design Approach
**Hybrid Approach:** Drawing from Stripe's clarity + Linear's precision + Plaid's trustworthiness. This is a data-driven utility tool that must inspire confidence while remaining highly usable.

**Core Principle:** Clean, professional interface that puts pricing data front and center. Users need to trust the valuation instantly.

## Typography System
- **Primary Font:** Inter (Google Fonts) - clean, professional, excellent for data display
- **Accent Font:** Space Grotesk (Google Fonts) - for pricing displays and key metrics
- **Hierarchy:**
  - Hero/Main Headlines: text-5xl to text-6xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Subsections: text-xl to text-2xl, font-medium
  - Body Text: text-base, font-normal, leading-relaxed
  - Price Displays: text-4xl to text-5xl, tracking-tight, Space Grotesk
  - Data Labels: text-sm, font-medium, uppercase, tracking-wide

## Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-6 to gap-8
- Consistent vertical rhythm throughout

**Grid System:**
- Max container width: max-w-7xl
- Content areas: max-w-4xl for forms and detailed content
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
- Fixed top header with shadow-sm on scroll
- Logo left, navigation center, account/CTA right
- Height: h-16
- Links: text-sm font-medium with subtle hover underline

### Upload Flow (Critical)
- Large dropzone area (min-h-96) with dashed border
- Multi-image preview grid (grid-cols-2 md:grid-cols-3)
- Individual image cards with remove button overlay
- Progress indicators during upload
- Clear device model input field (large, prominent)

### Valuation Results (Hero Component)
- Large card with generous padding (p-8 to p-12)
- Price range display:
  - Primary price (median): text-6xl, Space Grotesk, center-aligned
  - Range below: text-xl with min/max clearly labeled
  - Condition score: Large circular progress indicator (0-100)
- Comparable listings table with sortable columns
- Price distribution mini-chart (simple bar/line visualization)

### Dashboard
- Stats cards grid showing:
  - Total valuations
  - Usage remaining (for freemium)
  - Average device value
  - Recent activity
- Card design: rounded-xl, p-6, shadow-sm
- Each stat: Large number (text-3xl) with label below (text-sm)

### Freemium Modal
- Centered overlay modal (max-w-md)
- Clear usage indicator (e.g., "4/5 valuations used")
- Simple pricing comparison (Free vs Pro)
- Single CTA button

### Forms
- Input fields: h-12, rounded-lg, border-2
- Labels: text-sm font-medium, mb-2
- Focus states: ring-2 with offset
- Error states: border red with helper text below

### Buttons
- Primary CTA: px-8 py-3, rounded-lg, font-semibold
- Secondary: Same size, outline variant
- Icon buttons: w-10 h-10, rounded-full for remove/close actions
- Implement own hover/active states (no additional treatment needed)

## Images

### Landing Page Hero
**Large hero image:** Full-width background showing hands holding various tech devices (phones, laptops, tablets) with subtle overlay. Image should feel authentic and trustworthy, not stock-photo-generic.
- Buttons on hero: Use backdrop-blur-md bg-white/10 treatment
- Hero height: min-h-[600px] with content vertically centered

### Trust Indicators
- Small device category icons throughout (use Heroicons)
- Example device photos in "How it works" section
- Authentic user testimonial photos if applicable (circular, small)

### Results Page
- Display user's uploaded device photos in a clean grid at top of valuation results
- Optional: Comparison device images from scraped listings

## Page Structures

### Landing Page (6 sections)
1. **Hero:** Large background image, headline "Know Your Device's True Worth", device input field, CTA
2. **How It Works:** 3-column grid (Upload → Analyze → Get Value)
3. **Features:** 2-column layout showcasing AI analysis + Market data
4. **Pricing:** Simple free vs pro comparison table
5. **Trust Indicators:** Stats row (devices valued, accuracy rate, data sources)
6. **Footer:** Quick links, contact, newsletter signup

### Upload Page
- Centered form (max-w-2xl)
- Device model input at top
- Large photo upload zone
- Clear instructions throughout
- Submit button only active when requirements met

### Results Page
- Full-width top section with valuation card
- Secondary sections: Comparable listings table, Price insights
- Save/Export options

### Dashboard
- Stats overview grid at top
- Valuation history table below
- Usage meter sidebar

## Key Principles
- **Data First:** Pricing information is always the largest, clearest element
- **Progressive Disclosure:** Show essential info first, details on demand
- **Trust Building:** Use authentic imagery, clear data sources, professional typography
- **No Clutter:** Generous whitespace, focused sections, minimal decoration
- **Scannable:** Clear hierarchy allows users to grasp value instantly

## Icons
Use **Heroicons** (outline variant for most UI, solid for filled states)

## Animations
**Minimal, purposeful only:**
- Smooth transitions on modal open/close
- Loading states for API calls (simple spinner)
- Success checkmark after upload
- NO scroll animations, parallax, or decorative motion