import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Error 404</p>
      <h1 className="text-7xl font-bold tracking-[-0.05em] text-ink md:text-9xl">
        Not <span className="text-iridescent">trained</span> on this.
      </h1>
      <p className="max-w-md text-ink/60">This page {"doesn't"} exist — yet.</p>
      <Link href="/" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-white hover:bg-violet">
        Back home
      </Link>
    </div>
  )
}
