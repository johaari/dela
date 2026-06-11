type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
};

export default function Tag({ label, active = false, onClick, size = 'md' }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-full border font-medium transition-colors select-none';
  const sizeClass = size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base';
  const stateClass = active
    ? 'bg-ikea-blue text-white border-ikea-blue'
    : 'bg-white text-ikea-text border-ikea-border hover:border-ikea-blue';
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
