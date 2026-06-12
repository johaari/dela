// Screen 6: The payoff. Shows the user exactly what they shaped, reflects their words
// back to them, and situates their contribution in the wider community effort.
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import { useSession } from '../context/SessionContext';
import type { WallNote } from '../data/types';
import PageShell from '../components/PageShell';
import Btn from '../components/Btn';
import { copy } from '../data/copy';
import { summariseContribution } from '../data/contribution';

const COUNTER_KEY = 'ikea-community-voice-counter';

function getCommunityCount(): number {
  const stored = localStorage.getItem(COUNTER_KEY);
  if (stored) return parseInt(stored, 10);
  const base = 1200 + Math.floor(Math.random() * 80);
  localStorage.setItem(COUNTER_KEY, String(base));
  return base;
}

function incrementCount(): number {
  const prev = getCommunityCount();
  const next = prev + 1;
  localStorage.setItem(COUNTER_KEY, String(next));
  return next;
}

function ContributionBar({
  label,
  value,
  max,
  color,
  delay,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  delay: number;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 text-sm text-gray-600 flex-shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
      <span className="w-8 text-sm font-semibold text-ikea-text text-right">
        {value}
      </span>
    </div>
  );
}

export default function Impact() {
  const navigate = useNavigate();
  const { session, appendWallNotes } = useSession();
  const countRef = useRef<number>(0);
  const [meetingsDismissed, setMeetingsDismissed] = useState(false);
  const [calendarToastVisible, setCalendarToastVisible] = useState(false);

  useEffect(() => {
    countRef.current = incrementCount();

    const now = Date.now();
    const userNotes: WallNote[] = [];

    for (const c of session.contributions) {
      if (c.passed) continue;
      if (c.missing) {
        userNotes.push({
          id: `user-${c.initiativeId}-missing`,
          initiativeId: c.initiativeId,
          category: 'missing',
          text: c.missing,
          attribution: session.member?.name?.split(' ')[0] ?? 'You',
          source: 'user',
          createdAt: now,
          highlightedAt: now,
        });
      }
      if (c.whoElse) {
        userNotes.push({
          id: `user-${c.initiativeId}-whoElse`,
          initiativeId: c.initiativeId,
          category: 'whoElse',
          text: c.whoElse,
          attribution: session.member?.name?.split(' ')[0] ?? 'You',
          source: 'user',
          createdAt: now,
          highlightedAt: now,
        });
      }
      if (c.note) {
        userNotes.push({
          id: `user-${c.initiativeId}-extra`,
          initiativeId: c.initiativeId,
          category: 'extra',
          text: c.note,
          attribution: session.member?.name?.split(' ')[0] ?? 'You',
          source: 'user',
          createdAt: now,
          highlightedAt: now,
        });
      }
    }

    if (session.idea?.oneLiner) {
      userNotes.push({
        id: 'user-idea-main',
        initiativeId: 'ideas',
        category: 'extra',
        text: session.idea.oneLiner,
        attribution: session.member?.name?.split(' ')[0] ?? 'You',
        source: 'user',
        createdAt: now,
        highlightedAt: now,
      });
    }

    if (userNotes.length > 0) {
      appendWallNotes(userNotes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  const communityCount = getCommunityCount();

  const stats = {
    perspectives: session.contributions.filter((c) => !c.passed && (c.missing || c.note))
      .length,
    skills: session.contributions.filter(
      (c) => !c.passed && c.canOffer && c.canOffer.length > 0
    ).length,
    connections: session.contributions.filter((c) => !c.passed && c.whoElse).length,
  };
  const maxStat = Math.max(stats.perspectives, stats.skills, stats.connections, 1);

  const contributedInitiativesWithMeetings = initiatives.filter((initiative) => {
    const contribution = session.contributions.find(
      (c) => c.initiativeId === initiative.id
    );
    return contribution && !contribution.passed && initiative.nextMeeting;
  });

  const memberFirstName = session.member?.name?.split(' ')[0];

  function handleCalendar() {
    setCalendarToastVisible(true);
    setTimeout(() => setCalendarToastVisible(false), 3000);
  }

  const showComeMeet =
    !meetingsDismissed &&
    (contributedInitiativesWithMeetings.length > 0 || Boolean(session.idea));

  return (
    <PageShell>
      <div className="flex-1 flex flex-col px-6 py-6 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-serif font-bold text-ikea-text mb-2">
            Here's what you shaped today.
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Your input goes directly into the working notes for each project.
          </p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {initiatives.map((initiative, idx) => {
            const contribution = session.contributions.find(
              (c) => c.initiativeId === initiative.id
            );

            if (!contribution || contribution.passed) {
              return (
                <motion.div
                  key={initiative.id}
                  className="bg-white rounded-2xl p-5 border border-ikea-border"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                >
                  <p className="text-sm font-semibold text-gray-400 mb-1">
                    {initiative.title}
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    You passed on this one. That's useful too.
                  </p>
                </motion.div>
              );
            }

            const summary = summariseContribution(contribution);

            return (
              <motion.div
                key={initiative.id}
                className="bg-white rounded-2xl p-5 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-ikea-green flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ikea-blue mb-1">
                      {initiative.title}
                    </p>
                    {summary ? (
                      <p className="text-base text-ikea-text leading-relaxed mb-2">
                        You {summary}.
                      </p>
                    ) : (
                      <p className="text-base text-gray-500 italic mb-2">
                        You showed your support for this project.
                      </p>
                    )}
                    <p className="text-xs text-gray-400 italic">
                      Added to the working notes for {initiative.partner.replace('with ', '')}.
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {session.idea && (
          <motion.div
            className="bg-ikea-yellow rounded-2xl p-5 mb-8 shadow-sm"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.25 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-ikea-text mb-2">
              Your idea
            </p>
            <p className="text-lg font-semibold text-ikea-text mb-2">
              "{session.idea.oneLiner}"
            </p>
            <p className="text-sm text-ikea-text opacity-70">
              Received. DELA will bring this to local partners next month.
            </p>
          </motion.div>
        )}

        {showComeMeet && (
          <motion.div
            className="bg-ikea-blue rounded-2xl p-6 mb-8 text-white"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">
              What's next
            </p>
            <h2 className="text-xl font-bold text-white mb-3">
              Come meet the people behind the projects you helped shape.
            </h2>

            {contributedInitiativesWithMeetings.length > 0 ? (
              <>
                <p className="text-base text-blue-100 leading-relaxed mb-5">
                  {memberFirstName ? `${memberFirstName}, every` : 'Every'} project you
                  contributed to has an open neighbourhood meeting in the coming weeks.
                  Drop in for any of them. No sign-up, no commitment. Just a chance to
                  meet the partners and other neighbours shaping this with you.
                </p>
                <div className="space-y-3 mb-6">
                  {contributedInitiativesWithMeetings.map((initiative) => (
                    <div
                      key={initiative.id}
                      className="bg-white/10 rounded-xl p-4"
                    >
                      <p className="font-semibold text-white text-sm">
                        {initiative.title}
                      </p>
                      <p className="text-blue-100 text-sm mt-1">
                        {initiative.nextMeeting!.date}, {initiative.nextMeeting!.time}
                      </p>
                      <p className="text-blue-200 text-xs mt-0.5">
                        {initiative.nextMeeting!.location} · Hosted by{' '}
                        {initiative.partner.replace('with ', '')}
                      </p>
                    </div>
                  ))}
                </div>
                <Btn onClick={handleCalendar} variant="secondary" fullWidth>
                  Add to my calendar
                </Btn>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => setMeetingsDismissed(true)}
                    className="text-blue-200 text-sm underline underline-offset-4 hover:text-white transition-colors min-h-[44px] px-4"
                  >
                    Not this time
                  </button>
                </div>
              </>
            ) : (
              <p className="text-base text-blue-100 leading-relaxed">
                When DELA meets with local partners next month to look at new
                ideas, we'll let you know what comes of yours.
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          className="bg-ikea-blue rounded-2xl p-6 mb-8 text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-lg leading-relaxed">
            You're one of{' '}
            <span className="text-3xl font-bold text-ikea-yellow">
              {communityCount.toLocaleString('da-DK')}
            </span>{' '}
            neighbours shaping Vesterbro this month.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.48 }}
        >
          <p className="text-base font-semibold text-ikea-text mb-4">
            What neighbours have been contributing across all four projects
          </p>
          <div className="space-y-4">
            <ContributionBar
              label="Perspectives shared"
              value={stats.perspectives + 47}
              max={maxStat + 47}
              color="bg-ikea-blue"
              delay={0.55}
            />
            <ContributionBar
              label="Skills offered"
              value={stats.skills + 33}
              max={maxStat + 47}
              color="bg-ikea-green"
              delay={0.62}
            />
            <ContributionBar
              label="Connections named"
              value={stats.connections + 21}
              max={maxStat + 47}
              color="bg-amber-400"
              delay={0.68}
            />
          </div>
        </motion.div>

        <motion.p
          className="text-base text-gray-500 text-center italic leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {copy.impact.closingLine}
        </motion.p>

        <div className="flex justify-center mb-4">
          <Btn onClick={() => navigate('/login')} className="min-w-[200px]">
            {copy.impact.doneCta}
          </Btn>
        </div>
      </div>

      <AnimatePresence>
        {calendarToastVisible && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-ikea-text text-white px-6 py-3 rounded-2xl shadow-lg text-sm font-medium z-50 whitespace-nowrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            We'll send you a reminder closer to the date.
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
