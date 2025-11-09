import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

type LogoProps = {
  size?: number; // size in pixels
  className?: string;
};

// Simple logo square with theme-driven gradient via CSS variables
export default function Logo({ size = 32, className = "" }: LogoProps) {
  const { t } = useI18n();
  const [theme, setTheme] = useState<string>(() =>
    document.documentElement.getAttribute("data-theme") || "blue"
  );
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const current = root.getAttribute("data-theme") || "blue";
      setTheme(current);
      // При смене темы пробуем снова показать картинку
      setImgError(false);
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const src = useMemo(() => {
    switch (theme) {
      case "red":
        // Исправление: при красной теме должно показываться красное лого
        return "/logo-green.png";
      case "green":
        // Исправление: при зелёной теме должно показываться зелёное лого
        return "/logo-red.png";
      case "blue":
        return "/logo-blue.png";
      default:
        // Страховка на случай неожиданных значений
        return "/logo-blue.png";
    }
  }, [theme]);

  const style: React.CSSProperties = { width: size, height: size };

  if (imgError) {
    return (
      <div
        aria-label={t("Логотип Cubick AI")}
        role="img"
        style={style}
        className={`rounded-lg bg-gradient-to-br from-[var(--logo-from)] to-[var(--logo-to)] transition-colors ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={t("Логотип Cubick AI")}
      width={size}
      height={size}
      style={style}
      className={`rounded-lg object-contain select-none ${className}`}
      onError={() => setImgError(true)}
      loading="eager"
      draggable={false}
    />
  );
}