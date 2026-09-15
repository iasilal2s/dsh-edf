/**
 * dsh-theme-endfield — browser half (fragment: concatenated into
 * `lib/client.js` by `scripts/build.mjs`).
 *
 * The bundle requires nothing from the module table: it is pure DOM + the
 * client theme service, so it cannot fail on an unresolved external and works
 * in every Web carrier.
 */

/** Package id: owns the style tag, the token layer, the chrome node. */
const SOURCE = 'dsh-theme-endfield'

/** Cordis plugin name. */
const name = 'theme-endfield'

/** Required service: ui-theme's runtime (token override layers). */
const inject = ['theme']

/** Body attribute selecting the dark base palette in the token stylesheets. */
const DARK_ATTRIBUTE = 'data-ds-dark-theme'

/** Root attribute naming the active surface variant (drives the light overrides). */
const SURFACE_ATTRIBUTE = 'data-endfield-surface'

/** Default surface variant when the user has expressed no preference. */
const SURFACE_DEFAULT = 'light'

/** Marks the one-time preference seed (see `apply`). */
const PREFERENCE_SEED_KEY = 'dsh-endfield-surface-seeded'

/** Splash timing budget (ms): reveal floor, readiness ceiling, phase lengths. */
const SPLASH_MIN_VISIBLE = 1150
const SPLASH_SKIP_FLOOR = 420
const SPLASH_MAX_WAIT = 6000
const SPLASH_FILL_HOLD = 140
const SPLASH_WIPE_RISE = 240
const SPLASH_WIPE_SLIDE = 340
const SPLASH_WIPE_DISSOLVE = 380

/**
 * Whether the user opted out for this browser: `?endfield=off` on the URL or
 * `localStorage['dsh-endfield'] = 'off'` (a recovery hatch that needs no
 * plugin reload). Any storage/URL failure means "not disabled".
 * @returns true when the skin must not install.
 */
function isDisabled() {
  try {
    if (new URLSearchParams(location.search).get('endfield') === 'off') return true
    return localStorage.getItem('dsh-endfield') === 'off'
  } catch {
    return false
  }
}

/**
 * Whether the opening animation is switched off for this browser:
 * `?endfield=splash-off` or `localStorage['dsh-endfield-splash'] = 'off'`.
 * @returns true when the splash must be skipped.
 */
function isSplashDisabled() {
  try {
    if (new URLSearchParams(location.search).get('endfield') === 'splash-off') return true
    return localStorage.getItem('dsh-endfield-splash') === 'off'
  } catch {
    return false
  }
}

/** Whether the user asked the operating system for reduced motion. */
function prefersReducedMotion() {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/**
 * Which surface variant to paint: `light` (paper background, ink text) or
 * `dark` (the original ink background).
 *
 * `?endfield=dark-surface` / `?endfield=light-surface`, then
 * `localStorage['dsh-endfield-surface']` pin one explicitly (an A/B switch that
 * survives everything else). Without a pin the variant follows the theme
 * preference the Settings → 外观 row writes, resolved through
 * {@link surfaceForPreference}.
 *
 * @returns the pinned variant, or undefined when the preference decides.
 */
function pinnedSurface() {
  try {
    const param = new URLSearchParams(location.search).get('endfield')
    if (param === 'dark-surface') return 'dark'
    if (param === 'light-surface') return 'light'
    const stored = localStorage.getItem('dsh-endfield-surface')
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* fall through: nothing pinned */
  }
  return undefined
}

/**
 * Map a durable theme preference onto a surface variant.
 * @param preference - `light`, `dark`, or `system`.
 * @returns the matching variant, or undefined for an unknown preference.
 */
function surfaceForPreference(preference) {
  if (preference === 'dark') return 'dark'
  if (preference === 'light') return 'light'
  if (preference === 'system') {
    try {
      return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    } catch {
      return undefined
    }
  }
  return undefined
}

/**
 * The surface variant the active theme asks for. Reading `active.colorScheme`
 * covers `system` too, because the theme service already resolved it.
 * @param ctx - client context carrying the theme service.
 * @returns `light` or `dark`.
 */
function currentSurface(ctx) {
  try {
    const snapshot = ctx.theme.getTheme()
    const scheme = snapshot.active?.colorScheme
    if (scheme === 'light' || scheme === 'dark') return scheme
    return surfaceForPreference(snapshot.preference) ?? SURFACE_DEFAULT
  } catch {
    return SURFACE_DEFAULT
  }
}

/* ── 等高线场（终末地的地形／测绘语言） ──────────────────────────────────── */

/**
 * Terrain peaks, in the generated SVG's 1600×1000 user space:
 * `[cx, cy, rx, ry, levels, seed]`. The main-UI field hugs the viewport edges
 * so the centre stays clean for content; the splash field is centred.
 */
const CONTOUR_FIELD_UI = [
  [-130, 520, 250, 330, 9, 0.4],
  [1570, 110, 300, 250, 8, 2.1],
  [1420, 990, 330, 220, 7, 4.3],
  [230, 1070, 260, 180, 6, 5.9],
  /* Two summits sit inside the viewport so the motif survives the centre mask:
     the lower-left of the content field and the upper-right header corner. */
  [560, 880, 170, 120, 10, 2.6],
  [1310, 150, 150, 110, 7, 3.9],
]
const CONTOUR_FIELD_SPLASH = [
  [800, 470, 300, 230, 11, 1.2],
  [1230, 760, 250, 170, 7, 3.4],
  [400, 780, 210, 145, 6, 5.1],
  [1580, 100, 230, 170, 5, 0.7],
]

/**
 * Sample one closed contour ring. The radius is a small harmonic sum, so nested
 * rings read as terrain instead of concentric circles; the centre drifts a
 * little per level, the way real contours lean into a slope. Deterministic —
 * the same peaks produce the same map on every load.
 *
 * @param cx - summit x in user space.
 * @param cy - summit y in user space.
 * @param rx - summit radius along x.
 * @param ry - summit radius along y.
 * @param level - ring index, 0 at the summit.
 * @param seed - per-peak phase offset.
 * @param steps - samples per ring.
 * @returns one closed SVG path.
 */
function contourRing(cx, cy, rx, ry, level, seed, steps) {
  const phase = seed + level * 0.46
  const scale = 0.34 + 0.15 * level
  const points = []
  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2
    const wobble =
      1 +
      0.17 * Math.sin(angle * 3 + phase) +
      0.09 * Math.sin(angle * 5 - phase * 1.7) +
      0.05 * Math.sin(angle * 2 + phase * 0.8)
    const x = cx + Math.cos(angle) * rx * scale * wobble + level * 2.2
    const y = cy + Math.sin(angle) * ry * scale * wobble - level * 1.4
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M${points.join('L')}Z`
}

/**
 * Render one contour field as an inline SVG. Every fifth ring is an *index
 * contour* (the brighter, surveyed line on a real map) and carries a marker
 * attribute the stylesheets colour; rings are ordered summit-first so the
 * splash can draw the map outward from each peak.
 *
 * @param peaks - the peak table to render.
 * @param options - `steps` samples per ring and whether rings animate in.
 * @returns SVG markup for one contour layer.
 */
function contourSvg(peaks, options) {
  const steps = options.steps
  const paths = []
  let order = 0
  for (const [cx, cy, rx, ry, levels, seed] of peaks) {
    for (let level = 0; level < levels; level += 1) {
      const index = level % 5 === 0 ? ' data-ef-index=""' : ''
      const delay = options.draw === true ? ` style="animation-delay:${String(order * 22)}ms"` : ''
      /* pathLength="1" normalizes every ring to one unit, so a single
         `stroke-dasharray: 1` rule draws any ring regardless of its real length. */
      paths.push(
        `<path d="${contourRing(cx, cy, rx, ry, level, seed, steps)}" pathLength="1"${index}${delay}/>`,
      )
      order += 1
    }
  }
  const classes = options.draw === true ? ' data-draw=""' : ''
  return (
    '<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"' +
    `${classes}>${paths.join('')}</svg>`
  )
}
/**
 * Install this plugin's own stylesheet, replacing any stale copy. Owned by the
 * fiber through `ctx.effect`, so unloading or HMR removes it (the HMR driver
 * also drops `style[data-plugin]` tags it owns).
 * @returns the created style element.
 */
function installStyle() {
  for (const stale of document.querySelectorAll(`style[data-plugin="${SOURCE}"]`)) stale.remove()
  const tag = document.createElement('style')
  tag.dataset.plugin = SOURCE
  tag.dataset.pluginCss = `${SOURCE}/endfield.css`
  tag.textContent = ENDFIELD_CSS
  document.head.appendChild(tag)
  return tag
}

/**
 * Install the decorative chrome layer: a topographic contour field masked to
 * the viewport periphery, one flat wash for the edges, a rounded 1px viewport
 * frame, four corner brackets, and the concave fillet that rounds the junction
 * where the yellow rail meets the yellow top band. Purely presentational —
 * `aria-hidden`, `pointer-events: none`, appended beside the React root so no
 * render pass can reclaim it. The surface carries no stripes or grid: the
 * contour field is the only texture on screen.
 * @returns the created chrome container.
 */
function installChrome() {
  const existing = document.querySelector('[data-endfield-chrome]')
  if (existing !== null) existing.remove()
  const root = document.createElement('div')
  root.setAttribute('data-endfield-chrome', '')
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML =
    `<div data-ef="contour">${contourSvg(CONTOUR_FIELD_UI, { steps: 128 })}</div>` +
    '<div data-ef="wash"></div><div data-ef="frame"></div>' +
    '<i data-ef="fillet"></i>' +
    '<i data-ef="corner" data-side="tl"></i><i data-ef="corner" data-side="tr"></i>' +
    '<i data-ef="corner" data-side="bl"></i><i data-ef="corner" data-side="br"></i>'
  document.body.appendChild(root)
  return root
}

/**
 * Publish the shell's live geometry as CSS variables, so the fillet sits
 * exactly on the junction of the sidebar and the top band: both the rail width
 * and the band height are user-adjustable (the sidebar column is draggable, the
 * header gains rows).
 *
 * The chrome installs *before* the shell renders, so the first measurement is
 * always empty; a low-frequency poll (writing only when a value actually
 * changes) covers the initial render, a session switch remounting the header,
 * and a sidebar drag, without a ResizeObserver needing to re-attach.
 *
 * @param root - the chrome container to flag when both measurements exist.
 * @returns the disposer stopping the poll and the resize listener.
 */
function watchShellMetrics(root) {
  let last = ''
  const sync = () => {
    const sidebar = document.querySelector('[class*="sidebarCol"]')
    const header = document.querySelector('header[class*="_header"]:has([class*="_tabs"])')
    const rail = sidebar === null ? 0 : Math.round(sidebar.getBoundingClientRect().width)
    const band = header === null ? 0 : Math.round(header.getBoundingClientRect().height)
    const key = `${String(rail)}x${String(band)}`
    if (key === last) return
    last = key
    const style = document.documentElement.style
    style.setProperty('--ef-rail-w', `${String(rail)}px`)
    style.setProperty('--ef-band-h', `${String(band)}px`)
    root.toggleAttribute('data-shell-yellow', rail > 0 && band > 0)
  }
  sync()
  const timer = setInterval(sync, 600)
  window.addEventListener('resize', sync)
  return () => {
    clearInterval(timer)
    window.removeEventListener('resize', sync)
  }
}

/**
 * Install the opening animation: a near-black loading screen (grid, calibration
 * sweep, corner brackets, wordmark masked in, monospace readout with a
 * five-block activity indicator) that ends in a full-bleed signal-yellow wipe
 * into the shell — the sequence the official Endfield site opens with.
 *
 * Every line of text on it is real: the product tagline the welcome screen
 * already shows, plus the boot manifest's own revision and client-module count.
 * The indicator fills when the shell has actually rendered, never on a timer,
 * and the whole overlay is removed afterwards; a click, keypress or wheel skips
 * straight to the wipe, and `prefers-reduced-motion` skips the animation.
 *
 * @returns the disposer removing the overlay and its timers.
 */
function installSplash() {
  const boot = globalThis.__DSH_BOOT__
  const entries = Array.isArray(boot?.entries) ? boot.entries.length : undefined
  const rawRev = boot?.rev
  const rev = typeof rawRev === 'string' && /^[0-9a-zA-Z_-]{1,32}$/.test(rawRev) ? rawRev.slice(0, 12) : undefined
  const readout = [
    entries === undefined ? undefined : `MODULES ${String(entries)}`,
    rev === undefined ? undefined : `REV ${rev}`,
  ]
    .filter((part) => part !== undefined)
    .join(' · ')

  const root = document.createElement('div')
  root.setAttribute('data-endfield-splash', '')
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML =
    `<div data-ef="s-contour">${contourSvg(CONTOUR_FIELD_SPLASH, { steps: 128, draw: true })}</div>` +
    '<div data-ef="s-wash"></div><div data-ef="s-scan"></div>' +
    '<i data-ef="s-corner" data-side="tl"></i><i data-ef="s-corner" data-side="tr"></i>' +
    '<i data-ef="s-corner" data-side="bl"></i><i data-ef="s-corner" data-side="br"></i>' +
    '<div data-ef="s-mark"><span data-ef="s-prism"></span>' +
    '<span data-ef="s-title"></span>' +
    '<span data-ef="s-sub">DeepSeek Harness</span></div>' +
    '<div data-ef="s-readout"><span data-ef="s-dots"><i style="--i:0"></i><i style="--i:1"></i>' +
    '<i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></span>' +
    `<span>${readout}</span></div>` +
    '<div data-ef="s-wipe"><span data-ef="s-ghost"></span></div>'
  document.body.appendChild(root)

  /* All three text nodes are written through textContent: the fallback wordmark
     is the document title, and the tagline is read out of the rendered hero. */
  const titleSeat = root.querySelector('[data-ef="s-title"]')
  const ghostSeat = root.querySelector('[data-ef="s-ghost"]')
  const setMark = (text) => {
    titleSeat.textContent = text
    ghostSeat.textContent = text
  }
  setMark((document.title || '').trim() || 'DeepSeek Harness')
  /** Adopt the shell's own welcome tagline once the hero exists (localized). */
  const adoptTagline = () => {
    const group = document.querySelector('[class*="_titleGroup"]')
    const text = group?.firstElementChild?.textContent?.trim()
    if (text === undefined || text === '' || text.length > 32) return false
    setMark(text)
    return true
  }

  const started = performance.now()
  const timers = new Set()
  let poll
  let finished = false

  const later = (run, delay) => {
    const timer = setTimeout(() => {
      timers.delete(timer)
      run()
    }, delay)
    timers.add(timer)
  }
  const stopPolling = () => {
    if (poll === undefined) return
    clearInterval(poll)
    poll = undefined
  }
  /** Remove the overlay and every pending timer this fiber owns. */
  const finish = () => {
    if (finished) return
    finished = true
    stopPolling()
    for (const timer of timers) clearTimeout(timer)
    timers.clear()
    root.remove()
  }
  /** Start the yellow reveal, no earlier than the reveal floor. */
  const toWipe = (skipped) => {
    if (finished || root.dataset.phase !== undefined) return
    const floor = skipped === true ? SPLASH_SKIP_FLOOR : SPLASH_MIN_VISIBLE
    const elapsed = performance.now() - started
    if (elapsed < floor) {
      later(() => {
        toWipe(skipped)
      }, floor - elapsed)
      return
    }
    root.dataset.phase = 'wipe-rise'
    later(() => {
      root.dataset.phase = 'wipe-slide'
    }, SPLASH_WIPE_RISE + SPLASH_FILL_HOLD)
    later(() => {
      root.dataset.phase = 'wipe-dissolve'
    }, SPLASH_WIPE_RISE + SPLASH_FILL_HOLD + SPLASH_WIPE_SLIDE)
    later(() => {
      root.dataset.phase = 'done'
      finish()
    }, SPLASH_WIPE_RISE + SPLASH_FILL_HOLD + SPLASH_WIPE_SLIDE + SPLASH_WIPE_DISSOLVE)
  }
  /** The shell has rendered when the root seat holds a child (or a frame exists). */
  const shellRendered = () => {
    const host = document.getElementById('root')
    if (host !== null && host.childElementCount > 0) return true
    return document.querySelector('[class*="_frame"], main') !== null
  }
  /** Adopt the hero tagline while waiting; the shell renders it as it mounts. */
  const check = () => {
    if (finished || !shellRendered()) {
      adoptTagline()
      return
    }
    adoptTagline()
    stopPolling()
    toWipe(false)
  }
  const skip = () => {
    stopPolling()
    toWipe(true)
  }
  for (const type of ['pointerdown', 'keydown', 'wheel']) {
    root.addEventListener(type, skip, { passive: true })
  }

  check()
  poll = setInterval(check, 120)
  later(() => {
    stopPolling()
    toWipe(false)
  }, SPLASH_MAX_WAIT)
  return finish
}

/**
 * Pin the *palette mode* to dark.
 *
 * The palette attribute and `color-scheme` are asserted on the DOM rather than
 * by re-writing the preference: the durable settings read lands *after* the
 * first plugins activate, so a stored `light` preference is adopted back and
 * would otherwise render the base sheets' light alias mapping under this skin.
 * The stored preference is deliberately left alone — it is what 设置 → 外观
 * writes, and the surface variant follows it (see the surface layer in
 * `apply`).
 *
 * @param ctx - client context carrying the theme service.
 * @returns the disposer releasing the mutation observer.
 */
function pinPalette(ctx) {
  const assertDark = () => {
    const body = document.body
    if (!body.hasAttribute(DARK_ATTRIBUTE)) body.setAttribute(DARK_ATTRIBUTE, '')
    if (document.documentElement.style.colorScheme !== 'dark') {
      document.documentElement.style.colorScheme = 'dark'
    }
  }
  assertDark()
  ctx.on('theme/change', assertDark)
  /** The presenter retracts the attribute on any non-dark snapshot; put it back. */
  const observer = new MutationObserver(assertDark)
  observer.observe(document.body, { attributes: true, attributeFilter: [DARK_ATTRIBUTE] })
  return () => {
    observer.disconnect()
  }
}

/**
 * Plugin body: palette layer, stylesheet, chrome, opening animation, dark pin,
 * and the debug surface used by the visual checks in the README.
 * @param ctx - client cordis context.
 */
function apply(ctx) {
  if (isDisabled()) {
    ctx.logger.info('theme-endfield: disabled by request (?endfield=off / dsh-endfield=off)')
    return
  }
  /*
   * One-time: adopt the light look as the durable preference, so Settings →
   * 外观 shows 浅色 selected and the skin agrees with it. Afterwards the row is
   * the user's to drive — the surface layer below follows every change.
   */
  try {
    if (pinnedSurface() === undefined && localStorage.getItem(PREFERENCE_SEED_KEY) === null) {
      localStorage.setItem(PREFERENCE_SEED_KEY, '1')
      ctx.theme.setTheme(SURFACE_DEFAULT)
    }
  } catch (error) {
    ctx.logger.warn(`theme-endfield: could not seed the preference: ${String(error)}`)
  }
  ctx.effect(() => {
    const tag = installStyle()
    return () => {
      tag.remove()
    }
  }, 'theme-endfield: stylesheet')
  ctx.effect(() => {
    const root = installChrome()
    const stopWatching = watchShellMetrics(root)
    return () => {
      stopWatching()
      root.remove()
    }
  }, 'theme-endfield: chrome layer')
  /*
   * Palette layer: one layer whose two mode slots carry the two surfaces, so
   * 设置 → 外观 (light / dark / system) switches the skin with no
   * re-registration — the theme service picks the slot by the active theme's
   * colour scheme. An explicit A/B pin collapses it to a single variant.
   */
  const pinned = pinnedSurface()
  ctx.effect(
    () =>
      ctx.theme.overrideTokens(
        SOURCE,
        pinned === undefined ? combineSurfaces(TOKENS, TOKENS_LIGHT) : pinnedTokens(pinned),
      ),
    'theme-endfield: palette layer',
  )
  /*
   * `data-endfield-surface` drives the stylesheet's light-variant overrides
   * (contours, frame, panels, splash). Attribute only — no theme writes, so this
   * can safely run from a `theme/change` handler.
   */
  ctx.effect(() => {
    const paint = () => {
      document.documentElement.setAttribute(SURFACE_ATTRIBUTE, pinned ?? currentSurface(ctx))
    }
    paint()
    const off = ctx.on('theme/change', paint)
    return () => {
      off()
      document.documentElement.removeAttribute(SURFACE_ATTRIBUTE)
    }
  }, 'theme-endfield: surface attribute')
  ctx.effect(() => pinPalette(ctx), 'theme-endfield: palette pin')
  if (!isSplashDisabled() && !prefersReducedMotion()) {
    ctx.effect(() => installSplash(), 'theme-endfield: opening animation')
  }
  window.__dshEndfield = {
    source: SOURCE,
    surface: () => document.documentElement.getAttribute(SURFACE_ATTRIBUTE),
    snapshot: () => ctx.theme.getTheme(),
    set: (id) => ctx.theme.setTheme(id),
    splash: () => {
      document.querySelector('[data-endfield-splash]')?.remove()
      return installSplash()
    },
  }
}
