# Shopify Inventory Sync

## Project layout

Two independent packages, **not** a pnpm workspace:
- `backend/` — Express + Prisma + Shopify GraphQL API (port 4000)
- `frontend/` — Next.js 16 App Router + shadcn/ui (port 3000)

Docker Compose orchestrates all services: postgres, backend, frontend, adminer.

## Commands

### Backend (from `backend/`)
pnpm dev          # tsx watch — dev server on :4000
pnpm build        # tsc — outputs to dist/
pnpm start        # node dist/index.js

### Frontend (from `frontend/`)
pnpm dev          # next dev on :3000
pnpm build        # next build
pnpm lint         # eslint

### Database
docker compose exec backend pnpm exec prisma migrate dev --name <name>
docker compose exec backend pnpm exec prisma generate
docker compose exec backend pnpm exec prisma studio

### Full stack
docker compose up --build

## Quirks an agent would get wrong

- **Backend module mismatch**: `tsconfig.json` outputs CommonJS (`"module": "commonjs"`) but `package.json` has `"type": "module"`. Only works because `tsx` handles both at dev time. Running `tsc` then `node dist/index.js` directly will fail. Always use `pnpm dev` or `tsx` for development.
- **Backend Dockerfile uses npm**: The Dockerfile runs `npm install` but the project uses pnpm. This ignores the lockfile. Don't add npm commands to backend scripts — the Dockerfile is the outlier.
- **Prisma output location**: Generated client goes to `node_modules/.prisma` (default). Import from `@prisma/client` in code.
- **Webhook raw body capture**: `index.ts` applies `express.json()` with a `verify` callback **only** to `/webhooks` routes first (to capture raw body for HMAC), then applies `express.json()` globally. Don't reorder these middlewares or move the webhook JSON parser.
- **No tests or CI**: There are zero test files and no GitHub Actions workflows. If you add tests, there's no existing pattern to follow.
- **`.env` files on disk**: Both root and `backend/.env` exist with real credentials but are in `.gitignore`. Never commit them.
- **Frontend AGENTS.md is auto-generated**: The `frontend/AGENTS.md` block starting with `<!-- BEGIN:nextjs-agent-rules -->` is re-created by `next dev`. Don't edit it — it will be overwritten.

## Architecture in one sentence

Shopify Admin API (GraphQL, cursor pagination) via OAuth tokens stored per-shop in DB → Express backend → Prisma → PostgreSQL; Shopify webhooks (HMAC-verified) push real-time product updates; Next.js frontend reads from the Express API.

## Key files

| File | Why it matters |
|------|---------------|
| `backend/src/services/shopify.service.ts` | All Shopify API calls + cursor-based pagination |
| `backend/src/middleware/verifyWebhook.ts` | HMAC-SHA256 verification for incoming webhooks |
| `backend/src/index.ts` | Express app setup, middleware order, route mounting |
| `backend/prisma/schema.prisma` | Database schema (Product, WebhookLog, SyncHistory) |
| `frontend/src/lib/api.ts` | Frontend API client — fetches from backend |
