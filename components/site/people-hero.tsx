import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { Person } from '@/lib/team'
import { SectionLabel } from './reveal'

export function PeopleHero({ variant, portraits, count }: { variant: 'team' | 'alumni'; portraits: Person[]; count: number }) {
  const isTeam = variant === 'team'
  return (
    <header className="mx-auto max-w-6xl pb-12 pt-32 md:pb-16 md:pt-40">
      <div className="flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
        <SectionLabel index={isTeam ? 'TM' : 'AL'}>{isTeam ? 'The collective / 2025–26' : 'The alumni archive'}</SectionLabel>
        <Link href={isTeam ? '/alumni' : '/team'} className="flex items-center gap-2 text-xs text-ink/65 transition-colors hover:text-violet">{isTeam ? 'Meet our alumni' : 'Meet today’s team'}<ArrowUpRight size={14} aria-hidden="true" /></Link>
      </div>
      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h1 className="text-[clamp(3.6rem,7vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.065em]">{isTeam ? <>The minds.<br />The makers.<br /><span className="text-violet">Our people.</span></> : <>Once Evolve.<br />Always<br /><span className="text-violet">one of us.</span></>}</h1>
          <p className="mt-7 max-w-96 text-base leading-relaxed text-ink/65">{isTeam ? 'Different talents. Shared curiosity. Meet the people turning ambitious ideas into something real — and having a good time doing it.' : 'Before the next big idea, there was someone who took the first step. This is for the people who started it all, and never really left.'}</p>
          <a href={isTeam ? '#directory' : '#alumni-directory'} className="mt-7 inline-flex items-center gap-6 border-b border-ink pb-2 text-sm font-medium transition-colors hover:text-violet">{isTeam ? 'Find your people' : 'Explore the batches'}<ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 items-start gap-3 px-2 py-4 md:gap-4">
          <div className="rotate-[-5deg] bg-white p-2 shadow-[0_10px_30px_-20px_#1c0a3360]">
            <div className="relative aspect-[4/5] overflow-hidden bg-lilac"><Image src={portraits[0].photo} alt={portraits[0].name} fill priority sizes="(min-width: 1024px) 200px, 42vw" className="object-cover object-top" /></div>
            <p className="px-1 pb-1 pt-3 text-xs font-medium">{portraits[0].name}</p>
          </div>
          <div className="mt-7 rotate-[5deg] bg-white p-2 shadow-[0_10px_30px_-20px_#1c0a3360]">
            <div className="relative aspect-[4/5] overflow-hidden bg-lilac"><Image src={portraits[1].photo} alt={portraits[1].name} fill priority sizes="(min-width: 1024px) 200px, 42vw" className="object-cover object-top" /></div>
            <p className="px-1 pb-1 pt-3 text-xs font-medium">{portraits[1].name}</p>
          </div>
          <div className="ml-5 mt-2 flex aspect-square rotate-[-4deg] flex-col justify-between rounded-[50%_50%_0_50%] bg-violet p-5 text-white md:p-8"><ArrowUpRight size={28} className="self-end" aria-hidden="true" /><p className="pl-2 text-base font-medium leading-tight tracking-tight sm:text-xl">{isTeam ? <>Not just a club.<br />A collective.</> : <>New chapters.<br />Same roots.</>}</p></div>
          <div className="-mt-2 rotate-[3deg] bg-white p-2 shadow-[0_10px_30px_-20px_#1c0a3360]">
            <div className="relative aspect-[5/4] overflow-hidden bg-lilac"><Image src={portraits[2].photo} alt={portraits[2].name} fill sizes="(min-width: 1024px) 200px, 42vw" className="object-cover object-[center_25%]" /></div>
            <p className="px-1 pb-1 pt-3 text-xs font-medium">{portraits[2].name}</p>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-y border-ink/20 py-5">
        <p className="text-sm"><span className="mr-2 text-2xl font-medium tracking-tight">{count}</span><span className="text-ink/60">{isTeam ? 'people, one shared purpose' : 'familiar faces, countless memories'}</span></p>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider text-ink/65">{isTeam ? <><a href="#directory" className="inline-flex items-center gap-2 hover:text-violet">6 squads <ArrowUpRight size={12} aria-hidden="true" /></a><a href="#mentors" className="inline-flex items-center gap-2 hover:text-violet">3 mentors <ArrowUpRight size={12} aria-hidden="true" /></a></> : <><span>2 founding batches</span><span>Since 2021</span></>}</div>
      </div>
    </header>
  )
}
