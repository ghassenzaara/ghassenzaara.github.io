import { todo } from './types'

export const profile = {
  name: 'Ghassen Zaara',
  eyebrow: 'Darmstadt, DE · CS @ TU Darmstadt',
  /**
   * The name and the sentence are separate because they are set at different
   * sizes. All four lines at display size overflowed a single screen, and the
   * name is meant to be the biggest thing on the page anyway.
   *
   * Both are authored as lines rather than one string: the per-line reveal
   * needs deliberate breaks, and `text-wrap: balance` would re-flow exactly
   * the lines this split fixes. Checked at 1440 / 1024 / 640 / 375.
   */
  nameLines: ['Ghassen Zaara'],
  taglineLines: ['A man who doesn’t sleep until', 'he solves the problem in question'],
  subline:
    'Computer science student at TU Darmstadt. I like problems where the constraint is real. I love participating in hackathons and I am interested in every field computer science has to offer. Focused on software engineering, trying to improve my ML and cybersecurity skills.',
  email: 'zaaraghassen@gmail.com',
  github: 'https://github.com/ghassenzaara',
  linkedin: 'https://www.linkedin.com/in/ghassen-zaara',
  /**
   * Two files, two languages, and real paths rather than placeholders: the
   * buttons in the toolkit are wired to these already. Drop the two PDFs into
   * public/ under exactly these names and they work. Nothing else changes.
   *
   * `lang` is not decoration. Without it a screen reader reads the German
   * label with an English voice, which is unintelligible.
   */
  cv: [
    {
      lang: 'en',
      href: '/cv-ghassen-zaara-en.pdf',
      label: 'Download Resume',
      note: '(in English, PDF)',
    },
    {
      lang: 'de',
      href: '/lebenslauf-ghassen-zaara-de.pdf',
      label: 'Lebenslauf herunterladen',
      note: '(auf Deutsch, PDF)',
    },
  ],
} as const

export const contact = {
  heading: 'Let’s talk.',
  line: 'Open to working student roles, thesis collaborations, and hackathon teams.',
  lineTodo: todo('confirm this is what you actually want to receive'),
  footer: '© 2026 Ghassen Zaara, built in Darmstadt',
} as const

/**
 * The palette is not arbitrary and saying so is the point. Four pairings, no
 * heading above them, no explanation beyond them.
 */
export const colophon = [
  { token: '--accent', name: 'Baltic Blue', note: 'the sea' },
  { token: '--surface-inverse', name: 'Dark Coffee', note: 'I’m a coffee nerd' },
  { token: '--muted', name: 'Olive Leaf', note: 'trees' },
  { token: '--fg', name: 'Pitch Black', note: 'the default' },
] as const
