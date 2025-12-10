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
    { id: "pll_Aa", name: "Aa-Perm", algorithm: "(R U R' F') (r U R' U' r' F R2 U' R')", steps: [t("Выполнить Ab-Perm"), t("Выполнить 2 раза этот алгоритм")] },
    { id: "pll_Ab", name: "Ab-Perm", algorithm: "r U' r F2 r' U r F2", steps: [t("Выполнить Aa-Perm"), t("Выполнить 2 раза этот алгоритм")] },
    { id: "pll_E", name: "E-Perm", algorithm: "U2 R2 F (R U R' U') (R U R' U') (R U R' U') F' R2 U2", steps: [t("Выполнить этот алгоритм 1 раз")] },
    { id: "pll_F", name: "F-Perm", algorithm: "(R' U' F') (R U R' U') R' F R2 U' R' U' (R U R' U R)", steps: [t("Выполнить этот алгоритм 1 раз")] },
    { id: "pll_Ga", name: "Ga-Perm", algorithm: "(UD' R2 U) (R' U R' U' R U') (R2 U'D R' U R)", steps: [t("Выполнить Gb-Perm"), t("Выполнить 2 раза этот алгоритм")] },
    { id: "pll_Gb", name: "Gb-Perm", algorithm: "(R' U' R UD') (R2 U R' U) (R U' R U') R2 U'D", steps: [t("Выполнить Ga-Perm"), t("Выполнить 2 раза этот алгоритм")] },
    { id: "pll_Gc", name: "Gc-Perm", algorithm: "R2 F2 (R U2) (R U2) R' F (R U R' U') R' F R2 ", steps: [t("Выполнить Gd-Perm"), t("Выполнить 2 раза этот алгоритм")] },
    { id: "pll_Gd", name: "Gd-Perm", algorithm: "(R U R' U'D) (R2 U' R U') (R' U R' U) R2 UD'", steps: [t("Выполнить Gc-Perm"), t("Выполнить 2 раза этот алгоритм")] },
    { id: "pll_H", name: "H-Perm", algorithm: "(M2 U) (M2 U) (M2 U) (M2 U) (M2 U) (M2 U)", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Ja", name: "Ja-Perm", algorithm: "U2 (L' U' L F) (L' U' L U) (L F' L2 U L) U'", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Jb", name: "Jb-Perm", algorithm: "R U R' F' R U R' U' R' F R2 U' R' U'", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Na", name: "Na-Perm", algorithm: "(R U R' U) (R U R' F') (R U R' U') (R' F R2 U') R' U2 (R U' R')", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Nb", name: "Nb-Perm", algorithm: "(R' U R U') (R' F' U' F) (R U R' F) R' F' (R U' R)", steps: [t("Выполнить данный алгоритм еще раз")] },
    { id: "pll_Ra", name: "Ra-Perm", algorithm: "(R U R' F') (R U2 R' U2) R' F (R U R) U2 R' U'", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Rb", name: "Rb-Perm", algorithm: "(R' U2 R U2) R' F (R U R' U') R' F' R2 U'", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_T", name: "T-Perm", algorithm: "(R U R' U') (R' F R2 U' R' U') (R U R' F')", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Ua", name: "Ua-Perm", algorithm: "M2 U M U2 M' U M2", steps: [t("Выполнить Ub-Perm"), t("Выполнить данный алгоритм 2 раза")] },
    { id: "pll_Ub", name: "Ub-Perm", algorithm: "M2 U' M U2 M' U' M2", steps: [t("Выполнить Ua-Perm"), t("Выполнить данный алгоритм 2 раза")] },
    { id: "pll_V", name: "V-Perm", algorithm: "(R U2 R' D) (R U' R U' R U R2 D) (R' U' R D2)", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Y", name: "Y-Perm", algorithm: "(F R) (U' R' U' R U R' F') (R U R' U') (R' F R F')", steps: [t("Выполнить данный алгоритм 1 раз")] },
    { id: "pll_Z", name: "Z-Perm", algorithm: "M' U' M2 U' M2 U' M' U2 M2", steps: [t("Выполнить данный алгоритм 1 раз")] },
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
                        <div className="mt-1 text-sm text-muted-foreground">{t("Как создать")}</div>
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