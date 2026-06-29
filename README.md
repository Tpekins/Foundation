# Tianipekins.org Foundation

> **Ground to Signal** — A grassroots engineering foundation based in Buea, Cameroon. Documenting community impact, smart infrastructure builds, and digital literacy.

## Folder Structure

```
├── apps/
│   ├── backend/          # NestJS API (port 3000) + Prisma schema
│   │   └── prisma/       # Database schema & migrations
│   └── frontend/         # React + Vite site
├── package.json          # Yarn workspaces root
└── yarn.lock
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn 1.x (`npm install -g yarn` or enable corepack)
- A PostgreSQL database (Neon, Supabase, or local)

### Setup

```bash
# Install dependencies
yarn install

# Create your .env from the example
cp .env.example .env
# Edit .env with your DATABASE_URL (PostgreSQL connection string)

# Generate Prisma client
yarn db:generate

# Run initial migration
yarn db:migrate

# Seed the database (optional, for demo data)
yarn db:seed
```

### Development

```bash
# Start both frontend + backend (single process)
yarn dev

# Or run separately:
#   yarn workspace @tianipekins/backend dev
#   yarn workspace @tianipekins/frontend dev
```

### Build & Deploy

```bash
yarn build   # builds frontend + backend
yarn start   # starts production NestJS server (serves built frontend)
```

### Database Commands

```bash
yarn db:generate        # Regenerate Prisma client after schema changes
yarn db:migrate         # Create + apply a new migration
yarn db:migrate:deploy  # Apply pending migrations (production)
yarn db:seed            # Seed the database with demo data
yarn db:studio          # Open Prisma Studio (GUI database browser)
```

### Environment Variables

| Variable      | Required | Description                               |
|---------------|----------|-------------------------------------------|
| `DATABASE_URL` | Yes     | PostgreSQL connection string for Prisma   |
| `PORT`         | No      | API server port (default: 3000)           |
| `ADMIN_API_KEY`| No      | API key for admin write endpoints         |
