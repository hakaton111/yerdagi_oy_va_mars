// Umumiy tiplar — barcha jamoa a'zolari shu tipga asoslanib ishlaydi.
// Bu faylga faqat Odilbek (merge paytida) o'zgartirish kiritadi, boshqalar faqat o'qib foydalanadi.

export type AnalogPlanet = 'moon' | 'mars' | 'both';

export type TerrainTag =
  | 'desert'
  | 'volcanic'
  | 'crater'
  | 'polar'
  | 'salt-flat'
  | 'canyon'
  | 'arctic';

export type ConfidenceLevel = 'verified' | 'approximate' | 'illustrative';

export interface SimilarityPoint {
  title: string;
  description: string;
}

export interface DifferencePoint {
  title: string;
  description: string;
}

export interface SourceRef {
  label: string;
  url: string;
}

export interface EarthLocation {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  analogPlanet: AnalogPlanet;
  terrainTags: TerrainTag[];
  shortDescription: string;
  scientificContext: string;
  confidenceLevel: ConfidenceLevel;
  earthImage: string;
  referenceImage: string;
  referenceCaption: string;
  similarities: SimilarityPoint[];
  differences: DifferencePoint[];
  sources: SourceRef[];
}
