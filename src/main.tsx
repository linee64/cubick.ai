import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Early apply persisted theme before React mounts to avoid reset/flicker
(() => {
  try {
    const root = document.documentElement;
    const savedTheme = (localStorage.getItem("theme") || "blue") as string;
    const savedMode = (localStorage.getItem("mode") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as string;

    const theme = ["blue", "red", "green"].includes(savedTheme) ? savedTheme : "blue";
    const mode = savedMode === "dark" ? "dark" : "light";

    root.setAttribute("data-theme", theme);
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  } catch {
    // no-op
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
