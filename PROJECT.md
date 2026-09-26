# ProjectHub Overview

ProjectHub is a multi-tenant project management application. A user can belong to multiple organizations; organizations contain projects, and projects contain tasks. Membership and role checks enforce organization-scoped access.

## Features

- Registration, login, logout, and protected dashboard pages
- Organizations, memberships, invitations, and role management
- Projects and tasks, including status, priority, due dates, and assignees
- Organization team updates and an activity history
- Optional live activity delivery through a separate Socket.IO service
- `projecthub` CLI authentication, organization listing/selection, and context display

## Application Structure

The Next.js app uses a layered request flow:

```text
UI -> Server Actions / Route Handlers -> Services -> Repositories -> Prisma -> PostgreSQL
```

- **UI**: routes, screens, forms, and shared components
- **Server Actions and Route Handlers**: receive requests and validate or adapt input
- **Services**: business rules, authentication, authorization, and membership checks
- **Repositories**: database queries and mutations
- **Prisma**: schema and migration history

The CLI is in `cli/`. Its HTTP API endpoints are under `src/app/api/cli/`; it calls the existing authentication and membership services rather than implementing a second authentication flow.

## Organization Context

The web app stores its selected organization ID in an HTTP-only cookie. The CLI does not share browser cookies: it stores credentials and its selected organization in `~/.product/auth.json`. The CLI resolves an organization by ID or slug and the server checks that the user has an active membership before selecting it.

## Data Model

The main hierarchy is `User -> Organization -> Project -> Task`. `OrganizationMember` associates users with organizations and their roles (`OWNER`, `ADMIN`, or `MEMBER`). Related records include invitations, team updates, sessions, and activities. Activity records preserve history when a project or task is removed.

## Realtime Activity

The web app sends activity notifications to the separate Express/Socket.IO service. The service authenticates sockets with the existing access-token secret and broadcasts to organization rooms. Realtime delivery is supplementary; activity history is stored by the web app.

## Security Boundaries

Authorization and organization membership checks run on the server. Inputs are validated before reaching business logic, and database relationships and uniqueness constraints are defined in Prisma. CLI credentials are stored outside the repository in the user's home directory.
