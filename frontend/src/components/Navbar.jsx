import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';

const languages = [
  { code: 'ky', label: 'Кыргызча' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/courses', label: t('nav.courses') },
    { to: '/schedule', label: t('nav.schedule') },
    { to: '/teachers', label: t('nav.teachers') },
    { to: '/achievements', label: t('nav.achievements') },
    { to: '/reviews', label: t('nav.reviews') },
    { to: '/news', label: t('nav.news') },
    { to: '/contacts', label: t('nav.contacts') },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary">РЕКОРД</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaGlobe />
                <span className="uppercase">{i18n.language?.substring(0, 2)}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border py-1 min-w-[140px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        i18n.language?.startsWith(lang.code) ? 'text-primary font-semibold' : ''
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.to
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
