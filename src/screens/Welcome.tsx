// Screen 1: Entry point. Introduces the concept and invites the user to get started.
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import IkeaLogo from '../components/IkeaLogo';
import Btn from '../components/Btn';
import { useSession } from '../context/SessionContext';

function HowItWorksModal({ onClose }: { onClose: () => void }) {
  const steps = [
    {
      number: '1',
      title: "See what's forming",
      body: 'Four local projects are taking shape in Vesterbro. Each one is real, and each one is still being figured out.',
    },
    {
      number: '2',
      title: 'Add what you bring',
      body: "Share a perspective, name a gap, offer a skill or connection, or just say you're behind it. Every input goes directly into the working notes.",
    },
    {
      number: '3',
      title: 'Watch it grow',
      body: "After you contribute, you see what you shaped and what other neighbours have added too. These projects don't happen without you.",
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>
        <h2 className="text-2xl font-bold text-ikea-text mb-6">How it works</h2>
        <ol className="space-y-6">
          {steps.map((s) => (
            <li key={s.number} className="flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-ikea-blue text-white flex items-center justify-center font-bold text-base">
                {s.number}
              </span>
              <div>
                <p className="font-semibold text-lg text-ikea-text">{s.title}</p>
                <p className="text-base text-gray-600 mt-1 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
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
      <div className="min-h-screen bg-ikea-bg flex flex-col">
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
            {/* Decorative map/neighbourhood illustration */}
            <div className="w-24 h-24 mx-auto mb-10 rounded-2xl bg-ikea-blue flex items-center justify-center shadow-lg">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="24" cy="20" r="8" fill="#FFDB00" />
                <path
                  d="M24 30C16 30 10 34 10 38h28c0-4-6-8-14-8z"
                  fill="white"
                  opacity="0.8"
                />
                <circle cx="24" cy="20" r="3" fill="#0058A3" />
              </svg>
            </div>

            <p className="text-lg text-gray-500 font-medium mb-3">
              {session.member
                ? `Hello, ${session.member.name.split(' ')[0]}.`
                : 'Hello there.'}
            </p>
            <h1 className="text-5xl font-bold text-ikea-text leading-tight mb-5">
              Help shape Vesterbro.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-lg mx-auto">
              Four local projects are taking shape. As an IKEA Family member,
              you help decide what they become.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Btn onClick={handleStart} className="min-w-[220px]">
                Get started
              </Btn>
              <button
                onClick={() => setShowModal(true)}
                className="text-ikea-blue text-base underline underline-offset-4 hover:text-blue-700 transition-colors min-h-[48px] px-4"
              >
                How does this work?
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="px-8 py-4 flex justify-center">
          <button
            onClick={() => { reset(); navigate('/login'); }}
            className="text-sm text-gray-400 underline-offset-2 hover:text-gray-600 transition-colors min-h-[48px] px-4"
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
