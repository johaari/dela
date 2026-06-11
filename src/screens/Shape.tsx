// Screen 3: The core contribution screen. Three-zone card with all contribution prompts visible at once.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import type { Contribution } from '../data/types';
import { useSession } from '../context/SessionContext';
import PageShell from '../components/PageShell';
import Btn from '../components/Btn';
import Tag from '../components/Tag';
import IkeaLogo from '../components/IkeaLogo';

const OFFER_OPTIONS = [
  'Time',
  'A skill',
  'A connection',
  'A space',
  'A perspective',
  'Just my support',
];

type DraftContribution = {
  missing: string;
  whoElse: string;
  canOffer: string[];
  note: string;
};

const emptyDraft = (): DraftContribution => ({
  missing: '',
  whoElse: '',
  canOffer: [],
  note: '',
});

export default function Shape() {
  const navigate = useNavigate();
  const { saveContribution } = useSession();

  const [initiativeIndex, setInitiativeIndex] = useState(0);
  const [draft, setDraft] = useState<DraftContribution>(emptyDraft());
  const [slideDir, setSlideDir] = useState(1);

  const initiative = initiatives[initiativeIndex];
  const total = initiatives.length;
  const isLast = initiativeIndex === total - 1;
  const partnerName = initiative.partner.replace('with ', '');
  const partnerInitial = partnerName.charAt(0).toUpperCase();

  function isDraftEmpty(d: DraftContribution) {
    return !d.missing && !d.whoElse && d.canOffer.length === 0 && !d.note;
  }

  function advance(passed: boolean) {
    const contribution: Contribution = {
      initiativeId: initiative.id,
      missing: draft.missing || undefined,
      whoElse: draft.whoElse || undefined,
      canOffer: draft.canOffer.length > 0 ? draft.canOffer : undefined,
      note: draft.note || undefined,
      passed,
      timestamp: Date.now(),
    };
    saveContribution(contribution);

    if (isLast) {
      navigate('/your-voice');
    } else {
      setSlideDir(1);
      setInitiativeIndex((i) => i + 1);
      setDraft(emptyDraft());
    }
  }

  function toggleOffer(opt: string) {
    setDraft((d) => ({
      ...d,
      canOffer: d.canOffer.includes(opt)
        ? d.canOffer.filter((o) => o !== opt)
        : [...d.canOffer, opt],
    }));
  }

  return (
    <PageShell>
      <div className="flex-1 flex flex-col px-6 py-4 max-w-3xl mx-auto w-full">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-1.5">
            {initiatives.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i < initiativeIndex
                    ? 'w-6 bg-ikea-blue'
                    : i === initiativeIndex
                    ? 'w-8 bg-ikea-blue'
                    : 'w-6 bg-ikea-border'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">
            {initiativeIndex + 1} of {total}
          </span>
        </div>

        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={initiative.id}
            custom={slideDir}
            initial={{ opacity: 0, x: slideDir * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDir * -50 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="flex flex-col gap-6"
          >
            {/* Initiative card */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

              {/* Zone 1: Partnership header */}
              <div className="bg-[#FAFAFA] border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <IkeaLogo size="sm" />
                  <span className="text-gray-300 font-light text-lg select-none">+</span>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-ikea-border flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-gray-600">{partnerInitial}</span>
                    </div>
                    <span className="text-sm font-semibold text-ikea-text">{partnerName}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  A project being shaped together.
                </p>
              </div>

              {/* Zone 2: Photo + title + description */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${initiative.imageSeed}/800/400`}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex flex-wrap gap-1.5">
                    {initiative.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pb-4">
                <h2 className="text-2xl font-bold text-ikea-text mb-3 leading-tight">
                  {initiative.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-4">
                  {initiative.description}
                </p>
                <p className="text-sm text-gray-400 italic leading-relaxed">
                  Still open: {initiative.stillOpen}
                </p>
              </div>

              {/* Zone 3: What each side brings */}
              <div className="mx-5 mb-5 border border-ikea-border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-ikea-border">
                  <div className="p-4">
                    <p className="text-xs font-semibold text-ikea-blue uppercase tracking-wider mb-3">
                      IKEA is bringing
                    </p>
                    <ul className="space-y-2">
                      {initiative.ikeaBrings.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                          <span className="text-ikea-blue mt-0.5 flex-shrink-0 font-bold">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {partnerName} is bringing
                    </p>
                    <ul className="space-y-2">
                      {initiative.partnerBrings.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                          <span className="text-gray-400 mt-0.5 flex-shrink-0 font-bold">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution panel */}
            <div className="bg-white rounded-3xl shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-base font-semibold text-ikea-text mb-2">
                  What feels missing here?
                </label>
                <input
                  type="text"
                  value={draft.missing}
                  onChange={(e) => setDraft((d) => ({ ...d, missing: e.target.value }))}
                  placeholder="An activity, a voice, a resource. Anything that comes to mind."
                  className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-base text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue"
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-ikea-text mb-2">
                  Who else should be part of this?
                </label>
                <input
                  type="text"
                  value={draft.whoElse}
                  onChange={(e) => setDraft((d) => ({ ...d, whoElse: e.target.value }))}
                  placeholder="A person, a group, an organisation. Whoever feels like a natural fit."
                  className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-base text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue"
                />
              </div>

              <div>
                <p className="text-base font-semibold text-ikea-text mb-3">
                  What could you offer?
                </p>
                <div className="flex flex-wrap gap-2">
                  {OFFER_OPTIONS.map((opt) => (
                    <Tag
                      key={opt}
                      label={opt}
                      active={draft.canOffer.includes(opt)}
                      onClick={() => toggleOffer(opt)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-ikea-text mb-2">
                  Anything you'd want the team to know?
                </label>
                <textarea
                  value={draft.note}
                  onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
                  placeholder="No wrong answers. Write as little or as much as feels right."
                  rows={3}
                  className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-base text-ikea-text placeholder-gray-300 focus:outline-none focus:border-ikea-blue resize-none"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center gap-3 pb-4">
          <Btn
            onClick={() => advance(false)}
            fullWidth
            disabled={isDraftEmpty(draft)}
          >
            Add my contribution
            <ChevronRight size={20} className="ml-1" />
          </Btn>
          <Btn variant="ghost" onClick={() => advance(true)}>
            Pass on this one
          </Btn>
        </div>
      </div>
    </PageShell>
  );
}
