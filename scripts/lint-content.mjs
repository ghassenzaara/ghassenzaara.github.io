/**
 * lint:content — two jobs.
 *
 * 1. Placeholders never ship. Any surviving todo() fails a production build and
 *    prints the list. In development they render as visible chips instead. The
 *    point is that a gap stays a gap: nothing gets invented to fill it, and
 *    nothing gets shipped unnoticed.
 *
 * 2. The voice rules from CONTEXT.md section 7 are checked once, against
 *    finished copy, rather than policed sentence by sentence while writing.
 *
 * Production is detected via CI or NODE_ENV=production. Locally it warns.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative, join, extname } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = join(root, 'src/content')

const isProduction = process.env.CI === 'true' || process.env.NODE_ENV === 'production'

/** Words that make portfolio copy sound like every other portfolio. */
const BANNED = [
  { re: /\bpassionate\b/gi, why: 'CONTEXT section 7 bans it' },
  { re: /\bcutting[- ]edge\b/gi, why: 'CONTEXT section 7 bans it' },
  { re: /\bleverag(e|ing|es)\b/gi, why: 'CONTEXT section 7 bans it' },
  { re: /\bsynergy\b/gi, why: 'CONTEXT section 7 bans it' },
  { re: /\bjourney\b/gi, why: 'CONTEXT section 7 bans it' },
  { re: /\beager to learn\b/gi, why: 'CONTEXT section 7 bans it' },
  { re: /\bwho loves\b/gi, why: '"I am an X who loves Y" — CONTEXT section 7 bans it' },
  { re: /—/g, why: 'no em dashes in body copy — use a comma or a full stop' },
  { re: /\b\d{1,3}%\s*(proficien|skill|master)/gi, why: 'no skill percentages' },
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (['.ts', '.tsx'].includes(extname(name))) out.push(full)
  }
  return out
}

/**
 * Only string literals are copy. Identifiers and comments are not, and neither
 * are the notes inside todo() — those are reminders to the author, not text a
 * reader will ever see.
 */
function stringLiterals(source) {
  const stripped = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/\btodo\(\s*(['"`])[\s\S]*?\1\s*\)/g, 'todo()')
  const out = []
  const re = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g
  let m
  while ((m = re.exec(stripped)) !== null) {
    const value = m[1] ?? m[2] ?? m[3] ?? ''
    if (value.length < 12) continue // import paths, keys, class names
    if (/^[./@]/.test(value)) continue // module specifiers
    out.push({ value, index: m.index, source: stripped })
  }
  return out
}

const todos = []
const voice = []

/**
 * Em dashes anywhere in src/, not just in content files.
 *
 * The first version of this only walked src/content, and a "Name — note" join
 * written directly in JSX walked straight past it. There is no legitimate em
 * dash in this project's rendered output, so the whole tree is fair game.
 * Comments are stripped first, since prose about the rule is not a violation.
 */
function walkAll(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walkAll(full, out)
    else if (['.ts', '.tsx'].includes(extname(name))) out.push(full)
  }
  return out
}

for (const file of walkAll(join(root, 'src'))) {
  const rel = relative(root, file).replace(/\\/g, '/')
  const stripped = readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/\btodo\(\s*(['"`])[\s\S]*?\1\s*\)/g, 'todo()')
  const idx = stripped.indexOf('—')
  if (idx !== -1) {
    const line = stripped.slice(0, idx).split('\n').length
    voice.push(`${rel}:${line}  no em dashes in rendered copy — use a comma, a full stop, or ·`)
  }
}

for (const file of walk(CONTENT)) {
  const rel = relative(root, file).replace(/\\/g, '/')
  const source = readFileSync(file, 'utf8')

  // todo('...') call sites, minus the definition in types.ts.
  if (!rel.endsWith('content/types.ts')) {
    const re = /\btodo\(\s*(['"`])([\s\S]*?)\1/g
    let m
    while ((m = re.exec(source)) !== null) {
      const line = source.slice(0, m.index).split('\n').length
      todos.push(`${rel}:${line}  ${m[2]}`)
    }
  }

  for (const literal of stringLiterals(source)) {
    for (const rule of BANNED) {
      rule.re.lastIndex = 0
      if (rule.re.test(literal.value)) {
        const line = literal.source.slice(0, literal.index).split('\n').length
        voice.push(`${rel}:${line}  ${rule.why}\n      in: ${literal.value.slice(0, 70)}...`)
      }
    }
  }
}

let failed = false

if (voice.length) {
  console.error(`\nlint:content — ${voice.length} voice violation(s)\n`)
  for (const v of voice) console.error('  ' + v)
  failed = true
}

if (todos.length) {
  const header = `lint:content — ${todos.length} unresolved placeholder(s)`
  const lines = todos.map((t) => '  ' + t).join('\n')
  if (isProduction) {
    console.error(`\n${header}\n\n${lines}\n\nThese must be filled in before release.\n`)
    failed = true
  } else {
    console.warn(`\n${header} (dev build — they render as visible chips)\n\n${lines}\n`)
  }
}

if (failed) process.exit(1)
if (!todos.length) console.log('lint:content — clean')
