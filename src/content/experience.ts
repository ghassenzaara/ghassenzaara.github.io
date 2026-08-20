import { images, type ImageSource } from '../lib/images'
import { todo } from './types'

export type Photo = { image: ImageSource; alt: string; caption: string }

export type Role = {
  id: string
  title: string
  meta: string
  body: readonly string[]
  /**
   * `null` means the empty-frame treatment: a --surface block with a hairline
   * where the photo would sit. The empty frame in the photo's position is the
   * design, not a gap to fill with a logo or stock image.
   */
  photo: Photo | null
  emptyLabel?: string
}

export const experience: readonly Role[] = [
  {
    id: 'ro',
    title: 'Tutor, Rechnerorganisation',
    meta: 'TU Darmstadt, Fachbereich Informatik · Summer semester 2026',
    body: [
      'Weekly exercise sessions with 20+ students, in my fourth language, on RISC-V assembly and calling conventions, single-cycle and multicycle datapaths, ALU control decoding, pipeline hazards and flush penalties, cache addressing. I wrote the slide decks, ran the Testat scheduling and answered the course forum.',
    ],
    photo: {
      image: images.roTutor,
      alt: 'A blackboard covered in RISC-V cache addressing diagrams, with the tutor beside it.',
      caption: 'Cache addressing, Übung 12',
    },
  },
  {
    id: 'aud',
    title: 'Tutor, Algorithmen und Datenstrukturen',
    meta: 'TU Darmstadt, Fachbereich Informatik · Summer semester 2026',
    body: [
      'Teaching 30+ students in my fourth language, marking 20+ assignments a week, and writing new coding exercises to push them past surface-level understanding.',
      'Sorting and divide-and-conquer, radix sort, abstract data types, binary search trees, AVL and red-black trees, complexity and reductions. I redesigned one practical assignment on tree operations, black-height computation, join, AVL conversion and sorted merge, into a single unified 12-point exercise.',
    ],
    photo: {
      image: images.audBlackboard,
      alt: 'A lecture hall blackboard filled with NP-completeness reduction proofs.',
      caption: 'NP-completeness, reduction proofs',
    },
  },
  {
    id: 'fraunhofer',
    title: 'Research Assistant, Fraunhofer SIT / ATHENE',
    meta: 'Starting October 2026',
    body: [
      'Studentische Hilfskraft in NLP research: authorship analysis, attribution and verification, style change detection, AI-generated text detection and LLM attribution. Classical feature engineering alongside embeddings, one-class and binary classification, ensemble methods.',
    ],
    photo: null,
    emptyLabel: 'Coming soon',
  },
]

/** Stated once, on its own. Two courses at once is the part that carries weight. */
export const experienceNote = 'Both modules ran in the same semester.'

export type Award = {
  id: string
  place: string
  event: string
  meta: string
  body: string
  photo: Photo
}

/**
 * Deliberately not a second description of the products. The subject here is
 * the result and the room, not the build.
 */
export const hackathons: readonly Award[] = [
  {
    id: 'futury',
    place: '1st place',
    event: 'Futury Build Days, Viega Challenge',
    meta: 'Frankfurt · 2026',
    body: 'Won the Viega challenge with Viegtor. Presented on crutches, broken ankle a week earlier.',
    photo: {
      image: images.viegtorSlide,
      alt: 'The winning team presenting Viegtor at Futury Build Days, one presenter on crutches.',
      caption: 'Futury Build Days, Frankfurt',
    },
  },
  {
    id: 'tumai',
    place: '2nd place',
    event: 'TUM.ai Makeathon, Spherecast Challenge',
    meta: 'Munich · 2026 · 40+ teams, 500+ participants',
    body: 'Second place on the Spherecast challenge with Agnes: semantic supplier matching with a RAG pipeline and Pareto-front estimation across competing sourcing criteria. My first hackathon.',
    photo: {
      image: images.tumaiPresenting,
      alt: 'Pitching Agnes to the jury at the TUM.ai Makeathon in Munich.',
      caption: 'Pitching Agnes to the jury',
    },
  },
]

export const community = {
  title: 'Ambassador, HackathonHub Europe',
  meta: 'Frankfurt',
  body: [
    'Regional ambassador for Frankfurt. HackathonHub connects student builders across Europe to hackathons and the teams running them.',
  ],
  roleTodo: todo(
    'HackathonHub: two or three sentences on what you actually do. Meetups? Recruiting teams? Point of contact for organisers? Right now this is a title with nothing behind it.',
  ),
  scopeTodo: todo(
    'HackathonHub: confirm scope (Frankfurt only, or Frankfurt and Darmstadt) and the start date',
  ),
  emptyLabel: 'Photo pending',
} as const
