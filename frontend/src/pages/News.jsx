import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendar, FaTag } from 'react-icons/fa';
import { getNews } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function News() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getNews()
      .then((res) => {
        const data = res.data.results || res.data;
        setArticles(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['promo', 'course', 'exam', 'general'];
  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('news.title')}</h1>

        {error && (
          <p className="text-center text-red-500 py-4">{t('common.error_loading')}</p>
        )}

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

        {!error && filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">{t('news.no_news')}</p>
        )}
      </div>
    </div>
  );
}
