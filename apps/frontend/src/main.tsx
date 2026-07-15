import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import App from "./App.tsx";
import "./index.css";

const API_BASE = import.meta.env.VITE_API_URL || "";
if (typeof window !== "undefined" && API_BASE) {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    if (typeof input === "string" && input.startsWith("/api")) {
      return nativeFetch(`${API_BASE}${input}`, init);
    }
    return nativeFetch(input, init);
  };
}

export const createRoot = ViteReactSSG({ routes }, () => {});
