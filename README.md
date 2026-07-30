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
| Client state    | Redux Toolkit 2 (search and sorting filters)             |
| HTTP            | axios + a single `ApiError`                              |
| Unit tests      | Vitest 4 + Testing Library + MSW                         |
| E2E             | Playwright                                               |
| Code quality    | ESLint 9 (flat), Prettier, Stylelint, knip               |
| Git hooks       | husky + lint-staged + commitlint (conventional)          |
| Package manager | Yarn 4.9.1 (`nodeLinker: node-modules`)                  |

### What already works

Two screens are built to the Figma design:

- **Blogs** — a list of blog rows with a 156px avatar, website link and clamped description,
  debounced search, sorting, and a "Show more" button that **appends** the next page to the same
  list (`useInfiniteQuery`).
- **Posts** — a three-column grid of post tiles with preview, title, blog name and date, plus
  sorting and the same "Show more" behaviour.

Data is served by MSW, so the app runs and passes its tests with no backend — swap
`src/services/*` and `src/mocks/handlers.ts` to point at a real API.

Detail pages for a single blog or post are not implemented: the design does not cover them yet, so
the cards are intentionally not clickable.

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

| Command              | What it does                                                               |
| -------------------- | -------------------------------------------------------------------------- |
| `yarn dev`           | Dev server on `http://localhost:8080`, `/api` proxied to `VITE_API_TARGET` |
| `yarn dev:mock`      | Dev server backed by MSW mocks instead of a real backend                   |
| `yarn build`         | Type check + production build into `build/`                                |
| `yarn preview`       | Serve the production build locally                                         |
| `yarn typecheck`     | Type check without emit                                                    |
| `yarn test`          | Unit tests                                                                 |
| `yarn test:watch`    | Unit tests in watch mode                                                   |
| `yarn test:coverage` | Coverage (v8)                                                              |
| `yarn e2e`           | Playwright; starts the mock dev server itself                              |
| `yarn e2e:open`      | Playwright UI                                                              |
| `yarn lint`          | ESLint + Stylelint + format check                                          |
| `yarn lint:fix`      | Autofix linters and Prettier                                               |
| `yarn find-deadcode` | knip — unused files, exports and dependencies                              |

Playwright boots the server through its own `webServer` config, so mocks are always on for e2e. To
run the specs against an app you started yourself, set `E2E_BASE_URL` and `webServer` is skipped.

The mock flag lives in `.env.mock` and is picked up by `--mode mock`. Passing `VITE_USE_MOCK` as a
shell variable does **not** work: Vite reads client env from `.env` files, not from the process
environment.

## Layout

```
src/
├── components/          UI components: <kebab-case>/<kebab-case>.tsx + .module.css + index.ts
│   ├── app/             routing
│   ├── root/            provider wrappers around App
│   ├── app-layout/      header + sidebar + content frame
│   ├── app-header/      "Blogger Platform" bar
│   ├── app-sidebar/     Blogs / Posts navigation with the accent indicator
│   ├── page-header/     section heading
│   ├── toolbar/         search + sorting row
│   ├── search-input/
│   ├── sort-select/     generic over the sort value type
│   ├── avatar/          image placeholder, circle 156px or square 24px
│   ├── blog-card/       blog row on the Blogs page
│   ├── post-card/       post tile on the Posts page
│   ├── show-more-button/
│   ├── icons/           inline SVG icons
│   ├── error-boundary/
│   └── spinner/
├── hooks/               app.ts (typed dispatch/selector), use-blogs.ts, use-posts.ts, use-debounce.ts
├── mocks/               MSW: handlers.ts, browser.ts, server.ts, fixtures/
├── pages/               blogs-page, posts-page, not-found-page
├── services/            http-client.ts, blogs-api.ts, posts-api.ts, query-client.ts
├── store/               index.ts, reducers.ts, slices/, selectors/
├── test/                setup.ts, test-utils.tsx (renderWithProviders)
├── types/               domain types (blog.ts, post.ts, store.ts)
├── utils/               constants.ts (routes, query keys, config), date.utils.ts
├── index.css            design tokens and base styles
└── main.tsx             entry point
e2e/                     Playwright specs
```

## Design tokens

Values taken from Figma and declared in `src/index.css`:

| Token                    | Value                                          |
| ------------------------ | ---------------------------------------------- |
| `--color-surface`        | `#FCFBFB` — header and sidebar                 |
| `--color-bg-muted`       | `#F7F6F6` — content background                 |
| `--color-border`         | `#DEDBDC`                                      |
| `--color-text`           | `#1A1718`                                      |
| `--color-accent`         | `#F8346B` — active menu item and its indicator |
| `--shadow-header`        | `0 1 2 /10%` + `0 5 20 /3%` of `#1D2126`       |
| `--layout-header-height` | `60px`                                         |
| `--layout-sidebar-width` | `252px`                                        |
| `--layout-content-width` | `940px`                                        |

Type scale follows the design: H1 26/36 semibold (app title), H4 18/24 semibold (section and card
headings), body 14/24 regular.

The design specifies **Inter**, but no web font is bundled yet — `--font-family` lists `inter` first
and falls back to the system stack, so right now the app renders in the system font. Add the font
(self-hosted `@font-face` or a `<link>` in `index.html`) to match the mockups exactly.

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

`DEFAULT_PAGE_SIZE` (5 blogs) and `POSTS_PAGE_SIZE` (6 posts, one full grid) are set in
`src/utils/constants.ts` so that "Show more" is reachable with the current fixtures.

Everything — UI copy, comments, tests and docs — is in English, matching the design.

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
