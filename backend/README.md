# Todo App – Backend

Express + Mongoose REST API that stores todos in MongoDB.

## Setup

Requires Node 20+ and a MongoDB database (see below).

```bash
# from the repo root
npm install
cp backend/.env.example backend/.env    # then edit MONGODB_URI
npm start -w backend                    # http://localhost:5000
```

Either command starts the API:

| Command | Behaviour |
| --- | --- |
| `npm start -w backend` | Runs the server once |
| `npm run dev -w backend` | Restarts when files in `src/` change (`node --watch-path`) |

Both also work from inside `backend/` as `npm start` / `npm run dev`. From the repo root, `npm run dev:backend` is a shortcut for the dev command.

### Environment variables (`backend/.env`)

| Variable | Default | Description |
| --- | --- | --- |
| `MONGODB_URI` | `mongodb://localhost:27017/todos` | MongoDB connection string |
| `PORT` | `5000` | HTTP port |

## MongoDB connection notes

**Atlas (used during development)**
1. Create a free M0 cluster at <https://www.mongodb.com/atlas>.
2. Under *Database Access* create a user; under *Network Access* allow your IP.
3. Use *Connect → Drivers* to copy the `mongodb+srv://...` string, replace the password, and add the database name (`/todos`) before the `?`:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/todos?appName=Cluster0`
4. URL-encode special characters in the password.

**Local**: install MongoDB Community Server and keep the default `MONGODB_URI`.

The database and `todos` collection are created automatically on the first write. `.env` is git-ignored; never commit credentials.

## API

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| GET | `/api/todos` | – | All todos, newest first |
| POST | `/api/todos` | `{ title, description? }` | Create (201) |
| PUT | `/api/todos/:id` | `{ title, description? }` | Update title/description |
| PATCH | `/api/todos/:id/done` | – | Toggle `done` |
| DELETE | `/api/todos/:id` | – | Delete (204) |

Todo shape: `{ _id, title, description, done, createdAt, updatedAt }`.

Errors are returned as `{ "error": "message" }` with status 400 (invalid input or id), 404 (not found) or 500.

## Structure

- `src/models/Todo.js` – Mongoose schema (title required, max 120; description max 500)
- `src/routes/todos.js` – routes, input validation, id checks
- `src/app.js` – Express app, 404 and error handlers
- `src/server.js` – connects to MongoDB, then starts listening

## Assumptions and limitations

- No authentication or users: all todos are shared by everyone who can reach the API. A natural next step is a `user` field on each todo plus login.
- CORS is open to all origins, which is fine for local development but should be restricted in production.
- PUT replaces both title and description (a missing description becomes empty).
- No pagination and no automated tests.
