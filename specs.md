### primary pages

1. `/` — Home
1.5. `/about` — in home page redirect to about section
2. `/vexa` — VEXA
3. `/curiosity architecture` — CURIOSITY ARCHITECTURE
4. `/amblia` — AMBLIA
5. `/terms-of-use` — Terms (only accesible from the footer)
6. `/privacy` or `/privacy-policy` — Privacy  (only accesible from the footer)

### Static visual language

- Predominantly black or near-black surfaces.
- High-contrast white typography.
- Large, condensed editorial display type.
- Thin rules, borders, and modular grid divisions.
- Pill or outlined buttons rather than heavy filled controls.
- Atmospheric full-bleed photography: night landscapes, abstract fluid textures, deep magenta and pink/red highlights.
- Sparse use of color outside image assets.
- Dense oversized typography balanced by large empty fields.

## Motion

- Use transforms and opacity.
- Route transition: 450–700 ms.
- Line reveal: 650–900 ms.
- Hover transitions: 180–280 ms.
- Parallax displacement: no more than 4–12vh.
- Marquee: 30–60 s linear loop.
- Respect `prefers-reduced-motion` by disabling parallax, WebGL movement, count-ups, and auto-moving marquees.
- Do not hijack scrolling.

## Responsive system

- Desktop: 12-column grid, max content width around 1500 px.
- Tablet: reduce image overlaps and sticky sequences.
- Mobile: single-column reading order, 44 px minimum targets, inline media instead of hover previews, swipeable or stacked cards.

## Technical requirements

- Use **[NEXT.JS/ASTRO]** with TypeScript.
- Define design tokens with CSS custom properties.
- Use one main motion library only.
- Use Embla or an equivalent accessible carousel.
- Lazy-load below-fold media.
- Provide AVIF/WebP responsive images.
- Provide a poster/fallback for all canvas and video sections.
- Add keyboard navigation and focus management to menus, modals, accordions, filters, and sliders.
- Add semantic metadata and Open Graph tags.

## Reusable components

Create typed, reusable components rather than page-specific duplication:

- `SiteHeader`
- `MobileMenu` or `FullscreenMenu`
- `Hero`
- `SectionLabel`
- `DisplayHeading`
- `MediaFrame`
- `NumberedSteps`
- `MetricGrid`
- `ProjectCard`
- `EditorialCard`
- `FilterChips`
- `Carousel`
- `TestimonialSlide`
- `LogoMarquee`
- `Accordion`
- `Modal`
- `LongformArticle`
- `CinematicCTA`
- `SiteFooter`

## Delivery order

1. Show the proposed route map and component tree.
3. Build the global shell.
4. Build one representative page, show to me and validate responsive behavior before continuing to next section.
5. Extract reusable templates for CMS pages.
6. Add motion after static layout is correct.
7. Run accessibility and performance checks.
8. List all deviations, assumptions, and remaining placeholders.

## Reasonable to reproduce as patterns

- Dark versus light visual mood.
- Editorial hierarchy.
- Floating or full-screen navigation patterns.
- Section sequencing.
- Parallax collage concept.
- Sticky numbered storytelling.
- Filterable project/research grids.
- Testimonial and image sliders.
- Footer reveal or cinematic closing section.

## Consolidated component registry 

A clean implementation should not create a separate component for every section. Use a small system of primitives and compositions.

## Layout primitives

```txt
Container
Section
Grid
Stack
Cluster
FullBleed
StickyPanel
MediaFrame
Divider
VisuallyHidden
```

## Typography primitives

```txt
Eyebrow
DisplayHeading
EditorialHeading
BodyLarge
Body
MetaLabel
NumericCounter
InlineLink
```

## Interaction primitives

```txt
Button
PillButton
IconButton
Accordion
Tabs
Carousel
Marquee
Modal
FilterGroup
ShareControls
CopyButton
VideoPlayer
```

## Editorial compositions

```txt
Hero
SplitStatement
NumberedSteps
MetricGrid
MediaTextBand
ProjectCard
ArticleCard
PublicationCard
QuoteSlide
LogoRail
TeamCollage
LongformBody
CinematicCTA
FooterScene
```

## Motion utilities

```txt
RevealLines
RevealWords
FadeUp
ClipReveal
ParallaxLayer
StickyProgress
RouteTransition
HoverMediaZoom
MarqueeTrack
CountUp
ReducedMotionBoundary
```

---

# Recommended motion specification

## Timing

```js
const motion = {
  instant: 0.12,
  hover: 0.22,
  ui: 0.36,
  reveal: 0.72,
  cinematic: 1.1,
  route: 0.58,
};
```

## Easing

```css
--ease-standard: cubic-bezier(.22,.61,.36,1);
--ease-emphasis: cubic-bezier(.16,1,.3,1);
--ease-in-out: cubic-bezier(.65,0,.35,1);
```

## Scroll behavior

- Prefer native scrolling.
- Use smooth interpolation only for visual layers, not for document position.
- Pin no more than one major section at a time.
- Never trap wheel input.
- Use `transform` and `opacity`; avoid animating layout properties where possible.
- Disable or simplify canvas, parallax, counters, and marquees under `prefers-reduced-motion: reduce`.

## Route transitions

- Fade or clip the outgoing main content over 250–350 ms.
- Swap route.
- Reveal the incoming hero over 400–700 ms.
- Do not delay navigation for decorative animation.

## Carousels

- Manual controls always visible.
- Keyboard arrow support.
- Swipe/drag on touch.
- Pause auto-advance after any user interaction.
- Announce slide changes to screen readers.

---
## Suggested stack

```txt
Next.js or Astro
TypeScript
CSS Modules, Tailwind, or vanilla CSS variables
GSAP ScrollTrigger only where sticky choreography is justified
Framer Motion/Motion for small UI transitions
Three.js or React Three Fiber only for one flagship canvas section
Embla or Swiper for carousels
Sanity, Contentful, or a typed local CMS layer for articles/research
```

Do not combine multiple heavy animation libraries without a reason.

## Performance requirements

- Hero LCP image under roughly 250–400 KB where possible.
- Responsive AVIF/WebP sources.
- Lazy-load below-fold media.
- Load WebGL only after capability check or user interaction.
- Cap canvas DPR at 1.5–2.
- Avoid autoplaying more than one video simultaneously.
- Stop offscreen animations.
- Preserve readable content without JavaScript.

## Accessibility requirements

- All modal and menu overlays require focus traps, escape close, and focus restoration.
- Every carousel must work without drag.
- Do not encode active state by color alone.
- Decorative canvas must be hidden from accessibility tree.
- Provide poster images and text alternatives for video/canvas.
- Keep minimum text contrast at WCAG AA.
- Do not animate long-form article paragraphs continuously.

## Classify motion before coding

Every animated element must be assigned one category:

- `entrance` — one-time reveal when entering viewport;
- `continuous` — video, ambient emblem, gradient, or slow loop;
- `scroll-linked` — progress line, sticky state, parallax, image swap;
- `interactive` — hover, pointer, click, drag;
- `carousel` — controlled horizontal/vertical content navigation.

Do not attach multiple categories to an element unless there is a real visual reason.

---

# Source map

## Ciridae

- Current homepage: https://www.ciridae.com/
- About: https://www.ciridae.com/about
- Knight case study: https://www.ciridae.com/knight
- Legacy services: https://www.ciridae.com/services
- Blog: https://www.ciridae.com/blog
- Terms: https://www.ciridae.com/terms-of-use
- Privacy: https://www.ciridae.com/privacy
- Awwwards feature/technology listing: https://www.awwwards.com/sites/ciridae

## Waabi

- Homepage: https://waabi.ai/
- Safety: https://waabi.ai/safety
- Company: https://waabi.ai/company
- Careers: https://waabi.ai/careers
- Research: https://waabi.ai/research
- Insights: https://waabi.ai/insights
- Example event pages: https://waabi.ai/icra-2026 and https://waabi.ai/cvpr-2026
- Antinomy case study: https://antinomy.studio/work/waabi
- Awwwards feature/technology listing: https://www.awwwards.com/sites/waabi

## MONOLOG

- Homepage: https://bymonolog.com/
- Work: https://bymonolog.com/work
- Awwwards feature/technology listing: https://www.awwwards.com/sites/monolog


----

per page implementation:


## How to read every section

Each section uses the same fields:

- **Viewport and background** — section height, background treatment, and whether media is full bleed.
- **Spatial composition** — exact left/center/right placement and approximate width relationships.
- **Still components** — elements that remain visually static within the section.
- **Moving components** — autoplay, scroll-linked, hover, drag, carousel, or reveal behavior.
- **Scroll behavior** — whether the section scrolls normally, pins, swaps active states, or overlaps the next section.
- **Component build** — practical DOM/component structure.
- **Responsive collapse** — how the layout should simplify below desktop.

### Confidence labels

- **Visible** — directly visible in the supplied screenshot.
- **User-observed** — explicitly described by the user, such as the vertical line filling as the page scrolls.
- **Public-page verified** — confirmed by the current page content or a current Awwwards element capture.
- **Implementation target** — the most plausible way to reproduce the visible result when a still screenshot cannot prove the original motion.


# 2. Select the visual patterns to use

Choosen only the patterns needed for the project. Do not combine every reference into one overloaded page.

```text
Hero:
[ ] MONOLOG statement-driven black hero

Narrative section:
[ ] Waabi floating-image constellation around sticky centered copy
### Recipe C — Waabi floating-image constellation

```text
Section height: 190–260vh desktop
Background: white
Center: sticky narrative column, 28–38rem wide
Perimeter: 12–18 small rounded image tiles
Text states: two or three stacked messages
```

Motion:

- sticky text swaps state by scroll progress;
- thumbnails use different but controlled y-parallax rates;
- edge thumbnails move slightly inward/outward;
- no random infinite floating.

Mobile:

- reduce to 4–6 images;
- remove long pinning;
- place images around or between text blocks.

---

Product/process section:
[ ] Waabi layered technical model with scroll states (or our mission in vexa)
### Recipe D — Waabi layered technical model

```text
Section height: 130–180vh
Grid: left 58%, right 32%, remaining gutter
Left layers:
1. truck/product photo
2. pale technical/map layer behind
3. dark cutaway/3D object overlapping below
Right:
- large heading
- short paragraph
- three state labels
```

Motion:

- pin section;
- assemble left visual layer by layer;
- switch right active label from dark to grey states;
- optional pointer tilt limited to 2 degrees.

[ ] Waabi safety vertical pink progress line with sticky image (for the three eras of work)
### Recipe E — Waabi safety vertical scroll line

This pattern must match the companion specification closely.

```text
Section height: 280–340vh
Background: warm light grey
Sticky viewport grid:
- 10% step number rail
- 32% copy column
- 6% progress line rail
- 42% sticky image column
```

Required behavior:

```ts
const thresholds = [0, 1 / 3, 2 / 3, 1];
```

- Magenta line fills from top to bottom using `scaleY(progress)`.
- Endpoint marker remains attached to the fill end.
- Step 1, 2, and 3 copy blocks switch active opacity at thresholds.
- Right image frame stays sticky.
- Image changes with crossfade or clip wipe at the same thresholds.
- Inactive copy is pale grey; active copy is black.
- The small pink marker under the intro must visually connect to the line.

Reduced motion/mobile:

- remove sticky behavior;
- show a normal vertical timeline;
- place each image directly after its step copy.

[ ] Ciridae expanding horizontal platform panels (for why breath holds up section in curiosity architecture and the services section in vexa)
### Recipe F — Expanding horizontal panel group

```text
Desktop row width: 96–100vw
Panels: 4
Active width: 55–60%
Inactive width: 13–15% each
No or minimal gutters
Background: image/video per panel
```

Motion:

- activate on click and desktop hover;
- selected panel expands over 650–900 ms;
- previous panel collapses;
- body copy fades before width contraction;
- background image scales 1.04 → 1.00 on activation;
- retain keyboard operation.

Mobile:

- replace with vertical accordion or equal-width carousel.

[ ] MONOLOG project journey with text rows left and sticky media right (for methodology for curiosity architecture)
### Recipe G — MONOLOG success-story rows

```text
Outer stage: dark with subtle halftone/noise
Inner panel: cream/off-white with small radius
Header: logo left, links center, sound + CTA right
Section label: narrow left column
Project row:
- image 50–55%
- information 30–35%
- small index above title
- description
- large result metric
- thin divider below
```

Motion:

- image scales slightly on row hover;
- metric highlights;
- optional custom “view project” cursor;
- rows reveal sequentially on scroll.

Mobile:

- image then text/metric;
- remove fixed side-label column.

Proof section:
[ ] MONOLOG vertical success-story rows with image, copy, and metric (for the Example Customer Experience Flooring Franchise USA, but using only one image and then metrics pills with all the numbers)
### Recipe G — MONOLOG success-story rows

```text
Outer stage: dark with subtle halftone/noise
Inner panel: cream/off-white with small radius
Header: logo left, links center, sound + CTA right
Section label: narrow left column
Project row:
- image 50–55%
- information 30–35%
- small index above title
- description
- large result metric
- thin divider below
```

Motion:

- image scales slightly on row hover;
- metric highlights;
- optional custom “view project” cursor;
- rows reveal sequentially on scroll.

Mobile:

- image then text/metric;
- remove fixed side-label column.


Content section:
[ ] Waabi asymmetric Insights carousel (for the vexa effect)
### Recipe J — Carousel with next-card peek

```text
Track begins near left viewport edge
Active card: 70–90vw depending on reference
Next card: 10–25% visible at right edge
Controls: pagination left, arrows right
```

Requirements:

- drag/swipe;
- keyboard buttons;
- no forced autoplay;
- correct focus management;
- active slide announced to assistive technology.

---
Closing section:
[ ] Ciridae cosmic media plus overlapping black footer
**Ciridae form**

- cosmic full-width media;
- black footer card overlaps lower media;
- two centered outlined CTA pills;
- back-to-top aligned right.

Overall:
Make the layout flow and be more elegant/intentional so that it looks like one page instead of just elements that i like put together
```



## 6. Technical requirements

### Video

- Use `<video muted loop playsInline preload="metadata">`.
- Provide poster images.
- Pause below-fold video when offscreen.
- Provide a static reduced-motion fallback.
- Do not load all page videos at startup.

### Images

- Use responsive AVIF/WebP sources.
- Preserve the crop described in the specification with `object-position`.
- Lazy-load below-fold images.
- Prevent cumulative layout shift with explicit aspect ratios.

### Sticky sections

- Prefer CSS sticky.
- Compute scroll progress from the containing section, not the document body.
- Test at 100%, 125%, and 150% browser zoom.
- Ensure sticky sections do not trap keyboard or screen-reader users.

### Accessibility

- Semantic heading order.
- Visible focus states.
- 44 px minimum pointer targets.
- Keyboard support for panels, carousels, modals, and menus.
- Focus trap and focus restoration for modal/menu overlays.
- All motion respects `prefers-reduced-motion`.

### Performance

- Target LCP under 2.5 seconds on a representative mobile connection.
- Load one motion library only.
- Avoid using WebGL for effects that can be pre-rendered as video.
- Use `transform` and `opacity` for animation where possible.

---

## 7. Required delivery sequence

Before writing production code, output:

1. A route map.
2. A section-by-section page map.
3. A table that names the selected reference pattern for each section.
4. A desktop grid diagram for every nonstandard section.
5. A mobile reading order.
6. A motion map listing each animated element and its motion category.
7. A component tree.
8. Design tokens and type scale.

Then implement in this order:

1. global shell and typography;
2. static desktop layout;
3. static mobile layout;
4. media loading and fallbacks;
5. sticky behavior;
6. entrance animation;
7. scroll-linked animation;
8. interactive states and carousels;
9. reduced-motion mode;
10. accessibility and performance checks.

---

## 8. Validation checklist

Do not claim completion until all items pass.

### Visual

- [ ] Each section’s background type matches the selected recipe.
- [ ] Header/menu is placed exactly where specified.
- [ ] Heading, copy, CTA, and media occupy the correct columns.
- [ ] Overlapping cards overlap at the correct edge.
- [ ] Sticky image remains in place for the intended scroll range.
- [ ] Progress line fills in the intended direction.
- [ ] Inactive/active copy states are visually distinct.
- [ ] Next carousel card peeks into the viewport where specified.
- [ ] Large empty fields are preserved rather than “fixed” with extra content.

### Motion

- [ ] Background videos are muted, looping, and have poster fallbacks.
- [ ] Scroll-linked motion is tied to section progress.
- [ ] No scroll hijacking.
- [ ] No excessive pointer-follow movement.
- [ ] Reduced-motion mode removes pinning and continuous effects.

### Responsive

- [ ] Desktop grid is correct at 1440 px and 1920 px.
- [ ] Tablet removes fragile overlaps.
- [ ] Mobile uses a clear document reading order.
- [ ] No horizontal overflow except intentional carousel tracks.

### Accessibility/performance

- [ ] Menu and modal focus behavior works.
- [ ] Carousels are keyboard operable.
- [ ] Images have useful alt text or are marked decorative.
- [ ] Videos do not block page rendering.
- [ ] Layout shift is controlled.

---

## 9. Source-content restriction

Use the reference sites only for composition and interaction patterns. Replace:

- names;
- logos;
- copy;
- photography;
- video;
- diagrams;
- metrics;
- client names;
- proprietary font files;
- branded colors where the new project requires its own identity.

The final site must be recognizably original even when its section mechanics are inspired by the references.


original source specs: 


**Reference pages**

- Ciridae home — attached screenshot: `screencapture-ciridae-2026-08-05-22_43_27.png`
- Waabi home — attached screenshot: `screencapture-waabi-ai-2026-08-05-22_42_46.png`
- Waabi safety — attached screenshot: `screencapture-waabi-ai-safety-2026-08-05-22_44_45.png`
- MONOLOG home — reconstructed from the current public page and its Awwwards element captures because no full-page screenshot was supplied

**Purpose**

This document describes what is actually on the screen: where every major item sits, what overlaps what, which parts stay still, which parts move, and how the composition changes while scrolling. It is intended as a visual implementation brief for Claude Code, not as a high-level brand audit.

### Important constraint

The supplied screenshots are compressed full-page captures. Use the proportions and relationships below. Do not treat the screenshots' 303–388 px rendered widths as production CSS pixel measurements.

---

# 1. CIRIDAE — HOME PAGE

## 1.0 Overall visual grammar

- Near-black page with occasional off-white interruption bands.
- Monospaced or techno-display headings in uppercase.
- Very small labels, wide letter spacing, thin outlined pills, and restrained borders.
- Most sections are centered and deliberately underfilled; negative space is a primary design component.
- Media is cinematic and low-light: blurred warm lights, stars, mountain silhouettes, abstract geology, and cosmic imagery.
- The page alternates between:
  - extremely sparse black editorial sections;
  - full-width cinematic media;
  - horizontally arranged interactive cards;
  - off-white credibility strips.

### Global page grid

Use a 12-column desktop grid inside a full-width shell.

- Outer page padding: about 1.2–2.0vw.
- Main content width: 96–98vw for large media and cards.
- Text reading width: often only 22–36rem even when the page is very wide.
- Section spacing is intentionally extreme: several sections use 80–160vh of vertical breathing room.

### Global controls

- Pill buttons: black or transparent, 1 px off-white border, compact uppercase text.
- Small square technical icons centered above card labels.
- Text and icons are almost always white on black, black on off-white, or muted grey.

---

## CIRIDAE 1 — Thin top status strip

**Screenshot region:** very top, above the cinematic hero.

### Viewport and background

- Height: about 22–32 px.
- Background: pure or near black.
- It reads as a system/status ticker rather than normal navigation.

### Spatial composition

- One short line of tiny uppercase/monospace text centered horizontally.
- No visible left or right controls in this strip.

### Still components

- Status sentence or system message.

### Moving components

- **Implementation target:** either keep it static or run a very slow horizontal ticker if the sentence exceeds the viewport.
- Do not use a fast news-marquee effect.

### Component build

```tsx
<StatusBar>
  <StatusMessage />
</StatusBar>
```

### Responsive collapse

- Keep the same height.
- Truncate or marquee the sentence rather than wrapping it.

---

## CIRIDAE 2 — Cinematic hero with floating edge controls

**Screenshot region:** top dark media block.

### Viewport and background

- Height: approximately 85–100svh.
- Background: full-bleed moving video or animated cinematic image.
- Visual content: dark navy/black field with broad out-of-focus orange and blue light columns.
- Add a black overlay so all white text remains legible.

### Spatial composition

The hero is not a conventional left-aligned marketing hero. It is a five-point composition:

1. **Top-left:** outlined pill menu button.
2. **Top-right:** second outlined pill CTA or utility button.
3. **Horizontal center:** Ciridae emblem and wordmark.
4. **Mid-left edge:** a short uppercase phrase aligned close to the viewport edge.
5. **Mid-right edge:** a second short uppercase phrase mirrored across the screen.
6. **Bottom-center:** three short stacked lines of small uppercase text.

The central wordmark is much smaller than the surrounding empty field. The emptiness is intentional.

### Still components

- Top-left menu pill.
- Top-right CTA/utility pill.
- Centered emblem.
- Centered wordmark beneath the emblem.
- Left and right short positioning statements.
- Bottom-center stacked descriptor.

### Moving components

- **Visible/user-described target:** the background is a moving video.
- Video motion should be slow, abstract, and continuously looping.
- **Implementation target:** central emblem may breathe with a faint light pulse or 1–2° rotational drift.
- **Implementation target:** entrance sequence:
  1. background video fades from black;
  2. emblem resolves from blur;
  3. wordmark appears;
  4. side phrases slide 12–20 px inward;
  5. bottom descriptor fades last.
- Keep motion subtle. The hero should feel like a machine waking up, not a kinetic ad.

### Scroll behavior

- Normal vertical scroll.
- Hero may remain pinned for the first 10–20% of scroll while the video darkens and text fades, then the white logo strip covers it.
- Do not scroll-jack.

### Layer order

```text
z-0   video
z-1   dark gradient / vignette
z-2   side labels and bottom descriptor
z-3   center emblem and wordmark
z-4   menu and CTA pills
```

### Component build

```tsx
<CinematicHero>
  <BackgroundVideo />
  <HeroVignette />
  <HeroHeader left={<MenuPill />} right={<UtilityPill />} />
  <SideStatement side="left" />
  <BrandLockup />
  <SideStatement side="right" />
  <HeroDescriptor />
</CinematicHero>
```

### Responsive collapse

- Keep video full screen.
- Keep controls at top-left and top-right.
- Remove the mirrored side placement: stack both short phrases below the logo or hide the less important one.
- Preserve centered lockup and bottom descriptor.

---

## CIRIDAE 3 — Off-white backers/partners strip

**Screenshot region:** first light band immediately after the hero.

### Viewport and background

- Height: approximately 36–52vh.
- Background: warm off-white, not pure white.

### Spatial composition

- Small centered eyebrow near the upper third.
- Three partner/investor logos centered in one row beneath it.
- Logos occupy a narrow central band; most of the section is blank.

### Still components

- Eyebrow label.
- Three monochrome logos.

### Moving components

- **Implementation target:** logos reveal from 0.4 opacity to 1 as the band enters the viewport.
- Optional tiny upward translation of 8–12 px.
- No marquee unless more than six logos are required.

### Scroll behavior

- Normal section.
- Hard color cut from dark hero to off-white strip.

### Component build

```tsx
<ProofStrip>
  <Eyebrow />
  <LogoRow items={3} />
</ProofStrip>
```

---

## CIRIDAE 4 — Operating-system statement with animated emblem

**Screenshot region:** black section after the partner strip.

### Viewport and background

- Height: approximately 95–125vh.
- Background: near black.

### Spatial composition

- Small centered eyebrow near the top.
- One centered uppercase sentence under the eyebrow.
- Large empty black field below.
- A glowing Ciridae network/emblem floats around the vertical center.
- The emblem is visually small compared with the section, creating a deep-space feel.

### Still components

- Eyebrow.
- Centered statement.
- Dark stage.

### Moving components

- **Implementation target:** emblem is an animated SVG, canvas, or WebGL object.
- Suggested behavior:
  - central nodes slowly rotate around a shared center;
  - thin light beams flare intermittently;
  - ghosted reflections appear beneath the main emblem;
  - light intensity increases slightly as the section reaches the viewport center.
- Headline can reveal by line or by letter mask.

### Scroll behavior

- The emblem can be sticky for 55–70vh while its light intensity and scale scrub from 0.85 to 1.05.
- The headline should scroll away before the emblem fully exits.

### Component build

```tsx
<DarkSystemStage>
  <CenteredIntro />
  <StickyEmblemStage>
    <AnimatedSystemEmblem />
  </StickyEmblemStage>
</DarkSystemStage>
```

### Responsive collapse

- Use an animated SVG or poster image instead of WebGL on low-power devices.
- Reduce the section to about 80–95svh.

---

## CIRIDAE 5 — Full-width landscape media with bottom control rail

**Screenshot region:** starry sky, lake, and mountain image.

### Viewport and background

- Height: approximately 75–100vh.
- Full-bleed landscape photo or video.
- Media fills the entire width with no side margins.

### Spatial composition

At the lower edge of the media, three dark translucent control blocks form an uneven rail:

1. **Left:** largest rectangular card, roughly one-third viewport width and taller than the others. Contains a small icon and label.
2. **Center:** medium-width rounded rectangle, lower in height. Contains a centered icon.
3. **Right:** long slim bar, aligned lower than the left card. Contains tiny text or progress/status copy.

The three controls overlap the bottom of the media and continue slightly into the black section below.

### Still components

- Full-width media.
- Three control surfaces.
- Small technical icons.
- Tiny status text.

### Moving components

- **Implementation target:** background is a slow time-lapse or subtle parallax video.
- The stars or constellation lines may drift independently.
- Control cards can represent selectable scenes or modules:
  - active card brightens and grows slightly;
  - inactive cards remain darker;
  - clicking a card crossfades the background media.
- The slim right bar can act as a progress indicator for the active scene.

### Scroll behavior

- Media can pin for 100–140vh while the active control moves from left to center to right.
- Safer alternative: normal scroll with clickable tabs.
- The controls should remain anchored to the lower media edge, not float in the middle of the page.

### Component build

```tsx
<InteractiveMediaStage>
  <MediaSwitcher activeIndex={activeIndex} />
  <MediaControlRail>
    <LargeMediaControl />
    <MediumMediaControl />
    <ProgressControl />
  </MediaControlRail>
</InteractiveMediaStage>
```

### Responsive collapse

- Keep one active full-width media panel.
- Convert the three controls into a horizontal swipe row below the media.
- Do not preserve the desktop overlap if it causes unreadable controls.

---

## CIRIDAE 6 — Long black manifesto field

**Screenshot region:** very large black gap after the landscape media, ending in a small centered paragraph.

### Viewport and background

- Height: approximately 130–190vh.
- Solid black.
- This section deliberately has almost no visible content in its upper half.

### Spatial composition

- Small label and narrow text block centered horizontally near the lower third of the section.
- Text width is only around 24–32rem.
- The surrounding black field is the dominant visual element.

### Still components

- Tiny section marker.
- Several short paragraph lines centered.
- Optional small icon or glyph above the copy.

### Moving components

- **Implementation target:** text fades in line by line as the user reaches the lower half.
- Previous landscape may move upward more slowly than the page, increasing the apparent gap.
- Avoid decorative objects; this section depends on restraint.

### Scroll behavior

- Normal scroll with delayed content reveal.
- Do not shorten this section aggressively on desktop. Its purpose is pacing.

### Component build

```tsx
<ManifestoSpacer>
  <DelayedCenteredCopy />
</ManifestoSpacer>
```

### Responsive collapse

- Reduce height to 80–110svh.
- Keep text centered and narrow.

---

## CIRIDAE 7 — Platform capabilities as expanding horizontal panels

**Screenshot region:** four adjacent image panels under the “Designed to run core operations…” heading.

### Viewport and background

- Black section.
- Heading sits centered above the card row.
- Card row spans almost the full viewport width.

### Spatial composition

- One large active panel on the left, occupying about 55–60% of the row.
- Three narrow inactive panels to the right, each occupying about 13–15%.
- All cards have tall portrait-like proportions even though the active card becomes wide.
- Each card has:
  - textured cinematic background image;
  - small technical icon near the top/center;
  - uppercase capability label;
  - active card only: body copy centered in the lower-middle region.
- Card boundaries are thin and dark; there is little or no gutter.

### Still components

- Centered section heading.
- Four panel shells.
- Background image per panel.
- Labels and icons.
- Body copy only in active panel.

### Moving components

- **Visible structure / implementation target:** accordion expansion.
- On hover or click:
  - selected panel animates from narrow to approximately 55–60%;
  - previous active panel collapses;
  - body text fades out before collapse and fades in after expansion;
  - background image shifts position or scale by 3–5%;
  - title remains visible throughout.
- Duration: 650–900 ms with a smooth cubic easing.
- On touch devices use click only.

### Scroll behavior

- Card row may pin for one viewport while the active panel advances with scroll.
- If using scroll activation, also preserve click and keyboard control.

### Component build

```tsx
<CapabilitySection>
  <CenteredHeading />
  <ExpandablePanelGroup value={activePanel}>
    <CapabilityPanel />
    <CapabilityPanel />
    <CapabilityPanel />
    <CapabilityPanel />
  </ExpandablePanelGroup>
</CapabilitySection>
```

### Responsive collapse

- Replace horizontal accordion with vertical accordion cards.
- Active item shows full-width landscape media and body copy.
- Inactive items become compact rows.

---

## CIRIDAE 8 — Deliberate black breathing space after the platform panels

### Viewport and background

- Approximately 70–120vh of black space before the team strip.

### Purpose

- Separates the dense interactive panel row from the bright team proof section.
- Makes the off-white strip feel like a hard scene change.

### Moving components

- None required.
- At most, allow the panel row to drift upward with slight parallax.

---

## CIRIDAE 9 — Off-white team credibility strip

**Screenshot region:** off-white band with “We’re AI experts…” and a long logo row.

### Viewport and background

- Height: approximately 55–75vh.
- Warm off-white.

### Spatial composition

- Small centered eyebrow.
- Two-line uppercase heading centered beneath.
- Long horizontal row of small company logos near the lower half.
- Logos are evenly spaced and monochrome.

### Still components

- Eyebrow.
- Heading.
- 8–10 company logos.

### Moving components

- **Implementation target:** on desktop, keep logos static if they fit.
- If more logos are used, run a very slow continuous marquee with a duplicated track.
- Headline reveals upward by 12 px.

### Responsive collapse

- Use a two-row logo grid or slow marquee.

---

## CIRIDAE 10 — Partner testimonial carousel

**Screenshot region:** black section containing large charcoal quote cards, with the next card partially visible.

### Viewport and background

- Black section.
- Header area centered above the cards.

### Spatial composition

- Small eyebrow and centered heading.
- Horizontal card rail begins near the left edge.
- First quote card occupies roughly 70–75% of viewport width.
- Next card is deliberately clipped at the right edge to signal horizontal continuation.
- Cards are dark charcoal with minimal corner radius.
- Quote text is upper-left.
- Client logo is bottom-left.
- Role/name or small metadata is bottom-right.
- Tiny pagination dots or slide count appear below-left.
- Previous/next arrow pills appear below-right.

### Still components

- Testimonial header.
- Quote card.
- Client logo.
- Pagination.
- Navigation arrows.

### Moving components

- Drag/swipe horizontal carousel.
- Arrow buttons move one card at a time.
- Card transition: 500–700 ms.
- Incoming card can scale from 0.985 to 1 and fade from 0.65 to 1.
- Do not autoplay unless paused on hover/focus and disabled for reduced motion.

### Component build

```tsx
<TestimonialSection>
  <CenteredIntro />
  <TestimonialCarousel peekNext>
    <QuoteCard />
  </TestimonialCarousel>
  <CarouselMeta />
</TestimonialSection>
```

### Responsive collapse

- Cards occupy 88–92vw.
- Preserve a small next-card peek.
- Swipe becomes primary navigation.

---

## CIRIDAE 11 — Security statement and cosmic image

**Screenshot region:** centered security copy followed by a full-width blue/orange cosmic image.

### Viewport and background

- Black upper section with centered text.
- Cosmic media directly below, full width.
- The image uses blue, cyan, black, and a narrow orange flare.

### Spatial composition

- Small centered eyebrow.
- Large uppercase paragraph/statement centered at around 60–75% width.
- Full-width cosmic image below.
- Image appears split by horizontal glitch bands or offset slices.

### Still components

- Security eyebrow.
- Centered statement.
- Cosmic media.

### Moving components

- **Implementation target:** text reveals by line.
- Cosmic media uses one or more of:
  - slow zoom from 1 to 1.06;
  - horizontal slice offsets tied to scroll;
  - subtle chromatic aberration on entry;
  - star flicker or particle movement.
- Keep the distortion slow and premium, not noisy.

### Scroll behavior

- Text scrolls normally.
- Image can pin for 60–80vh while its horizontal slices realign.

### Component build

```tsx
<SecuritySection>
  <SecurityStatement />
  <GlitchMediaFrame>
    <CosmicMedia />
    <MediaSlice />
    <MediaSlice />
  </GlitchMediaFrame>
</SecuritySection>
```

---

## CIRIDAE 12 — Footer panel overlapping the cosmic image

**Screenshot region:** black footer card placed over the lower part of the cosmic image.

### Viewport and background

- Large black rectangular footer panel overlaps the image by roughly 10–18vh.
- Footer continues below the media on black.

### Spatial composition

- Two small outlined CTA pills centered near the top of the footer panel.
- “Back to top” utility aligned right.
- Small central brand mark and/or legal information beneath the CTAs.
- Extremely sparse lower footer.

### Still components

- Overlapping footer shell.
- Two CTA pills.
- Back-to-top control.
- Central logo/legal stack.

### Moving components

- Footer rises over the cosmic image as the user reaches the end.
- Button hover: invert fill, move arrow 2–4 px.
- Back-to-top scrolls smoothly only when motion preference allows it.

### Responsive collapse

- Remove overlap or reduce to 5–8vh.
- Stack CTA pills vertically if needed.

---

## CIRIDAE — Reusable component inventory

```text
CiridaePage
├─ StatusBar
├─ CinematicHero
│  ├─ EdgeHeader
│  ├─ BrandLockup
│  ├─ SideStatement ×2
│  └─ BackgroundVideo
├─ ProofStrip
├─ DarkSystemStage
│  └─ AnimatedSystemEmblem
├─ InteractiveMediaStage
│  └─ MediaControlRail
├─ ManifestoSpacer
├─ ExpandablePanelGroup
├─ TeamProofStrip
├─ TestimonialCarousel
├─ SecuritySection
│  └─ GlitchMediaFrame
└─ OverlapFooter
```

---

# 2. WAABI — HOME PAGE

## 2.0 Overall visual grammar

- Bright editorial layout with large white fields.
- Oversized serif display type paired with compact sans-serif body text.
- Rounded media corners.
- Vivid hot-pink CTAs and small interaction markers.
- Cinematic trucking photography mixed with technical diagrams, simulated-road imagery, and editorial collage.
- Sections often use asymmetry: large image on one side, a narrow text column on the other, then a large empty field.

### Global page grid

- Desktop: 12-column grid.
- Outer padding: approximately 1.5–3vw.
- Standard text split: heading 4–5 columns, body 3–4 columns.
- Large media widths: 92–97vw.
- Rounded corners: approximately 8–18 px depending on scale.

### Global navigation capsule

- White rounded rectangular nav floats at the horizontal center near the top.
- Left inside capsule: Waabi wordmark.
- Center: current page label or small navigation trigger.
- Right: compact menu icon.
- It sits over hero media and remains visually detached from page edges.

### Global accent

- Hot pink appears in:
  - CTA pills;
  - small circular pointer/scroll marker;
  - progress lines;
  - footer gradients;
  - selected states.

---

## WAABI HOME 1 — Full-bleed moving truck hero

### Viewport and background

- Height: approximately 82–100svh.
- Full-bleed background video of a Waabi truck driving.
- Video fills the hero edge to edge.

### Spatial composition

- Floating white nav capsule at top-center, about 22–30% of viewport width.
- Huge white serif headline in the lower-left quadrant, two lines.
- Headline occupies roughly 55–65% of viewport width.
- Small hot-pink circular marker near the lower-right area of the media.
- No separate opaque content card; text sits directly on the video.

### Still components

- Floating nav capsule.
- Hero headline.
- Pink circular marker.
- Optional video scrim for contrast.

### Moving components

- **User-described/visible target:** autoplay moving video background.
- Video should be muted, looped, plays inline, and have a poster fallback.
- Headline entrance: masked upward reveal by line.
- Pink dot can:
  - pulse subtly;
  - follow the cursor with a delayed spring;
  - or act as a scroll cue.
- Nav capsule may compress slightly after the user scrolls.

### Scroll behavior

- Hero scrolls normally.
- Optional 10–15% pin while headline moves upward 4–8vh and video scales to 1.03.

### Component build

```tsx
<WaabiHero>
  <HeroVideo />
  <FloatingNav current="Home" />
  <MaskedHeroHeading />
  <PinkInteractionDot />
</WaabiHero>
```

### Responsive collapse

- Capsule widens to about 70–86vw.
- Headline remains bottom-left but shrinks to 12–16vw type.
- Pink dot can become a fixed scroll indicator.

---

## WAABI HOME 2 — Floating image constellation around centered narrative

**Screenshot region:** very tall white section with small image thumbnails scattered around two centered text blocks.

### Viewport and background

- Height: approximately 190–260vh.
- Pure or warm white.
- Large amounts of empty space.

### Spatial composition

- A narrow centered narrative column, roughly 28–38rem wide.
- Two text moments stacked vertically, each composed of:
  - small eyebrow;
  - bold sentence;
  - lighter body copy.
- Around the center column, 14–18 small rounded image tiles are scattered in a loose orbit.
- Tiles sit near the left and right margins, with a few closer to the center near the lower half.
- Image sizes vary from small square thumbnails to medium portrait cards.
- A larger portrait truck image appears near the bottom-left/center as the section transitions to the next layout.

### Still components

- Center narrative column.
- Scattered image thumbnails.
- Individual rounded image frames.

### Moving components

- **Implementation target:** each thumbnail has a distinct slow parallax rate.
- As the user scrolls:
  - edge images drift vertically at different speeds;
  - some move 2–4vw inward, then outward;
  - center copy fades between first and second narrative moment;
  - tiles can rotate no more than 1–2°.
- Avoid random floating animation that makes the composition unstable.
- The images should feel like a controlled constellation around the text.

### Scroll behavior

- Center narrative may be sticky for 120–160vh.
- First message fades out as the second becomes active.
- Scattered image layer continues moving behind/around the sticky copy.

### Layer order

```text
z-0 white background
z-1 scattered thumbnails
z-2 centered narrative
```

### Component build

```tsx
<ConstellationStory>
  <ParallaxThumbnailLayer items={images} />
  <StickyNarrative>
    <NarrativeStep index={0} />
    <NarrativeStep index={1} />
  </StickyNarrative>
</ConstellationStory>
```

### Responsive collapse

- Do not preserve all floating positions.
- Show 4–6 thumbnails in a loose grid around the text.
- Disable sticky copy if it creates excessive scroll length.

---

## WAABI HOME 3 — “Unlocking scale” split layout with layered technical model

### Viewport and background

- White section.
- Height: approximately 130–180vh.

### Spatial composition

- Two-column split:
  - **Left 55–60%:** visual stack.
  - **Right 30–35%:** heading, paragraph, and three-value list.
- Left visual stack:
  1. Rounded truck photograph at upper-left.
  2. Pale technical/map illustration beneath it.
  3. Dark 3D infrastructure cross-section overlapping the bottom of the pale illustration.
- The visual elements overlap vertically, producing a cutaway/physical-system metaphor.
- Right column:
  - large serif heading “Unlocking scale”;
  - compact paragraph;
  - first value in dark text;
  - remaining values in light grey, indicating inactive states.

### Still components

- Truck photo.
- Pale technical diagram.
- Dark 3D cutaway object.
- Heading and paragraph.
- Three-item value list.

### Moving components

- **Implementation target:** sticky visual sequence.
- As the section scrolls:
  - truck photo enters first;
  - pale map panel slides upward behind it;
  - dark cutaway object rises from below and overlaps;
  - active value on the right changes from Safe → Scalable → Practical;
  - active word turns dark while inactive words fade grey.
- Optional subtle 3D tilt based on pointer, limited to 2°.

### Scroll behavior

- Pin the two-column layout for 120–180vh.
- Map progress to three states.
- Keep right text column fixed while the left visual stack assembles.

### Component build

```tsx
<ScaleExplainer>
  <StickyVisualStack>
    <TruckImage />
    <MapLayer />
    <CutawayModel />
  </StickyVisualStack>
  <ScaleCopy>
    <Heading />
    <Body />
    <ScrollStateList items={["Safe", "Scalable", "Practical"]} />
  </ScaleCopy>
</ScaleExplainer>
```

### Responsive collapse

- Stack heading above media.
- Replace the pinned build with a simple step sequence.
- Each value gets its own compact image/text block.

---

## WAABI HOME 4 — Large rounded technology media card

### Viewport and background

- White section with generous vertical margin.
- One large inset media frame with rounded corners, about 94–97vw wide.

### Spatial composition

- Full-bleed photo/video inside the rounded frame.
- Huge white serif heading overlaid on the left half.
- Second line appears lighter or semi-transparent.
- Hot-pink CTA pill under the heading.
- Media subject fills right and center; text overlays the darker left area.

### Still components

- Rounded media frame.
- Overlay heading.
- Pink CTA.

### Moving components

- Background media can autoplay when in view.
- Heading reveals line by line.
- On hover, media scales 1.00 → 1.025 while frame remains clipped.
- CTA arrow slides 3–5 px.

### Component build

```tsx
<CinematicMediaCTA>
  <RoundedMedia />
  <MediaScrim />
  <OverlayHeading />
  <PinkPillButton />
</CinematicMediaCTA>
```

---

## WAABI HOME 5 — Small research/technology card rail

**Screenshot region:** two compact cards above the large AV-safety banner.

### Viewport and background

- White.
- Cards occupy the left and center, leaving open space on the right.

### Spatial composition

- Two horizontal cards side by side.
- First: light image card.
- Second: black card with white serif title and circular arrow control.
- Cards are low, wide rectangles with modest radius.

### Still components

- Two cards.
- Category labels.
- Circular arrow icon.

### Moving components

- Horizontal drag rail or hover-preview cards.
- Black card can reveal a video/image on hover.
- Arrow circle rotates or fills on hover.

### Responsive collapse

- Horizontal swipe rail with 82–88vw cards.

---

## WAABI HOME 6 — Full-width AV safety banner

### Viewport and background

- Full-width highway/truck image.
- Height: approximately 65–85vh.
- Pink/brown dusk grading.

### Spatial composition

- Large white serif heading at left, occupying about 35–45% width.
- Supporting body below.
- Pink CTA pill below the paragraph.
- Main truck remains near center so the text sits over darker roadside space.

### Still components

- Full-width media.
- Heading.
- Body copy.
- CTA.

### Moving components

- Video or slow image pan.
- Overlay copy reveals upward.
- Optional vehicle tracking line or subtle data overlay, but only if present in custom design.

### Scroll behavior

- Normal scroll.
- Could use a mild scale/parallax effect.

---

## WAABI HOME 7 — Trust heading and overlapping quote card

### Viewport and background

- White section.
- Height: approximately 100–140vh.

### Spatial composition

Header row:

- Large serif “Trusted by…” heading at upper-left.
- Last word/line rendered in light grey.
- Compact explanatory paragraph at upper-right.

Feature below:

- Large rounded truck image centered-left, about 70–75% of content width.
- Black quote card overlaps the image on its right side.
- Quote card contains white quote text, attribution, a circular decorative/progress element, and a pink CTA at the lower-right.

### Still components

- Split heading row.
- Truck image.
- Overlapping black quote card.
- Pink CTA.

### Moving components

- Quote card can slide 30–60 px over the image as the section enters.
- Image has subtle parallax inside its mask.
- If multiple quotes exist, use a carousel that swaps text while image changes.

### Component build

```tsx
<TrustSection>
  <SplitIntro />
  <OverlapTestimonial>
    <TruckMedia />
    <DarkQuoteCard />
  </OverlapTestimonial>
</TrustSection>
```

### Responsive collapse

- Stack quote card below image, overlapping by only 24–40 px.
- Keep the heading and paragraph in one column.

---

## WAABI HOME 8 — Beige Insights carousel

### Viewport and background

- Light warm-grey/beige band.
- Height: approximately 90–120vh.

### Spatial composition

- Large serif section title at upper-left.
- Small explanatory copy below the title.
- Upper-right controls:
  - hot-pink “View all” pill;
  - two outlined circular arrow buttons.
- Three content cards across the lower half:
  - left card medium;
  - center card slightly larger/taller and visually dominant;
  - right card partially clipped by viewport edge.
- Card imagery is highly graphic and research-oriented.

### Still components

- Section header.
- View-all pill.
- Arrow controls.
- Three-card rail.

### Moving components

- Horizontal carousel.
- Center card becomes active and scales to 1 while side cards sit at 0.94–0.97.
- Cards slide with 550–750 ms easing.
- Drag/swipe supported.

### Responsive collapse

- Single-card carousel with small next-card peek.

---

## WAABI HOME 9 — Careers / “Build Physical AI” collage

### Viewport and background

- White section.
- Height: approximately 115–150vh.

### Spatial composition

- Huge serif statement in upper-left.
- Second line is light grey.
- Pink CTA pill beneath.
- Layered image collage occupies the lower-right and lower-center:
  - several vertical and square images overlap;
  - smallest image begins near the far-left of the collage;
  - each successive image grows;
  - largest image on the far-right shows a truck in a workshop and occupies about half the collage width.
- Cards have rounded corners and no visible borders.

### Still components

- Large heading.
- CTA.
- 4–5-image overlapping collage.

### Moving components

- Images enter sequentially from left to right.
- Each image uses a slightly different y-translation or parallax speed.
- On pointer movement, collage layers may shift by 4–12 px.
- Keep the largest image stable to anchor the composition.

### Responsive collapse

- Keep 3 images rather than 5.
- Stack with controlled overlap and horizontal overflow hidden.

---

## WAABI HOME 10 — Pink perspective-room footer

### Viewport and background

- Full-width footer with vivid pink-to-red gradient.
- Background resembles a 3D room or tunnel: a dark central rectangle with lighter glowing edges.
- Large white Waabi wordmark is cropped at the bottom-right.

### Spatial composition

- Left: “We’re just getting started” heading and small copy.
- Center: compact vertical navigation columns.
- Top-right: three white circular social controls.
- Bottom-right: oversized wordmark extending beyond the viewport.
- Bottom-left: cookie consent panel overlays the footer.

### Still components

- Gradient/3D room background.
- Left footer statement.
- Navigation links.
- Social circles.
- Giant wordmark.
- Cookie panel.

### Moving components

- Gradient and room lighting can shift slowly.
- Central room may use a shader, CSS perspective, or pre-rendered looping video.
- Wordmark rises slightly into view on footer entry.
- Social buttons fill pink/white on hover.

### Scroll behavior

- Footer can reveal from beneath the careers section.
- Avoid making the wordmark sticky beyond the footer.

### Responsive collapse

- Stack statement and navigation.
- Keep giant wordmark cropped at bottom.
- Cookie panel becomes full-width bottom sheet.

---

## WAABI HOME — Reusable component inventory

```text
WaabiHome
├─ FloatingNav
├─ VideoHero
├─ ConstellationStory
│  ├─ ParallaxThumbnailLayer
│  └─ StickyNarrative
├─ ScaleExplainer
│  ├─ StickyVisualStack
│  └─ ScrollStateList
├─ CinematicMediaCTA
├─ CompactCardRail
├─ FullBleedSafetyBanner
├─ TrustSection
│  └─ OverlapTestimonial
├─ InsightsCarousel
├─ CareersCollageCTA
└─ PerspectiveFooter
```

---

# 3. WAABI — SAFETY PAGE

## 3.0 Shared components from home

The safety page reuses:

- floating center-top navigation capsule;
- full-bleed video hero;
- large serif headings;
- hot-pink CTA pills and scroll markers;
- rounded media frames;
- Insights carousel;
- pink perspective footer.

Do not rebuild these separately. Use shared components with page-specific props.

---

## WAABI SAFETY 1 — Overhead truck video hero

### Viewport and background

- Full-bleed moving video or cinematic media.
- Height: approximately 85–100svh.
- Overhead view of truck and workers on a marked surface.

### Spatial composition

- Floating white navigation capsule centered at the top.
- Huge white serif heading upper-left to mid-left, two lines.
- Pink circular marker toward the lower-left quadrant.
- Truck fills center and right side, with strong diagonal roadway lines.

### Moving components

- Autoplay looping video.
- Headline line-mask reveal.
- Pink dot pulses or tracks pointer.
- Mild parallax on the truck video as the section leaves.

---

## WAABI SAFETY 2 — “The stakes are real” metrics block

### Viewport and background

- White section.
- Height: approximately 120–160vh.

### Spatial composition

Top intro row:

- Large serif heading at upper-left.
- Last word in light grey.
- Narrow explanatory paragraph at upper-right.
- Large blank field between intro and metrics.

Metrics table:

- Three horizontal rows separated by thin light-grey rules.
- Small label/caption aligned far left.
- Extremely large number aligned to the right, occupying nearly half the viewport.
- Number typography is black, thin, and editorial.
- First metric appears stylized/distorted in the screenshot; treat it as either animated custom numerals or a number in transition.

### Still components

- Split intro.
- Horizontal divider lines.
- Three metric labels.
- Three large values.

### Moving components

- Count-up or odometer animation when each row enters.
- Numbers can reveal through a vertical clipping mask.
- First metric may use a rolling numeral distortion.
- Divider lines draw left-to-right.

### Scroll behavior

- Metrics enter sequentially.
- No pin required, but a mild sticky heading can work.

### Component build

```tsx
<MetricsSection>
  <SplitIntro />
  <MetricTable>
    <MetricRow />
    <MetricRow />
    <MetricRow />
  </MetricTable>
</MetricsSection>
```

### Responsive collapse

- Place label above number within each row.
- Keep number large but prevent horizontal overflow.

---

## WAABI SAFETY 3 — Centered “Safety is core” intro

### Viewport and background

- Warm light-grey section.
- This is the introduction to a much longer scroll-driven story.

### Spatial composition

- Large centered serif heading.
- Final word in light grey.
- Narrow centered paragraph below.
- Small hot-pink downward marker below the paragraph.
- Large empty field leading into the scroll story.

### Still components

- Heading.
- Intro copy.
- Pink marker.

### Moving components

- Heading reveals upward.
- Pink marker pulses and becomes the top origin of the progress line below.

---

## WAABI SAFETY 4 — Scroll-driven safety story with vertical pink progress line

**This is the section the user specifically described.**

### Viewport and background

- Same warm light-grey background as the intro.
- Total section height should be approximately 240–360vh for three story steps.
- The visible viewport contains a fixed/sticky grid while the user scrolls through multiple states.

### Desktop spatial composition

Use four vertical zones:

1. **Far-left number rail — 8–12% width**
   - Active step number, e.g. `01`.
   - Tiny adjacent marker or fraction.

2. **Copy column — 28–34% width**
   - Step heading.
   - Short body paragraph.
   - Three step blocks are stacked vertically in the full document.
   - Only the current step is dark and fully opaque.
   - Previous/next steps are pale grey.

3. **Progress rail — 5–8% width**
   - Thin vertical hot-pink line.
   - Small rounded/pin-like pink head at the line’s lower end.
   - The line grows downward as the user scrolls.

4. **Sticky image column — 36–44% width**
   - One rounded rectangular photo sits to the right.
   - The screenshot shows highway/truck media.
   - The image remains approximately level with the active copy while the steps change.

Approximate desktop grid:

```text
| 01 | active heading + body        | pink line | sticky image            |
|    | inactive next heading/body   | pink line | same frame / new image  |
|    | inactive third heading/body  | pink line | same frame / new image  |
```

### Still components

- Three numbered content steps.
- One vertical line track.
- One sticky image frame.
- Warm-grey section surface.

### Moving components — required behavior

1. **Line growth**
   - **User-observed:** the pink line extends downward as the user scrolls through the section.
   - Implement line track as a pale or transparent guide and a hot-pink fill layer.
   - Map the fill scale from 0 to 1 across the pinned scroll range.
   - Use `transform: scaleY(progress)` with `transform-origin: top`.
   - The small pink endpoint stays attached to the current lower end of the fill.

2. **Active copy switching**
   - Step 1 begins black/opaque.
   - As progress reaches the next threshold, step 1 fades to grey and step 2 becomes black.
   - Repeat for step 3.
   - Transition opacity and y-position by only 8–16 px.

3. **Image behavior**
   - Image frame remains sticky on the right.
   - At each step threshold, crossfade or vertically wipe to the relevant image.
   - Use a 500–800 ms clip-path or opacity transition.
   - Do not scroll the image away with each paragraph; that would destroy the section’s visual logic.

4. **Step number**
   - Far-left number updates from 01 to 02 to 03, or each row’s number becomes active with its copy.

5. **Intro-to-story connection**
   - The small pink marker under “Safety is core” visually connects to the first line segment.
   - It should feel like one continuous vertical guide.

### Scroll behavior — recommended implementation

```text
section height: 320vh
sticky container: top: 0; min-height: 100svh
progress 0.00–0.33: step 1 active
progress 0.33–0.66: step 2 active
progress 0.66–1.00: step 3 active
```

Use IntersectionObserver plus CSS sticky or a single GSAP ScrollTrigger timeline. Do not combine multiple competing scroll libraries.

### Component build

```tsx
<ScrollSafetyStory steps={steps}>
  <StickyStoryGrid>
    <StepNumberRail activeIndex={activeIndex} />
    <StepCopyStack activeIndex={activeIndex} />
    <ProgressRail progress={progress} />
    <StickyMediaSwitcher activeIndex={activeIndex} />
  </StickyStoryGrid>
</ScrollSafetyStory>
```

### Accessibility

- All three steps must remain present in the DOM.
- Do not make the text available only through animation.
- Reduced-motion mode:
  - remove pinning;
  - show three normal stacked rows;
  - place each image next to or beneath its copy;
  - show a static pink rule connecting the steps.

### Mobile collapse

Use a normal vertical timeline:

```text
01
heading
body
pink line
image
02
heading
body
pink line
image
03
...
```

Do not attempt a narrow four-column sticky layout on mobile.

---

## WAABI SAFETY 5 — “Technology designed to…” split intro

### Viewport and background

- White section.
- Height before media: approximately 70–95vh.

### Spatial composition

- Large serif heading on left, occupying 38–45% width.
- Last word/line is light grey.
- Right side contains compact paragraph and pink CTA pill beneath.
- Large empty vertical space separates intro from media rail.

### Still components

- Left heading.
- Right body.
- Pink CTA.

### Moving components

- Heading reveals line-by-line.
- CTA and body fade in slightly later.

---

## WAABI SAFETY 6 — One large media card plus two narrow preview cards

### Viewport and background

- White.
- Media row spans approximately 96vw.

### Spatial composition

- Large rounded media card on the left, about 72–78% of row width.
- Two tall narrow preview cards on the right, each about 10–12%.
- Large card contains:
  - landscape truck image/video;
  - white title and paragraph overlaid bottom-left;
  - dark gradient at the bottom for readability.
- Preview cards show pale simulation/road images.

### Still components

- Active large card.
- Two narrow previews.
- Overlay text.

### Moving components

- Clicking a narrow card makes it expand into the large active position.
- Previous active card contracts into a narrow preview.
- Transition width, clip-path, and image scale over 650–900 ms.
- Can also auto-advance only when the section is in view, but manual control is preferable.

### Component build

```tsx
<MediaAccordionRail>
  <MediaPanel active />
  <MediaPanel />
  <MediaPanel />
</MediaAccordionRail>
```

### Mobile collapse

- Horizontal swipe carousel.
- Every slide uses the same width.

---

## WAABI SAFETY 7 — Full-bleed safety-principle banner

### Viewport and background

- Full-width city/intersection truck image.
- Height: approximately 70–90vh.
- Dark gradient overlay on the left.

### Spatial composition

- Step number and title overlaid at lower-left or mid-left.
- Short supporting copy beneath.
- Large truck spans the middle of the image.

### Moving components

- Can be a slide in a broader principle carousel.
- Background media slowly pans.
- Text reveals when the slide becomes active.

---

## WAABI SAFETY 8 — Insights carousel

Use the same component and geometry as **WAABI HOME 8**.

Differences visible in screenshot:

- Background is white rather than beige on this page.
- Cards remain in a horizontal rail with a clipped right card.

---

## WAABI SAFETY 9 — Shared pink footer

Use the same component and behavior as **WAABI HOME 10**.

---

## WAABI SAFETY — Reusable component inventory

```text
WaabiSafety
├─ VideoHero
├─ MetricsSection
├─ SafetyCoreIntro
├─ ScrollSafetyStory
│  ├─ StepNumberRail
│  ├─ StepCopyStack
│  ├─ ProgressRail
│  └─ StickyMediaSwitcher
├─ TechnologyIntro
├─ MediaAccordionRail
├─ FullBleedPrincipleBanner
├─ InsightsCarousel
└─ PerspectiveFooter
```

---

# 4. MONOLOG — HOME PAGE

## 4.0 Evidence and scope

No full-page screenshot was supplied. This section combines:

- the current homepage content order from `https://bymonolog.com/`;
- the current Awwwards “Homepage Storytelling” capture;
- the current Awwwards “Process Section” capture;
- the current Awwwards “Works Gallery” capture;
- current public element labels for the hero, CTA, about modal, and footer.

This gives a reliable structural picture, but some precise scroll timings remain implementation targets rather than measured originals.

## 4.1 Overall visual grammar

- Near-black or pure black base.
- Off-white text.
- Very large compressed sans-serif display type for section titles.
- Smaller clean sans-serif copy.
- Thin grey rules dividing rows and sections.
- Minimal white/cream panels used for project galleries.
- Layout frequently resembles an editorial contact sheet or art-direction board.
- Global navigation is horizontally centered at the top:
  - MONOLOG wordmark left;
  - About / Work / Services / Process centered;
  - sound toggle and “Start a project” CTA right.
- The header is part of the composition, not a separate tall bar.

### Global desktop shell

- Outer margin: approximately 1.5–3vw.
- Content often sits inside a rounded or clipped rectangular stage.
- Header height: roughly 64–88 px.
- Thin horizontal rules structure sections.
- Black background may include halftone/noise/spotlight gradients outside the central stage.

---

## MONOLOG 1 — Global header

### Spatial composition

- Wordmark at far-left.
- Four plain text links grouped at horizontal center.
- Far-right:
  - small square sound control;
  - light rectangular “Start a project” button with arrow icon.
- Header aligns to the same inner gutters as page content.

### Moving components

- Sound icon toggles site audio.
- Nav links use underline or character-shift hover.
- CTA inverts color and shifts arrow diagonally.
- Header can remain sticky at top with a black translucent background.

### Component build

```tsx
<MonologHeader>
  <Wordmark />
  <CenteredNav />
  <HeaderActions>
    <SoundToggle />
    <StartProjectButton />
  </HeaderActions>
</MonologHeader>
```

### Mobile collapse

- Wordmark left.
- Menu toggle right.
- Move navigation and CTA into a full-screen modal.

---

## MONOLOG 2 — Statement-driven opening hero

### Viewport and background

- Black or cinematic monochrome background.
- Near full viewport height.
- A media image appears in the current DOM before the main H1, so use either:
  - full-bleed monochrome/cinematic media behind the statement; or
  - a media panel that reveals before the text-led hero.

### Spatial composition

- Huge statement occupies the right two-thirds or central majority.
- Supporting descriptor sits below or to the left.
- A small index such as `0# / 03` sits on the left edge or lower-left.
- Two credibility metrics (`15+`, `30+`) appear in separate lower cells.
- The Awwwards homepage-storytelling capture shows:
  - top navigation;
  - a large statement block on the right;
  - a statistic on the left;
  - a client-logo strip along the bottom.

### Still components

- Main statement.
- Supporting line.
- Page/section index.
- Two metric blocks.
- Client logo row.

### Moving components

- Main statement reveals by line with a clipping mask.
- Muted parts of the statement can brighten word by word as the user scrolls.
- Metrics count up or reveal from a vertical mask.
- Client logos can remain static or move as a very slow ticker.
- Cinematic background uses a subtle spotlight/noise movement.

### Scroll behavior

- Pin hero copy for 80–120vh while the statement changes from grey to off-white.
- The metrics and logo row enter near the end of the pinned range.

### Component build

```tsx
<StatementHero>
  <MonologHeader />
  <HeroMediaOrTexture />
  <HeroIndex />
  <LargeStatement />
  <HeroMetrics />
  <ClientLogoStrip />
</StatementHero>
```

---

## MONOLOG 3 — Founder/story section

### Viewport and background

- Black.
- Structured by thin horizontal and vertical rules.

### Spatial composition

- Left narrow column: metric or section label.
- Right large column: paragraph-sized statement about founders and reputation.
- Small founder headshot and attribution sit below the statement.
- Client logos follow in a clean horizontal strip or grid.

### Still components

- Editorial statement.
- Headshot.
- Founder name and role.
- Client logos.

### Moving components

- Text can reveal phrase-by-phrase.
- Headshot fades from grayscale/blur to sharp.
- Logos appear sequentially.

---

## MONOLOG 4 — “We close that gap” image-story sequence

### Viewport and background

- Black.
- Current page contains five project images immediately after this statement.

### Spatial composition

- Large two-part heading, likely split across grid cells: “We close” and “That gap.”
- Short explanatory paragraph beneath or to one side.
- Five project images arranged as a cinematic gallery/contact sheet.
- Images include architecture, product still life, portrait/fashion, automotive/person, and mural/building content.

### Moving components

- Images can enter one at a time with staggered masks.
- Recommended behavior:
  - central or first image grows larger;
  - remaining images slide horizontally behind/alongside;
  - gallery moves at a slower rate than the page;
  - hover reveals project label.
- Do not randomize image motion. Keep it choreographed.

### Component build

```tsx
<GapStory>
  <SplitStatement />
  <SupportingCopy />
  <CinematicImageSequence items={5} />
</GapStory>
```

---

## MONOLOG 5 — Success Stories gallery

**Public-page verified and visually confirmed by Awwwards Works Gallery capture.**

### Viewport and background

- Light cream/off-white content panel inside a dark textured outer stage.
- Panel has a small corner radius.
- Header remains visible at top of the panel.

### Spatial composition

- Left narrow label column: “Success Stories.”
- Main row grid:
  - large project image occupying about 48–55% of panel width;
  - right information column occupying about 28–34%;
  - small story index at the top of the information column;
  - project title;
  - short description;
  - result metric in the lower area.
- Rows are separated by thin horizontal lines.
- Next project row begins immediately below, with the next image and description.

### Still components

- Section label.
- Repeated project rows.
- Large image.
- Project title/description.
- Outcome metric.

### Moving components

- On row hover:
  - image scales slightly within mask;
  - project title shifts 2–4 px;
  - metric highlight appears;
  - custom cursor or “View project” label follows pointer.
- On scroll, project rows can reveal sequentially.
- Keep the gallery vertical, not a conventional card grid.

### Component build

```tsx
<SuccessStoriesPanel>
  <PanelHeader />
  <SectionSideLabel />
  <ProjectStoryRow />
  <ProjectStoryRow />
  <ProjectStoryRow />
</SuccessStoriesPanel>
```

### Mobile collapse

- Full-width image, then title/copy/metric beneath.
- Remove fixed left label column.

---

## MONOLOG 6 — Client testimonial sequence

### Viewport and background

- Black editorial section.

### Spatial composition

- Small index at left or top.
- “Real client stories” label.
- One large quote displayed at a time.
- Small client portrait or image and attribution beneath.
- Three testimonials exist in current page content.

### Moving components

- Horizontal or vertical slide transition between quotes.
- Large quote may use word-by-word reveal.
- Portrait crossfades.
- Provide arrow or drag controls and a visible slide count.

---

## MONOLOG 7 — Services / “What we can help with” image-linked list

### Viewport and background

- Black.
- Six services exist in current content.

### Spatial composition

- Section label at upper-left.
- Large vertical list of service names.
- Thin horizontal rules between entries.
- Each service has an associated image.
- Likely visual behavior:
  - service names remain in a left or central list;
  - image preview appears in a floating frame or in a fixed right column.

### Still components

- Six service rows.
- Hidden or visible image preview layer.

### Moving components

- On hover:
  - corresponding image appears near cursor or in fixed media area;
  - inactive service text fades;
  - active row shifts right slightly;
  - preview image follows pointer with damping.
- On mobile, show image inline beneath each service.

### Component build

```tsx
<ServicePreviewList>
  <ServiceRow image={...} />
  ...
  <FloatingPreview />
</ServicePreviewList>
```

---

## MONOLOG 8 — Project Process section

**Public-page verified and visually confirmed by Awwwards Process Section capture.**

### Viewport and background

- Black rectangular stage inside a grey/halftone outer background.
- Huge compressed title `PROJECT JOURNEY` spans almost the entire width.
- Header is visible above the title.

### Desktop spatial composition

- Title occupies the top 22–30% of the stage.
- Below, a repeated two-row or three-row grid:
  - **far-left:** tiny `STEP — 01` label;
  - **center-left:** step heading and narrow paragraph;
  - **right 40–45%:** large rectangular process image/video.
- Thin horizontal rule separates each step.
- The right media column extends vertically and can show a different crop for each step.

### Still components

- Huge title.
- Three step rows.
- Step numbers.
- Step headings and descriptions.
- Right-side media frames.
- Thin horizontal rules.

### Moving components

- Strongest implementation:
  - title remains sticky briefly;
  - each step row becomes active as it reaches mid-viewport;
  - right media crossfades to the corresponding process video/image;
  - active step copy is white, inactive steps are muted grey;
  - media may be vertically clipped to align with the active row.
- YouTube “see step in action” links can appear on hover or under each step.

### Scroll behavior

- Use sticky right media column across all three steps.
- Left text rows scroll normally.
- Avoid pinning the entire page for too long; 220–300vh total is sufficient.

### Component build

```tsx
<ProjectJourney>
  <HugeSectionTitle />
  <JourneyGrid>
    <JourneyStepList />
    <StickyJourneyMedia />
  </JourneyGrid>
</ProjectJourney>
```

### Responsive collapse

- Huge title wraps to two lines.
- Each step becomes text followed by its own media.
- Remove sticky media.

---

## MONOLOG 9 — FAQ editorial accordion

### Viewport and background

- Black.
- Thin rules separate questions.

### Spatial composition

- Large introductory heading on left or across top.
- Accordion list beneath or in right column.
- Question text is medium-large.
- Expanded answer remains narrow and readable.

### Moving components

- Plus/arrow rotates.
- Answer expands using grid-template-rows or measured height.
- Text fades in 100–180 ms after panel begins opening.

---

## MONOLOG 10 — Cinematic CTA: “Ready to build an experience that moves people?”

### Viewport and background

- Full-viewport or near-full-viewport black cinematic section.
- Public Awwwards element classifies this as a cinematic CTA.

### Spatial composition

- Sentence is broken into several oversized lines or separate grid positions:
  - “Let’s build”
  - “an experience”
  - “That moves”
  - arrow
  - “People”
- Text likely occupies most of the screen.
- CTA link “Tell us your story” sits below or in a side cell.
- Client endorsement can sit near the lower edge.

### Moving components

- Each phrase enters from a different direction or reveals through masks.
- Arrow can travel between phrase blocks as the user scrolls.
- Background may reveal a black-and-white founder/studio image near the end.
- Hovering the CTA may enlarge the arrow or invert the section momentarily.

### Scroll behavior

- Pin for 100–160vh if using phrase choreography.
- Otherwise reveal phrases sequentially in normal flow.

### Component build

```tsx
<CinematicStatementCTA>
  <PhraseGrid />
  <AnimatedArrow />
  <PrimaryCTA />
  <Endorsement />
</CinematicStatementCTA>
```

---

## MONOLOG 11 — About modal

**Current DOM and Awwwards element confirm a full about modal.**

### Viewport and background

- Full-screen overlay above the homepage.
- Likely black background with off-white type and thin rules.
- Independent scroll area if content exceeds viewport.

### Spatial composition

- Top-right or top-left close control plus `esc` label.
- Intro story text.
- Studio metadata: established year and locations.
- Four principle words: listen / create / obsess / inspire.
- Client list.
- Awards list.
- Four principle statements with descriptions.

### Moving components

- Modal opens with full-screen clip-path or vertical wipe.
- Content columns stagger in.
- Page behind is fixed and optionally scales to 0.98.
- Close reverses animation and restores focus to trigger.

### Component build

```tsx
<AboutModal>
  <ModalHeader />
  <StudioStory />
  <StudioMeta />
  <ClientAndAwardsColumns />
  <PrinciplesList />
</AboutModal>
```

---

## MONOLOG 12 — Footer composition

### Viewport and background

- Black, text-led footer.
- Thin rules define multiple metadata rows.

### Spatial composition

- Founder image or black-and-white studio photo near upper footer.
- Navigation list.
- Studio details and email.
- Social links.
- “Ask AI about MONOLOG” links.
- Local city/date/time readout.
- Bottom utility row:
  - Back to top;
  - booking availability;
  - copyright/studio name;
  - final statement “Refuse to be underestimated.”

### Moving components

- Footer details reveal row by row.
- Live time/date updates.
- Final statement may scroll horizontally or enlarge as footer enters.
- Back-to-top has arrow movement.

### Responsive collapse

- Stack all metadata groups.
- Keep bottom statement oversized but wrap safely.

