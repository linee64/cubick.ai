import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import Beginner from "./pages/Beginner";
import Friedrich from "./pages/Friedrich";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Instructions from "./pages/Instructions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const isApiFullscreen = !!document.fullscreenElement;
      const isDisplayFullscreen = window.matchMedia(
        "(display-mode: fullscreen)"
      ).matches;
      const isViewportFullscreen =
        window.innerWidth === window.screen.width &&
        Math.abs(window.innerHeight - window.screen.height) <= 1; // heuristic

      const isFullscreen =
        isApiFullscreen || isDisplayFullscreen || isViewportFullscreen;
      root.classList.toggle("no-scrollbar", isFullscreen);
    };

    update();
    const onChange = () => update();
    document.addEventListener("fullscreenchange", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/beginner" element={<Beginner />} />
            <Route path="/friedrich" element={<Friedrich />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/instructions" element={<Instructions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </I18nProvider>
  );
};

export default App;
