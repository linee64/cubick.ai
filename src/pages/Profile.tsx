import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { User, Award, Clock, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getSolvesForUser, computeStats, formatMs, migrateGlobalToUser, calculateAoN } from "@/lib/stats";
import { useI18n } from "@/lib/i18n";

const QUOTES = [
  "Скорость — это не главное, главное — стабильность.",
  "Каждая сборка делает тебя лучше.",
  "Не бойся ошибаться, бойся не пробовать.",
  "Чем медленнее ты тренируешься, тем быстрее ты собираешь.",
  "Кубик Рубика — это марафон, а не спринт.",
  "Терпение и труд все перетрут.",
  "Секрет успеха — в регулярности тренировок.",
  "Анализируй свои ошибки, чтобы не повторять их."
];
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const [isSolvesOpen, setIsSolvesOpen] = useState(false);
  const [isAvgOpen, setIsAvgOpen] = useState(false);

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

  const solves = user?.id ? getSolvesForUser(user.id) : [];
  const { count, bestMs, avgMs } = computeStats(solves);
  
  const ao5 = calculateAoN(solves, 5);
  const ao12 = calculateAoN(solves, 12);

  const quote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
  }, []);

  const groupedSolves = useMemo(() => {
    // Clone and sort
    const sortedSolves = [...solves].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const groups: { label: string; solves: typeof solves }[] = [];
    
    sortedSolves.forEach((solve) => {
        const date = new Date(solve.date);
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
            lastGroup.solves.push(solve);
        } else {
            groups.push({ label, solves: [solve] });
        }
    });
    
    return groups;
  }, [solves.length, language, t]);

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t("Профиль")}</h1>
          {user?.user_metadata?.name && (
            <p className="text-2xl font-bold text-foreground mb-6 md:mb-8">{user.user_metadata.name}</p>
          )}
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="p-6 text-center interactive-card">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">{t("Сборок")}</div>
            </Card>

            <Dialog open={isSolvesOpen} onOpenChange={setIsSolvesOpen}>
                <DialogTrigger asChild>
                    <Card className="p-6 text-center interactive-card cursor-pointer hover:bg-muted/50 transition-colors">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <div className="text-2xl font-bold">{bestMs != null ? formatMs(bestMs) : "--:--"}</div>
                        <div className="text-sm text-muted-foreground">{t("Лучшее время")}</div>
                    </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20">
                    <DialogHeader className="p-4 border-b border-border/50 bg-muted/30">
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <Clock className="h-5 w-5 text-primary" />
                            {t("История сборок")}
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {groupedSolves.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">
                                    <Clock className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                    <p>{t("нет данных")}</p>
                                </div>
                            ) : (
                                groupedSolves.map((group, i) => (
                                    <div key={i}>
                                        <div className="px-2 py-1 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-2">
                                            {group.label}
                                        </div>
                                        <div className="space-y-2">
                                            {group.solves.map((solve, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/40 shadow-sm">
                                                    <span className="font-mono text-lg font-medium text-foreground">
                                                        {formatMs(solve.timeMs)}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(solve.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <Dialog open={isAvgOpen} onOpenChange={setIsAvgOpen}>
                <DialogTrigger asChild>
                    <Card className="p-6 text-center interactive-card cursor-pointer hover:bg-muted/50 transition-colors">
                        <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{avgMs != null ? formatMs(avgMs) : "--:--"}</div>
                        <div className="text-sm text-muted-foreground">{t("Среднее")}</div>
                    </Card>
                </DialogTrigger>
                <DialogContent className="max-w-sm p-6 bg-background/95 backdrop-blur-xl border-primary/20">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <Award className="h-5 w-5 text-primary" />
                            {t("Среднее время")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/40 shadow-sm">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-muted-foreground">Ao5</span>
                                <span className="text-xs text-muted-foreground opacity-70">{t("Среднее из 5")}</span>
                            </div>
                            <span className="font-mono text-2xl font-bold text-foreground">
                                {ao5 != null ? formatMs(ao5) : "--:--"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/40 shadow-sm">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-muted-foreground">Ao12</span>
                                <span className="text-xs text-muted-foreground opacity-70">{t("Среднее из 12")}</span>
                            </div>
                            <span className="font-mono text-2xl font-bold text-foreground">
                                {ao12 != null ? formatMs(ao12) : "--:--"}
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("Мотивация")}</h3>
                <p className="text-muted-foreground italic">"{t(quote)}"</p>
              </div>
            </div>
          </Card>
        </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
