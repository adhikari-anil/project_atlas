# ProjectHub

ProjectHub is a multi-tenant project management app. Users work in organizations, which contain projects and tasks. Organization membership and roles control access.

## Features

- Account registration, login, logout, and protected dashboard
- Organization creation, membership, invitations, and role management
- Project and task management
- Team updates and activity history, with optional realtime activity delivery
- `projecthub` CLI for authentication, organization selection, and context

## Stack

Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and a separate Express/Socket.IO realtime service.

## Setup

Requirements: Node.js 20+, npm, and a PostgreSQL database.

```bash
npm install
```

Create `.env` in the repository root with:

```dotenv
DATABASE_URL="postgresql://..."
ACCESS_TOKEN_SECRET="a-long-random-secret"
REFRESH_TOKEN_SECRET="another-long-random-secret"
REALTIME_INTERNAL_SECRET="a-shared-secret"
```

Apply migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the web app at <http://localhost:3000>:

```bash
npm run dev
```

To enable realtime activity, start the service in another terminal:

```bash
npm run dev:realtime
```

It reads the root `.env` by default. For deployment, configure `WEB_APP_URL`, `REALTIME_SERVER_URL`, and `NEXT_PUBLIC_REALTIME_URL` for your environment. Keep secrets out of source control.

## CLI

Install CLI dependencies and run commands locally through the development script:

```bash
npm install --prefix cli
npm run dev:cli -- --help
npm run dev:cli -- auth login
npm run dev:cli -- org list
npm run dev:cli -- org use <organization-slug-or-id>
npm run dev:cli -- context
npm run dev:cli -- project list
npm run dev:cli -- project get <project-id>
npm run dev:cli -- project create --name "Website refresh"
npm run dev:cli -- project update <project-id> --status ACTIVE
npm run dev:cli -- project delete <project-id>
```

Project commands use the selected organization. Project updates and deletion
require an organization OWNER or ADMIN; deletion asks for confirmation unless
`--yes` is passed. Valid statuses are `PLANNING`, `ACTIVE`, `ON_HOLD`,
`COMPLETED`, and `ARCHIVED`.

The CLI uses `http://localhost:3000` by default. Set `PRODUCT_API_URL` to use another app URL. To invoke the built command as `projecthub`, build and link it:

```bash
npm run build:cli
cd cli && npm link
projecthub --help
```

CLI credentials and the selected organization are stored in `~/.product/auth.json`, not in the project directory.

## Checks

```bash
npm run lint
npm run build
npm run build:realtime
npm run build:cli
```
