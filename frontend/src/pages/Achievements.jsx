import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
import { getAchievements, getReviews } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function Achievements() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [achievements, setAchievements] = useState(demoAchievements);
  const [topStudents, setTopStudents] = useState(demoTopStudents);

  useEffect(() => {
    Promise.all([getAchievements(), getReviews(true)])
      .then(([achRes, revRes]) => {
        const achData = achRes.data.results || achRes.data;
        const revData = revRes.data.results || revRes.data;
        if (achData.length) setAchievements(achData);
        if (revData.length) setTopStudents(revData);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('achievements.title')}</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {achievements.map((ach, i) => (
            <div key={ach.id || i} className="card p-8 text-center bg-gradient-to-br from-white to-blue-50">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {i === 0 ? <FaTrophy className="text-3xl text-secondary" /> :
                 i === 1 ? <FaMedal className="text-3xl text-secondary" /> :
                 <FaStar className="text-3xl text-secondary" />}
              </div>
              <p className="text-4xl font-black text-primary mb-2">{ach.value}</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {getField(ach, 'title')}
              </h3>
              {getField(ach, 'description') && (
                <p className="text-sm text-gray-600 mt-2">{getField(ach, 'description')}</p>
              )}
            </div>
          ))}
        </div>

        {/* Top Students */}
        <h2 className="text-2xl font-bold text-primary text-center mb-8">
          {t('achievements.high_scorers')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topStudents.map((student, i) => (
            <div key={student.id || i} className="card p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-secondary to-amber-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{student.score}</span>
              </div>
              <h4 className="font-semibold text-primary">{student.student_name}</h4>
              <p className="text-sm text-gray-500">{student.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const demoAchievements = [
  { id: 1, title_ky: 'Жылдык тажрыйба', title_ru: 'Лет опыта', title_en: 'Years of Experience', value: '8+', description_ky: '', description_ru: '', description_en: '' },
  { id: 2, title_ky: '200+ балл алгандар', title_ru: 'Учеников с 200+ баллами', title_en: 'Students with 200+ Score', value: '150+', description_ky: '', description_ru: '', description_en: '' },
  { id: 3, title_ky: 'Алтын сертификаттар', title_ru: 'Золотых сертификатов', title_en: 'Gold Certificates', value: '50+', description_ky: '', description_ru: '', description_en: '' },
];

const demoTopStudents = [
  { id: 1, student_name: 'Алиев Нурлан', score: 224, year: 2025 },
  { id: 2, student_name: 'Бекова Айдай', score: 219, year: 2025 },
  { id: 3, student_name: 'Касымов Эркин', score: 215, year: 2024 },
  { id: 4, student_name: 'Турсунова Малика', score: 212, year: 2024 },
  { id: 5, student_name: 'Жумабеков Арсен', score: 210, year: 2025 },
  { id: 6, student_name: 'Сатарова Бегимай', score: 208, year: 2024 },
  { id: 7, student_name: 'Маматов Данияр', score: 205, year: 2023 },
  { id: 8, student_name: 'Осмонова Элина', score: 203, year: 2023 },
];
