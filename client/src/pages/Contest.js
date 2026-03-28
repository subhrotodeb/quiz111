import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Contest() {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const contests = [
    { id: 1, name: "Mega Contest", entry: 10, prize: 100 },
    { id: 2, name: "Head to Head", entry: 5, prize: 50 }
  ];

  const joinContest = (contestId, entry) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      alert("Please login first");
      return;
    }

    setLoadingId(contestId);

    axios.post(
      "http://localhost:3001/joinContest",
      { entryFee: entry },
      {
        headers: {
          Authorization: token
        }
      }
    )
      .then(res => {
        console.log("RESPONSE:", res.data);

        if (res.data.success) {
          alert("Joined contest successfully 🚀");

          const user = JSON.parse(localStorage.getItem("user"));

          const updatedUser = {
            ...user,
            points: res.data.points
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));

          navigate("/team");
        } else {
          alert(res.data.message || "Failed to join contest");
        }
      })
      .catch(err => {
        console.log("ERROR:", err);
        alert("Something went wrong ❌");
      })
      .finally(() => {
        setLoadingId(null);
      });
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
              onClick={() => {
                console.log("CLICKED:", c.id);   // 🔥 DEBUG
                joinContest(c.id, c.entry);
              }}
              className="mt-3 bg-[#00CEC9] px-4 py-2 rounded text-black hover:scale-105"
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