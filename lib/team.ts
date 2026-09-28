export type Person = {
  name: string
  role?: string
  photo: string
}

export type Faculty = Person & {
  role: string
  bio: string[]
}

const p = (file: string) => `/team/${file}.webp`

export const faculty: Faculty[] = [
  {
    name: 'Dr. Sushil Narang',
    role: 'Dean, CSE (AI)',
    photo: p('sushil-sir'),
    bio: [
      'Our founder and advisor, Dr. Sushil Narang is the Dean of CSE (AI) at Chitkara University, with a Ph.D. in Computer Science from Punjab University and expertise in deep learning.',
      'His vision and guidance ignite innovation and foster an environment where every member thrives.',
    ],
  },
  {
    name: 'Dr. Vandana Sood',
    role: 'Lead, Evolve AI',
    photo: p('vandanamam'),
    bio: [
      'Dr. Vandana Mohindru Sood, Associate Professor at Chitkara University, holds a Ph.D. in Computer Science from Jaypee University of Information Technology.',
      'With expertise in Security, Wireless Sensor Networks and IoT, she enriches the team with dedication and diverse skills.',
    ],
  },
  {
    name: 'Dr. Kamal Deep Garg',
    role: 'Associate Lead, Evolve AI',
    photo: p('kamalsir'),
    bio: [
      'Dr. Kamal Deep Garg, Associate Professor at Chitkara University, holds a Ph.D. in Artificial Intelligence from Punjabi University.',
      'His commitment to nurturing talent drives the team forward and keeps our vision running smoothly.',
    ],
  },
]

export const leads: Person[] = [
  { name: 'Rachit Goyal', role: 'President', photo: p('rachit') },
  { name: 'Khushi', role: 'Vice President', photo: p('khushi') },
  { name: 'Bhavya Singla', role: 'General Secretary', photo: p('bhavya') },
  { name: 'Goyam Jain', role: 'Technical Head', photo: p('goyam') },
  { name: 'Poorvika', role: 'Graphics Head', photo: p('poorvika') },
  { name: 'Pranjal', role: 'Media Head', photo: p('Pranjal') },
  { name: 'Moksh Kulshrestha', role: 'Social Media Head', photo: p('moksh') },
  { name: 'Vikram Rehni', role: 'Operations Head', photo: p('vikram') },
  { name: 'Pari Ramdev', role: 'Content Head', photo: p('pari') },
  { name: 'Anvi Mittal', role: 'Documentation Head', photo: p('anvimittal') },
]

export const executives: Person[] = [
  { name: 'Arjun', role: 'Media Executive', photo: p('Arjun') },
  { name: 'Dhawal Goyal', role: 'Media Executive', photo: p('Dhawal') },
  { name: 'Mukund Bansal', role: 'Media Executive', photo: p('mukund') },
  { name: 'Parv Sood', role: 'Media Executive', photo: p('parv') },
  { name: 'Prianshu Soni', role: 'Media Executive', photo: p('prianshu') },
  { name: 'Sumedha', role: 'Media Executive', photo: p('sumedha') },
  { name: 'Anvi Puri', role: 'Content Executive', photo: p('anvipuri') },
  { name: 'Namya Gupta', role: 'Operations Executive', photo: p('namya') },
  { name: 'Pavneet Singh', role: 'Operations Executive', photo: p('pavneet') },
]

export type Squad = 'Technical' | 'Research' | 'Media' | 'Content' | 'Graphics' | 'Operations'

export const squads: { name: Squad; blurb: string; members: Person[] }[] = [
  {
    name: 'Media',
    blurb: 'Cameras, reels and every photo you see on this site.',
    members: [
      { name: 'Aditya Sharma', photo: p('AdityaSharma') },
      { name: 'Prachi Verma', photo: p('PrachiVerma') },
      { name: 'Siddharth Rai', photo: p('SiddharthRai') },
    ],
  },
  {
    name: 'Content',
    blurb: 'Words for posts, scripts, event briefs and write-ups.',
    members: [
      { name: 'Deenah', photo: p('Deenah') },
      { name: 'Kheetansh Bansal', photo: p('KheetanshBansal') },
      { name: 'Rishika Popli', photo: p('RishikaPopli') },
      { name: 'Shubh Kumar', photo: p('ShubhKumar') },
    ],
  },
  {
    name: 'Graphics',
    blurb: 'Posters, brand and visual identity for every drop.',
    members: [
      { name: 'Kaushal Jindal', photo: p('KaushalJindal') },
      { name: 'Khushi Bagga', photo: p('KhushiBagga') },
      { name: 'Riya Duggal', photo: p('RiyaDuggal') },
      { name: 'Sachida Sabharwal', photo: p('SachidaSabharwal') },
    ],
  },
  {
    name: 'Operations',
    blurb: 'Venues, logistics and making sure events actually happen.',
    members: [
      { name: 'Aaradhya Khanna', photo: p('AaradhyaKhanna') },
      { name: 'Asmit Chitkara', photo: p('AsmitChitkara') },
      { name: 'Pranav Marjara', photo: p('Pranavmarjara') },
      { name: 'Samya Ahuja', photo: p('SamyaAhuja') },
    ],
  },
  {
    name: 'Technical',
    blurb: 'Builds the club\u2019s software, from this website to hackathon infra.',
    members: [
      { name: 'Adab Singh Malhi', photo: p('AdabSinghMalhi') },
      { name: 'Jaskaran Singh', photo: p('JaskaranSingh') },
      { name: 'Prateek Kumar', photo: p('PrateekKumar') },
      { name: 'Sartaj Kaur Sandhu', photo: p('sartaj_new') },
    ],
  },
  {
    name: 'Research',
    blurb: 'Reads the papers, runs the experiments, writes up what works.',
    members: [
      { name: 'Aditya Chandiok', photo: p('AdityaChandhiok') },
      { name: 'Anayat Virk', photo: p('AnayatVirk') },
      { name: 'Ansh', photo: p('Ansh') },
      { name: 'Bhavishya Grover', photo: p('BhavishyaGrover') },
      { name: 'Bhavya Sharma', photo: p('BhavyaSharma') },
      { name: 'Deepanshu Arora', photo: p('DeepanshuArora') },
      { name: 'Dhruv Gaur', photo: p('DhruvGaur') },
      { name: 'Govind Jindal', photo: p('GovindJindal') },
      { name: 'Harsidak Singh Banwait', photo: p('HarsidakSinghBanwait') },
      { name: 'Jaisgurnoor Singh', photo: p('JaisgurnoorSingh1') },
      { name: 'Karunika Chaudhary', photo: p('KarunikaChaudhary') },
      { name: 'Manan Kochhar', photo: p('MananKochhar') },
    ],
  },
]


export const alumni: { year: string; members: Person[] }[] = [
  {
    year: '2023',
    members: [
      { name: 'Mukul Garg', photo: p('mukul') },
      { name: 'Parneet Kaur', photo: p('parneet') },
      { name: 'Abhishek Kumar', photo: p('abhishek') },
      { name: 'Sarabjit Sharma', photo: p('sarabjit') },
      { name: 'Aarav Singla', photo: p('aarav') },
      { name: 'Kushagra Kataria', photo: p('kushagra') },
      { name: 'Siddhant Walia', photo: p('siddhant') },
      { name: 'Anshita Bathla', photo: p('anshita') },
    ],
  },
  {
    year: '2022',
    members: [
      { name: 'Ravinder Partap Singh', photo: p('ravi') },
      { name: 'Ishaan Sharma', photo: p('sharma') },
      { name: 'Shivam Aggarwal', photo: p('shivam') },
      { name: 'Kirat Kaur', photo: p('kirat') },
      { name: 'Sanya Sagar', photo: p('sanya') },
      { name: 'Ishaan Malhotra', photo: p('ishaan') },
    ],
  },
]

export const teamCount =
  leads.length + executives.length + squads.reduce((n, s) => n + s.members.length, 0)
