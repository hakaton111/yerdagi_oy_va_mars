import { Link } from 'react-router-dom';
import type { EarthLocation } from '../../types/location';
import PlanetBadge from './PlanetBadge';
import './LocationCard.css';

export default function LocationCard({ location }: { location: EarthLocation }) {
  return (
    <Link to={`/location/${location.id}`} className="location-card">
      <div className="location-card__image-wrap">
        <img src={location.earthImage} alt={location.name} loading="lazy" />
        <PlanetBadge planet={location.analogPlanet} />
      </div>
      <div className="location-card__body">
        <h3>{location.name}</h3>
        <p className="location-card__country">{location.country}</p>
        <p className="location-card__desc">{location.shortDescription}</p>
      </div>
    </Link>
  );
}
