import Navbar from "../components/Navbar";

function Leaderboard() {
  const users = [
    { name: "You", score: 120 },
    { name: "User2", score: 100 },
    { name: "User3", score: 80 }
  ];

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Leaderboard 🏆
        </h1>

        {users.map((u, i) => (
  <div
    key={i}
    className={`flex justify-between p-4 mb-3 rounded-xl ${
      i === 0 ? "bg-yellow-500 text-black" : "bg-[#1E293B]"
    }`}
  >
            <span>{u.name}</span>
            <span className="text-[#00CEC9] font-bold">
              {u.score} pts
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Leaderboard;