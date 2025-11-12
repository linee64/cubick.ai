import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus, BookOpen, LogOut } from "lucide-react";
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
            <Button variant="ghost" size="sm" asChild>
              <Link to="/instructions">
                <BookOpen className="h-4 w-4 mr-2" />
                {t("Инструкции")}
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <ThemeToggle />
          {!loading && user && (
            <>
              {/* Mobile: профиль как иконка */}
              <Button variant="ghost" size="icon" asChild className="inline-flex md:hidden">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              {/* Desktop: профиль/выход как текстовые кнопки */}
              <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  {t("Профиль")}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:inline-flex">
                <LogOut className="h-4 w-4 mr-2" />
                {t("Выйти")}
              </Button>
            </>
          )}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
