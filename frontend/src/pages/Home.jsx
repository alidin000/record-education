import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUserGraduate, FaCertificate, FaBuilding } from 'react-icons/fa';

export default function Home() {
  const { t } = useTranslation();

  const stats = [
    { icon: FaTrophy, value: '8+', label: t('stats.experience') },
    { icon: FaUserGraduate, value: '150+', label: t('stats.students') },
    { icon: FaCertificate, value: '50+', label: t('stats.certificates') },
    { icon: FaBuilding, value: '3', label: t('stats.branches') },
  ];

  return (
    <div>
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-secondary to-amber-500 text-white text-center py-2 px-4">
        <p className="text-sm font-semibold">
          🔥 {t('promo.discount')} — {t('promo.limited')}
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              {t('hero.title')} <br />
              <span className="text-secondary">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts" className="btn-secondary text-lg px-8 py-4">
                {t('hero.cta')}
              </Link>
              <Link to="/courses" className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all">
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-xl shadow-md">
                <stat.icon className="text-4xl text-secondary mx-auto mb-3" />
                <p className="text-3xl font-black text-primary">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">{t('courses.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('about.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn-primary">
              {t('hero.cta_secondary')}
            </Link>
            <a href="https://wa.me/996555000000" className="btn-whatsapp justify-center">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
