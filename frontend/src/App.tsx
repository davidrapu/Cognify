import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home/Home";
import { ModeToggle } from "./components/ModeToggle";
import PageLoader from "./components/PageLoader";
import CookieBanner from "./components/CookieBanner";

// Lazy load all routes
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Games = lazy(() => import("./pages/Games/Games"));
const GamesHome = lazy(() => import("./pages/Games/GamesHomepage/GamesHome"));
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
// const ReactionTimeTest = lazy(
//   () => import("./pages/Games/GamePrograms/ReactionTimeTest/ReactionTimeTest"),
// );
const GoNoGo = lazy(() => import("./pages/Games/GamePrograms/GoNoGo/GoNoGo"));
const ChoiceReaction = lazy(
  () => import("./pages/Games/GamePrograms/ChoiceReaction/ChoiceReaction"),
);
const PatternPuzzle = lazy(
  () => import("./pages/Games/GamePrograms/PatternPuzzle/PatternPuzzle"),
);
const ArithmeticPuzzle = lazy(
  () => import("./pages/Games/GamePrograms/ArithmeticPuzzle/ArithmeticPuzzle"),
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Quiz = lazy(() => import("./pages/Quiz/Quiz"));

// Loading fallback component

const success = async (pos: GeolocationPosition) => {
  console.log("Geolocation permission granted. Position:", pos);
  const { latitude, longitude } = pos.coords;
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    {
      headers: {
        "User-Agent": "Cognify", // required by OSM
      },
    },
  );

  const data = await resp.json();

  const city =
    data.address.city || data.address.town || data.address.village || null;

  const country = data.address.country || null;
};

const error = (err: GeolocationPositionError) => {
  console.error("Geolocation permission denied or error occurred:", err);
  if (err.code === err.PERMISSION_DENIED) {
    console.log("User denied the request for Geolocation.");
    alert(
      "Geolocation permission is required for certain features of this app. Please allow access to use them.",
    );
  }
  else{
    console.error("An error occurred while fetching geolocation data.");
    alert("An error occurred while fetching geolocation data.");
  }
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <CookieBanner />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/games" element={<Games />}>
              <Route index element={<GamesHome />} />
              <Route path="card-match" element={<CardMatchGame />} />
              <Route path="digital-span" element={<DigitalSpan />} />
              <Route path="sequence-recall" element={<SequenceRecall />} />
              <Route path="visual-search" element={<VisualSearch />} />
              <Route path="stroop-test" element={<StroopTest />} />
              {/* <Route path="reaction-time-test" element={<ReactionTimeTest />} /> */}
              <Route path="go-no-go" element={<GoNoGo />} />
              <Route path="choice-reaction-time" element={<ChoiceReaction />} />
              <Route path="pattern-puzzle" element={<PatternPuzzle />} />
              <Route path="arithmetic-puzzle" element={<ArithmeticPuzzle />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
      <ModeToggle />
    </>
  );
}

export default App;
