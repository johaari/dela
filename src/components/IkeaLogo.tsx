export default function IkeaLogo({
  size = 'md',
  className = 'text-ink',
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const fontSizes = { sm: '20px', md: '26px', lg: '36px' };
  return (
    <span
      className={`font-sans font-black tracking-tight select-none ${className}`}
      style={{ fontSize: fontSizes[size], letterSpacing: '0.04em' }}
    >
      DELA
    </span>
  );
}
