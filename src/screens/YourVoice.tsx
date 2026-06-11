// Screen 4: Bridge between contributing to existing initiatives and submitting a new idea.
// Copy adapts if the user passed on all four initiatives.
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../context/SessionContext';
import PageShell from '../components/PageShell';
import Btn from '../components/Btn';

export default function YourVoice() {
  const navigate = useNavigate();
  const { session } = useSession();

  const allPassed = session.contributions.every((c) => c.passed);
  const hasAny = session.contributions.length > 0;

  return (
    <PageShell>
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        <motion.div
          className="max-w-xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Illustration */}
          <div className="w-24 h-24 mx-auto mb-10 rounded-3xl bg-ikea-yellow flex items-center justify-center shadow-md">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path
                d="M8 36 C8 36 14 28 24 28 C34 28 40 36 40 36"
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="24" cy="18" r="8" fill="#111111" opacity="0.1" />
              <circle cx="24" cy="18" r="5" fill="#0058A3" />
              <path d="M24 13v5l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {allPassed && hasAny ? (
            <>
              <h1 className="text-4xl font-bold text-ikea-text leading-tight mb-4">
                Nothing felt like yours?
                <br />
                That tells us something important.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                The four projects we shared may not speak to everyone in
                Vesterbro. If there's a community or need that isn't on this
                list, that gap matters. What would you put there?
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-ikea-text leading-tight mb-4">
                Your contributions are in.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                We've added what you shared to each project. Is there a
                project missing? Someone who isn't on this list but should be?
              </p>
            </>
          )}

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
