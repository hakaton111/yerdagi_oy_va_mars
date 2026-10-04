import type { AnalogPlanet } from '../../types/location';
import './PlanetBadge.css';

const LABELS: Record<AnalogPlanet, string> = {
  moon: 'Oy analogi',
  mars: 'Mars analogi',
  both: 'Oy + Mars analogi',
};

export default function PlanetBadge({ planet }: { planet: AnalogPlanet }) {
  return <span className={`planet-badge planet-badge--${planet}`}>{LABELS[planet]}</span>;
}
