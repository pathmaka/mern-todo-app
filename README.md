# Todo App

A full-stack TODO app: React + TypeScript (Vite) frontend, Express backend, MongoDB with Mongoose. Organised as an npm-workspaces monorepo.

```
mern-todo-app/
├── frontend/   # React UI        → frontend/README.md
├── backend/    # Express API     → backend/README.md
└── package.json
```

## Prerequisites

- Node.js 20+ and npm 10+
- A MongoDB database: a free [Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB (details in the backend README)

## Quick start

1. `npm install` (from the repo root; installs both packages)
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` (Atlas or local; see the backend README).
3. In two terminals: `npm start -w backend` (or `npm run dev:backend` for auto-restart) and `npm run dev:frontend`.
4. Open <http://localhost:5173>.

## Features

View, add, edit, complete and delete todos, with validation, loading/error states and optimistic updates.

## Design choices

- **Monorepo with npm workspaces**: one install, two independent packages, no extra tooling.
- **Vite + TypeScript**: fast dev server and typed API contracts.
- **Mongoose**: schema validation and timestamps with very little code.
- **Optimistic updates with rollback**: the UI feels instant, and failures are surfaced and undone.
- **Single shared list (no auth)**: the assignment doesn't ask for users; this is noted as a limitation.
