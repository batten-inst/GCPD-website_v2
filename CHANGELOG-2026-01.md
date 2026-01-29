# CHANGELOG — January 2026 (main)

## High-level summary

- Updated dataset and schema (new CSVs added, legacy CSVs removed, `complete.csv` fixed).
- Updated text and visuals to reflect GCPD v2.
- Removed financial data columns from the dataset, schema, and UI.
- Renamed domain concept from **industry** → **sector** (GICS) across code, data, and UI; added an `Unknown` sector classification.
- Refactored compute layer (`components/ComputeData.vue`) to support the new schema and extend `rangeYears` (1976–2023).
- Simplified visuals: removed legacy bubble/circle charts and an unused card component; adjusted heatmap styling and chart tooltips.
- Polished interactive UX (map card layout, reset-spinner/"calculating" behavior) and updated docs/onboarding.
- Build/config cleanups: dependency removals, `nuxt.config.js` and `package.json` updates, ESLint/jsconfig tweaks, and font consolidation (woff→woff2).
- Updated sector-classification notes and dataset references to reflect use of GICS.
- Removed unused markdown content files from the repo.

## Representative changes and commits

- Data & schema
  - Added new CSVs: de45632
  - Removed old CSVs: 50469c6, 0f89934
  - Fixed `complete.csv` (`sector_code` type): 48a9a1b
  - Updated dataset information and references for GCPD v2: 351c386

- Domain rename (industry → sector)
  - Project-wide rename and data additions (Unknown sector): a79bd46, aa72317

- Compute & pipeline
  - `components/ComputeData.vue` refactor + schema compatibility: a19d7ab, c576d58
  - Crossfilter comments/clarity: 79a3529

- Interactive UI & visuals
  - Interactive page layout and map card styling: aa20c3e
  - Reset UX and spinner behavior: 2c3d16d
  - Heatmap title, color, and dimensions updates: 009aa33, 1586b22, 1b365c8
  - Tooltip and list display updates: f204a1a, 62e08d4, 65d5a9a
  - `pages/index.vue` layout and styling refactor for improved visibility: 04e218d

- Component cleanup
  - Removed unused chart components and bubble/circle charts: 8ddadce, 11d7f8b
  - Removed `CardCompanyFacts` component: 20eb714

- Build, config & assets
  - `nuxt.config.js`, `package.json`, ESLint updates: 6181fa4, 21792d9
  - Removed unused dependencies / update `.gitignore` / fonts: b57ef0c, b0ad07a, 91b57c0

- Docs & onboarding
  - README expanded with data flow and component descriptions: 5fb63a5, 2fbfb0a
  - Copilot / contributor instructions updated: 04939d9
  - Update data preparation repo link in `README.md`: ec496f8
  - Update sector classification notes and text clarity across components: 1c7ac75, cb2f294
  - Remove unused content markdown files and update one: a5c6fe8
---
Generated from commits on `main` for January 2026.
