export type AchievementCategory = 'Award' | 'Milestone' | 'Partnership' | 'Hosted'

export type Achievement = {
  year: string
  title: string
  description: string
  category: AchievementCategory
  image?: string
  imageAlt?: string
}

export const achievementStats = [
  { value: '2021', label: 'Founded — the first AI-focused student community at Chitkara' },
  { value: '15+', label: 'Industry collaborators, from Microsoft to L&T' },
  { value: '₹40K', label: 'Prize pool at the Finvasia Innovation Hackathon' },
  { value: '50+', label: 'Active members across 6 squads' },
] as const

export const achievements: Achievement[] = [
  {
    year: '2026',
    title: 'Finvasia Innovation Hackathon',
    description:
      'Organised a fintech hackathon with Finvasia Group — a ₹40,000 prize pool, an online round and an offline final at Henry Ford Hall.',
    category: 'Hosted',
    image: '/events/finvasia.jpeg',
    imageAlt: 'Finvasia Innovation Hackathon 2026 poster',
  },
  {
    year: '2025',
    title: 'HackIndia 2025 comes to Chitkara',
    description:
      'Brought HackIndia to campus with SingularityNET — a high-impact platform for innovation, networking and hands-on problem solving.',
    category: 'Hosted',
    image: '/gallery/hackindia-2025-winners.webp',
    imageAlt: 'HackIndia 2025 winners on stage with their certificates and prize cheque',
  },
  {
    year: '2025',
    title: 'Real problem statements from L&T',
    description: 'Collaborated with L&T so members could work on industry problem statements instead of toy datasets.',
    category: 'Partnership',
  },
  {
    year: '2025',
    title: 'Computer Vision workshop with Ikigai Labs',
    description: 'Partnered with Ikigai Labs to run a hands-on computer-vision workshop for members.',
    category: 'Partnership',
  },
  {
    year: '2024',
    title: 'AI in Education with Microsoft & Acer',
    description: 'Hosted "AI for Emerging Trends & Technologies in Education" with Microsoft and Acer on 13 March 2024.',
    category: 'Partnership',
    image: '/gallery/ai-in-education-workshop-2024.webp',
    imageAlt: 'Students gathered around the standee for the AI in Education workshop',
  },
  {
    year: '2023',
    title: 'Best CSE League — CSE Excellence Awards',
    description: 'Recognised as the Best CSE League at the CSE Excellence Awards 2023.',
    category: 'Award',
  },
  {
    year: '2023',
    title: 'AI-Create 2.0',
    description: 'Our flagship generative-AI event put creative prompting on stage on 18 October 2023.',
    category: 'Milestone',
    image: '/gallery/ai-create-2.webp',
    imageAlt: 'Faculty and guests with the AI-Create 2.0 standee',
  },
  {
    year: '2021',
    title: 'Evolve AI is founded',
    description: "Started inside the Department of CSE (AI) as the university's first AI-focused student community.",
    category: 'Milestone',
  },
]
