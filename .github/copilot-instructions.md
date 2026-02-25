# Copilot Instructions for GCPD Website v2

## Commands

```bash
npm ci              # Install exact dependency versions (required — do NOT use npm install)
npm run dev         # Development server at http://localhost:3000
npm run generate    # Build static site to dist/
npm run lint        # ESLint + Prettier check across .js and .vue files
npm run dev-debug   # Dev server with Node inspector attached
```

> **Node.js v10.15.0 is required** (see `.nvmrc`). Newer versions break `node-sass`. Use `nvm use` before running any commands.

There is no test suite.

## Architecture

This is a **Nuxt.js 2 SPA** (`ssr: false`) that renders data-driven patent visualizations entirely client-side.

### Data Flow

```
assets/data/*.csv
   ↓ (bundled at build via file-loader + require())
assets/js/fetchData.js  →  exports Promises (dataProm, yearSectorDataProm, etc.)
   ↓
components/ComputeData.vue  →  initializes Crossfilter, defines dimensions/groups
   ↓  listens on FilterBus
   ↑  emits FilterBus.$emit('new-data', { cf, groups })
assets/js/FilterBus.js  (global Vue event bus)
   ↑  emits change-geography / change-sector / change-years
components/inputs/  (SelectParameter.vue, InputRange.vue)
   ↓  listens on FilterBus.$on('new-data', ...)
components/outputs/  (MapWithCircles.vue, ListTopCompaniesInteractive.vue, ChartHeatmap.vue, ChartStacked.vue)
```

**Critical rule**: Never mutate Crossfilter state directly. Always emit filter change events on `FilterBus` and let `ComputeData.vue` handle re-computation.

### Reset Pattern

Components are reset by incrementing `keyCounter` in `pages/interactive/index.vue`, which changes the `:key` attribute bound to child components, forcing Vue to unmount and remount them. Do not implement manual state-reset logic; use this pattern instead.

### CSV Bundling

CSV files in `assets/data/` are loaded with `require()` and parsed via `d3.csvParse()`. This works because `nuxt.config.js` registers `file-loader` for `.csv` files. Files in `static/` are served at runtime, not bundled.

## Key Conventions

- **Templates use Pug** (not HTML) inside `.vue` single-file components.
- **Styles use SCSS**; global UIkit customizations live in `assets/style/uikit-custom.scss`.
- **Highcharts global options** (font, colors, credits) are set once in `plugins/globals.js` and apply to all charts.
- **Markdown files** in `content/` are loaded as Vue components via `vue-md-loader` (configured in `nuxt.config.js`).
- **Prettier config**: single quotes, semicolons, trailing commas, bracket spacing.
- **Domain terminology**: the dataset uses **sector** (GICS classification), not "industry" — v1 used "industry"; v2 renamed it everywhere.
- **Data coverage**: all datasets cover patent activity **1976–2023**. Keep this consistent in any labels or copy.
- **Dependencies are intentionally pinned and outdated**; do not upgrade them unless fixing a critical bug. Use `npm ci`, never `npm install`.

## Project Layout (key files)

| Path | Purpose |
|---|---|
| `assets/js/fetchData.js` | Loads & parses all CSV data; exports Promises |
| `assets/js/FilterBus.js` | Global Vue event bus for filter state |
| `assets/data/listData.js` | Sector/region/country lists for dropdowns and map |
| `components/ComputeData.vue` | Central Crossfilter engine (non-presentational) |
| `pages/interactive/index.vue` | Main dashboard; owns `keyCounter` reset logic |
| `plugins/globals.js` | Highcharts global configuration |
| `nuxt.config.js` | Build loaders (CSV, Markdown), plugins, SPA mode |
