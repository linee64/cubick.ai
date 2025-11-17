type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

import { systemPrompt } from "@/integrations/gemini";
// Вызов Supabase Edge Function 'ai-coach' с разбором SSE потока
export async function callAiCoachEdge(
  messages: ChatMessage[],
  signal?: AbortSignal
): Promise<string> {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Отсутствует конфигурация Supabase функций (VITE_SUPABASE_URL/VITE_SUPABASE_PUBLISHABLE_KEY)");
  }

  const functionsUrl = SUPABASE_URL.replace(".supabase.co", ".functions.supabase.co") + "/ai-coach";

  const payload = { messages: [{ role: "user", content: systemPrompt }, ...(messages ?? [])] };
  const res = await fetch(functionsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      apikey: SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) {
      throw new Error("Превышен лимит запросов к AI (429)");
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error("Нет доступа к Supabase Functions (401/403)");
    }
    throw new Error(`Ошибка Supabase функции (${res.status}): ${text}`);
  }

  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error("Сервер не вернул поток");
  }

  const decoder = new TextDecoder("utf-8");
  let result = "";
  let done = false;

  while (!done) {
    const { value, done: d } = await reader.read();
    done = d;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") {
            done = true;
            break;
          }
          try {
            const data = JSON.parse(payload);
            const delta = data?.choices?.[0]?.delta?.content;
            if (typeof delta === "string") {
              result += delta;
            }
          } catch {
            // Игнорируем строки, которые не являются JSON
          }
        }
      }
    }
  }

  return result;
}