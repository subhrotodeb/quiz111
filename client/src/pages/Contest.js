import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Contest() {
  const navigate = useNavigate();

  const contests = [
    { id: 1, name: "Mega Contest", entry: 10, prize: 100 },
    { id: 2, name: "Head to Head", entry: 5, prize: 50 }
  ];

  const joinContest = (entry) => {
    const points = Number(localStorage.getItem("points")) || 0;

    if (points < entry) {
      alert("Not enough points! Earn from Quiz 🎯");
      return;
    }

    localStorage.setItem("points", points - entry);

    alert("Joined contest successfully 🚀");
    navigate("/team");
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Available Contests 🏆</h1>

        {contests.map(c => (
          <div
            key={c.id}
            className="bg-[#1E293B] p-4 mb-4 rounded-xl transform transition duration-200 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl">{c.name}</h2>
            <p>Entry: {c.entry} pts</p>
            <p>Prize: {c.prize} pts</p>

            <button
              onClick={() => joinContest(c.entry)}
              className="mt-3 bg-[#00CEC9] px-4 py-2 rounded text-black transform transition duration-200 hover:scale-105 hover:bg-[#00b5b1] hover:shadow-md"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Contest;