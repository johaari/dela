export default function IkeaLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSizes = { sm: '20px', md: '26px', lg: '36px' };
  return (
    <span
      className="font-serif font-bold tracking-tight text-ikea-text select-none"
      style={{ fontSize: fontSizes[size], letterSpacing: '0.04em' }}
    >
      DELA
    </span>
  );
}
