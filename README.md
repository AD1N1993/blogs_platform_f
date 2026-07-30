# blog-platform-f

Frontend for a blogging platform. A Vite + React 19 starter with a layered architecture,
CSS modules and hand-rolled components — no external UI kit.

## Stack

| Layer           | Choice                                                   |
| --------------- | -------------------------------------------------------- |
| Build           | Vite 8, TypeScript 5.9 (strict, project references)      |
| UI              | React 19, CSS modules + design tokens in `src/index.css` |
| Routing         | react-router-dom 7                                       |
| Server state    | TanStack Query 5 (+ devtools in dev)                     |
| Client state    | Redux Toolkit 2 (filters, notifications)                 |
| HTTP            | axios + a single `ApiError`                              |
| Forms           | react-hook-form + zod (`@hookform/resolvers`)            |
| Unit tests      | Vitest 4 + Testing Library + MSW                         |
| E2E             | Playwright                                               |
| Code quality    | ESLint 9 (flat), Prettier, Stylelint, knip               |
| Git hooks       | husky + lint-staged + commitlint (conventional)          |
| Package manager | Yarn 4.9.1 (`nodeLinker: node-modules`)                  |

### What already works

A demo "posts" domain wires every layer together: a list with debounced search, tag filtering,
pagination, a post page, a publish form validated with zod, and toast notifications. Data is served
by MSW, so the starter runs and passes its tests with no backend — replace `src/services/*` and
`src/mocks/handlers.ts` and the demo domain can be dropped entirely.

## Setup

```bash
nvm use            # Node 22, pinned in .nvmrc
yarn install       # husky hooks are installed via prepare
cp .env.example .env
yarn playwright install chromium   # browser for e2e
```

The package manager is **Yarn 4.9.1**, resolved from `packageManager` in package.json via Corepack.
The linker is `node-modules` (not PnP), so Vite, Playwright and MSW work without patches or SDKs.

If `yarn --version` reports anything other than 4.9.1, check `~/.yarnrc.yml`: a `yarnPath` set there
is inherited by every project and overrides `packageManager`.

`public/mockServiceWorker.js` is committed; regenerate it (`yarn msw init public --save`) only after
a major MSW upgrade.

## Commands

| Command                 | What it does                                                               |
| ----------------------- | -------------------------------------------------------------------------- |
| `yarn dev`              | Dev server on `http://localhost:8080`, `/api` proxied to `VITE_API_TARGET` |
| `yarn dev:mock`         | Dev server backed by MSW mocks instead of a real backend                   |
| `yarn build`            | Type check + production build into `build/`                                |
| `yarn preview`          | Serve the production build locally                                         |
| `yarn typecheck`        | Type check without emit                                                    |
| `yarn test`             | Unit tests                                                                 |
| `yarn test:watch`       | Unit tests in watch mode                                                   |
| `yarn test:coverage`    | Coverage (v8)                                                              |
| `yarn e2e:run`          | Playwright against an already running app                                  |
| `yarn e2e:open`         | Playwright UI                                                              |
| `yarn integration-test` | Starts `dev:mock` and runs Playwright against it                           |
| `yarn lint`             | ESLint + Stylelint + format check                                          |
| `yarn lint:fix`         | Autofix linters and Prettier                                               |
| `yarn find-deadcode`    | knip — unused files, exports and dependencies                              |

> `yarn integration-test` is currently broken after the migration from npm to Yarn: the
> `start-server-and-test` wrapper exits with code 1 and swallows Playwright's output. The specs
> themselves pass — run `yarn dev:mock` in one terminal and `yarn e2e:run` in another.

## Layout

```
src/
├── components/        UI components: <kebab-case>/<kebab-case>.tsx + .module.css + index.ts
│   ├── app/           application routing
│   ├── root/          provider wrappers around App
│   ├── error-boundary/
│   ├── notifications/ toasts driven by a Redux slice
│   ├── page-layout/   header + main container
│   ├── post-card/
│   ├── post-form/     publish form (react-hook-form + zod)
│   └── spinner/
├── hooks/             app.ts (typed useAppDispatch/useAppSelector), use-posts.ts, use-debounce.ts
├── mocks/             MSW: handlers.ts, browser.ts, server.ts, fixtures/
├── pages/             pages (posts-page, post-page, not-found-page)
├── services/          http-client.ts, posts-api.ts, query-client.ts
├── store/             index.ts, reducers.ts, slices/, selectors/
├── test/              setup.ts, test-utils.tsx (renderWithProviders)
├── types/             domain types (post.ts, notifications.ts, store.ts)
├── utils/             constants.ts (routes, query keys, config), date.utils.ts
├── index.css          design tokens and base styles
└── main.tsx           entry point
e2e/                   Playwright specs
```

## Conventions

- **Import aliases**: `#/*` → `src/*`, plus `#slices/*`, `#selectors`, `#services/*`. Declared in
  `tsconfig.app.json` and `vite.config.ts` — both files must be updated together.
- **Naming**: folders and files are `kebab-case`; a component lives in a folder of the same name and
  is re-exported from `index.ts`. Default exports are banned by `import/no-default-export`
  (configs, tests and e2e specs are exempt).
- **Styles**: CSS modules only, with `camelCase` class names (`localsConvention: camelCaseOnly`);
  colors and spacing come from the tokens in `src/index.css` rather than hardcoded values.
- **State**: anything served by the API belongs to TanStack Query (keys live in `QUERY_KEYS`);
  filters, notifications and other UI state belong to Redux Toolkit slices. Do not mirror server
  data into Redux.
- **API**: all requests go through `httpClient`; errors are normalized into `ApiError`
  (`status`, `errorCode`, `message`), so `error.message` is enough in the UI.
- **Tests**: render via `renderWithProviders` from `src/test/test-utils.tsx` and stub the network
  with MSW (`src/mocks/handlers.ts`); fixtures reset between tests automatically.
- **Commits**: conventional commits, enforced by `commitlint` on `commit-msg`; `pre-commit` runs
  `lint-staged` and `typecheck`.

`DEFAULT_PAGE_SIZE` is deliberately `2` so pagination is visible across the three demo posts. Raise
it in `src/utils/constants.ts` for a real API.

Note that user-facing copy and test descriptions are in Russian; comments and docs are in English.

## Known audit findings

`yarn npm audit --recursive` (without the flag Yarn only inspects direct dependencies and stays
silent) reports a high-severity advisory in `react-router` (GHSA-qwww-vcr4-c8h2): CSRF in **RSC
mode**. This starter is an SPA with no RSC and no server actions, so the affected code path is never
reached, and audit's only "fix" is a downgrade to 7.11.0. Upgrade `react-router-dom` once a patch
above 7.18.x ships.

## Adding a page

1. Create `src/pages/<my-page>/my-page.tsx` + `my-page.module.css` + `index.ts`.
2. Add the path to `APPLICATION_ROUTES` (`src/utils/constants.ts`).
3. Register a `<Route>` in `src/components/app/app.tsx` (pages are loaded via `lazy`).
4. Fetch data with a new hook in `src/hooks/`, built on a method from `src/services/`.
