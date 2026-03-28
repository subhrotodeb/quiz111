  import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login clicked");
    console.log(email, password);

    axios.post("http://127.0.0.1:3001/login", {
      email,
      password
    })
    .then(res => {
      console.log("Response:", res.data);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/home"; // better redirect
      } else {
        alert("Invalid login");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Server not running!");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">

      {/* 🔥 LOGIN CARD */}
      <div className="bg-[#0f172a] p-8 rounded-2xl w-96 shadow-xl">

        <h1 className="text-3xl mb-6 text-center font-bold text-white">
          Sign In 🔐
        </h1>

        {/* Email */}
        <input
          placeholder="Email"
          className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
          onChange={e => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-[#00CEC9] w-full py-3 rounded-lg text-black font-bold hover:opacity-90 transition"
        >
          Login →
        </button>

        {/* Signup Link */}
        <p
          className="mt-4 text-center text-gray-400 cursor-pointer hover:text-white"
          onClick={() => navigate("/signup")}
        >
          New user? <span className="text-[#00CEC9]">Signup</span>
        </p>

      </div>
    </div>
  );
}

export default Login;