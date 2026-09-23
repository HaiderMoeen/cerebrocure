# WEBSITE_SPEC.md

## 1. Project Overview

**Cerebrocure** is a marketing/product site for an AI-powered cloud software company focused on stroke care. It helps neurologists make rapid, informed decisions using multimodal clinical data (imaging, clinical, demographic). The site has three routes, rendered as a single-page app with hash-based client-side routing (no server routing, no page reloads):

- `#/` — Home / landing page
- `#/product` — Product page (workflow, billing, platform demo)
- `#/media` — Media / awards & recognition page

There is also an in-page anchor target `#/contact` that routes to Home and scrolls to/flashes a contact card.

**Visual style:** Dark, premium, clinical-but-warm. Deep navy background (`#0F1330`) with a single vivid pink/magenta accent (`#EE4F7F`), inspired directly by the company logo (dark navy circle, pink + white brain line-art, "CEREBROCURE" wordmark). No light mode — the site is permanently dark-themed to match brand identity. Typography pairs a bold display serif-adjacent grotesque (headlines) with a clean humanist sans (body). Cards use soft gradient navy panels with hairline borders, large radii (20–40px), and a glowing pink radial light source behind hero content.

**Design philosophy:** "Confident clinical futurism" — generous whitespace, oversized kinetic typography on load, glassy/gradient panels, scroll-linked reveal animations (content "develops" as the visitor scrolls, echoing a scan/diagnostic metaphor), and a self-animating marquee-style strip of feature cards. Motion is present but restrained: reveals, not gimmicks. `prefers-reduced-motion` is fully respected.

**Target user:** Hospital administrators, neurologists, stroke-care teams, investors, and partners evaluating the AI product; secondary audience is press/award bodies reviewing the Media page.

**Overall UX:** Single long-scroll pages per route, a persistent top nav for switching routes, large kinetic hero on Home, scroll-linked "develop" reveals for cards/panels, a self-scrolling horizontal card strip, a tabbed billing switcher, and a draggable/filterable horizontal card rail with a large "now viewing" feature panel on Media.

**Desktop vs mobile:** Desktop uses multi-column grids (3-step workflow row, 2-column product grid, 2-column contact/media-top grids). Mobile (≤980px and ≤760px breakpoints) stacks all grids to single column, converts the top nav into a collapsible dropdown menu, and shrinks the rotating/strip card sizes. Custom round cursor (used on the Media rail) is disabled on touch/coarse-pointer devices via `(hover:hover) and (pointer:fine)`.

---

## 2. Technology / Implementation Requirements

Recommended stack:

- **React 18 + TypeScript** — component structure, type-safety for the data-driven award/step/wheel content.
- **Vite** — fast dev server and build, trivial static hosting output.
- **Tailwind CSS** — utility-first styling maps cleanly onto the token system below (extend `tailwind.config` with the custom color/spacing/radius tokens rather than inventing new utility values ad hoc).
- **Lucide React** — for the small UI icons (arrows, chevrons). Note: most iconography in this design is **bespoke inline SVG line-art** (brain scan, network diagram, medal, microphone, etc.) — these must be recreated as custom SVG components, not sourced from an icon library.
- **Framer Motion** — for the hero word fly-in, scroll-linked reveal (`useScroll`/`useTransform` or `IntersectionObserver`-driven progress), the billing panel swap, and the media feature-panel swap. Plain CSS `@keyframes` are acceptable for infinite/looping animations (marquee strip, network pulse, flowing dashed lines).
- **react-router-dom** with `HashRouter` (or a minimal custom hash router) — the original uses hash routes (`#/`, `#/product`, `#/media`, `#/contact`) with no page reload; preserve this exact routing scheme including `#/contact` redirecting to Home + scroll + flash.

No unnecessary libraries: no state-management library needed (local component state suffices), no CSS-in-JS library required, no carousel library (the strip and rail are custom-built).

Implementation must be component-based, responsive, accessible (see §17), production-quality, and SEO-reasonable for a marketing site (see §18).

---

## 3. Site Architecture

```
/ (HashRouter)
├── #/            Home
│   ├── Hero (kinetic headline + CTA)
│   ├── Mission panel (scroll reveal)
│   ├── Feature strip (self-scrolling, draggable)
│   └── Contact card (anchor target)
├── #/product     Product
│   ├── Product hero panel ("Cerebrocure" tagline box)
│   ├── Workflow card (3-step process)
│   ├── Billing card (tabbed: Annual / Pay-per-patient)
│   └── Platform demo (real screenshot in framed panel)
├── #/media       Media
│   ├── Overview header + stat counters
│   ├── Featured milestone panel (large, changes on selection)
│   └── Filterable, draggable card rail grouped by region
└── #/contact     → redirects to Home, scrolls to + flashes Contact card
```

Per-route detail:

**Home (`#/`)** — Purpose: convert visitors into partnership inquiries; establish brand mission and five value props. Sections: Hero, Mission, Feature Strip, Contact. Navigation: nav pink-underline "active" state does not apply to Home explicitly (Home has no nav link — brand logo click returns here). Responsive: hero text scales via `clamp()`; mission card scroll-reveal; strip becomes narrower cards, still full-bleed; contact grid stacks to 1 column ≤980px.

**Product (`#/product`)** — Purpose: explain the product process and pricing, and show the platform. Sections: Product hero box, Workflow+Billing 2-col grid, Demo screenshot. Navigation: "Product" nav item gets `.on` active class. Responsive: 2-col grid → 1 col ≤980px; 3-step workflow row → 1 col stacked with rotated connector arrows ≤980px.

**Media (`#/media`)** — Purpose: showcase awards/recognition, filterable and browsable. Sections: overview + stat counters, big feature panel, filter chips, draggable card rail (grouped by region). Navigation: "Media" nav item active. Responsive: top grid (text + stats) stacks ≤980px; feature panel image+text grid stacks ≤980px; rail always horizontally scrollable (never wraps) at all sizes.

---

## 4. Global Design System

### Colors

All colors are defined as CSS custom properties on `:root`, dark-mode only (`color-scheme: dark`, no light variant).

| Semantic name | Token | Hex | Usage |
|---|---|---|---|
| Background | `--bg` | `#0F1330` | Page background, input backgrounds, dark scan panes |
| Background 2 | `--bg2` | `#151A42` | Nav hover background, active nav pill, mobile menu bg |
| Surface | `--surface` | `#1A2050` | Gradient panel end color (cards, boxes, panels) |
| Surface Elevated | `--surface2` | `#222A63` | Gradient panel start color (cards, boxes, panels) |
| Text Primary | `--text` | `#EEF1FF` | Headings, body text, primary content |
| Text Secondary/Muted | `--muted` | `#AAB4E3` | Subtext, descriptions, nav inactive links, captions |
| Border | `--line` | `rgba(238,241,255,.16)` | Hairline borders on cards, nav, inputs, dividers |
| Accent / Primary | `--pink` | `#EE4F7F` | Buttons, active states, glows, headline highlight, icons, focus ring |
| Accent Soft | `--soft` | `#FFB5C9` | Reserved lighter accent (not heavily used; available for hover tints) |
| Secondary Accent (region tag) | `--blue` | `#7C9BFF` | "Europe" region badge/color |
| Tertiary Accent (region tag) | `--lilac` | `#B892FF` | Used for "Accurate" semantic replacement (see note) / region color |
| Warning-ish Accent (region tag) | `--peach` | `#FFC26B` | "Amber" replacement accent, used in billing/step art and region tagging |
| Additional Accent (region tag) | `--coral` | `#FF8A65` | "Asia-Pacific" region badge/color |
| On-Accent Text | `--on-accent` | `#0A1033` | Text color placed on top of `--pink` buttons/active pills (dark navy-on-pink for contrast) |
| Glow | `--glow` | `rgba(238,79,127,.22)` | Radial gradient glow behind hero/panels |

Region badge color map (Media page), each with a semantic accent from the palette above:
- Global → `--pink`
- Europe → `--blue`
- Middle East → `--peach`
- Pakistan → `--lilac`
- Asia-Pacific → `--coral`

**Gradients:**
- Card/panel background: `linear-gradient(165deg, var(--surface2), var(--surface))` — used on Mission card, Workflow card, Billing card, Media feature panel, mobile card rail items.
- Hero/product-box glow: `radial-gradient(60% 50% at 50% 42%, var(--glow), transparent 70%)` layered over `var(--bg)` (Home hero); `radial-gradient(70% 90% at 50% 0, var(--glow), transparent 70%)` layered over the panel gradient (Product hero box).
- Contact card corner glow: `radial-gradient(80% 120% at 100% 0, var(--glow), transparent 60%)` over `var(--surface)`.
- Media page ambient glow: `radial-gradient(50% 40% at 80% 20%, var(--glow), transparent 70%)` over `var(--bg)`.
- Award "art" tile background: `linear-gradient(140deg, color-mix(in srgb, var(--c) 42%, var(--bg2)), var(--bg2))` where `--c` is the per-item region color, plus a repeating radial-gradient dot texture in the corner.

### Typography

- **Display font (headings, large numerals, kinetic hero text):** "Bricolage Grotesque" (Google Fonts, variable, weights 300–800), fallback `"Avenir Next", "Segoe UI", system-ui, sans-serif`.
- **Body font:** "Public Sans" (Google Fonts, weights 400/500/600), fallback `"Segoe UI", system-ui, -apple-system, sans-serif`.
- Base body `line-height: 1.6`; headings `line-height: 1.05`, `letter-spacing: -.02em`.

Typography scale (fluid via `clamp()` — values are `clamp(min, preferred-vw, max)`):

| Level | Clamp (mobile→desktop) | Weight | Letter-spacing | Notes |
|---|---|---|---|---|
| Hero H1 (Home, kinetic) | `clamp(2.9rem, 9.6vw, 8.6rem)` | 700 | `-.04em` | line-height `.98`; "AI" span is weight 800 with `text-shadow: 0 0 60px var(--pink)` |
| Product Hero H1 ("Cerebrocure") | `clamp(2.6rem, 8vw, 6.4rem)` | 700 | `-.04em` | inside the centered product panel |
| Section H2 (Wheel/Demo/Media top) | `clamp(1.8rem–1.9rem, 4–4.4vw, 3–3.4rem)` | default (inherits h2, ~700 via display font) | `-.02em` | |
| Contact/Product-grid H2 | `clamp(1.6rem–1.8rem, 3–3.6vw, 2.4–2.7rem)` | 700 | `-.02em` | |
| Mission label H2 | `clamp(1.2rem, 2.2vw, 1.5rem)` | 600 | default | small eyebrow-style heading with a 38px pink underline-dash prefix |
| Mission statement (p, styled like a heading) | `clamp(1.25rem, 2.6vw, 1.9rem)` | 400 (display font) | `-.015em` | line-height 1.35, max-width 30ch |
| Product tagline p | `clamp(1.1rem, 2.3vw, 1.7rem)` | 400 (display font) | default | line-height 1.3, max-width 34ch |
| Media feature H2 | `clamp(1.5rem, 2.9vw, 2.4rem)` | 700 | default | line-height 1.08 |
| Stat numbers (Media) | `clamp(2.2rem, 4.5vw, 3.6rem)` | 700 | `-.03em` | display font |
| Body / muted text | `1rem` base, `.85`–`.98rem` for captions | 400 | none | Public Sans |
| Nav links | `.92rem` | 400 | none | |
| Buttons | `1rem` | 600 | none | |

No uppercase text-transform anywhere except the brand wordmark "CEREBROCURE" which is set in caps directly in markup/content (not via `text-transform`).

### Spacing

- Section vertical padding: large sections use `60px–120px` top/bottom (e.g. `.wheel-sec{padding:60px 0 100px}`, `.demo{padding:60px ... 120px}`).
- Container horizontal padding: `clamp(16px, 4vw, 40px)` consistently for all `.wrap`/section containers — this is the core responsive gutter used everywhere.
- Card/panel internal padding: large panels use `clamp(24px,3.4vw,44px)` to `clamp(28px,5vw,60px)`/`clamp(28px,6vw,80px)` depending on prominence.
- Grid gaps: `24px` (product grid), `26px` (workflow steps), `22px` (strip card gap, billing panel gaps), `12px`–`20px` (media rail card gaps / internal stacks).
- Nav height: fixed `64px` (`--nav-h`), plus `env(safe-area-inset-top)`.
- Button padding: `14px 26px`.
- Mobile card sizes shrink but padding proportionally maintained (e.g. wheel/strip card padding stays `28px 26px` down to small breakpoints, only card width shrinks).

### Border Radius

- Buttons / nav pills / segmented control / badges: `999px` (full pill).
- Large panels/cards (Mission, Workflow, Billing, Product hero box, Media feature panel): `28px–40px` (`.pbox` 40px, `.box`/`.mission`/`.contact-card` 32px, `.wcard`/`.feat` 26–28px).
- Small inner tiles (step art thumbnails, media card art, screenshot frame): `14px–22px`.
- Media rail cards: `22px`.
- Round logo image: `50%` (circular).
- Round cursor follower (Media rail): `50%`, `86px` diameter.

### Shadows

- Button hover: `0 10px 30px -8px var(--pink)`.
- Mission panel: `0 -30px 80px -40px var(--pink)` (upward glow, since panel overlaps hero).
- Screenshot/demo frame: `0 60px 120px -40px rgba(0,0,0,.6), 0 0 0 1px rgba(238,79,127,.25), 0 0 90px -20px var(--glow)`.
- Media feature panel selection glow (per-card on hover in rail): `0 14px 40px -18px var(--c)` combined with `0 0 0 2px var(--c)` outline when `aria-current="true"`.
- Contact flash keyframe: animated box-shadow `0 0 0 6px var(--pink), 0 0 80px 10px var(--glow)` peaking at 30% of a 1.6s animation.

### Borders

- Standard hairline border: `1px solid var(--line)` (`rgba(238,241,255,.16)`) — used on virtually every card, box, nav bottom edge, input-like elements, chips.
- Focus outline (accessibility): `3px solid var(--pink)`, `outline-offset: 3px`, `border-radius: 8px` via `:focus-visible`.
- Billing segmented control border: `1px solid var(--line)` around the pill-shaped track.
- Screenshot frame gets an additional 1px pink-tinted border baked into its box-shadow (see above) rather than a literal `border` property.

---

## 5. Layout System

- **Max content width:** `1280px` for nav and Media top/rail wrappers; `1180px` for general `.wrap` sections and Product grid; `1120px`/`980px` for the demo screenshot frame (narrower, since it's a focal object); `1000px` for Mission panel and Contact card (narrower centered panels); `1080px` for the Product hero panel.
- **Container behavior:** all wrappers are `margin: 0 auto` with `padding: 0 clamp(16px,4vw,40px)` — a single fluid gutter system, no fixed breakpoint-based padding table.
- **Grids/Flex:**
  - Nav: flex row, `justify-content: space-between`.
  - Product grid: CSS grid, `grid-template-columns: 1.85fr 1fr` (Workflow wider than Billing) → `1fr` stacked ≤980px.
  - Workflow steps: CSS grid, `repeat(3, 1fr)` → `1fr` stacked ≤980px, with connector arrows rotated from pointing right to pointing down.
  - Contact card: CSS grid, `1.1fr 1fr` → `1fr` stacked ≤980px.
  - Media top header: CSS grid, `1.5fr 1fr` → `1fr` stacked ≤980px.
  - Media feature panel: CSS grid, `minmax(0,1fr) minmax(0,1.1fr)` (art tile, then text) → `1fr` stacked ≤980px.
  - Feature strip & Media rail: flex row, `width: max-content`, natural horizontal overflow, no wrap — always horizontally scrollable/draggable regardless of viewport.
- **Full-bleed sections:** the feature strip (`.strip`) breaks out of its container using `width:100vw; left:50%; margin-left:-50vw` to span true edge-to-edge, then applies a horizontal mask-image fade at both ends.
- **Sticky/fixed elements:** Nav is `position:fixed; top:0` across all routes, `z-index:50`. The custom round cursor follower on the Media rail is `position:fixed`, `z-index:80`.
- **Z-index/layering:** Nav (50) > cursor (80, only active on Media) > page content (default stacking) > Mission panel intentionally overlaps the hero above it via negative `margin-top` on `.mission-sec` and `z-index:3`; Product grid similarly overlaps the Product hero box via negative `margin-top` and `z-index:3`.
- **Section heights:** Hero (`.hero`) and Product hero (`.p-hero`) are `min-height:100svh` (dynamic viewport height, mobile-safe) so they fill the first screen; other sections size to content.

---

## 6. Responsive Design

Breakpoints actually used in the source (mobile-first is NOT used — this is desktop-first with `max-width` overrides):

- **Desktop / base styles:** > 980px (no media query needed — this is the default cascade).
- **Tablet/Mobile transition:** `@media (max-width: 980px)`.
- **Small mobile / nav collapse:** `@media (max-width: 760px)`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` — global, cross-cutting.

### ≤980px changes
- `.p-grid-in` (Product grid): `1.85fr 1fr` → `1fr` (Workflow and Billing stack vertically, Workflow on top).
- `.steps` (Workflow 3-step row): `repeat(3,1fr)` → `1fr`; connector chevron rotates from `45deg` (pointing right) positioned at `top:70px;right:-22px` to `135deg` (pointing down) positioned at `bottom:-22px;left:24px`, with extra `padding-bottom:16px` on each step.
- Demo screenshot `.app` mock grid (if a mock frame is retained) collapses `200px 1fr 250px` → `1fr` single column, side rails lose their border.
- `.contact-card`: `1.1fr 1fr` → `1fr` (heading/copy stacks above the contact link list).
- `.m-top` (Media header): `1.5fr 1fr` → `1fr`; `.m-stats` switches from `justify-content:flex-end` to `flex-start`.
- `.feat` (Media feature panel): `minmax(0,1fr) minmax(0,1.1fr)` → `1fr` (art image stacks above text).
- `.m-wrap` loses its `min-height:100svh` constraint (becomes auto height) since content now stacks taller.
- `.mission-sec` negative overlap margin reduces from `-17vh` to `-14vh` to avoid excessive overlap on shorter mobile hero.

### ≤760px changes
- Desktop nav `<ul>` links are hidden by default; a `.menu` hamburger-style text button (labelled "Menu") appears (`display:block`), toggling an `.open` class on the `<ul>` which switches it from `display:none` to a `position:absolute; flex-direction:column` dropdown panel anchored just below the nav bar, full-width, with page background and a bottom border.
- Feature-strip cards (`.wcard`) shrink via a base flex-basis reduction (from 320px desktop toward a narrower mobile size — implement as `flex-basis: clamp(220px, 70vw, 320px)` or an explicit ≤760px override reducing to ~230–270px) to avoid overflow/oversized cards on small phones.

### General mobile behavior (all breakpoints)
- Typography scales fluidly via `clamp()` — no separate mobile font-size table beyond the clamp minimums already specified in §4.
- Horizontal-scroll rails (Feature Strip, Media Card Rail) NEVER wrap into a grid on mobile — they remain horizontally scrollable/draggable at every screen size (touch `pan-y` allowed so vertical page scroll still works while horizontal drag is captured via pointer events).
- No horizontal page overflow: `overflow-x: clip` is set on `html/body` and `.page` to prevent the full-bleed strip or any transform-based animation from creating scroll-jank.
- The custom round "Drag/Open" cursor on the Media rail is automatically disabled on touch devices via `@media (hover:hover) and (pointer:fine)` — on touch, the rail falls back to native touch scrolling and tap-to-select with no custom cursor.
- Buttons remain full pill-shape and do not become full-width blocks; they wrap naturally within flex containers.
- Images (logo, screenshot) use `width:100%; height:auto` scaling within their frames; screenshot frame max-width caps at 980px and shrinks fluidly below that.

---

## 7. Global Components

### `Nav` (Header/Navbar)
*Purpose:* Persistent top navigation and brand identity, present on all routes.
*Props:* `activeRoute: 'home' | 'product' | 'media'`.
*Visual appearance:* Fixed bar, translucent blurred background (`backdrop-filter: blur(14px)`, background = `bg` at 72% opacity mixed with transparent), 1px bottom hairline border.
*Dimensions:* height `64px` + top safe-area inset; inner content max-width `1280px`, horizontal padding `clamp(16px,4vw,40px)`.
*Typography:* Brand wordmark in display font, weight 700, `1.15rem`; subtitle "Technologies" in body font, `.78rem`, muted color.
*Colors:* background per above; links `--muted` default, `--text` on hover/active; active link gets `--bg2` pill background + inset bottom box-shadow in `--pink` (2px).
*Spacing:* nav link padding `8px 14px`, border-radius `999px`, gap `6px` between items.
*States:* default (muted text), hover (darker pill + text color), active/current route (`.on` class — pill + pink underline).
*Interactions:* clicking brand logo/wordmark returns to Home (`#/`); clicking a nav item navigates via hash; on mobile the hamburger button toggles the link list open/closed and auto-closes on route change.
*Responsive behavior:* becomes a hamburger dropdown ≤760px (see §6).
*Animation:* link hover/active use `transition: background .2s, color .2s` — no motion library needed.
*Accessibility:* `<nav aria-label="Main">`; hamburger button has `aria-expanded` and `aria-controls` wired to the link list id.

### `Logo`
*Purpose:* Brand mark, circular navy badge with pink/white brain line-art and "CEREBROCURE" wordmark baked into the image (treat as a single raster/vector asset, not recreated in CSS/SVG).
*Visual appearance:* Circular, transparent background outside the circle (background checkerboard removed/cropped to a true circular alpha mask).
*Dimensions:* `40–42px` in the nav; `48px` in the footer.
*Usage:* nav (before wordmark text), footer (above "CEREBROCURE" column heading).

### `Button` (`.btn`)
*Purpose:* Primary call-to-action element.
*Variants:* Solid (`--pink` background, `--on-accent` text) and Ghost (`transparent` background, `1px solid var(--line)` border, `--text` color).
*Visual appearance:* Full pill (`border-radius:999px`), `14px 26px` padding, weight 600, inline-flex with `10px` icon gap if an icon is present.
*States:* Default; Hover (`translateY(-2px)` + colored glow shadow `0 10px 30px -8px var(--pink)` for solid; ghost just changes border-color to pink, no lift); Focus (global focus-visible ring); Disabled (not used in current design but should follow standard reduced-opacity + no-pointer pattern if added); no loading/error state present in current scope.
*Interactions:* Standard link/button click navigates or submits (e.g. mailto/tel links styled with `.contact-list a`, not `.btn`, are a separate pattern — see Contact card).
*Responsive:* unchanged sizing across breakpoints (pill scales with font, not viewport).

### `RevealPanel` (`.rv`, `.rv-tilt` utility wrapper)
*Purpose:* Generic scroll-linked reveal wrapper applied to Mission panel, Workflow box, Billing box, and the Demo screenshot frame.
*Mechanism:* A CSS custom property `--p` (0→1 "progress") is computed in JS from the element's `getBoundingClientRect().top` relative to viewport height, then referenced inside `transform`/`opacity`/`filter` `calc()` expressions in CSS.
*Visual appearance — `.rv`:* translates up `90px→0`, scales `0.9→1.0`, opacity `0.3→1.0` as it enters; a nested `.dim` child (heading) additionally blurs from `7px→0` and eases opacity via `p²` for a slower, more dramatic reveal of the heading specifically.
*Visual appearance — `.rv-tilt`:* used only on the Demo screenshot; applies a 3D perspective tilt (`rotateX` from `26deg→0deg`) plus vertical translate and scale, simulating the frame "laying flat" as it's scrolled into view (`transform-origin: 50% 100%`).
*Reduced motion:* when `prefers-reduced-motion: reduce` is set, `--p` is forced to `1` immediately (no animation, content fully visible).

### `FeatureStrip` (self-moving marquee)
*Purpose:* Home page's showcase of 5 value props, presented as a full-bleed, continuously auto-scrolling, user-draggable horizontal strip.
*Structure:* an outer masked viewport (`.strip`, full-bleed via negative margins, horizontal fade mask at both edges) containing a `.track` flex row. The track's children are cloned/repeated (N sets, enough to cover `innerWidth + one extra set`) to create a seamless infinite loop.
*Card (`.wcard`):* fixed flex-basis `320px` (desktop) / narrower on small mobile, `230px` min-height, `28px 26px` padding, icon (46×46 SVG line icon, pink stroke), title (`1.8rem` display font), description (`1rem`, muted).
*Motion:* auto-scrolls left continuously at a slow constant velocity when not hovered/dragged and the strip is in viewport (`IntersectionObserver` gate to pause off-screen for performance); on `pointerdown` the user can drag horizontally, imparting velocity that decays with friction (`vel *= 0.94` per frame) after release; hovering pauses the automatic drift (`hoverW` flag) but does not cancel residual drag momentum.
*Looping math:* horizontal offset is wrapped modulo one full "set width" (`((off % setW) - setW) % setW`) so it never runs out of cloned content.
*Content (Home wheel/strip cards, in order):*
  1. **Rapid** — "Helps in timely decision making." (icon: clock)
  2. **Throughput** — "Increases diagnostics and treatment throughput." (icon: bar chart)
  3. **Multimodal** — "Get insights from the different types of data in clinical settings." (icon: three overlapping circles)
  4. **Accurate** — "Reduces human error." (icon: target/crosshair)
  5. **Simple** — "No need to install hardware or software in your existing workflow." (icon: checkmark)
*Accessibility:* cards are static informational content (not links) — decorative icons `aria-hidden="true"`; a visible caption below the strip reads "Hover to pause. Drag to move it yourself."

### `SegmentedTabs` (Billing toggle)
*Purpose:* Switch between two billing model descriptions.
*Structure:* pill-track (`.seg`, `role="tablist"`) containing two `role="tab"` buttons ("Annual license fee", "Pay per patient"), each toggling `aria-selected`.
*Visual appearance:* selected tab gets solid `--pink` background + `--on-accent` text; unselected is transparent with muted text.
*Panels:* two `role="tabpanel"` divs (`#b-lic`, `#b-ppp`), only one has class `.on` (display:flex) at a time; switching animates the newly shown panel in via a `swap` keyframe (`opacity 0→1`, `translateY(14px→0)`, `.45s`).
*Content:*
  - **Annual license fee** — icon: clock/orbit graphic — "One yearly fee for your hospital or network."
  - **Pay per patient** — icon: three small figure/avatar glyphs — "Pay for the patients you run through Cerebrocure."
*Footer copy inside the Billing card:* "Please get in touch for further inquiries." + a full-width `.btn` "Get in touch" linking to `#/contact`.

### `WorkflowSteps`
*Purpose:* Visualize the 3-stage product process inside the larger Product-grid card.
*Structure:* `.steps` grid of 3 `.step` blocks, each with: an `.art` thumbnail tile (aspect-ratio `220/150`, rounded, bordered, containing custom line-art SVG), a numbered label (`Step 1/2/3` in small pink display-font caps + the step name in body font), a description sentence, and (Step 1 only) a row of `.chips` pill tags.
*Connector:* a small rotated-square chevron (`::after` pseudo-element, 18×18px, pink border-top+border-right at 45°) between steps, indicating flow left→right (or top→bottom stacked on mobile).
*Content:*
  1. **Step 1 — Input:** "Imaging, clinical and demographic input." Chips: `Imaging`, `Clinical`, `Demographic`. Art: three rounded tiles depicting a brain-scan icon, a text/clinical-note icon, and a person/demographic icon, linked by animated flowing dashed connector lines (`.gline.hot`, pink dashed strokes animating via `stroke-dashoffset`).
  2. **Step 2 — AI processing:** "The model reads every data type together, in the cloud." Art: a generated feed-forward neural-network diagram (4 layers of nodes: 1→3→3→1 wide) with animated dashed "hot" edges flowing toward the output node, which pulses (`.pulse` keyframe scaling 1↔1.35 with opacity dip) to represent the model's live inference.
  3. **Step 3 — Output:** "Diagnostics and treatment recommendations." Art: a bordered report-card tile with a small brain/lesion glyph, two progress-bar rows (a filled pink bar and a filled peach/amber bar, representing two diagnostic metrics at partial fill), and a green checkmark-in-circle "approved" glyph.

### `PlatformDemo`
*Purpose:* Show the real product UI as social proof.
*Structure:* a `.frame-wrap` (with `.rv-tilt` scroll-tilt reveal) containing `.shot`, a padded gradient-bordered card wrapping the actual screenshot `<img>` of the "Cerebrocure Stroke Prognosis" web app.
*Image:* the real uploaded product screenshot (Patient demographics, Presentation/Admission, Treatment, Known Risk Factors, Laboratory Results form panels, "Clinical/Imaging" toggle pills, Save button) — embed as a static asset, `width:100%; height:auto; border-radius:16px` inside the frame. Alt text: "Cerebrocure Stroke Prognosis screen showing demographics, presentation, treatment, risk factors and laboratory results."
*Caption above it:* H2 "Inside the platform" + subtext "A look at the Cerebrocure Stroke Prognosis screen."

### `ContactCard`
*Purpose:* Conversion panel for partnership inquiries, reachable from Home hero CTA and nav "Partner with us" (routes to `#/contact`).
*Structure:* 2-column card (heading+copy | list of 3 contact-method links), corner radial glow background.
*Content:*
  - Heading: "Partner with us"
  - Copy: "Talk to us about bringing Cerebrocure to your stroke team, hospital or research programme."
  - Email → `mailto:info@cerebrocure.ai` (label "Email")
  - Phone → `tel:+923224774095` (label "Phone", displayed "+92 322 4774095")
  - LinkedIn → `https://www.linkedin.com/in/saira-osama/` (label "LinkedIn", displayed "Dr. Saira Osama")
*Each contact link (`.contact-list a`):* rounded rectangle, hairline border, hover shifts `translateX(4px)` + border turns pink.
*Flash behavior:* when navigated to via `#/contact`, the card gets a `.flash` class re-triggered (class removed then re-added to restart animation), producing a 1.6s pulsing pink glow/box-shadow to draw the eye.

### `MediaFeaturePanel`
*Purpose:* Large "now viewing" display for the currently selected award/milestone on the Media page.
*Structure:* 2-column card — left: a generated "art" tile (gradient background tinted by the item's region color, a large centered custom line-icon glyph, and a bottom-left large year numeral) — right: kicker row (tag badge + "Region, Year"), H2 title, description paragraph, action row (optional "View the post" button linking to source URL, prev/next circular icon buttons, and a "`X of Y`" counter reflecting position within the currently filtered set).
*Animation:* swaps content with the same `swap` keyframe (fade+slide-up, .55s) whenever selection changes.
*Icon glyph set (by category):* medal (award/finalist/winner), mic (speaking/keynote/lecture), booth (exhibitor), chip (accelerator/program), people (appointment/special guest), cert (certificate/programme completion).

### `RegionFilterBar`
*Purpose:* Toggle the Media rail/feature set between "All regions" and one specific region.
*Structure:* row of pill buttons (`role="group"`), each labeled with region name + a muted count badge (`<em>`), `aria-pressed` reflecting selection; selected pill is solid `--text`-on-`--bg` (inverted), unselected are outlined muted pills that darken/border-pink on hover.
*Regions (in display order), with counts from current content:* All regions (13), Global (4), Europe (2), Middle East (1), Pakistan (4), Asia-Pacific (1).

### `MediaCardRail`
*Purpose:* Horizontally scrollable, draggable, filterable list of all award/milestone cards, grouped visually by region with a vertical region-name label per group.
*Structure:* `.rail` flex row containing `.grp` groups (one per region present in the current filter), each group prefixed by a vertical (`writing-mode: vertical-rl`, rotated 180°) region-name label colored with that region's accent, separated by a left hairline border. Inside each group are `.mcard` buttons.
*Card (`.mcard`):* horizontal layout — small `78px`-wide art thumbnail (same glyph system as the feature panel, no year numeral shown) + text block (small caption "`Year · Tag`" then a 3-line-clamped bold title).
*Selected state:* `aria-current="true"` gets a colored 2px outline + colored drop-shadow glow matching its region color.
*Interaction:* click/tap selects the card (updates `MediaFeaturePanel` + scrolls the rail to center it); pointer-drag scrolls the rail horizontally (desktop, non-touch pointers only — native touch scrolling used on touch devices); mouse-wheel vertical scroll is redirected to horizontal rail scroll when the rail is wider than its viewport and not already at an edge; Left/Right arrow keys step selection forward/back when the Media route is active and focus is not inside a text input.
*Custom cursor:* on fine-pointer devices, hovering the rail replaces the system cursor with a following circular pink "Drag" / "Open" (context-sensitive label + small arrow icon) badge that lerps toward the pointer position each animation frame and scales up slightly when hovering directly over a card.

### `StatCounters` (Media header)
*Purpose:* Quick-glance totals.
*Structure:* `<dl>` with two stat blocks, each a `flex-direction: column-reverse` pairing of a small muted label (`<dt>`) under a large bold number (`<dd>`).
*Content:* "Milestones" → 13 (dynamic: `ITEMS.length`); "Regions" → 5 (dynamic: distinct region count).

### `Footer`
*Purpose:* Closing global navigation + contact recap + copyright.
*Structure:* two-column flex-wrap layout: left column "CEREBROCURE" (logo image above heading, then a link list: Home, Privacy Policy [external link to `https://cerebrocure.ai/privacy-policy/`]); right column "Quick contact" (email, phone, LinkedIn links, same destinations as the Contact card). Below both columns, a full-width copyright line.
*Content:* "Copyright © 2025 Cerebrocure Technologies Pvt Ltd – All Rights Reserved. Design prototype."
*Colors:* background `--bg2`, top hairline border `--line`.

---

## 8. Page-by-Page Specification

## Page: Home

### Route
`#/`

### Purpose
Kinetic first impression of the brand mission, quick scannable value props, and a conversion path to contact.

### Overall Layout
Single scrolling column: full-viewport Hero → overlapping Mission panel → full-bleed auto-scrolling Feature Strip → centered Contact card. No sidebar. Background is a flat `--bg` for the strip/contact sections; Hero and Mission areas sit on a radial pink glow.

### Section 1: Hero
#### Structure
`<section class="hero">` — flex column, centered content, full `100svh` height, generous bottom padding (`22vh`) to leave room for the overlapping Mission panel below it.
#### Dimensions
Full width, `min-height:100svh`; top padding = nav height + 24px.
#### Positioning
Content is centered both axes; background radial glow centered at `50% 42%`.
#### Typography
See §4 Hero H1 scale. Two lines: Line 1 = "Innovating Healthcare"; Line 2 = "Through **AI**" (AI styled distinctly, heavier weight + pink glow text-shadow).
#### Colors
Text `--text`; "AI" gets pink glow shadow; background `radial-gradient(60% 50% at 50% 42%, var(--glow), transparent 70%)` over `--bg`.
#### Components
`Button` (solid) below the heading: "Contact us for partnerships" → `#/contact`.
#### Images / Assets
None (glow is CSS-only).
#### Interactions
Button click routes to Contact.
#### Animations
On route entry (and on every re-entry to Home), each word in the headline flies in from an individually assigned off-screen origin (`--x`,`--y`,`--r` custom properties per word — e.g. "Innovating" flies from `-70vw`, "Healthcare" from `+70vw`, "Through" from below (`+60vh`), "AI" from above (`-60vh`)), each with slight rotation and a blur-out-to-sharp transition, staggered `0.14s` per word via `--i` index, `1.25s` duration, `cubic-bezier(.16,1,.3,1)` easing. The CTA button fades/slides up (`translateY(20px→0)`, `.8s`) starting at `1.3s` delay, after the headline finishes. Animation is retriggered every time the Home route becomes active (class toggled off then on to restart).
#### Responsive Behavior
Font size scales via clamp; layout stays centered/stacked at all sizes; on very small screens the two-line headline may visually wrap further within each line since each "line" is itself a flex/inline-block of words — allow natural wrapping.

### Section 2: Mission
#### Structure
`<section class="mission-sec">` (negative top-margin to overlap the Hero, `z-index:3`) containing a single centered `.mission` card.
#### Dimensions
Card `max-width:1000px`, `min-height:340px`, `border-radius:32px`.
#### Positioning
Centered horizontally, pulled up over the Hero's bottom padding via `margin-top:-17vh` (`-14vh` ≤980px).
#### Typography
Eyebrow H2 "Our Mission" (small, with a 38px pink dash before it); statement paragraph in large display-font italic-weight-400 style: "To equip clinicians with AI technology as a decision-making tool for better patient outcomes in stroke."
#### Colors
Card gradient `linear-gradient(160deg, var(--surface2), var(--surface))`, `1px solid var(--line)` border, upward pink glow shadow.
#### Components
None beyond text.
#### Images / Assets
None.
#### Interactions
None (passive scroll reveal only).
#### Animations
Scroll-linked reveal (`.rv` + `.dim` on the paragraph): rises `90px→0`, scales `0.9→1`, fades `0.3→1` as it enters the lower half of the viewport; the paragraph itself additionally blurs in (`7px→0px`) and eases opacity quadratically, so the statement text visibly "develops"/sharpens distinctly from the panel's own fade-in.
#### Responsive Behavior
Padding and font scale via clamp; overlap amount reduces on mobile (§6).

### Section 3: Feature Strip
#### Structure
`<section class="wheel-sec">` with a centered H2 "What Cerebrocure gives your team" + muted subtext "Five things stroke teams get from the platform.", followed by the full-bleed `FeatureStrip` component, followed by a small centered hint caption.
#### Dimensions
Section padding `60px 0 100px`; strip is `100vw` wide (full-bleed, breaks out of the content container) with edge fade mask; each card `320px` wide (narrower on small mobile), `230px` min-height.
#### Positioning
Full-bleed relative to the viewport, not the content container.
#### Typography
H2 per §4 scale; card titles `1.8rem` display font; card body `1rem` muted.
#### Colors
Cards: `linear-gradient(165deg, var(--surface2), var(--surface))`, `1px solid var(--line)`, pink border + `translateY(-6px)` lift on hover; icons stroked in `--pink`.
#### Components
5× feature card (see `FeatureStrip` content list in §7).
#### Images / Assets
5 bespoke inline SVG line icons (clock, bar-chart, three-overlapping-circles, target, checkmark).
#### Interactions
Drag to manually scroll; hover pauses auto-scroll; hover on an individual card lifts it and turns its border pink.
#### Animations
Continuous auto-scroll marquee (see `FeatureStrip` mechanism in §7); pauses when off-screen (`IntersectionObserver`) or while dragging/hovering.
#### Responsive Behavior
Card width narrows on small screens; strip remains full-bleed and horizontally scrollable at all sizes; never becomes a static grid.

### Section 4: Contact
#### Structure
`<section class="contact" id="contact">` containing the `ContactCard` component (id `contactCard` for the flash-retrigger logic).
#### Dimensions
Card `max-width:1000px`, `border-radius:32px`, 2-column grid `1.1fr 1fr` (stacks ≤980px).
#### Positioning
Centered, standard document flow (not overlapping).
#### Typography / Colors / Components / Interactions
See `ContactCard` spec in §7.
#### Animations
`.flash` keyframe re-triggered on navigation to `#/contact` (remove class, force reflow via `offsetWidth` read, re-add class) — pulses a pink glow box-shadow over 1.6s.
#### Responsive Behavior
Grid stacks to 1 column ≤980px; contact link rows remain full-width.

---

## Page: Product

### Route
`#/product`

### Purpose
Explain what the product does, how the workflow/pricing work, and prove the platform is real via a screenshot.

### Overall Layout
Full-viewport centered hero panel → overlapping 2-column grid (Workflow + Billing) → full-width Demo section with the framed screenshot.

### Section 1: Product Hero Panel
#### Structure
`<section class="p-hero">` (full `100svh`, centered) containing a single large rounded panel `.pbox`.
#### Dimensions
Panel `width:min(1080px,100%)`, `min-height:min(66svh,620px)`, `border-radius:40px`.
#### Positioning
Centered in the viewport; internal content also centered (flex column).
#### Typography
Small pill tag "Cloud software for stroke care" (with a small pink pulsing-dot indicator) above an H1 "Cerebrocure" (largest H1 on the site, `clamp(2.6rem,8vw,6.4rem)`), followed by a tagline paragraph: "An AI-powered cloud software to assist neurologists make rapid and informed decisions for better patient outcomes in stroke."
#### Colors
Panel gradient `linear-gradient(170deg, var(--surface2), var(--surface))` with a top radial pink glow `radial-gradient(70% 90% at 50% 0, var(--glow), transparent 70%)`; `1px solid var(--line)` border.
#### Components
Tag pill (with pulsing pink dot `i` element), H1, tagline `<p>`.
#### Images / Assets
None beyond CSS glow.
#### Interactions
None (static content panel).
#### Animations
None beyond ambient dot glow (constant `box-shadow`, not animated) — this panel does not scroll-reveal (only its children below do).
#### Responsive Behavior
Panel padding and typography scale via clamp; min-height caps prevent it from feeling too tall on short viewports.

### Section 2: Workflow + Billing Grid
#### Structure
`<section class="p-grid">` (negative top-margin overlapping the hero panel, `z-index:3`) with `.p-grid-in`, a 2-column grid: `.box#wf` (Workflow, wider) and `.box.bill#billbox` (Billing, narrower).
#### Dimensions
Grid columns `1.85fr 1fr` (stacks to `1fr` ≤980px), gap `24px`; each box `border-radius:32px`, padding `clamp(24px,3.4vw,44px)`.
#### Positioning
Overlaps hero via `margin-top:-14vh`.
#### Typography
Each box H2 (Workflow / Billing) uses `.dim` reveal-blur styling like the Mission heading.
#### Colors
Both boxes share the `linear-gradient(165deg, var(--surface2), var(--surface))` gradient + `1px solid var(--line)` border.
#### Components
`WorkflowSteps` (3-step grid, see §7) inside the Workflow box; `SegmentedTabs` billing switcher inside the Billing box, plus a footer CTA ("Please get in touch for further inquiries." + `Button` "Get in touch" → `#/contact`).
#### Images / Assets
Custom inline SVG diagrams for each workflow step (input icons + animated connector lines; feed-forward network diagram; output report-card diagram) and for each billing panel (clock/orbit graphic for Annual; three small avatar/figure glyphs for Pay-per-patient).
#### Interactions
Billing tabs click to switch panel (see `SegmentedTabs`); "Get in touch" button routes to Contact.
#### Animations
Both boxes scroll-reveal via `.rv`/`.dim` (rise+fade+scale, heading blur-sharpen) as the user scrolls down from the hero. Step 2's network diagram has continuously animated flowing dashed edges (`stroke-dashoffset` loop) and a pulsing output node. Billing panel swap animates via the `swap` keyframe.
#### Responsive Behavior
Grid stacks to 1 column ≤980px (Workflow above Billing); 3-step row stacks to 1 column with rotated connector chevrons ≤980px.

### Section 3: Demo
#### Structure
`<section class="demo">` — centered H2 "Inside the platform" + subtext, then `PlatformDemo` (framed real screenshot).
#### Dimensions
Section padding `60px ... 120px`; frame-wrap `max-width:980px`; inner `.shot` padding `12px`, `border-radius:26px`; image itself `border-radius:16px`, full width, auto height.
#### Positioning
Centered.
#### Typography
H2 per §4 scale; subtext muted.
#### Colors
Frame gradient background `linear-gradient(165deg, var(--surface2), var(--surface))`; heavy drop shadow + pink-tinted 1px ring + soft pink ambient glow (see §4 Shadows).
#### Components
`PlatformDemo`.
#### Images / Assets
**Real asset:** the uploaded "Cerebrocure Stroke Prognosis" application screenshot (720×374 source resolution; will look best if a higher-resolution version is supplied — flag this to design/content team). This is not a placeholder — it is the actual product UI and must be reproduced pixel-for-pixel via the image file, not redrawn.
#### Interactions
None (static image; not clickable).
#### Animations
Scroll-linked 3D tilt reveal (`.rv-tilt`): the frame rotates in from `rotateX(26deg)` (tilted back like a laptop screen laying down) to `rotateX(0deg)` (flat/frontal) as it enters the viewport, combined with translateY and scale, `transform-origin: 50% 100%` (hinges from the bottom).
#### Responsive Behavior
Frame scales fluidly down to mobile widths; no layout restructuring needed since it's a single centered image frame.

---

## Page: Media

### Route
`#/media`

### Purpose
Showcase press coverage, awards, and institutional recognition in a browsable, filterable format rather than a flat list.

### Overall Layout
Full `100svh`-ish flex column (header → feature panel → filter/rail), stacking naturally past the viewport as content grows; ambient top-right radial glow.

### Section 1: Overview Header + Stats
#### Structure
`<header class="m-top">` — 2-column grid: left = H1 + descriptive paragraph; right = `StatCounters`.
#### Dimensions
Grid `1.5fr 1fr` (stacks ≤980px), max-width `1280px`.
#### Positioning
Top of the Media section, right below the fixed nav.
#### Typography
H1 "Recognition for AI in stroke care" (`clamp(2rem,4.6vw,3.8rem)`); paragraph (muted, max-width ~58ch) — exact copy in §20.
#### Colors
Standard text/muted tokens; section background has an ambient `radial-gradient(50% 40% at 80% 20%, var(--glow), transparent 70%)` over `--bg`.
#### Components
`StatCounters`.
#### Interactions
None.
#### Animations
None (static header; the feature panel below is what animates on selection change).
#### Responsive Behavior
Stacks to 1 column ≤980px; stats left-align instead of right-align.

### Section 2: Feature Panel
#### Structure
`<div class="m-stage" aria-live="polite">` rendering the current `MediaFeaturePanel`.
#### Dimensions
Flexes to fill available vertical space (`flex:1; min-height:300px`) within the `.m-wrap` flex column; internal 2-column grid `minmax(0,1fr) minmax(0,1.1fr)` (stacks ≤980px).
#### Positioning
Below the header, above the filter/rail.
#### Typography/Colors/Components
See `MediaFeaturePanel` in §7.
#### Interactions
Prev/Next icon buttons step through the currently filtered set (wrapping around); clicking a rail card also updates this panel.
#### Animations
`swap` keyframe fade+slide on every selection change (`.55s`).
#### Responsive Behavior
Stacks image above text ≤980px.

### Section 3: Filters + Rail
#### Structure
`<div class="m-rail">` containing `RegionFilterBar` then `MediaCardRail`.
#### Dimensions
Max-width `1280px`; rail cards `232px` flex-basis, `104px` min-height; art thumbnail `84px` height inside each card.
#### Positioning
Bottom of the Media page content.
#### Typography/Colors/Components
See `RegionFilterBar` and `MediaCardRail` in §7.
#### Interactions
Filter chip click narrows the rail + resets/validates the current selection if it's filtered out; card click/drag/keyboard-arrow selection (see `MediaCardRail`); mouse-wheel redirected to horizontal scroll; custom cursor on non-touch pointers.
#### Animations
Card hover lift (`translateY(-4px)`) + border color transition; selected card gets colored outline+glow; custom cursor lerps toward pointer position every animation frame and scales on card-hover.
#### Responsive Behavior
Rail always horizontally scrolls, never wraps, at every breakpoint; custom cursor auto-disables on touch/coarse pointers via media query.

---

# 9. Header / Navigation

- **Height:** `64px` fixed, plus `env(safe-area-inset-top,0px)` padding above it.
- **Width:** full viewport width, inner content capped at `1280px` centered.
- **Position:** `fixed; top:0; left:0; right:0; z-index:50`.
- **Background:** `color-mix(in srgb, var(--bg) 72%, transparent)` with `backdrop-filter: blur(14px)` (and `-webkit-backdrop-filter`) — a persistent translucent blur, not a "transparent until scroll" pattern. It does not change appearance based on scroll position (no scroll-triggered background swap in the current design — implement as always-blurred/translucent from load).
- **Border:** `1px solid var(--line)` bottom edge only.
- **Logo dimensions:** `40–42px` circular image + wordmark text beside it ("CEREBROCURE" bold + "Technologies" muted subtitle stacked, or inline — current markup places them in one flex row with the small subtitle inline after "CEREBROCURE").
- **Navigation items (desktop, in order):**
  1. "About the founder" → external link `https://cerebrocure.ai/about-the-founder/` (opens new tab, `target="_blank" rel="noopener"`) — this page is NOT part of the rebuilt SPA; it links out to the existing live site.
  2. "Media" → `#/media`
  3. "Product" → `#/product`
  4. "Partner with us" → `#/contact`
*(Note: there is no explicit "Home" nav link — the logo/wordmark serves as the home link.)*
- **Font styles:** `.92rem`, body font, muted color default.
- **Active state:** current-route link gets background `--bg2` pill + `box-shadow: inset 0 -2px 0 var(--pink)` (a pink underline drawn via inset shadow) + text color `--text`.
- **Hover state:** background `--bg2`, text `--text`, `transition: background .2s, color .2s`.
- **CTA:** "Partner with us" is styled identically to other nav links (a pill nav item), not as a distinct solid button, in the top nav.
- **Icons:** none in the nav besides the logo image.
- **Dropdowns:** none besides the mobile hamburger panel.
- **Sticky/scroll behavior:** always fixed and always visible; does not hide on scroll-down or reveal on scroll-up; does not change blur/opacity based on scroll position.
- **Mobile navigation:** ≤760px, the `<ul>` of links is hidden by default and a `.menu` button (text label "Menu") appears, `border:1px solid var(--line); border-radius:10px; padding:8px 12px`. Clicking toggles `.open` on the `<ul>`, which becomes `position:absolute; top: calc(navHeight + safe-area-inset)`, full width, `flex-direction:column`, page background, bottom border, and reveals stacked full-width-ish link rows with `10px` padding gaps.
- **Hamburger animation:** none — it's a plain text button, not an animated icon (no morphing lines-to-X icon in current design; may be added as an enhancement but is not required to match spec).
- **Mobile menu animation:** no explicit open/close transition is present (menu snaps open/closed via `display:none`↔flex) — acceptable to add a simple height/opacity transition as a reasonable enhancement without deviating from spec intent.
- **Breakpoint where nav changes:** `760px`.
- Menu auto-closes (class `.open` removed, `aria-expanded` reset) whenever the route changes.

---

# 10. Footer

- **Layout:** `<footer>` full-width, `.foot-in` flex row with `justify-content:space-between; flex-wrap:wrap; gap:30px`, max-width `1180px` centered; a separate `<p class="copy">` full-width line below.
- **Columns:** 2 columns —
  1. Brand column: logo image (48px) → "CEREBROCURE" (`h4`, `.9rem`, weight 600) → link list: "Home" (`#/`), "Privacy Policy" (external, `https://cerebrocure.ai/privacy-policy/`, new tab).
  2. Contact column: "Quick contact" heading → link list: email (`mailto:info@cerebrocure.ai`), phone (`tel:+923224774095`), LinkedIn (`https://www.linkedin.com/in/saira-osama/`, new tab).
- **Logo:** 48×48px, circular, above the "CEREBROCURE" heading in the brand column only (not repeated in contact column).
- **Social icons:** none as icon glyphs — LinkedIn is a plain text link, not an icon button.
- **Copyright:** "Copyright © 2025 Cerebrocure Technologies Pvt Ltd – All Rights Reserved. Design prototype." — `.8rem`, muted color, `26px` top margin from the columns.
- **Newsletter/input:** none present.
- **Colors:** background `--bg2`; top border `1px solid var(--line)`.
- **Typography:** headings `.9rem` weight 600 body font (not display font); link list items `.92rem`, muted, hover turns `--pink`.
- **Spacing:** footer outer padding `38px clamp(16px,4vw,40px) 30px`; link list items stack with `4px` gap.
- **Mobile layout:** the two columns wrap naturally via `flex-wrap:wrap` — stack vertically on narrow viewports with the `30px` gap preserved between them.

---

# 11. Interactive Components

**Button (`.btn`)**
- Default → pink pill, `on-accent` text (solid variant) or transparent+bordered (ghost variant).
- Hover → solid: lifts `translateY(-2px)` + pink glow shadow; ghost: border turns pink, no lift.
- Focus → global `:focus-visible` ring (3px pink outline, 3px offset).
- Active/Pressed → no distinct pressed style specified; acceptable to slightly reduce the hover lift (`translateY(-1px)`) on `:active` as a reasonable default.
- Disabled → not used currently; if needed, reduce opacity to ~0.5 and set `cursor:not-allowed`, remove hover transform.
- Keyboard → fully focusable/activatable as native `<a>`/`<button>`.
- Mobile → identical, no size/behavior change.

**Nav Link**
- Default → muted text, transparent background.
- Hover → `--bg2` pill background, `--text` color.
- Active (current route) → `--bg2` pill + pink inset-shadow underline, `--text` color.
- Focus → global focus ring.
- Mobile → same states, presented in the dropdown list.

**Billing Segmented Tab**
- Default (unselected) → transparent background, muted text.
- Selected → solid pink background, on-accent text.
- Hover (unselected) → acceptable to add a subtle background tint (not explicitly specified — keep muted-text, optionally lighten background slightly on hover for affordance).
- Focus → global focus ring.
- Click → switches `aria-selected` and swaps visible panel with fade/slide animation.
- Keyboard → arrow-key tab switching is a reasonable ARIA-tablist enhancement (not required, but recommended for accessibility per WAI-ARIA tab pattern).

**Region Filter Pill**
- Default → outlined, muted text.
- Hover → text turns `--text`, border turns `--pink`.
- Selected (`aria-pressed="true"`) → solid `--text` background with `--bg` (dark) text — an inverted pill.
- Click → updates filtered dataset for both feature panel default selection and rail contents.

**Media Card (`.mcard`)**
- Default → gradient card, hairline border, region-colored art tile.
- Hover → `translateY(-4px)` lift, border turns to the card's region color.
- Selected (`aria-current="true"`) → 2px region-colored outline ring + region-colored glow shadow (persists without hover).
- Click/Tap → selects the card, updates the feature panel, and smooth-scrolls the rail to center it.
- Keyboard → Left/Right arrow keys (when Media route active, no text input focused) step selection through the current filtered set.
- Drag → clicking-and-dragging anywhere on the rail (non-touch pointer) scrolls the rail; a small movement threshold (~6px) distinguishes a drag from a click so dragging doesn't accidentally trigger card selection.
- Mobile/touch → native touch scroll (no custom drag JS needed on touch), tap selects.

**Prev/Next Icon Buttons (Media feature panel)**
- Default → circular ghost button, `44px`, hairline border.
- Hover → border turns pink, background lightens to `--bg2`.
- Click → steps selection backward/forward within the current filtered list, wrapping at the ends.
- Keyboard → focusable, activatable via Enter/Space.

**Feature Strip Card (`.wcard`)**
- Default → gradient card, hairline border.
- Hover → `translateY(-6px)` lift + border turns pink.
- Not clickable (purely informational; no click behavior needed) — implement as non-interactive `<article>` elements, not buttons/links.

**Contact List Link**
- Default → hairline-bordered row on `--bg` background.
- Hover → `translateX(4px)` shift + border turns pink.
- Focus → global focus ring.
- Click → triggers `mailto:`, `tel:`, or opens LinkedIn in a new tab.

**Custom Rail Cursor**
- Only active on `(hover:hover) and (pointer:fine)` devices, only while pointer is within `.rail`.
- Default label/icon inside the follower: "Drag" + a small arrow/cursor glyph.
- Over a card: label changes to "Open", follower scales up slightly (`scale(1.15)`).
- Not present at all on touch devices — native cursor and scrolling behavior apply instead.

---

# 12. Animations & Motion

1. **Hero headline word fly-in**
   - Element: each `<span class="w">` word inside `.fly`.
   - Trigger: Home route becomes active (including re-entry).
   - Initial: `opacity:0`, `transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(.8)`, `filter: blur(10px)`. Per-word custom values: "Innovating" `x:-70vw,y:0,r:-10deg`; "Healthcare" `x:70vw,y:0,r:10deg`; "Through" `x:0,y:60vh,r:0deg`; "AI" `x:0,y:-60vh,r:0deg`.
   - Final: `opacity:1`, `transform:none`, `filter:blur(0)`.
   - Duration: `1.25s`. Easing: `cubic-bezier(.16,1,.3,1)`.
   - Stagger: `animation-delay: calc(var(--i) * .14s)` where `--i` is 0,1,2,3 for the four words in order.
   - Repeat: plays once per route-entry (not looping).

2. **Hero CTA button pop-in**
   - Element: `.hero .btn`.
   - Trigger: same as above, chained after headline.
   - Initial: `opacity:0; translateY(20px)`. Final: `opacity:1; translateY(0)`.
   - Duration: `.8s`, delay `1.3s`, easing `cubic-bezier(.16,1,.3,1)`.

3. **Scroll cue mouse pulse** *(removed from final build per user request — documented here only for historical accuracy; do NOT implement)*.

4. **Mission / Workflow / Billing panel scroll reveal (`.rv`)**
   - Trigger: scroll position — progress `--p` computed as `clamp((viewportHeight - elementTop) / (viewportHeight * 0.52), 0, 1)`.
   - Initial (`p=0`): `translateY(90px) scale(0.9)`, `opacity:0.3`.
   - Final (`p=1`): `translateY(0) scale(1)`, `opacity:1`.
   - No fixed duration — it is scroll-scrubbed (progress directly tied to scroll position via `requestAnimationFrame` recompute on scroll/resize), not time-based.
   - Nested `.dim` element (headings): `opacity: 0.05 + 0.95 * p²` (eases in slower than parent), `filter: blur((1-p) * 7px)`.

5. **Demo screenshot 3D tilt reveal (`.rv-tilt`)**
   - Trigger: scroll position — progress computed with viewport-height divisor `0.62` (slightly slower reveal window than `.rv`).
   - Initial: `perspective(1800px) rotateX(26deg) translateY(60px) scale(0.88)`, `opacity:0.25`, `transform-origin:50% 100%`.
   - Final: `rotateX(0) translateY(0) scale(1)`, `opacity:1`.
   - Scroll-scrubbed, not time-based.

6. **Feature Strip auto-scroll marquee**
   - Element: `.track` (flex row of cloned cards).
   - Trigger: continuous while Home route active AND `.strip` intersecting viewport (`IntersectionObserver`) AND not currently hovered/dragged.
   - Mechanism: per-frame, `off -= 0.7` (or equivalent slow constant drift), wrapped modulo the total set width for seamless looping; `transform: translate3d(off, 0, 0)`.
   - Drag override: `pointerdown` sets `dragging=true`; `pointermove` adds pointer delta directly to `off` and records it as `vel`; `pointerup` releases with residual `vel *= 0.94` per-frame decay until it settles near zero, at which point ambient auto-drift resumes (if not hovered).
   - Hover: sets `hoverW=true`, which pauses the ambient auto-drift increment (drag and momentum still function).
   - Repeat: infinite, seamless (no visible loop point due to cloned sets + modulo wrap).

7. **Network diagram animated edges (Product, Step 2 art)**
   - Element: SVG `<line class="gline hot">` edges in the generated feed-forward diagram.
   - Trigger: always animating while rendered (ambient, not scroll-gated) — communicates "live processing."
   - Mechanism: `stroke-dasharray:4 5`, animating `stroke-dashoffset` from `0` to `-18` over `1.4s`, `linear`, `infinite`, with a small per-edge `animation-delay` stagger derived from node indices so edges don't all flow in lockstep.
   - Output node: `.pulse` class, `scale(1)↔scale(1.35)` with opacity dipping to `.7` at the midpoint, `2.2s ease-in-out infinite`.

8. **Input-stage flowing connectors (Product, Step 1 art)**
   - Same `gline.hot` dashed-flow mechanism as above, applied to the three connector paths flowing from the Imaging/Clinical/Demographic icon tiles down into a shared merge point.

9. **Billing panel swap**
   - Trigger: clicking a `SegmentedTabs` tab.
   - Initial: `opacity:0; translateY(14px)`. Final: `opacity:1; translateY(0)`.
   - Duration: `.45s`, easing `cubic-bezier(.16,1,.3,1)`.

10. **Media feature panel swap**
    - Trigger: selecting a new card (click, prev/next, or arrow key) or changing the region filter.
    - Same `swap` keyframe as billing, but `.55s` duration.

11. **Contact card flash**
    - Trigger: navigating to `#/contact` (from any route, including re-clicking while already on Home).
    - Mechanism: remove `.flash` class, force a reflow (read `offsetWidth`), re-add `.flash` — guarantees the animation restarts even if triggered twice in a row.
    - Keyframe (`1.6s ease`): `0%`/`100%` → `box-shadow: 0 0 0 0 transparent`; `30%` → `box-shadow: 0 0 0 6px var(--pink), 0 0 80px 10px var(--glow)`.

12. **Media card hover lift**
    - Trigger: pointer hover.
    - `transform: translateY(-4px)`, `border-color → var(--c)` (that card's region color), `transition: transform .25s, border-color .25s`.

13. **Feature Strip card hover lift**
    - Same mechanism as above: `translateY(-6px)` + border turns pink, `transition: transform .25s, border-color .25s` (approx.; match existing `.wcard:hover` values).

14. **Custom rail cursor follow**
    - Trigger: pointer movement while over `.rail` (fine pointer only).
    - Mechanism: target coordinates (`tx,ty`) updated on `pointermove`; a `requestAnimationFrame` loop lerps the visible position (`cx,cy`) toward the target at a fixed rate (`cx += (tx-cx) * 0.22`) each frame, then applies `transform: translate3d(cx,cy,0)` — produces a smooth trailing-follower effect rather than 1:1 tracking.
    - Scale: `1` normally, `1.15` when hovering directly over a `.mcard`.
    - Label text swaps between "Drag" and "Open" based on hover target.

15. **Button hover**
    - `transform: translateY(-2px)`, `box-shadow: 0 10px 30px -8px var(--pink)`, `transition: transform .2s, box-shadow .2s` (solid variant). Ghost variant: border-color transition only, no shadow/lift.

16. **Reduced motion**
    - `@media (prefers-reduced-motion: reduce)`: set all `animation-duration`/`animation-delay`/`transition-duration` to `.01ms !important`; force `.fly .w` and `.hero .btn` to `opacity:1` immediately (skip fly-in entirely); force `.rv`/`.rv-tilt` to their final resting `transform:none; opacity:1` state (skip scroll-scrub entirely); disable `scroll-behavior:smooth` (set to `auto`). Marquee auto-drift should also be disabled/frozen under reduced motion (do not auto-scroll the strip; still allow manual drag).

No parallax, no page-transition animation between routes (routes swap instantly via `display:none`↔`block` toggling, only the Home hero replays its entrance animation on (re)activation), no modal/drawer transitions (no modals exist in this design), no loading-state animations (no async data fetching in current scope).

---

# 13. Assets

| Asset | Type | Location(s) used | Dimensions/Aspect | Purpose | Decorative or Semantic |
|---|---|---|---|---|---|
| Cerebrocure logo | Raster/vector image (circular, transparent outside circle) | Nav (top-left), Footer (brand column) | Square source, displayed as circle, 40–42px (nav) / 48px (footer) | Brand identity | Semantic (has `alt="Cerebrocure logo"`) |
| Cerebrocure Stroke Prognosis screenshot | Raster image (real product UI, NOT a placeholder) | Product page, "Inside the platform" demo section | Source ~720×374, displayed responsively up to 980px wide, `height:auto` | Product proof/demo | Semantic (needs descriptive alt text, see §8 Product Section 3) — flag to team that a higher-resolution source image would improve sharpness at large display widths |
| Brain-scan line-art illustration (custom SVG symbol `#scan`) | Inline SVG symbol, reused via `<use>` | *(Used only as a decorative background motif in earlier iterations — per the latest direction this brain background/glow imagery has been REMOVED from the Hero and Product hero box. Do not reintroduce it as a background element.)* | 400×460 viewBox | N/A — deprecated, not used in final build | N/A |
| Feature icon set (Rapid/Throughput/Multimodal/Accurate/Simple) | Inline SVG (custom line icons, 24-ish stroke-based) | Feature Strip cards | 40×40 viewBox each, rendered 46×46 | Illustrate each value prop | Decorative (`aria-hidden`), paired with visible text labels |
| Workflow Step 1 art (three linked icon tiles) | Inline SVG | Product, Workflow card, Step 1 | ~220×150 viewBox | Illustrate the input stage | Decorative |
| Workflow Step 2 art (generated network diagram) | Inline SVG, generated programmatically from a small JS layout function (node positions computed from a `[x, nodeCount]` layer array) | Product, Workflow card, Step 2 | 220×150 viewBox | Illustrate AI processing | Decorative |
| Workflow Step 3 art (report-card diagram) | Inline SVG | Product, Workflow card, Step 3 | 220×150 viewBox | Illustrate output stage | Decorative |
| Billing icons (orbit/clock, three avatar figures) | Inline SVG | Product, Billing card panels | 240×120 viewBox | Illustrate each billing model | Decorative |
| Media glyph set (medal, mic, booth, chip, people, cert) | Inline SVG (shared `<symbol>`-style path fragments, reused across feature panel + rail cards) | Media page | 48×48 viewBox | Categorize each award/milestone | Decorative |
| Region badge coloring | CSS custom property (`--c`) per item, not an image | Media page | N/A | Visually group/differentiate regions | Decorative |
| Fonts | Web fonts (Google Fonts) | Global | N/A | Typography | N/A |

**Explicitly removed from the final build (do not include):** the large faded brain-scan SVG background behind the Hero headline, the two brain-scan SVGs behind the Product hero box, and the "Scroll" mouse-cursor hint indicator on the Hero. These were present in an earlier iteration and were explicitly removed per direction — Antigravity should NOT recreate them.

---

# 14. Icons

All icons are **custom inline SVG line-art**, not sourced from a standard icon library, drawn with `fill:none; stroke:currentColor` (or `var(--pink)` / `var(--text)` explicitly), `stroke-width:2`, `stroke-linecap:round`, `stroke-linejoin:round`. Recommended equivalent library for any *additional* UI chrome icons Antigravity needs to add (e.g. if it wants a hamburger icon or a generic close icon not specified here): **Lucide React**, matching the same 2px stroke-round aesthetic.

| Icon | Approx. size | Stroke | Color | Location |
|---|---|---|---|---|
| Clock (Rapid) | 40×40 viewBox → 46×46 rendered | 2px | `--pink` | Feature Strip card |
| Bar chart / throughput bars | 40×40 → 46×46 | 2px | `--pink` | Feature Strip card |
| Three overlapping circles (Multimodal) | 40×40 → 46×46 | 2px | `--pink` | Feature Strip card |
| Target/crosshair (Accurate) | 40×40 → 46×46 | 2px | `--pink` | Feature Strip card |
| Checkmark (Simple) | 40×40 → 46×46 | 2px | `--pink` | Feature Strip card |
| Chevron connector (workflow steps) | 18×18 rotated square | 2px | `--pink` | Between workflow steps |
| Prev/Next chevrons | 24×24 viewBox, 18px rendered | 2px | inherits button text color | Media feature panel actions |
| Drag/Open cursor glyph (small arrow) | 22×22 | 2px | `--on-accent` (on pink circle) | Custom rail cursor follower |
| Medal, Mic, Booth, Chip, People, Cert glyphs | 48×48 viewBox | 1.7px | `var(--text)` at reduced opacity via container | Media cards/feature panel |
| Pulsing status dot (product hero tag) | 8×8 circle | n/a (filled) | `--pink` with glow shadow | Product hero tag pill |

Hover/mobile behavior: icons themselves do not have independent hover states (their parent card/button handles hover); icons are `aria-hidden="true"` throughout since accompanying visible text always conveys the same meaning.

---

# 15. Forms

**No live form inputs exist in the rebuilt marketing site itself.** The only "form-like" UI is the read-only illustrative screenshot of the actual Cerebrocure clinical application (patient demographics, presentation/admission, treatment, risk factors, lab results fields, a Clinical/Imaging toggle, and a Save button) — this is a **static image**, not a functional form, and must not be rebuilt as real inputs.

All contact actions (email, phone, LinkedIn) are plain anchor links (`mailto:`, `tel:`, external URL) — no submission logic, validation, or success/error states are required.

If a future iteration adds a real contact form, recommend: fields (Name, Email, Organization, Message), client-side validation (required Name/Email/Message, email format check), a loading state on submit button, and a success confirmation message — but this is explicitly **out of scope** for the current spec; do not build it unless separately requested.

---

# 16. Data / Content Structure

Represent repeated content as typed data arrays, not hardcoded JSX, for: feature-strip items, workflow steps, billing plans, and media/award items.

```typescript
// types.ts

export interface FeatureItem {
  id: string;
  title: string;          // e.g. "Rapid"
  description: string;    // e.g. "Helps in timely decision making."
  icon: 'clock' | 'bars' | 'circles' | 'target' | 'check';
}

export interface WorkflowStep {
  step: 1 | 2 | 3;
  title: string;           // "Input" | "AI processing" | "Output"
  description: string;
  chips?: string[];        // only Step 1 has chips
  art: 'input' | 'network' | 'output';
}

export type BillingPlanKey = 'lic' | 'ppp';

export interface BillingPlan {
  key: BillingPlanKey;
  tabLabel: string;        // "Annual license fee" | "Pay per patient"
  heading: string;         // same as tabLabel, used as panel H3
  description: string;
  art: 'orbit' | 'people';
}

export type RegionKey = 'global' | 'europe' | 'mideast' | 'pk' | 'apac';

export interface Region {
  key: RegionKey;
  name: string;   // display name, e.g. "Middle East"
  color: string;  // CSS var reference, e.g. "var(--pink)"
}

export type GlyphKey = 'medal' | 'mic' | 'booth' | 'chip' | 'people' | 'cert';

export interface MediaItem {
  id: number;
  region: RegionKey;
  year: number;
  glyph: GlyphKey;
  tag: string;        // e.g. "Finalist", "Winner", "Keynote", "Speaker", "Exhibitor", "Appointment", "Accepted", "Programme", "Special guest"
  title: string;
  description: string;
  link?: string;       // external source URL, optional
}
```

Recommended data-driven components: `FeatureCard` (maps `FeatureItem`), `WorkflowStepCard` (maps `WorkflowStep`), `BillingPanel` (maps `BillingPlan`), `MediaCard` + `MediaFeaturePanel` (both map `MediaItem`), `RegionFilterChip` (maps `Region` + live count). Region color lookup and glyph→SVG lookup should be centralized maps (`REGION_MAP: Record<RegionKey, Region>`, `GLYPHS: Record<GlyphKey, JSX.Element>`) rather than repeated inline per item.

---

# 17. Accessibility

- Semantic HTML: `<nav aria-label="Main">`, one `<h1>` per route (Hero headline on Home — implemented as visually two lines but should be a single semantic `<h1>` with an `aria-label` of the full plain-text headline, e.g. `aria-label="Innovating Healthcare Through AI"`, since the word-by-word spans are presentation-only), `<h2>` for major section headings, proper nesting (no skipped levels).
- Alt text: logo image `alt="Cerebrocure logo"`; product screenshot `alt="Cerebrocure Stroke Prognosis screen showing demographics, presentation, treatment, risk factors and laboratory results"`; all decorative SVG icons `aria-hidden="true"`.
- Keyboard navigation: all nav links, buttons, tabs, filter pills, media cards, and prev/next controls must be reachable via Tab and activatable via Enter/Space; Left/Right arrow keys provide an additional shortcut for stepping through Media items when that route is focused/active (must not interfere with normal page scrolling or text-input arrow-key use — guard against `e.target` being an input/textarea).
- Focus states: global `:focus-visible` ring (3px pink outline, 3px offset, 8px border-radius) applied consistently — do not remove default focus outlines without this replacement.
- ARIA labels: hamburger menu button needs `aria-expanded` + `aria-controls`; billing switcher uses `role="tablist"`/`role="tab"`/`role="tabpanel"` with `aria-selected`; region filter bar uses `role="group"` with an `aria-label` (e.g. "Filter by region") and each pill uses `aria-pressed`; media rail cards use `aria-current="true"` for the selected item; the Media feature panel container should be `aria-live="polite"` so screen readers announce the new milestone content when selection changes.
- Color contrast: text (`#EEF1FF`) on background (`#0F1330`) and on card surfaces (`#1A2050`–`#222A63`) meets WCAG AA for body text; verify pink-on-navy button text (`--on-accent` `#0A1033` on `--pink` `#EE4F7F`) meets AA for large/bold button text — if an automated contrast check on the final implementation flags this combination, darken `--on-accent` further or lighten `--pink` slightly while keeping the same hue relationship.
- Reduced motion: implement the full `prefers-reduced-motion` behavior described in §12 item 16 — this is a hard requirement, not optional polish.
- Form accessibility: N/A per §15 (no live forms); contact links should still have clear, descriptive link text (already satisfied: "Email"/"info@cerebrocure.ai" pairing, etc.).
- Screen-reader considerations: the strip/rail's cloned marquee items (used purely for the seamless-loop illusion) must be marked `aria-hidden="true"` on the duplicate sets so screen readers only encounter each unique feature/award once; the custom drag-cursor follower element must be `aria-hidden="true"` and `pointer-events:none`.

---

# 18. SEO

- **Page titles** (set via route-aware `<title>` updates, since this is a client-rendered hash-routed SPA — implement via a small effect that sets `document.title` on route change, or use a helmet-style library if the team prefers, though not required to add a new dependency for a 3-route site):
  - Home: "Cerebrocure — Innovating Healthcare Through AI"
  - Product: "Cerebrocure — Product"
  - Media: "Cerebrocure — Media & Recognition"
- **Meta description** (static, in `index.html`, since hash routes aren't independently crawlable without SSR — flag to team that true per-route SEO would require a proper router with SSR/prerendering, which is out of scope for this artifact-accuracy task): "Cerebrocure is an AI-powered cloud software that helps neurologists make rapid, accurate decisions for better patient outcomes in stroke care."
- **Heading structure:** one `<h1>` per route as described in §17; consistent `<h2>` for section headings; no heading level skips.
- **Semantic HTML:** use `<header>`/`<nav>`/`<main>`/`<section>`/`<footer>` landmarks as already structured in the existing markup (`<nav>`, `<main>` wrapping the three `.page` route containers, `<footer>`).
- **Open Graph:** add `og:title`, `og:description` (reuse meta description), `og:type=website`, and `og:image` pointing at the Cerebrocure logo or a dedicated social-share image (not currently specified — flag as a follow-up asset need).
- **Image alt text:** per §17.
- **Canonical URL:** since routes are hash-based (`/#/product`), a single canonical `<link rel="canonical">` pointing to the site root is appropriate unless the team migrates to real path-based routing with server rendering.
- **Structured data:** an `Organization` JSON-LD block (name "Cerebrocure Technologies", logo, sameAs: LinkedIn URL) is a reasonable low-effort addition; not required for artifact accuracy but recommended for a production marketing site.

---

# 19. Performance

- **Image optimization:** serve the logo as an optimized WebP/PNG with true alpha transparency (already circular-cropped, no checkerboard baked in); serve the product screenshot at 2x the largest displayed width (≈1960px wide) as WebP with a JPEG/PNG fallback, and request a higher-resolution source from the client since the current 720×374 asset will look soft above ~700px display width.
- **Lazy loading:** the product screenshot (below-the-fold on the Product route) should use `loading="lazy"` on the `<img>`.
- **Code splitting:** route-split each page (`Home`, `Product`, `Media`) via `React.lazy`/`Suspense` so initial bundle only includes the active route's code — reasonable given three distinct, fairly heavy pages (especially Media's data set and rail interactions).
- **Font loading:** use `<link rel="preconnect">` for Google Fonts (already established in source), and `font-display: swap` (default behavior of the Google Fonts CSS2 API used) to avoid invisible-text flashes.
- **Animation performance:** all continuous animations (marquee drift, network pulse/flow) must use `transform`/`opacity` only (GPU-accelerated), never animate `left`/`top`/`width` directly — the existing implementation already follows this via `translate3d`/`transform`. Mark actively-animating elements with `will-change: transform` sparingly (only while animating, not globally) to avoid excessive compositing layers.
- **Avoiding unnecessary re-renders:** the scroll-linked `--p` reveal values should be written directly to the DOM style property (`element.style.setProperty('--p', value)`) inside a `requestAnimationFrame`-throttled scroll handler rather than driving React state per scroll pixel, to avoid re-render storms — this can be implemented as a small custom hook (`useScrollReveal(ref)`) that manages a ref + direct style mutation, bypassing React's render cycle for this high-frequency value.
- **Asset optimization:** inline the small decorative SVGs as React components (not external file requests) since they're numerous but individually tiny; do not lazy-load them.

---

# 20. Exact Copy / Content

## Global / Navigation
- Brand: "CEREBROCURE" / "Technologies"
- Nav links: "About the founder", "Media", "Product", "Partner with us"
- Menu button (mobile): "Menu"

## Home
- Hero H1 (two lines): "Innovating Healthcare" / "Through AI"
- Hero CTA button: "Contact us for partnerships"
- Mission eyebrow: "Our Mission"
- Mission statement: "To equip clinicians with AI technology as a decision-making tool for better patient outcomes in stroke."
- Feature Strip H2: "What Cerebrocure gives your team"
- Feature Strip subtext: "Five things stroke teams get from the platform."
- Feature Strip hint: "Hover to pause. Drag to move it yourself."
- Feature cards:
  1. "Rapid" — "Helps in timely decision making."
  2. "Throughput" — "Increases diagnostics and treatment throughput."
  3. "Multimodal" — "Get insights from the different types of data in clinical settings."
  4. "Accurate" — "Reduces human error."
  5. "Simple" — "No need to install hardware or software in your existing workflow."
- Contact card H2: "Partner with us"
- Contact card copy: "Talk to us about bringing Cerebrocure to your stroke team, hospital or research programme."
- Contact list: "Email" / "info@cerebrocure.ai"; "Phone" / "+92 322 4774095"; "LinkedIn" / "Dr. Saira Osama"

## Product
- Product hero tag pill: "Cloud software for stroke care"
- Product hero H1: "Cerebrocure"
- Product hero tagline: "An AI-powered cloud software to assist neurologists make rapid and informed decisions for better patient outcomes in stroke."
- Workflow H2: "Workflow"
- Step 1 label/title: "Step 1" / "Input" — "Imaging, clinical and demographic input." — chips: "Imaging", "Clinical", "Demographic"
- Step 2 label/title: "Step 2" / "AI processing" — "The model reads every data type together, in the cloud."
- Step 3 label/title: "Step 3" / "Output" — "Diagnostics and treatment recommendations."
- Billing H2: "Billing"
- Billing tabs: "Annual license fee", "Pay per patient"
- Annual panel: H3 "Annual license fee" — "One yearly fee for your hospital or network."
- Pay-per-patient panel: H3 "Pay per patient" — "Pay for the patients you run through Cerebrocure."
- Billing footer: "Please get in touch for further inquiries." + button "Get in touch"
- Demo H2: "Inside the platform"
- Demo subtext: "A look at the Cerebrocure Stroke Prognosis screen."

## Media
- H1: "Recognition for AI in stroke care"
- Intro paragraph: "Cerebrocure and its founder, Dr. Saira Osama, have been recognised by the UN and ITU, women-in-tech networks, universities and industry programmes. Milestones are grouped by region, most recent first. Drag the row below or pick a card to read more."
- Stats labels: "Milestones", "Regions"
- Region filter labels: "All regions", "Global", "Europe", "Middle East", "Pakistan", "Asia-Pacific"
- Feature panel action link text: "View the post"
- Prev/Next button `aria-label`s: "Previous milestone", "Next milestone"

### Full Media Item Dataset (id, region, year, tag, title, description, link)

1. **Global · 2025 · Finalist** — "Finalist, Innovation Factory Pitching Competition" — "Selected as one of the top three finalists in the Women Entrepreneurs Pitching Competition at the AI for Good Global Summit 2025 in Geneva, organised by the United Nations and ITU." — link: `https://www.linkedin.com/pulse/cerebrocure-pioneers-stroke-innovation-womens-djmue/`
2. **Global · 2025 · Appointment** — "Steering Committee Member, AI for Good Impact Initiative (UN & ITU)" — "Dr. Saira Osama was appointed a Global Steering Committee Member for the AI for Good Impact Initiative, a flagship United Nations programme, helping shape ethical and inclusive AI aligned with the UN Sustainable Development Goals." — no link
3. **Global · 2025 · Exhibitor** — "Featured Exhibitor, AI for Good Summit, Geneva" — "Featured Exhibitor at the AI for Good Global Summit 2025, organised by the UN and ITU in Geneva, highlighting the mission to advance equitable healthcare through technology." — link: `https://aiforgood.itu.int/speaker/cerebrocure-technologies/`
4. **Global · 2025 · Accepted** — "NVIDIA Inception Program" — "Accepted into the NVIDIA Inception Program, a global platform supporting cutting-edge startups, with access to NVIDIA resources, expertise and ecosystem to accelerate the mission of transforming stroke care." — no link
5. **Europe · 2025 · Guest lecture** — "Guest Lecture, Department of Health and Social Care, Mont Rose College, UK" — "Invited by Mont Rose College, London, Dr. Saira Osama delivered a lecture titled \"Using AI in Making Effective Healthcare / Clinical Diagnoses\" on the transformative role of AI in healthcare." — link: `https://www.facebook.com/photo.php?fbid=1146688600818571&id=100064323264131&set=a.559281679559269`
6. **Europe · 2025 · Keynote** — "Keynote Speaker, MRC Research Conference 2025" — "Invited as keynote speaker at the MRC Research Conference hosted by Mont Rose College, London, presenting pioneering research on using AI for stroke treatment in Pakistan." — link: `https://mrcollege.ac.uk/research-conference-2025/`
7. **Europe · 2024 · Finalist** — "Global Finalist, Women in Tech Global Awards, France" — "Recognised as a global finalist at the Women in Tech Global Awards 2024, held at the Résidence of the National Assembly in Paris, for advancing equity in stroke care through AI-driven solutions." — link: `https://www.linkedin.com/posts/womenintechorg_witga24-womenintech-womeninstem-activity-7260586547610079232-8_JO`
8. **Middle East · 2025 · Exhibitor** — "Exhibitor, GITEX Global 2025, Startup Pod, Dubai" — "Exhibited in the Startup Pod at GITEX Global 2025 at the Dubai World Trade Centre, presenting AI-driven stroke care and meeting global investors, healthcare leaders and technology partners. The milestone supports the mission to democratise stroke care across low- and middle-income countries." — no link
9. **Pakistan · 2025 · Speaker** — "Speaker, 10Pearls Women Tech Quest 2025" — "Invited speaker at one of Pakistan's leading women-in-tech events, inspiring female professionals and students in technology and innovation." — link: `https://www.facebook.com/10pearls.pakistan/`
10. **Pakistan · 2025 · Speaker** — "AI Seekho Day: Building AI Solutions for Social Impact" — "Delivered a session on building AI solutions for social impact, sharing the journey of developing AI-driven healthcare innovations and guiding students on applied AI." — link: `https://www.facebook.com/10pearls.pakistan/`
11. **Pakistan · 2025 · Special guest** — "Special Guest, SEE Pakistan" — "Honoured with a Special Guest invitation at SEE Pakistan, the country's premier entrepreneurship and innovation showcase." — no link
12. **Pakistan · 2023 · Programme** — "Completion of the National Health Incubator Programme" — "Awarded a Certificate of Participation by the National Health Incubator, an initiative of Aga Khan University and Accelerate Prosperity, covering design thinking, business model canvas, sales and marketing, financial analysis and pitch making." — no link
13. **Asia-Pacific · 2024 · Winner** — "Winner, Most Impactful Initiative, Women in Tech APAC Award Malaysia 2024" — "Cerebrocure Technologies received the Most Impactful Initiative award for its groundbreaking work in AI-driven stroke care innovation." — link: `https://www.instagram.com/p/DBGgQLuqjRS/`

*(Note: default sort within the dataset above is by region grouping as listed in `RegionFilterBar` order, then by year descending within each region, per "most recent first" language in the intro copy — implement the rail's default grouping/sort to match this.)*

## Footer
- "CEREBROCURE"
- Link list 1: "Home", "Privacy Policy" (→ `https://cerebrocure.ai/privacy-policy/`)
- "Quick contact"
- Link list 2: "info@cerebrocure.ai" (→ `mailto:info@cerebrocure.ai`), "+92 322 4774095" (→ `tel:+923224774095`), "LinkedIn" (→ `https://www.linkedin.com/in/saira-osama/`)
- Copyright: "Copyright © 2025 Cerebrocure Technologies Pvt Ltd – All Rights Reserved. Design prototype."

---

# 21. Component Hierarchy

```
App
├── HashRouter
├── Layout
│   ├── Nav
│   │   ├── Logo
│   │   ├── DesktopLinks
│   │   └── MobileMenuToggle + MobileLinksDrawer
│   ├── Main
│   │   ├── HomePage           (route: #/)
│   │   │   ├── Hero
│   │   │   │   ├── FlyInHeadline
│   │   │   │   └── Button (CTA → #/contact)
│   │   │   ├── MissionPanel (RevealPanel wrapper)
│   │   │   ├── FeatureStripSection
│   │   │   │   └── FeatureStrip
│   │   │   │       └── FeatureCard × N (data-driven, cloned for loop)
│   │   │   └── ContactSection
│   │   │       └── ContactCard
│   │   │           └── ContactListLink × 3
│   │   ├── ProductPage        (route: #/product)
│   │   │   ├── ProductHeroPanel
│   │   │   ├── ProductGrid
│   │   │   │   ├── WorkflowCard (RevealPanel wrapper)
│   │   │   │   │   └── WorkflowStep × 3 (data-driven)
│   │   │   │   └── BillingCard (RevealPanel wrapper)
│   │   │   │       ├── SegmentedTabs
│   │   │   │       ├── BillingPanel × 2 (data-driven)
│   │   │   │       └── Button (Get in touch → #/contact)
│   │   │   └── DemoSection
│   │   │       └── PlatformDemo (RevealPanel/rv-tilt wrapper)
│   │   │           └── img (real screenshot)
│   │   └── MediaPage          (route: #/media)
│   │       ├── MediaHeader
│   │       │   └── StatCounters
│   │       ├── MediaFeaturePanel (aria-live)
│   │       │   ├── ArtTile
│   │       │   └── FeatureText + PrevNextButtons
│   │       └── MediaRailSection
│   │           ├── RegionFilterBar
│   │           │   └── FilterPill × 6 (All + 5 regions)
│   │           ├── MediaCardRail
│   │           │   └── RegionGroup × up to 5
│   │           │       └── MediaCard × N (data-driven)
│   │           └── CustomCursorFollower (fine-pointer only)
│   └── Footer
│       ├── Logo
│       ├── BrandLinkList
│       └── ContactLinkList
```

---

# 22. Recommended File / Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SegmentedTabs.tsx
│   │   ├── FilterPill.tsx
│   │   ├── RevealPanel.tsx        (scroll-linked reveal wrapper hook + component)
│   │   └── CustomCursorFollower.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FlyInHeadline.tsx
│   │   ├── MissionPanel.tsx
│   │   ├── FeatureStrip.tsx
│   │   ├── FeatureCard.tsx
│   │   └── ContactCard.tsx
│   ├── product/
│   │   ├── ProductHeroPanel.tsx
│   │   ├── WorkflowCard.tsx
│   │   ├── WorkflowStepCard.tsx
│   │   ├── BillingCard.tsx
│   │   ├── BillingPanel.tsx
│   │   └── PlatformDemo.tsx
│   └── media/
│       ├── MediaHeader.tsx
│       ├── StatCounters.tsx
│       ├── MediaFeaturePanel.tsx
│       ├── RegionFilterBar.tsx
│       ├── MediaCardRail.tsx
│       └── MediaCard.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductPage.tsx
│   └── MediaPage.tsx
├── layouts/
│   └── SiteLayout.tsx
├── data/
│   ├── features.ts
│   ├── workflow.ts
│   ├── billing.ts
│   ├── regions.ts
│   └── mediaItems.ts
├── assets/
│   ├── logo.png (or .webp)
│   └── product-screenshot.png (or .webp)
├── icons/
│   ├── FeatureIcons.tsx      (clock, bars, circles, target, check)
│   ├── WorkflowArt.tsx       (input/network/output generated SVGs)
│   ├── BillingArt.tsx        (orbit, people)
│   └── MediaGlyphs.tsx       (medal, mic, booth, chip, people, cert)
├── hooks/
│   ├── useScrollReveal.ts
│   ├── useHashRoute.ts
│   └── useMarquee.ts         (drag + auto-drift + momentum logic for FeatureStrip)
├── lib/
│   └── constants.ts          (breakpoints, timing constants)
├── styles/
│   ├── tokens.css            (CSS custom properties from §4)
│   └── globals.css
├── types/
│   └── content.ts            (interfaces from §16)
├── App.tsx
└── main.tsx
```

---

# 23. Implementation Notes for Antigravity

1. Build the website from this specification rather than improvising — every color, spacing value, breakpoint, and copy string above is sourced directly from the existing artifact and must be matched, not reinterpreted.
2. Match the visual design as closely as possible: navy/pink palette exactly as specified in §4, the specific gradient angles/stops, the exact border-radius scale, and the exact font pairing (Bricolage Grotesque + Public Sans).
3. Do not simplify sections — the Workflow card's 3-step SVG diagrams, the generated network diagram, the Media page's grouped/filterable/draggable rail, and the self-moving Feature Strip are all core to the design and must be built in full, not replaced with static equivalents.
4. Do not remove animations — the scroll-linked reveal system (`--p` progress variable), the hero word fly-in, the marquee auto-scroll, and the swap transitions are essential to the product feel.
5. Do not replace custom layouts with generic templates — this is not a generic SaaS template; the overlapping-panel layout (Mission over Hero, Product grid over Product hero) and the full-bleed masked marquee are specific, deliberate layout choices.
6. Preserve exact copy from §20 verbatim, including the full Media dataset (all 13 items with their exact titles/descriptions/links).
7. Make the website fully responsive per §6, with special attention to: nav collapsing to a dropdown at 760px, all 2-column grids stacking at 980px, and the two horizontal rails (Feature Strip, Media Rail) NEVER wrapping into a grid at any breakpoint.
8. Use reusable, data-driven components (§16) — no hardcoded repeated JSX for feature cards, workflow steps, billing plans, or media items.
9. Use the real logo and real product-screenshot assets provided (do not fabricate placeholder brain-scan artwork to replace them — that background artwork was explicitly removed from the design).
10. Maintain consistent spacing and typography scales exactly as documented in §4 — use Tailwind theme extension to codify these as reusable tokens rather than one-off arbitrary values scattered through components.
11. Test desktop (>980px), tablet/mobile (≤980px and ≤760px) layouts explicitly against the checklist in §24.
12. Ensure all navigation (hash routing across 3 pages + contact anchor/flash behavior) and interactions (billing tabs, region filters, media rail drag/click/keyboard, prev/next, strip drag) work correctly and match the state-transition descriptions in §11.
13. Avoid unnecessary dependencies — no carousel library, no CSS-in-JS library, no state-management library; Framer Motion + Tailwind + custom hooks are sufficient.
14. Do not change the design language without a specific reason — if any ambiguity arises (see §25), default to the most conservative interpretation consistent with the rest of the design system rather than introducing new visual patterns.

Priority order for implementation and QA: **1. Visual accuracy → 2. Responsive behavior → 3. Component structure → 4. Interactions → 5. Animations → 6. Accessibility → 7. Performance.**

---

# 24. Visual Verification Checklist

### Desktop
- [ ] Nav matches: fixed, blurred-translucent background, correct link order and active-state pink underline
- [ ] Logo renders as a clean circle with no checkerboard/background artifact
- [ ] Hero headline layout, sizing, and two-line arrangement match; "AI" is visually emphasized with a glow
- [ ] Mission panel overlaps the hero by the specified negative margin and reveals on scroll
- [ ] Feature Strip is full-bleed (extends beyond the content container to the viewport edges) with edge fade masks
- [ ] Contact card 2-column layout and glow match
- [ ] Product hero panel is centered, large, with tag pill + pulsing dot
- [ ] Workflow/Billing grid is 1.85fr/1fr and overlaps the product hero panel
- [ ] All three Workflow step SVG diagrams render with correct icons and animated flowing/pulsing elements
- [ ] Billing tabs correctly toggle between the two panels with the swap animation
- [ ] Demo screenshot renders the real uploaded product image inside the pink-glow frame, tilting in on scroll
- [ ] Media header, stat counters, feature panel, filter bar, and grouped rail all render with correct region colors
- [ ] Footer 2-column layout, logo, and copyright line match

### Mobile (≤760px, verify ≤980px transitional state too)
- [ ] Nav collapses to a "Menu" button that toggles a full-width dropdown list
- [ ] All 2-column grids (Product grid, Contact card, Media header, Media feature panel) stack to a single column
- [ ] Workflow steps stack vertically with the connector chevron rotated to point downward
- [ ] Feature Strip and Media Rail remain horizontally scrollable/draggable and do NOT wrap into a grid
- [ ] Text remains readable at all clamp() minimum sizes, no clipped/overlapping text
- [ ] Buttons remain pill-shaped and do not stretch full-width
- [ ] Images (logo, screenshot) scale down proportionally with no distortion
- [ ] No horizontal page overflow/scrollbar introduced by the full-bleed strip or any transform-based animation
- [ ] Custom rail cursor is disabled/absent on touch devices; native tap/scroll works instead
- [ ] Animations remain usable and are not janky on lower-powered mobile devices (verify via `prefers-reduced-motion` fallback too)

### Interactions
- [ ] Hover states: nav links, buttons, feature strip cards, media cards, contact list links, region filter pills, prev/next buttons
- [ ] Focus states: visible pink focus ring on every interactive element via keyboard Tab navigation
- [ ] Billing segmented tabs switch content and visual state correctly
- [ ] Region filter pills correctly narrow the rail and reset an out-of-filter selection
- [ ] Media rail: click-to-select, drag-to-scroll (desktop), touch-scroll (mobile), Left/Right arrow key stepping, mouse-wheel horizontal redirect
- [ ] Media feature panel updates and re-animates on every selection change; prev/next wrap correctly at list boundaries
- [ ] Custom cursor follows pointer smoothly (lerped, not 1:1) and swaps label/scale over cards
- [ ] Feature Strip: auto-scrolls continuously, pauses on hover, responds to drag with momentum decay, loops seamlessly with no visible seam
- [ ] Hero fly-in animation replays correctly every time the Home route is (re-)activated
- [ ] Contact flash animation retriggers correctly even when navigating to `#/contact` multiple times in a row
- [ ] `prefers-reduced-motion: reduce` correctly disables fly-in, scroll-reveal scrubbing, and marquee auto-drift, showing all content in its final resting state immediately

---

# 25. Known Ambiguities / Assumptions

1. **Uncertain:** Exact pixel-perfect hex values of the client's real brand colors (navy/pink) beyond what was sampled from the provided logo image.
   **Artifact suggests:** Navy background sampled at approx. `#0F1330`–`#151937`, pink accent sampled at approx. `#DD4364`–`#EE4F7F` from the logo artwork and subsequent site palette.
   **Assumption to make:** Use the exact hex values documented in §4 (`--bg:#0F1330`, `--pink:#EE4F7F`, etc.) as the source of truth; if the client later supplies an official brand style guide with different exact hex codes, those should override this spec's sampled values without changing any other structural aspect of the design.

2. **Uncertain:** Whether the nav bar should visually change (e.g. become more opaque, add a stronger shadow) after the user scrolls down from the top of the page.
   **Artifact suggests:** No scroll-triggered nav style change exists in the current implementation — it is always a fixed, translucent-blurred bar.
   **Assumption to make:** Keep the nav visually constant regardless of scroll position; do not add a scroll-triggered background-solidify effect unless separately requested.

3. **Uncertain:** Exact resolution/source quality intended for the final product screenshot asset (the provided version is only 720×374).
   **Artifact suggests:** The image is real product UI, not a placeholder, but is somewhat low-resolution for large desktop display.
   **Assumption to make:** Use the provided image as-is for now, implement the frame/display logic to scale it responsively and cap its display width at 980px to minimize visible softness, and flag to the content owner that a higher-resolution capture would improve visual fidelity — do not fabricate a redrawn/mocked version of the product UI to replace it.

4. **Uncertain:** Whether "About the founder" should be built as a real in-app route or remain an external link to the existing live WordPress site.
   **Artifact suggests:** The current build treats it as an external link (`target="_blank"`) to `https://cerebrocure.ai/about-the-founder/`, since that page was not part of the mockup/redesign scope discussed with the client.
   **Assumption to make:** Keep it as an external link for this rebuild; only convert it into a native route if the client explicitly requests that page be redesigned/rebuilt as part of this project.

5. **Uncertain:** Exact ordering logic for Media items within a region when years are equal or when the client's intended "most recent first" ordering conflicts with the region-grouping display.
   **Artifact suggests:** Items are grouped by region (in a fixed region order: Global, Europe, Middle East, Pakistan, Asia-Pacific) and, within the current dataset, happen to already be entered in a reasonable recency order per region.
   **Assumption to make:** Sort each region group by `year` descending as the default; where the client's source material doesn't specify exact month/day, year-level granularity is sufficient — do not fabricate more precise dates.

6. **Uncertain:** Whether billing amounts/pricing figures should be displayed (the current copy is intentionally figure-free: "One yearly fee..." / "Pay for the patients you run through Cerebrocure.").
   **Artifact suggests:** No numeric pricing was provided by the client at any point in the design process.
   **Assumption to make:** Do not invent or display any dollar/rupee amounts; keep the billing copy qualitative exactly as written in §20 unless the client supplies real figures.

7. **Uncertain:** Mobile hamburger icon style (the current build uses a plain text "Menu" button rather than an animated lines/X icon).
   **Artifact suggests:** No icon-based hamburger exists in the current implementation.
   **Assumption to make:** A plain text "Menu"/"Close" toggle button satisfies the spec; adding a standard 3-line hamburger icon (via Lucide's `Menu`/`X` icons) that morphs on toggle is an acceptable enhancement but not required for accuracy.

8. **Uncertain:** Whether the Feature Strip's automatic scroll direction (leftward) and speed are brand-mandated or purely a design choice.
   **Artifact suggests:** Leftward drift at a slow, ambient pace (not fast/attention-grabbing) was chosen for a calm, premium feel consistent with the overall motion language.
   **Assumption to make:** Preserve leftward drift at a similarly slow pace (roughly one card-width every several seconds) — exact px/frame values are an implementation detail, not a hard requirement, as long as the pacing reads as "ambient," not "urgent."

9. **Uncertain:** Whether social/press logos (e.g. actual UN/ITU, NVIDIA, GITEX, Women in Tech award badge artwork) should be sourced and displayed instead of the generic category glyphs (medal/mic/booth/etc.) currently used on the Media page.
   **Artifact suggests:** No official third-party logo assets were supplied or embedded in the artifact; generic in-house glyphs were used as a safe, license-free stand-in.
   **Assumption to make:** Continue using the generic glyph system unless the client explicitly supplies licensed/approved logo artwork for each awarding body, since using third-party logos without permission carries brand/legal risk.

10. **Uncertain:** Whether the site needs true multi-page routing (separate URLs, SSR/prerendering for SEO) versus the current single-page hash-routed approach.
    **Artifact suggests:** The current artifact is a single self-contained HTML/JS prototype using hash-based navigation with no page reloads.
    **Assumption to make:** Rebuild as a client-side SPA with `HashRouter` for parity with the artifact's behavior; note in §18 that true path-based routing with SSR/prerendering would improve SEO but is a separate infrastructure decision the client should make explicitly, not something to silently add or omit.
