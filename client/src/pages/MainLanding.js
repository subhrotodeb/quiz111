import { useNavigate } from "react-router-dom";
import { FaGamepad, FaChartLine, FaUsers, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

function MainLanding() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#00CEC9]">Quiz</span>
          <span className="text-orange-500">League</span>
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-gray-500 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-[#00CEC9] text-black rounded-lg font-bold hover:scale-105 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-6"
      >

        {/* LOGO */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: [0, -10, 0] }}
          transition={{
            scale: { duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-[#00CEC9] rounded-full flex items-center justify-center text-3xl font-bold text-black">
            QL
          </div>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#00CEC9] via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          QuizLeague 🚀
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg mb-6 max-w-xl"
        >
          A skill-based fantasy sports platform where knowledge becomes currency.
          Play quizzes, earn points, build your dream team and compete without spending money.
        </motion.p>

        {/* 🔥 PREMIUM GLASS CARDS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.01
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 w-full max-w-6xl"
        >

          {/* Play Quiz */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.08, rotate: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleProtectedRoute("/quiz")}
            className="group cursor-pointer bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 
            hover:border-[#00CEC9] hover:shadow-[0_0_30px_rgba(0,206,201,0.6)] 
            transition duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00CEC9] to-blue-500 opacity-0 group-hover:opacity-20 transition"></div>

            <FaGamepad className="text-3xl mb-3 text-[#00CEC9]" />
            <h2 className="text-xl font-bold mb-2">Play Quiz</h2>
            <p className="text-gray-400 text-sm">
              Attempt quizzes and test your knowledge.
            </p>
          </motion.div>

          {/* Dashboard */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.08, rotate: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleProtectedRoute("/home")}
            className="group cursor-pointer bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 
            hover:border-[#00CEC9] hover:shadow-[0_0_30px_rgba(0,206,201,0.6)] 
            transition duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00CEC9] to-blue-500 opacity-0 group-hover:opacity-20 transition"></div>

            <FaChartLine className="text-3xl mb-3 text-[#00CEC9]" />
            <h2 className="text-xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-400 text-sm">
              Track your performance and coins.
            </p>
          </motion.div>

          {/* Build Team */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.08, rotate: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleProtectedRoute("/team")}
            className="group cursor-pointer bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 
            hover:border-[#00CEC9] hover:shadow-[0_0_30px_rgba(0,206,201,0.6)] 
            transition duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00CEC9] to-blue-500 opacity-0 group-hover:opacity-20 transition"></div>

            <FaUsers className="text-3xl mb-3 text-[#00CEC9]" />
            <h2 className="text-xl font-bold mb-2">Build Team</h2>
            <p className="text-gray-400 text-sm">
              Create your fantasy team smartly.
            </p>
          </motion.div>

          {/* Join Contest */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.08, rotate: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleProtectedRoute("/contest")}
            className="group cursor-pointer bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 
            hover:border-[#00CEC9] hover:shadow-[0_0_30px_rgba(0,206,201,0.6)] 
            transition duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00CEC9] to-blue-500 opacity-0 group-hover:opacity-20 transition"></div>

            <FaTrophy className="text-3xl mb-3 text-[#00CEC9]" />
            <h2 className="text-xl font-bold mb-2">Join Contest</h2>
            <p className="text-gray-400 text-sm">
              Compete and climb leaderboard.
            </p>
          </motion.div>

        </motion.div>

      </motion.div>

      {/* 🔥 FOOTER */}
      <div className="text-center py-4 border-t border-gray-800 text-gray-400 text-sm">
        © 2026 BitWise Brains 🚀 | All Rights Reserved
      </div>

    </div>
  );
}

// 🔥 Smooth Card Animation
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default MainLanding;
