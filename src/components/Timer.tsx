import { useState, useEffect, useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { addSolveForUser } from "@/lib/stats";
import { useI18n } from "@/lib/i18n";

type TimerProps = {
  variant?: "default" | "fullscreen";
};

const Timer = ({ variant = "default" }: TimerProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [pulse, setPulse] = useState(false);
  const prevIsRunning = useRef(false);
  const { user } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Pointer/touch controls: hold to get ready, release to start; tap to stop
  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;
    if (!isRunning) {
      setIsReady(true);
    } else {
      setIsRunning(false);
    }
  }, [isRunning]);

  const handlePointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;
    if (isReady) {
      setIsReady(false);
      setIsRunning(true);
    }
  }, [isReady]);

  const handlePointerCancel = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;
    if (isReady) {
      setIsReady(false);
    }
  }, [isReady]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const active = document.activeElement as HTMLElement | null;
    const isTyping = !!active && (
      active.tagName === "INPUT" ||
      active.tagName === "TEXTAREA" ||
      active.isContentEditable
    );

    if (e.code === "Space" && !e.repeat) {
      if (isTyping) return; // allow typing space inside inputs/textareas/contenteditable
      e.preventDefault();
      if (!isRunning) {
        setIsReady(true);
      } else {
        setIsRunning(false);
      }
    }
  }, [isRunning]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const active = document.activeElement as HTMLElement | null;
    const isTyping = !!active && (
      active.tagName === "INPUT" ||
      active.tagName === "TEXTAREA" ||
      active.isContentEditable
    );

    if (e.code === "Space" && isReady) {
      if (isTyping) return; // ignore space release if typing
      e.preventDefault();
      setIsReady(false);
      setIsRunning(true);
    }
  }, [isReady]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Trigger a single subtle pulse when the timer stops
  useEffect(() => {
    if (prevIsRunning.current && !isRunning) {
      setPulse(true);
    }
    prevIsRunning.current = isRunning;
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

const handleReset = () => {
  setTime(0);
  setIsRunning(false);
  setIsReady(false);
  window.dispatchEvent(new CustomEvent("cubick:scramble:new"));
};

  const handleSave = () => {
    if (time > 0) {
      // Save result to per-user statistics (fallback to global if not logged in)
      addSolveForUser(user?.id, time);
      toast({
        title: t("Время сохранено!"),
        description: `${t("Ваше время: ")}${formatTime(time)}`,
      });
    }
  };

  const sizeClass =
    variant === "fullscreen"
      ? "text-5xl sm:text-6xl md:text-[9rem] lg:text-[11rem]"
      : "text-4xl sm:text-5xl md:text-7xl";

  const containerGapClass = variant === "fullscreen" ? "gap-6" : "gap-5";
  const digitsTopMarginClass = variant === "fullscreen" ? "mt-2 sm:mt-3" : "";
  const buttonsMarginClass = variant === "fullscreen" ? "mt-3 sm:mt-6" : "mt-4";
  const buttonsBottomSpaceClass = variant === "fullscreen" ? "mb-6 sm:mb-8" : "";
  const uiCollapsed = variant === "fullscreen" && isRunning;

  useEffect(() => {
    if (variant !== "fullscreen") return;
    const evt = uiCollapsed ? "cubick:fullscreen:collapse" : "cubick:fullscreen:expand";
    window.dispatchEvent(new CustomEvent(evt));
  }, [variant, uiCollapsed]);

  return (
    <div className={`flex flex-col items-center ${containerGapClass}`}>
      {variant === "fullscreen" ? (
        <div
          className={`w-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center cursor-pointer select-none`}
          style={{ touchAction: "manipulation" }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div className="run-shift" data-run={isRunning ? "true" : "false"}>
            <div 
              className={`${sizeClass} ${digitsTopMarginClass} font-bold font-timer timer-digits transition-all duration-200 ${
                isReady ? "text-accent scale-110" : "text-foreground"
              } ${isRunning ? "animate-pulse" : ""} ${pulse ? "pulse-once" : ""}`}
              style={{ textShadow: isRunning ? "var(--timer-glow)" : "none" }}
              onAnimationEnd={() => setPulse(false)}
            >
              {formatTime(time)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 collapse-anim" data-collapsed={uiCollapsed ? "true" : "false"}>
            {isReady 
              ? t("Отпустите экран для старта") 
              : isRunning 
              ? t("Нажмите на таймер для остановки") 
              : t("Зажмите экран для начала")}
          </p>
        </div>
      ) : (
        <>
          <div 
            className={`${sizeClass} ${digitsTopMarginClass} font-bold font-timer timer-digits transition-all duration-200 ${
              isReady ? "text-accent scale-110" : "text-foreground"
            } ${isRunning ? "animate-pulse" : ""} ${pulse ? "pulse-once" : ""}`}
            style={{
              textShadow: isRunning ? "var(--timer-glow)" : "none",
              touchAction: "manipulation",
              userSelect: "none",
            }}
            onAnimationEnd={() => setPulse(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {formatTime(time)}
          </div>
          <p className="text-sm text-muted-foreground">
            {isReady 
              ? t("Отпустите экран для старта") 
              : isRunning 
              ? t("Нажмите на таймер для остановки") 
              : t("Зажмите экран для начала")}
          </p>
        </>
      )}

      <div className={`flex gap-3 ${buttonsMarginClass} ${buttonsBottomSpaceClass} ${variant === "fullscreen" ? "collapse-anim" : ""}`} data-collapsed={uiCollapsed ? "true" : "false"}>
        <Button
          variant="outline"
          size="default"
          onClick={handleReset}
          disabled={isRunning}
          className="interactive-button h-9 px-3 text-sm md:h-11 md:px-8 md:text-base"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          {t("Заново")}
        </Button>
        <Button
          size="default"
          onClick={handleSave}
          disabled={time === 0 || isRunning}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 interactive-button h-9 px-3 text-sm md:h-11 md:px-8 md:text-base"
        >
          <Save className="h-5 w-5 mr-2" />
          {t("Сохранить")}
        </Button>
      </div>
    </div>
  );
};

export default Timer;
