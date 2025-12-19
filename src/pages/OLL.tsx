import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import CFOPNav from "@/components/CFOPNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { OLLVisualizer } from "@/components/OLLVisualizer";

export default function OLLPage() {
  const { t } = useI18n();
  
  const ollCases = [
    { id: "oll_01", name: "OLL-1", algorithm: "(r U R' U') M2 (U R U' R') U' M'", steps: [t("Распознать форму"), t("Выполнить алгоритм ориентации")] },
    { id: "oll_02", name: "OLL-2", algorithm: "(R U R' U) (R' F R F') U2 (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм") ] },
    { id: "oll_03", name: "OLL-3", algorithm: "(R U2 R') (R' F R F') U2 (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_04", name: "OLL-4", algorithm: "F (R U R' U') F' f (R U R' U') f'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_05", name: "OLL-5", algorithm: "f (R U R' U') f' (U') F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_06", name: "OLL-6", algorithm: " f (R U R' U') f' (U) F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_07", name: "OLL-7", algorithm: "(R U2 R') (R' F R F') U2 M' (U R U' r')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_08", name: "OLL-8", algorithm: "M U (R U R' U') M' (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_09", name: "OLL-9", algorithm: "(R U R' U') r (U R U' r')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_10", name: "OLL-10", algorithm: "(r U R' U') r' R (U R U' R')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_11", name: "OLL-11", algorithm: "F (R U R' U') F' (R U R' U') (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_12", name: "OLL-12", algorithm: "F (R U R' U') (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_13", name: "OLL-13", algorithm: "U [F' (L' U' L U) (L' U' L U) F]", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_14", name: "OLL-14", algorithm: "(r U r') (R U R' U') (R U R' U') (r U' r')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_15", name: "OLL-15", algorithm: "(R' F) (R2 B') (R2 F') (R2 B) R'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_16", name: "OLL-16", algorithm: "U (r U') (r2 U r2 U r2 U') r", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_17", name: "OLL-17", algorithm: "R U2 R' U2 (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_18", name: "OLL-18", algorithm: "L' U2 L U2 (L F' L' F)", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_19", name: "OLL-19", algorithm: "U2 F (R U R' U') F' U F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_20", name: "OLL-20", algorithm: "U2 F' (L' U' L U) F U F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_21", name: "OLL-21", algorithm: "F (U R U' R') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_22", name: "OLL-22", algorithm: "f' (L' U' L U) f", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_23", name: "OLL-23", algorithm: "U2 f F' (R U R' U') (R' F R f')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_24", name: "OLL-24", algorithm: "R' U' F (U R U' R') F' R", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_25", name: "OLL-25", algorithm: "(R U R' U R U2 R') F (R U R' U') F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_26", name: "OLL-26", algorithm: "(L' U' L U') L' U2 L F' (L' U' L U) F", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_27", name: "OLL-27", algorithm: "(R2 U R' B') (R U' R2 U) (l U l')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_28", name: "OLL-28", algorithm: "(R' F R F') (R U2 R' U') F' U' F", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_29", name: "OLL-29", algorithm: "r U2 R' U' R U' r'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_30", name: "OLL-30", algorithm: "r' U2 (R U R' U) r", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_31", name: "OLL-31", algorithm: "F R (U' R' U') (R U R') F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_32", name: "OLL-32", algorithm: "L U2 r2 F r U' r U2 L'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_33", name: "OLL-33", algorithm: "(R U R' U) (R U' R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_34", name: "OLL-34", algorithm: "(R U R2) (F' U' F) U R2 U2 R'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_35", name: "OLL-35", algorithm: "(R U R' U') R' F (R2 U R' U') F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_36", name: "OLL-36", algorithm: "(R U R' U) (R' F R F') (R U2 R')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_37", name: "OLL-37", algorithm: "F (R U R' U') F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_38", name: "OLL-38", algorithm: "(R U R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_39", name: "OLL-39", algorithm: "(R' F) (R U R' U') F' U R", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_40", name: "OLL-40", algorithm: "(L F') (L' U' L U) F U' L'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_41", name: "OLL-41", algorithm: "R' U' (R' F R F') U R", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_42", name: "OLL-42", algorithm: "(R U R2 U') (R' F R U) R U' F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_43", name: "OLL-43", algorithm: "(r U r') (R U R' U') (r U' r')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_44", name: "OLL-44", algorithm: "(r' U' r) (R' U' R U) (r' U r)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_45", name: "OLL-45", algorithm: "(R' F R) (U R' F' R) (F U' F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_46", name: "OLL-46", algorithm: "(r U' r') (U' r U r') y ' (R' U R)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_47", name: "OLL-47", algorithm: "r' U' r (U' R' U R) (U' R' U R) r' U r", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_48", name: "OLL-48", algorithm: "f (R U R' U') (R U R' U') f'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_49", name: "OLL-49", algorithm: "(R' F) (R U R U') (R2 F' R2) (U' R' U) (R U R')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_50", name: "OLL-50", algorithm: "(R' U' R U' R' U) y' (R' U R) B", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_51", name: "OLL-51", algorithm: "(R U2) (R' U' R U) (R' U' R U' R')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_52", name: "OLL-52", algorithm: "R U2 R2 U' R2 U' R2 U2 R", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_53", name: "OLL-53", algorithm: "(R U R' U) R U2 R'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_54", name: "OLL-54", algorithm: "U (L' U' L U' L' U2 L)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_55", name: "OLL-55", algorithm: "(r U R' U') (r' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_56", name: "OLL-56", algorithm: "F' (r U R' U') (r' F R)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_57", name: "OLL-57", algorithm: "R2 D R' U2 R D' R' U2 R'", steps: [t("Распознать"), t("Алгоритм")] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageTransition>
          <div className="max-w-5xl mx-auto space-y-6">
            <CFOPNav />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">OLL — {t("Ориентация последнего слоя")}</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {ollCases.map((c) => (
                <Card key={c.id} className="p-4 md:p-6 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 interactive-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-4">
                      <div className="w-36">
                        <div className="h-32 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          <OLLVisualizer caseId={c.id} />
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