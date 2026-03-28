import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Wallet() {
  const [points, setPoints] = useState(
    Number(localStorage.getItem("points")) || 0
  );

  const navigate = useNavigate();

  const earnPoints = () => {
  navigate("/quiz");
};

  return (
    <>
      <Navbar />

      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Wallet 💰</h1>

        {/* Points Display */}
        <div className="bg-[#1E293B] p-6 rounded-xl mb-6">
          <h2 className="text-xl">Your Points</h2>
          <p className="text-3xl font-bold text-[#00CEC9]">
            {points}
          </p>
        </div>

        {/* Earn Points */}
        <button
          onClick={earnPoints}
          className="bg-[#6C5CE7] px-6 py-3 rounded-lg"
        >
          Earn More Points 🎯
        </button>

        {/* Info */}
        <p className="mt-4 text-gray-400">
          Earn points to join more contests
        </p>
      </div>
    </>
  );
}

export default Wallet;