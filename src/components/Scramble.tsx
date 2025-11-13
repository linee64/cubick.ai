import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

type ScrambleProps = {
  variant?: "default" | "noTitle" | "noButton";
};

const MOVES = ["R", "L", "U", "D", "F", "B"] as const;
const MODIFIERS = ["", "'", "2"] as const;

const Scramble = ({ variant = "default" }: ScrambleProps) => {

  const generateScramble = useCallback(() => {
    const scrambleLength = 15;
    const seq: string[] = [];
    let lastMove = "";

    for (let i = 0; i < scrambleLength; i++) {
      let move;
      do {
        move = MOVES[Math.floor(Math.random() * MOVES.length)];
      } while (move === lastMove);
      
      const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
      seq.push(move + modifier);
      lastMove = move;
    }

    return seq.join(" ");
  }, []);

  const [scramble, setScramble] = useState(generateScramble());
  const { t } = useI18n();

  useEffect(() => {
    const handler = () => setScramble(generateScramble());
    window.addEventListener("cubick:scramble:new", handler);
    return () => window.removeEventListener("cubick:scramble:new", handler);
  }, [generateScramble]);

  if (variant === "noTitle") {
    return (
      <Card className="p-4 bg-gradient-to-br from-card to-muted/30 shadow-lg">
        <p className="text-base sm:text-lg font-mono text-center py-2 tracking-wider break-words">
          {scramble}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{t("Скрэмбл")}</h3>
      </div>
      <p className="text-xl md:text-2xl font-mono text-center py-4 break-words">
        {scramble}
      </p>
    </Card>
  );
};

export default Scramble;
