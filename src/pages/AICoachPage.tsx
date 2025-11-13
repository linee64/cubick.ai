import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { AICoach } from "@/components/AICoach";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AICoachPage = () => {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (!user) {
    return (
      <div className="ios-vh flex flex-col">
        <Header />
        <main className="flex-1 ios-scroll py-8 md:py-12 px-3 md:px-4">
          <PageTransition>
            <div className="container mx-auto max-w-4xl">
              <Card className="p-8 text-center interactive-card">
                <Bot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">{t("Требуется авторизация")}</h2>
                <p className="text-muted-foreground">{t("Перенаправление на страницу входа...")}</p>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("ИИ‑тренер")}
            </h1>
            <AICoach />
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default AICoachPage;