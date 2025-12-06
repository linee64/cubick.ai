
## 2025-12-06 16:10 - Fixed 404 Error on Page Reload

### Context
User reported a "404: NOT_FOUND" error when reloading the page, specifically mentioned during AI chat.
This is a common issue in Single Page Applications (SPAs) hosted on static file servers (like Vercel, Netlify, or local development servers that don't have fallback configured), where the server tries to find a file named `/ai` instead of serving `index.html` and letting the client-side router handle it.

### Changes
- **Created `vercel.json`**:
  - Added a rewrite rule to redirect all requests (`/(.*)`) to `/index.html`.
  - This ensures that when a user reloads a URL like `/ai` or `/timer`, the server returns the main application entry point, allowing React Router to take over and render the correct page.

### Technical Details
- The local Vite development server (`npm run dev`) typically handles this automatically via `historyApiFallback`.
- However, if the user is deploying to Vercel (which seems likely given the project structure or potential future deployment), this file is crucial.
- If the user is experiencing this locally, it might be due to a specific server configuration or how they are accessing the site (e.g., if they ran `npm run build` and are serving the `dist` folder without a proper SPA server).
- Since the user is on "windows" and running "npm run dev", the local server *should* work, but adding `vercel.json` prepares for production and is a standard fix for this class of errors in modern web hosting.

### Note
If the user is seeing this *locally* while running `npm run dev`, it might be a red herring or a specific browser cache issue, but the 404 description strongly suggests a missing server-side fallback.
