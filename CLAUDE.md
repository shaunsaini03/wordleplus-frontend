# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js on http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 16 + React 19 + Tailwind CSS 4** frontend for a Wordle-style game.

### Routing (App Router)

- `/` → `app/page.tsx` — landing page, links to `/login`
- `/login` → `app/login/page.tsx` — username-only login; stores `username` in `localStorage`, redirects to `/game`
- `/game` → `app/game/page.tsx` — main game view; reads `username` from `localStorage`
- `/leaderboard` → `app/leaderboard/page.tsx` — shows daily and global leaderboards

### API Layer (`lib/api.ts`)

All backend calls go through `lib/api.ts`. The backend base URL is hardcoded:
```
const API_BASE = "https://wordleplus-backend-1.onrender.com";
```

Key endpoints used:
- `POST /auth/login` — create/login user by username
- `GET /session/today?username=` — fetch or create today's game session; returns `{ sessionId, wordLength, maxGuesses, guesses, finished }`
- `POST /guess` — submit a guess; body `{ sessionId, guessWord }`; returns `{ guessWord, result }` where `result` is a string of `G`/`Y`/`B` per letter
- `GET /leaderboard/daily` and `GET /leaderboard/global`

### Game State

State lives entirely in `app/game/page.tsx` (no global store). The session is loaded once on mount. Each guess response appends to the `guesses` array. The game is `finished` when the result is all `G`s or max guesses are exhausted.

### Tile Coloring

Results use single-character codes: `G` = green (correct), `Y` = yellow (wrong position), `B` = gray (absent). Coloring logic is inline in `components/GameBoard.tsx`.

### Mobile vs Desktop Input

`GameBoard` attaches a `keydown` listener for desktop keyboard input. On mobile (detected via `navigator.userAgent`), the listener is disabled and a native `<input>` + submit button in `app/game/page.tsx` handles input instead.
