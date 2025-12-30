<<<<<<< HEAD
import { BrowserRouter, Route, Routes} from "react-router-dom";
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
>>>>>>> b3bb3c276b1b8fffee613d5b693dc54c5f98a013
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Games from "./pages/Games/Games"
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
// Use NavLink for the links below later

export default App;
