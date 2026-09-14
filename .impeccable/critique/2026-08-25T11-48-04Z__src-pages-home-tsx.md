---
target: todo o site (Home + padrão -Anapolis + chrome compartilhado)
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-25T11-48-04Z
slug: src-pages-home-tsx
---
Method: dual-agent (A: ae51bc01734ca342e · B: a79fc87d3c11ddca2)

# Critique: Clínica Fono Inova — Home + site-wide pattern

Target: `src/pages/Home.tsx`, cross-checked against `FonoaudiologiaAnapolis.tsx`, `AutismoAnapolis.tsx`, `FalaTardiaPage.tsx`, and shared chrome (`Header`, `Footer`, `SpecialityPopUp`, `BookingModal`, `ServiceCards`). No browser/screenshot tool is available in this environment — both assessments worked from source (JSX/Tailwind/MUI) and DESIGN.md's documented tokens, not rendered screenshots. I additionally hand-verified the two claimed P0 defects and cross-referenced four separate color-mapping sources myself before including anything below.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | `BookingModal`'s "Enviando..." spinner never resolves on the crash path (see P0 below) — user is left watching a stuck button. |
| 2 | Match System / Real World | 2 | "Amanda — Fono Inova" / "Online agora" with a live-pulse dot simulates a real person online, when it's a scripted, UTM-branching sequence. |
| 3 | User Control and Freedom | 2 | The chat popup fires on a 10s timer OR 40% scroll OR exit-intent (first to trigger), with only a one-session `sessionStorage` opt-out — it returns fresh every new session. |
| 4 | Consistency and Standards | 2 | Heading hierarchy breaks on `-Anapolis` pages (see P1 below), and specialty accent colors contradict each other across 4 different sources in the codebase (see Design Specificity Verdict). |
| 5 | Error Prevention | 1 | `BookingModal.jsx:97` calls `setCrmStatus('sending')` — no such state or setter exists in the file. This throws inside the primary "Agendar" submit handler, before the CRM/WhatsApp redirect runs. |
| 6 | Recognition Rather Than Recall | 3 | Genuinely good: selecting a pain-point card on Home rewrites the WhatsApp CTA's pre-filled message to match — the user never has to re-explain their concern. |
| 7 | Flexibility and Efficiency | 1 | No accelerators; picking a pain-point still routes to the same generic WhatsApp CTA instead of deep-linking to the matching specialty page/content. |
| 8 | Aesthetic and Minimalist Design | 2 | Home stacks three overlapping choice grids (6, 9, and 9 options) before reaching any non-choice content — redundant, not minimal. |
| 9 | Error Recovery | 2 | Field-level validation errors are well-designed (red border + inline ⚠️ text), but the booking-modal crash path surfaces nothing to the user at all — total silence. |
| 10 | Help and Documentation | 3 | `/faq` is linked and reachable from Home; adequate for a Persuade-mode marketing site. |
| **Total** | | **20/40** | **Acceptable — significant improvements needed before users are happy** |

No heuristics were marked n/a; all ten meaningfully applied to this surface.

## Design Specificity Verdict

**Qualitative read**: The system is genuinely product-specific exactly where it should be — the WhatsApp chat-replica popup, the pain-point language ("Meu filho fala pouco ou quase não fala"), and the warm reassurance copy ("Nem todo atraso é algo grave," "Você não está sozinha") could not be dropped into an unrelated local business unchanged. But the supporting shell around that core — gradient-blob heroes, stat tiles, 3-step "Como funciona," testimonial cards — is templated boilerplate repeated near-verbatim across Home and every `-Anapolis` page. That's a reasonable trade for an SEO page factory, but it means most of any given page's *pixels* are generic marketing scaffolding wrapped around one distinctive core feature.

**Deterministic scan**: The bundled detector found 11 findings across 4 of the 9 files scanned (5 clean): 4× `ai-color-palette` (purple/violet gradient usage — Home.tsx and AutismoAnapolis.tsx), 4× `bounce-easing` (SpecialityPopUp.tsx, FalaTardiaPage.tsx), 2× `design-system-font-size` (10px text below the DESIGN.md type ramp), 1× `design-system-color` (an undocumented `rgba(66,153,225,0.5)` glow). Assessment B's own contextual review found most of these to be weak or outright false positives: the "bounce" hits are either a custom slow 5px float (not an elastic overshoot) or a deliberate WhatsApp-style "typing…" dot animation — skeuomorphic mimicry of the real app, not AI slop. No visual overlay could be shown — this environment has no browser/screenshot tool, so there is no user-visible overlay for this run.

**What neither assessment caught, that I verified myself**: I cross-referenced all four places in the codebase that assign a color to a clinical specialty, and they contradict each other for the *same* specialty:
- `Home.tsx`'s pain-point cards: autismo → **purple**, atraso na fala/"3+ anos" → **blue**
- `AutismoAnapolis.tsx` (the dedicated autism page) itself: **purple** — consistent with Home's pain-point mapping
- `constants/index.js`'s `LP_CATEGORIES` (the source of truth for the CRM/landing-page tracking system): autismo → **`#3B82F6` blue**, fonoaudiologia → **`#8B5CF6` purple**
- `ServiceCards.jsx`'s icon badges: fonoaudiologia → **teal** (`bg-primary`), freio lingual → **purple** (`bg-purple-500`)

So fonoaudiologia is teal in one place and purple in another; autismo is purple in two places and blue in a third. This isn't a stylistic nuance — it's four different, unreconciled "systems" that happen to coexist. (Note: my own DESIGN.md, written in an earlier session, stated a single clean "Specialty Rainbow Rule" — that rule was an oversimplification of what's actually inconsistent ground truth. Flagging that as my own error to correct, not just the codebase's.)

## Overall Impression

The site's single best idea — the WhatsApp chat-replica popup that personalizes itself to a parent's specific worry — is executed with real craft and product understanding. But that idea is surrounded by a primary conversion path that silently breaks (`BookingModal`), a homepage whose own SEO tag is accidentally commented out (undermining the entire SEO-acquisition strategy the rest of the repo is built around), and a specialty-color system that was never actually unified despite four independent attempts to assign one. The biggest opportunity is fixing the two silent breakages first — neither is a "design" problem in the taste sense, but both directly undercut the site's stated purpose (convert leads, rank in search) more than any spacing or hierarchy issue could.

## What's Working

- **Pain-point → CTA personalization** (`Home.tsx`, the `painPoints` selector): selecting a card rewrites the WhatsApp pre-filled message to match the parent's actual concern. This is a genuinely well-executed pattern that reduces the emotional burden of a worried parent having to re-explain themselves.
- **The WhatsApp chat-replica popup's visual fidelity**: real WhatsApp colors, wallpaper, and bubble styling make the conversion channel instantly recognizable and lower-friction than a generic contact form — this is the system's signature move and it earns that status.
- **Specific, empathetic reassurance copy** on the `-Anapolis` pages ("sem julgamentos," "Você não está sozinha") — this reads as genuine audience understanding, not generic clinic boilerplate.

## Priority Issues

**[P0] Booking modal crashes on submit — the primary "Agendar" conversion path is silently broken**
- **Why it matters**: `BookingModal.jsx:97` calls `setCrmStatus('sending')`, a setter that doesn't exist anywhere in the file (confirmed via grep — zero matches, and via `eslint`'s `no-undef` rule). This throws inside `handleSubmit`, before the CRM lead submission or WhatsApp redirect executes. Every visitor who fills out the booking form and hits submit almost certainly hits a dead end with no error shown — they just watch "Enviando..." forever. For a site whose entire purpose is converting worried parents into booked consultations, this is the single most damaging defect found.
- **Fix**: Remove the dead `setCrmStatus` call, or add the missing `useState` for it if status tracking was actually intended. Then verify the full submit → CRM → WhatsApp-redirect path end-to-end.
- **Suggested command**: `/impeccable harden`

**[P0] Home's `<SEO>` tag is accidentally disabled by a malformed comment**
- **Why it matters**: `Home.tsx:1289` opens a JSX comment with `{/* ... ` but closes it with `-->` instead of `*/}`. I traced the actual scope: the comment doesn't close until line 1300's `*/}`, silently swallowing the entire `<SEO title=... schema={schemaHome} />` component in between. The homepage — the page every SEO strategy doc in this repo is built to funnel traffic toward — currently ships with no per-route title/description/schema override. This is invisible in the browser (index.html's static fallback title still shows) but real for search engines and social shares.
- **Fix**: Replace `-->` with `*/}` on line 1289 to close the comment correctly, restoring the `<SEO>` component.
- **Suggested command**: `/impeccable harden`

**[P1] The specialty→color mapping contradicts itself across four separate sources**
- **Why it matters**: see the Design Specificity Verdict above for the full evidence. A parent who sees autismo coded purple on Home and on `AutismoAnapolis.tsx`, then later encounters it coded blue via the CRM/LP tracking system's category color, gets no consistent visual language to learn — this is a Consistency & Standards failure (Heuristic 4), and it means the "specialty rainbow" the brand has half-built isn't actually reliable yet.
- **Fix**: Pick one canonical specialty→color mapping (I'd anchor it to `ServiceCards.jsx`, since it's the most visible/complete cross-specialty surface) and propagate it to `Home.tsx`'s `painPoints`, every `-Anapolis` page's accent color, and `constants/index.js`'s `LP_CATEGORIES`. Re-run `/impeccable document` afterward so DESIGN.md's "Specialty Rainbow Rule" reflects the corrected, actually-true mapping.
- **Suggested command**: `/impeccable colorize`

**[P1] Heading hierarchy is broken/duplicated across the `-Anapolis` page family**
- **Why it matters**: In `AutismoAnapolis.tsx:68`, the small pill badge ("Suporte para Autismo (TEA) em Anápolis") is the page's actual `<h1>`, while the large, visually-dominant headline ("Você Suspeita que Seu Filho Pode Ter Autismo?") is only an `<h2>` — confirmed by direct read. `FonoaudiologiaAnapolis.tsx` has the opposite problem: both the badge *and* the headline are `<h1>` — two H1s on one page. For a site whose whole acquisition strategy is organic search, mismatched heading semantics directly undermine SEO relevance signals and break screen-reader heading navigation (Persona: Sam).
- **Fix**: Standardize on exactly one `<h1>` per page — the large visual headline, not the eyebrow badge — across every `-Anapolis` and funnel page.
- **Suggested command**: `/impeccable typeset`

**[P1] Home front-loads three overlapping choice grids before any non-choice content**
- **Why it matters**: the pain-point selector (6 options), the "Especialidades em Anápolis" grid (9), and the `ServiceCards` grid (9) all ask the same underlying question — "which concern/specialty is this about?" — in three different visual formats before the visitor reaches anything that isn't a decision. Combined with the Header's own 7-item "Serviços" dropdown, a first-time visitor faces the same choice four times. This fails the Cognitive Load Checklist's chunking (≤4/group) and minimal-choices (≤4/decision) items outright, and risks decision fatigue exactly when the goal is a fast path to WhatsApp.
- **Fix**: Pick one canonical specialty/concern selector for Home (the pain-point grid is the strongest candidate — it already personalizes the CTA) and either cut the other two or clearly demote them to a secondary "browse all specialties" section further down the page.
- **Suggested command**: `/impeccable distill`

## Persona Red Flags

**Jordan (Confused First-Timer)**: Lands on Home, and within 10 seconds (worst case) a full-screen modal interrupts before the hero is even read — the chat popup's timer trigger fires regardless of whether Jordan has processed anything yet. Once past that, Jordan faces three separate 6-9 item grids (see P1 above) before reaching a single clear next step, and if Jordan ever notices "Amanda... Online agora" is scripted rather than a real person, the trust built by the warm copy takes a direct hit.

**Casey (Distracted Mobile User)**: On `FalaTardiaPage.tsx`, the fixed bottom WhatsApp bar and the scroll/exit-intent chat popup can both be on-screen competing for the same thumb-reachable space at once. The `AutismoAnapolis.tsx` heading-hierarchy bug (badge-as-H1) means anyone quick-scanning headings — sighted skimmers and screen-reader users alike — gets misled about what the page is actually about.

**Sam (Accessibility-Dependent User)**: Must complete `AccessibilityWizard`'s full 5-step diagnostic questionnaire ("Você possui alguma deficiência visual?", then auditory, then motor, then cognitive, then a summary) before a single preference — even just larger text — takes effect. This directly contradicts PRODUCT.md's own stated "standing accessibility commitment," and the broken H1 hierarchy on `-Anapolis` pages breaks Sam's heading-based screen-reader navigation specifically.

## Minor Observations

- Header's "Agendar" CTA sits at `rounded-lg` while every other button on the site uses `rounded-xl` — DESIGN.md documents this as a known, accepted exception, so this is a note, not a new finding.
- Footer shows `contato@fonoinova.com.br`; `constants/index.js` and Home's own copy use `contato@clinicafonoinova.com.br` — likely a stale/incorrect domain in one place.
- `ServiceCards.jsx` embeds full per-service SEO metadata objects (title/description/keywords) that are never wired into an actual `<SEO>` tag on that route — dead data, low cost but worth a cleanup pass.
- `Home.tsx` reuses the identical `neuro.jpeg` image for both the Neuropediatria and Avaliação Neuropsicológica service cards — a missed differentiation opportunity, not a bug.
- Two of the detector's four `bounce-easing` hits are the same custom `bounce-slow` keyframe referenced from two lines — treat as one finding, not two, when prioritizing.

## Questions to Consider

- If "Amanda" is a script, why simulate a live "Online agora" presence indicator instead of just being honest about typical response time?
- With four different color-to-specialty mappings already in the codebase, was there ever a single source of truth, or did each page/component invent its own independently over time?
- Given the booking-modal crash sits directly in the primary conversion path, has this flow ever been tested end-to-end since `setCrmStatus` was introduced?
- Why does the one tool meant to help users with disabilities make them answer the most questions of anyone on the site before it helps them?
