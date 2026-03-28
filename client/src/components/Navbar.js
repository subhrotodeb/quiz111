import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-4 bg-[#1E293B] shadow-lg">
      <h1 className="text-2xl font-bold text-[#6C5CE7]">QuizLeague</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/home")}
          className="bg-[#00CEC9] px-4 py-2 rounded-lg text-black hover:scale-105 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/wallet")}
          className="bg-[#00CEC9] px-4 py-2 rounded-lg text-black"
        >
          Wallet
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#6C5CE7] px-4 py-2 rounded-lg"
        >
          Profile
        </button>
        
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");  
          }}
          className="bg-red-500 p-3 rounded-full flex items-center justify-center hover:scale-110 transition"
        >
          <FaPowerOff size={18} color="white" />
        </button>


      </div>
    </div>
  );
}

export default Navbar;