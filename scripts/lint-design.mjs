/**
 * lint:design — makes CONTEXT.md section 9's "don't" rules structural.
 *
 * The design spec says tokens are defined once and nothing is hardcoded
 * elsewhere. That is only true if something checks. This is that something.
 * It runs in CI and fails the build.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative, join, extname } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'src')

/** tokens.css is the one file allowed to define raw values. */
const TOKEN_FILE = 'src/styles/tokens.css'
/** Generated from real font metrics; its percentages are data, not design. */
const GENERATED = ['src/styles/font-fallbacks.css']

const ALLOWED_RADII = new Set(['0', '0px', '4px', '12px', '9999px', '50%', 'inherit'])
const ALLOWED_DURATIONS = new Set(['200ms', '600ms', '900ms', '0s', '0ms'])
const ALLOWED_WEIGHTS = new Set(['300', '400', '500', '600', '700', 'inherit', 'normal'])

const RULES = [
  {
    id: 'no-raw-color',
    // Hex, rgb(), hsl() anywhere but tokens.css. --shadow-image lives in
    // tokens.css too, so its rgba() is covered by the same exemption.
    // The lookbehind skips HTML numeric entities: &#8594; is an arrow, not a
    // four-digit hex colour.
    re: /(?<!&)#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g,
    message: 'raw colour outside tokens.css — use a var(--token)',
    skip: (v) => v.startsWith('var('),
  },
  {
    id: 'no-gradient',
    re: /\b(linear|radial|conic)-gradient\(/g,
    message: 'gradients are forbidden everywhere (CONTEXT section 9)',
    everywhere: true,
  },
  {
    id: 'no-extra-shadow',
    re: /box-shadow\s*:\s*([^;]+)/g,
    message: 'the only shadow is var(--shadow-image), and it belongs to imagery',
    everywhere: true,
    check: (v) => v.includes('var(--shadow-image)') || v.trim() === 'none',
  },
  {
    id: 'weight-ladder',
    re: /font-weight\s*:\s*([^;]+)/g,
    message: 'the weight ladder is 300/400/500/600/700 — nothing between',
    everywhere: true,
    check: (v) => v.includes('var(--w-') || ALLOWED_WEIGHTS.has(v.trim()),
  },
  {
    id: 'radius-grammar',
    re: /border-radius\s*:\s*([^;]+)/g,
    message: 'four radii exist: 0, 4px, 12px, 9999px — nothing in between',
    everywhere: true,
    check: (v) =>
      v.includes('var(--r-') ||
      v
        .trim()
        .split(/\s+/)
        .every((part) => ALLOWED_RADII.has(part)),
  },
  {
    id: 'three-durations',
    re: /transition-duration\s*:\s*([^;]+)|transition\s*:\s*([^;]+)/g,
    message: 'three durations exist: 200ms, 600ms, 900ms',
    everywhere: true,
    check: (v) => {
      const times = v.match(/(\d*\.?\d+)(ms|s)\b/g) ?? []
      return times.every((t) => ALLOWED_DURATIONS.has(t) || v.includes('var(--dur-'))
    },
  },
  {
    id: 'one-easing',
    re: /transition-timing-function\s*:\s*([^;]+)/g,
    message: 'one easing curve everywhere: var(--ease)',
    everywhere: true,
    check: (v) => v.includes('var(--ease)'),
  },
  {
    id: 'no-layout-animation',
    // transform and opacity only. Animating a layout property triggers layout
    // on every frame, and that is most of what separates smooth from stuttery.
    // Both the shorthand and the longhand forms are checked — the longhand is
    // the one that slips through when you are not looking for it.
    re: /transition(?:-property)?\s*:\s*([^;]*\b(?:top|left|right|bottom|width|height|margin|padding|inset)\b[^;]*)/g,
    message: 'animate transform and opacity only — never layout properties',
    everywhere: true,
    // clip-path is a compositor property despite reading like geometry, and it
    // is what opens the image frame. `inset()` in its value is not layout.
    check: (v) => /\bclip-path\b/.test(v) && !/\b(width|height|margin|padding)\b/.test(v),
  },
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (['.css', '.ts', '.tsx'].includes(extname(name))) out.push(full)
  }
  return out
}

/** Strip comments so documentation prose never trips a rule. */
function strip(source, ext) {
  let s = source.replace(/\/\*[\s\S]*?\*\//g, '')
  if (ext !== '.css') s = s.replace(/(^|[^:])\/\/.*$/gm, '$1')
  return s
}

const failures = []

for (const file of walk(SRC)) {
  const rel = relative(root, file).replace(/\\/g, '/')
  if (GENERATED.includes(rel)) continue

  const raw = readFileSync(file, 'utf8')
  const source = strip(raw, extname(file))
  const isTokenFile = rel === TOKEN_FILE

  for (const rule of RULES) {
    if (isTokenFile && !rule.everywhere) continue
    rule.re.lastIndex = 0
    let m
    while ((m = rule.re.exec(source)) !== null) {
      const value = m[1] ?? m[2] ?? m[0]
      if (rule.skip?.(value)) continue
      if (rule.check && rule.check(value)) continue
      const line = source.slice(0, m.index).split('\n').length
      failures.push(`${rel}:${line}  [${rule.id}] ${rule.message}\n      found: ${value.trim().slice(0, 80)}`)
    }
  }
}

if (failures.length) {
  console.error(`\nlint:design — ${failures.length} violation(s)\n`)
  for (const f of failures) console.error('  ' + f)
  console.error('')
  process.exit(1)
}

console.log('lint:design — clean')
