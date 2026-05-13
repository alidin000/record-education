import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaPlay } from 'react-icons/fa';
import { getReviews } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function Reviews() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [reviews, setReviews] = useState(demoReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews()
      .then((res) => {
        const data = res.data.results || res.data;
        if (data.length) setReviews(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('reviews.title')}</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
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
