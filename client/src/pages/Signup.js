import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignup = () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    axios.post("http://127.0.0.1:3001/signup", {
      name,
      email,
      password
    })
      .then(res => {
        console.log("Signup response:", res.data);

        if (res.data.success === true) {
          alert("Signup successful! Please login.");

          // 🔥 FORCE HARD REDIRECT
          setTimeout(() => {
            window.location.href = "/login";
          }, 500);

        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        alert("Server not running! Please start backend.");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="bg-[#0f172a] p-8 rounded-2xl w-96 shadow-xl">
        <h1 className="text-3xl mb-6 text-center font-bold text-white">Sign Up 🔐</h1>

        <input
          placeholder="Name"
          className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-[#00CEC9] w-full py-3 rounded-lg text-black font-bold hover:opacity-90 transition"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 w-full bg-[#6C5CE7] px-6 py-2 rounded-lg"
        >
          Go to Login →
        </button>
      </div>
    </div>
  );
}

export default Signup;



