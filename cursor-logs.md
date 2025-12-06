
## 2025-12-06 15:50 - Enabled Bold Text in AI Responses

### Context
User requested to "add markdown with bold font so the AI uses it too".
Previously, the system prompt explicitly instructed the AI to *avoid* bold highlighting.
The frontend `AICoach.tsx` was already capable of rendering `**bold**` text via `ReactMarkdown` components (`strong` -> `font-bold`), but the AI was suppressing it due to instructions.

### Changes
- **Modified `src/integrations/gemini.ts`**:
  - Updated `systemPrompt`:
    - Removed instruction to "avoid intrusive bold highlighting".
    - Added instruction: "Используй **жирный шрифт** для выделения ключевых терминов, алгоритмов и важных моментов" (Use bold font to highlight key terms, algorithms, and important points).
    - Updated format description to include "**жирный шрифт** для акцентов".

### Impact
- The AI will now actively use bold text to emphasize key parts of its advice (e.g., algorithm names like **T-Perm**, keywords like **Look-ahead**).
- The mobile interface (and desktop) will render this using the existing `font-bold` style.
