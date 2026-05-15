import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openStreetMapEmbedSrc, sanitizeMapEmbedSrc } from '../utils/mapEmbeds';

/**
 * @param {{ google_maps_embed_url?: string, two_gis_embed_url?: string, latitude?: string|number|null, longitude?: string|number|null }} branch
 */
export default function BranchMapTabs({ branch }) {
  const { t } = useTranslation();
  const g = sanitizeMapEmbedSrc(branch?.google_maps_embed_url);
  const tg = sanitizeMapEmbedSrc(branch?.two_gis_embed_url);
  const osm = !g && !tg ? openStreetMapEmbedSrc(branch?.latitude, branch?.longitude) : null;

  const tabs = [];
  if (g) tabs.push({ id: 'google', label: 'Google Maps', src: g });
  if (tg) tabs.push({ id: '2gis', label: '2GIS', src: tg });
  if (osm) tabs.push({ id: 'osm', label: t('contacts.map_openstreetmap'), src: osm });

  const defaultId = g ? 'google' : tg ? '2gis' : osm ? 'osm' : '';
  const [active, setActive] = useState(defaultId);

  const current = tabs.find((x) => x.id === active) || tabs[0];

  if (tabs.length === 0) {
    return (
      <div className="record-map-fallback flex min-h-[14rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300/90 bg-gradient-to-br from-slate-100/90 via-white to-sky-50/40 p-6 text-center">
        <p className="text-sm font-medium text-slate-600">{t('contacts.map_placeholder_title')}</p>
        <p className="max-w-md text-xs leading-relaxed text-slate-500">{t('contacts.map_placeholder_help')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/5">
      {tabs.length > 1 ? (
        <div className="flex border-b border-slate-200 bg-slate-50/80">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`flex-1 px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wide transition-colors md:text-sm ${
                current.id === tab.id
                  ? 'bg-white text-primary shadow-[inset_0_-2px_0_0_var(--color-secondary)]'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="relative aspect-[16/10] w-full bg-slate-100">
        <iframe
          title={current.label}
          src={current.src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
