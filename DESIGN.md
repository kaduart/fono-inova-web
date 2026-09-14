---
name: Clínica Fono Inova
description: Warm pediatric-therapy clinic site in Anápolis — Teal Esmeralda authority softened by pastel gradient blooms, a specialty rainbow, and a pixel-accurate WhatsApp chat replica as the conversion engine.
colors:
  primary-teal-esmeralda: "oklch(0.7 0.15 180)"
  secondary-azul-suave: "oklch(0.7 0.12 250)"
  accent-laranja-vibrante: "oklch(0.7 0.2 25)"
  whatsapp-green: "#16A34A"
  footer-teal-deep: "oklch(0.55 0.13 174.92)"
  slate-ink: "#0F172A"
  slate-body: "#475569"
  slate-mist: "#F8FAFC"
  slate-border: "#E2E8F0"
  alert-amber: "#854D0E"
  star-gold: "#FACC15"
typography:
  display:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  container-max: "1364px"
  container-px-mobile: "1rem"
  container-px-desktop: "2rem"
  section-y: "6rem"
  section-y-compact: "4rem"
  gap-card: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "#15803D"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.slate-body}"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
  card:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  icon-badge:
    backgroundColor: "{colors.primary-teal-esmeralda}"
    textColor: "#FFFFFF"
    rounded: "{rounded.2xl}"
    size: "56px"
---

# Design System: Clínica Fono Inova

## Overview

**Creative North Star: "A Primeira Mensagem"**

Fono Inova sells reassurance to a worried parent, and the whole site is built to feel like the moment right after you send the first WhatsApp message to someone who actually gets it — before the appointment, before the paperwork, just a warm "oi, tudo bem?" from someone who can help. That moment is made literal in the system's single most distinctive piece: a floating popup that reproduces a real WhatsApp conversation pixel-for-pixel (the actual `#075E54`→`#128C7E` header gradient, the `#E5DDD5` chat wallpaper, `#DCF8C6` sent-message bubbles), where "Amanda" types a scripted, UTM-aware greeting before revealing the CTA. Every other conversion action on the site — every button, the header's "Agendar," the floating accessibility button — funnels toward that same channel, and every primary CTA is WhatsApp's own green (`#16A34A`/`#15803D`), deliberately kept separate from the brand's Teal Esmeralda so the "talk to us now" action never gets lost among decorative color.

Around that core, the system reads as calm and approachable rather than clinical: soft slate-to-teal-to-cyan gradients wash every hero, with blurred color "blooms" (teal/cyan top-right, amber/orange left, primary/secondary bottom) doing the work a hard-edged illustration would do elsewhere. Headings are set in Poppins at a confident weight; body copy stays in plain, legible Inter. Each specialty — fonoaudiologia, psicologia, terapia ocupacional, psicopedagogia, freio lingual, psicomotricidade — gets its own accent color drawn from Tailwind's stock palette (teal, purple, emerald, pink, amber, indigo), so a parent scanning the service grid or the pain-point selector on the homepage can visually sort by what they're worried about before they've read a word.

**Confirmed anti-reference:** an earlier generation of roughly two dozen pages (the original `/fonoaudiologia`, `/psicologia`, `/fisioterapia` service pages and the first wave of funnel pages — `FalaTardiaPage`, `TdahPage`, `DislexiaPage`, `TeaPage`, and others) still builds on the untouched shadcn scaffold (`components/ui/button.jsx`, `card.jsx`): neutral gray, `rounded-xl` (12px) cards, flat `shadow-sm`. That generic look predates the current pastel/teal/rainbow system and is not the target — new work should follow the Home/`-Anapolis` pattern described below, not the shadcn defaults.

**Key Characteristics:**
- Teal Esmeralda (`--primary`) as the through-line brand color — badges, links, icon fills, section accents — with Azul Suave and Laranja Vibrante as its supporting pair in gradients and secondary accents.
- WhatsApp Green kept strictly separate from brand color: every conversion CTA is green, every decorative/brand moment is teal, and the two never swap roles.
- A specialty-to-color mapping (Tailwind stock hues) that lets parents visually sort services and pain points without reading.
- Soft pastel gradient hero backgrounds with blurred color-blob accents, rather than photography-led or flat-color heroes.
- The WhatsApp chat-replica popup: the system's signature component, and the clearest expression of the North Star.

## Colors

The palette pairs one custom, muted teal/blue/orange trio (defined as CSS custom properties, `oklch`) with Tailwind's stock slate, gray, and rainbow scales used directly in markup — the system is real and consistently reused, but it is not fully tokenized end to end.

### Primary
- **Teal Esmeralda** (`oklch(0.7 0.15 180)`, ≈ `#4ECDC4`): the dominant brand color — badges (`bg-primary/10` + `border-primary/20`), inline emphasis inside headlines and body copy, link color, icon-badge fills, the floating chat-launcher's gradient, and the Footer's dedicated deeper variant (Footer Teal Deep, `oklch(0.55 0.13 174.92)`, a separate hardcoded value in the same hue family rather than the same token).

### Secondary
- **Azul Suave** (`oklch(0.7 0.12 250)`, ≈ `#6C7CE0`): a supporting brand color, mainly seen blended into gradients (`from-primary/5 via-secondary/5 to-accent/5` CTA-band backgrounds) and as one of the ten `ServiceCards` icon-badge fills (Psicologia). Never carries a section on its own.

### Tertiary
- **Laranja Vibrante** (`oklch(0.7 0.2 25)`, ≈ `#FF6B6B`): the third brand primitive, used the same way as Secondary — gradient blends and one `ServiceCards` icon fill (Terapia Ocupacional) — plus the small red notification dot on the chat-launcher button.

### Functional
- **WhatsApp Green** (`#16A34A`, hover `#15803D`): the conversion color. Every "Falar no WhatsApp" / "Agendar" CTA across Home and every `-Anapolis` page uses this green, never the brand teal — a deliberate signal that this is the one action that matters. The chat-replica popup goes further and uses WhatsApp's own literal brand colors (`#075E54`→`#128C7E` header gradient, `#25D366` send/CTA green, `#DCF8C6` sent-bubble green, `#E5DDD5` wallpaper) to make the popup read as an actual WhatsApp screen, not a themed imitation.

### Neutral
- **Slate Ink** (`#0F172A`, slate-900): primary heading and emphasis text on light backgrounds throughout page content.
- **Slate Body** (`#475569`, slate-600): paragraph and secondary copy.
- **Slate Mist** (`#F8FAFC`, slate-50): the base hero/section background, layered under the gradient washes.
- **Slate Border** (`#E2E8F0`, slate-200): hairline dividers and card borders in page content.
- Header, Footer nav links, and BookingModal's form chrome use Tailwind's **gray** scale (gray-700/800/900, gray-100/200 borders) instead of slate for the same roles — a real, minor inconsistency between "page content neutral" (slate) and "chrome neutral" (gray), not a deliberate second system.

### Alert / Rating
- **Alert Amber** (`#854D0E` text on `#FEFCE8` bg, `#FEF08A` border): the "sinais de alerta" (warning signs) callout box repeated on every symptom-driven landing page.
- **Star Gold** (`#FACC15`, yellow-400): the filled rating stars ("4.9 no Google") repeated in every hero and testimonial block.

### Named Rules
**The Green-Is-Action Rule.** WhatsApp Green is reserved for conversion CTAs only. Brand teal, blue, and orange never appear on a button whose job is "talk to us now" — that role belongs to green alone, everywhere on the site.

**The Specialty Rainbow Rule.** Each clinical specialty owns one Tailwind stock hue, applied consistently to its icon badge, its cross-link card, and its `LP_CATEGORIES` entry: fonoaudiologia → teal, psicologia → secondary/blue ("Azul Suave"), terapia ocupacional → accent/orange ("Laranja Vibrante"), autismo → purple, aprendizagem/psicopedagogia → amber, psicomotricidade → pink, musicoterapia → indigo. *Corrected 2026-08-25: an earlier version of this rule stated autismo → blue and implied fonoaudiologia → purple; that was wrong — `LP_CATEGORIES`, Home's pain-point selector, and `AutismoAnapolis.tsx` all now agree on autismo → purple and fonoaudiologia → teal.* Two known, unresolved overlaps remain rather than a perfectly bijective mapping: `ServiceCards.jsx` uses `purple-500` for Freio Lingual (same family as autismo's purple) and `teal-500` for Avaliação Neuropsicológica (same family as fonoaudiologia's teal) — treat these as accepted overlaps, not new contradictions to silently "fix" by reassigning colors without re-auditing every live surface first.

## Typography

**Display/Headline Font:** Poppins (weights 400–700), loaded via Google Fonts alongside Inter.
**Body Font:** Inter (weights 300–700) — also the default font applied at the app root (`font-inter` on the outermost div in `App.jsx` and `Layout`).

**Character:** Poppins' geometric, slightly rounded bold gives headlines a friendly confidence without tipping into playful/childish; Inter carries everything else — body copy, labels, form fields, buttons — in a plain, easy-to-scan voice appropriate for an anxious-parent audience skimming for reassurance.

### Hierarchy
- **Display** (weight 700, `text-4xl`→`text-6xl` / 2.25rem–3.75rem, tight leading): the H1 on Home and every `-Anapolis` hero. Always Poppins, always includes an inline `text-primary` emphasis span on the key pain word or brand name.
- **Headline** (weight 700, `text-3xl`→`text-5xl` / 1.875rem–3rem): section H2s ("Como funciona," "O que as famílias dizem"). Always Poppins.
- **Title** (weight 700, `text-xl`/`text-2xl` / 1.25–1.5rem): card and step titles. Inconsistently applied — `ServiceCards`' titles opt into Poppins (`font-poppins font-semibold`), but most step/stat titles on Home and the `-Anapolis` pages default to Inter bold instead. Treat Inter bold as the safer default for new titles unless matching `ServiceCards` specifically.
- **Body** (weight 400, `text-base`/`text-lg`, `leading-relaxed`): paragraph copy, almost always `text-slate-600` on light backgrounds.
- **Label** (weight 600, `text-sm`): badge/pill text (`Fonoaudiologia Infantil em Anápolis`), benefit-list microcopy, footer column headers.

### Named Rules
**The Poppins-for-Structure Rule.** Only true H1/H2 section headings get Poppins. Everything smaller — including bold card titles — defaults to Inter unless a component (like `ServiceCards`) explicitly opts in.

## Layout

Pages are built from full-width `<section>` blocks, each centered by `container mx-auto` with `px-4` (16px) on mobile widening to `lg:px-8` (32px) on desktop; the root app shell caps overall width at `1364px` (`#root { max-width: 1364px }` in `App.css`), while the sticky header caps its own inner row at a very close but not identical `1355px` — a minor, likely-unintentional drift rather than two deliberate widths. Vertical rhythm is heavy: primary sections run `py-24` (96px), with `py-16` (64px) reserved for secondary/internal-linking bands near the bottom of a page.

The Home/`-Anapolis` hero pattern is consistent across every one of these pages: `min-h-screen` (or `min-h-[80vh]` for the inner content grid), a two-column `lg:grid-cols-2` layout (copy left, image right, order-reversed on mobile so the image leads), sitting on a layered background — a base `bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30` wash, plus two or three large `blur-3xl` color-blob divs (teal/cyan top-right, amber/orange left, primary/secondary bottom) positioned absolutely behind the content. Below the hero, sections alternate `bg-white` and `bg-gradient-to-br from-slate-50 to-white`, and grids step from 1 column on mobile to 2–4 columns at `sm`/`md`/`lg` with a consistent `gap-6`–`gap-8` (24–32px).

The one structurally different template is the dynamic `/lp/:slug` route (`LandingPage.jsx`), which pulls its own `landing-page-premium.css` stylesheet and an unrelated indigo/violet/emerald/amber/rose "Paleta Infantil Acolhedora" (`--lp-primary: #6366F1`, `--lp-secondary: #10B981`, `--lp-accent: #F59E0B`, plus rose/cyan/purple) with its own gradient and radius scale. It exists and renders real content (city/category landing pages driven by `src/data/landing-pages`), but its palette is scoped to that one file and is not part of the Teal Esmeralda system documented above.

## Elevation & Depth

Flat at rest, with Tailwind's stock **untinted gray** shadow scale escalating on hover — this system does not tint its shadows the way a more art-directed brand system would; `shadow-lg`/`shadow-xl`/`shadow-2xl` are used as-is. Cards and stat tiles typically start at `shadow-md`/`shadow-lg` and step up to `shadow-xl` on hover, frequently paired with `hover:-translate-y-1` or a border-color shift to `border-primary/20`/`border-primary/30`. Hero imagery and the final CTA card use the heaviest `shadow-2xl` at rest, since they're meant to read as the page's visual anchor rather than an interactive element.

### Shadow Vocabulary
- **Card hover lift** (`shadow-lg` → `shadow-xl` on hover, with `-translate-y-1`): the default interactive-card treatment (`ServiceCards`, testimonial cards, cross-link cards).
- **Anchor shadow** (`shadow-2xl`): hero images, the floating rating card overlapping the hero image, and the final-CTA white card on a tinted section background.
- **Chrome shadow** (`shadow-lg`/`shadow-xl`): the sticky Header, dropdown menus, and modals (`BookingModal`, the chat-replica popup).

### Named Rules
**The Untinted Shadow Rule.** Unlike the brand color system, shadows in this codebase are never colored or glowing — they are Tailwind's default neutral-gray scale throughout. Do not introduce a tinted/branded shadow without an explicit decision to change this.

## Shapes

Radius scales with a component's role rather than following a single fixed rule. **Pills and circles** (`rounded-full`) mark the highest-emphasis interactive elements: primary WhatsApp CTAs sometimes go full pill, icon-badge circles, the floating chat-launcher button, star ratings' avatar-style containers, and every badge/tag. **`rounded-xl`** (12px) is the workhorse for buttons, form inputs, and the outline "Ligar" secondary CTA. **`rounded-2xl`** (16px) is the standard for cards, icon-badge squares, and stat tiles. **`rounded-3xl`** (24px) is reserved for the largest showcase surfaces — the hero image container and the final-CTA white card. The Header's own "Agendar" button is a documented exception, sitting at `rounded-lg` (8px) rather than joining the `rounded-xl` button convention used everywhere else.

### Named Rules
**The Escalating Radius Rule.** Radius roughly tracks visual weight: `xl` for everyday buttons/inputs, `2xl` for cards, `3xl` reserved for a page's single largest showcase element. Don't apply `3xl` to a routine card or `xl` to a hero image — the scale is part of how the page signals what matters most.

## Components

### Buttons
- **Shape:** `rounded-xl` (12px) for the large marketing CTAs (`px-8 py-4`); the shadcn `button.jsx` primitive's own `rounded-md` default is only live on the legacy funnel pages, not the current pattern.
- **Primary (WhatsApp CTA):** WhatsApp Green fill (`#16A34A`), white text, bold, `shadow-lg` → `shadow-xl` on hover, sometimes `hover:scale-105`. Always paired with a `MessageCircle` icon and routed through `ButtonWhatsApp`, an unstyled wrapper — every visual property is supplied by the caller's `className`, so the green/rounded-xl look is a convention, not an enforced default.
- **Secondary (phone/outline):** transparent fill, `border-2 border-slate-300`, slate-700 text, `hover:bg-slate-50 hover:border-slate-400`. Same `rounded-xl`/padding as primary, always paired with a `PhoneCall` icon.
- **Header CTA:** the one deliberate outlier — smaller (`px-5 py-2.5`), `rounded-lg` (8px) instead of `rounded-xl`, otherwise the same green fill.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) for nearly all cards; `rounded-xl` sometimes appears on smaller icon-badge squares.
- **Background:** white on slate/gradient page backgrounds; never a flat gray card.
- **Shadow Strategy:** `shadow-md`/`shadow-lg` at rest, `shadow-xl` on hover (see Elevation & Depth); border hairline in `border-slate-100`/`border-gray-100`, shifting to `border-primary/20`–`/30` on hover.
- **Internal Padding:** `p-6` (24px) typical, `p-8`–`p-12` for the largest showcase cards (final CTA).
- **Icon Badge:** a colored square (`rounded-xl`/`rounded-2xl`, 48–80px, most commonly `w-14 h-14`/56px) centered above or beside the card title, filled with the specialty's mapped color at full saturation (service grids) or at `/10` opacity with a matching icon color (pain-point selectors, stat tiles).

### Inputs / Fields
- **Style:** `border-2 border-gray-200`, `rounded-xl` (12px), left-padded to make room for a leading icon (`User`, `MessageCircle`, an email emoji), used in `BookingModal`'s lead-capture form.
- **Focus:** border shifts to `border-green-500` with a `focus:ring-4 focus:ring-green-100` halo — matching WhatsApp Green rather than brand teal, since these fields feed the same conversion action.
- **Error:** `border-red-400` with a `bg-red-50` wash and an inline `⚠️` + red message below the field.

### Navigation
- **Header:** fixed/sticky white bar, `shadow-lg`, `border-b border-gray-100`. Logo swaps between a compact icon mark (mobile, `<xl`) and the full horizontal lockup (desktop). Nav links are gray-800, `hover:text-teal-600` (literal `teal-600`, not the `--primary` var). A "Serviços" dropdown lists the seven core specialties; the green "Agendar" button (see the Header CTA exception above) sits at the end of the row. Mobile collapses to a full-width slide-down panel with the same link list.
- **Footer:** always the dedicated Footer Teal Deep background (`oklch(0.55 0.13 174.92)`), white/`background`-opacity text, a four-column layout (brand blurb, specialties list, quick links, contact), and a hairline-bordered copyright strip at the bottom.

### WhatsApp Chat-Replica Popup (signature component)
`SpecialistPopup`, mounted globally in `App.jsx`, is the system's defining piece. A circular, pulsing, primary-gradient launcher button (bottom-right, with a red "1" notification dot) triggers — on 40% scroll depth, exit-intent, or a 10-second timer, whichever comes first, and only once per session — a modal that reproduces an actual WhatsApp conversation: the real WhatsApp header gradient and colors, a textured `#E5DDD5` wallpaper background, and a scripted, typing-indicator-paced message sequence from "Amanda" that adapts its opening lines to the visitor's `utm_campaign` (autism-specific copy, speech-delay-specific copy, or a generic greeting). Only after the scripted sequence completes does it reveal two CTAs — WhatsApp (`#25D366`) or "prefiro agendar direto" (opens `BookingModal`). This is the component every other conversion element on the site points back to.

### Pain-Point / Service Selector Grid
A recurring pattern (Home's "Você se identifica com alguma dessas situações?" and every specialty cross-link block): a grid of `rounded-2xl` cards, each keyed to one specialty color from the Specialty Rainbow, with a colored icon-badge, bold slate-900 title, and slate-600 description. Selecting a card can visually promote it (`scale-[1.02]`, deeper shadow, filled color background) and personalizes the WhatsApp CTA's pre-filled message to match the selected concern.

## Do's and Don'ts

### Do:
- **Do** keep every conversion CTA WhatsApp Green (`#16A34A`/`#15803D`) — never brand teal, blue, or orange — so the "talk to us" action stays visually singular.
- **Do** give each specialty its own fixed color from the Specialty Rainbow and reuse it identically across icon badges, cross-link cards, and category tags.
- **Do** build new hero sections on the slate→teal→cyan gradient wash with `blur-3xl` color-blob accents, matching Home and every `-Anapolis` page.
- **Do** set true section headings (H1/H2) in Poppins bold; leave body copy, labels, and (by default) card titles in Inter.
- **Do** keep shadows neutral gray and escalating on hover (`shadow-md/lg` → `shadow-xl`) rather than tinted or glowing.
- **Do** route every "talk to us" moment through the same WhatsApp channel the chat-replica popup establishes, keeping message copy warm and first-person ("Oi! ...").

### Don't:
- **Don't** build new landing pages on the plain shadcn `ui/button.jsx`/`card.jsx` defaults (neutral gray, `rounded-xl` at 12px, flat `shadow-sm`) — that's the legacy pattern from the original `/fonoaudiologia`-era and first-wave funnel pages, not the current system.
- **Don't** extend the `/lp/:slug` template's indigo/violet/rose "Paleta Infantil Acolhedora" (`landing-page-premium.css`) to any other page — it's an isolated palette scoped to that one dynamic route.
- **Don't** assign an already-claimed specialty color to a different specialty, or let a decorative brand color (teal/blue/orange) leak onto a conversion CTA.
- **Don't** use `rounded-3xl` outside the hero-image/final-CTA-card role, or `rounded-full` pills for routine secondary buttons — radius signals visual weight in this system.
- **Don't** treat the Header's `gray` neutral scale and the page content's `slate` neutral scale as interchangeable on purpose — they're a known, minor drift, not a two-scale system to build further on.
