import { Link, useParams } from 'react-router-dom';
import { getLocationById } from '../../data/locations';
import PlanetBadge from '../../components/common/PlanetBadge';
import ConfidenceBadge from '../../components/common/ConfidenceBadge';
import './LocationDetail.css';

// HOJIAKBAR: shu sahifa sening zonang.
// TASK.md: Yer vs Oy/Mars rasm taqqoslash bo'limini (slider yoki yonma-yon)
// yaxshilash, o'xshashlik/farq kartalarini vizual jihatdan boyitish,
// manbalar bo'limini pardozlash shu yerda bajariladi.
// locations massivi yoki umumiy komponentlarga o'zgartirish kiritishdan oldin
// jamoaga xabar bering.

export default function LocationDetail() {
  const { id } = useParams();
  const location = id ? getLocationById(id) : undefined;

  if (!location) {
    return (
      <div className="container location-detail__not-found">
        <h2>Joy topilmadi</h2>
        <p>Siz qidirgan Yer-analog joyi bazada mavjud emas.</p>
        <Link to="/explore" className="btn btn--primary">
          Xaritaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="location-detail">
      <section className="location-detail__header container">
        <Link to="/explore" className="location-detail__back">
          &larr; Xaritaga qaytish
        </Link>
        <div className="location-detail__title-row">
          <h1>{location.name}</h1>
          <PlanetBadge planet={location.analogPlanet} />
        </div>
        <p className="location-detail__country">{location.country}</p>
        <p className="location-detail__desc">{location.shortDescription}</p>
        <ConfidenceBadge level={location.confidenceLevel} />
      </section>

      <section className="location-detail__compare container">
        <div className="compare-card">
          <img src={location.earthImage} alt={location.name} />
          <span className="compare-card__label">Yer — {location.name}</span>
        </div>
        <div className="compare-card">
          <img src={location.referenceImage} alt={location.referenceCaption} />
          <span className="compare-card__label">{location.referenceCaption}</span>
        </div>
      </section>

      <section className="location-detail__context container">
        <h2>Ilmiy kontekst</h2>
        <p>{location.scientificContext}</p>
      </section>

      <section className="location-detail__points container">
        <div className="points-col points-col--similar">
          <h3>O'xshashliklar</h3>
          {location.similarities.map((s) => (
            <div key={s.title} className="point-item">
              <strong>{s.title}</strong>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
        <div className="points-col points-col--diff">
          <h3>Muhim farqlar</h3>
          {location.differences.map((d) => (
            <div key={d.title} className="point-item">
              <strong>{d.title}</strong>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="location-detail__sources container">
        <h3>Manbalar</h3>
        <ul>
          {location.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
