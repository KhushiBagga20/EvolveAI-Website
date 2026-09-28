export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/evolveai_cuiet/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/evolveai-cuiet/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@evolveai_cuiet' },
] as const

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'What we do', href: '/#work' },
  { label: 'Events', href: '/events' },
  { label: 'Story', href: '/#story' },
  { label: 'FAQ', href: '/#faq' },
] as const

export const stats = [
  { value: '2021', label: 'Founded inside CSE (AI), Chitkara University' },
  { value: '1st', label: 'AI-focused student community on campus' },
  { value: '15+', label: 'Industry collaborators, from Microsoft to L&T' },
  { value: '6', label: 'Formats to learn: hacks, workshops, talks & more' },
] as const

export const activities = [
  {
    id: 'events',
    title: 'Tech events',
    description:
      'Vibrant tech gatherings where you explore cutting-edge innovation, meet like-minded peers and spark fresh ideas.',
    tag: 'meetups',
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    description:
      'High-energy coding sprints where you build prototypes, test your skills and bring your boldest ideas to life.',
    tag: '24h+ sprints',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    description:
      'Hands-on sessions to master the tools, frameworks and concepts you can use right away.',
    tag: 'hands-on',
  },
  {
    id: 'talks',
    title: 'Expert talks',
    description:
      'Industry pros share insider knowledge, career advice and exposure to emerging trends.',
    tag: 'industry',
  },
  {
    id: 'projects',
    title: 'Practical projects',
    description: 'Real-world challenges that turn theory into tangible, shippable results.',
    tag: 'ship it',
  },
  {
    id: 'learning',
    title: 'Interactive learning',
    description:
      'A collaborative space where discussions are open and growth happens naturally.',
    tag: 'community',
  },
] as const

export const timeline = [
  {
    year: '2021',
    title: 'It begins',
    text: "Evolve AI starts inside the Department of CSE (AI) — the university's first AI-focused community.",
  },
  {
    year: '2023',
    title: 'Recognised',
    text: 'Best CSE League at the CSE Excellence Awards. AI-Create 2.0 puts generative AI on stage on 18 October.',
  },
  {
    year: '2024',
    title: 'Industry joins in',
    text: 'AI for Emerging Trends & Technologies in Education, with Microsoft and Acer, on 13 March.',
  },
  {
    year: '2025',
    title: 'HackIndia',
    text: 'HackIndia 2025 comes to Chitkara with SingularityNET — a high-impact platform for innovation.',
  },
  {
    year: 'Now',
    title: 'Still evolving',
    text: 'Workshops with Ikigai Labs, problem statements from L&T, and a community that keeps growing.',
  },
] as const

export const partners = [
  'Microsoft',
  'SAP',
  'Acer',
  'NEC',
  'Sopra Steria',
  'Ingram Micro',
  'emids',
  'L&T',
  'CoRover',
  'Ikigai Labs',
  'Adaptivent',
  'Sears',
  'Finvasia',
  'HackIndia',
  'SingularityNET',
] as const

export const testimonials = [
  {
    quote:
      'Great session and good experience. The questions asked by the judges were good and helped clarify the idea of each team.',
    name: 'Sanch',
    role: 'Hackathon participant',
  },
  {
    quote:
      'The speakers had a vast knowledge of the industry and shared valuable insights. An excellent way to interact with industry experts and understand our role in the industry.',
    name: 'Himanish Kaushal',
    role: 'Expert talk attendee',
  },
  {
    quote:
      'Information given was excellent and useful. Sir was explaining in full detail and was solving our doubts.',
    name: 'Navya Jain',
    role: 'Workshop attendee',
  },
  {
    quote:
      'The insights provided related to problems faced by businesses, and the way of presenting and interacting with the students, stood out.',
    name: 'Bhuvan Goyal',
    role: 'Expert talk attendee',
  },
] as const

export const gallery = [
  { src: '/gallery/hackindia-2025-winners.webp', title: 'HackIndia 2025', meta: 'Hackathon · with SingularityNET', alt: 'HackIndia 2025 winners on stage with their certificates and prize cheque' },
  { src: '/gallery/ai-create-2.webp', title: 'AI-Create 2.0', meta: 'Flagship · 18 Oct 2023', alt: 'Faculty and guests with the AI-Create 2.0 standee outside the university building' },
  { src: '/gallery/genesis-gala-performance.webp', title: 'Genesis Gala', meta: 'Freshers & talent hunt', alt: 'A student band performing under stage lights at Genesis Gala' },
  { src: '/gallery/ai-in-education-workshop-2024.webp', title: 'AI in Education', meta: 'Workshop · with Microsoft & Acer', alt: 'Students gathered around the standee for the AI in Education workshop' },
  { src: '/gallery/judging-round.webp', title: 'Judging round', meta: 'Competition', alt: 'A judge listening to a student team at a desk marked Team 2' },
  { src: '/gallery/expert-session.webp', title: 'Expert session', meta: 'Talk', alt: 'Students listening to a guest speaker in a seminar room' },
  { src: '/gallery/qa-round.webp', title: 'Q&A round', meta: 'Competition', alt: 'A student asking a question into a microphone in an auditorium' },
  { src: '/gallery/project-showcase-drone.webp', title: 'Project showcase', meta: 'Projects', alt: 'Guests examining a student-built drone on display' },
] as const

export const faqs = [
  {
    q: 'What is Evolve AI currently up to?',
    a: 'Collaborating with reputable companies and professionals to share real-world perspectives, mentoring AI enthusiasts at their own pace, and running workshops, talks and projects focused on practical, applicable skills.',
  },
  {
    q: 'Who can become a member?',
    a: 'Students whose academic focus and passion lie in Artificial Intelligence. Whether you are into pioneering research or building AI/ML solutions with practical impact, you will find a collaborative community committed to learning and growth.',
  },
  {
    q: 'How do I register for an event?',
    a: 'Head to the Events page, pick an event and hit Register. Hackathons support team registrations; workshops and talks are individual. You will get a confirmation once the organising team approves your entry.',
  },
  {
    q: 'What has Evolve AI achieved so far?',
    a: "Founded the university's first AI-focused community, curated the AI-Create flagship series, partnered with Ikigai Labs for a Computer Vision workshop, collaborated with L&T on real problem statements, and hosted HackIndia at Chitkara.",
  },
  {
    q: 'Can members get guidance on their projects?',
    a: "Absolutely. You lead the build — our team and community offer guidance, share knowledge and connect you with the right people and resources to bring your ideas to life.",
  },
] as const

export type EventType = 'Hackathon' | 'Workshop' | 'Expert Talk' | 'Tech Event'
export type EventStatus = 'open' | 'soon' | 'closed' | 'past'

export type ClubEvent = {
  slug: string
  title: string
  type: EventType
  status: EventStatus
  date: string
  endDate?: string
  time: string
  venue: string
  summary: string
  description: string
  image: string
  seats?: number
  registered?: number
  teamSize?: string
  prize?: string
  partner?: string
  highlights: string[]
  agenda?: { time: string; item: string }[]
}

export const events: ClubEvent[] = [
  {
    slug: 'evolve-hacks-3',
    title: 'Evolve Hacks 3.0',
    type: 'Hackathon',
    status: 'open',
    date: '2026-10-24T09:00:00+05:30',
    endDate: '2026-10-25T18:00:00+05:30',
    time: '36 hours · 09:00 IST',
    venue: 'Turing Block, Chitkara University',
    summary: 'A 36-hour build sprint on agents, multimodal AI and real campus problems.',
    description:
      'Form a team, pick a track and ship something real in 36 hours. Mentors from industry, judges who ask the hard questions, and problem statements that matter — from campus operations to healthcare and climate.',
    image: '/gallery/hackindia-2025-group.webp',
    seats: 300,
    registered: 212,
    teamSize: '2–4 members',
    prize: 'Prize pool + internships',
    highlights: ['4 tracks: Agents, Vision, Health, Climate', 'Industry mentors on-site', 'Swag, food and caffeine included'],
    agenda: [
      { time: 'Day 1 · 09:00', item: 'Check-in & opening keynote' },
      { time: 'Day 1 · 11:00', item: 'Hacking begins' },
      { time: 'Day 1 · 20:00', item: 'Mentor round 1' },
      { time: 'Day 2 · 09:00', item: 'Mentor round 2' },
      { time: 'Day 2 · 15:00', item: 'Final pitches & judging' },
      { time: 'Day 2 · 17:30', item: 'Awards & closing' },
    ],
  },
  {
    slug: 'build-with-llm-agents',
    title: 'Build with LLM Agents',
    type: 'Workshop',
    status: 'open',
    date: '2026-10-10T14:00:00+05:30',
    time: '14:00 – 17:00 IST',
    venue: 'Seminar Hall 2, Chitkara University',
    summary: 'Hands-on: tool calling, memory and multi-step agents — from zero to deployed.',
    description:
      'Bring your laptop. We go from a single prompt to a tool-using agent with memory, then deploy it. No prior experience with agents required — just basic Python or JavaScript.',
    image: '/gallery/expert-session.webp',
    seats: 120,
    registered: 97,
    highlights: ['Laptop required', 'Starter repo provided', 'Certificate of participation'],
    agenda: [
      { time: '14:00', item: 'How agents actually work' },
      { time: '14:45', item: 'Build: your first tool-calling agent' },
      { time: '15:45', item: 'Memory, retrieval & evaluation' },
      { time: '16:30', item: 'Deploy + show and tell' },
    ],
  },
  {
    slug: 'ai-careers-expert-talk',
    title: 'AI Careers: From Campus to Industry',
    type: 'Expert Talk',
    status: 'soon',
    date: '2026-10-17T11:00:00+05:30',
    time: '11:00 – 12:30 IST',
    venue: 'Auditorium, Chitkara University',
    summary: 'Industry engineers on breaking into AI roles, portfolios and what actually gets you hired.',
    description:
      'An open conversation with engineers and researchers working in AI today. Portfolios, interviews, research vs. product roles, and a long Q&A — bring your questions.',
    image: '/gallery/qa-round.webp',
    seats: 400,
    registered: 0,
    highlights: ['Live Q&A', 'Resume clinic after the talk', 'Open to all years'],
  },
  {
    slug: 'ai-create-4',
    title: 'AI-Create 4.0',
    type: 'Tech Event',
    status: 'soon',
    date: '2026-11-14T10:00:00+05:30',
    time: '10:00 – 16:00 IST',
    venue: 'Main Campus Lawns',
    summary: 'Our flagship generative-AI showcase: creative prompting, AI art and live demos.',
    description:
      'The flagship returns. Generative AI competitions, creative prompting challenges, an AI art wall and live demos from student builders.',
    image: '/gallery/ai-create-2.webp',
    highlights: ['Prompting battle', 'AI art exhibition', 'Student demo stalls'],
  },
  {
    slug: 'hackindia-2025',
    title: 'HackIndia 2025',
    type: 'Hackathon',
    status: 'past',
    date: '2025-03-15T09:00:00+05:30',
    time: 'Two days',
    venue: 'Chitkara University',
    partner: 'SingularityNET',
    summary: 'A high-impact platform for innovation, networking and hands-on problem solving.',
    description:
      'HackIndia came to Chitkara with SingularityNET — teams built and pitched solutions to real problem statements in front of industry judges.',
    image: '/gallery/hackindia-2025-winners.webp',
    highlights: ['With SingularityNET', 'Industry judging panel'],
  },
  {
    slug: 'ai-in-education-2024',
    title: 'AI for Emerging Trends in Education',
    type: 'Workshop',
    status: 'past',
    date: '2024-03-13T10:00:00+05:30',
    time: 'Full day',
    venue: 'Chitkara University',
    partner: 'Microsoft & Acer',
    summary: 'Exploring how AI is reshaping learning, with Microsoft and Acer.',
    description: 'A workshop on AI in education, bringing industry and academia together on campus.',
    image: '/gallery/ai-in-education-workshop-2024.webp',
    highlights: ['With Microsoft & Acer'],
  },
  {
    slug: 'ai-create-2',
    title: 'AI-Create 2.0',
    type: 'Tech Event',
    status: 'past',
    date: '2023-10-18T10:00:00+05:30',
    time: 'Full day',
    venue: 'Chitkara University',
    summary: 'Generative AI and creative prompting take the stage.',
    description: 'The second edition of our flagship event on generative AI and creative prompting.',
    image: '/gallery/ai-create-2.webp',
    highlights: ['Flagship event'],
  },
]

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug)
}

export function formatEventDate(iso: string, withYear = true) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso))
}
