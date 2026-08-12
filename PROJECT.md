# About This Project

## 📌 Application Overview

The application follows a hierarchical structure:

```
             ┌──────────────┐
             │     USER     │
             └──────┬───────┘
                    │
             Authentication
                    │
                    ▼
           ┌────────────────┐
           │ Organization   │
           └───────┬────────┘
                   │
                   ▼
             ┌───────────┐
             │  Project  │
             └─────┬─────┘
                   │
                   ▼
              ┌─────────┐
              │  Tasks  │
              └─────────┘
```

The organization is the primary tenant boundary. A user can belong to an organization, and projects and tasks are associated with that organization.

---

## ✨ Features

### Authentication

Users can:

- Register an account
- Login
- Logout
- Access protected dashboard pages
- Maintain an authenticated session

Authentication is handled through the application's authentication service and protected routes.

### 🏢 Organizations

Organizations represent workspaces/tenants within the application.

Users can:

- Create organizations
- View their organizations
- Select an organization
- Update organization information
- Delete organizations

When an organization is created, the creator automatically becomes its owner.

```
User
 │
 │ owns
 ▼
Organization
 │
 │ membership
 ▼
OrganizationMember
 │
 └── role = OWNER
```

Organization roles currently include:

- OWNER
- ADMIN
- MEMBER

Authorization is handled on the server rather than relying on frontend controls.

### 📁 Projects

Projects belong to an organization.

Users can:

- Create projects
- View project lists
- Open project details
- Update projects
- Delete projects

The currently selected organization determines which projects are displayed.

```
Current Organization
        │
        ▼
     Projects
        │
        ├── Project A
        ├── Project B
        └── Project C
```

### ✅ Tasks

Tasks belong to projects.

Users can:

- Create tasks
- View task lists
- Update tasks
- Delete tasks
- Set task status
- Set task priority
- Set due dates
- Optionally assign tasks to organization members

Supported task statuses include:

- TODO
- IN_PROGRESS
- IN_REVIEW
- DONE

Supported priorities:

- LOW
- MEDIUM
- HIGH
- URGENT

Task assignment is validated against organization membership on the backend.

---

## 🧭 Organization Context

The application supports multiple organizations per user.

When a user selects an organization, its ID is stored in the current organization cookie.

The general flow is:

```
Organization List
       │
       ▼
Select Organization
       │
       ▼
selectOrganizationAction()
       │
       ▼
Verify Membership
       │
       ▼
Set Current Organization
       │
       ▼
CURRENT_ORGANIZATION_COOKIE
       │
       ▼
Projects
       │
       ▼
Tasks
```

This prevents projects from being loaded from the wrong organization.

---

## 🔐 Authorization

Authorization is performed at the service layer.

For example, organization updates require:

- OWNER
- OR ADMIN

Organization deletion requires:

- OWNER

Task operations verify that the current user belongs to the organization that owns the project.

This keeps authorization out of the UI and ensures that protected operations cannot simply be bypassed by modifying frontend code.

---

## 🏗️ Architecture

The application follows a layered architecture:

```
┌─────────────────────────────┐
│           UI                │
│ React / Next.js Components  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Server Actions        │
│ Input validation + calling  │
│ services                    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          Services           │
│ Business logic + auth       │
│ authorization               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        Repositories         │
│ Database access              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        PostgreSQL           │
└─────────────────────────────┘
```

### Responsibility of each layer

**UI**

Responsible for:

- Rendering screens
- Forms
- User interaction
- Loading/error states

**Server Actions**

Responsible for:

- Receiving client requests
- Validating input
- Calling services

**Services**

Responsible for:

- Business rules
- Authentication
- Authorization
- Organization membership checks

**Repositories**

Responsible for:

- Database queries
- Database mutations

This separation keeps business logic out of React components and server actions.

---

## 🗄️ Database Relationships

The core relationship is:

```
User
 │
 ├───────────────┐
 │               │
 │               ▼
 │        OrganizationMember
 │               │
 │               ▼
 │         Organization
 │               │
 │               ▼
 │            Project
 │               │
 │               ▼
 │             Task
 │
 └── owns Organizations
```

More specifically:

```
User
 │
 │ 1:N
 ▼
OrganizationMember
 │
 │ N:1
 ▼
Organization
 │
 │ 1:N
 ▼
Project
 │
 │ 1:N
 ▼
Task
```

An organization can therefore contain multiple projects, and each project can contain multiple tasks.

---

## 🔄 Main User Flow

A typical user journey is:

1. Register
2. Login
3. Dashboard
4. Create Organization
5. Organization List
6. Select Organization
7. Projects
8. Create Project
9. Open Project
10. Create Task
11. Manage Tasks

---

## 🧪 Validation

The application uses schema validation before business logic is executed.

The general flow is:

```
Client Input
     ↓
Zod Validation
     ↓
Server Action
     ↓
Service
     ↓
Repository
```

This provides a consistent validation boundary for organization, project, task, and authentication inputs.

---

## 🛡️ Security Principles

The MVP follows several important security principles:

**Server-side authorization**
Permissions are checked on the server.

**Organization isolation**
Project and task operations are scoped to the appropriate organization.

**Membership verification**
Users must belong to an organization before performing organization-scoped operations.

**Input validation**
Incoming data is validated before reaching business logic.

**Database constraints**
Unique identifiers and relationships are enforced at the database level.

---

## 🔮 Future Features

The next major module planned after the current MVP is Organization Membership.

Potential future functionality:

```
Organization Membership
├── Invite members
├── Accept invitations
├── Remove members
├── Leave organization
└── Change roles
```

Additional future SaaS features may include:

- Real-time collaboration
- Notifications
- Team chat
- File/document management
- Search
- Analytics
- Audit logs
- Version history
- Billing/subscriptions

These are intentionally outside the current MVP scope.

---

## 🎯 Project Goal

The goal of this project is to build a practical multi-tenant SaaS application while applying real-world full-stack development principles:

- Layered architecture
- Authentication
- Authorization
- RBAC
- Multi-tenancy
- Database relationships
- Server-side business logic
- Input validation
- CRUD operations
- Organization-scoped data
- React form handling
- Next.js Server Actions

The current MVP provides the foundation for expanding the application into a complete collaborative SaaS platform.
