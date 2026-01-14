import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpeedInsights />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);
