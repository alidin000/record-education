/**
 * Compact hero band for inner pages — RECORD brand + motion (respects reduced motion).
 */
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="hero-mesh relative overflow-hidden text-white">
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#c8102e]/30 blur-3xl motion-safe:animate-[record-header-glow_16s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl motion-safe:animate-[record-header-glow_20s_ease-in-out_infinite_reverse]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <svg
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 w-full text-[#f4f6f9] md:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,56 L0,22 Q320,4 720,30 T1440,26 L1440,56 Z" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-3xl text-center motion-safe:fade-rise">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-red-100/95 shadow-lg shadow-black/10 backdrop-blur-md">
            <span className="h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_white]" />
            RECORD
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200/95 md:text-lg">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
