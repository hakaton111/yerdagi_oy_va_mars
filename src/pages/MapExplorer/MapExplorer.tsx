import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { locations } from '../../data/locations';
import type { AnalogPlanet, EarthLocation, TerrainTag } from '../../types/location';
import PlanetBadge from '../../components/common/PlanetBadge';
import './MapExplorer.css';

const PLANET_COLORS: Record<AnalogPlanet, string> = {
  mars: '#ff6a4d',
  moon: '#c9cedb',
  both: '#3aa6ff',
};

const PLANET_FILTERS: { key: 'all' | AnalogPlanet; label: string }[] = [
  { key: 'all', label: 'Barchasi' },
  { key: 'mars', label: 'Mars analoglari' },
  { key: 'moon', label: 'Oy analoglari' },
  { key: 'both', label: 'Ikkisiga ham' },
];

const TERRAIN_LABELS: Record<TerrainTag, string> = {
  desert: "Cho'l",
  volcanic: 'Vulqonik',
  crater: 'Krater',
  polar: "Qutb",
  'salt-flat': "Tuz botqog'i",
  canyon: 'Kanyon',
  arctic: 'Arktika',
};

const ALL_TERRAIN_TAGS = Array.from(
  new Set(locations.flatMap((loc) => loc.terrainTags)),
) as TerrainTag[];

const BASE_LAYERS = {
  standard: {
    label: 'Standart',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  satellite: {
    label: 'Sputnik',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics',
  },
} as const;

type BaseLayerKey = keyof typeof BASE_LAYERS;

function markerIcon(planet: AnalogPlanet, selected: boolean) {
  const size = selected ? 22 : 16;
  return L.divIcon({
    className: `map-marker${selected ? ' map-marker--selected' : ''}`,
    html: `<span style="background:${PLANET_COLORS[planet]}"></span>`,
    iconSize: [size, size],
  });
}

export default function MapExplorer() {
  const [planetFilter, setPlanetFilter] = useState<'all' | AnalogPlanet>('all');
  const [terrainFilter, setTerrainFilter] = useState<Set<TerrainTag>>(new Set());
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [baseLayer, setBaseLayer] = useState<BaseLayerKey>('standard');
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const listItemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter((loc) => {
      if (planetFilter !== 'all' && loc.analogPlanet !== planetFilter) return false;
      if (terrainFilter.size > 0 && !loc.terrainTags.some((t) => terrainFilter.has(t))) {
        return false;
      }
      if (q && !`${loc.name} ${loc.country}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [planetFilter, terrainFilter, query]);

  function toggleTerrain(tag: TerrainTag) {
    setTerrainFilter((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function resetFilters() {
    setPlanetFilter('all');
    setTerrainFilter(new Set());
    setQuery('');
  }

  function selectLocation(loc: EarthLocation) {
    setSelectedId(loc.id);
    setMobileView('map');
    mapRef.current?.flyTo(loc.coordinates, 6, { duration: 1.1 });
    markerRefs.current[loc.id]?.openPopup();
  }

  useEffect(() => {
    if (selectedId) {
      listItemRefs.current[selectedId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedId]);

  useEffect(() => {
    if (mobileView === 'map') {
      // Konteyner display:none dan paydo bo'lganda Leaflet o'lchamni qayta hisoblashi kerak.
      const timer = setTimeout(() => mapRef.current?.invalidateSize(), 50);
      return () => clearTimeout(timer);
    }
  }, [mobileView]);

  const activeLayer = BASE_LAYERS[baseLayer];

  return (
    <div className="map-explorer">
      <div className="map-explorer__mobile-tabs">
        <button
          className={mobileView === 'list' ? 'tab-btn tab-btn--active' : 'tab-btn'}
          onClick={() => setMobileView('list')}
        >
          Ro'yxat
        </button>
        <button
          className={mobileView === 'map' ? 'tab-btn tab-btn--active' : 'tab-btn'}
          onClick={() => setMobileView('map')}
        >
          Xarita
        </button>
      </div>

      <aside
        className="map-explorer__sidebar"
        data-visible={mobileView === 'list'}
      >
        <h2>Xaritada kashf qilish</h2>
        <p className="map-explorer__hint">
          Belgini bosing yoki ro'yxatdan joy tanlang — to'liq ilmiy
          taqqoslashni ko'rish uchun batafsil sahifaga o'tasiz.
        </p>

        <input
          type="search"
          className="map-explorer__search"
          placeholder="Qidirish: nom yoki davlat..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Joy nomi yoki davlat bo'yicha qidirish"
        />

        <div className="map-explorer__filter-group">
          <span className="map-explorer__filter-label">Sayyora</span>
          <div className="map-explorer__filters">
            {PLANET_FILTERS.map((f) => (
              <button
                key={f.key}
                className={f.key === planetFilter ? 'filter-chip filter-chip--active' : 'filter-chip'}
                onClick={() => setPlanetFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="map-explorer__filter-group">
          <span className="map-explorer__filter-label">Relyef turi</span>
          <div className="map-explorer__filters">
            {ALL_TERRAIN_TAGS.map((tag) => (
              <button
                key={tag}
                className={
                  terrainFilter.has(tag) ? 'filter-chip filter-chip--active' : 'filter-chip'
                }
                onClick={() => toggleTerrain(tag)}
              >
                {TERRAIN_LABELS[tag]}
              </button>
            ))}
          </div>
        </div>

        <div className="map-explorer__count">
          {filtered.length} / {locations.length} joy topildi
        </div>

        {filtered.length === 0 ? (
          <div className="map-explorer__empty">
            <p>Ushbu filtrlarga mos joy topilmadi.</p>
            <button className="btn btn--ghost" onClick={resetFilters}>
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <ul className="map-explorer__list">
            {filtered.map((loc) => (
              <li
                key={loc.id}
                ref={(el) => {
                  listItemRefs.current[loc.id] = el;
                }}
                className={loc.id === selectedId ? 'is-selected' : ''}
                role="button"
                tabIndex={0}
                onClick={() => selectLocation(loc)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectLocation(loc);
                  }
                }}
              >
                <div>
                  <strong>{loc.name}</strong>
                  <span>{loc.country}</span>
                </div>
                <PlanetBadge planet={loc.analogPlanet} />
              </li>
            ))}
          </ul>
        )}
      </aside>

      <div className="map-explorer__map" data-visible={mobileView === 'map'}>
        <div className="map-explorer__layer-toggle">
          {(Object.keys(BASE_LAYERS) as BaseLayerKey[]).map((key) => (
            <button
              key={key}
              className={key === baseLayer ? 'layer-btn layer-btn--active' : 'layer-btn'}
              onClick={() => setBaseLayer(key)}
            >
              {BASE_LAYERS[key].label}
            </button>
          ))}
        </div>

        <div className="map-explorer__legend">
          <span>
            <i style={{ background: PLANET_COLORS.mars }} /> Mars
          </span>
          <span>
            <i style={{ background: PLANET_COLORS.moon }} /> Oy
          </span>
          <span>
            <i style={{ background: PLANET_COLORS.both }} /> Ikkisiga ham
          </span>
        </div>

        <MapContainer
          ref={mapRef}
          center={[10, 0]}
          zoom={2}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer key={baseLayer} attribution={activeLayer.attribution} url={activeLayer.url} />
          {filtered.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.coordinates}
              icon={markerIcon(loc.analogPlanet, loc.id === selectedId)}
              ref={(el) => {
                markerRefs.current[loc.id] = el;
              }}
              eventHandlers={{
                click: () => setSelectedId(loc.id),
                popupopen: () => setSelectedId(loc.id),
              }}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.country}
                <br />
                <Link to={`/location/${loc.id}`}>Batafsil &rarr;</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
