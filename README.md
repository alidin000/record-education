# РЕКОРД — Education Center Website

A full-stack web application for **"Рекорд" (Record)** education center — the leading ORT/ZhRT exam preparation center in Osh, Kyrgyzstan.

## Features

- **Trilingual support**: Kyrgyz (Кыргызча), Russian (Русский), English
- **Modern responsive UI** with Tailwind CSS
- **Django REST API** backend with admin panel
- **React** frontend with Vite
- Pages: Home, About, Courses, Schedule, Teachers, Achievements, Reviews, News, Contacts
- WhatsApp quick contact button
- Contact form submissions
- Course filtering by category

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, React Router, i18next |
| Backend | Django 5.1, Django REST Framework |
| Database | SQLite (dev), PostgreSQL (prod) |
| i18n | react-i18next (frontend), Django i18n (backend) |

## Project Structure

```
record-education/
├── backend/           # Django project
│   ├── config/        # Django settings & URLs
│   ├── courses/       # Courses & schedule app
│   ├── teachers/      # Teachers app
│   ├── reviews/       # Reviews & achievements app
│   ├── news/          # News/blog app
│   ├── contacts/      # Contact form & branches app
│   └── requirements.txt
├── frontend/          # React (Vite) project
│   ├── src/
│   │   ├── components/   # Navbar, Footer, WhatsApp button
│   │   ├── pages/        # All page components
│   │   ├── locales/      # Translation files (ky, ru, en)
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # API client
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env       # Edit with your settings
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Admin panel: http://localhost:8000/admin/

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173/

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/courses/` | List courses (filter: `?category=slug`) |
| `GET /api/categories/` | Course categories |
| `GET /api/schedule/` | Class schedule |
| `GET /api/teachers/` | Teachers list |
| `GET /api/reviews/` | Student reviews (filter: `?featured=true`) |
| `GET /api/achievements/` | Achievement stats |
| `GET /api/news/` | News articles (filter: `?category=promo`) |
| `GET /api/branches/` | Branch locations |
| `POST /api/contact/` | Submit contact form |

## Adding Content

1. Start the backend server
2. Go to http://localhost:8000/admin/
3. Add courses, teachers, reviews, news, and branch info through the admin panel
4. The frontend will automatically display the data

## Deployment

### Backend (Production)
- Switch to PostgreSQL in `.env`
- Set `DEBUG=False`
- Collect static files: `python manage.py collectstatic`
- Use gunicorn: `gunicorn config.wsgi:application`

### Frontend (Production)
- Build: `npm run build`
- Serve the `dist/` folder with nginx or any static hosting

## License

MIT

## Author

Abylkasym uulu Alidin — [@alidin000](https://github.com/alidin000)
