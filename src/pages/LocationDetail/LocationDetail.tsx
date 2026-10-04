import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLocationById, locations } from '../../data/locations';
import type { EarthLocation, TerrainTag } from '../../types/location';
import PlanetBadge from '../../components/common/PlanetBadge';
import ConfidenceBadge from '../../components/common/ConfidenceBadge';
import ImageCompare from './ImageCompare';
import SafeImage from './SafeImage';
import './LocationDetail.css';

// HOJIAKBAR: shu sahifa sening zonang.
// Rasm taqqoslash (slider + lightbox) — ImageCompare.tsx da.
// locations massivi yoki umumiy komponentlarga o'zgartirish kiritishdan oldin
// jamoaga xabar bering.

const TERRAIN_LABELS: Record<TerrainTag, string> = {
  desert: "Cho'l",
  volcanic: 'Vulqonik',
  crater: 'Krater',
  polar: 'Qutbiy',
  'salt-flat': "Sho'rxok",
  canyon: 'Kanyon',
  arctic: 'Arktika',
};

function formatCoords([lat, lng]: [number, number]) {
  const latStr = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'sh.k.' : 'j.k.'}`;
  const lngStr = `${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? 'sh.u.' : "g'.u."}`;
  return `${latStr}, ${lngStr}`;
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NotFound({ id }: { id?: string }) {
  useEffect(() => {
    document.title = 'Joy topilmadi — Yer Analoglari';
  }, []);

  return (
    <div className="container location-detail__not-found">
      <div className="not-found__orbit" aria-hidden="true">
        <span className="not-found__planet" />
        <span className="not-found__moon" />
      </div>
      <p className="not-found__code">404</p>
      <h1>Joy topilmadi</h1>
      <p className="not-found__text">
        {id ? (
          <>
            <code>{id}</code> identifikatorli Yer-analog joyi bazada mavjud emas.
          </>
        ) : (
          'Siz qidirgan Yer-analog joyi bazada mavjud emas.'
        )}{' '}
        Quyidagi {locations.length} ta tadqiq qilingan joydan birini tanlang:
      </p>
      <ul className="not-found__list">
        {locations.map((l) => (
          <li key={l.id}>
            <Link to={`/location/${l.id}`} className={`not-found__chip not-found__chip--${l.analogPlanet}`}>
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/explore" className="ld-btn ld-btn--primary">
        Xaritaga qaytish
      </Link>
    </div>
  );
}

function PointCard({
  kind,
  index,
  title,
  description,
}: {
  kind: 'similar' | 'diff';
  index: number;
  title: string;
  description: string;
}) {
  return (
    <article className={`point-item point-item--${kind}`} style={{ animationDelay: `${index * 70}ms` }}>
      <span className={`point-icon point-icon--${kind}`} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </article>
  );
}

function NeighborLink({ location, dir }: { location: EarthLocation; dir: 'prev' | 'next' }) {
  return (
    <Link to={`/location/${location.id}`} className={`neighbor neighbor--${dir}`} rel={dir}>
      <span className="neighbor__thumb">
        <SafeImage src={location.earthImage} alt="" width={330} lazy />
      </span>
      <span className="neighbor__text">
        <span className="neighbor__dir">
          {dir === 'prev' && <span className="chevron chevron--left" aria-hidden="true" />}
          {dir === 'prev' ? 'Oldingi joy' : 'Keyingi joy'}
          {dir === 'next' && <span className="chevron chevron--right" aria-hidden="true" />}
        </span>
        <span className="neighbor__name">{location.name}</span>
        <PlanetBadge planet={location.analogPlanet} />
      </span>
    </Link>
  );
}

export default function LocationDetail() {
  const { id } = useParams();
  const location = id ? getLocationById(id) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (location) document.title = `${location.name} — Yer Analoglari`;
  }, [location]);

  if (!location) return <NotFound id={id} />;

  const index = locations.findIndex((l) => l.id === location.id);
  const total = locations.length;
  const prev = locations[(index - 1 + total) % total];
  const next = locations[(index + 1) % total];

  const simCount = location.similarities.length;
  const diffCount = location.differences.length;
  const simShare = (simCount / Math.max(1, simCount + diffCount)) * 100;
  const [lat, lng] = location.coordinates;

  return (
    <div className={`location-detail location-detail--${location.analogPlanet}`} key={location.id}>
      <section className="location-detail__hero">
        <div className="location-detail__hero-bg" aria-hidden="true">
          <SafeImage src={location.earthImage} alt="" width={960} />
        </div>
        <div className="location-detail__header container">
          <nav className="location-detail__crumbs" aria-label="Navigatsiya">
            <Link to="/explore" className="location-detail__back">
              <span className="chevron chevron--left" aria-hidden="true" /> Xaritaga qaytish
            </Link>
            <span className="location-detail__counter">
              {index + 1} / {total}
            </span>
          </nav>
          <div className="location-detail__title-row">
            <h1>{location.name}</h1>
            <PlanetBadge planet={location.analogPlanet} />
          </div>
          <p className="location-detail__country">{location.country}</p>
          <p className="location-detail__desc">{location.shortDescription}</p>
          <ConfidenceBadge level={location.confidenceLevel} />

          <dl className="facts">
            <div className="facts__item">
              <dt>Koordinatalar</dt>
              <dd>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=7/${lat}/${lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {formatCoords(location.coordinates)} <ExternalIcon />
                </a>
              </dd>
            </div>
            <div className="facts__item">
              <dt>Relyef turi</dt>
              <dd className="facts__tags">
                {location.terrainTags.map((t) => (
                  <span key={t} className="terrain-tag">
                    {TERRAIN_LABELS[t] ?? t}
                  </span>
                ))}
              </dd>
            </div>
            <div className="facts__item">
              <dt>Manbalar</dt>
              <dd>{location.sources.length} ta tashqi manba</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="location-detail__compare container">
        <ImageCompare key={location.id} location={location} />
      </section>

      <section className="location-detail__context container">
        <div className="context-card">
          <h2>Ilmiy kontekst</h2>
          <p>{location.scientificContext}</p>
        </div>
      </section>

      <section className="location-detail__balance container" aria-label="O'xshashlik va farqlar nisbati">
        <div className="balance__labels">
          <span className="balance__label balance__label--similar">{simCount} ta o'xshashlik</span>
          <span className="balance__label balance__label--diff">{diffCount} ta muhim farq</span>
        </div>
        <div className="balance__bar">
          <span className="balance__fill balance__fill--similar" style={{ width: `${simShare}%` }} />
          <span className="balance__fill balance__fill--diff" style={{ width: `${100 - simShare}%` }} />
        </div>
        <p className="balance__note">
          Hech bir joy Oy yoki Marsning aynan nusxasi emas — shuning uchun farqlar ham o'xshashliklar
          bilan teng ko'rsatiladi.
        </p>
      </section>

      <section className="location-detail__points container">
        <div className="points-col points-col--similar">
          <h3>O'xshashliklar</h3>
          {location.similarities.map((s, i) => (
            <PointCard key={s.title} kind="similar" index={i} title={s.title} description={s.description} />
          ))}
        </div>
        <div className="points-col points-col--diff">
          <h3>Muhim farqlar</h3>
          {location.differences.map((d, i) => (
            <PointCard key={d.title} kind="diff" index={i} title={d.title} description={d.description} />
          ))}
        </div>
      </section>

      <section className="location-detail__sources container">
        <h3>Manbalar</h3>
        <ol className="sources-list">
          {location.sources.map((s, i) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="source-card">
                <span className="source-card__num">{i + 1}</span>
                <span className="source-card__body">
                  <span className="source-card__label">{s.label}</span>
                  <span className="source-card__host">{hostOf(s.url)}</span>
                </span>
                <ExternalIcon />
              </a>
            </li>
          ))}
        </ol>
      </section>

      {total > 1 && (
        <nav className="location-detail__pager container" aria-label="Joylar orasida navigatsiya">
          <NeighborLink location={prev} dir="prev" />
          <NeighborLink location={next} dir="next" />
        </nav>
      )}
    </div>
  );
}
