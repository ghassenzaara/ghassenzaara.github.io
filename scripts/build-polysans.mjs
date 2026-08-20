/**
 * Converts the PolySans .otf files to .woff2 and reports the exact set of
 * characters they contain.
 *
 * PolySans Trial ships a very small cmap. Rather than let the browser discover
 * that one glyph at a time, `src/styles/fonts.css` declares PolySans with a
 * `unicode-range` covering exactly what it has, so every other character is
 * handed to Switzer deterministically. This script is what produces that range
 * — it is derived from the font binary, never hand-written, so re-running it
 * after swapping in full licensed weights automatically widens the range.
 *
 * Run: node scripts/build-polysans.mjs
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'fonts-src')
const OUT = join(root, 'public/fonts/polysans')

/** Which trial file backs which weight in the ladder. */
const WEIGHTS = [
  ['polysanstrial-slim.otf', 300, 'polysans'],
  ['polysanstrial-neutral.otf', 400, 'polysans'],
  ['polysanstrial-median.otf', 500, 'polysans'],
  ['polysanstrial-bulky.otf', 700, 'polysans'],
  // The mono cut carries the label, tag and numbering role.
  ['polysanstrial-neutralmono.otf', 400, 'polysans-mono'],
  ['polysanstrial-medianmono.otf', 500, 'polysans-mono'],
]

const PY = `
import sys, json
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import compress

src, out = sys.argv[1], sys.argv[2]
f = TTFont(src)
cps = sorted(c for c in f.getBestCmap().keys())
f.close()
compress(src, out)
print(json.dumps(cps))
`

/** Collapses a sorted list of code points into CSS unicode-range syntax. */
function toRanges(cps) {
  const out = []
  let start = cps[0]
  let prev = cps[0]
  for (const cp of cps.slice(1)) {
    if (cp === prev + 1) {
      prev = cp
      continue
    }
    out.push([start, prev])
    start = cp
    prev = cp
  }
  out.push([start, prev])
  const hex = (n) => 'U+' + n.toString(16).toUpperCase().padStart(4, '0')
  return out.map(([a, b]) => (a === b ? hex(a) : `${hex(a)}-${hex(b)}`)).join(', ')
}

if (!existsSync(SRC)) {
  console.error(`\npublic/fonts not found at ${SRC}\n`)
  process.exit(1)
}

mkdirSync(OUT, { recursive: true })

let shared = null

for (const [file, weight, family] of WEIGHTS) {
  const input = join(SRC, file)
  if (!existsSync(input)) {
    console.error(`missing: ${file}`)
    process.exit(1)
  }
  const out = join(OUT, `${family}-${weight}.woff2`)
  const stdout = execFileSync('python', ['-c', PY, input, out], { encoding: 'utf8' })
  const cps = JSON.parse(stdout.trim().split('\n').pop())

  const printable = cps.filter((c) => c >= 0x20 && c < 0x2100)
  console.log(
    `${family}-${weight}.woff2`.padEnd(24) +
      `  ${(statSync(out).size / 1024).toFixed(1)} KB  ` +
      `${cps.length} glyphs`,
  )

  const range = toRanges(printable)
  if (shared === null) shared = range
  else if (shared !== range) {
    console.warn(`  note: ${file} has a different character set to the first weight`)
  }
}

console.log('\nunicode-range for src/styles/fonts.css:\n')
console.log(`  unicode-range: ${shared};\n`)
