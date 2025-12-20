## 2025-12-20 13:30 - Fix Syntax Error in i18n

### Context
User reported a `vite-error-overlay`. Found a syntax error in `src/lib/i18n.tsx` where the `enDict` object was closed prematurely, causing subsequent properties to be outside the object.

### Changes
- **Updated `src/lib/i18n.tsx`**:
  - Removed the premature closing brace `};` and ensured correct comma separation for the new motivational quotes keys.
  - Verified build passes successfully.
