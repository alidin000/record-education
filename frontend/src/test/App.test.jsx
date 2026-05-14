import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: vi.fn(), language: 'ru' },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('../utils/api', () => ({
  getCourses: vi.fn().mockResolvedValue({ data: { results: [] } }),
  getCategories: vi.fn().mockResolvedValue({ data: [] }),
  getTeachers: vi.fn().mockResolvedValue({ data: { results: [] } }),
  getReviews: vi.fn().mockResolvedValue({ data: { results: [] } }),
  getAchievements: vi.fn().mockResolvedValue({ data: [] }),
  getNews: vi.fn().mockResolvedValue({ data: { results: [] } }),
  getBranches: vi.fn().mockResolvedValue({ data: [] }),
  getFeedbacks: vi.fn().mockResolvedValue({ data: { results: [] } }),
  submitContact: vi.fn().mockResolvedValue({ data: {} }),
  submitFeedback: vi.fn().mockResolvedValue({ data: {} }),
}))

describe('App renders without crashing', () => {
  it('renders the home page', async () => {
    const { default: App } = await import('../App')
    render(<App />)
    expect(document.body).toBeTruthy()
  })
})
