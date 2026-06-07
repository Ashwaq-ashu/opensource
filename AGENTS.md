# Workspace AI Agent Instructions

Welcome to the `opensource` repository. This document provides essential context and instructions for AI agents operating in this workspace.

## Project Structure

This is a monorepo consisting of:
- **Frontend** (`/frontend`): A modern website/application ("MT Constructions" app shell / "Life Optimizer" chat UI) built with Next.js 16 App Router, React 19, and Tailwind CSS 4.
- **Backend** (`/backend`): A Node.js API built with Express, Mongoose, and JWT authentication. Uses ESM module syntax (`type: "module"`).

## General Instructions

- **No assumptions:** Use `read_file` to confirm the code before you edit it.
- **Paths:** All workspace relative paths should be prefixed with `frontend/` or `backend/` appropriately.
- **Running Commands:** Always switch to the proper directory (`cd frontend` or `cd backend`) before running `npm` commands.

### Frontend Development (`/frontend`)

- **Tech Stack:** Next.js 16+, React 19, TypeScript, Tailwind CSS 4.
- **App Router:** Use the App Router structure (`app/page.tsx`, `app/layout.tsx`).
- **Styling:** Use Tailwind utility classes.
- **Icons:** Use `lucide-react`.
- **Breaking Changes Warning:** Because Next.js 16+ has breaking changes compared to earlier versions, consult `node_modules/next/dist/docs/` if you encounter unknown API errors. 
- **Running Local Server:** 
  ```bash
  cd frontend
  npm run dev # Runs 'next dev -H 0.0.0.0'
  ```

### Backend Development (`/backend`)

- **Tech Stack:** Node.js (ES Modules), Express, Mongoose, JSON Web Tokens (bcrypt), OpenAI API.
- **Database:** MongoDB via SRV connection. The entry point uses Google/Cloudflare DNS fallback for `MONGO_URI` connections.
- **Architecture:** 
  - `server.js` is the entry point.
  - Routes in `routes/` (e.g. `routes/auth.js`).
  - Mongoose models in `models/` (e.g. `models/User.js`).
  - Middleware in `middleware/` (e.g. `middleware/auth.js` for JWT).
- **Running Local Server:**
  ```bash
  cd backend
  npm run dev # Runs 'node --watch server.js'
  ```

## Working with Git

- Make sure to review `DEPLOYMENT.md` and `render.yaml` when modifying deployment configuration.
- Write clear, concise conventional commits when prompted to summarize.