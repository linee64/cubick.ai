type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `Ты — AI тренер по спидкубингу (кубик Рубика).
Говори кратко, без воды: 120–150 слов максимум, если не просят подробнее.
Отвечай ТОЛЬКО по спидкубингу: техники/тренировки, анализ времён/статистики, алгоритмы (CFOP/F2L/OLL/PLL), скрамблы, таймеры, настройка/обслуживание кубов, WCA правила, здоровье рук в контексте тренинга.
Если запрос вне спидкубинга — вежливо откажись и попроси переформулировать.
Строго Markdown: короткий заголовок (###), 1–2 предложения резюме, затем маркированный список шагов/советов; алгоритмы — в код-блоках; таблицы — когда есть сравнения.
Пиши на языке пользователя (RU/EN) и избегай лишних эмоций/воды.`;

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