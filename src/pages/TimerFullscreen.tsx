import { Link } from "react-router-dom";
import Timer from "@/components/Timer";
import Scramble from "@/components/Scramble";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const TimerFullscreen = () => {
  const { t } = useI18n();
  return (
    <div className="ios-vh h-[100svh] w-full bg-background relative flex flex-col">
      {/* Back button */}
      <div className="absolute top-3 left-3 z-10">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">{t("Назад")}</Link>
        </Button>
      </div>

      {/* Centered timer */}
      <div className="flex-1 w-full flex items-center justify-center px-3">
        <div className="w-full max-w-4xl">
          <Timer variant="fullscreen" />
        </div>
      </div>

      {/* Scramble text visible, title hidden, placed below */}
      <div className="w-full flex justify-center pb-6">
        <div className="transition-transform w-[92vw] max-w-5xl">
          <Scramble variant="noTitle" />
        </div>
      </div>
    </div>
  );
};

export default TimerFullscreen;