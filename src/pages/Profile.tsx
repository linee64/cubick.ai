import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Award, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSolvesForUser, computeStats, formatMs, migrateGlobalToUser } from "@/lib/stats";
import { useI18n } from "@/lib/i18n";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();

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

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4">
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <PageTransition>
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t("Профиль")}</h1>
          {(() => {
            const solves = getSolvesForUser(user.id);
            const { count, bestMs, avgMs } = computeStats(solves);
            return (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
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
        </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
