import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { SessionState, Contribution, Idea, Member, WallNote } from '../data/types';
import { seedNotes } from '../data/seedNotes';

const STORAGE_KEY = 'ikea-community-voice-session';

function makeWallNotesFromSeeds(): WallNote[] {
  return seedNotes.map((n) => ({
    ...n,
    source: 'seed' as const,
    createdAt: Date.now(),
    highlightedAt: null,
  }));
}

const emptySession: SessionState = {
  contributions: [],
  idea: undefined,
  completed: false,
  wallNotes: [],
};

function loadSession(): SessionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...emptySession, wallNotes: makeWallNotesFromSeeds() };
    }
    const parsed = JSON.parse(raw) as SessionState;
    if (!parsed.wallNotes || parsed.wallNotes.length === 0) {
      return { ...parsed, wallNotes: makeWallNotesFromSeeds() };
    }
    return parsed;
  } catch {
    return { ...emptySession, wallNotes: makeWallNotesFromSeeds() };
  }
}

type Action =
  | { type: 'SAVE_MEMBER'; payload: Member }
  | { type: 'SAVE_CONTRIBUTION'; payload: Contribution }
  | { type: 'SAVE_IDEA'; payload: Idea }
  | { type: 'SET_COMPLETED' }
  | { type: 'APPEND_WALL_NOTES'; payload: WallNote[] }
  | { type: 'RESET_WALL' }
  | { type: 'RESET' };

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case 'SAVE_MEMBER':
      return { ...state, member: action.payload };
    case 'SAVE_CONTRIBUTION': {
      const existing = state.contributions.findIndex(
        (c) => c.initiativeId === action.payload.initiativeId
      );
      const contributions =
        existing >= 0
          ? state.contributions.map((c, i) =>
              i === existing ? action.payload : c
            )
          : [...state.contributions, action.payload];
      return { ...state, contributions };
    }
    case 'SAVE_IDEA':
      return { ...state, idea: action.payload };
    case 'SET_COMPLETED':
      return { ...state, completed: true };
    case 'APPEND_WALL_NOTES': {
      const existingIds = new Set(state.wallNotes.map((n) => n.id));
      const newNotes = action.payload.filter((n) => !existingIds.has(n.id));
      return { ...state, wallNotes: [...state.wallNotes, ...newNotes] };
    }
    case 'RESET_WALL':
      return { ...state, wallNotes: makeWallNotesFromSeeds() };
    case 'RESET':
      return {
        ...emptySession,
        wallNotes: state.wallNotes,
      };
    default:
      return state;
  }
}

type SessionContextValue = {
  session: SessionState;
  saveMember: (m: Member) => void;
  saveContribution: (c: Contribution) => void;
  saveIdea: (idea: Idea) => void;
  setCompleted: () => void;
  appendWallNotes: (notes: WallNote[]) => void;
  resetWall: () => void;
  reset: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, dispatch] = useReducer(reducer, undefined, loadSession);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const value: SessionContextValue = {
    session,
    saveMember: (m) => dispatch({ type: 'SAVE_MEMBER', payload: m }),
    saveContribution: (c) => dispatch({ type: 'SAVE_CONTRIBUTION', payload: c }),
    saveIdea: (idea) => dispatch({ type: 'SAVE_IDEA', payload: idea }),
    setCompleted: () => dispatch({ type: 'SET_COMPLETED' }),
    appendWallNotes: (notes) => dispatch({ type: 'APPEND_WALL_NOTES', payload: notes }),
    resetWall: () => dispatch({ type: 'RESET_WALL' }),
    reset: () => {
      dispatch({ type: 'RESET' });
    },
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}
