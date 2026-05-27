# OctoCAT Supply Agent Instructions

Use these instructions for project-wide work in this repository. Keep changes focused, preserve the demo-friendly style, and link to existing docs instead of duplicating long explanations.

## Project Shape

- This is an npm workspace monorepo for the OctoCAT Supply demo application.
- `api/` is a TypeScript Express REST API. Models live in `api/src/models/`, route handlers in `api/src/routes/`, seed data in `api/src/seedData.ts`, and Swagger/OpenAPI is exposed from `api/src/index.ts`.
- `frontend/` is a React 18 + TypeScript + Vite SPA styled with Tailwind CSS. Components live in `frontend/src/components/`, app routing starts in `frontend/src/App.tsx`, and shared context lives in `frontend/src/context/`.
- For architecture details, ERD relationships, and component boundaries, read [docs/architecture.md](../docs/architecture.md). For build and run details, read [docs/build.md](../docs/build.md).

## Commands

- Install once from the repository root: `npm install`.
- Build everything: `npm run build`.
- Build one workspace: `npm run build --workspace=api` or `npm run build --workspace=frontend`.
- Run both dev servers: `npm run dev`.
- Run one dev server: `npm run dev:api` or `npm run dev:frontend`.
- Run API tests: `npm run test --workspace=api` or `npm run test:api`.
- Run API coverage: `npm run test:coverage --workspace=api`.
- Run frontend lint: `npm run lint` or `npm run lint --workspace=frontend`.

Use the narrowest build, lint, or test command that validates the files you changed. The configured VS Code tasks include `Build API` and `Build Frontend`.

## Development Conventions

- Keep API work consistent with the existing Express route modules and model files. Add or update Swagger JSDoc near routes/models when API shapes change.
- Keep frontend work consistent with the current functional-component and hook style. Use the existing axios/API config and react-query patterns for remote data, and prefer existing context providers before adding new global state or directories.
- Use workspace-aware npm commands from the repo root rather than changing into package folders unless a tool requires it.
- Preserve the demo-oriented nature of the app: favor readable, easy-to-explain implementations over heavy abstractions.
- When adding API tests, follow the Vitest + Supertest pattern in `api/src/routes/branch.test.ts`. The reusable unit-test workflow is documented in [.github/prompts/Unit-Test-Coverage.prompt.md](prompts/Unit-Test-Coverage.prompt.md).
- Frontend unit tests are not currently wired into `frontend/package.json`; for frontend changes, validate with lint and build unless the task explicitly adds a test setup.

## Frontend Accessibility

- Frontend UI, React component, form, navigation, CSS, and interaction changes must follow [.github/instructions/frontend-wacp-accessibility.instructions.md](instructions/frontend-wacp-accessibility.instructions.md).
- Treat WCAG 2.2 AA as the baseline: use semantic HTML first, keep keyboard access and visible focus intact, provide accessible names for controls, expose async/error status, and maintain responsive reflow and contrast.
- Before finishing UI work, run the narrowest existing validation command and note any manual accessibility checks that automation cannot cover.

## Runtime Notes

- The API listens on port `3000` by default. Swagger UI is available at `/api-docs` and the raw spec at `/api-docs.json`.
- The frontend dev server uses Vite, documented as port `5137` in [docs/build.md](../docs/build.md).
- CORS origins are configured in `api/src/index.ts` and can be overridden with `API_CORS_ORIGINS` as a comma-separated list.
- In Codespaces or other proxied environments, make the API port publicly reachable when the frontend needs browser access to it.

## Pitfalls For Agents

- Prefer repo-root, workspace-aware commands. Avoid ad hoc `cd api` or `cd frontend` workflows unless a tool specifically requires them.
- Do not assume every workspace has the same scripts: API has Vitest tests and coverage; frontend currently has lint/build but no test script.
- Keep Swagger/OpenAPI documentation in sync when API request/response shapes change.
- Use the run-demo skill for managed demo startup/shutdown instead of leaving unmanaged dev servers behind.

## Existing Customizations

- Custom agents live in `.github/agents/`. Use the codebase analyst or product-manager agents when the task is exploratory, product-planning oriented, or benefits from persona review.
- Project skills live in `.github/skills/`; use `run-octocat-demo-locally` for demo process management, `commit-and-push` for finalizing changes, and the issue/PR skills when the user asks for those workflows.
- Link to existing docs such as [docs/deployment.md](../docs/deployment.md), [docs/tao.md](../docs/tao.md), and [docs/demo-script.md](../docs/demo-script.md) when those topics come up instead of recreating their content here.