import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCourses = (category) => {
  const params = category ? { category } : {};
  return api.get('/courses/', { params });
};

export const getCategories = () => api.get('/categories/');

export const getSchedule = () => api.get('/schedule/');

export const getTeachers = () => api.get('/teachers/');

export const getReviews = (featured) => {
  const params = featured ? { featured: 'true' } : {};
  return api.get('/reviews/', { params });
};

export const getAchievements = () => api.get('/achievements/');

export const getNews = (category) => {
  const params = category ? { category } : {};
  return api.get('/news/', { params });
};

export const getBranches = () => api.get('/branches/');

export const submitContact = (data) => api.post('/contact/', data);

export default api;
