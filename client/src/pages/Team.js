import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Team() {
  const navigate = useNavigate();

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [team, setTeam] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [loading, setLoading] = useState(false);

  const matches = [
    { id: 1, teamA: "CSK", teamB: "MI" },
    { id: 2, teamA: "RCB", teamB: "KKR" }
  ];

  const players = {
    CSK: ["Dhoni","Ruturaj","Sanju","Dube","Urvil","Ellis","Kamboj","Noor","Henry","Brevis","Khaleel"],
    MI: ["Rohit","Surya","Decock","Hardik","Tilak","Tim David","Bumrah","Coetzee","Green","Arjun","Shepherd"],
    RCB: ["Kohli","Faf","Maxwell","DK","Patidar","Duffy","Jitesh","Bethal","Karn","Bracewell","Rawat"],
    KKR: ["Russell","Narine","Shreyas","Rinku","Salt","Starc","Varun","Nitish","Suyash","Roy","Venkatesh"]
  };

  // ======================
  // 🔥 SELECT PLAYER
  // ======================
  const togglePlayer = (player) => {
    if (team.includes(player)) {
      setTeam(team.filter(p => p !== player));

      if (captain === player) setCaptain(null);
      if (viceCaptain === player) setViceCaptain(null);

    } else {
      if (team.length < 11) {
        setTeam([...team, player]);
      } else {
        alert("Only 11 players allowed");
      }
    }
  };

  // ======================
  // 🔥 SUBMIT TEAM (BACKEND CONNECTED)
  // ======================
  const submitTeam = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      navigate("/login");
      return;
    }

    if (team.length !== 11) {
      alert("Select 11 players");
      return;
    }

    if (!captain || !viceCaptain) {
      alert("Select Captain & Vice Captain");
      return;
    }

    if (captain === viceCaptain) {
      alert("C and VC must be different");
      return;
    }

    setLoading(true);

    axios.post(
      "https://quiz-backend-5ik4.onrender.com/saveTeam",
      {
        team,
        captain,
        viceCaptain,
        match: selectedMatch
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
      if (res.data.success) {
        alert("Team Created 🚀");
        navigate("/leaderboard");
      } else {
        alert("Failed to save team");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Error saving team");
    })
    .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />

      <div className="p-6">

        {/* MATCH SELECTION */}
        {!selectedMatch && (
          <>
            <h1 className="text-2xl mb-6">Select Match 🏏</h1>

            {matches.map(m => (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className="bg-[#1E293B] p-4 mb-4 rounded-xl cursor-pointer hover:scale-[1.02]"
              >
                {m.teamA} vs {m.teamB}
              </div>
            ))}
          </>
        )}

        {/* PLAYER SELECTION */}
        {selectedMatch && (
          <>
            <h1 className="text-2xl mb-4">
              {selectedMatch.teamA} vs {selectedMatch.teamB}
            </h1>

            <p className="mb-4">Selected: {team.length}/11</p>

            {[selectedMatch.teamA, selectedMatch.teamB].map((teamName, idx) => (
              <div key={idx}>
                <h2 className="mt-4 font-bold">{teamName}</h2>

                {players[teamName].map((p, i) => (
                  <div
                    key={i}
                    onClick={() => togglePlayer(p)}
                    className={`p-3 mt-2 rounded cursor-pointer ${
                      team.includes(p)
                        ? "bg-green-500 text-black"
                        : "bg-[#0f172a]"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{p}</span>
                      {team.includes(p) && "✔"}
                    </div>

                    {team.includes(p) && (
                      <div className="flex gap-2 mt-2">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            if (viceCaptain === p) {
                              alert("Already VC");
                              return;
                            }
                            setCaptain(p);
                          }}
                          className={`px-2 ${
                            captain === p ? "bg-yellow-500" : "bg-gray-400"
                          }`}
                        >
                          C
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            if (captain === p) {
                              alert("Already Captain");
                              return;
                            }
                            setViceCaptain(p);
                          }}
                          className={`px-2 ${
                            viceCaptain === p ? "bg-orange-500" : "bg-gray-400"
                          }`}
                        >
                          VC
                        </button>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* SUBMIT */}
            <button
              onClick={submitTeam}
              disabled={loading}
              className="mt-6 bg-green-500 px-6 py-2 rounded hover:scale-105"
            >
              {loading ? "Submitting..." : "Submit Team 🚀"}
            </button>
          </>
        )}

      </div>
    </>
  );
}

export default Team;