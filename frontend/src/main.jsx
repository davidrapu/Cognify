import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ABFDFA", // text-color
      contrastText: "#2A4757",
    },
    secondary: {
      main: "#708993", // lower-text-color
    },

    background: {
      default: "#000000", // bg
      paper: "rgba(42, 71, 87, 0.3)",
    },

    text: {
      primary: "#ABFDFA",
      secondary: "#9BEFF4",
      size: {
        sm: "16px",
        md: "17px",
        lg: "18px",
      },
    },

    mint: {
      100: "#D1E3DF",
      200: "#C5DBD7",
      300: "#BDD5D1",
      400: "#A1C2BD",
    },

    // MUI defaults that you can keep:
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
    info: {
      main: "#0288d1",
    },
    success: {
      main: "#2e7d32",
    },
  },

  typography: {
    fontFamily: `"Roboto Condensed", sans-serif`,
    h1: {
      fontFamily: `"Bungee", sans-serif`,
    },
    h2: {
      fontFamily: `"Bungee", sans-serif`,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
