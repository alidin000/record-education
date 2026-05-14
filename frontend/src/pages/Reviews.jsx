import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaPlay, FaCheck } from 'react-icons/fa';
import { getReviews, getFeedbacks, submitFeedback } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function Reviews() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [reviews, setReviews] = useState(demoReviews);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    Promise.all([getReviews(), getFeedbacks()])
      .then(([revRes, fbRes]) => {
        const revData = revRes.data.results || revRes.data;
        const fbData = fbRes.data.results || fbRes.data;
        if (revData.length) setReviews(revData);
        if (fbData.length) setFeedbacks(fbData);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('reviews.title')}</h1>

        {/* Toggle feedback form button */}
        <div className="text-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-secondary"
          >
            {showForm ? t('reviews.hide_form') : t('reviews.leave_feedback')}
          </button>
        </div>

        {/* Student Feedback Form */}
        {showForm && <FeedbackForm onSuccess={() => setShowForm(false)} />}

        {/* Admin-managed reviews (high scorers) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review) => (
            <div key={review.id} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
                  {review.student_name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{review.student_name}</h4>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-secondary text-sm" />
                    <span className="text-sm font-medium text-secondary">
                      {review.score} {t('reviews.score')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {getField(review, 'text')}
              </p>

              {review.video_url && (
                <a
                  href={review.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light font-medium"
                >
                  <FaPlay className="text-xs" />
                  {t('reviews.watch_video')}
                </a>
              )}

              <p className="text-xs text-gray-400 mt-3">{review.year}</p>
            </div>
          ))}
        </div>

        {/* Student-submitted feedbacks (approved) */}
        {feedbacks.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-primary text-center mb-8">
              {t('reviews.student_feedbacks')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="card p-5 border-l-4 border-secondary">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{fb.student_name}</h4>
                    <div className="flex text-secondary">
                      {[...Array(fb.rating)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{fb.text}</p>
                  {fb.course_taken && (
                    <p className="text-xs text-gray-400 mt-2">{fb.course_taken}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FeedbackForm({ onSuccess }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    student_name: '', phone: '', email: '', text: '', rating: 5, course_taken: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFeedback(form);
    } catch {
      // demo mode fallback
    }
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess?.();
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mb-12 card p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-2xl text-green-600" />
        </div>
        <p className="text-green-700 font-medium">{t('reviews.feedback_success')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mb-12 card p-8">
      <h3 className="text-xl font-bold text-primary mb-6">{t('reviews.form_title')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contacts.form_name')} *
          </label>
          <input
            type="text"
            required
            value={form.student_name}
            onChange={(e) => setForm({ ...form, student_name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contacts.form_phone')}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+996 ..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('reviews.which_course')}
          </label>
          <input
            type="text"
            value={form.course_taken}
            onChange={(e) => setForm({ ...form, course_taken: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('reviews.your_rating')}
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm({ ...form, rating: star })}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl transition-colors"
              >
                <FaStar
                  className={
                    star <= (hoverRating || form.rating)
                      ? 'text-secondary'
                      : 'text-gray-300'
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('reviews.your_review')} *
          </label>
          <textarea
            rows="4"
            required
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder={t('reviews.review_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? '...' : t('reviews.submit_feedback')}
        </button>

        <p className="text-xs text-gray-500 text-center">
          {t('reviews.moderation_note')}
        </p>
      </form>
    </div>
  );
}

const demoReviews = [
  { id: 1, student_name: 'Алиев Нурлан', score: 224, year: 2025, text_ky: 'Рекорд окуу борборунда окугандан кийин мен 224 балл алдым. Мугалимдер абдан жакшы түшүндүрүшөт.', text_ru: 'После обучения в центре Рекорд я набрал 224 балла. Преподаватели очень хорошо объясняют.', text_en: 'After studying at Record center I scored 224 points. Teachers explain very well.', video_url: '' },
  { id: 2, student_name: 'Бекова Айдай', score: 219, year: 2025, text_ky: 'Мен ЖРТда 219 балл алдым! Рекордго чоң ыраазычылык. Интенсив курс абдан пайдалуу болду.', text_ru: 'Я набрала 219 баллов на ОРТ! Большая благодарность Рекорду. Интенсивный курс был очень полезен.', text_en: 'I scored 219 on ORT! Big thanks to Record. The intensive course was very useful.', video_url: '' },
  { id: 3, student_name: 'Касымов Эркин', score: 215, year: 2024, text_ky: '10 күндүк интенсив курстан кийин менин баллым 50ге жогорулады. Рекомендация берем!', text_ru: 'После 10-дневного интенсива мой балл вырос на 50. Рекомендую!', text_en: 'After the 10-day intensive my score increased by 50. I recommend it!', video_url: '' },
  { id: 4, student_name: 'Турсунова Малика', score: 212, year: 2024, text_ky: 'Эң мыкты мугалимдер жана жылуу атмосфера. Рекорд менин келечегимди өзгөрттү.', text_ru: 'Лучшие преподаватели и теплая атмосфера. Рекорд изменил мое будущее.', text_en: 'Best teachers and warm atmosphere. Record changed my future.', video_url: '' },
  { id: 5, student_name: 'Жумабеков Арсен', score: 210, year: 2025, text_ky: 'Математика боюнча абдан күчтүү даярдык алдым. 210 балл — бул менин максатым эле!', text_ru: 'Получил очень сильную подготовку по математике. 210 баллов — это была моя цель!', text_en: 'Got very strong preparation in mathematics. 210 points was my goal!', video_url: '' },
  { id: 6, student_name: 'Сатарова Бегимай', score: 208, year: 2024, text_ky: 'Рекордсуз бул жыйынтыкка жетүү мүмкүн эмес болмок. Ыраазымын!', text_ru: 'Без Рекорда этот результат был бы невозможен. Благодарна!', text_en: 'Without Record this result would have been impossible. Grateful!', video_url: '' },
];
