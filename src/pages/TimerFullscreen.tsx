import { Link } from "react-router-dom";
import Timer from "@/components/Timer";
import Scramble from "@/components/Scramble";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";

const TimerFullscreen = () => {
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onCollapse = () => setCollapsed(true);
    const onExpand = () => setCollapsed(false);
    window.addEventListener("cubick:fullscreen:collapse", onCollapse);
    window.addEventListener("cubick:fullscreen:expand", onExpand);
    return () => {
      window.removeEventListener("cubick:fullscreen:collapse", onCollapse);
      window.removeEventListener("cubick:fullscreen:expand", onExpand);
    };
  }, []);
  return (
    <div className="ios-vh h-[100svh] w-full bg-background relative flex flex-col">
      <div className="absolute top-3 left-3 z-10">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">{t("Назад")}</Link>
        </Button>
      </div>

      <div className="flex-1 w-full flex items-center justify-center px-3">
        <div className="w-full max-w-4xl flex flex-col items-center gap-3">
          <Timer variant="fullscreen" />
          <div className="w-[92vw] max-w-5xl collapse-anim" data-collapsed={collapsed ? "true" : "false"}>
            <Scramble variant="noTitle" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerFullscreen;