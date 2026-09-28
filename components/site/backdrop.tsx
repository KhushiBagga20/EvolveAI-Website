export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[15%] -top-[20%] size-[60vmax] rounded-full bg-sky/25 blur-[120px] animate-float-slow" />
      <div className="absolute -right-[20%] top-[10%] size-[55vmax] rounded-full bg-violet/20 blur-[120px] animate-float" />
      <div className="absolute bottom-[-30%] left-[20%] size-[50vmax] rounded-full bg-magenta/15 blur-[140px] animate-float-slow" />
      <div className="grid-lines mask-fade-b absolute inset-0 opacity-60" />
    </div>
  )
}
