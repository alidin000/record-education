import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaClock, FaCalendar, FaTag } from 'react-icons/fa';
import { getCourses, getCategories } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function Courses() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.results || res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setCourses([]);
    getCourses(activeCategory || undefined)
      .then((res) => {
        if (!cancelled) setCourses(res.data.results || res.data);
      })
      .catch(() => {
        if (!cancelled && !activeCategory) setCourses(demoCourses);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('courses.title')}</h1>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('courses.filter_all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getField(cat, 'name')}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <div className="h-48 bg-gradient-to-br from-primary/80 to-primary-light flex items-center justify-center">
                {course.image ? (
                  <img src={course.image} alt={getField(course, 'title')} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-white/50">📚</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2">
                  {getField(course, 'title')}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {getField(course, 'description')}
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-secondary" />
                    <span>{t('courses.duration')}: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTag className="text-secondary" />
                    <span>{t('courses.price')}: {course.price} сом</span>
                  </div>
                  {course.start_date && (
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-secondary" />
                      <span>{t('courses.start_date')}: {course.start_date}</span>
                    </div>
                  )}
                </div>
                <Link to="/contacts" className="btn-primary w-full text-center block text-sm py-2">
                  {t('courses.enroll')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <p className="text-center text-gray-500 py-12">No courses available yet.</p>
        )}
      </div>
    </div>
  );
}

const demoCourses = [
  { id: 1, title_ky: 'ЖРТ Математика', title_ru: 'ОРТ Математика', title_en: 'ORT Mathematics', description_ky: 'Толук математика курсу', description_ru: 'Полный курс математики', description_en: 'Full mathematics course', duration: '3 ай', price: '5000', start_date: '2026-06-01' },
  { id: 2, title_ky: 'ЖРТ Кыргыз тили', title_ru: 'ОРТ Кыргызский язык', title_en: 'ORT Kyrgyz Language', description_ky: 'Кыргыз тили курсу', description_ru: 'Курс кыргызского языка', description_en: 'Kyrgyz language course', duration: '3 ай', price: '5000', start_date: '2026-06-01' },
  { id: 3, title_ky: 'Интенсив 10 күн', title_ru: 'Интенсив 10 дней', title_en: 'Intensive 10 days', description_ky: '10 күндүк интенсив программа', description_ru: '10-дневная интенсивная программа', description_en: '10-day intensive program', duration: '10 күн', price: '3000', start_date: '2026-06-15' },
];
