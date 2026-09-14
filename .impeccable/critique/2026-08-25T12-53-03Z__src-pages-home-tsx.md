---
target: todo o site (re-run pos-correcoes)
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 1
timestamp: 2026-08-25T12-53-03Z
slug: src-pages-home-tsx
---
Method: dual-agent (A: ae098fcc27280be23 · B: afa9de86b579007ff) — re-run after applying the prior critique's action plan

# Critique re-run: Clínica Fono Inova — Home + site-wide pattern

Same target as the prior run (`src/pages/Home.tsx`, cross-checked against `FonoaudiologiaAnapolis.tsx`, `AutismoAnapolis.tsx`, `FalaTardiaPage.tsx`, and shared chrome). No browser tool available — source-level re-assessment. **Mid-synthesis, Assessment A surfaced a new P0 that I verified and fixed before finalizing this report** (see below) — the heuristic table reflects the post-fix state, not the raw sub-agent score, and I say so explicitly rather than presenting stale numbers.

## What got fixed since the last run — verified, not assumed

- ✅ `BookingModal.jsx` crash: confirmed clean, proper `submissionStatus` state machine.
- ✅ Home's dead `<SEO>` tag: confirmed present and building into the bundle.
- ✅ Heading hierarchy: confirmed correct on every file checked, including the legacy anti-reference `FalaTardiaPage.tsx`.
- ✅ Redundant grids: confirmed `ServiceCards` import is gone from `Home.tsx`; the merge into one 16-card grid is real (not a partial/cosmetic change).
- ✅ Footer email: confirmed corrected.
- ⚠️ Specialty color consistency: **partially true.** `LP_CATEGORIES`/DESIGN.md were corrected, but that correction was never carried into the merged grid's own hover-border accent colors — see Priority Issues.

## New P0 found during this re-run, and already fixed

**Footer crashed the entire app on any page, on one click.** `Footer/index.jsx` destructured `scrollToSection` from props and called it directly in four `onClick` handlers ("Serviços," "Sobre Nós," "Depoimentos," "Contato"). `Layout/index.jsx` rendered `<Footer />` with zero props — `<Footer />` is the *only* place Footer is ever rendered, on every page. With no error boundary anywhere in the app, clicking any of those four links threw an unhandled `TypeError` and unmounted the whole React tree. This is unrelated to anything in the original critique or my earlier fixes — it looks like it was already there. I fixed it: `Footer` now defines its own `scrollToSection` (mirroring `Header`'s existing pattern — navigate to `/#id` if not already on Home), and I added a small hash-scroll effect to `Home.tsx` so cross-page links from both Header and Footer actually land on the right section instead of silently doing nothing. Verified with a clean build and confirmed `<Footer />` has no other call sites.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | `BookingModal`'s status states with `aria-live` are solid. |
| 2 | Match System / Real World | 3 | Copy fits the audience, but "Últimos horários disponíveis" / "Apenas 5 vagas para avaliação esta semana" are unverifiable scarcity claims per PRODUCT.md's own anti-fabrication stance. |
| 3 | User Control and Freedom | 3 *(was 1 pre-fix)* | Footer crash fixed during this run; cross-page section links now work via the same pattern as Header. |
| 4 | Consistency and Standards | 2 | The merged grid's hover-border colors don't follow the corrected Specialty Rainbow (Psicologia→pink instead of blue, Terapia Ocupacional→emerald instead of orange, Psicomotricidade and Autismo both→purple) — see Priority Issues. |
| 5 | Error Prevention | 3 | Form validates before submit, phone auto-formats, errors clear on edit. |
| 6 | Recognition Rather Than Recall | 3 | Clear nav labels; pain-point → CTA personalization still works well. |
| 7 | Flexibility and Efficiency | 3 | WhatsApp message pre-fill by concern/UTM is a genuine, working shortcut. |
| 8 | Aesthetic and Minimalist Design | 2 | 6-card pain grid + 16-card specialty grid is still a lot of near-identical cards before non-choice content — an accepted trade-off of preserving every internal link, not a new regression. |
| 9 | Error Recovery | 3 *(was 2 pre-fix)* | `BookingModal` already recovered gracefully; the Footer's crash-with-zero-recovery path is now closed. |
| 10 | Help and Documentation | 3 | FAQ, "sinais de alerta" boxes, accessibility widget remain adequate for this surface. |
| **Total** | | **29/40** | **Good — solid foundation, weak areas remain** |

No heuristics marked n/a.

## What's Working (confirmed, not re-asserted)

- `BookingModal`'s submit flow is genuinely robust now — state machine, focus trap, `aria-live`, popup-blocked fallback.
- Heading hierarchy is correct everywhere checked, including the documented legacy anti-reference page.
- The WhatsApp chat-replica popup remains unchanged and undamaged by any of the fixes — still the system's strongest asset.

## Priority Issues

**[P0 — fixed during this run] Footer crashed every page on click.** See above. Verified fixed with a clean build; no other `<Footer>` call sites exist.

**[P1] The merged specialty grid doesn't follow the color mapping I just corrected in DESIGN.md.** Concrete examples in the current grid: Psicologia's hover-border is `pink-400` (should be blue per the corrected Specialty Rainbow Rule), Terapia Ocupacional's is `emerald-400` (should be orange), and Psicomotricidade and Autismo-related cards both use `purple-400` (a direct collision). Important context: this pattern predates the merge — the *original* 9-card grid already used a decorative, per-card hover-border palette that was never actually governed by the icon-badge-based Specialty Rainbow Rule (e.g. Teste da Linguinha's hover was already amber, not fono's teal, before I touched anything). So this isn't a regression I introduced, and recoloring 16 cards' hover states to match a rule that was written for icon badges, not photo-grid borders, is itself a judgment call — not a clear-cut bug like the footer crash.
- **Suggested command**: `/impeccable colorize` — but I'd want your call on whether the hover-border palette should actually be folded under the Specialty Rainbow Rule, or documented as its own intentionally-separate decorative system, before touching 16 cards again.

**[P2] Unverifiable urgency copy.** "Últimos horários disponíveis" (Home) and "Apenas 5 vagas para avaliação esta semana" (`FalaTardiaPage.tsx`) read as manufactured scarcity — PRODUCT.md explicitly flags fabricated claims (testimonials, stats) as something future work must not invent. This is content, not layout, so I didn't touch it without checking first.
- **Suggested command**: `/impeccable clarify`

**[P2] Both major choice grids on Home still exceed the ≤4-option cognitive-load guideline** (pain-point selector: 6, merged specialty grid: 16). This is the disclosed, accepted cost of merging three redundant grids into one without deleting real internal links, not a new problem — flagging it again because it's still real, not because anything regressed.

**[P3] WhatsApp CTA copy varies without reason** across five separate buttons on Home ("Falar no WhatsApp," "Falar com especialista no WhatsApp," etc.) — no functional harm, minor pattern-recognition cost.

## Persona Red Flags

**Riley (stress tester)**: Was going to hit the footer crash within the first minute on any page — now fixed, but this is exactly the kind of one-click, zero-input-needed failure a stress tester finds instantly, and it shipped invisibly (no visual sign anything was wrong until clicked).

**Jordan (confused first-timer)**: Faces 6 pain-point cards, then one scroll later, 16 near-identical specialty cards whose accent colors don't map predictably to what they searched for — the "visually sort without reading" promise from the color-coding system is undercut by the hover-color drift noted above.

**Casey (distracted mobile user)**: The 16-card grid at `grid-cols-2` on mobile is roughly 8 rows of scrolling before reaching "Sobre" — real abandonment risk mid-scroll, an accepted trade-off of the merge decision.

## Minor Observations

- `Header/index.jsx` currently has **staged, uncommitted changes** (visible via `git diff --cached`) replacing the image wordmark with a text-based "FONO INOVA" + tagline, using literal `text-[15px]`/`text-[9px]`/`text-[10px]` sizes outside DESIGN.md's type ramp. This is not something I touched — it's the same external, concurrent editing pattern I've flagged several times this session. Worth knowing this is mid-flight elsewhere.
- `ServiceCards.jsx` confirmed still legitimately used by `LPAvaliacaoInfantil.tsx` — not orphaned by the Home.tsx cleanup.
- Home's own H1 is the institutional brand name, not a pain-led headline — defensible for SEO but a cooler emotional opener than the `-Anapolis` pages' pain-driven H1s. Not a defect, just an observation.

## Questions to Consider

- Should the hover-border palette on the merged grid actually follow the Specialty Rainbow Rule, or is it fine as its own separate decorative system — and if the former, is recoloring 16 cards worth doing now?
- Is "Últimos horários disponíveis" / "Apenas 5 vagas" defensible under the same fabrication standard PRODUCT.md applies to testimonials, or should it be softened/removed?
- Given the footer bug reached every page silently, is a top-level ErrorBoundary worth adding regardless of this specific fix, so a future prop-mismatch degrades instead of white-screening?
