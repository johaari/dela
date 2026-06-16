import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../context/SessionContext';
import PageShell from '../components/PageShell';
import Btn from '../components/Btn';
import { copy } from '../data/copy';

export default function YourVoice() {
  const navigate = useNavigate();
  const { session } = useSession();

  const allPassed = session.contributions.every((c) => c.passed);
  const hasAny = session.contributions.length > 0;

  const c = allPassed && hasAny ? copy.yourVoice.allPassed : copy.yourVoice.default;

  return (
    <PageShell>
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        <motion.div
          className="max-w-xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="w-24 h-24 mx-auto mb-10 rounded-3xl bg-accent flex items-center justify-center shadow-md">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path
                d="M8 36 C8 36 14 28 24 28 C34 28 40 36 40 36"
                stroke="#1A1A18"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="24" cy="18" r="8" fill="#1A1A18" opacity="0.1" />
              <circle cx="24" cy="18" r="5" fill="#1A1A18" />
              <path d="M24 13v5l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="text-4xl font-sans font-black tracking-tight text-ink leading-tight mb-4">
            {c.headline}
          </h1>
          <p className="text-xl text-ink-secondary leading-relaxed mb-10">
            {c.subtext}
          </p>

          <div className="flex flex-col items-center gap-4">
            <Btn onClick={() => navigate('/idea')} fullWidth>
              Yes, I have an idea
            </Btn>
            <Btn variant="secondary" onClick={() => navigate('/impact')} fullWidth>
              Not this time
            </Btn>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
