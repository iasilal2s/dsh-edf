/**
 * Build `lib/client.js` from the `src/` fragments.
 *
 * The DSH client module system serves exactly one browser artifact per package
 * (`exports["./client"]`), and its format is the tiny registration facade
 * `window.__ModuleLoader__.load({ id, factory })`. This script composes that
 * file from plain fragments — no bundler, no dependencies:
 *
 *   src/palette.js  → token override layer (plain constants)
 *   src/endfield.css → stylesheet, inlined as a JSON string
 *   src/plugin.js   → plugin body (plain constants + functions)
 *
 * Run with `node scripts/build.mjs` (or `pnpm build`) after editing any
 * fragment. The built artifact is committed, so installing the plugin never
 * needs a build.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (relative) => readFileSync(join(root, relative), 'utf8')
const manifest = JSON.parse(read('package.json'))

const css = read('src/endfield.css')
const palette = read('src/palette.js')
const plugin = read('src/plugin.js')

if (css.includes('</style')) throw new Error('src/endfield.css must not contain a closing style tag')
if (plugin.includes('import ') || plugin.includes('export ')) {
  throw new Error('src/plugin.js is a fragment: keep imports and exports out of it')
}

/** Indent one fragment to the factory body's tab depth. */
const indent = (text) =>
  text
    .replace(/\s+$/u, '')
    .split('\n')
    .map((line) => (line === '' ? line : `\t\t${line}`))
    .join('\n')

const output = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(manifest.name)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
\t\t/** Inlined from src/endfield.css. */
\t\tconst ENDFIELD_CSS = ${JSON.stringify(css)};
${indent(palette)}
${indent(plugin)}
\t\texports.apply = apply;
\t\texports.inject = inject;
\t\texports.name = name;
\t\treturn module.exports;
\t}
});
`

writeFileSync(join(root, 'lib/client.js'), output)
process.stdout.write(`built lib/client.js (${String(Buffer.byteLength(output))} bytes)\n`)
