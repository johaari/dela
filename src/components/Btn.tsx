import type { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
};

export default function Btn({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-2xl font-extrabold transition-all min-h-[56px] px-8 text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-ink/30 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants: Record<Variant, string> = {
    primary: 'bg-accent text-ink hover:brightness-105 active:brightness-95 shadow-sm',
    secondary: 'bg-surface-card text-ink border-2 border-border-strong hover:border-ink',
    ghost: 'bg-transparent text-ink-secondary underline underline-offset-4 hover:text-ink min-h-[48px] px-4',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
