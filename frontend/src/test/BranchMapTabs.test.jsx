import { describe, it, expect } from 'vitest';
import { sanitizeMapEmbedSrc, openStreetMapEmbedSrc } from '../utils/mapEmbeds';

describe('BranchMapTabs helpers', () => {
  it('sanitizeMapEmbedSrc accepts Google Maps embed https URL', () => {
    const u = 'https://www.google.com/maps/embed?pb=abc';
    expect(sanitizeMapEmbedSrc(u)).toBe(u);
  });

  it('sanitizeMapEmbedSrc accepts 2GIS https URL', () => {
    const u = 'https://widgets.2gis.com/demo';
    expect(sanitizeMapEmbedSrc(u)).toBe(u);
  });

  it('sanitizeMapEmbedSrc rejects non-https', () => {
    expect(sanitizeMapEmbedSrc('http://evil.com')).toBeNull();
    expect(sanitizeMapEmbedSrc('javascript:alert(1)')).toBeNull();
  });

  it('sanitizeMapEmbedSrc rejects unknown host', () => {
    expect(sanitizeMapEmbedSrc('https://evil.example/map')).toBeNull();
  });

  it('openStreetMapEmbedSrc builds bbox embed', () => {
    const src = openStreetMapEmbedSrc(40.5, 72.8);
    expect(src).toContain('openstreetmap.org');
    expect(src).toContain('marker=40.5,72.8');
  });

  it('openStreetMapEmbedSrc returns null for invalid coords', () => {
    expect(openStreetMapEmbedSrc('x', 'y')).toBeNull();
  });
});
