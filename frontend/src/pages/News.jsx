import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendar, FaTag } from 'react-icons/fa';
import { getNews } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function News() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [articles, setArticles] = useState(demoNews);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then((res) => {
        const data = res.data.results || res.data;
        if (data.length) setArticles(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['promo', 'course', 'exam', 'general'];
  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('news.title')}</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
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
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`news.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article key={article.id} className="card">
              <div className="h-48 bg-gradient-to-br from-primary/60 to-primary-light/60 flex items-center justify-center">
                {article.image ? (
                  <img src={article.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">📰</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full font-medium">
                    <FaTag className="text-[10px]" />
                    {t(`news.categories.${article.category}`)}
                  </span>
                  {article.published_at && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <FaCalendar className="text-[10px]" />
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {getField(article, 'title')}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {getField(article, 'content')}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No news available.</p>
        )}
      </div>
    </div>
  );
}

const demoNews = [
  { id: 1, category: 'promo', title_ky: '10% арзандатуу — чектелген убакыт!', title_ru: 'Скидка 10% — ограниченное время!', title_en: '10% Discount — Limited Time!', content_ky: 'Бардык курстарга 10% арзандатуу. Акция 2026-жылдын июнь айына чейин.', content_ru: 'Скидка 10% на все курсы. Акция до июня 2026 года.', content_en: '10% discount on all courses. Promotion valid until June 2026.', published_at: '2026-05-01' },
  { id: 2, category: 'course', title_ky: 'Жаңы интенсив курс ачылды', title_ru: 'Открыт новый интенсивный курс', title_en: 'New Intensive Course Opened', content_ky: '2 айлык интенсив курс — ЖРТга тез даярдануу үчүн.', content_ru: '2-месячный интенсивный курс — для быстрой подготовки к ОРТ.', content_en: '2-month intensive course for fast ORT preparation.', published_at: '2026-04-15' },
  { id: 3, category: 'exam', title_ky: 'ЖРТ 2026 — жаңы өзгөрүүлөр', title_ru: 'ОРТ 2026 — новые изменения', title_en: 'ORT 2026 — New Changes', content_ky: '2026-жылдагы ЖРТда жаңы типтеги суроолор киргизилет.', content_ru: 'В ОРТ 2026 года вводятся новые типы вопросов.', content_en: 'New question types introduced in ORT 2026.', published_at: '2026-03-20' },
];
