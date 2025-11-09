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
        const { data } = await supabase.auth.getUser();
        if (mounted) setUser(data.user ?? null);
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