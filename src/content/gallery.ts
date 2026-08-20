import { images } from '../lib/images'
import { todo, type Maybe } from './types'
import type { ImageSource } from '../lib/images'

/**
 * The Out of Scope intro. The user's to write, not mine to generate — this is
 * the most personal writing on the site and it will read as generated if it is.
 *
 * Raw material, for when they get to it: coffee, seriously enough to own the
 * grinder and the scale. The sea, which is where they are from. Trees and
 * hiking. Photography, mostly architecture and coastlines, rarely people.
 * Travel.
 */
export const outOfScopeIntro = todo(
  'write the Out of Scope intro yourself, three or four sentences, first person, dry',
) as Maybe<readonly string[]>

/** One photograph. `id` is what Flip matches on across the open and shut states. */
export type Photo = {
  id: string
  image: ImageSource
  caption: string
  alt: string
}

/**
 * A pile of prints with a name on it.
 *
 * `note` is one line, and it is the only place on the site where the writing is
 * allowed to be about the photographer rather than the work.
 */
export type Album = {
  id: string
  name: string
  note: string
  photos: readonly Photo[]
}

/**
 * Three albums rather than one strip of ten.
 *
 * The grouping is by what the photograph is of, not where it was taken, which
 * is the same rule the captions follow. The first photo in each album is its
 * cover: the one that has to work at the size of a print on a table.
 *
 * Portrait and landscape alternate inside each album on purpose. The frames
 * keep their natural widths at a shared height, and that varied rhythm is what
 * makes an opened album read as a considered gallery rather than a carousel.
 *
 * Captions are photographic rather than geographic: what the light or the
 * exposure was doing, not where it was. Short and dry, no wistfulness.
 */
export const albums: readonly Album[] = [
  {
    id: 'sea',
    name: 'The sea',
    note: 'Where I am from, and where I keep pointing the camera.',
    photos: [
      {
        id: 'gal01',
        image: images.gal01,
        caption: 'Framed by the arch',
        alt: 'A whitewashed archway framing the sea at Sidi Bou Said.',
      },
      {
        id: 'gal05',
        image: images.gal05,
        caption: 'Exposed for the outside',
        alt: 'The mouth of a beach cave opening onto bright water.',
      },
      {
        id: 'gal07',
        image: images.gal07,
        caption: 'Dusk, wide open',
        alt: 'A headland silhouetted against the sea at dusk.',
      },
      {
        id: 'gal08',
        image: images.gal08,
        caption: 'Straight down',
        alt: 'A small boat on open water, seen from above.',
      },
    ],
  },
  {
    id: 'streets',
    name: 'Streets',
    note: 'Shot walking. Nothing here was set up or asked for.',
    photos: [
      {
        id: 'gal04',
        image: images.gal04,
        caption: 'Cagliari, in the shade',
        alt: 'A narrow Cagliari street between pastel buildings.',
      },
      {
        id: 'gal10',
        image: images.gal10,
        caption: 'Evening, pushed',
        alt: 'A figure in a cap on a street in Sardinia in the evening.',
      },
      {
        id: 'gal03',
        image: images.gal03,
        caption: 'Backlit, shot walking',
        alt: 'A tree-lined street, a figure walking away under the canopy.',
      },
    ],
  },
  {
    id: 'still',
    name: 'Things that hold still',
    note: 'Concrete, towers, and the one setup I fuss over every morning.',
    photos: [
      {
        id: 'gal09',
        image: images.gal09,
        caption: 'Concrete, raking light',
        alt: 'A brutalist concrete facade raking with afternoon light.',
      },
      {
        id: 'gal06',
        image: images.gal06,
        caption: 'Overcast, flat light',
        alt: 'The towers of Aschaffenburg castle against an overcast sky.',
      },
      {
        id: 'gal02',
        image: images.gal02,
        caption: 'Overhead, window light',
        alt: 'A pour-over coffee setup from above, grinder and scale in frame.',
      },
    ],
  },
] as const

/** Every photograph, in album order. */
export const gallery: readonly Photo[] = albums.flatMap((album) => album.photos)
