import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider.tsx";
import { ThemeProvider } from "./contexts/Theme/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>
);
