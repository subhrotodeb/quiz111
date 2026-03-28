import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get("https://quiz-backend-5ik4.onrender.com/quiz")
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAnswer = (option) => {
    const correctAnswer = questions[current].answer;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login again");
      return;
    }

    if (option === correctAnswer) {
      setFeedback("correct");
      setScore(prev => prev + 10);

      // 🔥 UPDATE POINTS WITH JWT
      axios.post(
        "https://quiz-backend-5ik4.onrender.com/updatePoints",
        { points: 10 },
        {
          headers: {
            Authorization: token
          }
        }
      )
        .then(res => {
          console.log("Points updated:", res.data);

          // 🔥 UPDATE LOCAL USER
          const updatedUser = {
            ...user,
            points: res.data.points
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
        })
        .catch(err => console.log(err));

    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback("");
      setCurrent(prev => prev + 1);
    }, 1000);
  };

  // ✅ END SCREEN
  if (current >= questions.length) {
    const finalUser = JSON.parse(localStorage.getItem("user"));

    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-2xl">
          🎉 Quiz Completed!

          <p className="mt-4 text-green-400">
            Your Score: {score}
          </p>

          <p className="mt-2 text-blue-400">
            Total Points: {finalUser?.points || 0}
          </p>
        </div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-xl">
          Loading Quiz... ⏳
        </div>
      </>
    );
  }

  const q = questions[current];

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold text-center">
          Quiz 🎯
        </h1>

        {q?.question && (
          <div className="bg-[#1E293B] p-6 rounded-xl">

            <h2 className="mb-4 text-lg">
              Q{current + 1}. {q.question}
            </h2>

            {/* OPTIONS */}
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== ""}
                className="block w-full text-left bg-[#0f172a] p-3 mt-2 rounded hover:bg-[#334155]"
              >
                {opt}
              </button>
            ))}

            {/* FEEDBACK */}
            {feedback === "correct" && (
              <p className="text-green-400 mt-3">
                ✅ Correct! +10 points
              </p>
            )}

            {feedback === "wrong" && (
              <p className="text-red-400 mt-3">
                ❌ Wrong! Correct answer: {q.answer}
              </p>
            )}

          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;