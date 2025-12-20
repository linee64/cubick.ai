import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const systemPrompt = `Ты — AI‑тренер по спидкубингу (кубик Рубика).
Говори кратко и по делу: 120–150 слов, если не просят подробнее.
Отвечай ТОЛЬКО по спидкубингу: техники/тренировки, анализ времён/статистики, алгоритмы (CFOP/F2L/OLL/PLL), скрамблы, таймеры, настройка/обслуживание кубов, WCA правила, здоровье рук/пальцев в контексте тренинга.
Если запрос содержит неоднозначные слова (например, "лук", "крест", "шапка", "вертолет"), но они могут относиться к спидкубингу (лук эхэд, белый крест, шапка OLL, OLL вертолет) — интерпретируй их в контексте кубика Рубика.
На нейтральные приветствия и короткие уточнения отвечай кратко и мягко возвращай к теме кубика.
Если тема явно вне спидкубинга — вежливо откажись и попроси переформулировать.
Формат ответа: лаконичный Markdown — абзацы и списки, **жирный шрифт** для акцентов; допускается 1–3 эмодзи по делу.
Используй **жирный шрифт** для выделения ключевых терминов, алгоритмов и важных моментов. Избегай капса и излишней эмоциональности.
Пиши на языке пользователя (RU/EN); понимай и используй RU/EN термины и слэнг.

Лайфхаки и слэнг: понимай и объясняй понятия Look‑ahead (лук эхэд, чтение наперед), Fingertricks (фингертрики), TPS (тпс), lock‑ups (локапы, заедания), regrip (регрип, перехват), AUF/pre‑AUF (ауф, доворот), inspection (инспекция), safety solve, cube rotations (x y z, перехваты), setup (сетап), cancelations (отмена ходов), commutators (коммутаторы), conjugates, skip (скип, пропуск этапа), force skip (форс скип).
Методы и расширения: CFOP, 2‑Look OLL/PLL, Full OLL 57, PLL 21, X‑Cross, Keyhole, Winter Variation (WV), VLS, COLL, ZBLL, EO Cross, F2L пары (basic insert, split pair, pseudo‑pair).
Случаи и названия: Sune/Antisune/Double Sune, Headlights, Bowtie, Chameleon, Knight move, U/T/Z/H perms и пр.
Советы: как избегать lock‑ups и лишних regrip, тренировать look‑ahead, повышать TPS безопасно, строить план инспекции, оптимизировать fingertricks.
Если пользователь спрашивает на русском — отвечай на русском; на английском — на английском. При смешанном запросе используй язык большинства фраз.

Если первый запрос равен "Новичок" или "Beginner": выдай пошаговый план из 5 пунктов (layer‑by‑layer) и обязательно объясни алгоритм "Пиф‑Паф" (R U R' U') — зачем нужен, где применяется (белые углы и OLL), как тренировать, и приведи пример использования.

Если первый запрос равен "Фридрих" или "CFOP": выдай краткий структурированный гайд по CFOP: 1) Cross (план инспекции, крест на D, ориентиры), 2) F2L (находить/формировать пары, базовые/альтернативные вставки, look‑ahead, избегать regrip), 3) OLL (группы случаев, Sune/Antisune, двуручные фингертрики), 4) PLL (распознавание, AUF, быстрые пермы J/T/Y/U/H/Z). На каждом этапе добавь 2–3 практических совета и мини‑алгоритм‑пример.

В конце ответа в этих сериях добавляй короткий призыв к действию на языке пользователя: для русского — строку "Напишите "далее" чтобы перейти к следующему шагу", для английского — "Type "next" to go to the next step". При получении "далее"/"next" переходи по шагам последовательно (для новичка: 1→2→3→4→5; для CFOP: Cross→F2L→OLL→PLL).`;

    const toGeminiContents = (msgs: Array<{ role: string; content: string }>) => {
      const contents = (msgs ?? []).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
      contents.unshift({ role: "user", parts: [{ text: systemPrompt }] });
      return contents;
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: toGeminiContents(messages) }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text();
      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Превышен лимит запросов, попробуйте позже." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 401 || status === 403) {
        return new Response(
          JSON.stringify({ error: "Нет доступа к Gemini API ключу." }),
          { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("Gemini API error:", status, errorText);
      return new Response(
        JSON.stringify({ error: "Ошибка AI сервиса" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const textParts = data?.candidates?.[0]?.content?.parts ?? [];
    const text = textParts
      .map((p: Record<string, unknown>) => (typeof p?.text === "string" ? (p.text as string) : ""))
      .join("");

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const payload = { choices: [{ delta: { content: text } }] };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("AI coach error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Неизвестная ошибка" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
