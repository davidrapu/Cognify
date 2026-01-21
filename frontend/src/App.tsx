import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Games from "./pages/Games/Games";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Quiz from "./pages/Quiz/Quiz";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/games" element={<Games />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
