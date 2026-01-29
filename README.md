# Website for GCPD (UVA Darden Global Corporate Patent Dataset)

This repository contains the code for the 2026 update (aka version 2) of the GCPD website.

## From Version 1 to Version 2
[Version 1](https://github.com/asifm/GCPD-website) was created in 2019. Now in 2026, we're creating version 2 in a new repo but using version 1's final source code as the starting point. 

The main changes:
- Change visuals to use the 2026 version of GCPD.
- Update links, text, and other content to reflect the 2026 update.

To ensure the code doesn't break, changes are committed incrementally, testing after each change.

Not a priority: Updating dependency libraries, unless necessary to fix critical issues. Many of the libraries are quite out of date, but the code works as long as the exact development/deployment environment is maintained (details below).

Tasks are managed via [GitHub Issues](https://github.com/asifm/GCPD-website_v2/issues).

## Technologies Used
- [Nuxt.js](https://nuxtjs.org/): A framework for creating Vue.js applications with server-side rendering and static site generation capabilities.
- [Vue.js](https://vuejs.org/): A progressive JavaScript framework for building user interfaces.
- [D3.js](https://d3js.org/): A JavaScript library for producing dynamic, interactive data visualizations in web browsers.
- [Netlify](https://www.netlify.com/): A platform for deploying static websites with continuous deployment from Git repositories.

## Project Structure
- `assets/`: Contains static assets like stylesheets and data files.
- `components/`: Vue components used throughout the application.
- `pages/`: Vue files that define the routes of the application.
- `plugins/`: Nuxt.js plugins for global configurations.
- `static/`: Static files served directly.
- `nuxt.config.js`: Configuration file for the Nuxt.js application.

## Data Flow

The application's data flow can be understood in several key stages:

1.  **Data Loading (`assets/js/fetchData.js`):**
    *   This module is responsible for asynchronously loading various CSV data files located in `assets/data/` using D3.js.
    *   It also imports `listData.js` (from `assets/data/`) to retrieve lookup lists for categories like sectors and countries.
    *   Initial data cleaning and transformation, such as converting string values to appropriate data types (e.g., numbers) and mapping `sector_code` to human-readable `sector` names, occurs here.
    *   `fetchData.js` exports Promises for each processed dataset, which are then consumed by other parts of the application.

2.  **Interactive Page Data Processing (`components/ComputeData.vue`):**
    *   This component specializes in processing the primary `complete.csv` dataset for the interactive exploration page (`pages/interactive/index.vue`).
    *   It imports the `dataProm` (resolving to the `complete.csv` data) from `assets/js/fetchData.js`.
    *   A `crossfilter` instance is initialized with this dataset, and various dimensions (e.g., `company`, `sector`, `country`, `year`) and groups are created.
    *   `ComputeData.vue` acts as a central data hub for the interactive page, listening for filter change events (e.g., `change-geography`, `change-sector`, `change-rangeyears`) broadcast via the `FilterBus` event bus.
    *   Upon receiving a filter event, it applies the corresponding filters to the `crossfilter` dimensions to update the dataset.
    *   After computation, it emits a `new-data` event via `FilterBus`, providing the filtered `crossfilter` instance and its groups to listening components.

3.  **Interactive Page Data Visualization (`pages/interactive/index.vue` and `outputs` components):**
    *   The `pages/interactive/index.vue` orchestrates the interactive visualizations, embedding `ComputeData.vue` along with output components like `ListTopCompaniesInteractive.vue` and `MapWithCircles.vue`.
    *   It subscribes to the `new-data` event from `FilterBus`.
    *   When filtered data is received, it passes the relevant `crossfilter` groups as properties to its child visualization components (`ListTopCompaniesInteractive.vue`, `MapWithCircles.vue`), allowing them to dynamically render updated views.

4.  **Data Highlights Pages Data Visualization (`pages/data-highlights/.../index.vue`):**
    *   The specialized "Data Highlights" pages (e.g., `rise-of-asia`, `tech-leading-innovation`, `top-companies`) directly import specific data Promises (e.g., `yearSectorDataProm`, `regionSectorDataProm`) from `assets/js/fetchData.js`.
    *   These pages perform any additional data transformations or aggregations required for their unique visualizations within their Vue lifecycle hooks (e.g., `beforeCreate`, `created`).
    *   The prepared data is then passed as properties to their respective charting components (e.g., `ChartStacked`, `ChartHeatmap`) for rendering.

5.  **Lookup Data (`assets/data/listData.js`):**
    *   This file provides static JavaScript objects containing lists of countries, sectors, and other categorical data.
    *   It is utilized by `assets/js/fetchData.js` for data mapping purposes and by UI components like `SelectParameter.vue` to populate dropdowns and other user interface elements.

## Data Files Used for Visualizations
Data files are located in the `assets/data/` directory.

### `complete.csv`
Used in the interactive exploration page (`pages/interactive/index.vue`) to power the `ListTopCompaniesInteractive.vue` and `MapWithCircles.vue` components.

### `region_sector.csv`
Used in `pages/data-highlights/rise-of-asia/index.vue` for the Region-Sector Matrix heatmap.

### `year_sector.csv`
Used in `pages/data-highlights/tech-leading-innovation/index.vue` for the Sector Share of Patents by Year stacked column chart and the Number of Patents by Sector and Year streamgraph.

### `year_region.csv`
Used in `pages/data-highlights/rise-of-asia/index.vue` for the Regional Distribution of Patents by Year stacked column chart and the Number of Patents by Region and Year streamgraph.

### `top10_2014to2023.csv`
Used in `pages/data-highlights/top-companies/index.vue` for the Top Ten Companies by Yearly Counts of Patents Assigned list.

## Vue Components
Here is a breakdown of the Vue components in the `components` directory:

*   **`ComputeData.vue`**: This is a non-presentational component that performs data computations using `crossfilter`. It listens for filter changes from other components, processes the data, and emits a `new-data` event with the filtered data.

*   **`inputs/InputRange.vue`**: This component provides a slider for selecting a range of years. It uses the `vue-slider-component` and emits a `change-rangeyears` event when the year range is changed.

*   **`inputs/SelectParameter.vue`**: A reusable component that uses `vue-select` to create a dropdown for selecting a parameter (either country or sector). It emits a `change-geography` or `change-sector` event when a selection is made.

*   **`outputs/ChartHeatmap.vue`**: A reusable component that renders a heatmap chart using `highcharts-vue`. It takes chart options as a prop.

*   **`outputs/ChartStacked.vue`**: A reusable component that renders a stacked column chart (or streamgraph) using `highcharts-vue`. It takes chart options as a prop.

*   **`outputs/ListTopCompaniesInteractive.vue`**: This component displays a list of top companies based on the filtered data. It receives data from the `ComputeData` component via an event bus.

*   **`outputs/MapWithCircles.vue`**: This component renders a world map with circles representing data for each country. It uses D3.js for map projection and rendering. It also listens for data changes to update the circles on the map.

## Development
Ensure you have [Node.js](https://nodejs.org/), of the exact version specified in `.nvmrc`, installed.

To run the project locally, follow these steps:
1. Clone the repository. Then:
   ```bash
   cd GCPD-website_v2
   npm install
   npm run dev
   ```
2. Open browser and navigate to `http://localhost:3000` to view the application.

## Static Site Generation
To build the project for production:
```bash
npm run generate
```
The generated static files will be located in the `dist/` directory, ready for deployment.

*However, the above is not necessary if deploying directly to Netlify, as it will handle the build process automatically.*

# Deployment
Source files are hosted on GitHub. Netlify generates a static site automatically on any changes pushed to the remote main branch. Find the netlify project under https://app.netlify.com/teams/darden-school/.

Uses subdomain: https://patents.darden.virginia.edu/ (also https://patent.darden.virginia.edu/ to cover a common typo).

UVA ITS (through Darden IT) configured CNAME for these subdomains. Contact Darden IT for any related issues.
