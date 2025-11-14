import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus, BookOpen, LogOut, Bot, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import Logo from "./Logo";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/integrations/client";
import { useI18n } from "@/lib/i18n";

const Header = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useI18n();
  const [brandAnimating, setBrandAnimating] = useState(false);
  const [brandEntering, setBrandEntering] = useState(false);

  const handleBrandActivate = (e?: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    // флаг входной анимации после перехода
    sessionStorage.setItem("brand-entry", "1");
    setBrandAnimating(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  useEffect(() => {
    const shouldEnter = sessionStorage.getItem("brand-entry") === "1";
    if (shouldEnter && location.pathname === "/") {
      setBrandEntering(true);
      sessionStorage.removeItem("brand-entry");
      const timer = setTimeout(() => setBrandEntering(false), 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      toast({ title: t("Вы вышли из аккаунта") });
      navigate("/login");
    } catch (err) {
      toast({
        title: t("Ошибка выхода"),
        description: err instanceof Error ? err.message : t("Попробуйте ещё раз"),
        variant: "destructive",
      });
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ios-safe-top">
      <div className="container mx-auto px-2 md:px-4 h-12 md:h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            to="/"
            onClick={handleBrandActivate}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleBrandActivate(e);
              }
            }}
            className={`flex items-center gap-2 transition-opacity transition-transform duration-300 ${brandAnimating ? "scale-95 opacity-70" : "hover:opacity-80"} ${brandEntering ? "brand-enter" : ""}`}
          >
            <Logo />
            <span className="text-base md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate max-w-[160px] sm:max-w-[220px] md:max-w-none">Cubick AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t("Инструкции")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom">
                <DropdownMenuItem onClick={() => navigate("/instructions")}>{t("Справочник")}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/friedrich#f2l")}>F2L</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/friedrich#oll")}>OLL</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/friedrich#pll")}>PLL</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/ai">
                <Bot className="h-4 w-4 mr-2" />
                {t("ИИ‑тренер")}
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {!loading && !user && (
            <>
              {/* Mobile: вход как иконка */}
              <Button variant="ghost" size="icon" asChild className="inline-flex md:hidden">
                <Link to="/login">
                  <LogIn className="h-5 w-5" />
                </Link>
              </Button>
              {/* Desktop: вход/регистрация как текстовые кнопки */}
              <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t("Войти")}
                </Link>
              </Button>
              <Button size="sm" className="hidden md:inline-flex bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
                <Link to="/register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t("Регистрация")}
                </Link>
              </Button>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("Меню")}>
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>{t("Навигация")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4" />{t("Инструкции")}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => navigate("/instructions")}>{t("Справочник")}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/friedrich#f2l")}>F2L</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/friedrich#oll")}>OLL</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/friedrich#pll")}>PLL</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem onClick={() => navigate("/ai")}>{t("ИИ‑тренер")}</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("Аккаунт")}</DropdownMenuLabel>
              {!loading && user ? (
                <>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>{t("Профиль")}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>{t("Выйти")}</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/login")}>{t("Войти")}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/register")}>{t("Регистрация")}</DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("Настройки")}</DropdownMenuLabel>
              <div className="px-2 py-1.5 flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">{t("Язык")}</span>
                <LanguageToggle />
              </div>
              <div className="px-2 py-1.5 flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">{t("Тема")}</span>
                <ThemeToggle />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
