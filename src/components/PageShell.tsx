import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import IkeaLogo from './IkeaLogo';

type Props = {
  children: ReactNode;
  showLogo?: boolean;
  className?: string;
};

export default function PageShell({ children, showLogo = true, className = '' }: Props) {
  const { reset } = useSession();
  const navigate = useNavigate();

  function handleReset() {
    reset();
    navigate('/');
  }

  return (
    <div className={`min-h-screen bg-ikea-bg flex flex-col ${className}`}>
      {showLogo && (
        <header className="px-8 pt-6 pb-2 flex items-center justify-between">
          <IkeaLogo size="md" />
          <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">
            Community Voice
          </span>
        </header>
      )}
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="px-8 py-4 flex justify-center">
        <button
          onClick={handleReset}
          className="text-sm text-gray-400 underline-offset-2 hover:text-gray-600 transition-colors min-h-[48px] px-4"
        >
          Start over
        </button>
      </footer>
    </div>
  );
}
