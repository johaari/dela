export default function IkeaLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' };
  return (
    <div className={`inline-flex items-center gap-2 ${sizes[size]}`}>
      <div
        className="bg-ikea-blue rounded-sm flex items-center justify-center px-3"
        style={{ height: '100%' }}
      >
        <span
          className="text-ikea-yellow font-bold tracking-widest"
          style={{ fontSize: size === 'lg' ? '22px' : size === 'md' ? '16px' : '13px' }}
        >
          IKEA
        </span>
      </div>
      <div className="flex flex-col justify-center leading-tight">
        <span
          className="font-semibold text-ikea-text"
          style={{ fontSize: size === 'lg' ? '15px' : size === 'md' ? '12px' : '10px' }}
        >
          Family
        </span>
      </div>
    </div>
  );
}
