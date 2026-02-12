# Website for GCPD (UVA Darden Global Corporate Patent Dataset)

This repository contains the code for the 2026 update (aka version 2) of the GCPD website. This README provides a comprehensive guide for developers and AI agents to understand, run, and contribute to the project.

## From Version 1 to Version 2
[Version 1](https://github.com/asifm/GCPD-website) was created in 2019. Now in 2026, we're creating version 2 in a new repo but using version 1's final source code as the starting point. 

The main changes:
- Change visuals to use the 2026 version of GCPD.
- Update links, text, and other content to reflect the 2026 update.

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

- **Architectural Patterns**:
  - **Client-Side Computation**: All data processing and computation happens in the browser, powered by **Crossfilter**.
  - **Event Bus**: Components communicate via a global event bus (`FilterBus`), a dedicated Vue instance for managing state changes across the application.
  - **Compute vs. Presentation**: A clear separation is maintained between data-processing components (e.g., `ComputeData.vue`) and presentation components that render the UI (`components/outputs/*`).
  - **Key-based Reset**: Components are reset by updating their `key` attribute, which forces Vue to re-mount them, providing a clean state without manual data resetting.

## Project Structure
- `assets/`: Contains data files (`.csv`), JavaScript modules (`.js`), and styles (`.scss`).
- `components/`: Reusable Vue components, organized into `inputs/` and `outputs/`.
- `pages/`: Application routes. Each `.vue` file here is a page.
- `plugins/`: Nuxt.js plugins for global configurations (e.g., Highcharts options).
- `static/`: Static files that are served directly at the root (e.g., `robots.txt`, data for the map).
- `nuxt.config.js`: The central configuration file for the Nuxt.js application.
- `.nvmrc`: Specifies the required Node.js version for the project.

## Key Workflows

### Development
Ensure you have Node.js installed, preferably using a version manager like `nvm` to match the version in `.nvmrc`.

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repository-url>
   cd GCPD-website_v2
   npm ci
   ```

  `npm ci` will install the exact versions of dependencies specified in `package-lock.json`. This is important because some dependencies are quite old and may not work with newer versions. Using `npm ci` ensures a consistent environment across different machines and prevents issues that could arise from updated packages.

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
- **Mechanism**: CSV files from `assets/data/` are loaded using `require()` and parsed with `d3.csvParse`. This is possible because `nuxt.config.js` configures `file-loader` for `.csv` files, bundling them at build time.
- **Output**: The module exports Promises (`dataProm`, `yearSectorDataProm`, etc.) that resolve with the parsed and pre-processed data arrays.
- **Transformation**: Initial data cleaning, type coercion (e.g., `+el.patentcount`), and mapping of codes to human-readable names occur here.

### 2. Data Computation with Crossfilter
- **Location**: `components/ComputeData.vue`
- **Role**: This is a non-presentational component that acts as the central data engine for the interactive page.
- **Process**:
    1. It consumes the `dataProm` from `fetchData.js`.
    2. Initializes a `Crossfilter` instance with the data.
    3. Defines dimensions (e.g., by company, sector, country, year) and groups.
    4. Listens for filter change events on the `FilterBus`.
    5. When a filter changes, it updates the relevant Crossfilter dimension and emits a `new-data` event with the newly filtered groups.

### 3. State Management with Event Bus
- **Location**: `assets/js/FilterBus.js`
- **Purpose**: A simple Vue instance is exported as `FilterBus` to act as a global event bus, decoupling component communication.
- **Flow**:
    - **Input components** (e.g., `SelectParameter.vue`) emit filter change events like `FilterBus.$emit('change-geography', 'Europe')`.
    - **`ComputeData.vue`** listens for these events with `FilterBus.$on('change-geography', ...)`, re-computes the data, and emits the result.
    - **Output components** (e.g., `ListTopCompaniesInteractive.vue`) listen for `FilterBus.$on('new-data', ...)` and update their display with the new data payload.

### 4. Component Reset Pattern
Instead of manually resetting a component's internal state, this project uses Vue's `key` attribute to force a re-render.
- **Location**: `pages/interactive/index.vue`
- **Mechanism**: A `keyCounter` is maintained in the page's data. When the "Reset" button is clicked, `keyCounter` is incremented. This changes the `key` bound to child components, causing Vue to destroy the old instance and create a new one, effectively resetting it to its initial state.

## Pages and Components

Pages in the `pages/` directory compose components from `components/` to build the UI.

### Example: `pages/interactive/index.vue`
- **path**: `pages/interactive/index.vue`
- **role**: The main interactive dashboard where users can explore the patent dataset. It orchestrates the compute, input, and output components.
- **imports**:
  - `components/ComputeData.vue` (the data engine)
  - `components/inputs/SelectParameter.vue` (for country and sector selection)
  - `components/inputs/InputRange.vue` (for year range selection)
  - `components/outputs/ListTopCompaniesInteractive.vue` (displays top companies)
  - `components/outputs/MapWithCircles.vue` (visualizes data on a world map)
- **wiring**:
  - It embeds `<compute-data>` to trigger the data processing lifecycle.
  - It uses the `keyCounter` and `:key` binding on its child components to implement the reset functionality.
  - Input components emit events on the `FilterBus`, and output components receive their data from `FilterBus` events originating from `ComputeData`.

## Data Files
Data files used for visualizations are located in `assets/data/`.

- **`complete.csv`**: The primary dataset for the interactive page.
- **`region_sector.csv`**: Used for the Region-Sector Matrix heatmap.
- **`year_sector.csv`**: Used for the Sector Share and Number of Patents by Sector charts.
- **`year_region.csv`**: Used for the Regional Distribution and Number of Patents by Region charts.
- **`top10_2014to2023.csv`**: Used for the Top Ten Companies list.

## Testing
There are no formal test scripts or frameworks configured in this project. However, linting is available to maintain code consistency.

```bash
npm run lint
```

## Deployment
Source files are hosted on GitHub. Netlify generates a static site automatically on any changes pushed to the remote main branch. Find the netlify project under https://app.netlify.com/teams/darden-school/.

Uses subdomain: https://patents.darden.virginia.edu/ (also https://patent.darden.virginia.edu/ to cover a common typo).

UVA ITS (through Darden IT) configured CNAME for these subdomains. Contact Darden IT for any related issues.
