import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';
import { initiatives } from '../data/initiatives';
import { useSession } from '../context/SessionContext';
import IkeaLogo from '../components/IkeaLogo';
import type { WallNote } from '../data/types';

// ── Canvas geometry ──────────────────────────────────────────────────────────

const CANVAS_W = 1900;
const CANVAS_H = 1700;

const CLUSTER_RADIUS = 200;
const IDEAS_RADIUS = 110;
const NOTE_W = 82;
const LABEL_RESERVE = 76; // px at top of each cluster circle kept clear of notes

const CLUSTER_CENTERS: Record<string, { cx: number; cy: number }> = {
  afterschool: { cx: 940, cy:  370 },
  mentorship:  { cx: 1340, cy: 800 },
  lgbtq:       { cx: 940, cy: 1200 },
  kitchen:     { cx: 540, cy:  800 },
  ideas:       { cx: 940, cy: 1490 },
};

const CANVAS_CX = 940;
const CANVAS_CY = 800;

// ── Colours ──────────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<WallNote['category'], string> = {
  missing:  '#FFF3B0',
  whoElse:  '#CFE3F5',
  canOffer: '#D4E8C8',
  extra:    '#F5D6D6',
};

const LEGEND_ITEMS: Array<{ category: WallNote['category']; label: string }> = [
  { category: 'missing',  label: 'What feels missing' },
  { category: 'whoElse',  label: 'Who else should be involved' },
  { category: 'canOffer', label: 'What people can offer' },
  { category: 'extra',    label: 'Other thoughts' },
];

// ── Layout helpers ────────────────────────────────────────────────────────────

interface LayoutNote extends WallNote {
  x: number;
  y: number;
  rotation: number;
  noteH: number;
}

function seededRand(seed: string, n: number): number {
  let h = 0;
  const s = seed + ':' + n;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return (h >>> 0) / 0xffffffff;
}

function noteHeight(text: string): number {
  if (text.length < 40) return 56;
  if (text.length < 80) return 68;
  return 80;
}

// Grid cell dimensions. CELL_H = max noteHeight + 2px pad.
// Brick offset on odd rows prevents vertical alignment of seams.
const CELL_W = NOTE_W + 10; // 92
const CELL_H = 82;           // covers tallest note (80) with 2px pad

function layoutNotes(notes: WallNote[]): LayoutNote[] {
  const result: LayoutNote[] = [];

  const byCluster: Record<string, WallNote[]> = {};
  for (const note of notes) {
    const key = note.initiativeId in CLUSTER_CENTERS ? note.initiativeId : 'ideas';
    (byCluster[key] ??= []).push(note);
  }

  for (const [clusterId, clusterNotes] of Object.entries(byCluster)) {
    const center = CLUSTER_CENTERS[clusterId];
    if (!center) continue;
    const { cx, cy } = center;
    const isIdeas = clusterId === 'ideas';
    const radius = isIdeas ? IDEAS_RADIUS : CLUSTER_RADIUS;
    const safeR = radius - 24; // note centres stay inside this radius

    // Build brick-pattern grid and collect cells that fall inside the cluster
    const maxSteps = Math.ceil(safeR / Math.min(CELL_W, CELL_H)) + 1;
    const candidates: Array<{ x: number; y: number; d2: number }> = [];

    for (let row = -maxSteps; row <= maxSteps; row++) {
      const xOff = (Math.abs(row) % 2 === 1) ? CELL_W / 2 : 0; // brick
      const ncy = cy + row * CELL_H;
      for (let col = -maxSteps; col <= maxSteps; col++) {
        const ncx = cx + col * CELL_W + xOff;
        const dx = ncx - cx, dy = ncy - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 > safeR * safeR) continue;

        const cellTop = ncy - CELL_H / 2;
        if (!isIdeas && cellTop < cy - radius + LABEL_RESERVE) continue;

        candidates.push({ x: ncx - NOTE_W / 2, y: ncy - CELL_H / 2, d2 });
      }
    }

    // Sort centre-outward so the cluster looks naturally populated from the middle
    candidates.sort((a, b) => a.d2 - b.d2);

    let ci = 0;
    for (const note of clusterNotes) {
      if (ci >= candidates.length) break;
      const { x, y } = candidates[ci++];
      const noteH = noteHeight(note.text);
      // Vertically centre the note within the cell; add small seeded jitter for organic feel
      const yAdj = y + (CELL_H - noteH) / 2 + (seededRand(note.id, 101) - 0.5) * 6;
      const xAdj = x + (seededRand(note.id, 100) - 0.5) * 8;
      const rotation = (seededRand(note.id, 99) - 0.5) * 8;
      result.push({ ...note, x: xAdj, y: yAdj, rotation, noteH });
    }
  }

  return result;
}

// ── PostIt ────────────────────────────────────────────────────────────────────

function PostIt({
  note,
  isHighlighted,
  glowVisible,
}: {
  note: LayoutNote;
  isHighlighted: boolean;
  glowVisible: boolean;
}) {
  const [tapped, setTapped] = useState(false);

  return (
    <motion.div
      data-note="true"
      className="absolute cursor-pointer select-none"
      style={{ left: note.x, top: note.y, width: NOTE_W, height: note.noteH,
               rotate: `${note.rotation}deg`, zIndex: tapped ? 20 : isHighlighted ? 10 : 1 }}
      initial={note.source === 'user' ? { opacity: 0, scale: 0.85 } : false}
      animate={tapped ? { scale: 1.1 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={(e) => { e.stopPropagation(); setTapped(true); setTimeout(() => setTapped(false), 4000); }}
    >
      {isHighlighted && glowVisible && (
        <motion.div
          className="absolute rounded-md pointer-events-none"
          style={{ inset: -6, border: '3px solid rgba(0,88,163,0.55)', borderRadius: 10, filter: 'blur(2px)' }}
          animate={{ opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div
        className="w-full h-full rounded flex flex-col justify-between px-2 py-2"
        style={{ backgroundColor: CATEGORY_COLOR[note.category], boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
      >
        <p className="text-[10px] leading-snug text-gray-800 break-words line-clamp-3">{note.text}</p>
        <p className="text-[9px] text-gray-500 mt-0.5 truncate">
          {note.attribution}
        </p>
      </div>
      {note.source === 'user' && (
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ikea-blue rounded-full border-2 border-white" />
      )}
    </motion.div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function Idle() {
  const navigate = useNavigate();
  const { session, resetWall } = useSession();

  // Compute initial transform once so reset button knows home position
  const initTf = useRef(() => {
    const scale = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H) * 0.92;
    return { scale, positionX: (window.innerWidth - CANVAS_W * scale) / 2, positionY: (window.innerHeight - CANVAS_H * scale) / 2 };
  }).current();

  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const [isTransformed, setIsTransformed] = useState(false);
  const [glowVisible, setGlowVisible] = useState(true);

  const pointerStartRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wallNotes = session.wallNotes;
  const layoutResult = useRef<LayoutNote[]>([]);
  if (layoutResult.current.length === 0 && wallNotes.length > 0) {
    layoutResult.current = layoutNotes(wallNotes);
  }

  const newUserNotes = wallNotes.filter(
    (n) => n.source === 'user' && n.highlightedAt && Date.now() - n.highlightedAt < 5 * 60 * 1000
  );

  // Animate camera to frame user's own notes on arrival
  useEffect(() => {
    if (newUserNotes.length === 0 || !transformRef.current) return;
    const timer = setTimeout(() => {
      const userLayout = layoutResult.current.filter((ln) => newUserNotes.some((un) => un.id === ln.id));
      if (userLayout.length === 0) return;
      const minX = Math.min(...userLayout.map((n) => n.x));
      const maxX = Math.max(...userLayout.map((n) => n.x + NOTE_W));
      const minY = Math.min(...userLayout.map((n) => n.y));
      const maxY = Math.max(...userLayout.map((n) => n.y + n.noteH));
      const pad = 80;
      const newScale = Math.min(window.innerWidth / (maxX - minX + pad * 2), window.innerHeight / (maxY - minY + pad * 2), 2.0) * 0.82;
      const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
      transformRef.current?.setTransform(window.innerWidth / 2 - cx * newScale, window.innerHeight / 2 - cy * newScale, newScale, 2500, 'easeInOutCubic');
    }, 1000);
    return () => clearTimeout(timer);
  }, []); // once on mount

  useEffect(() => {
    if (newUserNotes.length === 0) return;
    const t = setTimeout(() => setGlowVisible(false), 60_000);
    return () => clearTimeout(t);
  }, []);

  function handleTransform(_ref: ReactZoomPanPinchRef, s: { scale: number; positionX: number; positionY: number }) {
    setIsTransformed(
      Math.abs(s.positionX - initTf.positionX) > 12 ||
      Math.abs(s.positionY - initTf.positionY) > 12 ||
      Math.abs(s.scale - initTf.scale) > 0.06
    );
  }

  function handleBackgroundClick(e: React.MouseEvent) {
    if (movedRef.current) return;
    if ((e.target as HTMLElement).closest('[data-note]')) return;
    navigate('/login');
  }

  function handleLogoPointerDown() {
    longPressRef.current = setTimeout(() => {
      if (window.confirm('Reset wall? This re-seeds all notes.')) { resetWall(); layoutResult.current = []; }
    }, 3000);
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F0EDE8]">
      {/* Zoomable canvas */}
      <div
        className="absolute inset-0"
        onPointerDown={(e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY }; movedRef.current = false; }}
        onPointerMove={(e) => { if (Math.abs(e.clientX - pointerStartRef.current.x) > 6 || Math.abs(e.clientY - pointerStartRef.current.y) > 6) movedRef.current = true; }}
        onClick={handleBackgroundClick}
      >
        <TransformWrapper
          ref={transformRef}
          initialScale={initTf.scale}
          initialPositionX={initTf.positionX}
          initialPositionY={initTf.positionY}
          minScale={initTf.scale * 0.75}
          maxScale={2.5}
          onTransform={handleTransform}
          panning={{ velocityDisabled: false }}
        >
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: CANVAS_W, height: CANVAS_H, position: 'relative' }}
          >
            {/* Cluster background circles */}
            {Object.entries(CLUSTER_CENTERS).map(([id, { cx, cy }]) => {
              const r = id === 'ideas' ? IDEAS_RADIUS : CLUSTER_RADIUS;
              return (
                <div key={id} className="absolute rounded-full pointer-events-none" style={{
                  left: cx - r, top: cy - r, width: r * 2, height: r * 2,
                  background: 'rgba(255,255,255,0.6)',
                  border: '1.5px solid rgba(170,165,155,0.35)',
                }} />
              );
            })}

            {/* Initiative cluster labels — inside canvas, float above notes */}
            {initiatives.map((initiative) => {
              const c = CLUSTER_CENTERS[initiative.id];
              if (!c) return null;
              return (
                <div key={initiative.id} className="absolute pointer-events-none select-none text-center" style={{
                  left: c.cx - CLUSTER_RADIUS + 8,
                  top: c.cy - CLUSTER_RADIUS + 12,
                  width: CLUSTER_RADIUS * 2 - 16,
                  zIndex: 5,
                }}>
                  <p className="font-medium leading-tight" style={{ fontSize: 15, color: '#888' }}>
                    {initiative.partner.replace('with ', '')}
                  </p>
                  <p className="font-bold leading-snug mt-1" style={{ fontSize: 20, color: '#222' }}>
                    {initiative.title}
                  </p>
                </div>
              );
            })}

            {/* Ideas cluster label */}
            <div className="absolute pointer-events-none select-none text-center" style={{
              left: CLUSTER_CENTERS.ideas.cx - IDEAS_RADIUS + 4,
              top: CLUSTER_CENTERS.ideas.cy - IDEAS_RADIUS + 10,
              width: IDEAS_RADIUS * 2 - 8,
              zIndex: 5,
            }}>
              <p style={{ fontSize: 15, color: '#888', fontWeight: 600 }}>New ideas</p>
            </div>

            {/* Centre headline — in dead space between clusters */}
            <div className="absolute pointer-events-none select-none text-center" style={{
              left: CANVAS_CX - 200,
              top: CANVAS_CY - 68,
              width: 400,
              zIndex: 4,
            }}>
              <p style={{ fontSize: 28, fontWeight: 300, color: '#0058A3', lineHeight: 1.3 }}>
                This is what neighbours are shaping in Vesterbro.
              </p>
              <p style={{ fontSize: 16, color: '#aaa', marginTop: 10 }}>
                Tap the background to begin.
              </p>
            </div>

            {/* Post-it notes */}
            {layoutResult.current.map((note) => {
              const isHighlighted =
                note.source === 'user' &&
                note.highlightedAt !== null &&
                Date.now() - (note.highlightedAt ?? 0) < 5 * 60 * 1000;
              return (
                <PostIt key={note.id} note={note} isHighlighted={isHighlighted} glowVisible={glowVisible} />
              );
            })}
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Fixed chrome: logo, legend, reset */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute top-5 left-6 pointer-events-auto cursor-pointer"
          onPointerDown={handleLogoPointerDown}
          onPointerUp={() => { if (longPressRef.current) clearTimeout(longPressRef.current); }}
          onPointerLeave={() => { if (longPressRef.current) clearTimeout(longPressRef.current); }}
        >
          <IkeaLogo size="md" />
        </div>

        <div className="absolute bottom-6 left-6 bg-white/90 border border-[#E0E0E0] rounded-xl px-4 py-3 shadow-sm" style={{ minWidth: 210 }}>
          <p className="text-[11px] font-semibold text-gray-700 mb-2">What people are sharing</p>
          <ul className="space-y-1.5">
            {LEGEND_ITEMS.map(({ category, label }) => (
              <li key={category} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded flex-shrink-0 border border-gray-200" style={{ backgroundColor: CATEGORY_COLOR[category] }} />
                <span className="text-[11px] text-gray-600">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {isTransformed && (
          <button
            className="absolute bottom-6 right-6 bg-white border border-[#E0E0E0] rounded-xl px-4 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-50 transition-colors pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              transformRef.current?.setTransform(initTf.positionX, initTf.positionY, initTf.scale, 600, 'easeOut');
              setIsTransformed(false);
            }}
          >
            Reset view
          </button>
        )}
      </div>
    </div>
  );
}
