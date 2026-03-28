import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email,
      password
    })
    .then(res => {
      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.success) {

        // ✅ SAVE TOKEN
        localStorage.setItem("token", res.data.token);

        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login Successful 🚀");

        // 🔥 FORCE NAVIGATION
        window.location.href = "/home";

      } else {
        alert("Invalid credentials");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Login failed ❌");
    });
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#020617]">
    <div className="bg-[#0f172a] p-8 rounded-2xl w-96 shadow-xl">

      <h1 className="text-3xl mb-6 text-center font-bold text-white">
        Login 🔐
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-3 mb-4 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-[#00CEC9] w-full py-3 rounded-lg text-black font-bold hover:opacity-90 transition"
      >
        Login
      </button>

    </div>
  </div>
);
}

export default Login;