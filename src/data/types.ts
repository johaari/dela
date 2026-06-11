export type Member = {
  name: string;
  number: string;
};

export type Initiative = {
  id: string;
  title: string;
  partner: string;
  description: string;
  stillOpen: string;
  tags: string[];
  imageSeed: string;
  ikeaBrings: string[];
  partnerBrings: string[];
  shapedBy: string[];
  nextMeeting?: {
    date: string;
    time: string;
    location: string;
  };
};

export type Contribution = {
  initiativeId: string;
  missing?: string;
  whoElse?: string;
  canOffer?: string[];
  note?: string;
  passed: boolean;
  timestamp: number;
};

export type Idea = {
  oneLiner: string;
  forWho: string[];
  forWhoOther?: string;
  needs: string[];
  whoShouldBeInvolved?: string;
  extra?: string;
  timestamp: number;
};

export type SeedNote = {
  id: string;
  initiativeId: string;
  category: 'missing' | 'whoElse' | 'canOffer' | 'extra';
  text: string;
  attribution: string;
  context?: string;
};

export type WallNote = SeedNote & {
  source: 'seed' | 'user';
  createdAt: number;
  highlightedAt: number | null;
};

export type SessionState = {
  member?: Member;
  contributions: Contribution[];
  idea?: Idea;
  completed: boolean;
  wallNotes: WallNote[];
};
