# РЕКОРД — Окуу борборунун веб-сайты

**"Рекорд"** — Ош шаарындагы ЖРТ/ОРТ (Жалпы Республикалык Тестирлөө) даярдоо борборунун толук функционалдуу веб-тиркемеси.

> Директор: Нишанов Шекербек | 8+ жыл тажрыйба | 200+ балл алган окуучулар

---

## Сайт жөнүндө

### Коомдук бөлүк (студенттер көрөт)

| Бет | Мазмуну |
|-----|---------|
| **Башкы бет** | Hero-блок, статистика (жыл, окуучулар, сертификаттар), акциялар, тез байланыш |
| **Биз жөнүндө** | Борбордун тарыхы, миссиясы, директор жөнүндө |
| **Курстар** | Категория боюнча фильтр, ар бир курстун баасы/узактыгы/башталыш датасы |
| **Расписание** | Жума боюнча сабактардын таблицасы |
| **Окутуучулар** | Сүрөт, аты-жөнү, предмети, тажрыйбасы |
| **Жетишкендиктер** | Статистика + 200+ балл алган окуучулардын тизмеси |
| **Отзывдар** | Окуучулардын пикирлери + отзыв калтыруу формасы (модерация менен) |
| **Жаңылыктар** | Акциялар, жаңы курстар, ЖРТ жаңылыктары |
| **Байланыштар** | Филиалдар, дарек, телефон, WhatsApp, жазылуу формасы |

### Админ панель (кызматкерлер көрөт)

`/panel/login` дареги аркылуу кирүү. Техникалык билим талап кылбайт.

| Бөлүм | Мүмкүнчүлүк |
|-------|-------------|
| **Dashboard** | Жалпы статистика: жаңы кайрылуулар, күтүүдөгү отзывдар |
| **Курстар** | Курс кошуу/өзгөртүү/жок кылуу, категория башкаруу |
| **Окутуучулар** | Мугалим кошуу/өзгөртүү/жок кылуу |
| **Расписание** | Күн/убакыт/аудитория боюнча сабак кошуу |
| **Отзывдар** | Окуучулардын отзывдарын жарыялоо/четке кагуу |
| **Жетишкендиктер** | Сайттагы статистиканы өзгөртүү |
| **Жаңылыктар** | Жаңылык/акция жарыялоо |
| **Кайрылуулар** | Жазылуу формаларын көрүү, WhatsApp/чалуу |
| **Филиалдар** | Филиал кошуу/өзгөртүү |

### Кошумча мүмкүнчүлүктөр

- **3 тилдик колдоо**: Кыргызча, Орусча, Англисче (тил которгуч)
- **WhatsApp интеграция**: Даяр билдирүү менен WhatsApp ачылат
- **Email билдирүүлөр**: Жаңы кайрылуу/отзыв келгенде админге email жөнөтүлөт
- **Мобильдик версия**: Бардык беттер телефондо да иштейт
- **JWT аутентификация**: Коопсуз админ кирүү системасы

---

## Технологиялар

| Катмар | Технология |
|--------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, React Router, react-i18next |
| Backend | Django 5.1, Django REST Framework, SimpleJWT |
| Database | SQLite (локалдык), PostgreSQL (продакшн) |
| Тил колдоо | react-i18next (frontend), Django i18n (backend) |

---

## Проект структурасы

```
record-education/
├── backend/                 # Django backend
│   ├── config/              # Settings, URLs
│   ├── courses/             # Курстар + расписание
│   ├── teachers/            # Окутуучулар
│   ├── reviews/             # Отзывдар + жетишкендиктер + студент feedback
│   ├── news/                # Жаңылыктар
│   ├── contacts/            # Байланыш формасы + филиалдар
│   ├── admin_api/           # Админ панелдин API'си (JWT менен)
│   ├── requirements.txt
│   └── manage.py
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Navbar, Footer, WhatsApp button
│   │   ├── pages/           # Коомдук беттер (9 бет)
│   │   ├── admin/           # Админ панель (login, dashboard, CRUD pages)
│   │   ├── locales/         # Которуулар (ky, ru, en)
│   │   ├── hooks/           # useLocalized
│   │   └── utils/           # API client (axios)
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Локалдык иштетүү

### Талаптар

- **Python** 3.10 же жогору
- **Node.js** 18 же жогору (npm менен)
- **Git**

### 1. Репозиторийди клондоо

```bash
git clone https://github.com/alidin000/record-education.git
cd record-education
```

### 2. Backend орнотуу

```bash
cd backend

# Виртуалдык чөйрө түзүү
python -m venv venv

# Активдештирүү
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Зарыл пакеттерди орнотуу
pip install -r requirements.txt

# Environment файлын түзүү
cp .env.example .env
# .env файлын ачып SECRET_KEY'ди өзгөртүңүз (каалаган текст жаз)

# Маалымат базасын даярдоо
python manage.py migrate

# Админ аккаунт түзүү (логин/пароль сурайт)
python manage.py createsuperuser

# Серверди иштетүү
python manage.py runserver
```

Backend иштеп жатат: **http://localhost:8000**
Django admin: **http://localhost:8000/admin/**

### 3. Frontend орнотуу (жаңы терминалда)

```bash
cd frontend

# Пакеттерди орнотуу
npm install

# Dev серверди иштетүү
npm run dev
```

Frontend иштеп жатат: **http://localhost:5173**

### 4. Сайтты ачуу

| URL | Эмне |
|-----|------|
| http://localhost:5173 | Коомдук сайт (студенттер көрөт) |
| http://localhost:5173/panel/login | Админ панель (кызматкерлер) |
| http://localhost:8000/admin/ | Django admin (программист үчүн) |
| http://localhost:8000/api/ | API endpoint тизмеси |

---

## Биринчи мазмун кошуу (кадам-кадам)

Админ панелге кирип (`/panel/login`), createsuperuser'дагы логин/пароль менен кириңиз.

### 1-кадам: Категория кошуу

**Курстар** → **"Категориялар"** баскычы → Категория кошуңуз:
- "ЖРТ Математика" / "ОРТ Математика"
- "ЖРТ Кыргыз тили" / "ОРТ Кыргызский язык"
- "Интенсив" / "Интенсив"

### 2-кадам: Курс кошуу

**Курстар** → **"Жаңы курс"** → Маалыматтарды толтуруңуз:
- Аталышы (Кыргызча жана Русча — милдеттүү, Англисче — каалоо боюнча)
- Категория, узактык, баа, башталыш датасы

### 3-кадам: Окутуучу кошуу

**Окутуучулар** → **"Жаңы окутуучу"** → Аты, предмети, тажрыйбасы

### 4-кадам: Расписание кошуу

**Расписание** → **"Кошуу"** → Курсту тандап, күн/убакыт/аудитория

### 5-кадам: Жетишкендик кошуу

**Жетишкендиктер** → **"Кошуу"** → Маани (мис. "200+") жана аталыш

Баары! Сайт автоматтуу жаңыланат.

---

## API Endpoints

### Коомдук (аутентификациясыз)

| Метод | Endpoint | Сүрөттөмө |
|-------|----------|-----------|
| GET | `/api/courses/` | Курстар (фильтр: `?category=slug`) |
| GET | `/api/categories/` | Категориялар |
| GET | `/api/schedule/` | Расписание |
| GET | `/api/teachers/` | Окутуучулар |
| GET | `/api/reviews/` | Отзывдар (фильтр: `?featured=true`) |
| GET | `/api/achievements/` | Жетишкендиктер |
| GET | `/api/news/` | Жаңылыктар (фильтр: `?category=promo`) |
| GET | `/api/branches/` | Филиалдар |
| POST | `/api/contact/` | Жазылуу формасы |
| GET/POST | `/api/feedback/` | Студент отзывдары (POST — жөнөтүү, GET — жарыяланган) |

### Админ (JWT token керек)

| Метод | Endpoint | Сүрөттөмө |
|-------|----------|-----------|
| POST | `/api/admin/token/` | Логин (username + password → access + refresh token) |
| POST | `/api/admin/token/refresh/` | Token жаңылоо |
| GET | `/api/admin/me/` | Учурдагы колдонуучу |
| GET | `/api/admin/dashboard/` | Статистика |
| CRUD | `/api/admin/courses/` | Курстар башкаруу |
| CRUD | `/api/admin/categories/` | Категориялар |
| CRUD | `/api/admin/teachers/` | Окутуучулар |
| CRUD | `/api/admin/schedule/` | Расписание |
| CRUD | `/api/admin/feedbacks/` | Отзывдар + approve/reject |
| CRUD | `/api/admin/achievements/` | Жетишкендиктер |
| CRUD | `/api/admin/news/` | Жаңылыктар |
| CRUD | `/api/admin/branches/` | Филиалдар |
| CRUD | `/api/admin/contacts/` | Кайрылуулар + mark_processed |

---

## Продакшнго чыгаруу

### Backend

```bash
# .env файлында:
DEBUG=False
SECRET_KEY=<чыныгы-коопсуз-ачкыч>
ALLOWED_HOSTS=record-edu.kg,www.record-edu.kg

# Email (Gmail мисал):
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=director@record-edu.kg

# Static файлдар
python manage.py collectstatic

# Gunicorn менен иштетүү
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm run build
# dist/ папкасын nginx же Vercel/Netlify менен serve кылуу
```

### Сунушталган хостинг варианттары

| Вариант | Баасы | Жакшы жагы |
|---------|-------|------------|
| **Railway.app** | $5/ай | Backend + DB бирге, оңой |
| **Vercel** (frontend) + **Railway** (backend) | $5/ай | Тез, масштабдуу |
| **DigitalOcean Droplet** | $6/ай | Толук контроль |
| **Render.com** | Бекер (чектелген) | Башталгычтар үчүн |

---

## WhatsApp номерди өзгөртүү

`frontend/src/components/WhatsAppButton.jsx` файлында:

```javascript
const WHATSAPP_NUMBER = '996555000000'; // ← Бул жерди өзгөртүңүз
```

---

## Лицензия

MIT

## Автор

Abylkasym uulu Alidin — [@alidin000](https://github.com/alidin000)
