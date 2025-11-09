import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/lib/i18n";

export default function Instructions() {
  const { t } = useI18n();
  const notations = [
    {
      symbol: "R",
      name: t("Right (Правая)"),
      description: t("Поворот правой грани по часовой стрелке на 90°"),
      example: "R",
    },
    {
      symbol: "R'",
      name: t("Right Prime"),
      description: t("Поворот правой грани против часовой стрелки на 90°"),
      example: "R'",
    },
    {
      symbol: "R2",
      name: t("Right Double"),
      description: t("Поворот правой грани на 180°"),
      example: "R2",
    },
    {
      symbol: "L",
      name: t("Left (Левая)"),
      description: t("Поворот левой грани по часовой стрелке на 90°"),
      example: "L",
    },
    {
      symbol: "L'",
      name: t("Left Prime"),
      description: t("Поворот левой грани против часовой стрелки на 90°"),
      example: "L'",
    },
    {
      symbol: "U",
      name: t("Up (Верхняя)"),
      description: t("Поворот верхней грани по часовой стрелке на 90°"),
      example: "U",
    },
    {
      symbol: "U'",
      name: t("Up Prime"),
      description: t("Поворот верхней грани против часовой стрелки на 90°"),
      example: "U'",
    },
    {
      symbol: "D",
      name: t("Down (Нижняя)"),
      description: t("Поворот нижней грани по часовой стрелке на 90°"),
      example: "D",
    },
    {
      symbol: "D'",
      name: t("Down Prime"),
      description: t("Поворот нижней грани против часовой стрелки на 90°"),
      example: "D'",
    },
    {
      symbol: "F",
      name: t("Front (Передняя)"),
      description: t("Поворот передней грани по часовой стрелке на 90°"),
      example: "F",
    },
    {
      symbol: "F'",
      name: t("Front Prime"),
      description: t("Поворот передней грани против часовой стрелки на 90°"),
      example: "F'",
    },
    {
      symbol: "B",
      name: t("Back (Задняя)"),
      description: t("Поворот задней грани по часовой стрелке на 90°"),
      example: "B",
    },
    {
      symbol: "B'",
      name: t("Back Prime"),
      description: t("Поворот задней грани против часовой стрелки на 90°"),
      example: "B'",
    },
    {
      symbol: "M",
      name: t("Middle (Средняя)"),
      description: t("Поворот среднего слоя между L и R (как L)"),
      example: "M",
    },
    {
      symbol: "E",
      name: t("Equator (Экватор)"),
      description: t("Поворот среднего слоя между U и D (как D)"),
      example: "E",
    },
    {
      symbol: "S",
      name: t("Standing (Стоячий)"),
      description: t("Поворот среднего слоя между F и B (как F)"),
      example: "S",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageTransition>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Нотация кубика Рубика")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("Изучите символы и обозначения для записи алгоритмов сборки")}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("Основные правила")}</CardTitle>
              <CardDescription>
                {t("Понимание нотации - ключ к изучению алгоритмов")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{t("Обозначения:")}</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    <strong>{t("Буква без знака")}</strong> - {t("поворот по часовой стрелке")}
                  </li>
                  <li>
                    <strong>{t("Апостроф (')")}</strong> - {t("поворот против часовой стрелки")}
                  </li>
                  <li>
                    <strong>{t("Цифра 2")}</strong> - {t("двойной поворот (180°)")}
                  </li>
                </ul>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">{t("Как читать:")}</h3>
                <p className="text-muted-foreground">
                  {t("Направление \"по часовой стрелке\" определяется при взгляде на грань прямо.")} {t("Например, для грани R (правой) - это если смотреть на кубик справа.")}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {notations.map((notation) => (
              <Card key={notation.symbol} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {notation.symbol}
                    </span>
                    <span className="text-lg font-normal text-muted-foreground">
                      {notation.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{notation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>{t("Примеры алгоритмов")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-mono text-lg bg-background p-3 rounded-md">
                  R U R' U'
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("Один из базовых алгоритмов - поворот правой грани вверх и обратно")}
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-lg bg-background p-3 rounded-md">
                  F R U R' U' F'
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("Алгоритм для создания креста на последнем слое")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
