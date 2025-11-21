import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const Beginner = () => {
  const { t } = useI18n();
  return (
    <div className="ios-vh flex flex-col">
      <Header />
      
      <main className="flex-1 ios-scroll py-8 md:py-12 px-3 md:px-4">
        <PageTransition>
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("Назад")}
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("Метод для новичков")}
          </h1>

          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-4">{t("Введение")}</h2>
            <p className="text-muted-foreground mb-4">
              {t("Метод послойной сборки - это самый простой способ научиться собирать кубик Рубика.")} {t("Вы будете собирать кубик слой за слоем, начиная с белого креста.")}
            </p>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Белый крест")}</h3>
                  <p className="text-muted-foreground">
                    {t("Соберите белый крест на верхней грани, сопоставляя цвета ребер с центрами боковых граней.")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Белые углы")}</h3>
                  <p className="text-muted-foreground">
                    {t("Расставьте все белые углы на свои места, завершив первый слой.")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Средний слой")}</h3>
                  <ul className="text-muted-foreground list-disc list-inside space-y-1">
                    <li>{t("Найдите ребро без жёлтой наклейки на верхнем слое.")}</li>
                    <li>{t("Совместите лицевой цвет ребра с центром передней грани.")}</li>
                    <li>{t("Если целевой цвет справа: поверните верхний слой от цвета на один ход.")}</li>
                    <li>{t("Выполните правый пиф‑паф: R U R' U'.")}</li>
                    <li>{t("Перехват к целевому цвету и левый пиф‑паф: L' U' L U.")}</li>
                    <li>{t("Если целевой цвет слева: зеркально — повернуть от цвета, левый пиф‑паф, перехват, правый пиф‑паф.")}</li>
                    <li>{t("Повторите для всех четырёх рёбер среднего слоя.")}</li>
                  </ul>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{t("Формальный алгоритм вправо:")}</div>
                      <div className="font-mono bg-background p-2 rounded-md">U R U' R' U' F' U F</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{t("Формальный алгоритм влево:")}</div>
                      <div className="font-mono bg-background p-2 rounded-md">U' L' U L U F U' F'</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Желтый крест")}</h3>
                  <p className="text-muted-foreground">
                    {t("Сформируйте желтый крест на последней грани (не обращая внимания на совпадение боковых цветов).")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Желтые углы на места")}</h3>
                  <p className="text-muted-foreground">
                    {t("Расставьте углы последней грани на правильные позиции (ориентация пока не важна).")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Ориентация углов")}</h3>
                  <p className="text-muted-foreground">
                    {t("Разверните углы правильно, чтобы завершить сборку кубика.")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 mt-8 bg-gradient-to-br from-primary/10 to-accent/10">
            <h3 className="font-semibold text-lg mb-2">{t("💡 Совет от ИИ")}</h3>
            <p className="text-muted-foreground">
              {t("Практикуйтесь регулярно! Начните с медленной сборки, фокусируясь на понимании алгоритмов.")} {t("Скорость придет со временем. Используйте таймер на главной странице для отслеживания прогресса.")}
            </p>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button asChild className="glass interactive-button hover-theme bg-gradient-to-r from-primary to-accent px-8 h-11 rounded-full">
              <Link to="/ai?preset=novice">{t("Практика с AI‑Coach")}</Link>
            </Button>
          </div>
        </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Beginner;
