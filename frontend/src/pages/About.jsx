import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaBullseye, FaUsers } from 'react-icons/fa';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('about.title')}</h1>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">{t('about.description')}</p>
        </div>

        {/* Director Section */}
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl text-white p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FaUsers className="text-6xl text-white/80" />
            </div>
            <div>
              <p className="text-secondary font-semibold mb-2">{t('about.director')}</p>
              <h2 className="text-3xl font-bold mb-4">{t('about.director_name')}</h2>
              <p className="text-blue-100 text-lg">
                {t('about.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FaBullseye className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{t('about.mission')}</h3>
            <p className="text-gray-600">{t('about.mission_text')}</p>
          </div>

          <div className="card p-8">
            <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <FaGraduationCap className="text-2xl text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{t('about.history')}</h3>
            <p className="text-gray-600">{t('about.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
