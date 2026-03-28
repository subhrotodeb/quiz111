import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Team from "./pages/Team";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Contest from "./pages/Contest";
import MainLanding from "./pages/MainLanding";

function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 MAIN LANDING PAGE */}
        <Route path="/" element={<MainLanding />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/quiz" element={user ? <Quiz /> : <Login />} />
        <Route path="/team" element={user ? <Team /> : <Login />} />
        <Route path="/leaderboard" element={user ? <Leaderboard /> : <Login />} />
        <Route path="/contest" element={user ? <Contest /> : <Login />} />

        {/* OPTIONAL (can also protect) */}
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/wallet" element={user ? <Wallet /> : <Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;