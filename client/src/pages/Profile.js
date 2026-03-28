import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState({});
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    setMobile(localStorage.getItem("mobile") || "");
    setDob(localStorage.getItem("dob") || "");
    setImage(localStorage.getItem("profilePic") || "");
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("profilePic", reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("dob", dob);
    alert("Profile Saved ✅");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-2">

        {/* 🔥 PROFILE CARD */}
        <div className="bg-[#0f172a] w-full max-w-md p-4 rounded-2xl shadow-xl">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            My Profile 👤
          </h1>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={image || "https://via.placeholder.com/100"}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-[#00CEC9] object-cover"
            />

            <label className="mt-3 cursor-pointer text-sm text-[#00CEC9]">
              Change Photo
              <input type="file" onChange={handleImage} hidden />
            </label>
          </div>

          {/* NAME */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Name</p>
            <div className="bg-[#020617] border border-gray-700 p-3 rounded-lg text-white">
              {user.name}
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Email</p>
            <div className="bg-[#020617] border border-gray-700 p-3 rounded-lg text-white overflow-x-auto whitespace-nowrap">
              {user.email}
            </div>
          </div>

          {/* MOBILE */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Mobile</p>
            <input
              placeholder="Enter mobile number"
              className="p-3 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>

          {/* DOB */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Date of Birth</p>
            <input
              type="date"
              className="p-3 w-full rounded-lg bg-[#020617] text-white border border-gray-700 focus:outline-none"
              value={dob}
              onChange={e => setDob(e.target.value)}
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={saveProfile}
            className="w-full mt-4 bg-[#00CEC9] py-3 rounded-lg text-black font-bold hover:scale-105 transition"
          >
            Save Profile 💾
          </button>

        </div>
      </div>
    </>
  );
}

export default Profile;