import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { getTeachers } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

export default function Teachers() {
  const { t } = useTranslation();
  const { getField } = useLocalized();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then((res) => setTeachers(res.data.results || res.data))
      .catch(() => setTeachers(demoTeachers))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('teachers.title')}</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="card p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {teacher.photo ? (
                    <img src={teacher.photo} alt={getField(teacher, 'full_name')} className="w-full h-full object-cover" />
                  ) : (
                    <FaChalkboardTeacher className="text-4xl text-primary/50" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-primary">
                  {getField(teacher, 'full_name')}
                </h3>
                <p className="text-secondary font-medium mt-1">
                  {getField(teacher, 'subject')}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {teacher.experience_years} {t('teachers.experience')}
                </p>
                {getField(teacher, 'bio') && (
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {getField(teacher, 'bio')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const demoTeachers = [
  { id: 1, full_name_ky: 'Нишанов Шекербек', full_name_ru: 'Нишанов Шекербек', full_name_en: 'Nishanov Shekerbek', subject_ky: 'Математика', subject_ru: 'Математика', subject_en: 'Mathematics', experience_years: 8, bio_ky: 'Тажрыйбалуу математика мугалими', bio_ru: 'Опытный преподаватель математики', bio_en: 'Experienced mathematics teacher' },
  { id: 2, full_name_ky: 'Акматова Айгүл', full_name_ru: 'Акматова Айгуль', full_name_en: 'Akmatova Aigul', subject_ky: 'Кыргыз тили', subject_ru: 'Кыргызский язык', subject_en: 'Kyrgyz Language', experience_years: 6, bio_ky: 'Кыргыз тили боюнча адис', bio_ru: 'Специалист по кыргызскому языку', bio_en: 'Kyrgyz language specialist' },
  { id: 3, full_name_ky: 'Турдуев Бакыт', full_name_ru: 'Турдуев Бакыт', full_name_en: 'Turduev Bakyt', subject_ky: 'Аналогия/Толуктоо', subject_ru: 'Аналогия/Дополнение', subject_en: 'Analogy/Completion', experience_years: 5, bio_ky: 'Аналогия жана толуктоо боюнча мугалим', bio_ru: 'Преподаватель аналогии и дополнения', bio_en: 'Analogy and completion teacher' },
];
