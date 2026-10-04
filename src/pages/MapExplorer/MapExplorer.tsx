import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { locations } from '../../data/locations';
import type { AnalogPlanet } from '../../types/location';
import PlanetBadge from '../../components/common/PlanetBadge';
import './MapExplorer.css';

// ODILBEK: shu sahifa sening zonang.
// TASK.md: filtr UI'ni yaxshilash, satellite/standard layer almashtirish,
// marker klasterlash, sidebar qidiruv va boshqa xarita funksiyalari shu yerda.
// locations massivi yoki umumiy komponentlarga (PlanetBadge, LocationCard)
// o'zgartirish kiritishdan oldin jamoaga xabar bering (merge konfliktlarini oldini olish uchun).

const PLANET_COLORS: Record<AnalogPlanet, string> = {
  mars: '#ff6a4d',
  moon: '#c9cedb',
  both: '#3aa6ff',
};

function markerIcon(planet: AnalogPlanet) {
  return L.divIcon({
    className: 'map-marker',
    html: `<span style="background:${PLANET_COLORS[planet]}"></span>`,
    iconSize: [16, 16],
  });
}

const FILTERS: { key: 'all' | AnalogPlanet; label: string }[] = [
  { key: 'all', label: 'Barchasi' },
  { key: 'mars', label: 'Mars analoglari' },
  { key: 'moon', label: 'Oy analoglari' },
  { key: 'both', label: 'Ikkisiga ham' },
];

export default function MapExplorer() {
  const [filter, setFilter] = useState<'all' | AnalogPlanet>('all');
  const navigate = useNavigate();

  const filtered = useMemo(
    () => (filter === 'all' ? locations : locations.filter((l) => l.analogPlanet === filter)),
    [filter],
  );

  return (
    <div className="map-explorer">
      <aside className="map-explorer__sidebar">
        <h2>Xaritada kashf qilish</h2>
        <p className="map-explorer__hint">
          Belgini bosing yoki ro'yxatdan joy tanlang — to'liq ilmiy
          taqqoslashni ko'rish uchun batafsil sahifaga o'tasiz.
        </p>
        <div className="map-explorer__filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={f.key === filter ? 'filter-chip filter-chip--active' : 'filter-chip'}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ul className="map-explorer__list">
          {filtered.map((loc) => (
            <li key={loc.id} onClick={() => navigate(`/location/${loc.id}`)}>
              <div>
                <strong>{loc.name}</strong>
                <span>{loc.country}</span>
              </div>
              <PlanetBadge planet={loc.analogPlanet} />
            </li>
          ))}
        </ul>
      </aside>

      <div className="map-explorer__map">
        <MapContainer center={[10, 0]} zoom={2} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((loc) => (
            <Marker key={loc.id} position={loc.coordinates} icon={markerIcon(loc.analogPlanet)}>
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.country}
                <br />
                <a href={`/location/${loc.id}`}>Batafsil &rarr;</a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
