/**
 * prepare-images — one-off cull, crop and master-encode.
 *
 * Reads the untracked 52 MB source set in portfolio-images/ and writes small
 * masters into src/assets/images/, which vite-imagetools then expands into
 * responsive webp srcsets at build time.
 *
 * This is the only place a crop decision lives. Intrinsic dimensions go to
 * manifest.json straight from sharp metadata — never typed by hand, because
 * hand-typed dimensions is how cumulative layout shift gets shipped.
 *
 * Run: npm run images
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'portfolio-images')
const OUT = join(root, 'src/assets/images')

/** Editorial slots. */
const SLOTS = [
  // --- Hero ---
  {
    // Sits behind the centred hero type, so it is masked back heavily in CSS.
    //
    // The only full-bleed image on the site, and the only one that earns a
    // master past 1600: it is served at sizes="100vw" and GSAP scales it a
    // further 1.16 for the drift, so a 1440px screen is already asking for
    // ~1670px of picture. The source is 5712x3213, natively 16:9.
    name: 'header-bg',
    src: 'hero.png',
    master: 2560,
  },

  // --- Project screenshots ---
  { name: 'bp-1', src: 'UI/BrückenPilot 1.png', aspect: [16, 10], master: 1600 },
  { name: 'bp-2', src: 'UI/BrückenPilot2.png', aspect: [16, 10], master: 1600 },
  { name: 'bp-3', src: 'UI/BrückenPilot3.png', aspect: [16, 10], master: 1600 },
  { name: 'sanfo-app', src: 'UI/San-Fo.png', aspect: [16, 10], master: 1600 },

  // --- Projects, photography ---
  { name: 'ariva-presenting', src: 'work/presenting-ariva-2.jpeg', aspect: [16, 10], master: 1600 },
  {
    // DO NOT CROP. The full frame is the point: the team presenting, the
    // projected product on the wall, and the crutches.
    name: 'viegtor-slide',
    src: 'work/viegtor-slide.jpeg',
    master: 1600,
  },
  { name: 'viegtor-team', src: 'work/futury-viega-1st-place.jpeg', aspect: [16, 10], master: 1600 },
  {
    name: 'sanfo-desk',
    src: 'work/sanfo-hackathon-desk.jpeg',
    // Cropped tight: the wide frame is cluttered, and a screen in the
    // background is showing a Minecraft download.
    aspect: [16, 10],
    master: 1600,
  },

  // --- Experience ---
  {
    // Full frame, uncropped. It is natively 3:4 and the whole standing figure
    // is the point: the outfit as much as the board.
    name: 'ro-tutor',
    src: 'work/ro-tutor.jpeg',
    master: 1400,
  },
  {
    // Also uncropped. Natively 4:3, and both boards have to stay in frame.
    name: 'aud-blackboard',
    src: 'work/aud-blackboard.jpeg',
    master: 1600,
  },

  // --- Hackathons ---
  {
    name: 'tumai-presenting',
    src: 'work/tumai-agnes-presenting.jpeg',
    // Salience cropping kept picking the projector screen. This window is
    // measured off the frame: him mid-explanation at the board, with both
    // jury members' heads in the foreground.
    extract: { left: 0, top: 700, width: 1200, height: 900 },
    master: 1200,
  },
]

/**
 * The Out of Scope gallery.
 *
 * These keep their native aspect ratio on purpose. The strip is a fixed height
 * with mixed widths — portraits narrow, landscapes wide — and that varied
 * rhythm is what makes it read as a gallery rather than a carousel widget.
 * Cropping them to a common ratio would remove exactly the thing that works.
 */
const GALLERY = [
  ['gal-01', 'personal/archway-sea.jpeg'],
  ['gal-02', 'personal/coffee-setup.jpeg'],
  ['gal-03', 'personal/street-trees.jpeg'],
  ['gal-04', 'personal/cagliari-street.jpeg'],
  ['gal-05', 'personal/beach-cave.jpeg'],
  ['gal-06', 'personal/aschaffenburg-towers.jpeg'],
  ['gal-07', 'personal/headland-dusk.jpeg'],
  ['gal-08', 'personal/boat-sea.jpeg'],
  ['gal-09', 'personal/brutalist-facade.jpeg'],
  ['gal-10', 'personal/street-cap.jpeg'],
]

for (const [name, src] of GALLERY) {
  SLOTS.push({ name, src, height: 1000 })
}

if (!existsSync(SRC)) {
  console.error(
    `\nportfolio-images/ not found at ${SRC}\n` +
      `It is git-ignored source material. Restore it before running this script.\n`,
  )
  process.exit(1)
}

mkdirSync(OUT, { recursive: true })

const manifest = {}

for (const slot of SLOTS) {
  const input = join(SRC, slot.src)
  if (!existsSync(input)) {
    console.error(`missing source: ${slot.src}`)
    process.exit(1)
  }

  let pipeline = sharp(input).rotate() // honour EXIF orientation
  let meta = await pipeline.metadata()

  // A measured crop window beats salience detection when the interesting part
  // of the frame is not the highest-contrast part of it.
  if (slot.extract) {
    pipeline = pipeline.extract(slot.extract)
    meta = { ...meta, width: slot.extract.width, height: slot.extract.height }
  }

  if (slot.height) {
    // Fixed height, natural width.
    const h = Math.min(slot.height, meta.height)
    pipeline = pipeline.resize({ height: h, fit: 'inside' })
  } else if (slot.aspect) {
    const [aw, ah] = slot.aspect
    const srcRatio = meta.width / meta.height
    const wantRatio = aw / ah
    const cropW = srcRatio > wantRatio ? Math.round(meta.height * wantRatio) : meta.width
    const targetW = Math.min(slot.master, cropW)
    const targetH = Math.round((targetW / aw) * ah)
    // `attention` picks the crop window by salience, which beats a centre crop
    // on architecture, coastlines and a person off to one side of the frame.
    // It is unreliable when a tall portrait is cropped to landscape, so those
    // slots name their own position instead.
    pipeline = pipeline.resize(targetW, targetH, {
      fit: 'cover',
      position: slot.position ?? sharp.strategy.attention,
    })
  } else {
    pipeline = pipeline.resize(Math.min(slot.master, meta.width), null, { fit: 'inside' })
  }

  const out = join(OUT, `${slot.name}.webp`)
  const info = await pipeline.webp({ quality: 88, effort: 6 }).toFile(out)

  manifest[slot.name] = { width: info.width, height: info.height }
  console.log(
    `${slot.name.padEnd(18)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}  ` +
      `${(info.size / 1024).toFixed(0).padStart(4)} KB   <- ${slot.src}`,
  )
}

writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nwrote ${Object.keys(manifest).length} masters + manifest.json`)
