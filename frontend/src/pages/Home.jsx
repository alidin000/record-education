import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUserGraduate, FaCertificate, FaBuilding, FaWhatsapp, FaArrowRight, FaStar } from 'react-icons/fa';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Home() {
  const { t } = useTranslation();

  const stats = [
    { icon: FaTrophy, value: '8+', label: t('stats.experience') },
    { icon: FaUserGraduate, value: '150+', label: t('stats.students') },
    { icon: FaCertificate, value: '50+', label: t('stats.certificates') },
    { icon: FaBuilding, value: '3', label: t('stats.branches') },
  ];

  const statStagger = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];

  return (
    <div>
      {/* Promo — animated gradient (same reds) */}
      <div className="promo-shimmer relative overflow-hidden text-center text-white shadow-md shadow-secondary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.07\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
        <div className="relative flex items-center justify-center gap-2 px-4 py-3">
          <FaStar className="hidden shrink-0 text-amber-200/90 motion-safe:animate-pulse sm:block" aria-hidden />
          <p className="text-sm font-semibold tracking-wide">
            {t('promo.discount')} — <span className="font-black drop-shadow-sm">{t('promo.limited')}</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden text-white">
        {/* Soft animated orbs */}
        <div
          className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl motion-safe:animate-[record-header-glow_14s_ease-in-out_infinite]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl motion-safe:animate-[record-header-glow_18s_ease-in-out_infinite_reverse]"
          aria-hidden
        />

        {/* Fine grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <svg
          className="pointer-events-none absolute right-[6%] top-20 hidden w-52 opacity-[0.14] motion-safe:animate-pulse lg:block xl:right-[10%] xl:w-72"
          viewBox="0 0 200 120"
          fill="none"
          aria-hidden
        >
          <path d="M10 40 Q80 10 190 35" stroke="#c8102e" strokeWidth="12" strokeLinecap="round" />
          <path d="M10 75 Q90 50 190 70" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" opacity="0.85" />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24 lg:py-28">
          <div>
            <p className="fade-rise mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary-light shadow-[0_0_12px_#f87171]" />
              RECORD
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] motion-safe:fade-rise motion-safe:stagger-1 md:text-5xl lg:text-6xl">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-white via-slate-100 to-secondary-light bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </h1>
            <p className="fade-rise stagger-2 mt-6 max-w-xl text-lg leading-relaxed text-slate-200/95 md:text-xl">
              {t('hero.description')}
            </p>
            <div className="fade-rise stagger-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/contacts" className="group btn-secondary text-base shadow-xl shadow-black/25">
                {t('hero.cta')}
                <FaArrowRight className="text-sm opacity-90 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/courses" className="btn-ghost-light text-base">
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </div>

          <div className="flex justify-center motion-safe:fade-rise motion-safe:stagger-4 md:justify-end">
            <div className="relative">
              {/* Orbiting ring */}
              <div
                className="pointer-events-none absolute -inset-8 rounded-full border border-dashed border-white/15 motion-safe:animate-[record-rotate-slow_48s_linear_infinite]"
                aria-hidden
              />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-secondary/45 via-transparent to-sky-500/25 blur-2xl motion-safe:animate-pulse" />
              <div className="float-logo relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-secondary via-secondary-light to-primary p-[3px] shadow-2xl shadow-secondary/30">
                  <div className="rounded-full bg-[#050d18] p-3 md:p-4">
                    <img
                      src="/brand/record-logo.png"
                      alt="RECORD"
                      className="mx-auto h-44 w-44 rounded-full object-cover ring-4 ring-white/10 md:h-56 md:w-56 lg:h-64 lg:w-64"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="relative -mb-px block h-12 w-full text-[#f4f6f9] md:h-16"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path fill="currentColor" d="M0,64 L0,18 Q240,0 480,28 T960,32 Q1200,36 1440,22 L1440,64 Z" />
        </svg>
      </section>

      {/* Stats */}
      <section className="relative -mt-px bg-gradient-to-b from-[#f4f6f9] via-white to-[#f0f4f8] pb-16 pt-6 md:pb-20 md:pt-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`stat-card-fancy motion-safe:fade-rise ${statStagger[i] ?? ''}`}
              >
                <span className="stat-shine" aria-hidden />
                <div className="absolute right-3 top-3 h-16 w-16 rounded-full bg-gradient-to-br from-secondary/15 to-transparent blur-xl" />
                <stat.icon className="relative mb-4 text-3xl text-secondary drop-shadow-sm md:text-4xl" />
                <p className="font-display relative text-3xl font-black tracking-tight text-primary md:text-4xl">{stat.value}</p>
                <p className="relative mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — frosted glass panel */}
      <section className="relative overflow-hidden border-y border-slate-200/80 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,16,46,0.08),transparent)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="cta-glass-panel">
            <div className="relative z-10 text-center">
              <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">{t('courses.title')}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t('about.description')}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/courses" className="btn-primary min-w-[200px]">
                  {t('hero.cta_secondary')}
                </Link>
                <a
                  href={getWhatsAppLink('Саламатсызбы! Курстар жөнүндө маалымат алгым келет.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp min-w-[200px] shadow-lg shadow-emerald-900/25"
                >
                  <FaWhatsapp className="text-xl" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
