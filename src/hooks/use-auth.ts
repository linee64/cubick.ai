import { useEffect, useState } from "react";
import { getSupabase } from "@/integrations/client";

export function useAuth() {
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let sub: { subscription: { unsubscribe: () => void } } | null = null;

    const init = async () => {
      try {
        const supabase = getSupabase();
        
        // 1. Сначала пробуем получить сессию из локального хранилища (быстро)
        const { data: sessionData } = await supabase.auth.getSession();
        if (mounted && sessionData.session?.user) {
          setUser(sessionData.session.user);
        }

        // 2. Затем валидируем пользователя через сервер (безопасно)
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          // Если ошибка сети/валидации, но была локальная сессия - пока оставляем локальную,
          // если это не явная ошибка авторизации. Но getUser обычно надежнее.
          // Если getUser вернул ошибку, data.user будет null.
          console.warn("Supabase getUser error:", error);
        }
        
        if (mounted) {
          // Приоритет отдаем результату getUser, если он успешен, иначе оставляем sessionData (если getUser упал по сети)
          // Но если getUser явно сказал "нет юзера" (data.user === null), то верим ему.
          if (!error && data.user) {
            setUser(data.user);
          } else if (error && sessionData.session?.user) {
            // Фолбэк: если getUser упал (например, оффлайн), но есть сессия - оставляем
            setUser(sessionData.session.user);
          } else if (!data.user) {
            setUser(null);
          }
        }

        const { data: _sub } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
        sub = _sub;
      } catch (err) {
        console.warn("Supabase недоступен или не сконфигурирован:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
      if (sub) sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}