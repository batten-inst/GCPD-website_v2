# CHANGELOG — February 2026 (main)

## High-level summary

- **Homepage Redesign**: Major updates to layout, padding, and content; replaced the world map visual for a cleaner look.
- **Top Innovators List**: Enhanced styling and content. 
- **Interactive Data & Functionality**: Fixed data reset bugs, updated year range logic to exclude incomplete 2023 data, and improved text/prompts. Improved year selection with a new side-by-side slider and dropdown UI.
- **Assets & Performance**: Migrated images to static storage (removing Cloudinary dependency), optimized footer, and removed unused webpack config.
- **Content Updates**: Refreshed "About Us", "Publications", and "Get Data" pages; switched survey tool from Qualtrics to Google Forms.

## Representative changes and commits

- **Interactive UI & Visuals**
  - Major home page update (content & style): `1f575a3`
  - Homepage world map update: `3a776e9`
  - Layout & padding improvements: `2a83937`, `df4c051`
  - Top Innovators list overhaul: `a8ee5bf`
  - Year selection UI (slider + dropdown): `11a9b83`, `31f047a`

- **Data & Schema**
  - Updated default year range to exclude 2023 due to incomplete data: `c7bba3d`, `188fdf7`
  - Update Venezuela references for consistency: `6a46c54`
  - Added `aggregate.csv`: `89febb4`

- **Logic & Functionality**
  - Fix reset bug: years shown on side bar now resets after reset button is clicked: `1d03b62`
  - URL encoding for Google search queries: `6b88f0c`
  - Change survey from Qualtrics to Google Forms: `cf2f152`

- **Content & Assets**
  - Update About Us, Publications, Get Data pages: `0bdde34`, `f5e887e`, `14fac39`
  - Move images to static / remove Cloudinary dependency: `45fdfd9`, `eba9a7c`
  - Remove unused webpack config and assets: `38a3c58`, `002a018`

---
Generated from commits on `main` for February 2026.
