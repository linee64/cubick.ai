import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Award, Clock, TrendingUp, MessageCircle, Bot, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSolvesForUser, computeStats, formatMs, migrateGlobalToUser } from "@/lib/stats";
import { useI18n } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChatHistory, type Message } from "@/lib/chat-storage";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // При входе переносим локальные (глобальные) данные в ключ пользователя
  useEffect(() => {
    if (user?.id) {
      migrateGlobalToUser(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isHistoryOpen && user?.id) {
      setChatHistory(getChatHistory(user.id));
    }
  }, [isHistoryOpen, user?.id]);

  if (!user) {
    return (
      <div className="ios-vh flex flex-col">
        <Header />
        <main className="flex-1 ios-scroll py-8 md:py-12 px-3 md:px-4">
          <PageTransition>
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 text-center interactive-card">
              <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">{t("Требуется авторизация")}</h2>
              <p className="text-muted-foreground mb-6">{t("Перенаправление на страницу входа...")}</p>
            </Card>
          </div>
          </PageTransition>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ios-vh flex flex-col">
      <Header />
      
      <main className="flex-1 ios-scroll py-8 md:py-12 px-3 md:px-4">
        <PageTransition>
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t("Профиль")}</h1>
          {(() => {
            const solves = getSolvesForUser(user.id);
            const { count, bestMs, avgMs } = computeStats(solves);
            return (
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <Card className="p-6 text-center interactive-card">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground">{t("Сборок")}</div>
                </Card>

                <Card className="p-6 text-center interactive-card">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{bestMs != null ? formatMs(bestMs) : "--:--"}</div>
                  <div className="text-sm text-muted-foreground">{t("Лучшее время")}</div>
                </Card>

                <Card className="p-6 text-center interactive-card">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{avgMs != null ? formatMs(avgMs) : "--:--"}</div>
                  <div className="text-sm text-muted-foreground">{t("Среднее")}</div>
                </Card>
              </div>
            );
          })()}

          {/* Здесь можно вывести данные профиля пользователя */}
          <div className="mb-8">
            <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  <MessageCircle className="h-5 w-5" />
                  {t("История чата с AI")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20">
                <DialogHeader className="p-4 md:p-6 border-b border-border/50 bg-muted/30">
                  <DialogTitle className="flex items-center gap-2 text-xl md:text-2xl">
                    <Bot className="h-6 w-6 text-primary" />
                    {t("История общения с AI-тренером")}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-1 p-4 md:p-6">
                  <div className="space-y-4">
                    {chatHistory.length === 0 ? (
                      <div className="text-center text-muted-foreground py-12">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>{t("История сообщений пуста")}</p>
                      </div>
                    ) : (
                      chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`flex gap-2 md:gap-3 ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            </div>
                          )}
                          
                          <div
                            className={`max-w-[92%] md:max-w-[80%] rounded-lg px-3 py-2 md:px-4 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {message.role === "assistant" ? (
                              <div className="markdown-compact md:prose md:prose-sm max-w-none text-foreground text-sm md:text-base">
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    p: ({ children }) => (
                                      <p className="mb-2 md:mb-3 leading-relaxed whitespace-pre-wrap break-words last:mb-0">{children}</p>
                                    ),
                                    strong: ({ children }) => (
                                      <span className="font-bold">{children}</span>
                                    ),
                                    ul: ({ children }) => (
                                      <ul className="list-disc pl-4 space-y-1 mb-2 last:mb-0">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                      <ol className="list-decimal pl-4 space-y-1 mb-2 last:mb-0">{children}</ol>
                                    ),
                                    li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
                                    a: ({ href, children }) => (
                                      <a href={href as string} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-1 underline-offset-2">
                                        {children}
                                      </a>
                                    ),
                                    code: ({ children }) => (
                                      <code className="rounded bg-background/50 px-1 py-0.5 text-xs md:text-sm font-mono border border-border/50">{children}</code>
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
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                              <UserIcon className="w-5 h-5 text-secondary" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
