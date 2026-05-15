/** Allow only known map CDNs in iframes (mitigate javascript: / open redirects). */
export function sanitizeMapEmbedSrc(url) {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();
  if (!u.startsWith('https://')) return null;
  const lower = u.toLowerCase();
  const allowed =
    lower.includes('google.com/maps') ||
    lower.includes('maps.google.com') ||
    lower.includes('googleusercontent.com') ||
    lower.includes('2gis') ||
    lower.includes('maps.gstatic.com');
  return allowed ? u : null;
}

export function openStreetMapEmbedSrc(lat, lon) {
  const la = parseFloat(String(lat));
  const lo = parseFloat(String(lon));
  if (Number.isNaN(la) || Number.isNaN(lo)) return null;
  const d = 0.015;
  const bbox = `${lo - d},${la - d},${lo + d},${la + d}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${la},${lo}`;
}
