# Copilot instructions for contributors and AI agents

This file contains focused, actionable guidance to help AI coding agents become productive quickly in this codebase.

1. Project overview
- Single-page Nuxt app (see `nuxt.config.js` — `mode: 'spa'`).
- Data-driven visualizations: CSV data in `assets/data/` (also some static files in `static/data/`).
- Computation is done client-side with Crossfilter; UI components render results and subscribe to an event bus.

2. Key workflows / commands
- Dev server: `npm run dev` (starts Nuxt in SPA dev mode).
- Debug with inspector: `npm run dev-debug` (node --inspect on Nuxt binary).
- Generate: `npm run generate` (static export).
- Lint: `npm run lint`.

3. Important files & patterns (use these examples)
- Data loading: `assets/js/fetchData.js` — CSVs are `require()`-d and parsed with `d3.csv`; exported promises like `dataProm` are consumed by `components/ComputeData.vue`.
- Heavy computation: `components/ComputeData.vue` initializes Crossfilter, creates dimensions/groups, computes reductions, and emits summarized data via the event bus.
- Event bus: `assets/js/FilterBus.js` exports `FilterBus` (Vue instance). Presentation components listen to `FilterBus.$on('new-data', ...)` and controls emit `FilterBus.$emit('change-geography', payload)` (see `ComputeData.vue` and `pages/interactive/index.vue`).
- Presentation components: `components/outputs/` for charts & lists, `components/inputs/` for UI controls. Use `key`-based re-mounting (see `pages/interactive/index.vue` and `keyCounter`) to reset components.
- Global chart config: `plugins/globals.js` sets Highcharts options (colors, credits); plugins are registered in `nuxt.config.js`.
- Build rules: `nuxt.config.js` extend adds loaders for `.csv` (file-loader) and `.md` (vue-md-loader); CSVs are therefore bundled when `require()`d.

4. Conventions and gotchas
- Compute vs Presentation: keep data transforms in `ComputeData.vue` or similar compute-only modules; presentation components expect pre-aggregated Crossfilter groups.
- CSV usage: data files in `assets/data/` are imported with `require()` (not fetched at runtime). For runtime static assets, use `static/data/`.
- Reset pattern: components are reset by changing a `key` property (increment `keyCounter`) rather than manual state mutation.
- Date / number conversions: `fetchData.js` coerces numeric fields (e.g., `el.patentcount = +el.patentcount`) — maintain these conversions when modifying ingestion.
- UI library: uses UIKit + custom SCSS at `assets/style/uikit-custom.scss` and Pug templates in Vue files.

5. Debugging tips
- If a visualization shows empty data, inspect `FilterBus` events and confirm `ComputeData.vue` emitted `new-data` containing `cf` (Crossfilter instance) and groups.
- To step through client-side logic, run `npm run dev-debug` and attach Chrome DevTools to the inspector port.
- Source maps: `nuxt.config.js` enables `source-map` for client and `inline-source-map` for server builds.

6. Tests and CI
- There are no explicit test scripts in `package.json`. Linting is available via `npm run lint`.

7. Where to look for follow-up edits
- Data flows & transforms: `components/ComputeData.vue`, `assets/js/fetchData.js`.
- UI wiring and examples: `pages/interactive/index.vue` and `components/outputs/*`.
- Global config: `nuxt.config.js`, `plugins/`.

8. Pages → Components mapping

Each file under pages/ is a top-level route that composes smaller Vue components (from components/). Pages typically:
- import one compute component (components/ComputeData.vue or a compute-only module),
- import zero or more input controls (components/inputs/*),
- import zero or more presentation components (components/outputs/*),
- wire these pieces together via the event bus (assets/js/FilterBus.js), props, and a key-based reset pattern.

How to read / document a page
- path: pages/<...>.vue
- imports: list of component filenames it imports
- role: brief description (route purpose, primary UI)
- wiring: how it connects to ComputeData and FilterBus (events emitted/listened, use of keyCounter)
- notes: any special behavior (SSR mode, data sources, lazy-loading)

Example (pages/interactive/index.vue)
- path: pages/interactive/index.vue
- imports:
  - components/ComputeData.vue (initializes Crossfilter and emits 'new-data')
  - components/inputs/GeographySelector.vue (emits 'change-geography' on FilterBus)
  - components/outputs/PatentsChart.vue, PatentsList.vue (listen to 'new-data' on FilterBus)
- role: interactive dashboard route; orchestrates compute and presentation components
- wiring:
  - passes config props to ComputeData
  - increments keyCounter to force remount of outputs for resets
  - controls call FilterBus.$emit(...) to update filters; ComputeData re-computes and emits FilterBus.$emit('new-data', payload)

Minimal template to add when documenting a page
- path:
- imports:
- role:
- wiring:
- notes:

Add one documented block like the example above for each file in pages/ so contributors can quickly see which components each route uses and how they communicate.
