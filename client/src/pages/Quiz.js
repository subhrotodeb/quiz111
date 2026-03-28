import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/quiz")
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAnswer = (option) => {
    const correctAnswer = questions[current].answer;

    let points = Number(localStorage.getItem("points")) || 0;

    if (option === correctAnswer) {
      setFeedback("correct");

      localStorage.setItem("points", points + 10);
      setScore(prev => prev + 10);
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
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-2xl">
          🎉 Quiz Completed!
          <p className="mt-4 text-green-400">
            Your Score: {score}
          </p>
        </div>
      </>
    );
  }

  // ✅ CURRENT QUESTION ONLY
  const q = questions[current];

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold text-center">
          Quiz 🎯
        </h1>

        {q && (
          <div className="bg-[#1E293B] p-6 rounded-xl">

            <h2 className="mb-4 text-lg">
              Q{current + 1}. {q.question}
            </h2>

            {/* OPTIONS */}
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}   // ✅ FIXED
                disabled={feedback !== ""}          // ✅ prevent multiple clicks
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