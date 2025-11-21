import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { callGemini } from "@/integrations/gemini";
import { callAiCoachEdge } from "@/integrations/edge";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { useAuth } from "@/hooks/use-auth";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AICoach({ autoPrompt }: { autoPrompt?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);
  const [inSpeedcubing, setInSpeedcubing] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();
  const { user } = useAuth();
  const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const isSpeedcubingRelated = (text: string) => {
    const s = text.toLowerCase();
    const flow = ["далее", "next", "продолжить", "continue", "следующий", "next step"];
    const keywords = [
      "спидкуб", "спидкубинг", "speedcubing", "rubik", "рубик", "кубик",
      "cfop", "фридрих", "f2l", "oll", "pll", "скрамбл", "scramble", "таймер",
      "timer", "wca", "смазка", "lube", "магнит", "алгоритм", "алгоритмы",
      "сборка", "вращение", "угол", "пермут", "пермутация", "крест", "cross",
      "last layer", "ll",
      "look-ahead", "fingertricks", "tps", "inspection", "lock-up", "lockups", "regrip", "auf",
      "зблл", "zbll", "coll", "vls", "eo cross", "x-cross", "keyhole", "sune", "antisune",
      "инспекция", "фингертриксы", "регрип", "ауф", "локап", "тпс",
      "новичок", "beginner", "novice",
      "интуитивно", "интуитивный", "intuitive", "solve", "solving"
    ];
    return flow.some((k) => s === k || s.includes(k)) || keywords.some((k) => s.includes(k));
  };

  const isSmallTalk = (text: string) => {
    const s = text.toLowerCase().trim();
    if (s.length <= 32) {
      const phrases = [
        "привет", "здравствуй", "здравствуйте", "добрый день", "добрый вечер",
        "hi", "hello", "hey", "yo", "ку", "как дела", "как ты",
        "спасибо", "ок", "ладно", "пока", "до свидания", "help", "помощь",
        "что умеешь", "что ты умеешь"
      ];
      if (phrases.some((p) => s.includes(p))) return true;
    }
    return false;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Локальные оффлайн-советы удалены — переходим на прямой вызов Gemini

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

    if (!user) {
      toast({
        title: t("🔒 Требуется авторизация"),
        description: t("Войдите, чтобы общаться с ИИ"),
        variant: "warning",
      });
      return;
    }

    const now = Date.now();
    const minIntervalMs = 8000;
    const flow = ["далее", "next", "продолжить", "continue", "следующий", "next step"];
    const diff = now - lastSentAt;
    if (diff < minIntervalMs && !flow.some((k) => text.toLowerCase() === k)) {
      const waitSec = Math.ceil((minIntervalMs - diff) / 1000);
      toast({
        title: t("⏳ Слишком часто"),
        description: `${t("Подождите")} ${waitSec} ${t("сек")} ${t("перед следующим запросом")}`,
        variant: "warning",
      });
      return;
    }

    const isAuto = !!overrideText;
    if (!isAuto && !isSpeedcubingRelated(text) && !isSmallTalk(text) && !inSpeedcubing) {
      toast({
        title: t("🚫 Тема вне спидкубинга"),
        description: t("Я отвечаю только по вопросам спидкубинга. Переформулируйте запрос."),
        variant: "warning",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    if (isAuto || isSpeedcubingRelated(text)) setInSpeedcubing(true);
    trackEvent("ai_message_sent", { length: text.length });
    if (!overrideText) setInput("");
    setIsLoading(true);
    setLastSentAt(Date.now());

    let assistantContent = "";
    
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      let reply = "";

      try {
        reply = await callAiCoachEdge([...messages, userMessage], controller.signal);
      } catch (edgeErr) {
        console.warn("Edge function failed, fallback to direct Gemini:", edgeErr);
        // 2) Фоллбэк — прямой вызов Gemini, если есть ключ
        if (!GEMINI_KEY) {
          throw edgeErr instanceof Error ? edgeErr : new Error("Supabase Edge недоступен и GEMINI_API_KEY отсутствует");
        }
        reply = await callGemini([...messages, userMessage], GEMINI_KEY, controller.signal);
      } finally {
        clearTimeout(timeout);
      }

      if (reply) updateAssistant(reply);
      if (reply) trackEvent("ai_message_received", { length: reply.length });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);

      const isAbort = error instanceof Error && error.name === "AbortError";
      const isNetwork = error instanceof TypeError || (error instanceof Error && /failed to fetch/i.test(error.message));
      const isRateLimit = error instanceof Error && /429/.test(error.message);

      if (isAbort || isNetwork) {
        toast({
          title: t("⚠️ Ошибка"),
          description: isAbort ? t("⏱️ Истек таймаут запроса") : t("🌐 Сетевая ошибка"),
          variant: "warning",
        });
        setMessages((prev) => {
          const keep = prev.filter((m) => m !== userMessage);
          return [...keep, { role: "assistant", content: t("Не удалось получить ответ от AI") }];
        });
        return;
      }

      if (isRateLimit) {
        toast({
          title: t("🚦 Лимит запросов"),
          description: t("Сервис перегружен. Попробуйте снова через 10–30 сек"),
          variant: "warning",
        });
        setMessages((prev) => {
          const keep = prev.filter((m) => m !== userMessage);
          return [...keep, { role: "assistant", content: t("Слишком много запросов, попробуйте позже") }];
        });
        return;
      }

      // Подсказка при некорректной конфигурации Supabase функций
      if (
        error instanceof Error &&
        (/Отсутствует конфигурация Supabase функций/i.test(error.message) ||
          /Supabase Edge недоступен/i.test(error.message))
      ) {
        toast({
          title: t("🛠️ Сервер недоступен"),
          description:
            `${t("Проверьте, что Edge Function 'ai-coach' развернута в Supabase.")} ${t("Проверьте 'VITE_SUPABASE_PUBLISHABLE_KEY' и домен функций.")}`,
          variant: "destructive",
        });
        setMessages((prev) => {
          const keep = prev.filter((m) => m !== userMessage);
          return [...keep, { role: "assistant", content: t("Не удалось получить ответ от AI") }];
        });
        return;
      }

      toast({
        title: t("⚠️ Ошибка"),
        description:
          error instanceof Error
            ? error.message
            : t("Не удалось получить ответ от AI"),
        variant: "destructive",
      });
      trackEvent("ai_error", {
        message: error instanceof Error ? error.message : String(error),
      });

      setMessages((prev) => {
        const keep = prev.filter((m) => m !== userMessage);
        return [...keep, { role: "assistant", content: t("Не удалось получить ответ от AI") }];
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (autoPrompt && !autoSentRef.current && messages.length === 0 && user) {
      autoSentRef.current = true;
      sendMessage(autoPrompt);
    }
  }, [autoPrompt, messages.length, user]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            {t("AI Тренер")}
          </CardTitle>
          {/* Индикатор режима удалён — упрощённый интерфейс */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col">
        <ScrollArea className="flex-1 min-h-0 pr-4 ios-scroll" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t("Привет! Я AI тренер по сборке кубика Рубика.")}</p>
                <p className="text-sm mt-2">{t("Задай мне вопрос или попроси совет!")}</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm md:prose-base max-w-none text-foreground">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 leading-relaxed whitespace-pre-wrap break-words">{children}</p>
                          ),
                          strong: ({ children }) => (
                            <span className="font-medium">{children}</span>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 space-y-2">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 space-y-2">{children}</ol>
                          ),
                          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                          a: ({ href, children }) => (
                            <a href={href as string} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-muted px-1 py-0.5 text-sm">{children}</code>
                          ),
                          pre: ({ children }) => (
                            <pre className="rounded bg-muted p-3 overflow-auto text-sm">{children}</pre>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed break-words">{message.content}</p>
                  )}
                </div>
                
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 ios-sticky-bottom ios-safe-bottom bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pt-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("Напиши свой вопрос...")}
            className="resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-auto"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
