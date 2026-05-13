import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getSchedule } from '../utils/api';
import { useLocalized } from '../hooks/useLocalized';

const daysOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const dayNames = {
  ky: { mon: 'Дүйшөмбү', tue: 'Шейшемби', wed: 'Шаршемби', thu: 'Бейшемби', fri: 'Жума', sat: 'Ишемби', sun: 'Жекшемби' },
  ru: { mon: 'Понедельник', tue: 'Вторник', wed: 'Среда', thu: 'Четверг', fri: 'Пятница', sat: 'Суббота', sun: 'Воскресенье' },
  en: { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' },
};

export default function Schedule() {
  const { t } = useTranslation();
  const { lang, getField } = useLocalized();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSchedule()
      .then((res) => setSchedule(res.data.results || res.data))
      .catch(() => setSchedule(demoSchedule))
      .finally(() => setLoading(false));
  }, []);

  const grouped = daysOrder.reduce((acc, day) => {
    acc[day] = schedule.filter((s) => s.day === day);
    return acc;
  }, {});

  const currentDayNames = dayNames[lang] || dayNames.ky;

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">{t('schedule.title')}</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left">{t('schedule.day')}</th>
                  <th className="px-6 py-4 text-left">{t('schedule.time')}</th>
                  <th className="px-6 py-4 text-left">{t('schedule.course')}</th>
                  <th className="px-6 py-4 text-left">{t('schedule.room')}</th>
                </tr>
              </thead>
              <tbody>
                {daysOrder.map((day) =>
                  grouped[day]?.length > 0
                    ? grouped[day].map((item, i) => (
                        <tr key={`${day}-${i}`} className="border-b hover:bg-gray-50">
                          {i === 0 && (
                            <td rowSpan={grouped[day].length} className="px-6 py-4 font-semibold text-primary bg-blue-50/50">
                              {currentDayNames[day]}
                            </td>
                          )}
                          <td className="px-6 py-4 text-sm">
                            {item.start_time} - {item.end_time}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            {item.course_name || getField(item, 'course_title') || item.course}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.room || '-'}
                          </td>
                        </tr>
                      ))
                    : null
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const demoSchedule = [
  { day: 'mon', start_time: '09:00', end_time: '11:00', course: 'ЖРТ Математика', room: '101' },
  { day: 'mon', start_time: '11:30', end_time: '13:30', course: 'ЖРТ Кыргыз тили', room: '102' },
  { day: 'tue', start_time: '09:00', end_time: '11:00', course: 'Интенсив', room: '201' },
  { day: 'wed', start_time: '09:00', end_time: '11:00', course: 'ЖРТ Математика', room: '101' },
  { day: 'wed', start_time: '14:00', end_time: '16:00', course: 'Практика', room: '103' },
  { day: 'thu', start_time: '09:00', end_time: '11:00', course: 'ЖРТ Кыргыз тили', room: '102' },
  { day: 'fri', start_time: '09:00', end_time: '12:00', course: 'Интенсив', room: '201' },
  { day: 'sat', start_time: '10:00', end_time: '13:00', course: 'Практика тест', room: '101' },
];
