---
name: run-octocat-demo-locally
description: 'Start or inspect the OctoCAT Supply demo locally. Use when asked to run the app, launch the demo, start API and frontend, show local URLs, check whether the demo is already running, or stop processes started for the demo. Does not edit code or run tests unless explicitly requested.'
argument-hint: 'Optional: start, status, stop, api-only, frontend-only'
---

# Run OctoCAT Demo Locally

This skill runs the OctoCAT Supply demo application in the local workspace and reports the URLs the user can open. It is an operational workflow, not an implementation workflow.

## When to Use

Use this skill when the user asks to:

- Run, launch, preview, or start the OctoCAT Supply app locally.
- Start the API, frontend, or both dev servers.
- Check whether the local demo is already running.
- Stop processes that were started for the local demo.
- Get the local API, Swagger, or frontend URLs.

Do not use this skill for production deployment, container builds, test generation, or code changes.

## Operating Rules

- Do not modify source files, docs, package files, or configuration while using this skill unless the user explicitly asks for code changes.
- Do not run tests during this run workflow unless the user explicitly asks for tests.
- Prefer starting both workspaces with the root command `npm run dev`.
- If you start a long-running server, keep track of the terminal/process id and stop it when the user explicitly asks you to stop the demo.
- If servers are already running, report the existing URLs instead of starting duplicate processes.
- If a command fails because dependencies are missing, run `npm install` from the repository root, then retry the requested startup once.

## Default URLs

- Frontend: `http://localhost:5137`
- API root: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`
- Swagger JSON: `http://localhost:3000/api-docs.json`

The frontend Vite config uses port `5137` with `strictPort: true`. The API defaults to port `3000` unless `PORT` is set.

## Procedure

### 1. Interpret the Request

Choose the mode from the user's wording or argument:

- `start` or no argument: start both API and frontend.
- `api-only`: start only the API with `npm run dev:api`.
- `frontend-only`: start only the frontend with `npm run dev:frontend`.
- `status`: inspect running terminals or ports and report URLs.
- `stop`: stop only processes you started for this demo unless the user explicitly asks to stop all matching local demo processes.

### 2. Confirm Workspace Context

Run from the repository root. The expected root files are `package.json`, `api/package.json`, and `frontend/package.json`.

If the terminal is not at the repository root, change to the workspace root before running npm commands.

### 3. Check for Existing Servers

Inspect active terminals first. If needed, check the default ports:

```powershell
Get-NetTCPConnection -LocalPort 3000,5137 -ErrorAction SilentlyContinue | Select-Object LocalPort, State, OwningProcess
```

Decision logic:

- If both ports are listening, report the frontend and API URLs and do not start another server.
- If only one side is running, start only the missing side unless the user asked for a specific mode.
- If a port is occupied by an unrelated process and startup would fail, report the conflict and ask whether to stop it or use a different mode.

### 4. Ensure Dependencies Exist

If `node_modules/`, `api/node_modules/`, or `frontend/node_modules/` are missing, run:

```bash
npm install
```

Only run install when needed or after npm reports missing dependencies. Do not run tests after install unless the user asks.

### 5. Start the Demo

Use the narrowest command that matches the mode:

```bash
npm run dev
```

```bash
npm run dev:api
```

```bash
npm run dev:frontend
```

Run dev-server commands as long-running terminal processes. Wait until output shows the API server and/or Vite dev server is ready, then report the URLs.

### 6. Report Success

Tell the user exactly what is running and include the relevant URLs:

- Frontend: `http://localhost:5137`
- API docs: `http://localhost:3000/api-docs`
- API JSON: `http://localhost:3000/api-docs.json`

Mention any caveats, such as a single workspace being started, an already-running server, or a port conflict.

### 7. Stop the Demo

When the user asks to stop the demo:

1. Stop terminal processes that were started during this workflow.
2. If no tracked terminal exists, inspect ports `3000` and `5137`.
3. Ask before killing untracked processes unless the user clearly asked to stop all local demo processes.
4. Confirm which processes or terminals were stopped.

## Completion Checks

The workflow is complete when one of these is true:

- The requested server or servers are running and URLs have been reported.
- The existing running demo has been identified and URLs have been reported.
- The requested demo processes have been stopped.
- A blocker has been reported with the exact failing command or port conflict.
