import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import Timer from "@/components/Timer";
import Scramble from "@/components/Scramble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getSupabase } from "@/integrations/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [feedback]);

  const submitFeedback = async () => {
    const text = feedback.trim();
    if (!text) {
      toast({ title: t("Пустой отзыв"), description: t("Пожалуйста, напишите ваш отзыв") });
      return;
    }
    if (text.length > 2000) {
      toast({ title: t("Слишком длинный отзыв"), description: t("Сократите текст до 2000 символов") });
      return;
    }
    setSubmitting(true);
    try {
      const supabase = getSupabase() as unknown as SupabaseClient;
      const { error } = await supabase.from("feedback").insert({
        content: text,
        user_id: user?.id ?? null,
        lang: language,
      });
      if (error) throw error;
      setFeedback("");
      toast({ title: t("Отзыв отправлен"), description: t("Спасибо за ваш отзыв!") });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: t("Ошибка отправки"), description: msg });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="ios-vh flex flex-col">
      <Header />
      
      <main className="flex-1 ios-scroll">
        <PageTransition>
        {/* Hero Section */}
        <section className="py-8 md:py-20 px-3 md:px-4">
          <div className="container mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight font-heading mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("Научитесь собирать кубик Рубика с ИИ")}
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("Cubick AI поможет вам освоить сборку кубика от новичка до продвинутого уровня")}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm md:text-base">
                <Link to="/beginner">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {t("Для новичков")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-sm md:text-base">
                <Link to="/friedrich">
                  <Zap className="h-5 w-5 mr-2" />
                  {t("Метод Фридрих")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Timer Section */}
          {/* Fullscreen button slightly above the timer card */}
          <div className="container mx-auto max-w-4xl">
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/timer">{t("На весь экран")}</Link>
              </Button>
            </div>
          </div>
          <div className="container mx-auto max-w-4xl mb-8 md:mb-12">
            <Card className="p-6 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2">
              <div className="mb-8">
                <Scramble variant="noButton" />
              </div>
              
              <div className="border-t border-border pt-8">
                <Timer />
              </div>
            </Card>
          </div>

          <div className="container mx-auto max-w-4xl">
            <Card className="p-6 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center">
              <h2 className="text-2xl font-semibold mb-4">{t("ИИ‑тренер")}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t("Поговорить с ИИ на отдельной странице")}
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link to="/ai">{t("Перейти к чату с ИИ")}</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-3 md:px-4">
            <div className="grid md:grid-cols-3 gap-6 stagger-enter">
              <Card className="p-6 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center interactive-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <img src="/icons/ai.svg" alt={t("ИИ")}
                       className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{t("ИИ-помощник")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("Персональный ИИ-тренер анализирует ваш прогресс и дает советы")}
                </p>
              </Card>

              <Card className="p-6 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center interactive-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <img src="/icons/timer.svg" alt={t("Точный таймер")} className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{t("Точный таймер")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("Отслеживайте свое время и улучшайте результаты")}
                </p>
              </Card>

              <Card className="p-6 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center interactive-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <img src="/icons/methods.svg" alt={t("Два уровня")} className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{t("Два уровня")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("От базового метода для новичков до продвинутого Фридриха")}
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-3 md:px-4">
            <Card className="p-8 md:p-12 bg-[radial-gradient(circle_at_center,hsl(var(--card)),hsl(var(--primary)/0.35))] dark:bg-[linear-gradient(rgba(0,0,0,0.18),rgba(0,0,0,0.18)),radial-gradient(circle_at_center,hsl(var(--primary)),hsl(var(--muted)))] shadow-xl border-2 text-center dark:text-white text-foreground">
              <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight font-heading mb-6 text-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent dark:bg-clip-text dark:text-transparent">
                {t("Поделиться отзывом")}
              </h2>
              <p className="text-base md:text-xl dark:text-white/85 text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("Мы очень уважаем мнение наших юзеров и верим, что они помогут сделать сайт лучше")}
              </p>
              <Textarea
                ref={taRef}
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  adjustTextareaHeight();
                }}
                placeholder={t("Напишите отзыв...")}
                className="mx-auto w-full max-w-3xl text-lg dark:text-white text-foreground placeholder:text-center placeholder:dark:text-white/70 placeholder:text-foreground/60 resize-none overflow-hidden bg-transparent border-2 border-border rounded-xl p-6"
              />
              <div className="w-full max-w-3xl mx-auto flex justify-start mt-6">
                <Button size="lg" onClick={submitFeedback} disabled={submitting} className="interactive-button opacity-90">
                  {t("Отправить отзыв")}
                </Button>
              </div>
            </Card>
          </div>
        </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
