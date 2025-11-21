import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import CFOPNav from "@/components/CFOPNav";

const Friedrich = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <PageTransition>
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("Назад")}
            </Link>
          </Button>

          <CFOPNav />

          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("Метод Фридрих (CFOP)")}
          </h1>

          <Card className="p-8 mb-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <h2 className="text-2xl font-semibold mb-4">{t("О методе")}</h2>
            <p className="text-muted-foreground mb-4">
              {t("Метод Фридрих (CFOP) - самый популярный метод скоростной сборки кубика Рубика.")} 
              {t("Используется большинством спидкуберов мирового уровня.")}
            </p>
            <p className="text-muted-foreground">
              <strong>CFOP</strong> {t("расшифровывается как: Cross - F2L - OLL - PLL")}
            </p>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-shadow" id="f2l">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  C
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Cross (Крест)")}</h3>
                  <p className="text-muted-foreground mb-2">
                    {t("Соберите крест на нижней грани за минимальное количество ходов (обычно 8 или меньше).")}
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    {t("Продвинутые спидкуберы планируют крест заранее во время инспекции.")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow" id="oll">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  F2L
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("First Two Layers (Первые два слоя)")}</h3>
                  <p className="text-muted-foreground mb-2">
                    {t("Одновременно вставляйте пары угол-ребро, завершая первые два слоя за один шаг.")}
                  </p>
                  <p className="text-sm text-muted-foreground italic mb-3">
                    {t("41 базовый случай F2L. Цель - научиться распознавать и решать их интуитивно.")}
                  </p>
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

            <Card className="p-6 hover:shadow-lg transition-shadow" id="pll">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  OLL
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Orientation of Last Layer (Ориентация последнего слоя)")}</h3>
                  <p className="text-muted-foreground mb-2">
                    {t("Ориентируйте все элементы последнего слоя правильной стороной вверх.")}
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    {t("57 различных алгоритмов OLL. Начинайте с изучения самых частых случаев.")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow" id="cross">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  PLL
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("Permutation of Last Layer (Перестановка последнего слоя)")}</h3>
                  <p className="text-muted-foreground mb-2">
                    {t("Расставьте элементы последнего слоя на их финальные позиции.")}
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    {t("21 алгоритм PLL. Это последний шаг сборки!")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 mt-8 bg-gradient-to-br from-primary/10 to-accent/10">
            <h3 className="font-semibold text-lg mb-3">{t("🚀 Советы от ИИ для освоения CFOP")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>{t("Учите поэтапно:")}</strong> {t("Сначала освойте интуитивный F2L, затем постепенно добавляйте OLL и PLL")}</li>
              <li>• <strong>{t("Практикуйте look-ahead:")}</strong> {t("Учитесь планировать следующую пару F2L во время выполнения текущей")}</li>
              <li>• <strong>Finger tricks:</strong> {t("Правильные движения пальцев критичны для скорости")}</li>
              <li>• <strong>{t("Распознавание паттернов:")}</strong> {t("Тренируйтесь быстро узнавать случаи OLL и PLL")}</li>
              <li>• <strong>{t("Используйте таймер:")}</strong> {t("Регулярно засекайте время, чтобы отслеживать прогресс")}</li>
            </ul>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-lg mb-2">{t("📊 Целевое время по этапам")}</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>Cross:</span>
                <span className="font-mono font-semibold">2-3 {t("сек")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>F2L:</span>
                <span className="font-mono font-semibold">8-12 {t("сек")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>OLL:</span>
                <span className="font-mono font-semibold">1-2 {t("сек")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>PLL:</span>
                <span className="font-mono font-semibold">1-2 {t("сек")}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {t("Эти показатели приведут вас к результату sub-20 (меньше 20 секунд на сборку)")}
            </p>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button asChild className="glass interactive-button hover-theme bg-gradient-to-r from-primary to-accent px-8 h-11 rounded-full">
              <Link to="/ai?preset=friedrich">{t("Практика с AI‑Coach")}</Link>
            </Button>
          </div>
        </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Friedrich;
