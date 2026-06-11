// Screen 2: Quick orientation. Three swipeable slides before the user enters the main flow.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Btn from '../components/Btn';
import PageShell from '../components/PageShell';

const slides = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="8" y="12" width="48" height="36" rx="6" fill="#0058A3" opacity="0.15" />
        <rect x="16" y="20" width="14" height="20" rx="3" fill="#0058A3" />
        <rect x="34" y="28" width="14" height="12" rx="3" fill="#FFDB00" />
        <circle cx="44" cy="20" r="7" fill="#0A8A4A" opacity="0.9" />
        <path d="M41 20l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Four local projects are in the works. None of them are finished without you.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="#FFDB00" opacity="0.2" />
        <path d="M20 32h24M32 20v24" stroke="#0058A3" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="32" r="5" fill="#0058A3" />
        <circle cx="20" cy="24" r="3" fill="#FFDB00" stroke="#0058A3" strokeWidth="1.5" />
        <circle cx="44" cy="24" r="3" fill="#FFDB00" stroke="#0058A3" strokeWidth="1.5" />
        <circle cx="20" cy="40" r="3" fill="#FFDB00" stroke="#0058A3" strokeWidth="1.5" />
        <circle cx="44" cy="40" r="3" fill="#FFDB00" stroke="#0058A3" strokeWidth="1.5" />
      </svg>
    ),
    text: 'Add what\'s missing, share what you can offer, or bring a new idea to the table.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M12 44 L22 28 L32 36 L44 16 L52 22" stroke="#0058A3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="52" cy="22" r="5" fill="#FFDB00" stroke="#0058A3" strokeWidth="2" />
        <path d="M12 48h40" stroke="#E0E0E0" strokeWidth="2" />
      </svg>
    ),
    text: 'Watch your contribution become part of what IKEA builds with Vesterbro.',
  },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Intro() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = index === slides.length - 1;

  function next() {
    if (isLast) {
      navigate('/shape');
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  }

  function prev() {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  }

  return (
    <PageShell>
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        {/* Dots */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all min-h-[12px] ${
                i === index
                  ? 'w-8 h-3 bg-ikea-blue'
                  : 'w-3 h-3 bg-ikea-border'
              }`}
            />
          ))}
        </div>

        <div className="w-full max-w-xl overflow-hidden relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-28 h-28 rounded-3xl bg-white shadow-md flex items-center justify-center mb-10">
                {slides[index].icon}
              </div>
              <p className="text-3xl font-semibold text-ikea-text leading-snug max-w-md">
                {slides[index].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 w-full max-w-sm">
          <Btn onClick={next} fullWidth>
            {isLast ? "I'm ready" : 'Next'}
          </Btn>
          {index > 0 && (
            <Btn variant="ghost" onClick={prev}>
              Back
            </Btn>
          )}
        </div>
      </div>
    </PageShell>
  );
}
