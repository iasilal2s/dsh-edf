/**
 * dsh-theme-endfield — Host half.
 *
 * The theme itself lives in the browser half (`./client`). This half owns one
 * job: kill the light flash. The shipped ui-theme row embeds the *durable*
 * preference into every index response, so a user whose setting is `light`
 * (or `system` on a light desktop) sees a white loading page before the client
 * plugin tree can switch to this dark-only theme. One extra body row pins the
 * dark palette attribute before the shell mounts.
 *
 * Why not write the durable preference from here instead: that would mutate
 * another feature's settings namespace during boot, and a failed write would
 * leave the flash in place. A read-free, side-effect-free script row cannot
 * fail that way.
 *
 * @module dsh-theme-endfield
 */

/** Stable Cordis plugin name (also the loader row id in `cordis.patch.yml`). */
const name = 'theme-endfield'

/**
 * Pre-plugin dark bootstrap. Idempotent, dependency-free, and pure DOM: it sets
 * exactly the two fields ui-layout's ThemePresenter owns, one paint earlier.
 * `--dsh-content-font-size` is deliberately left to ui-theme's row.
 *
 * The assertion runs twice on purpose. Injection rows render in listener
 * registration order, and the shipped ui-theme row — which resolves the durable
 * preference and can therefore write `light` — is not guaranteed to precede
 * this one. The first call wins the common case; the deferred call re-asserts
 * after every inline row has run, before the browser paints.
 */
const BOOT_SCRIPT = `(() => {
  const assertDark = () => {
    document.documentElement.style.colorScheme = 'dark'
    document.body.toggleAttribute('data-ds-dark-theme', true)
  }
  assertDark()
  setTimeout(assertDark, 0)
})()`

/**
 * Contribute the dark bootstrap row to every index render.
 * @param ctx - host context of this profile app.
 */
function apply(ctx) {
  ctx.on('webserver/index-inject', (table) => {
    table.push({ kind: 'script', placement: 'body', text: BOOT_SCRIPT })
  })
}

export { name, apply }
