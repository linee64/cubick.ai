import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

type Theme = "blue" | "red" | "green";
type Mode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("blue");
  const [mode, setMode] = useState<Mode>("light");
  const { t } = useI18n();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedMode = localStorage.getItem("mode") as Mode;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedMode) setMode(savedMode);
    
    applyTheme(savedTheme || "blue", savedMode || "light");
  }, []);

  const applyTheme = (newTheme: Theme, newMode: Mode) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme);
    
    if (newMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("mode", newMode);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme, mode);
  };

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    applyTheme(theme, newMode);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMode}
        aria-label={t("Переключить темный режим")}
      >
        {mode === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={t("Изменить цвет темы")}>
            <Palette className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("Цвет темы")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleThemeChange("blue")}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              <span>{t("Синий")}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("red")}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span>{t("Красный")}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("green")}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600" />
              <span>{t("Зеленый")}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
