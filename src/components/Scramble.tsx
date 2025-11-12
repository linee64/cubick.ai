import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type ScrambleProps = {
  variant?: "default" | "buttonOnly" | "noTitle";
};

const Scramble = ({ variant = "default" }: ScrambleProps) => {
  const moves = ["R", "L", "U", "D", "F", "B"];
  const modifiers = ["", "'", "2"];

  const generateScramble = () => {
    const scrambleLength = 15;
    let scramble = [];
    let lastMove = "";

    for (let i = 0; i < scrambleLength; i++) {
      let move;
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
      } while (move === lastMove);
      
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble.push(move + modifier);
      lastMove = move;
    }

    return scramble.join(" ");
  };

  const [scramble, setScramble] = useState(generateScramble());
  const { t } = useI18n();

  if (variant === "buttonOnly") {
    return (
      <div className="w-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScramble(generateScramble())}
          className="interactive-button"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t("Новый")}
        </Button>
      </div>
    );
  }

  if (variant === "noTitle") {
    return (
      <Card className="p-4 bg-gradient-to-br from-card to-muted/30 shadow-lg">
        <div className="flex items-center justify-end mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScramble(generateScramble())}
            className="interactive-button"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("Новый")}
          </Button>
        </div>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScramble(generateScramble())}
          className="interactive-button"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t("Новый")}
        </Button>
      </div>
      <p className="text-xl md:text-2xl font-mono text-center py-4 break-words">
        {scramble}
      </p>
    </Card>
  );
};

export default Scramble;
