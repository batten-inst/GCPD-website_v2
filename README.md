# Website for GCPD (UVA Darden Global Corporate Patent Dataset)

This repository contains the code for the 2026 update (aka version 2) of the GCPD website.

## From Version 1 to Version 2
[Version 1](https://github.com/asifm/GCPD-website) was created in 2019. Now in 2026, we're creating version 2 in a new repo but using version 1's final source code as the starting point. 

The main changes:
- Change visuals to use the 2026 version of GCPD.
- Update links, text, and other content to reflect the 2026 update.

To ensure code doesn't break, changes are committed incrementally, testing after each change.

Not a priority: Updating dependency libraries to their latest versions, unless necessary to fix critical issues. Many of the libraries are quite out of date, but the code works as is.

Tasks are managed via [GitHub Issues](https://github.com/asifm/GCPD-website_v2/issues).

## Technologies Used
- [Nuxt.js](https://nuxtjs.org/): A framework for creating Vue.js applications with server-side rendering and static site generation capabilities.
- [Vue.js](https://vuejs.org/): A progressive JavaScript framework for building user interfaces.
- [D3.js](https://d3js.org/): A JavaScript library for producing dynamic, interactive data visualizations in web browsers.
- [Netlify](https://www.netlify.com/): A platform for deploying static websites with continuous deployment from Git repositories.

## Features
- Interactive visualizations of patent data.
- Responsive design for optimal viewing on various devices.
- Easy navigation through different sections of the dataset.

## Project Structure
- `assets/`: Contains static assets like stylesheets and data files.
- `components/`: Vue components used throughout the application.
- `pages/`: Vue files that define the routes of the application.
- `plugins/`: Nuxt.js plugins for global configurations.
- `static/`: Static files served directly.
- `nuxt.config.js`: Configuration file for the Nuxt.js application.

## Development
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

Contact IT support at Darden for any DNS related changes on their end for these subdomains.

On Netlify, DNS settings for virginia.edu are managed at https://app.netlify.com/teams/darden-school/dns/virginia.edu



