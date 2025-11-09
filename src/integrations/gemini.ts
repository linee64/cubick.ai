type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `Ты — AI тренер по кубику Рубика.
Давай структурированные, понятные советы по улучшению техники:
- Анализируй времена сборки и предлагай план тренировок
- Объясняй алгоритмы простым языком (CFOP: крест, F2L, OLL, PLL)
- Мотивируй, указывай типичные ошибки и как их исправить`;

function toGeminiContents(messages: ChatMessage[]) {
  const contents = (messages ?? []).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  contents.unshift({ role: "user", parts: [{ text: systemPrompt }] });
  return contents;
}

export async function callGemini(
  messages: ChatMessage[],
  apiKey: string,
  signal?: AbortSignal
): Promise<string> {
  if (!apiKey) throw new Error("VITE_GEMINI_API_KEY отсутствует");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: toGeminiContents(messages) }),
    signal,
  });

  if (!response.ok) {
    const text = await response.text();
    if (response.status === 429) {
      throw new Error("Превышен лимит запросов к Gemini (429)");
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error("Нет доступа к Gemini API ключу (401/403)");
    }
    throw new Error(`Ошибка Gemini (${response.status}): ${text}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .map((p: Record<string, unknown>) =>
      typeof p?.text === "string" ? (p.text as string) : ""
    )
    .join("");
  return text || "";
}