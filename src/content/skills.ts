/**
 * Six named groups. The count is fixed: if something does not fit one of the
 * six, it does not go on the site.
 *
 * The failure mode this replaces is a tag cloud — thirty pills in a grey blob
 * that tells a recruiter nothing. So a group renders as a quiet label over one
 * flowing line of names, never as pills, badges or chips, and never with
 * proficiency bars, star ratings, percentages or year counts.
 *
 * Order is deliberate at both levels. Languages first because it is the
 * fastest signal, then what is built with them, then how it is tested and
 * shipped, then where it runs, then the data and model work, and spoken
 * languages last because it is the one group a reader can skip. Within a group
 * the order is by strength, not alphabet — Java before Bash. Nothing here gets
 * sorted at build time.
 */
export type SkillGroup = { title: string; items: readonly string[] }

export const skills: readonly SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'C', 'TypeScript', 'JavaScript', 'SQL (PostgreSQL)', 'HTML/CSS', 'Bash'],
  },
  {
    title: 'Frameworks',
    items: ['Spring Boot', 'React', 'Node.js', 'FastAPI', 'Express', 'Tailwind CSS', 'Pydantic'],
  },
  {
    title: 'Testing & CI/CD',
    items: ['JUnit', 'Vitest', 'Playwright', 'pytest', 'Git', 'GitHub Actions', 'Jenkins', 'Maven'],
  },
  {
    title: 'Cloud & tools',
    items: [
      'Docker',
      'Kubernetes',
      'Google Cloud Platform',
      'AWS',
      'Linux',
      'PostgreSQL',
      'Qdrant',
      'REST APIs',
    ],
  },
  {
    title: 'Data & AI',
    items: [
      'pandas',
      'NumPy',
      'Matplotlib',
      'OpenCV',
      'RAG pipelines',
      'vector search',
      'embeddings',
      'LLM APIs',
    ],
  },
  {
    title: 'Spoken',
    items: ['Arabic (native)', 'English, French, German (fluent)'],
  },
]
