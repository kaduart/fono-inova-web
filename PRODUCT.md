# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: parents and caregivers of children (roughly 0–12) in Anápolis, GO and the surrounding region, who arrive by searching Google for a specific symptom or concern — atraso na fala (late speech), suspeita de autismo, TDAH, dificuldade escolar, seletividade alimentar, teste da linguinha — and are trying to find a pediatric therapy clinic and book an evaluation.

Secondary: adults seeking voice therapy (fonoaudiologia — voz) and other adult-facing services.

## Product Purpose

Clínica Fono Inova is a multidisciplinary pediatric (and some adult) therapy clinic in Anápolis, GO. The site's job is to turn symptom-driven search traffic into booked evaluations/consultations, across a wide set of specialty and local-SEO landing pages, backed by a CRM/lead-tracking pipeline.

## Positioning

The differentiator is coordinated multidisciplinary care under one roof: fonoaudiologia, psicologia infantil, terapia ocupacional, fisioterapia, neuropsicologia, psicopedagogia, and musicoterapia are all delivered for the same child at the same clinic, instead of a family having to coordinate across separate solo-specialist providers. Confirmed by the user as the real mechanism, not just repo evidence.

## Operating Context

- Located in the Jundiaí neighborhood of Anápolis, GO.
- Heavy organic-search acquisition model: dozens of specialty pages (e.g. FalaTardiaPage, AutismoAnapolis, TdahPage, DificuldadeEscolarPage, DislexiaAnapolis) plus a local-SEO cluster strategy (city + specialty landing pages) and an articles/blog section, documented across the repo's SEO strategy docs (ESTRATEGIA_CLUSTERS_4_AREAS.md, ESTRATEGIA_SEO_VISTO_AMERICANO.md is unrelated — see note below).
- Leads flow through WhatsApp (wa.me link) and a CRM integration (VITE_CRM_API_URL, /api/leads/from-website) with GA4 and Meta Pixel tracking.
- Contact: WhatsApp (62) 99201-3573, contato@clinicafonoinova.com.br.
- Note: this repo also contains planning docs for an unrelated future project ("Visto Americano" visa-advisory site, planned on Next.js) that is not part of the current Vite/React codebase or product scope — do not conflate the two when reading repo-wide docs.

## Capabilities and Constraints

- Built with Vite + React 19, React Router, MUI + Radix/shadcn-style UI components, Tailwind CSS.
- Existing CRM lead pipeline, landing-page performance tracking, and analytics dashboard endpoints (see src/constants/index.js, src/services).
- Existing accessibility widget (accessibility-widget CDN script) and a manual "reader mode" toggle already wired into index.html — treat these as a standing accessibility commitment, not a new ask.
- Portuguese (pt-BR) only.

## Brand Commitments

- Name: Clínica Fono Inova.
- Existing category color coding by specialty in the landing-page system (fonoaudiologia, autismo, psicologia, aprendizagem, terapia_ocupacional, geográfica) — see LP_CATEGORIES in src/constants/index.js.
- Existing logo and clinic-facility photography assets under public/images (clinic exterior, reception, sala de espera, sala lúdica).

## Evidence on Hand

- Team credentials/bios are real (confirmed by user) — names, titles, and certifications shown for therapists (see Equipe.tsx) can be referenced as fact.
- No confirmation yet on testimonials, patient case outcomes, years in operation, or patient counts — treat any such claims as undecided; do not fabricate them.

## Product Principles

- Symptom-first discoverability: every major concern a parent might search for needs its own clear, findable answer.
- One coordinated team, not a referral network: the multidisciplinary structure is the trust argument, not just a service list.
- Local trust: Anápolis/Jundiaí specificity (address, local landing pages) is part of how the clinic earns credibility with nearby families.
- Low-friction path to contact: WhatsApp booking is the primary conversion action across specialty and local pages.

## Accessibility & Inclusion

An accessibility widget and reader-mode toggle are already integrated site-wide (see index.html). Preserve and build on this rather than treating accessibility as unaddressed.
