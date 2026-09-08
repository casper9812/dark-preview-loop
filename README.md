# Faxia Canvas

Build a full-view port landing page for boar called "faxia salud" -- a dark cinematic showcase whose entire background is one full-bleed destination photograph, with a row of upcoming destinations parked as small rounded thumbnails in the bottom-right corner. Every few seconds a timer bar sweeps across the top of the screen and, when it completes, the first thumbnail expands to fill the viewport while the outgoing photo scales up and slips behind it to the end of the row -- an endless, hands-free carousel of faxia https://www.instagram.com/faxia.salud/. All copy is in Spanish. Scope is this single screen only: there is no scroll, no second section, and `body` has `overflow: hidden` so the page is exactly one viewport tall. The site is plain HTML + CSS + vanilla JS with no build step, no framework and no bundler -- only GSAP 3 loaded as a `<script>` tag.

## INDEX

- SETUP: fonts · https://www.instagram.com/faxia.salud/URLs · deps · global CSS
- EFFECT-01 image-preload-gate — https://www.instagram.com/faxia.salud/
- EFFECT-02 cover-wipe-intro — white panel exits, then the loop arms
- EFFECT-03 layout-engine-and-entrance — viewport-derived offsets + opening reveal
- EFFECT-04 autoplay-indicator-loop — the timer bar that drives every advance
- EFFECT-05 card-promotion-step — thumbnail expands to full-bleed, outgoing recycles
- EFFECT-06 details-ab-masked-reveal — twin text panels swapping with masked slide-ups
- EFFECT-07 pagination-hud-sync — number odometer + progress bar
- EFFECT-08 resize-relayout — re-anchor the composition when the viewport changes
- SECTION-01 destination-data — the six-entry content model
- SECTION-02 navbar — Sol de Mayo mark, links, icon actions (uses EFFECT-03)
- SECTION-03 card-stack — the generated cards and their captions (uses EFFECT-01, 02, 03, 05, 08)
- SECTION-04 details-panels — the twin overlay text blocks (uses EFFECT-03, 06)
- SECTION-05 pagination-hud — arrows, progress bar, slide number (uses EFFECT-03, 07, 08)
- SECTION-06 indicator-and-cover — the two full-width utility layers (uses EFFECT-02, 04, 08)
- DETAILS — key design details + known behaviours

## SETUP

### [SETUP-FONTS]

Import at the very top of the stylesheet (`@import url(...)`, not a `<link>`):
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap`
- `"Inter", sans-serif` -- the `body` default: nav, place labels, descriptions, buttons.
- `"Oswald", sans-serif` -- the condensed display face, used only for the two stacked destination titles (72px in the overlay, 20px on the thumbnails). Both are set at `font-weight: 600` even though only weight 500 is imported -- keep that exactly; the synthesized weight is part of the look.

### [SETUP-ASSETS] (CloudFront -- use exactly these)

Six 2752×1536 16:9 photographs, referenced directly as the `image` field of the data array in SECTION-01. Every one is composed with its left third dark and quiet so the white overlay typography at `left: 60px; top: 240px` stays legible -- do not swap them for crops, stock photos or a different order.



### [SETUP-DEPS]

GSAP 3 core only, from CDN, loaded immediately before your own script at the end of ``:
``
No ScrollTrigger, no plugin registration, no smooth-scroll library, no npm install, no bundler. The whole site is `index.html` + `style.css` + `script.js`. Document is `` with `` and ``.

### [SETUP-CSS]

Two colours carry the whole page -- `#75AADB` (the celeste of the flag; the only accent) and `#FFFFFFDD` (all text and the caption dash) -- over a `#1a1a1a` body.

- `body`: `margin: 0`, `background-color: #1a1a1a`, `color: #FFFFFFDD`, `position: relative`, `overflow: hidden`, `font-family: "Inter", sans-serif`.
- `.card`: `position: absolute; left: 0; top: 0; background-position: center; background-size: cover; box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6)`. Every geometry value -- `x`, `y`, `width`, `height`, `borderRadius`, `zIndex` -- is written by GSAP, never by CSS.
- `.card-content`: `position: absolute; left: 0; top: 0; color: #FFFFFFDD; padding-left: 16px` -- same rule, positioned entirely from JS.
- Stacking contract, all set through GSAP: cards 10 (outgoing) / 20 (active full-bleed) / 30 (thumbnails), card captions 40, nav 50, indicator and pagination 60, cover 100. The two details panels swap between 22 (active) and 12 (inactive).

## EFFECTS

Ensure you follow these precise architecture and styling instructions -- do NOT replace this carousel with a CSS keyframe slideshow, a scroll-driven timeline, `transition` on `width`/`height`, or another animation library. Every position, size and radius is a GSAP tween on absolutely positioned elements, and the advance is driven by an awaited async loop, not by `setInterval`.

Declare these module-level values at the top of `script.js` and use them by name everywhere: `let order = [0, 1, 2, 3, 4, 5]`, `let detailsEven = true`, `let offsetTop = 200`, `let offsetLeft = 700`, `let cardWidth = 200`, `let cardHeight = 300`, `let gap = 40`, `let numberSize = 50`, and `const ease = "sine.inOut"` -- that single easing string is passed to every tween in the file, with no exceptions. Write the selector helpers `getCard(index)` → `` `#card${index}` ``, `getCardContent(index)` → `` `#card-content-${index}` ``, `getSliderItem(index)` → `` `#slide-item-${index}` ``, plus `const _ = (id) => document.getElementById(id)` and `const set = gsap.set`.

### [EFFECT-01] image-preload-gate

Used in: SECTION-03

Implement `loadImage(src)` returning a Promise that creates `new Image()`, assigns `img.onload = () => resolve(img)` and `img.onerror = reject` **before** `img.src = src`. Implement `loadImages()` as `Promise.all(data.map(({ image }) => loadImage(image)))`. Boot the page from `async function start()`, which `await`s `loadImages()` inside a `try`, then calls `init()`; the `catch` logs `"One or more images failed to load"` with the error and nothing renders. Call `start()` as the last statement of the file. This gate is the reason the opening wipe never reveals a half-loaded frame -- the six photos are 2752px wide and a naive boot shows grey boxes for a second.

### [EFFECT-02] cover-wipe-intro

Used in: SECTION-03, SECTION-06

A `

` sits over everything at `z-index: 100`, `position: absolute; left: 0; top: 0; width: 100vw; height: 100vh; background-color: #fff`. Inside `init()`, slide it off with `gsap.to(".cover", { x: width + 400, delay: 0.5, ease })` where `width` is `window.innerWidth`. In its `onComplete`, wrap `loop()` in a `setTimeout(..., 500)` -- the extra half second lets the entrance tweens settle before the first timer bar starts filling. Do not remove the element afterwards; it simply lives off-screen.

### [EFFECT-03] layout-engine-and-entrance

Used in: SECTION-02, SECTION-03, SECTION-04, SECTION-05

Implement `init()`, called only from `start()`. Destructure `const [active, ...rest] = order`, resolve `const detailsActive = detailsEven ? "#details-even" : "#details-odd"` and the inverse `detailsInactive`, then read `const { innerHeight: height, innerWidth: width } = window` and derive the two anchors: `offsetTop = height - 430` and `offsetLeft = width - 830`. Those two numbers position the thumbnail row and the HUD against the bottom-right corner at any viewport, and every coordinate below is expressed from them -- never hardcode a pixel position.

Set the pre-state with `gsap.set`: `#pagination` → `{ top: offsetTop + 330, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 }`; `nav` → `{ y: -200, opacity: 0 }`; the active card → `{ x: 0, y: 0, width: "100vw", height: "100vh" }` (viewport units, **not** `window.innerWidth`/`window.innerHeight` numbers -- see EFFECT-08); its caption → `{ x: 0, y: 0, opacity: 0 }`; `detailsActive` → `{ opacity: 0, zIndex: 22, x: -200 }`; `detailsInactive` → `{ opacity: 0, zIndex: 12 }` plus its children parked below their masks (`.text` `y: 100`, `.title-1` `y: 100`, `.title-2` `y: 100`, `.desc` `y: 50`, `.cta` `y: 60`); `.progress-sub-foreground` → `{ width: 500 * (1 / order.length) * (active + 1) }`; and `.indicator` → `{ x: -window.innerWidth }`.

Then loop `rest.forEach((i, index) => ...)` and park each thumbnail **400px off to the right of its resting slot**: card → `{ x: offsetLeft + 400 + index * (cardWidth + gap), y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 10 }`; caption → `{ x: , zIndex: 40, y: offsetTop + cardHeight - 100 }`; slider item → `{ x: (index + 1) * numberSize }`.

With `const startDelay = 0.6`, play the entrance: every card and caption tweens to `x: offsetLeft + index * (cardWidth + gap)` with `ease` and `delay: startDelay`; `#pagination` to `{ y: 0, opacity: 1 }`; `nav` to `{ y: 0, opacity: 1 }`; `detailsActive` to `{ opacity: 1, x: 0 }` -- all four with `ease, delay: startDelay`. Note the deliberate quirk in the two card tweens: a `delay: 0.05 * index` is written first and then overwritten by the later `delay: startDelay` key in the same object literal, so the row arrives as one block rather than staggered. Reproduce it as written. No `duration` is passed anywhere in `init()`, so GSAP's 0.5s default governs the whole entrance. End `init()` by registering the two listeners of EFFECT-08: `window.addEventListener("resize", onResize)` and `window.addEventListener("load", onResize)`.

### [EFFECT-04] autoplay-indicator-loop

Used in: SECTION-06

Implement the Promise wrapper `animate(target, duration, properties)` returning `new Promise((resolve) => gsap.to(target, { ...properties, duration, onComplete: resolve }))`, then the recursive driver:

```js
async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}
```

Read it as a timer: the 5px accent bar fills across the top over 2s, waits 0.3s, exits right over 0.8s, is teleported back off-screen left, and only then does `step()` run -- and `loop()` re-arms itself only after `step()`'s Promise resolves. That awaited chain is what keeps the bar and the card transition permanently in phase; an interval-based version drifts within a minute. `loop()` is never called directly -- only from the `onComplete` of EFFECT-02.

### [EFFECT-05] card-promotion-step

Used in: SECTION-03

Implement `step()` returning `new Promise((resolve) => { ... })`. Open by raising the `transitioning = true` flag of EFFECT-08, then rotate the queue with `order.push(order.shift())` and flipping `detailsEven = !detailsEven`, then resolve `detailsActive` / `detailsInactive` from the new flag and repaint the newly active panel from `data[order[0]]` (see EFFECT-06). Destructure `const [active, ...rest] = order` and grab the outgoing card as `const prv = rest[rest.length - 1]` -- after the rotation, yesterday's hero has been pushed to the tail of `rest`, and that is the whole trick of the mechanic.

Immediately `gsap.set(getCard(prv), { zIndex: 10 })` and `gsap.set(getCard(active), { zIndex: 20 })` so the incoming thumbnail rises above the outgoing photo but stays below the remaining thumbnails at 30, then `gsap.to(getCard(prv), { scale: 1.5, ease })` -- the outgoing frame pushes gently into the screen while it is covered, which is what makes the swap read as a camera move instead of a cut.

Fade the incoming caption out of the way with `gsap.to(getCardContent(active), { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease })`, then run the promotion itself: `gsap.to(getCard(active), { x: 0, y: 0, width: "100vw", height: "100vh", borderRadius: 0, ease, onComplete: ... })`. Two constraints here. Tweening `width`/`height`/`borderRadius` rather than `scale` is required -- a scaled thumbnail distorts the photo's aspect and blurs the 10px corner radius on the way out. And the target must be the strings `"100vw"`/`"100vh"`, not `window.innerWidth`/`window.innerHeight`: GSAP converts the units for the tween but leaves viewport units in the inline style, so the full-bleed card keeps filling the screen even if the viewport changes size later.

Inside that `onComplete`, recycle the outgoing card to the tail of the row in one frame with `gsap.set` (no tween -- it is hidden behind the new full-bleed photo): compute `const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap)`, then card → `{ x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 10, scale: 1 }`; caption → `{ x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40 }`; slider item → `{ x: rest.length * numberSize }`. Re-park the now-inactive details panel back to its pre-state (`opacity: 0`, `.text`/`.title-1`/`.title-2` at `y: 100`, `.desc` at `y: 50`, `.cta` at `y: 60`) so it is armed for the next swap. Then lower `transitioning = false` and flush a deferred resize with `if (pendingRelayout) { pendingRelayout = false; relayout() }` (EFFECT-08). Finally `clicks -= 1; if (clicks > 0) step()` against a module-level `let clicks = 0` -- the queue-drain hook for the arrow buttons of SECTION-05.

Slide the surviving thumbnails one slot left in `rest.forEach((i, index) => ...)`, skipping `i === prv`: `gsap.set(getCard(i), { zIndex: 30 })`, then tween card and caption to `x: offsetLeft + index * (cardWidth + gap)` (card also `y: offsetTop, width: cardWidth, height: cardHeight`; caption also `y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40`) with `ease` and `delay: 0.1 * (index + 1)`. That incremental delay is the visible signature of the transition -- the row ripples rather than snapping -- so do not collapse it to a single tween or a `stagger`.

### [EFFECT-06] details-ab-masked-reveal

Used in: SECTION-04

The overlay text never cross-fades in place. Build **two identical `.details` panels**, `#details-even` and `#details-odd`, and alternate which one is live via the `detailsEven` boolean flipped at the top of `step()`. Repaint only the incoming one with `document.querySelector` + `.textContent` against `data[order[0]]`: `` `${detailsActive} .place-box .text` ``, `` `${detailsActive} .title-1` ``, `` `${detailsActive} .title-2` ``, `` `${detailsActive} .desc` ``.

Raise it with `gsap.set(detailsActive, { zIndex: 22 })` and `gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease })`, drop the outgoing one with `gsap.set(detailsInactive, { zIndex: 12 })`, and reveal the four lines out of their `overflow: hidden` boxes by tweening each to `y: 0` on its own beat, all with `ease`:

- `.text` — `delay: 0.1`, `duration: 0.7`
- `.title-1` — `delay: 0.15`, `duration: 0.7`
- `.title-2` — `delay: 0.15`, `duration: 0.7`
- `.desc` — `delay: 0.3`, `duration: 0.4`
- `.cta` — `delay: 0.35`, `duration: 0.4`, and **this last tween carries `onComplete: resolve`** -- the CTA landing is what finishes `step()`'s Promise and lets EFFECT-04 re-arm the timer.

The masks are pure CSS and must exist or the slide-up shows text sliding over the photo: `.place-box` is `height: 46px; overflow: hidden` and `.title-box-1` / `.title-box-2` are `margin-top: 2px; height: 100px; overflow: hidden`.

### [EFFECT-07] pagination-hud-sync

Used in: SECTION-05

Both HUD tweens live inside `step()` and use `ease`, no explicit duration.

- **Number odometer.** All six `.item` numbers are stacked absolutely inside a single 50×50 `overflow: hidden` window, offset horizontally by `numberSize`. On each advance, tween the incoming number to `x: 0` and the outgoing one to `x: -numberSize` (it exits left), and in the recycle block `gsap.set` it to `x: rest.length * numberSize` so it re-enters the queue far off to the right. Horizontal, not vertical -- the box is square and the numbers ride sideways.
- **Progress bar.** Tween `.progress-sub-foreground` to `width: 500 * (1 / order.length) * (active + 1)`. Because `active` is the destination's stable index rather than its position in the queue, the bar jumps to wherever the current destination sits in the original list instead of creeping monotonically -- keep that formula exactly.

### [EFFECT-08] resize-relayout

Used in: SECTION-03, SECTION-05, SECTION-06

Every coordinate in EFFECT-03 is derived from the viewport once, at boot. Without this effect the composition silently locks to whatever size the window happened to be when `init()` ran -- which breaks badly inside a preview iframe that boots narrow and expands afterwards: the hero card stays a few hundred pixels wide, `offsetLeft = width - 830` goes negative so the thumbnail row and the HUD sit off-canvas, and the `.cover` (which is `100vw` but was only pushed to `x: innerWidth + 400` at the old width) comes back to blank out the right side of the page. Implement it.

Add two module-level flags, `let transitioning = false` and `let pendingRelayout = false`, then write `relayout()`. It bails immediately with `if (transitioning) { pendingRelayout = true; return }` -- re-anchoring mid-transition would fight the in-flight tweens of EFFECT-05, so the resize is queued and flushed from that step's `onComplete`. Otherwise it recomputes `offsetTop = window.innerHeight - 430` and `offsetLeft = window.innerWidth - 830`, destructures `const [active, ...rest] = order`, and re-places everything with `gsap.set` (never `gsap.to` -- a resize must be instant, not animated):

- active card → `{ x: 0, y: 0, width: "100vw", height: "100vh", borderRadius: 0, scale: 1 }`
- each `rest` thumbnail and its caption → `const x = offsetLeft + index * (cardWidth + gap)`, card `{ x, y: offsetTop, width: cardWidth, height: cardHeight, borderRadius: 10 }`, caption `{ x, y: offsetTop + cardHeight - 100 }`
- `#pagination` → `{ top: offsetTop + 330, left: offsetLeft }` only -- do **not** touch its `y`/`opacity`, or a resize would replay the entrance tween of EFFECT-03
- `.cover` → `{ x: window.innerWidth + 400 }`, pushing it back out of frame at the new width

Debounce it: `let resizeTimer` plus `function onResize() { clearTimeout(resizeTimer); resizeTimer = setTimeout(relayout, 150) }`, and bind `onResize` to both `resize` and `load` from the end of `init()` (see EFFECT-03). The `load` binding covers the case where the page booted inside a collapsed or not-yet-measured container and no `resize` event ever follows. The `.indicator` needs no handling here -- EFFECT-04 re-seeds it from the current `window.innerWidth` on every cycle, so it self-corrects within one pass.

## SECTIONS

### [SECTION-01] destination-data — the six-entry content model

Uses: none

Declare `const data = [...]` at the top of `script.js`. Six objects, each `{ place, title, title2, description, image }`, where `image` is the matching SETUP-ASSETS URL. Titles are always split across two lines and always uppercase. Copy verbatim:

https://www.instagram.com/faxia.salud/

### [SECTION-02] navbar — fixed transparent bar

Uses: EFFECT-03

``: `position: fixed`, `left/top/right: 0`, `z-index: 50`, `display: flex`, `align-items: center`, `justify-content: space-between`, `padding: 20px 36px`, `font-weight: 500`, transparent background -- the photo runs underneath it. Its two direct `> div` children are `display: inline-flex; align-items: center; text-transform: uppercase; font-size: 14px`; the first gets `gap: 10px`, the last `gap: 24px`. Every `svg` and every `.svg-container` inside the nav is 20×20.

**Left:** a `.svg-container` holding a minimal Sol de Mayo mark -- `viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor"`, a `` and a `` of twelve rays evenly spaced around it: `M18.5 12L22 12`, `M17.63 8.75L20.66 7`, `M15.25 6.37L17 3.34`, `M12 5.5L12 2`, `M8.75 6.37L7 3.34`, `M6.37 8.75L3.34 7`, `M5.5 12L2 12`, `M6.37 15.25L3.34 17`, `M8.75 17.63L7 20.66`, `M12 18.5L12 22`, `M15.25 17.63L17 20.66`, `M17.63 15.25L20.66 17`. Beside it the wordmark `

Visita Argentina

`.

**Right:** six links as bare `

`s -- "Inicio" (carrying `class="active"`), "Destinos", "Experiencias", "Vuelos", "Ofertas", "Contacto". `.active` is `position: relative` with an `::after` bar pinned `bottom: -8px; left: 0; right: 0`, `height: 3px`, `border-radius: 99px`, `background-color: #75AADB`. Then two `.svg-container` icons on `viewBox="0 0 24 24"`: a search glass (`fill="none" stroke-width="1.5" stroke="currentColor"`, `stroke-linecap`/`stroke-linejoin="round"`, path `M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z`) and a filled user bust (`fill="currentColor"`, `fill-rule="evenodd" clip-rule="evenodd"`, path `M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z`).

### [SECTION-03] card-stack — six photo cards and their captions

Uses: EFFECT-01, EFFECT-02, EFFECT-03, EFFECT-05, EFFECT-08

An empty `

` in the markup; JS fills it. Build both strings with `.map(...).join('')` and assign `cards + cardContents` to `_('demo').innerHTML` in one write:

```js
const cards = data.map((i, index) => `

`).join('')
const cardContents = data.map((i, index) => `

${i.place}

${i.title}

${i.title2}

`).join('')
```

All twelve elements exist from the first frame; the animation only ever moves them. The photo is a `background-image` with `background-size: cover` on the card itself -- never an ``, because the card is tweened between a 200×300 thumbnail and a full viewport and only `cover` re-crops correctly at both.

Caption styling: `.content-start` is a 30×5 pill (`border-radius: 99px`, `background-color: #FFFFFFDD`) that acts as the dash above the label; `.content-place` is `margin-top: 6px`, `font-size: 13px`, `font-weight: 500`; `.content-title-1` and `.content-title-2` are Oswald, `font-weight: 600`, `font-size: 20px`.

### [SECTION-04] details-panels — the twin overlay text blocks

Uses: EFFECT-03, EFFECT-06

Two structurally identical `

` elements, `id="details-even"` and `id="details-odd"`, both hardcoded in the markup with the Iguazú copy as their initial content (JS overwrites the incoming one on every advance). Each is `position: absolute; top: 240px; left: 60px; z-index: 22` and contains, in order:

- `

Misiones

` — the box is `height: 46px; overflow: hidden`; `.text` is `padding-top: 16px; font-size: 20px` and carries a `:before` pseudo-element pinned `position: absolute; top: 0; left: 0`, 30×4, `border-radius: 99px`, `background-color: white` -- the accent dash above the province name.
- `

https://www.instagram.com/faxia.salud/

` — boxes `margin-top: 2px; height: 100px; overflow: hidden`; the titles are Oswald, `font-weight: 600`, `font-size: 72px`.
- `https://www.instagram.com/faxia.salud/
- `

` — `width: 500px; margin-top: 24px; display: flex; align-items: center`. Inside, a ``: 36×36, `border: none`, `border-radius: 99px`, `background-color: #75AADB`, `color: white`, `display: grid; place-items: center`, holding a 20×20 filled bookmark SVG (`viewBox="0 0 24 24" fill="currentColor"`, `fill-rule="evenodd" clip-rule="evenodd"`, path `M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z`). Beside it a `Descubrir destino`: `border: 1px solid #ffffff`, transparent background, `height: 36px`, `border-radius: 99px`, `color: #ffffff`, `padding: 4px 24px`, `font-size: 12px`, `margin-left: 16px`, `text-transform: uppercase`.

### [SECTION-05] pagination-hud — arrows, progress bar, slide number

Uses: EFFECT-03, EFFECT-07, EFFECT-08

`

`: `position: absolute; left: 0px; top: 0px; display: inline-flex` -- the real corner placement comes from the `top`/`left` written by EFFECT-03.

- Two `.arrow` circles (`.arrow-left`, `.arrow-right`): 50×50, `border-radius: 999px`, `border: 2px solid #ffffff55`, `display: grid; place-items: center`, `z-index: 60`, the second one `margin-left: 20px`. Each holds a 24×24 chevron (`viewBox="0 0 24 24" fill="none" stroke="currentColor"`, `stroke-linecap`/`stroke-linejoin="round"`, `stroke-width: 2`, `color: #ffffff99`) -- left `M15.75 19.5L8.25 12l7.5-7.5`, right `M8.25 4.5l7.5 7.5-7.5 7.5`. They are rendered but no listener is bound to them: the `clicks` counter of EFFECT-05 exists as the drain for a future handler and is only ever decremented, so the carousel is timer-driven only. Ship them exactly like this.
- `.progress-sub-container`: `margin-left: 24px`, 500×50, `display: flex; align-items: center`, `z-index: 60`. Inside, `.progress-sub-background` is a 500×3 `#ffffff33` track holding `.progress-sub-foreground`, `height: 3px`, `background-color: #75AADB`.
- `

` : 50×50, `overflow: hidden`, `position: relative`, `z-index: 60`. Fill it with ``data.map((_, index) => `

${index + 1}

`).join('')`` assigned to `_('slide-numbers').innerHTML`. Each `.item` is 50×50, `position: absolute; top: 0; left: 0`, `display: grid; place-items: center`, `color: white`, `font-size: 32px`, `font-weight: bold`.

### [SECTION-06] indicator-and-cover — the two full-width utility layers

Uses: EFFECT-02, EFFECT-04, EFFECT-08

`

` is the first element in ``: `position: fixed; left: 0; right: 0; top: 0`, `height: 5px`, `z-index: 60`, `background-color: #75AADB`. It spans the full viewport width and is animated purely on `x`, so it reads as a bar filling in from the left rather than a bar growing. `

` is the last element in `` -- see EFFECT-02 for both.

## DETAILS

**Palette and voice.** Near-black `#1a1a1a` under the photography, `#FFFFFFDD` for every piece of text and the two accent dashes, and `#75AADB` -- the celeste of the Argentine flag -- as the single accent, used in exactly four places: the timer bar, the active nav underline, the progress fill and the bookmark button. Chrome is drawn in low-opacity white hairlines (`#ffffff55` arrow rings, `#ffffff33` progress track, `#ffffff99` chevrons). No gradients, no blur, no overlay scrim -- the photos are graded so the left third is dark enough to carry the type on its own.

**Typographic hierarchy.** Oswald 600 appears at exactly two sizes -- 72px for the two-line destination title in the overlay, 20px for the same title on a thumbnail -- and nowhere else. Everything else is Inter at 12–20px, with `text-transform: uppercase` on the nav and the "Descubrir destino" button. The tension between one huge condensed display stack and small quiet sans is the identity.

**Rhythm.** One full cycle is 2s of bar fill + 0.3s hold + 0.8s bar exit, then the `step()` transition, whose critical path ends when the `.cta` tween finishes at 0.35s delay + 0.4s duration. Everything eases on `sine.inOut` -- the constant, symmetric feel across all fourteen tweens is deliberate; swapping in `power2` or a bounce breaks the "documentary" register immediately.

**Known behaviours to preserve.** The composition is desktop-first by design and has no media queries: the `.details` panels sit at a fixed `left: 60px; top: 240px` with a 500px text column, and `body` has `overflow: hidden`, so below roughly 1100px wide the thumbnail row runs past the right edge. That is intentional -- do not add breakpoints or a mobile layout unless explicitly asked. What EFFECT-08 does add is only re-anchoring: it keeps the desktop composition correct when the viewport changes size after boot, which is mandatory because the page is routinely rendered inside a preview pane that starts collapsed. Verify it by loading the page in a narrow window and then widening it: the hero photo must stay full-bleed, the thumbnail row must stay pinned to the bottom-right, and no white band may appear on the right. haz la pagina para faxia no viajes ,adjunta las imagenes y aplica los efectos a las imagenes y al instagran de faxia, no crees imagenes

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/33df2fb2-8f60-447e-a56f-e8b1cf14ea37).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
