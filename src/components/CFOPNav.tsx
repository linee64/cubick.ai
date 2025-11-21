import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const items = [
  { key: "cross", label: "Cross", to: "/friedrich#cross" },
  { key: "f2l", label: "F2L", to: "/f2l" },
  { key: "oll", label: "OLL", to: "/oll" },
  { key: "pll", label: "PLL", to: "/pll" },
];

export default function CFOPNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const hash = location.hash.replace("#", "");

  const activeKey = (() => {
    if (pathname === "/f2l") return "f2l";
    if (pathname === "/oll") return "oll";
    if (pathname === "/pll") return "pll";
    if (pathname === "/friedrich" && hash === "cross") return "cross";
    return undefined;
  })();

  return (
    <div className="-mx-4 mb-4 px-4">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-3 md:gap-5 py-2 md:py-3">
          {items.map((it) => (
            <Button
              key={it.key}
              asChild
              variant="outline"
              className={`${
                activeKey === it.key
                  ? "bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-md border-0"
                  : "glass text-foreground"
              } interactive-button hover-theme hover-glow h-9 md:h-11 px-3 md:px-8 text-sm md:text-base min-w-[140px] md:min-w-[180px] rounded-full`}
            >
              <Link to={it.to}>{it.label}</Link>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}