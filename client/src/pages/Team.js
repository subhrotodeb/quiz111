import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Team() {
  const navigate = useNavigate();

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [team, setTeam] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);

  const matches = [
    { id: 1, teamA: "CSK", teamB: "MI" },
    { id: 2, teamA: "RCB", teamB: "KKR" }
  ];

  const players = {
    CSK: [
      "Dhoni", "Ruturaj", "Sanju", "Dube", "Urvil",
      "Ellis", "Kamboj", "Noor", "Henry", "Brevis", "Khaleel"
    ],
    MI: [
      "Rohit", "Surya", "Decock", "Hardik", "Tilak",
      "Tim David", "Bumrah", "Coetzee", "Green", "Arjun", "Shepherd"
    ],
    RCB: [
      "Kohli", "Faf", "Maxwell", "DK", "Patidar",
      "Duffy", "Jitesh", "Bethal", "Karn", "Bracewell", "Rawat"
    ],
    KKR: [
      "Russell", "Narine", "Shreyas", "Rinku", "Salt",
      "Starc", "Varun", "Nitish", "Suyash", "Roy", "Venkatesh"
    ]
  };

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

  const submitTeam = () => {
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

    alert("Team Created 🚀");
    navigate("/leaderboard");
  };

  return (
    <>
      <Navbar />

      <div className="p-6">

        {/* 🔥 MATCH SELECTION */}
        {!selectedMatch && (
          <>
            <h1 className="text-2xl mb-6">Select Match 🏏</h1>

            {matches.map(m => (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className="bg-[#1E293B] p-4 mb-4 rounded-xl cursor-pointer transform transition duration-200 hover:scale-[1.02] hover:shadow-md"
              >
                {m.teamA} vs {m.teamB}
              </div>
            ))}
          </>
        )}

        {/* 🔥 PLAYER SELECTION */}
        {selectedMatch && (
          <>
            <h1 className="text-2xl mb-4">
              {selectedMatch.teamA} vs {selectedMatch.teamB}
            </h1>

            <p className="mb-4">Selected: {team.length}/11</p>

            {/* TEAM A */}
            <h2 className="font-bold">{selectedMatch.teamA}</h2>
            {players[selectedMatch.teamA].map((p, i) => (
              <div
                key={i}
                onClick={() => togglePlayer(p)}
                className={`p-3 mt-2 rounded cursor-pointer ${team.includes(p)
                  ? "bg-green-500 text-black"
                  : "bg-[#0f172a]"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span>{p}</span>
                  {team.includes(p) && <span>✔</span>}
                </div>

                {team.includes(p) && (
                  <div className="flex gap-2 mt-2">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (viceCaptain === p) {
                          alert("Player already selected as Vice Captain");
                          return;
                        }

                        setCaptain(p);
                      }}
                      className={`px-2 rounded ${captain === p
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                        }`}
                    >
                      C
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (captain === p) {
                          alert("Player already selected as Captain");
                          return;
                        }

                        setViceCaptain(p);
                      }}
                      className={`px-2 rounded ${viceCaptain === p
                        ? "bg-orange-500"
                        : "bg-gray-400"
                        }`}
                    >
                      VC
                    </button>

                  </div>
                )}
              </div>
            ))}

            {/* TEAM B */}
            <h2 className="mt-6 font-bold">{selectedMatch.teamB}</h2>
            {players[selectedMatch.teamB].map((p, i) => (
              <div
                key={i}
                onClick={() => togglePlayer(p)}
                className={`p-3 mt-2 rounded cursor-pointer ${team.includes(p)
                  ? "bg-green-500 text-black"
                  : "bg-[#0f172a]"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span>{p}</span>
                  {team.includes(p) && <span>✔</span>}
                </div>

                {team.includes(p) && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setCaptain(p);

                        // ❌ remove VC if same player
                        if (viceCaptain === p) setViceCaptain(null);
                      }}
                      className={`px-2 rounded ${captain === p ? "bg-yellow-500" : "bg-gray-400"
                        }`}
                    >
                      C
                    </button>



                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setViceCaptain(p);

                        // ❌ remove Captain if same player
                        if (captain === p) setCaptain(null);
                      }}
                      className={`px-2 rounded ${viceCaptain === p ? "bg-orange-500" : "bg-gray-400"
                        }`}
                    >
                      VC
                    </button>

                  </div>
                )}
              </div>
            ))}

            {/* SUBMIT */}
            <button
              onClick={submitTeam}
              className="mt-6 bg-green-500 px-6 py-2 rounded hover:scale-105 transition"
            >
              Submit Team 🚀
            </button>
          </>
        )}

      </div>
    </>
  );
}

export default Team;