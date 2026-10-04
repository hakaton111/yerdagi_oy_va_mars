import type { ConfidenceLevel } from '../../types/location';
import './ConfidenceBadge.css';

const LABELS: Record<ConfidenceLevel, string> = {
  verified: 'Ilmiy tadqiqotlarda tasdiqlangan',
  approximate: 'Taxminiy o\'xshashlik',
  illustrative: 'Tushuntiruvchi taqqoslash',
};

export default function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  return (
    <span className={`confidence-badge confidence-badge--${level}`}>
      <span className="confidence-badge__dot" />
      {LABELS[level]}
    </span>
  );
}
