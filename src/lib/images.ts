/**
 * Image sources.
 *
 * vite-imagetools expands each master into a responsive webp srcset at build
 * time. Requested widths never exceed the master's own width, so nothing is
 * upscaled.
 *
 * Intrinsic dimensions come from manifest.json, which prepare-images.mjs writes
 * straight from sharp metadata. Every <img> carries width and height so the
 * browser reserves the box before the bytes arrive.
 */
import manifest from '../assets/images/manifest.json'

// Wider steps than anything else on the site, because the hero is the only
// full-bleed image here: served at sizes="100vw" and overscaled 1.16 by the
// parallax, so a 1440px screen already wants ~1670px of picture.
//
// Capped at 1920 on purpose. The master stays 2560 — downscaling from it is
// sharper than encoding a 1920 master would be, and the headroom is there if
// the cap is ever raised — but 1920 is the widest variant anyone downloads.
import headerBg from '../assets/images/header-bg.webp?w=1280;1920&format=webp&as=srcset'
import bp1 from '../assets/images/bp-1.webp?w=800;1200;1600&format=webp&as=srcset'
import bp2 from '../assets/images/bp-2.webp?w=800;1200;1600&format=webp&as=srcset'
// 1435, not 1600: the replacement BrückenPilot3.png is only 1435px wide once
// cropped to 16:10, and asking for a width the master does not have is how
// you ship an upscaled screenshot. Widths follow the master, always.
import bp3 from '../assets/images/bp-3.webp?w=800;1200;1435&format=webp&as=srcset'
import sanfoApp from '../assets/images/sanfo-app.webp?w=800;1200;1600&format=webp&as=srcset'
import arivaPresenting from '../assets/images/ariva-presenting.webp?w=800;1200;1600&format=webp&as=srcset'
import viegtorSlide from '../assets/images/viegtor-slide.webp?w=800;1200;1600&format=webp&as=srcset'
import viegtorTeam from '../assets/images/viegtor-team.webp?w=800;1200;1600&format=webp&as=srcset'
import sanfoDesk from '../assets/images/sanfo-desk.webp?w=800;1200;1600&format=webp&as=srcset'

import roTutor from '../assets/images/ro-tutor.webp?w=640;960;1280&format=webp&as=srcset'
import audBlackboard from '../assets/images/aud-blackboard.webp?w=800;1200;1600&format=webp&as=srcset'
import tumaiPresenting from '../assets/images/tumai-presenting.webp?w=480;800;1200&format=webp&as=srcset'

import gal01 from '../assets/images/gal-01.webp?w=375;750&format=webp&as=srcset'
import gal02 from '../assets/images/gal-02.webp?w=375;750&format=webp&as=srcset'
import gal03 from '../assets/images/gal-03.webp?w=380;571&format=webp&as=srcset'
import gal04 from '../assets/images/gal-04.webp?w=375;750&format=webp&as=srcset'
import gal05 from '../assets/images/gal-05.webp?w=880;1764&format=webp&as=srcset'
import gal06 from '../assets/images/gal-06.webp?w=375;750&format=webp&as=srcset'
import gal07 from '../assets/images/gal-07.webp?w=890;1778&format=webp&as=srcset'
import gal08 from '../assets/images/gal-08.webp?w=375;562&format=webp&as=srcset'
import gal09 from '../assets/images/gal-09.webp?w=375;750&format=webp&as=srcset'
import gal10 from '../assets/images/gal-10.webp?w=890;1778&format=webp&as=srcset'

export type ImageSource = {
  srcset: string
  width: number
  height: number
}

type ManifestKey = keyof typeof manifest

function source(key: ManifestKey, srcset: string): ImageSource {
  const dims = manifest[key]
  return { srcset, width: dims.width, height: dims.height }
}

export const images = {
  headerBg: source('header-bg', headerBg),
  bp1: source('bp-1', bp1),
  bp2: source('bp-2', bp2),
  bp3: source('bp-3', bp3),
  sanfoApp: source('sanfo-app', sanfoApp),
  arivaPresenting: source('ariva-presenting', arivaPresenting),
  viegtorSlide: source('viegtor-slide', viegtorSlide),
  viegtorTeam: source('viegtor-team', viegtorTeam),
  sanfoDesk: source('sanfo-desk', sanfoDesk),
  roTutor: source('ro-tutor', roTutor),
  audBlackboard: source('aud-blackboard', audBlackboard),
  tumaiPresenting: source('tumai-presenting', tumaiPresenting),
  gal01: source('gal-01', gal01),
  gal02: source('gal-02', gal02),
  gal03: source('gal-03', gal03),
  gal04: source('gal-04', gal04),
  gal05: source('gal-05', gal05),
  gal06: source('gal-06', gal06),
  gal07: source('gal-07', gal07),
  gal08: source('gal-08', gal08),
  gal09: source('gal-09', gal09),
  gal10: source('gal-10', gal10),
} as const

/**
 * The `src` fallback for a srcset. Browsers that understand srcset ignore it;
 * it exists so the element is never src-less.
 */
export function fallbackSrc(srcset: string): string {
  const first = srcset.split(',')[0]
  return first ? (first.trim().split(' ')[0] ?? '') : ''
}
