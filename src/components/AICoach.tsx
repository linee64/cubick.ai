import { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Plus, MessageSquare, Menu, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { callGemini } from "@/integrations/gemini";
import { callAiCoachEdge } from "@/integrations/edge";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { useAuth } from "@/hooks/use-auth";
import { 
  getChatSessions, 
  saveSessions, 
  createNewSession, 
  type Message, 
  type ChatSession 
} from "@/lib/chat-storage";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AICoach({ autoPrompt }: { autoPrompt?: string }) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);
  const [inSpeedcubing, setInSpeedcubing] = useState(false);
  const { toast } = useToast();
  const { t, language } = useI18n();
  const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Helpers
  const currentSession = sessions.find(s => s.id === currentSessionId) || null;
  const messages = currentSession?.messages || [];

  const updateCurrentSession = (updatedMessages: Message[]) => {
    if (!user?.id || !currentSessionId) return;
    
    const updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId) {
        // Auto-generate title if it's the first user message
        let newTitle = s.title;
        if (s.messages.length === 0 && updatedMessages.length > 0) {
          const firstMsg = updatedMessages[0].content;
          newTitle = firstMsg.slice(0, 30) + (firstMsg.length > 30 ? "..." : "");
        }
        return { ...s, messages: updatedMessages, title: newTitle, updatedAt: Date.now() };
      }
      return s;
    });

    // Sort by updated time
    updatedSessions.sort((a, b) => b.updatedAt - a.updatedAt);
    setSessions(updatedSessions);
    saveSessions(user.id, updatedSessions);
  };

  const handleNewChat = () => {
    if (!user?.id) return;
    const newSession = createNewSession(t("Новый чат"));
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    setCurrentSessionId(newSession.id);
    saveSessions(user.id, updatedSessions);
    
    // Reset focus
    setTimeout(() => {
        const textarea = document.querySelector('textarea');
        if(textarea) textarea.focus();
    }, 100);
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (!user?.id) return;
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    saveSessions(user.id, updatedSessions);

    if (currentSessionId === sessionId) {
      setCurrentSessionId(updatedSessions[0]?.id || null);
    }
  };

  // Load sessions on mount
  useEffect(() => {
    if (user?.id) {
      const loadedSessions = getChatSessions(user.id);
      if (loadedSessions.length === 0) {
        // Create initial empty session if none exist
        const initial = createNewSession(t("Новый чат"));
        setSessions([initial]);
        setCurrentSessionId(initial.id);
        saveSessions(user.id, [initial]);
      } else {
        setSessions(loadedSessions);
        setCurrentSessionId(loadedSessions[0].id);
      }
    }
  }, [user?.id]);

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
      "инспекция", "фингертриксы", "фингертрики", "регрип", "ауф", "локап", "тпс",
      "лук", "лук эхэд", "чтение", "чтение наперед", "скип", "форс", "форс скип",
      "сетап", "коммутатор", "отмена", "пиф-паф", "рыбка", "вертолет", "глаза", "уши",
      "двушка", "трешка", "четверка", "пятерка", "мегаминкс", "пираминкс", "скьюб",
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
    const newMessages = [...messages, userMessage];
    updateCurrentSession(newMessages); // Optimistic update
    
    if (isAuto || isSpeedcubingRelated(text)) setInSpeedcubing(true);
    trackEvent("ai_message_sent", { length: text.length });
    if (!overrideText) setInput("");
    setIsLoading(true);
    setLastSentAt(Date.now());

    let assistantContent = "";
    
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
            // Check if last message is already assistant (streaming update)
            const msgs = [...s.messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
                msgs[msgs.length - 1] = { ...last, content: assistantContent };
            } else {
                msgs.push({ role: "assistant", content: assistantContent });
            }
            return { ...s, messages: msgs };
        }
        return s;
      }));
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      let reply = "";

      try {
        reply = await callAiCoachEdge([...newMessages], controller.signal);
      } catch (edgeErr) {
        console.warn("Edge function failed, fallback to direct Gemini:", edgeErr);
        if (!GEMINI_KEY) {
          throw edgeErr instanceof Error ? edgeErr : new Error("Supabase Edge недоступен и GEMINI_API_KEY отсутствует");
        }
        reply = await callGemini([...newMessages], GEMINI_KEY, controller.signal);
      } finally {
        clearTimeout(timeout);
      }

      if (reply) {
          updateAssistant(reply);
          // Final save after stream completes
          // Re-fetch fresh state to avoid closure staleness?
          // Actually updateAssistant updates state, we need to save THAT state.
          // Simplification: just save manually here with the final string
          const finalMessages = [...newMessages, { role: "assistant" as const, content: reply }];
          updateCurrentSession(finalMessages);
          trackEvent("ai_message_received", { length: reply.length });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);

      const isAbort = error instanceof Error && error.name === "AbortError";
      const isNetwork = error instanceof TypeError || (error instanceof Error && /failed to fetch/i.test(error.message));
      const isRateLimit = error instanceof Error && /429/.test(error.message);
      
      let errorMsg = t("Не удалось получить ответ от AI");

      if (isAbort || isNetwork) {
        errorMsg = isAbort ? t("⏱️ Истек таймаут запроса") : t("🌐 Сетевая ошибка");
      } else if (isRateLimit) {
        errorMsg = t("Слишком много запросов, попробуйте позже");
      } else if (
        error instanceof Error &&
        (/Отсутствует конфигурация Supabase функций/i.test(error.message) ||
          /Supabase Edge недоступен/i.test(error.message))
      ) {
         errorMsg = t("Не удалось получить ответ от AI");
      }

      toast({
          title: t("⚠️ Ошибка"),
          description: errorMsg,
          variant: "destructive",
      });

      // Add error message to chat
      const errorMessages = [...newMessages, { role: "assistant" as const, content: errorMsg }];
      updateCurrentSession(errorMessages);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (autoPrompt && !autoSentRef.current && messages.length === 0 && user && currentSessionId) {
      autoSentRef.current = true;
      sendMessage(autoPrompt);
    }
  }, [autoPrompt, messages.length, user, currentSessionId]);

  // Sidebar Content
  const SidebarList = () => {
    const groupedSessions = useMemo(() => {
        const groups: { label: string; sessions: ChatSession[] }[] = [];
        
        sessions.forEach((session) => {
            const date = new Date(session.updatedAt);
            const now = new Date();
            const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
            
            let label = "";
            if (isToday) label = t("Сегодня");
            else if (isYesterday) label = t("Вчера");
            else {
                label = new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
                    day: 'numeric',
                    month: 'long'
                }).format(date);
            }

            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup.label === label) {
                lastGroup.sessions.push(session);
            } else {
                groups.push({ label, sessions: [session] });
            }
        });
        
        return groups;
    }, [sessions, language]);

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border/40">
          <Button 
              onClick={handleNewChat} 
              className="w-full justify-start gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-none shadow-none"
              variant="outline"
          >
              <Plus className="w-4 h-4" />
              {t("Новый чат")}
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-4">
              {groupedSessions.map((group, i) => (
                  <div key={group.label + i}>
                      <div className="px-3 py-1 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-1 ml-1">
                          {group.label}
                      </div>
                      <div className="space-y-1">
                          {group.sessions.map((session) => (
                              <div
                                  key={session.id}
                                  onClick={() => setCurrentSessionId(session.id)}
                                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                      currentSessionId === session.id 
                                          ? "bg-accent/10 text-accent-foreground font-medium" 
                                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                  }`}
                              >
                                  <div className="flex items-center gap-3 overflow-hidden">
                                      <MessageSquare className="w-4 h-4 flex-shrink-0" />
                                      <span className="truncate text-sm">{session.title || t("Новый чат")}</span>
                                  </div>
                                  {sessions.length > 1 && (
                                      <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                                          onClick={(e) => handleDeleteSession(e, session.id)}
                                      >
                                          <Trash2 className="w-3 h-3" />
                                      </Button>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] md:h-[515px] w-full max-w-6xl mx-auto rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden md:overflow-visible md:border-0 md:bg-transparent md:shadow-none md:gap-4">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 flex-col rounded-xl border bg-card shadow-sm overflow-hidden">
        <SidebarList />
      </div>

      {/* Mobile Header / Menu */}
      <div className="md:hidden absolute top-4 right-4 z-20">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm">
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>{t("История чатов")}</SheetTitle>
                </SheetHeader>
                <SidebarList />
            </SheetContent>
        </Sheet>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative md:rounded-xl md:border md:bg-card md:shadow-sm md:overflow-hidden">
        <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-muted-foreground animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("AI Тренер")}</h3>
                <p className="max-w-xs mx-auto text-sm opacity-80">{t("Привет! Я AI тренер по сборке кубика Рубика.")}</p>
                <p className="text-sm mt-1 opacity-80">{t("Задай мне вопрос или попроси совет!")}</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 md:gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-primary/20">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted/50 border border-border/50 rounded-bl-none"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="markdown-compact md:prose md:prose-sm max-w-none text-foreground text-sm md:text-base">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 leading-relaxed whitespace-pre-wrap break-words">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <span className="font-bold text-foreground/90">{children}</span>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 space-y-1 mb-2 last:mb-0">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 space-y-1 mb-2 last:mb-0">{children}</ol>
                            ),
                            li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
                            a: ({ href, children }) => (
                              <a href={href as string} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-1 underline-offset-2 hover:opacity-80">
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="rounded bg-background/50 px-1.5 py-0.5 text-xs md:text-sm font-mono border border-border/50 text-accent-foreground">{children}</code>
                            ),
                            pre: ({ children }) => (
                              <pre className="rounded-lg bg-background/50 p-3 overflow-x-auto text-xs md:text-sm font-mono border border-border/50 my-2">{children}</pre>
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
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-secondary/20">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-4 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center gap-1 bg-muted/50 rounded-2xl rounded-bl-none px-4 py-3 border border-border/50">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-background/80 backdrop-blur border-t border-border/40">
          <div className="max-w-3xl mx-auto flex gap-2 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("Напиши свой вопрос...")}
              className="min-h-[50px] max-h-[200px] resize-none pr-12 py-3 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 shadow-sm rounded-xl"
              rows={1}
              disabled={isLoading}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">
            {t("")}
          </p>
        </div>
      </div>
    </div>
  );
}
