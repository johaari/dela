import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

export function useIdleTimer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reset } = useSession();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isIdlePath = false; // idle screen removed
  const isIdeaPath = location.pathname === '/idea';
  const timeout = isIdeaPath ? 3 * 60 * 1000 : 90 * 1000;

  const fire = useCallback(() => {
    reset();
    navigate('/login');
  }, [reset, navigate]);

  const arm = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fire, timeout);
  }, [fire, timeout]);

  useEffect(() => {
    if (isIdlePath) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    arm();

    return () => {
      events.forEach((e) => window.removeEventListener(e, arm));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isIdlePath, arm]);
}
