import { Mail, Instagram, Send } from "lucide-react";
import React from "react";

// Брендовая монохромная SVG-иконка TikTok (версия из public/icons/tiktok1.svg)
const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 50 50" fill="currentColor" aria-hidden="true" {...props}>
    <g transform="translate(0,50) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M56 444 c-24 -23 -24 -365 0 -388 23 -24 365 -24 388 0 24 23 24 365
0 388 -23 24 -365 24 -388 0z m379 -194 l0 -185 -185 0 -185 0 -3 175 c-1 96
0 180 3 187 3 11 44 13 187 11 l183 -3 0 -185z" />
      <path d="M250 291 c0 -87 -3 -111 -16 -122 -11 -9 -20 -10 -32 -2 -24 15 -21
46 6 58 15 7 22 18 22 39 0 27 -2 28 -32 22 -18 -3 -43 -17 -55 -32 -76 -85
47 -205 133 -130 24 20 28 32 32 89 l4 65 34 -5 c32 -5 34 -4 34 23 0 22 -8
33 -31 47 -17 9 -33 26 -36 37 -4 14 -14 20 -34 20 l-29 0 0 -109z m58 59 c13
-16 29 -30 37 -30 8 0 15 -7 15 -15 0 -8 -6 -15 -14 -15 -7 0 -19 7 -26 15
-23 28 -30 15 -30 -60 0 -67 -3 -79 -25 -100 -13 -14 -36 -25 -50 -25 -33 0
-75 42 -75 75 0 26 39 75 60 75 17 0 11 -19 -9 -30 -25 -13 -35 -44 -22 -69
16 -28 48 -35 76 -17 24 16 25 21 25 121 0 58 4 105 8 105 5 0 18 -13 30 -30z" />
    </g>
  </svg>
);

// Брендовая монохромная SVG-иконка Threads (версия из public/icons/threads1.svg)
const ThreadsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 50 50" fill="currentColor" aria-hidden="true" {...props}>
    <g transform="translate(0,50) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M56 444 c-24 -23 -24 -365 0 -388 23 -24 365 -24 388 0 24 23 24 365
0 388 -23 24 -365 24 -388 0z m379 -194 l0 -185 -185 0 -185 0 -3 175 c-1 96
0 180 3 187 3 11 44 13 187 11 l183 -3 0 -185z" />
      <path d="M194 376 c-86 -38 -84 -216 2 -252 19 -8 46 -14 61 -14 38 0 91 34
98 63 7 26 -9 77 -25 77 -5 0 -16 16 -25 36 -13 32 -17 35 -51 32 -50 -4 -57
-26 -8 -24 21 1 39 -4 41 -11 3 -9 -6 -13 -25 -13 -47 0 -79 -49 -50 -78 28
-28 86 -7 100 38 4 11 9 8 18 -12 39 -82 -112 -124 -160 -45 -38 62 -18 167
36 187 51 20 85 12 121 -26 38 -41 57 -38 26 4 -38 51 -96 65 -159 38z m96
-135 c0 -25 -14 -41 -36 -41 -28 0 -44 28 -23 41 18 12 59 11 59 0z" />
    </g>
  </svg>
);
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card mt-auto ios-safe-bottom">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* О проекте */}
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cubick AI
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("Cubick AI — ваш умный помощник в мире спидкубинга. Учитесь, тренируйтесь и улучшайте результаты с помощью искусственного интеллекта.")}
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-semibold mb-4">{t("Контакты")}</h3>
            <div className="space-y-2">
              <a href="mailto:cubick.ai00@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                cubick.ai00@gmail.com
              </a>
            </div>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="font-semibold mb-4">{t("Мы в соцсетях")}</h3>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/cubick.ai/?igsh=MTVmdnY2ZzliazFmOQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@cubick.ai" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <TikTokIcon className="h-[25px] w-[25px]" />
              </a>
              <a href="#" aria-label="Telegram" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <Send className="h-5 w-5" />
              </a>
              <a href="https://www.threads.com/@cubick.ai" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <ThreadsIcon className="h-[25px] w-[25px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground pl-2 md:pl-3">
          © 2024 Cubick AI. {t("Все права защищены.")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
