import { todo, type Maybe } from './types'
import { images, type ImageSource } from '../lib/images'

export type ProjectLink = { label: string; href: string }

/** One slide in a project's carousel. */
export type Slide =
  | { kind: 'image'; image: ImageSource; alt: string }
  /** A slot with no picture yet. `intent` names the shot that belongs here. */
  | { kind: 'pending'; intent: string }

export type Project = {
  /** Stable id. Used as the React key — never the array index. */
  id: string
  title: string
  /** Renders under the title as "Interview project · 2026". */
  meta: string
  hook: string
  body: readonly string[]
  tags: Maybe<readonly string[]>
  links: Maybe<readonly ProjectLink[]>
  /** Two or three per project, driven by the reader through the dots. */
  slides: readonly Slide[]
  /** Set where the copy itself is incomplete, not just a field. */
  copyTodo?: ReturnType<typeof todo>
}

export const projects: readonly Project[] = [
  {
    id: 'brueckenpilot',
    title: 'BrückenPilot',
    meta: 'Interview project · 2026',
    hook: 'German bridge inspection PDFs, turned into decisions.',
    body: [
      'Every German bridge inspection produces a 30-page PDF under DIN 1076. The data exists; nobody turns it into decisions.',
      'BrückenPilot reads the PDF and returns a map. Condition scores, ranked damage with the inspector’s own photos, and the inspection trend projected forward. Extraction runs against Pydantic schemas at temperature 0.',
    ],
    tags: [
      'FastAPI',
      'React 19',
      'TypeScript',
      'Supabase',
      'Gemini 2.0 Flash',
      'MapLibre GL',
      'PyMuPDF',
    ],
    links: todo('BrückenPilot repo or live URL'),
    slides: [
      {
        kind: 'image',
        image: images.bp1,
        alt: 'The BrückenPilot map view with a bridge selected and its condition sidebar open.',
      },
      {
        kind: 'image',
        image: images.bp2,
        alt: 'Ranked damage cards in BrückenPilot, each with the inspector’s own photograph.',
      },
      {
        kind: 'image',
        image: images.bp3,
        alt: 'The BrückenPilot inspection history chart with a regression projected forward.',
      },
    ],
  },
  {
    id: 'ariva',
    title: 'ARIVA',
    meta: 'Black Forest Hackathon · 2026 · team project',
    hook: 'On-premise document processing for public administration.',
    body: [
      'Legal aid documents for Regierungspräsidium Freiburg, against a real requirements spec. No data could leave the premises under DSGVO, which ruled out every commercial API.',
      'So the whole pipeline runs local. A vision-language model reads scanned PDFs and fills the legacy case forms. Pitched afterwards to Regierungspräsidium Offenburg as paid work.',
    ],
    tags: ['Qwen3-VL', 'Ollama', 'FastAPI', 'Spring Boot', 'React 19', 'OpenCV', 'PostgreSQL'],
    links: todo('ARIVA repo or writeup URL'),
    slides: [
      {
        kind: 'image',
        image: images.arivaPresenting,
        alt: 'The ARIVA team presenting to a seated audience at the Black Forest Hackathon.',
      },
      { kind: 'pending', intent: 'One screenshot, or an architecture diagram of the pipeline.' },
    ],
  },
  {
    id: 'vc-ai-copilot',
    title: 'VC AI Copilot',
    meta: 'TUM.ai × Yellow Hackathon · 2026',
    hook: 'One question, answered across four disconnected systems.',
    body: [
      'A VC firm’s knowledge sits in four places at once, CRM, meeting notes, Slack, email, and no system can answer what the current state of a company is, or what’s missing.',
      'Affinity, Granola, Slack and Gmail collapse into one company object with source attribution and explicit gap detection. Every LLM call runs inside Supabase Edge Functions. No backend service.',
    ],
    tags: ['Supabase', 'pgvector', 'Edge Functions', 'RAG', 'Affinity API', 'Gmail API'],
    links: todo('VC AI Copilot repo or demo URL'),
    slides: [
      {
        kind: 'pending',
        intent:
          'Architecture diagram as SVG: four sources collapsing into the unified company object. Second choice, the market map view.',
      },
    ],
  },
  {
    id: 'viegtor',
    title: 'Viegtor',
    meta: 'Futury Build Days · 2026 · 1st place',
    hook: 'Strategic AI for patent and regulatory analysis.',
    body: [
      'Patents, regulations, tenders and competitor moves arrive as separate streams and get read by separate people. Viegtor distils all of it into one decision: build, invest, or ignore.',
    ],
    copyTodo: todo(
      'Viegtor: two or three sentences on what you actually built. Where did the data come from, what did the analysis do? Same length as the others.',
    ),
    tags: todo('Viegtor tech stack'),
    links: todo('Viegtor repo or writeup URL'),
    slides: [
      {
        kind: 'image',
        image: images.viegtorSlide,
        alt: 'The Viegtor team presenting at Futury Build Days, the product projected on the wall behind them, one presenter on crutches.',
      },
      {
        kind: 'image',
        image: images.viegtorTeam,
        alt: 'The Viegtor team holding their first-place certificates at Futury Build Days.',
      },
      {
        kind: 'pending',
        intent: 'A product screenshot or architecture diagram. This project has no product visual.',
      },
    ],
  },
  {
    id: 'san-fo',
    title: 'San Fo 薪火',
    meta: 'EuroTech × HKTE Hackathon, Munich · 2026 · team project',
    hook: 'Crowdfunding the Hong Kong shops that are quietly disappearing.',
    body: [
      'Hong Kong loses another family business every week. An ageing owner, no successor, shutters down for good. Banks will not lend without collateral and there is no legal route to raise equity from the public.',
      'San Fo lets a neighbourhood fund the shop it does not want to lose: revenue-share agreements for individuals, tokenized SPVs for professional investors. KYC and KYB on both ends of every deal.',
    ],
    tags: ['Swift', 'Rust', 'JavaScript', 'Tokenized SPV', 'KYC / KYB'],
    links: [
      { label: 'san-fo.com', href: 'https://san-fo.com' },
      { label: 'github.com/San-Fo', href: 'https://github.com/San-Fo' },
    ],
    slides: [
      {
        kind: 'image',
        image: images.sanfoDesk,
        alt: 'The San Fo team’s desk during the EuroTech hackathon in Munich, laptops open mid-build.',
      },
      {
        kind: 'image',
        image: images.sanfoApp,
        alt: 'The San Fo app: shop discovery alongside the revenue-share flow.',
      },
    ],
  },
]
