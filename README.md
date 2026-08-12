# SaaS Project Management Platform

A multi-tenant SaaS project management application where users can authenticate, create organizations, manage projects, and manage tasks within those projects.

---

## 🚀 Current MVP Status

```text
SaaS MVP
────────────────────────────────

Authentication
  ✅ Register
  ✅ Login
  ✅ Logout
  ✅ Protected routes

Organizations
  ✅ Create
  ✅ List
  ✅ Select
  ✅ Update
  ✅ Delete

Projects
  ✅ Create
  ✅ List
  ✅ Detail
  ✅ Update
  ✅ Delete

Tasks
  ✅ Create
  ✅ List
  ✅ Update
  ✅ Delete

Dashboard
  ✅ Real organization/project/task data

Navigation
  ⬜ Final cleanup

UI
  ⬜ Final cleanup

Testing
  ⬜ End-to-end regression
```

The core MVP functionality is implemented. Final navigation/UI cleanup and a complete end-to-end regression pass remain.

---

## 🧰 Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Prisma
- PostgreSQL
- Node.js

The project also uses a layered service/repository architecture to keep application logic organized.

---

## 🗂️ Project Structure

The project follows a feature-oriented structure alongside the application layers.

```
src/
├── actions/
│   ├── auth/
│   ├── organization/
│   ├── project/
│   └── task/
│
├── app/
│   ├── dashboard/
│   │   ├── organizations/
│   │   ├── projects/
│   │   └── ...
│   └── ...
│
├── components/
│   ├── forms/
│   └── ui/
│
├── features/
│   ├── organization/
│   ├── project/
│   └── task/
│
├── repositories/
│
├── services/
│   ├── auth/
│   ├── organization/
│   ├── project/
│   └── task/
│
├── validations/
│
└── lib/
```

Database models are maintained through Prisma.

---

## 🛠️ Local Development

### Prerequisites

Make sure you have:

- Node.js
- npm
- PostgreSQL-compatible database
- Git

### Clone the repository

```bash
git clone <your-repository-url>

cd <your-project-directory>
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and configure the required environment variables, including your database connection and authentication configuration.

Example:

```
DATABASE_URL="your_database_url"
```

**Do not commit `.env` or any file containing real credentials.**

### Generate Prisma Client

```bash
npx prisma generate
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start development server

```bash
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 📋 MVP Testing Checklist

Before considering the MVP release-ready, perform the following end-to-end test.

### Authentication
- [ ] Register a new account
- [ ] Login
- [ ] Access dashboard
- [ ] Logout
- [ ] Verify protected routes redirect unauthenticated users

### Organizations
- [ ] Create organization
- [ ] Verify owner membership
- [ ] List organizations
- [ ] Select organization
- [ ] Update organization
- [ ] Delete organization

### Projects
- [ ] Create project
- [ ] Verify project belongs to selected organization
- [ ] List projects
- [ ] Open project detail
- [ ] Update project
- [ ] Delete project

### Tasks
- [ ] Create task
- [ ] List tasks
- [ ] Update task
- [ ] Change task status
- [ ] Change task priority
- [ ] Delete task

### Data isolation
- [ ] Verify Organization A cannot access Organization B's projects
- [ ] Verify task operations are scoped to the correct organization
- [ ] Verify unauthorized organization operations are rejected

---

## 🚧 Current Remaining Work

The core functionality is complete. The remaining work is intentionally focused on polish and verification:

```
Navigation
  ⬜ Final cleanup

UI
  ⬜ Final cleanup

Testing
  ⬜ End-to-end regression
```

These are not new architectural features. They are the final steps before considering the current MVP stable.

---

For a deeper dive into the application's design, features, and architecture, see [aboutProject.md](./aboutProject.md).
