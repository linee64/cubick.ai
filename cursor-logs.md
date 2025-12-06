
## 2025-12-06 16:05 - Replaced Icons and Fixed Mobile Reload Issue

### Context
1. User requested to replace old emoji icons (Timer, Methods, AI) on the landing page with new SVG icons (`ai.svg`, `methods.svg`, `timer.svg`).
2. User reported that on mobile, reloading the page kicks them out (logs them out).

### Changes
- **Modified `src/pages/Index.tsx`**:
  - Replaced the `div`s containing emojis (`⏱️`, `📚`, `ИИ`) with `img` tags pointing to `/icons/timer.svg`, `/icons/methods.svg`, `/icons/ai.svg`.
  - Applied `invert brightness-0` classes to ensure icons are visible (white) on the gradient background.

- **Modified `src/hooks/use-auth.ts`**:
  - Improved authentication initialization logic to fix the "kick out" issue.
  - **Old behavior**: Only called `getUser()` (server check). If it failed (e.g., network glitch on mobile) or took too long, the user might be treated as logged out.
  - **New behavior**:
    1. Checks `getSession()` (local storage) first and immediately sets the user if found. This prevents "flashing" and provides offline support.
    2. Then calls `getUser()` to validate the session with the server.
    3. If `getUser()` fails due to an error (e.g., network) but `getSession()` found a user, the local user session is preserved (fallback).
    4. This ensures that reloading on a flaky mobile connection doesn't immediately log the user out.

### Technical Details
- **Icons**: SVG files were confirmed to exist in `public/icons/`.
- **Auth**: Supabase `getUser` vs `getSession` strategy implemented for robustness.
