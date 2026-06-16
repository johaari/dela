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
import { INITIATIVE_TONES, TILE_BG, TILE_BORDER, TILE_TEXT } from '../data/tileTones';

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
  const tone = INITIATIVE_TONES[initiative.id] ?? 'lavender';
  const headerBg = TILE_BG[tone];
  const headerText = TILE_TEXT[tone];
  const headerBorder = TILE_BORDER[tone];

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
                    ? 'w-6 bg-ink'
                    : i === initiativeIndex
                    ? 'w-8 bg-ink'
                    : 'w-6 bg-border-strong'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-ink-muted ml-1">
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
            <div className="bg-surface-card rounded-3xl shadow-sm overflow-hidden">

              {/* Zone 1: Partnership header */}
              <div className={`border-b border-border px-5 py-4 ${headerBg}`}>
                <div className="flex items-center gap-3">
                  <IkeaLogo size="md" />
                  <span className={`font-light text-2xl select-none opacity-50 ${headerText}`}>+</span>
                  <img
                    src={initiative.partnerLogo}
                    alt={partnerName}
                    className="max-h-14 max-w-[160px] w-auto h-auto object-contain"
                  />
                </div>
              </div>

              {/* Zone 2: Photo + tags */}
              <div className="relative h-48 bg-secondary overflow-hidden">
                <img
                  src={initiative.image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex flex-wrap gap-1.5">
                    {initiative.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title + description */}
              <div className="p-6 pb-4">
                <h2 className="text-xl font-sans font-black tracking-tight text-ink mb-3 leading-snug">
                  {initiative.title}
                </h2>
                <p className="text-base text-ink-secondary leading-relaxed">
                  {initiative.description}
                </p>
              </div>

              {/* Track record */}
              <div className="px-6 pb-5">
                <p className="text-[0.65rem] font-extrabold text-ink-secondary uppercase tracking-[0.1em] mb-3">
                  What's happened so far
                </p>
                <div className="space-y-3">
                  {initiative.trackRecord.map((entry) => (
                    <div key={entry.date} className={`pl-4 border-l-2 ${headerBorder}`}>
                      <p className="text-xs font-semibold text-ink-secondary mb-0.5">{entry.date}</p>
                      <p className="text-sm text-ink-secondary leading-relaxed">{entry.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What each side brings */}
              <div className="mx-5 mb-5 bg-ink rounded-2xl overflow-hidden">
                <div className="px-4 pt-4 pb-3 border-b border-white/15">
                  <p className="text-[0.65rem] font-extrabold text-white/60 uppercase tracking-[0.1em]">
                    Who's bringing what
                  </p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/15">
                  <div className="p-4">
                    <div className="mb-3">
                      <IkeaLogo size="sm" className="text-white" />
                    </div>
                    <ul className="space-y-2">
                      {initiative.ikeaBrings.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white leading-snug">
                          <span className="text-white/50 mt-0.5 flex-shrink-0 font-bold">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <img
                        src={initiative.partnerLogo}
                        alt={partnerName}
                        className="max-h-6 max-w-[120px] w-auto h-auto object-contain bg-white rounded px-1.5 py-1"
                      />
                    </div>
                    <ul className="space-y-2">
                      {initiative.partnerBrings.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white leading-snug">
                          <span className="text-white/50 mt-0.5 flex-shrink-0 font-bold">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Still being worked out */}
              <div className={`mx-5 mb-5 rounded-2xl p-4 ${headerBg}`}>
                <p className={`text-[0.65rem] font-extrabold uppercase tracking-[0.1em] mb-3 opacity-70 ${headerText}`}>
                  Still being worked out
                </p>
                <ul className="space-y-2">
                  {initiative.stillOpen.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm font-semibold leading-snug ${headerText}`}>
                      <span className="mt-0.5 flex-shrink-0 font-bold opacity-60">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contribution panel */}
            <div className="bg-surface-card rounded-3xl shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-base font-extrabold text-ink mb-2">
                  What feels missing here?
                </label>
                <input
                  type="text"
                  value={draft.missing}
                  onChange={(e) => setDraft((d) => ({ ...d, missing: e.target.value }))}
                  placeholder="An activity, a voice, a resource. Anything that comes to mind."
                  className="w-full border border-border rounded-2xl px-4 py-3 text-base text-ink placeholder-ink-muted/60 focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-base font-extrabold text-ink mb-2">
                  Who else should be part of this?
                </label>
                <input
                  type="text"
                  value={draft.whoElse}
                  onChange={(e) => setDraft((d) => ({ ...d, whoElse: e.target.value }))}
                  placeholder="A person, a group, an organisation. Whoever feels like a natural fit."
                  className="w-full border border-border rounded-2xl px-4 py-3 text-base text-ink placeholder-ink-muted/60 focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <p className="text-base font-extrabold text-ink mb-3">
                  What could you offer?
                </p>
                <div className="flex flex-wrap gap-2">
                  {OFFER_OPTIONS.map((opt) => (
                    <Tag
                      key={opt}
                      label={opt}
                      active={draft.canOffer.includes(opt)}
                      onClick={() => toggleOffer(opt)}
                      tone={tone}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-base font-extrabold text-ink mb-2">
                  Anything you'd want the team to know?
                </label>
                <textarea
                  value={draft.note}
                  onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
                  placeholder="No wrong answers. Write as little or as much as feels right."
                  rows={3}
                  className="w-full border border-border rounded-2xl px-4 py-3 text-base text-ink placeholder-ink-muted/60 focus:outline-none focus:border-ink resize-none"
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
