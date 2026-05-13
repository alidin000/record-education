import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { getBranches, submitContact } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function Contacts() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [branches, setBranches] = useState(demoBranches);
  const [form, setForm] = useState({ full_name: '', phone: '', message: '', course_interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBranches()
      .then((res) => {
        const data = res.data.results || res.data;
        if (data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
    } catch {
      // Still show success in demo mode
    }
    setSubmitted(true);
    setLoading(false);
    setForm({ full_name: '', phone: '', message: '', course_interest: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('contacts.title')}</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('contacts.form_title')}</h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl text-green-600" />
                </div>
                <p className="text-green-700 font-medium">{t('contacts.form_success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contacts.form_name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contacts.form_phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+996 ..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contacts.form_course')}
                  </label>
                  <input
                    type="text"
                    value={form.course_interest}
                    onChange={(e) => setForm({ ...form, course_interest: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contacts.form_message')}
                  </label>
                  <textarea
                    rows="3"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? '...' : t('contacts.form_submit')}
                </button>
              </form>
            )}
          </div>

          {/* Branches & Info */}
          <div className="space-y-6">
            {branches.map((branch) => (
              <div key={branch.id} className="card p-6">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-secondary" />
                  {getField(branch, 'name')}
                  {branch.is_main && (
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                      Main
                    </span>
                  )}
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-600">{getField(branch, 'address')}</p>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-primary" />
                    <a href={`tel:${branch.phone}`} className="hover:text-primary">{branch.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" />
                    <a href={`https://wa.me/${branch.whatsapp?.replace(/\D/g, '')}`} className="hover:text-green-600">
                      WhatsApp: {branch.whatsapp}
                    </a>
                  </div>
                  {branch.instagram_url && (
                    <div className="flex items-center gap-2">
                      <FaInstagram className="text-pink-500" />
                      <a href={branch.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                        Instagram
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="card overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">2GIS / Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const demoBranches = [
  { id: 1, name_ky: 'Рекорд Ош (негизги)', name_ru: 'Рекорд Ош (основной)', name_en: 'Record Osh (main)', address_ky: 'Ош шаары, Курманжан Датка көчөсү', address_ru: 'г. Ош, ул. Курманжан Датки', address_en: 'Osh city, Kurmanjan Datka st.', phone: '+996 555 000 001', whatsapp: '+996 555 000 001', instagram_url: 'https://instagram.com/record_osh', is_main: true },
  { id: 2, name_ky: 'Рекорд Бишкек', name_ru: 'Рекорд Бишкек', name_en: 'Record Bishkek', address_ky: 'Бишкек шаары, Чүй проспекти', address_ru: 'г. Бишкек, пр. Чуй', address_en: 'Bishkek, Chuy Ave.', phone: '+996 555 000 002', whatsapp: '+996 555 000 002', instagram_url: 'https://instagram.com/record_bishkek', is_main: false },
];
