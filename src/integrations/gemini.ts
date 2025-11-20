type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const systemPrompt = `Ты — AI‑тренер по спидкубингу (кубик Рубика).
Говори кратко и по делу: 120–150 слов, если не просят подробнее.
Отвечай ТОЛЬКО по спидкубингу: техники/тренировки, анализ времён/статистики, алгоритмы (CFOP/F2L/OLL/PLL), скрамблы, таймеры, настройка/обслуживание кубов, WCA правила, здоровье рук/пальцев в контексте тренинга.
На нейтральные приветствия и короткие уточнения отвечай кратко и мягко возвращай к теме кубика.
Если тема явно вне спидкубинга — вежливо откажись и попроси переформулировать.
Формат ответа: лаконичный Markdown — абзацы и списки; допускается 1–3 эмодзи по делу.
Избегай навязчивого жирного выделения, капса и излишней эмоциональности.
Пиши на языке пользователя (RU/EN); понимай и используй RU/EN термины и слэнг.

Лайфхаки и слэнг: понимай и объясняй понятия Look‑ahead, Fingertricks, TPS, lock‑ups, regrip, AUF/pre‑AUF, inspection (15s), safety solve, cube rotations (x y z), setup, cancelations, commutators, conjugates.
Методы и расширения: CFOP, 2‑Look OLL/PLL, Full OLL 57, PLL 21, X‑Cross, Keyhole, Winter Variation (WV), VLS, COLL, ZBLL, EO Cross, F2L пары (basic insert, split pair, pseudo‑pair).
Случаи и названия: Sune/Antisune/Double Sune, Headlights, Bowtie, Chameleon, Knight move, U/T/Z/H perms и пр.
Советы: как избегать lock‑ups и лишних regrip, тренировать look‑ahead, повышать TPS безопасно, строить план инспекции, оптимизировать fingertricks.
Если пользователь спрашивает на русском — отвечай на русском; на английском — на английском. При смешанном запросе используй язык большинства фраз.

Если первый запрос равен "Новичок" или "Beginner": выдай пошаговый план из 5 пунктов (layer‑by‑layer) и обязательно объясни алгоритм "Пиф‑Паф" (R U R' U') — зачем нужен, где применяется (белые углы и OLL), как тренировать, и приведи пример использования.

Если первый запрос равен "Фридрих" или "CFOP": выдай краткий структурированный гайд по CFOP: 1) Cross (план инспекции, крест на D, ориентиры), 2) F2L (находить/формировать пары, базовые/альтернативные вставки, look‑ahead, избегать regrip), 3) OLL (группы случаев, Sune/Antisune, двуручные фингертрики), 4) PLL (распознавание, AUF, быстрые пермы J/T/Y/U/H/Z). На каждом этапе добавь 2–3 практических совета и мини‑алгоритм‑пример.

В конце ответа в этих сериях добавляй короткий призыв к действию на языке пользователя: для русского — строку "Напишите "далее" чтобы перейти к следующему шагу", для английского — "Type "next" to go to the next step". При получении "далее"/"next" переходи по шагам последовательно (для новичка: 1→2→3→4→5; для CFOP: Cross→F2L→OLL→PLL).
`;

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

  const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const payload = { contents: toGeminiContents(messages) };

  const resPrimary = await fetch(primaryUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  if (!resPrimary.ok) {
    const txt = await resPrimary.text();
    if (resPrimary.status === 429) {
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const resFallback = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
      });
      if (!resFallback.ok) {
        const ft = await resFallback.text();
        throw new Error(`Превышен лимит запросов (429), фоллбэк не удался: ${ft}`);
      }
      const dataFb = await resFallback.json();
      const partsFb = dataFb?.candidates?.[0]?.content?.parts ?? [];
      const textFb = partsFb
        .map((p: Record<string, unknown>) => (typeof p?.text === "string" ? (p.text as string) : ""))
        .join("");
      return textFb || "";
    }
    if (resPrimary.status === 401 || resPrimary.status === 403) {
      throw new Error("Нет доступа к Gemini API ключу (401/403)");
    }
    throw new Error(`Ошибка Gemini (${resPrimary.status}): ${txt}`);
  }

  const data = await resPrimary.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .map((p: Record<string, unknown>) => (typeof p?.text === "string" ? (p.text as string) : ""))
    .join("");
  return text || "";
}