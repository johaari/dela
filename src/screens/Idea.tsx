// Screen 5: Multi-step form for submitting a new initiative idea, one question at a time.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Idea as IdeaType } from '../data/types';
import { useSession } from '../context/SessionContext';
import PageShell from '../components/PageShell';
import Btn from '../components/Btn';
import Tag from '../components/Tag';

const FOR_WHO_OPTIONS = [
  'Youth', 'Elderly', 'Migrants', 'LGBTQ+', 'Unhoused', 'Women', 'Families', 'Other',
];
const NEEDS_OPTIONS = [
  'Space', 'Materials', 'People', 'Funding', 'Knowledge',
];

type Draft = {
  oneLiner: string;
  forWho: string[];
  forWhoOther: string;
  needs: string[];
  whoShouldBeInvolved: string;
  extra: string;
};

const emptyDraft = (): Draft => ({
  oneLiner: '',
  forWho: [],
  forWhoOther: '',
  needs: [],
  whoShouldBeInvolved: '',
  extra: '',
});

const TOTAL_STEPS = 6;

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex gap-2 justify-center mb-10">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all ${
            i < step
              ? 'w-5 bg-ikea-blue opacity-60'
              : i === step
              ? 'w-7 bg-ikea-blue'
              : 'w-5 bg-ikea-border'
          }`}
        />
      ))}
    </div>
  );
}

export default function Idea() {
  const navigate = useNavigate();
  const { saveIdea } = useSession();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [draft, setDraft] = useState<Draft>(emptyDraft());

  function goNext() {
    setDir(1);
    setStep((s) => s + 1);
  }
  function goBack() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  function handleForWhoToggle(val: string) {
    setDraft((d) => {
      const alreadySelected = d.forWho.includes(val);
      return {
        ...d,
        forWho: alreadySelected
          ? d.forWho.filter((v) => v !== val)
          : [...d.forWho, val],
        forWhoOther: val === 'Other' && alreadySelected ? '' : d.forWhoOther,
      };
    });
  }

  function toggleMulti(key: 'needs', val: string) {
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(val)
        ? d[key].filter((v) => v !== val)
        : [...d[key], val],
    }));
  }

  function submit() {
    const idea: IdeaType = {
      oneLiner: draft.oneLiner,
      forWho: draft.forWho,
      forWhoOther:
        draft.forWho.includes('Other') && draft.forWhoOther.trim()
          ? draft.forWhoOther.trim()
          : undefined,
      needs: draft.needs,
      whoShouldBeInvolved: draft.whoShouldBeInvolved || undefined,
      extra: draft.extra || undefined,
      timestamp: Date.now(),
    };
    saveIdea(idea);
    navigate('/impact');
  }

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 50 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -50 }),
  };

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="text-3xl font-bold text-ikea-text mb-3">
              What's your idea, in one sentence?
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Just the heart of it. You can add more in the next steps.
            </p>
            <textarea
              autoFocus
              value={draft.oneLiner}
              onChange={(e) =>
                setDraft((d) => ({ ...d, oneLiner: e.target.value }))
              }
              placeholder="e.g. A weekly meeting place for elderly women who live alone in Vesterbro."
              rows={3}
              className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-lg text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue resize-none"
            />
            <div className="mt-6">
              <Btn onClick={goNext} fullWidth disabled={!draft.oneLiner.trim()}>
                Continue <ChevronRight size={18} className="ml-1" />
              </Btn>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-3xl font-bold text-ikea-text mb-3">
              Who would this be for?
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Pick as many as feel right.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {FOR_WHO_OPTIONS.map((opt) => (
                <Tag
                  key={opt}
                  label={opt}
                  active={draft.forWho.includes(opt)}
                  onClick={() => handleForWhoToggle(opt)}
                />
              ))}
            </div>
            {draft.forWho.includes('Other') && (
              <div className="mb-6">
                <input
                  type="text"
                  value={draft.forWhoOther}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, forWhoOther: e.target.value }))
                  }
                  placeholder="Tell us who you have in mind."
                  className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-base text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue"
                />
              </div>
            )}
            <div className="flex gap-3">
              <Btn variant="secondary" onClick={goBack}>
                Back
              </Btn>
              <Btn onClick={goNext} fullWidth disabled={draft.forWho.length === 0}>
                Continue
              </Btn>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-3xl font-bold text-ikea-text mb-3">
              What would it need to happen?
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Pick everything that applies.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {NEEDS_OPTIONS.map((opt) => (
                <Tag
                  key={opt}
                  label={opt}
                  active={draft.needs.includes(opt)}
                  onClick={() => toggleMulti('needs', opt)}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <Btn variant="secondary" onClick={goBack}>
                Back
              </Btn>
              <Btn onClick={goNext} fullWidth disabled={draft.needs.length === 0}>
                Continue
              </Btn>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-3xl font-bold text-ikea-text mb-3">
              Who in Vesterbro should be part of this?
            </h2>
            <p className="text-base text-gray-500 mb-6">
              A person, a group, an organisation. Anyone who comes to mind.
              This is optional.
            </p>
            <textarea
              value={draft.whoShouldBeInvolved}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  whoShouldBeInvolved: e.target.value,
                }))
              }
              placeholder="e.g. Gaderummet, the local women's shelter, Vesterbro Ny Skole..."
              rows={3}
              className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-lg text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue resize-none"
            />
            <div className="flex gap-3 mt-6">
              <Btn variant="secondary" onClick={goBack}>
                Back
              </Btn>
              <Btn onClick={goNext} fullWidth>
                Continue
              </Btn>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-3xl font-bold text-ikea-text mb-3">
              Anything else you want IKEA to know?
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Add context, a story, or a concern. Or skip ahead. This is
              optional.
            </p>
            <textarea
              value={draft.extra}
              onChange={(e) =>
                setDraft((d) => ({ ...d, extra: e.target.value }))
              }
              placeholder="Write as freely as you like."
              rows={4}
              className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-lg text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue resize-none"
            />
            <div className="flex gap-3 mt-6">
              <Btn variant="secondary" onClick={goBack}>
                Back
              </Btn>
              <Btn onClick={goNext} fullWidth>
                {draft.extra.trim() ? 'Continue' : 'Skip'}
              </Btn>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-3xl font-bold text-ikea-text mb-2">
              Does this look right?
            </h2>
            <p className="text-base text-gray-500 mb-7">
              Review your idea before sending it to IKEA Family.
            </p>
            <div className="bg-ikea-bg rounded-2xl p-5 space-y-4 mb-8">
              <div>
                <p className="text-xs font-semibold text-ikea-blue uppercase tracking-widest mb-1">
                  Your idea
                </p>
                <p className="text-lg font-medium text-ikea-text">
                  {draft.oneLiner}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-ikea-blue uppercase tracking-widest mb-1">
                  For
                </p>
                <div className="flex flex-wrap gap-2">
                  {draft.forWho.map((w) => (
                    <span
                      key={w}
                      className="bg-white border border-ikea-border rounded-full px-3 py-1 text-sm text-ikea-text"
                    >
                      {w}
                    </span>
                  ))}
                </div>
                {draft.forWho.includes('Other') && draft.forWhoOther && (
                  <p className="text-sm text-gray-500 mt-2 italic">
                    plus: {draft.forWhoOther}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-ikea-blue uppercase tracking-widest mb-1">
                  Needs
                </p>
                <div className="flex flex-wrap gap-2">
                  {draft.needs.map((n) => (
                    <span
                      key={n}
                      className="bg-white border border-ikea-border rounded-full px-3 py-1 text-sm text-ikea-text"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
              {draft.whoShouldBeInvolved && (
                <div>
                  <p className="text-xs font-semibold text-ikea-blue uppercase tracking-widest mb-1">
                    Who should be involved
                  </p>
                  <p className="text-base text-ikea-text">
                    {draft.whoShouldBeInvolved}
                  </p>
                </div>
              )}
              {draft.extra && (
                <div>
                  <p className="text-xs font-semibold text-ikea-blue uppercase tracking-widest mb-1">
                    Extra notes
                  </p>
                  <p className="text-base text-ikea-text">{draft.extra}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Btn variant="secondary" onClick={goBack}>
                Edit
              </Btn>
              <Btn onClick={submit} fullWidth>
                Send to IKEA Family
              </Btn>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <PageShell>
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <div className="max-w-xl w-full">
          <StepDots step={step} />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}
