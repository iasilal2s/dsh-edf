/**
 * Endfield palette — the patch layer this theme applies to the DSH design
 * system (fragment: concatenated into `lib/client.js` by `scripts/build.mjs`).
 *
 * Strategy: the shipped stylesheets derive almost every `--dsw-alias-*` value
 * from a `--dsw-static-*` ramp, so the theme redefines the *ramps* (hue and
 * cast) and only overrides the handful of aliases whose semantics change —
 * chiefly the brand/signal colour, which becomes Endfield signal yellow.
 *
 * Two surface variants come out of the same ramps:
 *   · `TOKENS`       — dark surfaces (ink background, paper text).
 *   · `TOKENS_LIGHT` — light surfaces: the two *neutral* families are mirrored
 *                      stop-for-stop, so the dark-mode alias mapping
 *                      (text = bluish-50, base = bluish-950) lands on dark text
 *                      over a light paper background, while every semantic
 *                      colour (signal yellow, verified green, caution, alert)
 *                      keeps its meaning. Literal (non-ramp) aliases are
 *                      restated in `ALIASES_LIGHT`.
 * The plugin picks one at runtime — see `surfaceMode()` in `src/plugin.js`.
 *
 * The palette mode attribute stays pinned to `dark`, because the ramps above
 * are authored for the dark-mode alias mapping: surface lightness comes from
 * which variant is active, not from the mode flag.
 */

/** The registry requires both palette modes per token; the mode flag is pinned. */
const pair = (value) => ({ light: value, dark: value })

/** Static ramps: family -> stop -> value, authored for dark surfaces. */
const RAMP = {
  // Neutral ink/paper ramp: the app's surfaces, text, and hairlines.
  'neutral-bluish': {
    '00': '#ffffff',
    '50': '#f2f2f0',
    '60': '#f7f7f5',
    '75': '#ececea',
    '100': '#e2e2df',
    '150': '#d8d8d4',
    '200': '#cbcbc6',
    '300': '#bcbcb6',
    '400': '#94948e',
    '500': '#7b7b76',
    '600': '#63635e',
    '700': '#4a4a46',
    '750': '#383835',
    '800': '#2b2b28',
    '850': '#232320',
    '875': '#1d1d1b',
    '900': '#181816',
    '950': '#131312',
    '1000': '#0c0c0b',
  },
  // Pure neutral ramp: scrollbars, tool-bar fills, inline code.
  'neutral': {
    '00': '#ffffff',
    '50': '#f7f7f5',
    '100': '#eeeeec',
    '150': '#e4e4e1',
    '200': '#d7d7d3',
    '250': '#c9c9c5',
    '300': '#b8b8b3',
    '400': '#8d8d88',
    '500': '#6f6f6a',
    '550': '#5d5d58',
    '600': '#4b4b47',
    '700': '#383835',
    '800': '#282826',
    '850': '#212120',
    '900': '#161615',
    '1000': '#000000',
  },
  // The product/brand ramp becomes signal yellow: links, active state, progress.
  'deepseek': {
    '50': '#fffdf0',
    '100': '#fff9c9',
    '200': '#fff383',
    '300': '#ffec3d',
    '400': '#fffa00',
    '450': '#f0ea00',
    '500': '#d6d100',
    '600': '#b0ab00',
    '700-delete': '#8b8700',
    '800': '#3a380f',
    '900': '#2a280d',
  },
  // Cool-neutral steel: the ramp the light palette tints labels with. Kept
  // desaturated so it never fights the single signal colour.
  'blue': {
    '50': '#eef0ef',
    '50p': '#eaeceb',
    '75': '#e4e7e5',
    '100': '#d6d9d7',
    '300': '#a1a6a3',
    '400': '#828884',
    '450': '#727874',
    '500': '#616763',
    '600': '#4f5551',
    '800': '#292e2b',
    '900': '#1d211f',
    '950': '#141816',
  },
  // Verified / online state only.
  'green': {
    '100': '#d3fff0',
    '400': '#00ffa2',
    '500': '#00d98a',
    '900': '#0d3227',
  },
  // Caution state.
  'amber': {
    '100': '#ffe9c7',
    '400': '#ffb020',
    '500': '#ee9b1e',
    '600': '#d1830f',
    '900': '#33260f',
  },
  // Alert state.
  'red': {
    '50': '#fff0ee',
    '100': '#ffdedb',
    '400': '#ff6b60',
    '500': '#ff4438',
    '600': '#e63528',
    '900': '#3a1512',
  },
}

/**
 * Alias overrides: only the semantic values that must differ from the ramp
 * mapping. Everything else follows the ramps above.
 */
const ALIASES = {
  // Primary action = signal yellow (the shipped palette makes it a neutral).
  '--dsw-alias-brand-primary': '#fffa00',
  '--dsw-alias-brand-text': '#fffa00',
  '--dsw-alias-button-primary-hover': '#f2ed00',
  '--dsw-alias-button-primary-dimmed': '#55510f',

  // Utility dock: the sidebar is the signal-yellow rail (its stylesheet scope
  // re-binds every label/border token to ink, see src/endfield.css §10).
  '--dsw-specific-sidebar-fill': '#fffa00',

  // Chat surfaces: the user bubble is the chat surface (light variant below).
  '--dsw-specific-bubble': '#3a3a3a',
  '--dsw-specific-bubble-highlight': '#454545',

  // Hairlines: Endfield draws structure with visible 1px rules.
  '--dsw-alias-border-l1': 'rgb(240 240 240 / 9%)',
  '--dsw-alias-border-l2': 'rgb(240 240 240 / 15%)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgb(240 240 240 / 9%)',
  '--dsw-alias-border-l3': 'rgb(240 240 240 / 24%)',
  '--dsw-alias-border-l4': 'rgb(240 240 240 / 36%)',
  '--dsw-alias-border-inverted': 'rgb(240 240 240 / 9%)',
  '--dsw-alias-border-inverted2': 'rgb(240 240 240 / 12%)',

  // Interaction tints: neutral by default, signal yellow for accent surfaces.
  '--dsw-alias-interactive-bg-hover': 'rgb(240 240 240 / 7%)',
  '--dsw-alias-interactive-bg-active': 'rgb(240 240 240 / 13%)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgb(255 250 0 / 12%)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgb(255 107 96 / 14%)',

  // Masks and skeletons.
  '--dsw-alias-bg-mask-1': 'rgb(8 8 8 / 50%)',
  '--dsw-alias-bg-mask-drop': 'rgb(26 26 26 / 80%)',
  '--dsw-alias-bg-skeleton': 'rgb(240 240 240 / 6%)',

  // Floating toolbars over the stage stay translucent charcoal.
  '--dsw-alias-button-tool-bar-fill': 'rgb(94 94 94 / 55%)',
  '--dsw-alias-button-tool-bar-hover': 'rgb(94 94 94 / 72%)',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgb(26 26 26 / 45%)',

  /*
   * Text tiers and tile surfaces, stated for the ink background. A layer must
   * carry a value for *both* modes, so the light variant restates these rather
   * than introducing tokens the dark slot would leave undefined. Values match
   * what the dark alias mapping derives from the ramps above, so the dark
   * surface is unchanged.
   */
  '--dsw-alias-label-primary': '#f2f2f0',
  '--dsw-alias-label-secondary': '#bcbcb6',
  '--dsw-alias-label-tertiary': '#94948e',
  '--dsw-alias-label-caption': '#63635e',
  '--dsw-alias-label-primary-inverted': '#0c0c0b',
  '--dsw-alias-label-primary-foreground': '#0c0c0b',
  '--dsw-alias-bg-module-platform': 'rgb(240 240 240 / 8%)',

  /*
   * Elevation on the ink surface. The mirrored ramps can't be lifted directly
   * (the light surface derives its own layers from the opposite stops), so the
   * three panel layers are stated here instead: the ramp values sit within a
   * few percent of the base and a dialog would read as one black slab.
   */
  '--dsw-alias-bg-layer-1': '#232321',
  '--dsw-alias-bg-layer-2': '#2a2a28',
  '--dsw-alias-bg-layer-3': '#333330',

  // Warning labels need more lift than the ramp's caution stop gives them.
  '--dsw-alias-state-warn-label': '#ffc14d',

  // Scrollbar thumbs: neutral grey, squared in the stylesheet.
  '--dsw-alias-scrollbar-hover-l1': '#5f5f5f',
  '--dsw-alias-scrollbar-hover-l2': '#6f6f6f',
}

/** Families whose ramp is mirrored for the light surface variant. */
const SURFACE_FAMILIES = ['neutral-bluish', 'neutral']

/**
 * Aliases that are literal colours rather than ramp references, so they must be
 * restated for a light surface: white-alpha becomes ink-alpha, and the chat
 * surfaces become light greys.
 */
const ALIASES_LIGHT = {
  '--dsw-alias-border-l1': 'rgb(20 20 20 / 18%)',
  '--dsw-alias-border-l2': 'rgb(20 20 20 / 26%)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgb(20 20 20 / 18%)',
  '--dsw-alias-border-l3': 'rgb(20 20 20 / 34%)',
  '--dsw-alias-border-l4': 'rgb(20 20 20 / 46%)',
  '--dsw-alias-border-inverted': 'rgb(20 20 20 / 18%)',
  '--dsw-alias-border-inverted2': 'rgb(20 20 20 / 22%)',
  '--dsw-alias-interactive-bg-hover': 'rgb(20 20 20 / 9%)',
  '--dsw-alias-interactive-bg-active': 'rgb(20 20 20 / 15%)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgb(176 164 0 / 26%)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgb(198 50 40 / 14%)',
  '--dsw-alias-bg-mask-1': 'rgb(20 20 20 / 38%)',
  '--dsw-alias-bg-mask-drop': 'rgb(244 244 242 / 82%)',
  '--dsw-alias-bg-skeleton': 'rgb(20 20 20 / 9%)',
  '--dsw-alias-button-tool-bar-fill': 'rgb(244 244 242 / 82%)',
  '--dsw-alias-button-tool-bar-hover': 'rgb(244 244 242 / 94%)',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgb(244 244 242 / 62%)',
  '--dsw-alias-state-warn-label': '#8f5a00',
  '--dsw-alias-scrollbar-hover-l1': '#8f8f8f',
  '--dsw-alias-scrollbar-hover-l2': '#7c7c7c',
  '--dsw-specific-bubble': '#e6e6e3',
  '--dsw-specific-bubble-highlight': '#dbdbd7',

  /* Text tiers again, deeper than the mirrored ramp: on a paper background the
     mirrored "caption/tertiary" stops land around #94/#63 and read as washed
     out, so the light variant states them explicitly. */
  '--dsw-alias-label-primary': '#131312',
  '--dsw-alias-label-secondary': '#3a3a38',
  '--dsw-alias-label-tertiary': '#565654',
  '--dsw-alias-label-caption': '#6f6f6c',
  '--dsw-alias-label-primary-inverted': '#f2f2f0',
  '--dsw-alias-label-primary-foreground': '#f2f2f0',
  /* Chip/tile surfaces need one visible step below the paper background. */
  '--dsw-alias-bg-module-platform': '#e4e4e1',
}

/**
 * Mirror one ramp family stop-for-stop (00 ↔ 1000, 50 ↔ 950, …).
 *
 * The stop names must be sorted *numerically* first: JavaScript orders
 * integer-like keys (`"50"`, `"100"`, …) ascending ahead of other string keys,
 * so `"00"` comes last in `Object.keys` and a naive index mirror pairs every
 * stop with the wrong partner.
 */
function mirrorFamily(stops) {
  const entries = Object.entries(stops)
    .map(([stop, value]) => [Number.parseInt(stop, 10), stop, value])
    .sort((left, right) => left[0] - right[0])
  const mirrored = {}
  for (let index = 0; index < entries.length; index += 1) {
    mirrored[entries[index][1]] = entries[entries.length - 1 - index][2]
  }
  return mirrored
}

/**
 * Build one override layer.
 * @param aliases - literal alias values for this surface variant.
 * @param mirror - whether to mirror the surface ramps (light surfaces).
 * @returns token-name → `{ light, dark }` pairs.
 */
function buildTokens(aliases, mirror) {
  const tokens = {}
  for (const [family, stops] of Object.entries(RAMP)) {
    const resolved = mirror && SURFACE_FAMILIES.includes(family) ? mirrorFamily(stops) : stops
    for (const [stop, value] of Object.entries(resolved)) tokens[`--dsw-static-${family}-${stop}`] = pair(value)
  }
  for (const [token, value] of Object.entries(aliases)) tokens[token] = pair(value)
  return tokens
}

/** Dark-surface layer: ink background, paper text. */
const TOKENS = buildTokens(ALIASES, false)

/** Light-surface layer: paper background, ink text. */
const TOKENS_LIGHT = buildTokens({ ...ALIASES, ...ALIASES_LIGHT }, true)

/**
 * Fold the two surface layers into a single layer whose `light` and `dark`
 * slots carry the light-surface and dark-surface values. The theme service
 * picks a slot by the *active theme's* colour scheme, so registering this one
 * layer makes the skin follow 设置 → 外观 (light / dark / system) with no
 * re-registration — re-registering from a `theme/change` handler would publish
 * again from inside the emit and throw.
 *
 * @param dark - tokens for the dark surface.
 * @param light - tokens for the light surface.
 * @returns one layer: every token carrying both surface values.
 */
function combineSurfaces(dark, light) {
  const combined = {}
  for (const name of new Set([...Object.keys(dark), ...Object.keys(light)])) {
    /* A token may exist in only one layer (the light variant adds a few), so
       each slot falls back to whichever layer defines it. */
    const darkModes = dark[name] ?? light[name]
    const lightModes = light[name] ?? dark[name]
    combined[name] = { light: lightModes.light, dark: darkModes.dark }
  }
  return combined
}

/** One layer pinned to a single surface variant (the A/B switch). */
function pinnedTokens(variant) {
  const source = variant === 'dark' ? TOKENS : TOKENS_LIGHT
  const pinned = {}
  for (const [name, modes] of Object.entries(source)) pinned[name] = pair(modes.dark)
  return pinned
}
