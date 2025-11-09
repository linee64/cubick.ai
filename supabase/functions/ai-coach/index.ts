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

    const systemPrompt = `Ты - AI тренер по сборке кубика Рубика. Твоя задача - давать персональные советы и помогать пользователям улучшить свои навыки сборки.

Ты должен:
- Анализировать время сборки пользователя и давать советы по улучшению
- Объяснять алгоритмы простым языком
- Рекомендовать эффективные методы тренировок
- Мотивировать пользователей
- Отвечать на вопросы о методе Фридрих, CFOP, PLL, OLL и других техниках
- Помогать запомнить алгоритмы

Будь дружелюбным, понятным и мотивирующим!`;

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
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
