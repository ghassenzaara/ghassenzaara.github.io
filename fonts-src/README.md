# PolySans

**Drop the licensed `.woff2` files in this folder and the whole site switches to
PolySans. No code change is needed.**

PolySans is a commercial typeface from [Wonder Type](https://wondertype.com/).
It is not on npm, not on Google Fonts, and cannot be downloaded without a
licence, so it is not vendored here. Until the files exist, every `@font-face`
below 404s and the browser falls through to Geist, which is already self-hosted
and metric-similar enough that the layout does not move.

## Expected filenames

`src/styles/fonts.css` declares these exact paths. Filenames must match:

| File | Weight | Style |
|---|---|---|
| `polysans-light.woff2` | 300 | normal |
| `polysans-neutral.woff2` | 400 | normal |
| `polysans-median.woff2` | 500 | normal |
| `polysans-bulky.woff2` | 700 | normal |
| `polysans-slim.woff2` | 400 | normal (used for the mono-ish label role) |

Only `polysans-neutral.woff2` is strictly required — the others degrade to
synthesised or nearest weights.

## Converting from OTF/TTF

If the licence gives you `.otf` or `.ttf`, convert once:

```bash
npx woff2 polysans-neutral.otf     # or use fonttools:
# pip install fonttools brotli
# fonttools ttLib.woff2 compress polysans-neutral.otf
```

Subset to Latin first if the family ships a large character set, otherwise the
files will be considerably heavier than the Geist ones they replace.

## After adding the files

Re-run `node scripts/gen-font-fallbacks.mjs` so the metric-matched fallback
faces are recomputed against PolySans rather than Geist. Without that step the
fallback still matches Geist's metrics and the swap will shift text slightly.
