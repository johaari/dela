import { TILE_BG, TILE_TEXT, type TileTone } from '../data/tileTones';

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  tone?: TileTone;
};

export default function Tag({ label, active = false, onClick, size = 'md', tone }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-full border font-extrabold transition-colors select-none';
  const sizeClass = size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base';
  const activeClass = tone
    ? `${TILE_BG[tone]} ${TILE_TEXT[tone]} border-transparent`
    : 'bg-ink text-white/80 border-ink';
  const stateClass = active
    ? activeClass
    : 'bg-surface-card text-ink border-border hover:border-border-strong';
  const interactiveClass = onClick ? 'cursor-pointer min-h-[48px]' : 'cursor-default';

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      className={`${base} ${sizeClass} ${stateClass} ${interactiveClass}`}
    >
      {label}
    </span>
  );
}
