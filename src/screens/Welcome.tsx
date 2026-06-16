import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import IkeaLogo from '../components/IkeaLogo';
import Btn from '../components/Btn';
import { useSession } from '../context/SessionContext';
import { copy } from '../data/copy';

function HowItWorksModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        className="relative bg-surface-card rounded-3xl shadow-2xl max-w-lg w-full p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-ink-muted hover:text-ink rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>
        <h2 className="text-2xl font-sans font-black tracking-tight text-ink mb-5">
          {copy.welcome.modal.title}
        </h2>
        <p className="text-base text-ink-secondary leading-relaxed">
          {copy.welcome.modal.body}
        </p>
        <div className="mt-8">
          <Btn onClick={onClose} fullWidth>
            Got it
          </Btn>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Welcome() {
  const navigate = useNavigate();
  const { reset, session } = useSession();
  const [showModal, setShowModal] = useState(false);

  if (!session.member) return <Navigate to="/login" replace />;

  function handleStart() {
    navigate('/intro');
  }

  return (
    <>
      <div className="min-h-screen bg-primary flex flex-col">
        <header className="px-8 pt-6 pb-2">
          <IkeaLogo size="md" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-8 pb-16">
          <motion.div
            className="max-w-2xl w-full text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-24 h-24 mx-auto mb-10 rounded-2xl bg-tile-blue flex items-center justify-center shadow-lg">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="20" r="8" fill="#FFDA1A" />
                <path d="M24 30C16 30 10 34 10 38h28c0-4-6-8-14-8z" fill="#1A3E5A" opacity="0.8" />
                <circle cx="24" cy="20" r="3" fill="#1A3E5A" />
              </svg>
            </div>

            <p className="text-lg text-ink-muted font-medium mb-3">
              {session.member
                ? `Hello, ${session.member.name.split(' ')[0]}.`
                : 'Hello there.'}
            </p>
            <h1 className="text-5xl font-sans font-black tracking-tight leading-tight text-ink mb-5">
              {copy.welcome.headline}
            </h1>
            <p className="text-xl text-ink-secondary leading-relaxed mb-12 max-w-lg mx-auto">
              {copy.welcome.subtext}
            </p>

            <div className="flex flex-col items-center gap-4">
              <Btn onClick={handleStart} className="min-w-[220px]">
                Get started
              </Btn>
              <button
                onClick={() => setShowModal(true)}
                className="text-ink-secondary text-base underline underline-offset-4 hover:text-ink transition-colors min-h-[48px] px-4"
              >
                How does this work?
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="px-8 py-4 flex justify-center">
          <button
            onClick={() => { reset(); navigate('/login'); }}
            className="text-sm text-ink-muted underline-offset-2 hover:text-ink-secondary transition-colors min-h-[48px] px-4"
          >
            Start over
          </button>
        </footer>
      </div>

      <AnimatePresence>
        {showModal && <HowItWorksModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}
