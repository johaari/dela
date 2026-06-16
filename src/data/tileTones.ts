export const TILE_TONES = ['blue', 'green', 'amber', 'rose', 'lavender', 'yellow'] as const;
export type TileTone = (typeof TILE_TONES)[number];

export function toneForIndex(i: number): TileTone {
  return TILE_TONES[i % TILE_TONES.length];
}

export const TILE_BG: Record<TileTone, string> = {
  blue: 'bg-tile-blue',
  green: 'bg-tile-green',
  amber: 'bg-tile-amber',
  rose: 'bg-tile-rose',
  lavender: 'bg-tile-lavender',
  yellow: 'bg-tile-yellow',
};

export const TILE_BORDER: Record<TileTone, string> = {
  blue: 'border-tile-blue',
  green: 'border-tile-green',
  amber: 'border-tile-amber',
  rose: 'border-tile-rose',
  lavender: 'border-tile-lavender',
  yellow: 'border-tile-yellow',
};

export const TILE_TEXT: Record<TileTone, string> = {
  blue: 'text-tile-blue-ink',
  green: 'text-tile-green-ink',
  amber: 'text-tile-amber-ink',
  rose: 'text-tile-rose-ink',
  lavender: 'text-tile-lavender-ink',
  yellow: 'text-tile-yellow-ink',
};

// Keeps each initiative's accent consistent across Dashboard, Shape, and Impact.
export const INITIATIVE_TONES: Record<string, TileTone> = {
  afterschool: 'green',
  mentorship: 'amber',
  lgbtq: 'blue',
  kitchen: 'rose',
};
