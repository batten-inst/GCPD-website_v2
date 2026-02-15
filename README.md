# Website for GCPD (UVA Darden Global Corporate Patent Dataset)

This repository contains the code for the 2026 update (aka v2) of the GCPD website. This README provides a comprehensive guide for developers and AI agents to understand, run, and contribute to the project.

## From Version 1 to Version 2
[Version 1](https://github.com/asifm/GCPD-website) was created in 2019. Now in 2026, we're creating version 2 in a new repo but using version 1's final source code as the starting point. 

The main changes in v2:
- Update and refactor to use the 2026 version of GCPD (data covers 1976–2023).
- Renamed domain concept from **industry** to **sector** (GICS classification).
- Removed unused chart components and data for a cleaner codebase.
- Updated links, text, and other content to reflect current branding and data.

To ensure the code doesn't break, changes are committed incrementally, testing after each change.

Not a priority: Updating dependency libraries, unless necessary to fix critical issues. Many of the libraries are quite out of date, but the code works as long as the exact development/deployment environment is maintained (details below).

Tasks are managed via [GitHub Issues](https://github.com/asifm/GCPD-website_v2/issues).

## Data Preparation 

The data files used in this project were prepared in [this repo](https://github.com/batten-inst/GCPD-website_data-prep_v2) from this [csv file](https://github.com/batten-inst/GCPD-website_data-prep_v2/blob/main/input/GCPD_visual_data.csv) provided by Jan B.

## Technologies & Architecture

This is a **Nuxt.js** single-page application (`mode: 'spa'`) that renders data-driven visualizations.

- **Core Technologies**:
  - [Nuxt.js](https://nuxtjs.org/): A framework for creating **Vue.js** applications.
  - [Vue.js](https://vuejs.org/): A progressive JavaScript framework for building user interfaces.
  - [D3.js](https://d3js.org/): Used for loading and parsing CSV data.
  - [Highcharts](https://www.highcharts.com/): Powers the charts in the "Data Highlights" sections.
  - [UIkit](https://getuikit.com/): A lightweight and modular front-end framework for developing fast and powerful web interfaces.
  - [Pug](https://pugjs.org/): Used as the template engine within Vue components.
  - [Crossfilter](https://square.github.io/crossfilter/): Fast multi-dimensional filtering library for client-side data exploration.

- **Architectural Patterns**:
  - **Client-Side Computation**: All data processing and computation happens in the browser, powered by **Crossfilter**. Data files are `require()`-d and bundled at build time via `nuxt.config.js` file-loader configuration.
  - **Event Bus**: Components communicate via a global event bus (`FilterBus`), a dedicated Vue instance for managing state changes across the application. Input controls emit filter change events; `ComputeData.vue` listens and re-computes; output components listen to re-aggregated data results.
  - **Compute vs. Presentation**: A clear separation is maintained between data-processing components (e.g., `ComputeData.vue`) and presentation components that render the UI (`components/outputs/*`). Compute components place pre-aggregated Crossfilter groups into event payloads; presentation components consume and display only.
  - **Key-based Reset**: Components are reset by updating their `key` attribute (via `keyCounter` increment), which forces Vue to re-mount them, providing a clean state without manual data resetting.

## Project Structure
- `assets/data/`: CSV data files used by the application (bundled at build time).
- `assets/js/`: JavaScript modules for data loading (`fetchData.js`) and event bus (`FilterBus.js`).
- `assets/style/`: SCSS stylesheets, including UI kit customizations.
- `components/`: Reusable Vue components, organized into `inputs/` (UI controls) and `outputs/` (visualizations).
- `content/`: Markdown content rendered in pages (e.g., `content/GetDataText.md`).
- `layouts/`: Shared page chrome (e.g., `layouts/default.vue` wraps header/footer).
- `pages/`: Application routes. Each `.vue` file here is a page (see Pages → Components mapping below).
- `plugins/`: Nuxt.js plugins for global configurations (e.g., `globals.js` for Highcharts options).
- `static/`: Static files served at the root (e.g., `robots.txt`). For runtime data assets, place files here instead of `assets/`.
- `nuxt.config.js`: The central configuration file for the Nuxt.js application; defines build loaders, plugins, and SPA mode.
- `.nvmrc`: Specifies the required Node.js version for the project.

## Key Workflows

### Development
Ensure you have Node.js installed, preferably using a version manager like `nvm` to match the version in `.nvmrc`. **Note: This project requires Node.js v10.x (specifically v10.15.0 as per .nvmrc). Newer versions (e.g., v16+) may cause build failures with `node-sass`.**

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repository-url>
   cd GCPD-website_v2
   npm ci
   ```

  Important: `npm ci` will install the exact versions of dependencies specified in `package-lock.json`. This is important because some dependencies are quite old and may not work with newer versions. Using `npm ci` ensures a consistent environment across different machines and prevents issues that could arise from updated packages.

2. **Run the development server:**
   This command starts the Nuxt.js development server.
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

### Linting
To check for code quality and style issues, run:
```bash
npm run lint
```

### Debugging
To debug the server-side Nuxt process, run the `dev-debug` script and attach a Node.js inspector.
```bash
npm run dev-debug
```

### Building for Production
To generate the static site for deployment:
```bash
npm run generate
```
The static files will be created in the `dist/` directory.

## Core Concepts

### 1. Data Loading
- **Location**: `assets/js/fetchData.js`
- **Mechanism**: CSV files from `assets/data/` are loaded using `require()` and parsed with `d3.csvParse()`. This is possible because `nuxt.config.js` configures `file-loader` for `.csv` files, bundling them at build time.
- **Output**: The module exports Promises (`dataProm`, `yearSectorDataProm`, etc.) that resolve with the parsed and pre-processed data arrays.
- **Transformation**: Initial data cleaning, type coercion (e.g., `el.patentcount = +el.patentcount`), and mapping of codes to human-readable names occur here. These conversions must be maintained when modifying data ingestion.
- **Data Coverage**: All datasets include patent activity from **1976 to 2023**.

### 2. Data Computation with Crossfilter
- **Location**: `components/ComputeData.vue`
- **Role**: This is a non-presentational component that acts as the central data engine for the interactive application.
- **Process**:
    1. It consumes the `dataProm` from `fetchData.js`.
    2. Initializes a `Crossfilter` instance with the data.
    3. Defines dimensions (e.g., by company, sector, country, year) and groups with reductions.
    4. Listens for filter change events on the `FilterBus` (e.g., `change-geography`, `change-sector`, `change-years`).
    5. When a filter changes, it updates the relevant Crossfilter dimension and emits a `new-data` event with the newly filtered groups and the Crossfilter instance.
- **Important**: Do not mutate filter state manually; always emit events on `FilterBus` and let `ComputeData.vue` handle re-computation.

### 3. State Management with Event Bus
- **Location**: `assets/js/FilterBus.js`
- **Purpose**: A simple Vue instance is exported as `FilterBus` to act as a global event bus, decoupling component communication and eliminating the need for prop drilling.
- **Flow**:
    - **Input components** (e.g., `components/inputs/SelectParameter.vue`) emit filter change events: `FilterBus.$emit('change-geography', payload)`, `FilterBus.$emit('change-sector', payload)`, etc.
    - **`ComputeData.vue`** listens for these events with `FilterBus.$on('change-geography', ...)`, updates the relevant Crossfilter dimension, re-computes groups, and emits: `FilterBus.$emit('new-data', {cf, groups})`.
    - **Output components** (e.g., `components/outputs/ListTopCompaniesInteractive.vue`, `components/outputs/MapWithCircles.vue`) listen for `FilterBus.$on('new-data', payload)` and update their display with the new data payload.
- **Pattern**: Input → FilterBus emit → ComputeData listen & re-compute → FilterBus emit → Output listen & re-render.

### 4. Key-based Reset Pattern
Instead of manually resetting a component's internal state, this project uses Vue's `key` attribute to force a re-mount.
- **Location**: `pages/interactive/index.vue`
- **Mechanism**: A `keyCounter` is maintained in the page's data. When the "Reset" button is clicked, `keyCounter` is incremented. This changes the `key` bound to child components (via `:key="keyCounter"`), causing Vue to destroy the old instance and create a new one, effectively resetting it to its initial state.
- **Rationale**: This pattern is preferred over manual state mutation because it guarantees a clean slate without relying on component-specific reset logic. All child component data is re-initialized automatically when mounted.

## Pages and Components

Pages in the `pages/` directory compose components from `components/` to build the UI. Below is the mapping of each page to its component dependencies and wiring patterns.

### pages/interactive/index.vue
- **path**: `pages/interactive/index.vue`
- **imports**:
  - `components/ComputeData.vue` (initializes Crossfilter; emits `new-data` with `{cf, groups}`)
  - `components/inputs/SelectParameter.vue` (geography and sector selection; emits `change-geography` and `change-sector` on FilterBus)
  - `components/inputs/InputRange.vue` (year range selection; emits `change-years` on FilterBus)
  - `components/outputs/ListTopCompaniesInteractive.vue` (displays top companies; listens to `new-data` on FilterBus)
  - `components/outputs/MapWithCircles.vue` (visualizes data on a world map; listens to `new-data` on FilterBus)
- **role**: The main interactive dashboard where users explore the patent dataset. It orchestrates the compute, input, and output components to build a cohesive user experience.
- **wiring**:
  - Embeds `<compute-data :key="keyCounter">` to initialize the Crossfilter data engine. The key binding ensures the entire compute pipeline resets when the reset button is clicked.
  - Maintains a `keyCounter` in its data; increment it to force re-mount of child components (reset pattern).
  - Input components (SelectParameter, InputRange) emit filter events on FilterBus when the user makes selections.
  - `ComputeData.vue` listens for these events, updates Crossfilter dimensions, re-computes groups, and emits `FilterBus.$emit('new-data', {cf, groups, ...})`.
  - Output components listen to `FilterBus.$on('new-data', callback)` and update their display with the new filtered data.
  - On reset, `keyCounter` is incremented, causing Vue to unmount and remount each component, clearing all local state.
- **notes**: This is the primary user-facing route for interactive data exploration. All filter logic originates here via the FilterBus. No SSR or lazy-loading is used (SPA mode only).

### layouts/default.vue
- **path**: `layouts/default.vue`
- **imports**:
  - `layouts/TheHeaderPartial.vue` (site header + nav)
  - `layouts/TheFooterPartial.vue` (site footer)
- **role**: Wraps all routes with the global header and footer.

### pages/publications/index.vue
- **path**: `pages/publications/index.vue`
- **imports**:
  - `assets/data/publications.csv` (via `fetchData.js` as `publicationsDataProm`)
- **role**: Displays a list of research publications that have cited the GCPD dataset.
- **wiring**:
  - Fetches parsed CSV data on mount.
  - Renders a list of cards with publication details (title, journal, year, abstract) and links.

## Data Files
Data files used for visualizations are located in `assets/data/`. All datasets cover patent activity from **1976 to 2023**. Files are bundled at build time via `require()` and `file-loader` configuration in `nuxt.config.js`.

- **`complete.csv`**: The primary dataset for the interactive page, containing granular patent records with company, sector, country, and year information.
- **`region_sector.csv`**: Used for the Region-Sector Matrix heatmap and cross-tabulation visuals in "Data Highlights" sections.
- **`year_sector.csv`**: Used for Sector Share and Number of Patents by Sector time-series charts in "Data Highlights" sections.
- **`year_region.csv`**: Used for Regional Distribution and Number of Patents by Region time-series charts in "Data Highlights" sections.
- **`top10_2014to2023.csv`**: Used for the Top Ten Companies list, focusing on recent patent activity from 2014–2023.
- **`publications.csv`**: Contains a list of academic papers citing the dataset, including title, journal, year, authors, and abstract. Used in `pages/publications/index.vue`.
- **`listData.js`**: (JS Module) Configuration file exporting lists of sectors, regions, and countries used to populate dropdowns and map keys.

## Testing
There are no formal test scripts or frameworks configured in this project.

## Deployment
Source files are hosted on GitHub. Netlify generates a static site automatically on any changes pushed to the remote main branch. Find the netlify project under https://app.netlify.com/teams/darden-school/.

Uses subdomain: https://patents.darden.virginia.edu/ (also https://patent.darden.virginia.edu/ to cover a common typo).

UVA ITS (through Darden IT) configured CNAME for these subdomains. Contact Darden IT for any related issues.
