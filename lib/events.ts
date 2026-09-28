export type EventKind = 'Hackathon' | 'Workshop' | 'Expert Talk' | 'Competition' | 'Announcement' | 'Campaign'

export type ClubEvent = {
  slug: string
  title: string
  kind: EventKind
  date?: string
  poster: string
  posterRatio: 'portrait' | 'tall'
  audience?: string
  partner?: string
  venue?: string
  prize?: string
  description: string
  live?: boolean
  registerUrl?: string
}

export const events: ClubEvent[] = [
  {
    slug: 'finvasia-innovation-hackathon',
    title: 'Finvasia Innovation Hackathon',
    kind: 'Hackathon',
    date: '2026-04-21',
    poster: '/events/finvasia.jpeg',
    posterRatio: 'portrait',
    partner: 'Finvasia Group',
    venue: 'Henry Ford Hall, Martin Luther Block',
    prize: '₹40,000 prize pool',
    audience: 'CSE (Fintech), CSE (AI&ML), CSE (AI&FT)',
    description:
      'Organised by Evolve AI with Finvasia Group — step into real-world fintech innovation. Move beyond theory and build impactful financial technology solutions while gaining hands-on experience and practical insights. Work in teams, collaborate with like-minded innovators and challenge your problem-solving skills in a dynamic, competitive environment.',
  },
  {
    slug: 'hiring-2025-26',
    title: 'Evolve AI Hiring 2025–26',
    kind: 'Announcement',
    date: '2026-03-10',
    poster: '/events/hiring.jpeg',
    posterRatio: 'portrait',
    audience: '1st-year CSE (AI&ML) & CSE (AI&FT)',
    description:
      'Hiring for the 2025–26 session. Work on practical AI projects and emerging tech initiatives, gain experience through hackathons, workshops and tech challenges, and develop teamwork, leadership and communication skills. Shortlisting was based on the hiring form.',
  },
  {
    slug: 'ai-and-cyber-physical-systems',
    title: 'Research & Innovation: At the Convergence of AI and Cyber-Physical Systems',
    kind: 'Expert Talk',
    date: '2026-02-13',
    poster: '/events/research.jpeg',
    posterRatio: 'portrait',
    partner: 'Dr. Shantanu Pal, Deakin University',
    description:
      'An insightful session by Dr. Shantanu Pal, Senior Lecturer at Deakin University, Australia, on how AI, IoT and blockchain are transforming cyber-physical systems to build intelligent, secure and interconnected real-world solutions — covering emerging research trends, practical applications and future opportunities in smart systems.',
  },
  {
    slug: 'intellex-2',
    title: 'Intellex 2.0: Where Critical Thinking Thrives',
    kind: 'Competition',
    date: '2025-09-18',
    poster: '/events/intellex.jpeg',
    posterRatio: 'tall',
    audience: '1st-year students',
    description:
      'The ultimate offline test of wit and strategy. Teams faced a series of mind-bending challenges in a dynamic, high-stakes environment — more than a competition, a platform for innovation and collaboration.',
  },
  {
    slug: 'pixelflow',
    title: 'PixelFlow: From Design Thinking to Prototype in Figma',
    kind: 'Workshop',
    date: '2025-09-16',
    poster: '/events/pixelflow.jpeg',
    posterRatio: 'portrait',
    audience: '1st-year students',
    description:
      'A comprehensive, hands-on workshop through the entire design workflow — industry-standard techniques and practical experience, taking initial concepts all the way to a functional, interactive prototype in Figma.',
  },
  {
    slug: 'agentic-sprint',
    title: 'Agentic Sprint',
    kind: 'Hackathon',
    poster: '/events/agentic.jpeg',
    posterRatio: 'portrait',
    description: 'From prototype to future tech — a build sprint on autonomous AI agents.',
  },
  {
    slug: 'write-your-own-story',
    title: 'Write Your Own Story',
    kind: 'Campaign',
    poster: '/events/ai-story.jpeg',
    posterRatio: 'portrait',
    description: 'A campaign inviting students to start building their own story with AI at Evolve AI.',
  },
]

export const liveEvents = events.filter((e) => e.live)
export const pastEvents = events.filter((e) => !e.live)
export const featuredPast = pastEvents.filter((e) => e.date).slice(0, 5)

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug)
}

export function formatDate(iso: string | undefined, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return 'From the archive'
  return new Intl.DateTimeFormat('en-IN', { ...opts, timeZone: 'Asia/Kolkata' }).format(new Date(`${iso}T12:00:00+05:30`))
}
