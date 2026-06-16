import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import type { Contribution, Idea } from '../data/types';
import { useSession } from '../context/SessionContext';
import { summariseContribution } from '../data/contribution';
import { copy } from '../data/copy';
import IkeaLogo from '../components/IkeaLogo';
import Btn from '../components/Btn';
import { INITIATIVE_TONES, TILE_BG, TILE_BORDER, TILE_TEXT } from '../data/tileTones';

const ONE_HOUR = 60 * 60 * 1000;

function NewBadge() {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-white/80 bg-ink px-2 py-0.5 rounded-full">
      {copy.dashboard.newBadge}
    </span>
  );
}

function ProjectCard({
  initiative,
  contribution,
  isNew,
}: {
  initiative: (typeof initiatives)[number];
  contribution: Contribution;
  isNew: boolean;
}) {
  const summary = summariseContribution(contribution);
  const latestUpdate = initiative.trackRecord[initiative.trackRecord.length - 1];
  const partnerName = initiative.partner.replace('with ', '');
  const tone = INITIATIVE_TONES[initiative.id] ?? 'lavender';

  return (
    <div className="bg-surface-card rounded-2xl overflow-hidden shadow-sm">
      <div className={`px-5 py-3 flex items-center justify-between ${TILE_BG[tone]}`}>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider leading-none mb-0.5 opacity-70 ${TILE_TEXT[tone]}`}>
            {partnerName}
          </p>
          <p className={`text-sm font-sans font-black tracking-tight leading-snug ${TILE_TEXT[tone]}`}>
            {initiative.title}
          </p>
        </div>
        {isNew && <NewBadge />}
      </div>

      <div className="px-5 py-4 space-y-4">
        {summary && (
          <div>
            <p className="text-[0.65rem] font-extrabold text-ink-secondary uppercase tracking-[0.1em] mb-1">
              {copy.dashboard.yourContribution}
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              You {summary}.
            </p>
          </div>
        )}

        {latestUpdate && (
          <div>
            <p className="text-[0.65rem] font-extrabold text-ink-secondary uppercase tracking-[0.1em] mb-1">
              {copy.dashboard.latestUpdate}
            </p>
            <p className="text-xs font-semibold text-ink-secondary mb-0.5">
              {latestUpdate.date}
            </p>
            <p className={`text-sm text-ink-secondary leading-relaxed pl-3 border-l-2 ${TILE_BORDER[tone]}`}>
              {latestUpdate.text}
            </p>
          </div>
        )}

        {initiative.nextMeeting && (
          <div>
            <p className="text-[0.65rem] font-extrabold text-ink-secondary uppercase tracking-[0.1em] mb-1">
              {copy.dashboard.nextMeeting}
            </p>
            <p className="text-sm text-ink-secondary">
              {initiative.nextMeeting.date}, {initiative.nextMeeting.time}
            </p>
            <p className="text-xs text-ink-muted mt-0.5">
              {initiative.nextMeeting.location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function IdeaCard({ idea, isNew }: { idea: Idea; isNew: boolean }) {
  return (
    <div className="bg-surface-card rounded-2xl overflow-hidden shadow-sm">
      <div className={`px-5 py-3 flex items-center justify-between ${TILE_BG.yellow}`}>
        <p className={`text-sm font-sans font-black tracking-tight ${TILE_TEXT.yellow}`}>
          {copy.dashboard.ideaCard.label}
        </p>
        {isNew && <NewBadge />}
      </div>
      <div className="px-5 py-4">
        <p className="text-base text-ink font-medium mb-2">
          "{idea.oneLiner}"
        </p>
        <p className="text-sm text-ink-muted">
          {copy.dashboard.ideaCard.body}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { session, reset } = useSession();

  const followed = initiatives
    .map((init) => ({
      initiative: init,
      contribution: session.contributions.find(
        (c) => c.initiativeId === init.id && !c.passed
      ),
    }))
    .filter(
      (item): item is { initiative: typeof initiatives[number]; contribution: Contribution } =>
        item.contribution !== undefined
    );

  const isEmpty = followed.length === 0 && !session.idea;

  const latestTs = isEmpty
    ? 0
    : Math.max(
        ...followed.map((f) => f.contribution.timestamp),
        session.idea ? session.idea.timestamp : 0
      );

  const isNew = (ts: number) => latestTs > 0 && latestTs - ts < ONE_HOUR;

  function handleReset() {
    if (window.confirm(copy.dashboard.reset.confirm)) {
      reset();
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <header className="px-6 pt-6 pb-2 flex items-center justify-between">
        <IkeaLogo size="md" />
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink-secondary transition-colors min-h-[44px] min-w-[44px] px-3 rounded-xl"
          aria-label="Reset dashboard"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-6 py-4 max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 flex flex-col"
        >
          <h1 className="text-3xl font-sans font-black tracking-tight text-ink mb-6">
            {copy.dashboard.title}
          </h1>

          {isEmpty ? (
            <div className="bg-surface-card rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-between max-h-64">
              <p className="text-base text-ink-secondary leading-relaxed">
                {copy.dashboard.empty.body}
              </p>
              <div className="mt-6">
                <Btn onClick={() => navigate('/')} fullWidth>
                  {copy.dashboard.empty.cta}
                </Btn>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {followed.map(({ initiative, contribution }) => (
                <ProjectCard
                  key={initiative.id}
                  initiative={initiative}
                  contribution={contribution}
                  isNew={isNew(contribution.timestamp)}
                />
              ))}

              {session.idea && (
                <IdeaCard
                  idea={session.idea}
                  isNew={isNew(session.idea.timestamp)}
                />
              )}

              <div className="pt-2 pb-6">
                <Btn onClick={() => navigate('/')} fullWidth>
                  {copy.dashboard.populated.cta}
                </Btn>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
