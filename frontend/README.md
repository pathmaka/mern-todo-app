# Todo App – Frontend

React + TypeScript single-page app built with Vite. It talks to the Express API in [`../backend`](../backend/README.md).

## Setup

Requires Node 20+ and the backend running on port 5000.

```bash
# from the repo root
npm install
npm run dev:frontend      # http://localhost:5173
```

Other scripts (run from the repo root): `npm run build` type-checks and builds to `frontend/dist`.

In development, Vite proxies `/api` to `http://localhost:5000` (see `vite.config.ts`), so no CORS or URL configuration is needed.

## Structure

| File | Purpose |
| --- | --- |
| `src/api/todos.ts` | Typed fetch client; turns server/network failures into readable messages |
| `src/hooks/useTodos.ts` | State hook: loading, errors, and optimistic updates with rollback |
| `src/components/TodoForm.tsx` | Form used for both adding and inline editing, with title validation |
| `src/components/TodoItem.tsx` | One todo: checkbox, strikethrough/faded when done, edit, and delete with inline confirmation |
| `src/App.tsx` | Page layout and loading / empty / error states |
| `src/styles/main.css` | Global base styles (font, color scheme), imported in `main.tsx` |
| `src/styles/App.css` | App and component styles, imported in `App.tsx` |

## Features

- List, add, edit (inline), mark done/undone, delete
- Optimistic updates for toggle, edit and delete; the UI rolls back and shows an error if the request fails
- Form validation (required title, length limits) and friendly error messages with a Retry button
- Completed todos are struck through and faded; items fade in when added

## Assumptions and limitations

- No authentication: there is a single shared list of todos for everyone. Adding users would mean a `user` field on each todo plus login.
- Creating a todo waits for the server (it needs the generated id); other actions are optimistic.
- The dev proxy only applies to `npm run dev`. A production deployment needs the API served from the same origin or a configurable API base URL.
- No pagination, search or filtering, and no automated frontend tests.
