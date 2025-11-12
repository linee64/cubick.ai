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

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AICoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useI18n();
  const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const isSpeedcubingRelated = (text: string) => {
    const s = text.toLowerCase();
    const keywords = [
      "спидкуб", "спидкубинг", "speedcubing", "rubik", "рубик", "кубик",
      "cfop", "f2l", "oll", "pll", "скрамбл", "scramble", "таймер",
      "timer", "wca", "смазка", "lube", "магнит", "алгоритм", "алгоритмы",
      "сборка", "вращение", "угол", "пермут", "пермутация"
    ];
    return keywords.some((k) => s.includes(k));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Локальные оффлайн-советы удалены — переходим на прямой вызов Gemini

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!isSpeedcubingRelated(input)) {
      toast({
        title: t("Тема вне спидкубинга"),
        description: t("Я отвечаю только по вопросам спидкубинга. Переформулируйте запрос."),
        variant: "warning",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    trackEvent("ai_message_sent", { length: input.length });
    setInput("");
    setIsLoading(true);

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

      // 1) Пытаемся через Supabase Edge Function (устойчивее к блокировкам googleapis)
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

      if (isAbort || isNetwork) {
        toast({
          title: t("Ошибка"),
          description: isAbort ? t("Истек таймаут запроса") : t("Сетевая ошибка"),
          variant: "warning",
        });
        // Откат пользовательского сообщения
        setMessages((prev) => prev.filter((m) => m !== userMessage));
        return;
      }

      // Подсказка при некорректной конфигурации Supabase функций
      if (
        error instanceof Error &&
        (/Отсутствует конфигурация Supabase функций/i.test(error.message) ||
          /Supabase Edge недоступен/i.test(error.message))
      ) {
        toast({
          title: t("Сервер недоступен"),
          description:
            `${t("Проверьте, что Edge Function 'ai-coach' развернута в Supabase.")} ${t("Проверьте 'VITE_SUPABASE_PUBLISHABLE_KEY' и домен функций.")}`,
          variant: "destructive",
        });
        setMessages((prev) => prev.filter((m) => m !== userMessage));
        return;
      }

      toast({
        title: t("Ошибка"),
        description:
          error instanceof Error
            ? error.message
            : t("Не удалось получить ответ от AI"),
        variant: "destructive",
      });
      trackEvent("ai_error", {
        message: error instanceof Error ? error.message : String(error),
      });

      // В остальных случаях — откат последнего сообщения
      setMessages((prev) => prev.filter((m) => m !== userMessage));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="text-sm md:text-base leading-tight break-words markdown-compact"
                      components={{
                        a: ({ href, children }) => (
                          <a href={href as string} target="_blank" rel="noopener noreferrer" className="underline">
                            {children}
                          </a>
                        ),
                        code: ({ inline, children }) => (
                          <code className={inline ? "px-1 py-0.5 rounded bg-black/5 text-xs md:text-sm" : "block p-2 rounded bg-black/5 overflow-x-auto text-xs md:text-sm"}>
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm md:text-base leading-tight">{message.content}</p>
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
            onKeyPress={handleKeyPress}
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
