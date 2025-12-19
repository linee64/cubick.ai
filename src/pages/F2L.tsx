import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import CFOPNav from "@/components/CFOPNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { F2LVisualizer } from "@/components/F2LVisualizer";

export default function F2LPage() {
  const { t } = useI18n();

  const f2lCases = [
    { id: "f2l_fr_basic_insert", name: t("F2L scheme 1"), slot: "", algorithm: "F R' F' R", steps: [t("Синия сторона смотрит на нас"), t("Вставить базовым алгоритмом")], pattern: "pair-ready" },
    { id: "f2l_fr_split_white_up", name: t("F2L scheme 2"), slot: "", algorithm: "U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить базовым алгоритмом")], pattern: "split-white-up" },
    { id: "f2l_fr_split_white_front", name: t("F2L scheme 3"), slot: "", algorithm: "F' U' F", steps: [t("Синия сторона смотрит на нас"), t("Вставить базовым алгоритмом")], pattern: "split-white-front" },
    { id: "f2l_fr_misoriented_pair", name: t("F2L scheme 4"), slot: "", algorithm: "R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить базовым алгоритмом")], pattern: "pair-misorient" },
    { id: "f2l_fr_edge_in_middle", name: t("F2L scheme 5"), slot: "", algorithm: "y' U R' U' R U R' U2 R", steps: [t("Белый угол смотрит от нас"), t("Вставить алгоритмом")], pattern: "edge-middle" },
    { id: "f2l_fr_corner_wrong_in_slot", name: t("F2L scheme 6"), slot: "", algorithm: "U' R U R' U2 R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "corner-wrong-slot" },
    { id: "f2l_fr_edge_in_slot_corner_u", name: t("F2L scheme 7"), slot: "", algorithm: "y' U R' U2 R U R' U2 R", steps: [t("Синия сторона справа от нас"), t("Вставить алгоритмом")], pattern: "edge-in-slot" },
    { id: "f2l_fr_pair_over_wrong_slot", name: t("F2L scheme 8"), slot: "", algorithm: "U' R U2 R' U2 R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "pair-over-wrong" },
    { id: "f2l_fl_basic_insert", name: t("F2L scheme 9"), slot: "", algorithm: "F R U R' U' F' R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "pair-ready-fl" },
    { id: "f2l_fl_split", name: t("F2L scheme 10"), slot: "", algorithm: "U' R U R' U R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "split-fl" },
    { id: "f2l_br_reorient", name: t("F2L scheme 11"), slot: "", algorithm: "y' R U2 R2 U' R2 U' R'", steps: [t("Синия сторона справа от нас"), t("Вставить алгоритмом")], pattern: "reorient-br" },
    { id: "f2l_bl_extract_reinsert", name: t("F2L scheme 12"), slot: "", algorithm: "y2 L' U2 L2 U L2 U L", steps: [t("Синия сторона cзади  нас"), t("Вставить алгоритмом")], pattern: "extract-bl" },
    // Placeholders for remaining F2L cases (Total 41)
    { id: "f2l_case_13", name: t("F2L scheme 13"), slot: "", algorithm: "y' U R' U R U' R' U' R", steps: [t("Синия сторона справа от нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_14", name: t("F2L scheme 14"), slot: "", algorithm: "U' R U' R' U R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_15", name: t("F2L scheme 15"), slot: "", algorithm: "U F U R U' R' F' R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_16", name: t("F2L scheme 16"), slot: "", algorithm: "R U R' U2 R U' R' U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_17", name: t("F2L scheme 17"), slot: "", algorithm: "R' F R F' R U' R' U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_18", name: t("F2L scheme 18"), slot: "", algorithm: "R U2 R' U' R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_19", name: t("F2L scheme 19"), slot: "", algorithm: "R U' R2 F R F' R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_20", name: t("F2L scheme 20"), slot: "", algorithm: "R U2 R' U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_21", name: t("F2L scheme 21"), slot: "", algorithm: "R U R' F' U' F", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_22", name: t("F2L scheme 22"), slot: "", algorithm: "R U R' U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_23", name: t("F2L scheme 23"), slot: "", algorithm: "U' R U R2 F R F' R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_24", name: t("F2L scheme 24"), slot: "", algorithm: "(U2) R2 U2 R' U' R U' R2", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_25", name: t("F2L scheme 25"), slot: "", algorithm: "U R U' R' F R' F' R", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_26", name: t("F2L scheme 26"), slot: "", algorithm: "R' F' R U R U' R' F", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_27", name: t("F2L scheme 27"), slot: "", algorithm: "R U R' U' F R' F' R", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_28", name: t("F2L scheme 28"), slot: "", algorithm: "R U' R' U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_29", name: t("F2L scheme 29"), slot: "", algorithm: "y L' U' L U L' U' L", steps: [t("Синия сторона справа от нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_30", name: t("F2L scheme 30"), slot: "", algorithm: "R U R' U' R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_31", name: t("F2L scheme 31"), slot: "", algorithm: "U' R U' R' U2 R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_32", name: t("F2L scheme 32"), slot: "", algorithm: "U R U R' U2 R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_33", name: t("F2L scheme 33"), slot: "", algorithm: "U' R U R' d R' U' R", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_34", name: t("F2L scheme 34"), slot: "", algorithm: "R' F R F' R U' R' U R U' R' U2 R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_35", name: t("F2L scheme 35"), slot: "", algorithm: "U2 F' U' F U R U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_36", name: t("F2L scheme 36"), slot: "", algorithm: "R U R' U' R U R' U' R U R' U'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_37", name: t("F2L scheme 37"), slot: "", algorithm: "U R U2 R' F' U' F", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_38", name: t("F2L scheme 38"), slot: "", algorithm: "R U R' U' R U2 R' U' R U R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_39", name: t("F2L scheme 39"), slot: "", algorithm: "R U2 R U R' U R U2 R2'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_40", name: t("F2L scheme 40"), slot: "", algorithm: "R F U R U' R' F' U' R'", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
    { id: "f2l_case_41", name: t("F2L scheme 41"), slot: "", algorithm: "R U R' U' R U' R' U2 F' U' F", steps: [t("Синия сторона смотрит на нас"), t("Вставить алгоритмом")], pattern: "placeholder" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageTransition>
          <div className="max-w-5xl mx-auto space-y-6">
            <CFOPNav />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">F2L — {t("Первые два слоя")}</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {f2lCases.map((c) => (
                <Card key={c.id} className="p-4 md:p-6 bg-gradient-to-br from-card to-muted/20 shadow-xl border-2 interactive-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-4">
                      <div className="w-36 flex flex-col items-center">
                        <F2LVisualizer caseId={c.id} className="w-full h-32" />
                        <span className="text-xs text-muted-foreground mt-2">{c.slot}</span>
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