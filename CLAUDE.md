# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and dev commands

- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build (Next.js 16 with Turbopack)
- `npm run lint` — run ESLint
- `netlify deploy --prod` — deploy to production (must be linked via `netlify link --name resqlink-ai`)
- Delete `.next/` if you get Turbopack cache corruption errors

## Architecture

This is a humanitarian response PWA (ResQLink AI) built with **Clean Architecture**. The layers are:

### Domain (`src/domain/`)
Entities and enums — no framework dependencies. `entities/index.ts` defines all data types (Incident, Resource, Hospital, Shelter, etc.). `enums/index.ts` defines IncidentPriority, IncidentStatus, IncidentCategory, ResourceType, UserRole, etc.

### Infrastructure (`src/infrastructure/`)
- **Supabase** (`supabase/client/`) — three client variants: browser (`index.ts`), server (`server.ts`), middleware (`middleware.ts`). The root `middleware.ts` uses the middleware client for auth session management.
- **Supabase queries** (`supabase/queries/`) — `incidents.ts`, `resources.ts`, `locations.ts`. All use `parseLocationField()` from `src/shared/utils/geo.ts` to decode PostGIS WKB hex strings into `{lat, lng}` objects.
- **Supabase realtime** (`supabase/realtime/`) — WebSocket subscriptions to postgres_changes.
- **AI** (`ai/openai/`) — server-only OpenAI integration for priority classification, duplicate detection, resource recommendation.
- **Migrations** (`supabase/migrations/`) — SQL files to run in Supabase SQL Editor. `001_initial_schema.sql` creates all tables with PostGIS, RLS policies, and indexes. `004_seed_verified_data.sql` is the current production seed.

### Presentation (`src/presentation/`)
- **Components** — organized by feature: `common/`, `layout/`, `map/`, `incidents/`, `resources/`, `dashboard/`, `landing/`.
- **Hooks** — `use-geolocation.ts` (GPS), `use-realtime.ts` (Supabase subscriptions).
- **Providers** — `auth-provider.tsx` wraps the `(app)` route group with auth context.
- **Animations** — Framer Motion presets.

### App routes (`src/app/`)
- `/` — public landing (two buttons: need help / want to help)
- `(auth)/login`, `(auth)/register` — public auth pages
- `(app)/dashboard`, `(app)/map`, `(app)/incidents`, `(app)/resources`, `(app)/operations`, `(app)/settings` — authenticated pages wrapped in `AuthProvider` + sidebar layout
- `/incidents/new`, `/resources/new` — public forms (no auth required to report)
- `api/ai/classify`, `api/ai/duplicates`, `api/ai/recommend` — server-side AI endpoints

### Shared (`src/shared/`)
- `config/env.ts` — environment variable access
- `constants/` — labels, colors, map defaults (centered on Caracas)
- `types/` — MapMarker, MapFilter, form data types
- `utils/geo.ts` — **critical**: WKB hex parser for PostGIS geography columns. Supabase returns geography as WKB hex strings, not GeoJSON.

## Key patterns

- **PostGIS locations**: All location columns are `GEOGRAPHY(POINT, 4326)`. Supabase returns them as WKB hex (e.g., `0101000020E6100000...`). Every query that reads location data must pipe results through `parseLocationField()` from `src/shared/utils/geo.ts`.
- **Map markers**: `EmergencyMap` uses `react-leaflet` `CircleMarker` (not `Marker`) to avoid Leaflet default icon issues. Colors encode type and priority.
- **Realtime**: The `useRealtime` hook subscribes to table changes. Dashboard and map pages auto-reload data on INSERT/UPDATE.
- **Auth flow**: Middleware redirects unauthenticated users from protected routes to `/login`. Registration creates both a Supabase Auth user and a row in the `users` table.
- **shadcn/ui**: Uses base-ui (not Radix). `Select` `onValueChange` passes `string | null` — always handle null. Components don't support `asChild` — wrap with plain elements instead of nesting buttons.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://resqlink-ai.netlify.app
```

## Deployment

Hosted on Netlify with `@netlify/plugin-nextjs`. Config in `netlify.toml`. The Netlify site name is `resqlink-ai`. If deploy fails with "Failed publishing static content", delete `.next/` and `.netlify/` then retry. If the site gets unlinked, run `netlify link --name resqlink-ai`.
