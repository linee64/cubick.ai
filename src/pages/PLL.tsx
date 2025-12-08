import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import CFOPNav from "@/components/CFOPNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { PLLVisualizer } from "@/components/PLLVisualizer";

export default function PLLPage() {
  const { t } = useI18n();
  
  const pllCases = [
    { id: "pll_Aa", name: "Aa", algorithm: "x R' U R' D2 R U' R' D2 R2 x'", steps: [t("Переставить углы типа A"), t("Сохранить ребра")] },
    { id: "pll_Ab", name: "Ab", algorithm: "x' R U' R D2 R' U R D2 R2 x", steps: [t("Переставить углы типа A (зерк.)"), t("Сохранить ребра")] },
    { id: "pll_E", name: "E", algorithm: "x' R U' R' D R U R' D' x", steps: [t("Меняем диагональные углы"), t("Сохраняем ребра")] },
    { id: "pll_F", name: "F", algorithm: "R' U2 R' d' R' F' R2 U' R' U R' F R F", steps: [t("Меняем два угла и два ребра"), t("Фиксируем слой")] },
    { id: "pll_Ga", name: "Ga", algorithm: "R2 U R' U R' U' R U' R2 (U D) R' U R D'", steps: [t("Ga перестановка"), t("Завершить выравнивание")] },
    { id: "pll_Gb", name: "Gb", algorithm: "R' U' R U D' R2 U R' U R U' R U' R2 D", steps: [t("Gb перестановка"), t("Завершить выравнивание")] },
    { id: "pll_Gc", name: "Gc", algorithm: "R2 U' R U' R U R' U R2 (U D') R U' R' D", steps: [t("Gc перестановка"), t("Завершить выравнивание")] },
    { id: "pll_Gd", name: "Gd", algorithm: "R U R' U' D R2 U' R U' R' U R' U R2 D'", steps: [t("Gd перестановка"), t("Завершить выравнивание")] },
    { id: "pll_H", name: "H", algorithm: "M2 U M2 U2 M2 U M2", steps: [t("Поменять противоположные ребра"), t("Достроить слой")] },
    { id: "pll_Ja", name: "Ja", algorithm: "L' U' L F L' U' L U L F' L2 U L U", steps: [t("Ja перестановка"), t("Фиксируем")] },
    { id: "pll_Jb", name: "Jb", algorithm: "R U R' F' R U R' U' R' F R2 U' R' U'", steps: [t("Jb перестановка"), t("Фиксируем")] },
    { id: "pll_Na", name: "Na", algorithm: "(R U' R) U (R U) (R U' R' U') R2 (U' R' U R) U R'", steps: [t("Na перестановка"), t("Фиксируем")] },
    { id: "pll_Nb", name: "Nb", algorithm: "(R' U R') U' (R' U') (R' U R U) R2 (U R U' R') U' R", steps: [t("Nb перестановка"), t("Фиксируем")] },
    { id: "pll_Ra", name: "Ra", algorithm: "R U' R F R' U R U' R' F' R2 U' R' U2 R U' R'", steps: [t("Ra ребра + углы"), t("Фиксируем")] },
    { id: "pll_Rb", name: "Rb", algorithm: "R' U2 R U2 R' F R U R' U' R' F' R2 U'", steps: [t("Rb ребра + углы"), t("Фиксируем")] },
    { id: "pll_T", name: "T", algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'", steps: [t("T перестановка"), t("Фиксируем")] },
    { id: "pll_Ua", name: "Ua", algorithm: "M2 U M U2 M' U M2", steps: [t("Сдвиг ребер по часовой"), t("Сохранить углы")] },
    { id: "pll_Ub", name: "Ub", algorithm: "M2 U' M U2 M' U' M2", steps: [t("Сдвиг ребер против часовой"), t("Сохранить углы")] },
    { id: "pll_V", name: "V", algorithm: "R' U R' d' R' F' R2 U' R' U R' F R F", steps: [t("V перестановка"), t("Фиксируем")] },
    { id: "pll_Y", name: "Y", algorithm: "F R U' R' U' R U R' F' R U R' U' R' F R F'", steps: [t("Y углы + ребра"), t("Фиксируем")] },
    { id: "pll_Z", name: "Z", algorithm: "M' U M2 U M2 U M' U2 M2", steps: [t("Сдвиг соседних ребер"), t("Фиксируем")] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageTransition>
          <div className="max-w-5xl mx-auto space-y-6">
            <CFOPNav />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PLL — {t("Перестановка последнего слоя")}</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {pllCases.map((c) => (
                <Card key={c.id} className="p-4 md:p-6 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 interactive-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-4">
                      <div className="w-36">
                        <div className="h-32 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          <PLLVisualizer caseId={c.id} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">{c.name}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{t("План действий")}</div>
                        <ul className="mt-1 list-disc list-inside text-muted-foreground text-sm">
                          {c.steps.map((s, i) => (<li key={i}>{s}</li>))}
                        </ul>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-mono text-base bg-background p-3 rounded-md">{c.algorithm}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}