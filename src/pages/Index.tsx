import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import Timer from "@/components/Timer";
import Scramble from "@/components/Scramble";
import { AICoach } from "@/components/AICoach";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PageTransition>
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("Научитесь собирать кубик Рубика с ИИ")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("Cubick AI поможет вам освоить сборку кубика от новичка до продвинутого уровня")}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link to="/beginner">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {t("Для новичков")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/friedrich">
                  <Zap className="h-5 w-5 mr-2" />
                  {t("Метод Фридрих")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Timer Section */}
          <div className="container mx-auto max-w-4xl mb-12">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2">
              <div className="mb-8">
                <Scramble />
              </div>
              
              <div className="border-t border-border pt-8">
                <Timer />
              </div>
            </Card>
          </div>

          {/* AI Coach Section */}
          <div className="container mx-auto max-w-4xl">
            <AICoach />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 stagger-enter">
              <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center interactive-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {t("ИИ")}
                </div>
                <h3 className="font-semibold mb-2">{t("ИИ-помощник")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("Персональный ИИ-тренер анализирует ваш прогресс и дает советы")}
                </p>
              </Card>

              <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center interactive-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  ⏱️
                </div>
                <h3 className="font-semibold mb-2">{t("Точный таймер")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("Отслеживайте свое время и улучшайте результаты")}
                </p>
              </Card>

              <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 text-center interactive-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  📚
                </div>
                <h3 className="font-semibold mb-2">{t("Два уровня")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("От базового метода для новичков до продвинутого Фридриха")}
                </p>
              </Card>
            </div>
          </div>
        </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
