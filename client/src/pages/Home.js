import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Matches ⚡</h1>
        
        <div className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] p-6 rounded-2xl mb-6 shadow-lg">
          <h2 className="text-2xl font-bold">IPL 2026 🔥</h2>
          <p className="text-sm">CSK vs MI • Ongoing</p>
        </div>

        <div className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] p-6 rounded-2xl mb-6 shadow-lg">
          <h2 className="text-2xl font-bold">ISL 2026 🔥</h2>
          <p className="text-sm">FC GOA vs KB • Starts Soon</p>
        </div>

        <div className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] p-6 rounded-2xl mb-6 shadow-lg">
          <h2 className="text-2xl font-bold">Hockey 2026 🔥</h2>
          <p className="text-sm">IND vs ENG • Starts Soon</p>
        </div>
        
        <div className="flex justify-between mt-4 text-center">
          <div>
            <p className="text-lg font-semibold">CSK</p>
            <p className="text-gray-400">Chennai</p>
          </div>

          <div className="flex items-center text-xl font-bold text-[#00CEC9]">
            VS
          </div>

          <div>
            <p className="text-lg font-semibold">MI</p>
            <p className="text-gray-400">Mumbai</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">

          {/* Contest */}
          <button
            onClick={() => navigate("/contest")}
            className="bg-[#6C5CE7] px-6 py-3 rounded-lg"
          >
            Join Contest 🏆
          </button>

          {/* Quiz */}
          <button
            onClick={() => navigate("/quiz")}
            className="bg-[#00CEC9] px-6 py-3 rounded-lg text-black"
          >
            Play Quiz 🎯
          </button>

        </div>
      </div>

    </>
  );
}

export default Home;