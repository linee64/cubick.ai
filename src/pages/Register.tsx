import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSupabase } from "@/integrations/client";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useI18n();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || password !== confirm || loading) {
      toast({
        title: t("Проверьте данные"),
        description: password !== confirm ? t("Пароли не совпадают") : t("Заполните все поля"),
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw error;
      // Если включено подтверждение email — сообщить пользователю
      if (!data.session) {
        toast({ title: t("Проверьте почту"), description: t("Мы отправили ссылку для подтверждения") });
      } else {
        toast({ title: t("Регистрация успешна"), description: t("Добро пожаловать!") });
        navigate("/profile");
      }
    } catch (err) {
      toast({
        title: t("Ошибка регистрации"),
        description: err instanceof Error ? err.message : t("Попробуйте ещё раз"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <PageTransition>
      <Card className="auth-card w-full max-w-[108rem] md:max-w-[120rem] p-12">
        <div className="max-w-[75rem] mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t("Регистрация")}</h1>
            <p className="text-muted-foreground text-center mb-6">
              {t("Создайте аккаунт Cubick AI")}
            </p>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="name">{t("Имя")}</Label>
            <Input id="name" type="text" placeholder={t("Ваше имя")} value={name} onChange={(e) => setName(e.target.value)} className="w-full text-base md:text-lg placeholder:text-slate-400" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-base md:text-lg placeholder:text-slate-400" />
              </div>

              <div>
                <Label htmlFor="password">{t("Пароль")}</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-base md:text-lg placeholder:text-slate-400" />
              </div>

              <div>
                <Label htmlFor="confirm-password">{t("Подтвердите пароль")}</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full text-base md:text-lg placeholder:text-slate-400" />
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg" type="submit" disabled={loading}>
                {loading ? t("Создание...") : t("Создать аккаунт")}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t("Уже есть аккаунт? ")}</span>
              <Link to="/login" className="text-primary hover:underline font-semibold">
                {t("Войти")}
              </Link>
            </div>
          </div>
        </Card>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
