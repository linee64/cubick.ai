import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import CFOPNav from "@/components/CFOPNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export default function F2LPage() {
  const { t } = useI18n();

  const f2lCases = [
    { id: "f2l_fr_basic_insert", name: t("Пара собрана в U, вставка в FR"), slot: "FR", algorithm: "U R U' R'", steps: [t("Выровнять пару над целевым слотом"), t("Вставить базовым алгоритмом")], pattern: "pair-ready" },
    { id: "f2l_fr_split_white_up", name: t("Пара разделена, белая наверх, слот FR"), slot: "FR", algorithm: "U R U' R' U' F' U F", steps: [t("Сформировать пару"), t("Вставить через F перемещение")], pattern: "split-white-up" },
    { id: "f2l_fr_split_white_front", name: t("Пара разделена, белая спереди, слот FR"), slot: "FR", algorithm: "U' R U R' F' U' F", steps: [t("Подвести угол"), t("Сформировать пару"), t("Вставить через F")], pattern: "split-white-front" },
    { id: "f2l_fr_misoriented_pair", name: t("Пара собрана, ориентация неверна, слот FR"), slot: "FR", algorithm: "R U2 R' U' R U R'", steps: [t("Переориентировать пару"), t("Вставить в слот")], pattern: "pair-misorient" },
    { id: "f2l_fr_edge_in_middle", name: t("Ребро в средине, угол в U, слот FR"), slot: "FR", algorithm: "U R U' R' U' F' U F", steps: [t("Вывести ребро в U"), t("Сформировать пару"), t("Вставить")], pattern: "edge-middle" },
    { id: "f2l_fr_corner_wrong_in_slot", name: t("Угол в слоте неверно, ребро в U"), slot: "FR", algorithm: "R U R' U' U R U' R'", steps: [t("Вынуть угол"), t("Сформировать пару"), t("Вставить")], pattern: "corner-wrong-slot" },
    { id: "f2l_fr_edge_in_slot_corner_u", name: t("Ребро в слоте, угол в U"), slot: "FR", algorithm: "R U' R' U U R U' R'", steps: [t("Вынуть ребро"), t("Сформировать пару"), t("Вставить")], pattern: "edge-in-slot" },
    { id: "f2l_fr_pair_over_wrong_slot", name: t("Пара собрана над другим слотом"), slot: "FR", algorithm: "U R U' R'", steps: [t("Переместить над целевым слотом"), t("Вставить базовым алгоритмом")], pattern: "pair-over-wrong" },
    { id: "f2l_fl_basic_insert", name: t("Пара собрана в U, вставка в FL"), slot: "FL", algorithm: "U' F' U F", steps: [t("Выровнять над FL"), t("Вставить базовым зеркальным")], pattern: "pair-ready-fl" },
    { id: "f2l_fl_split", name: t("Пара разделена для FL"), slot: "FL", algorithm: "U' F' U F U R U' R'", steps: [t("Сформировать пару"), t("Вставить через F"), t("Завершить R последовательностью")], pattern: "split-fl" },
    { id: "f2l_br_reorient", name: t("Переориентация пары для BR"), slot: "BR", algorithm: "L' U' L U L' U L", steps: [t("Переориентировать"), t("Вставить")], pattern: "reorient-br" },
    { id: "f2l_bl_extract_reinsert", name: t("Извлечь и вставить пару для BL"), slot: "BL", algorithm: "L U L' U' U' L U L'", steps: [t("Извлечь пару"), t("Сформировать"), t("Вставить")], pattern: "extract-bl" },
  ];

  const F2LDiagram = ({ slot }: { slot: string }) => (
    <svg viewBox="0 0 120 100" className="w-full h-32">
      <rect x="0" y="0" width="120" height="100" rx="8" className="fill-muted" />
      <g transform="translate(12,12)">
        {[0,1,2].map((r) => (
          [0,1,2].map((c) => (
            <rect key={`u-${r}-${c}`} x={c*24} y={r*24} width="22" height="22" rx="3" className="fill-background stroke-muted" />
          ))
        ))}
        <rect x="48" y="48" width="22" height="22" rx="3" className="fill-primary/20" />
        <circle cx="24" cy="24" r="8" className="fill-accent" />
        <rect x="24" y="48" width="16" height="6" className="fill-accent" />
      </g>
      <g transform="translate(80,50)">
        <path d="M0 0 L20 0" className="stroke-primary" strokeWidth="2" />
        <path d="M16 -4 L20 0 L16 4" className="fill-primary" />
      </g>
      <text x="10" y="95" className="fill-muted-foreground text-[10px]">{slot}</text>
    </svg>
  );

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
                <Card key={c.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-4">
                      <div className="w-36"><F2LDiagram slot={c.slot} /></div>
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