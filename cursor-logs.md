## 2025-12-20 13:40 - Update Global Font

### Context
User requested to add a suitable font to make the site look less "naked" and more attractive, especially on mobile.

### Changes
- **Updated `src/index.css`**:
  - Added `Montserrat` to Google Fonts import.
  - Set `font-family: 'Montserrat', sans-serif;` on `body`.
- **Updated `tailwind.config.ts`**:
  - Extended `fontFamily` to use `Montserrat` as the default `sans` font.
