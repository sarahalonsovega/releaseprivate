---
target: CUELUM website (Home, VEXA, Curiosity Architecture, AMBLIA pages)
total_score: 19
p0_count: 2
p1_count: 2
timestamp: 2026-07-27T20-19-08Z
slug: site-home-vexa-curiosity-architecture-amblia-pages
---
Method: dual-agent (A: add92487fc0288282 · B: a5ff4a2de5a351ea7)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | NotifyForm shows a success state regardless of whether the email field is empty/valid; no loading/pending state |
| 2 | Match System / Real World | 3/4 | Per-division voice is coherent, but VEXA's 6-item service list overlaps semantically (Custom-Built vs Advisory) |
| 3 | User Control and Freedom | 2/4 | No breadcrumbs, no in-page jump nav on 9-screen-tall VEXA; no router, no deep links, no bookmarkable pages |
| 4 | Consistency and Standards | 3/4 | Tokens used correctly, but `01/02/03` numbering means different things in different sections (real sequence vs arbitrary list) |
| 5 | Error Prevention | 1/4 | Zero validation anywhere; VEXA's contact form never reads its own field values before "submitting" |
| 6 | Recognition Rather Than Recall | 3/4 | Nav is persistent and shows current page correctly |
| 7 | Flexibility and Efficiency | 1/4 | No shortcuts, no section jump-links, no collapse — despite the stated goal being fast scrolling |
| 8 | Aesthetic and Minimalist Design | 2/4 | Visually minimal but informationally dense — VEXA alone stacks 29 discrete text rows in sequence |
| 9 | Error Recovery | 0/4 | No error states exist anywhere in the form components |
| 10 | Help and Documentation | 2/4 | Not a major gap for this site type; partial credit for clear inline explanation copy |
| **Total** | | **19/40** | **Poor band — below the 20-32 "most real sites" range** |

## Anti-Patterns Verdict

**LLM assessment (Assessment A):** Yes — a design-literate reviewer would clock this as templated within ~10 seconds of scrolling VEXA or Curiosity Architecture. Not because the primitives are bad (the token system is unusually disciplined for this stage — real type scale, real motion tokens, a genuine ban on pill-shaped radii) but because of *rhythm*: the same centered-text-block-with-hairline-dividers pattern is reused 6-10 times per page, and the `01/02/03` numbered-eyebrow device is applied to both genuinely sequential content (the AI eras) and arbitrary lists (services, methodology) with identical styling — the textbook "numbers because it looks structured" tell.

**Deterministic scan (Assessment B):** Static regex scan of the JSX/CSS source (`detect.mjs`) found **0 findings** — the anti-pattern detector's static rules don't catch layout-repetition or numbered-eyebro-misuse, since those require holistic judgment, not pattern matching. However, the **browser-injected runtime detector** (measuring actual computed styles) did catch real issues the static scan missed:
- **Home hero**: `tight-leading` — line-height 1.02x (spec wants ≥1.3)
- **VEXA**: `all-caps-body` — `text-transform: uppercase` applied to 176 characters of body text (the companies marquee)
- **Curiosity Architecture**: `line-length` — ~91 characters/line on two elements (spec wants <80, hurts readability on the dense essay paragraphs Assessment A also flagged)
- **AMBLIA**: clean, no findings

**Where they agree:** Both assessments independently converge on Curiosity Architecture's paragraph density being a real readability problem — Assessment A calls it out qualitatively ("founder bio is the densest text block on the site"), Assessment B measured it quantitatively (91 char/line, 14% over the 80-char guideline).

## Overall Impression

The underlying system (type scale, spacing tokens, motion tokens, color) is genuinely well-built — better than most sites at this stage. The complaint isn't craft, it's *rhythm*: one section shape (centered heading → centered paragraph → hairline-divided list) carries the entire site, repeated with only the words changed, so scrolling VEXA or Curiosity Architecture feels like reading the same section six times. That is directly verifiable in the JSX (not just a vibe) and is exactly what's driving the "too dense, doesn't flow" feeling. Two issues are more serious than density, though: the VEXA contact form silently discards every field a prospect fills in, and the entire nav is not keyboard-operable.

## What's Working

1. **The design token system** (`public/tokens/*.css`) is disciplined and intentional — explicit bans on pill-radius and bounce/parallax motion, semantic type roles per font family. Most sites this early don't have this.
2. **Home page's division-card grid** (`HomeDivision` component) is the strongest section on the site — square photo crops, a restrained hover scale + color-shift, and it answers "premium, fast to scroll" better than any other page.
3. **VEXA's logo marquee** is a well-executed, low-cost CSS-only motion moment that breaks the vertical-stack monotony without resorting to a testimonial-carousel cliché.

## Priority Issues

**[P0] VEXA's contact form silently discards all user input** — `src/pages/VexaPage.jsx:114-122`
Why it matters: the six `TextField`s never wire up `value`/`onChange`; the submit button fires a blank `mailto:` link regardless of what was typed. This is the primary lead-capture mechanism for the enterprise consulting arm and it does not function — worse than no form, because it wastes a prospect's time right at the conversion moment.
Fix: wire fields to local state; either build the mailto with populated subject/body, or route to a real form backend.
Suggested command: `/impeccable harden`

**[P0] Nav links are not keyboard-operable** — `src/components/core/NavBar.jsx:16-23`
Why it matters: `NavLink` renders `<a onClick={...}>` with no `href` — confirmed via live accessibility-tree snapshot. Anchors without `href` drop out of the default tab order. This fails WCAG 2.1 SC 2.1.1 (Keyboard) for the primary nav, used on every page.
Fix: give each anchor a real `href` (even `#vexa`) and `preventDefault` in the click handler — `HomeDivision` in HomePage.jsx already does this correctly; NavBar should match it.
Suggested command: `/impeccable adapt`

**[P1] Repeated section rhythm is the literal mechanism behind "too dense, doesn't flow"** — `src/pages/VexaPage.jsx:50-107` worst offender
Why it matters: VEXA stacks eras → mission → quote → three-forces → paper-quote → effect → services — 6 of 7 sections share the identical centered-list-with-hairlines silhouette, ~29 discrete text rows with no skip path. This directly blocks "clients should be able to scroll through fast," since there's no way to skim; you either read everything or miss it.
Fix: vary layout shape between adjacent sections (alternate full-width text with 2-column/image-paired/card treatments); trim list lengths where items overlap (mission + effect could likely merge); add a lightweight in-page jump nav.
Suggested command: `/impeccable layout`

**[P1] `01/02/03` numbered eyebrows used as default scaffolding, not real sequence** — `VexaPage.jsx:25-34`, `CuriosityPage.jsx:15-19`
Why it matters: this is the most recognizable "AI/template default" tell on the site, and it's a UX cost too — the same magenta number means "sequential era" in one section and "arbitrary list item" in another, so the pattern never builds a reliable mental model.
Fix: keep numbering only for the genuinely sequential eras; switch services/methodology to unnumbered labels or bold lead-words.
Suggested command: `/impeccable typeset`

**[P2] Founder's photo is absent from the entire Curiosity Architecture page** — `CuriosityPage.jsx:82-94`
Why it matters: this is a personal-brand/thought-leadership page whose value proposition is "trust this specific person" — only abstract object photography is used sitewide; Sarah's face never appears next to her own 5-paragraph bio.
Fix: add one portrait near the "Sarah Alonso Vega" heading.
Suggested command: `/impeccable colorize` (imagery) or manual asset addition

**[P2] Effectively no mobile responsiveness** — `src/site.css:1-6` is the only breakpoint in the custom stylesheet, and it targets only the Home division grid
Why it matters: every other hardcoded multi-column inline grid (VEXA's `80px 1fr 2fr auto` row grid used for eras/mission/services, Curiosity's 3-col "why breadth," AMBLIA's two content grids) has no mobile fallback — on a real phone viewport these will overflow or crush to unreadable widths. This is likely the single largest concrete defect in the codebase.
Suggested command: `/impeccable adapt`

**[P3] Form components have no validation/error-state primitives** — `src/components/core/TextField.jsx`
Why it matters: lower stakes today, but blocks future form work (e.g., fixing the P0 VEXA form) since there's no `error`/`aria-invalid` prop to reach for.
Suggested command: `/impeccable harden`

**[P3] Detector-confirmed polish items**: Home hero line-height 1.02 (spec ≥1.3), VEXA marquee `text-transform: uppercase` on 176 chars of body text, Curiosity paragraphs running ~91 chars/line (spec <80).
Suggested command: `/impeccable typeset`

## Persona Red Flags

**Jordan (first-timer, lands cold on a division page via a shared link):** Gets no parent-brand framing beyond a small wordmark — VEXA's hero just says "Tailored intelligence you own" with nothing signaling CUELUM is a multi-division studio. The three divisions also have completely different registers (enterprise jargon vs. personal essay vs. parent-reassurance) under identical visual chrome — Jordan bouncing between VEXA and AMBLIA via nav may wonder if this is one company or three.

**Riley (stress-tester, tries empty/garbage input):** VEXA's form "succeeds" identically whether submitted blank or filled (P0 above). NotifyForm accepts garbage/empty email and shows success regardless. A basic keyboard-only nav pass fails outright (P0 above) — Riley can't navigate the site without a mouse.

**Casey (mobile, one-handed, on the go):** The single largest concrete defect — nearly every multi-column layout in the site (VEXA's era/mission/service rows, Curiosity's 3-col grid, AMBLIA's content grids) has zero mobile fallback. On a real phone these will overflow or crush to unreadable widths, and it'll happen on every division page, immediately.

## Minor Observations

- `App.jsx` sets `textAlign: "center"` on the app root, which pages then fight locally (VEXA's contact-form section has to override it, and still reads slightly off against the left-aligned form).
- "About" in the nav is a scroll-to-anchor hack back to Home, not a real page — could read as a dead end to someone expecting a dedicated About page.
- No router — one URL for the whole site, no deep links, no bookmarkable division pages, no per-page meta tags for SEO/social previews.
- `File 1.png` (VEXA glass architecture) is reused as both the Home division-card thumbnail and the VEXA "Three Forces" full-bleed background within one user journey.
- `--text-meta` (`rgba(255,255,255,0.4)` on black) is ~3.4:1 contrast, below WCAG AA 4.5:1 — used for footer links and era subtitles.
- The VEXA marquee has no `prefers-reduced-motion` guard, despite the motion token system otherwise being explicit about avoiding unnecessary movement.

## Questions to Consider

1. If VEXA, Curiosity Architecture, and AMBLIA are meant to feel like genuinely different divisions for genuinely different audiences (an enterprise buyer, a conference organizer, a worried parent), should they keep sharing one page template — or does serving three audiences that different actually require three distinct rhythms?
2. The VEXA contact form is the primary revenue-generating conversion point on the site and it currently discards everything a prospect types. How many real leads has this silently lost?
3. Is "scroll through fast" compatible with showing every list item, every era, every service, unconditionally expanded — or does hitting that goal require cutting content, not just restyling it?
