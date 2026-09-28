export type ProjectStage = 'current' | 'future'

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  stage: ProjectStage
  domain: 'LLMs' | 'Vision' | 'Agents' | 'Data' | 'Web'
  stack: string[]
  status: string
  progress?: number
  repo?: string
}

// Sample entries: the live site lists no projects yet. Replace with the club's real projects.
export const projects: Project[] = [
  {
    slug: 'campus-copilot',
    title: 'Campus Copilot',
    tagline: 'Ask anything about Chitkara — get an answer with sources.',
    description:
      'A retrieval-augmented assistant over university handbooks, timetables and notices. Answers cite the exact document they came from.',
    stage: 'current',
    domain: 'LLMs',
    stack: ['Python', 'LangChain', 'pgvector', 'Next.js'],
    status: 'In development',
    progress: 60,
  },
  {
    slug: 'visionattend',
    title: 'VisionAttend',
    tagline: 'Face-recognition attendance that runs on a classroom webcam.',
    description:
      'An on-device computer-vision pipeline for marking attendance, built with privacy-first embeddings and no cloud upload.',
    stage: 'current',
    domain: 'Vision',
    stack: ['PyTorch', 'OpenCV', 'ONNX', 'FastAPI'],
    status: 'Prototype',
    progress: 40,
  },
  {
    slug: 'evolve-web',
    title: 'evolveai.chitkara.edu.in',
    tagline: 'The site you are on, rebuilt by the Technical team.',
    description: 'Open, fast and maintained by students — events, team, alumni and projects in one place.',
    stage: 'current',
    domain: 'Web',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'Shipping',
    progress: 85,
  },
  {
    slug: 'signbridge',
    title: 'SignBridge',
    tagline: 'Real-time Indian Sign Language to text.',
    description: 'Hand-pose estimation plus a sequence model to translate ISL gestures into text and speech.',
    stage: 'future',
    domain: 'Vision',
    stack: ['MediaPipe', 'Transformers'],
    status: 'Research',
  },
  {
    slug: 'paper-pilot',
    title: 'PaperPilot',
    tagline: 'An agent that reads papers so the Research team can build faster.',
    description: 'Multi-step agent that fetches, summarises and compares arXiv papers, then drafts experiment plans.',
    stage: 'future',
    domain: 'Agents',
    stack: ['AI SDK', 'Tool calling', 'Embeddings'],
    status: 'Planned',
  },
  {
    slug: 'gridsense',
    title: 'GridSense',
    tagline: 'Forecasting campus energy use with edge sensors.',
    description: 'Time-series models on low-cost IoT sensors to predict and reduce energy use across blocks.',
    stage: 'future',
    domain: 'Data',
    stack: ['IoT', 'Time series', 'Dashboards'],
    status: 'Planned',
  },
]
