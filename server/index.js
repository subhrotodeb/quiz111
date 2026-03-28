require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// ✅ CORS FIX
app.use(cors({ origin: "*" }));
app.use(express.json());

// ======================
// 🔥 DB CONNECT
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error:", err));

// ======================
// 🔥 MODEL
// ======================
const User = require("./models/User");

// ======================
// 🔐 AUTH
// ======================
const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ======================
// 🧠 ROOT ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ======================
// 📚 QUIZ
// ======================
const quiz = [
  { question: "Who is called King of Cricket?", options: ["Virat Kohli","Rohit Sharma","Babar Azam","Steve Smith"], answer: "Virat Kohli" },
  { question: "Who won IPL 2023?", options: ["CSK","MI","RCB","GT"], answer: "CSK" },
  { question: "Who has most IPL trophies?", options: ["MI","CSK","KKR","RCB"], answer: "MI" }
];

app.get("/quiz", (req, res) => {
  res.json(quiz);
});

// ======================
// ✅ SIGNUP
// ======================
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ success: false });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    points: 0
  });

  await user.save();

  res.json({ success: true });
});

// ======================
// ✅ LOGIN
// ======================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ success: false });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ success: true, token, user });
});

// ======================
// 💰 UPDATE POINTS
// ======================
app.post("/updatePoints", auth, async (req, res) => {
  const { points } = req.body;

  const user = await User.findById(req.user.id);

  user.points = (user.points || 0) + points;
  await user.save();

  res.json({ success: true, points: user.points });
});

// ======================
// 🏆 JOIN CONTEST
// ======================
app.post("/joinContest", auth, async (req, res) => {
  const { entryFee } = req.body;

  const user = await User.findById(req.user.id);

  if (user.points < entryFee) {
    return res.json({ success: false, message: "Not enough points" });
  }

  user.points -= entryFee;
  await user.save();

  res.json({ success: true, points: user.points });
});

// ======================
// 🚀 START SERVER
// ======================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});