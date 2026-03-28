import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-extrabold">
          <span className="text-[#00CEC9]">QUIZ</span>
          <span className="text-orange-500">LEAGUE</span>
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-gray-500 rounded-lg hover:bg-gray-800"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-[#00CEC9] text-black rounded-lg font-bold"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* 🔥 HERO */}
      <div className="text-center mt-20 px-6">

        <p className="mb-4 text-sm border border-[#00CEC9] px-4 py-1 rounded-full text-[#00CEC9] inline-block">
          🏆 No Money • Pure Skill • Pure Knowledge
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          QUIZ YOUR <br />
          <span className="text-[#00CEC9]">WAY</span> TO THE <br />
          <span className="text-orange-500">TOP</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          Play quizzes, earn coins, build your fantasy team and compete
          — without spending real money.
        </p>

      </div>

      {/* 🔥 FEATURES SECTION */}
      <div className="grid md:grid-cols-4 gap-6 mt-20 px-10">

        {/* CARD 1 */}
        <div
          onClick={goToAuth}
          className="bg-[#0f172a] p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-[#00CEC9] font-bold text-lg">🎯 Play Quiz</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Answer questions and earn coins
          </p>
        </div>

        {/* CARD 2 */}
        <div
          onClick={goToAuth}
          className="bg-[#0f172a] p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-[#00CEC9] font-bold text-lg">💰 Earn Points</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Gain points with knowledge
          </p>
        </div>

        {/* CARD 3 */}
        <div
          onClick={goToAuth}
          className="bg-[#0f172a] p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-[#00CEC9] font-bold text-lg">👥 Build Team</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Create your fantasy team
          </p>
        </div>

        {/* CARD 4 */}
        <div
          onClick={goToAuth}
          className="bg-[#0f172a] p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-[#00CEC9] font-bold text-lg">🏆 Join Contest</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Compete and win rewards
          </p>
        </div>

      </div>

    </div>
  );
}

export default Landing;