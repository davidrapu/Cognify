import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home/Home";

// Lazy load all routes
const Login = lazy(() => import("./pages/Login/Login"));
const Games = lazy(() => import("./pages/Games/Games"));
const GamesHome = lazy(() => import("./pages/Games/GamesHome"));
const CardMatchGame = lazy(
  () => import("./pages/Games/GamePrograms/CardMatch/CardMatchGame"),
);
const DigitalSpan = lazy(
  () => import("./pages/Games/GamePrograms/DigitalSpan/DigitalSpan"),
);
const SequenceRecall = lazy(
  () => import("./pages/Games/GamePrograms/SequenceRecall/SequenceRecall"),
);
const VisualSearch = lazy(
  () => import("./pages/Games/GamePrograms/VisualSearch/VisualSearch"),
);
const StroopTest = lazy(
  () => import("./pages/Games/GamePrograms/StroopTest/StroopTest"),
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Quiz = lazy(() => import("./pages/Quiz/Quiz"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/games" element={<Games />}>
              <Route index element={<GamesHome />} />
              <Route path="card-match" element={<CardMatchGame />} />
              <Route path="digital-span" element={<DigitalSpan />} />
              <Route path="sequence-recall" element={<SequenceRecall />} />
              <Route path="visual-search" element={<VisualSearch />} />
              <Route path="stroop-test" element={<StroopTest />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
