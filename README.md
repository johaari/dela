# IKEA Family — Community Voice

A clickable prototype for concept evaluation / user testing of a co-design touchpoint for the IKEA Family loyalty programme in Vesterbro, Copenhagen.

## Setup

**Requires Node 18+.**

```bash
npm install
npm run dev
```

> **Note:** `node_modules` is installed in `/tmp/ikea-voice-modules/` and symlinked here to work around ProtonDrive's binary execution restriction. If you move this project to a regular local folder, delete the symlink and run `npm install` normally.

The dev server exposes itself on the local network. To open on an iPad:

1. Run `npm run dev` — note the **Network:** URL printed in the terminal (e.g. `http://192.168.x.x:5173`).
2. Open that address in Safari on the iPad.

## User flow

```
/            Welcome — entry point
/intro       Orientation slides (3 swipeable slides)
/shape       Contribute to each of 4 initiatives (one at a time)
/your-voice  Bridge: contributions received, prompt for new idea
/idea        Submit your own initiative idea (optional, multi-step)
/impact      Results — what you shaped, community count, visualisation
```

## Resetting between sessions

A **Start over** link in the footer of every screen clears all localStorage state and returns to `/`. Use this between user testing participants.

## Data

- Initiatives are seeded in `src/data/initiatives.ts` — edit descriptions and `stillOpen` text here.
- All session state is stored under `ikea-community-voice-session` in localStorage.
- Community counter is stored under `ikea-community-voice-counter` and increments per session visit to `/impact`.

## Stack

React 18 · Vite 4 · TypeScript · Tailwind CSS 3 · React Router 6 · Framer Motion · Lucide React
No backend · No auth · No cookies · No analytics
