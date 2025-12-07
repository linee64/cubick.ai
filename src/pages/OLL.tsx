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
    { id: "oll_01", name: "OLL 1 — Dot (no edges)", algorithm: "(R U2) (R2 F R F') U2 (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм ориентации")] },
    { id: "oll_02", name: "OLL 2 — Dot", algorithm: "F (R U R' U') F' f (R U R' U') f'", steps: [t("Распознать форму"), t("Выполнить алгоритм") ] },
    { id: "oll_03", name: "OLL 3 — Dot", algorithm: "f (R U R' U') f' U' F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_04", name: "OLL 4 — Dot", algorithm: "(R U R' U) (R' F R F') U2 (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_05", name: "OLL 5 — P-shape", algorithm: "F (R U R' U') F' U F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_06", name: "OLL 6 — P-shape", algorithm: "r U R' U' r' R U R U' R'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_07", name: "OLL 7 — T-shape", algorithm: "(R U R' U') (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_08", name: "OLL 8 — T-shape", algorithm: "F (R U R' U') F' U' F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_09", name: "OLL 9 — W-shape", algorithm: "r U R' U' r' U' R' F R F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_10", name: "OLL 10 — W-shape", algorithm: "R' F R U R' F' R F U' F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_11", name: "OLL 11 — L-shape", algorithm: "F (R U R' U') F' U F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_12", name: "OLL 12 — L-shape", algorithm: "r' U' R U' R' U2 r", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_13", name: "OLL 13 — L-shape", algorithm: "F U R U' R' F' U F R U R' U' F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_14", name: "OLL 14 — L-shape", algorithm: "R' F R U R' F' R F U' F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_15", name: "OLL 15 — Square", algorithm: "(R U R' U) (R U' R' U') (R' F R F')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_16", name: "OLL 16 — Square", algorithm: "(r U r' U r U2 r')", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_17", name: "OLL 17 — Small lightning", algorithm: "F (R U R' U') F' U' r U R' U' r'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_18", name: "OLL 18 — Small lightning", algorithm: "r' U' R U' R' U2 r U F (R U R' U') F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_19", name: "OLL 19 — Bowtie", algorithm: "(R U R' U') R' F R2 U R' U' F'", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_20", name: "OLL 20 — Bowtie", algorithm: "r U' r2 U r2 U r' U' r2 U' r2 U' r", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_21", name: "OLL 21 — Headlights", algorithm: "R2 D' R U2 R' D R U2 R", steps: [t("Распознать форму"), t("Выполнить алгоритм")] },
    { id: "oll_22", name: "OLL 22 — Headlights", algorithm: "(R U2) (R2 F R F') (R U2) (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_23", name: "OLL 23 — Arrow", algorithm: "F (R U R' U') F' U F (R U R' U') F' U", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_24", name: "OLL 24 — Arrow", algorithm: "r U R' U' r' F R U R' U' F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_25", name: "OLL 25 — Fish", algorithm: "(R U R' U) (R U' R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_26", name: "Antisune", algorithm: "R' U' R U' R' U2 R", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_27", name: "Sune", algorithm: "R U R' U R U2 R'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_28", name: "OLL 28 — Double Sune", algorithm: "R U R' U R U' R' U R U2 R'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_29", name: "OLL 29 — Chameleon", algorithm: "F R U R' U' R U R' U' F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_30", name: "OLL 30 — Chameleon", algorithm: "r U' r2 U r U r' U' r2 U' r", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_31", name: "OLL 31 — Swordfish", algorithm: "F U R U' R' U R U' R' F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_32", name: "OLL 32 — Kite", algorithm: "R U R' U' R' F R F' U R U' R'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_33", name: "OLL 33 — Diagonal", algorithm: "(R U R' U') (R' F R F') U (R U R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_34", name: "OLL 34 — Diagonal", algorithm: "f (R U R' U') f' U' (R U R' U')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_35", name: "OLL 35 — Square", algorithm: "R U2 R2 F R F' U2 R' F R F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_36", name: "OLL 36 — Square", algorithm: "L' U' L U' L' U L U L F' L' F", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_37", name: "OLL 37 — Knight move", algorithm: "R U R' U' R' F R2 U R' U' F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_38", name: "OLL 38 — Knight move", algorithm: "L' U' L U L F' L2 U' L U F", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_39", name: "OLL 39 — Crown", algorithm: "R U R' U R U' R' U' R' F R F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_40", name: "OLL 40 — Crown", algorithm: "L' U' L U' L' U L U L F' L' F", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_41", name: "OLL 41 — Arrowhead", algorithm: "(R U R' U) (R U' R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_42", name: "OLL 42 — Arrowhead", algorithm: "(L' U' L U') (L' U L U) (L F' L' F)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_43", name: "OLL 43 — Line", algorithm: "(R U R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_44", name: "OLL 44 — Line", algorithm: "(L' U' L U) (L F' L' F)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_45", name: "OLL 45 — Cross", algorithm: "F (R U R' U') F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_46", name: "OLL 46 — Cross", algorithm: "R' U' R' F R F' U R", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_47", name: "OLL 47 — Cross", algorithm: "(R U R' U) (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_48", name: "OLL 48 — Cross", algorithm: "(L' U' L U') (L F' L' F)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_49", name: "OLL 49 — Corners", algorithm: "R' U' R U' R' U R U R B' R' B", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_50", name: "OLL 50 — Corners", algorithm: "L U L' U L U' L' U' L' B L B'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_51", name: "OLL 51 — I-shape", algorithm: "R U R' U R U' R' U' R' F R F'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_52", name: "OLL 52 — I-shape", algorithm: "L' U' L U' L' U L U L F' L' F", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_53", name: "OLL 53 — X-shape", algorithm: "(R U R' U') x D' R' U R D x'", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_54", name: "OLL 54 — X-shape", algorithm: "(L' U' L U) x' D L U' L' D' x", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_55", name: "OLL 55 — Lightning", algorithm: "(R U R' U') (R U' R') (F' U' F)", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_56", name: "OLL 56 — Lightning", algorithm: "(L' U' L U) (L' U L) (F U F')", steps: [t("Распознать"), t("Алгоритм")] },
    { id: "oll_57", name: "OLL 57 — Last one", algorithm: "(R U R' U') (R' F R F') U' (R U R' U') (R' F R F')", steps: [t("Распознать"), t("Алгоритм")] },
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
                        <div className="md:hidden h-32 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">{t("Схема")}</div>
                        <div className="hidden md:flex h-32 rounded-md bg-muted items-center justify-center overflow-hidden">
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