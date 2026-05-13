import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-black text-secondary mb-4">РЕКОРД</h3>
            <p className="text-gray-300 text-sm">
              {t('about.description')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-secondary">{t('nav.courses')}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/courses" className="hover:text-white transition-colors">{t('nav.courses')}</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition-colors">{t('nav.schedule')}</Link></li>
              <li><Link to="/teachers" className="hover:text-white transition-colors">{t('nav.teachers')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-secondary">{t('nav.about')}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/achievements" className="hover:text-white transition-colors">{t('nav.achievements')}</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">{t('nav.reviews')}</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">{t('nav.news')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-secondary">{t('nav.contacts')}</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-secondary" />
                <span>Ош шаары, Кыргызстан</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-secondary" />
                <a href="tel:+996555000000" className="hover:text-white">+996 555 000 000</a>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-green-400" />
                <a href="https://wa.me/996555000000" className="hover:text-white">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="text-pink-400" />
                <a href="https://instagram.com/record_osh" className="hover:text-white">@record_osh</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} РЕКОРД. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
