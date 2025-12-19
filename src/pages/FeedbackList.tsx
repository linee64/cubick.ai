import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

type Review = {
  id: string;
  created_at: string;
  text: string;
  user_name?: string;
};

export default function FeedbackList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data || []);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Отзывы пользователей</h1>
        
        {loading ? (
          <div>Загрузка...</div>
        ) : reviews.length === 0 ? (
          <div>Нет отзывов</div>
        ) : (
          <div className="grid gap-4 max-w-3xl mx-auto">
            {reviews.map((r) => (
              <Card key={r.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{r.user_name || "Аноним"}</span>
                        <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap"><b>Отзыв:</b> {r.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
