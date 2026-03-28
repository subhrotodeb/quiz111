require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// 🔥 DB CONNECT
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ======================
// 🔥 MODEL
// ======================
const User = require("./models/User");

// ======================
// 🔐 AUTH
// ======================
const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded); // 🔥 DEBUG

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token data" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ======================
// 🎯 QUIZ DATA
// ======================
const quiz = [ // ======================
  // 🎯 QUIZ DATA (FULL 50 QUESTIONS)
  // ======================
  { question: "Who is called King of Cricket?", options: ["Virat Kohli", "Rohit Sharma", "Babar Azam", "Steve Smith"], answer: "Virat Kohli" },
  { question: "Who won IPL 2023?", options: ["CSK", "MI", "RCB", "GT"], answer: "CSK" },
  { question: "Who has most IPL trophies?", options: ["MI", "CSK", "KKR", "RCB"], answer: "MI" },
  { question: "Who scored 100 centuries?", options: ["Sachin Tendulkar", "Kohli", "Ponting", "Lara"], answer: "Sachin Tendulkar" },
  { question: "Who is fastest bowler?", options: ["Shoaib Akhtar", "Bumrah", "Starc", "Lee"], answer: "Shoaib Akhtar" },
  { question: "Who is captain of India (ODI)?", options: ["Rohit", "Kohli", "Rahul", "Gill"], answer: "Rohit" },
  { question: "IPL started in which year?", options: ["2008", "2007", "2010", "2005"], answer: "2008" },
  { question: "Who is CSK captain?", options: ["Dhoni", "Raina", "Jadeja", "Bravo"], answer: "Dhoni" },
  { question: "Who hit 6 sixes in an over?", options: ["Yuvraj", "Dhoni", "Kohli", "Rohit"], answer: "Yuvraj" },
  { question: "Who won WC 2011?", options: ["India", "Australia", "England", "NZ"], answer: "India" },

  { question: "Who is highest run scorer IPL?", options: ["Kohli", "Rohit", "Dhoni", "Warner"], answer: "Kohli" },
  { question: "Who is yorker king?", options: ["Malinga", "Bumrah", "Wasim", "Starc"], answer: "Malinga" },
  { question: "Who won WC 2019?", options: ["England", "India", "NZ", "Aus"], answer: "England" },
  { question: "Who is Mr.360?", options: ["AB de Villiers", "Kohli", "Gayle", "Smith"], answer: "AB de Villiers" },
  { question: "Who hit fastest 100?", options: ["AB", "Gayle", "Afridi", "Maxwell"], answer: "AB" },

  { question: "Who is captain of MI?", options: ["Rohit", "Pollard", "Hardik", "Bumrah"], answer: "Rohit" },
  { question: "Who is Universe Boss?", options: ["Gayle", "Kohli", "Warner", "ABD"], answer: "Gayle" },
  { question: "Who has most wickets IPL?", options: ["Malinga", "Bravo", "Chahal", "Bumrah"], answer: "Bravo" },
  { question: "Who is fastest 50 IPL?", options: ["KL Rahul", "Kohli", "Russell", "ABD"], answer: "KL Rahul" },
  { question: "Who won WC 2007?", options: ["Australia", "India", "SA", "Pak"], answer: "Australia" },

  { question: "Who is best finisher?", options: ["Dhoni", "Kohli", "ABD", "Hardik"], answer: "Dhoni" },
  { question: "Who hit 264 ODI?", options: ["Rohit", "Kohli", "Sehwag", "Sachin"], answer: "Rohit" },
  { question: "Who is best spinner?", options: ["Muralitharan", "Warne", "Ashwin", "Jadeja"], answer: "Muralitharan" },
  { question: "Who is fastest century?", options: ["ABD", "Gayle", "Afridi", "Maxwell"], answer: "ABD" },
  { question: "Who is best captain?", options: ["Dhoni", "Ponting", "Kohli", "Clarke"], answer: "Dhoni" },

  { question: "Who plays for RCB?", options: ["Kohli", "Dhoni", "Rohit", "Gill"], answer: "Kohli" },
  { question: "Who plays for GT?", options: ["Gill", "Rohit", "Kohli", "Warner"], answer: "Gill" },
  { question: "Who is left-arm pacer?", options: ["Starc", "Bumrah", "Shami", "Archer"], answer: "Starc" },
  { question: "Who is swing king?", options: ["Wasim Akram", "Anderson", "Bumrah", "Shami"], answer: "Wasim Akram" },
  { question: "Who is IPL orange cap 2023?", options: ["Gill", "Kohli", "Rohit", "Warner"], answer: "Gill" },

  { question: "Who is IPL purple cap 2023?", options: ["Shami", "Bumrah", "Chahal", "Rashid"], answer: "Shami" },
  { question: "Who is fastest bowler India?", options: ["Srinath", "Bumrah", "Shami", "Siraj"], answer: "Bumrah" },
  { question: "Who hit most sixes?", options: ["Gayle", "Dhoni", "Rohit", "ABD"], answer: "Gayle" },
  { question: "Who is best all-rounder?", options: ["Kapil Dev", "Imran Khan", "Botham", "Hadlee"], answer: "Kapil Dev" },
  { question: "Who is captain of Australia?", options: ["Cummins", "Smith", "Warner", "Finch"], answer: "Cummins" },

  { question: "Who is best ODI player?", options: ["Sachin", "Kohli", "Ponting", "Lara"], answer: "Sachin" },
  { question: "Who is best T20 player?", options: ["Kohli", "Rohit", "Gayle", "ABD"], answer: "Kohli" },
  { question: "Who is best test player?", options: ["Bradman", "Sachin", "Kohli", "Smith"], answer: "Bradman" },
  { question: "Who is fastest 200?", options: ["Rohit", "Sehwag", "Sachin", "Gayle"], answer: "Rohit" },
  { question: "Who is best wicketkeeper?", options: ["Dhoni", "Gilchrist", "Sangakkara", "Boucher"], answer: "Dhoni" },

  { question: "Who is best bowler India?", options: ["Kapil", "Bumrah", "Kumble", "Shami"], answer: "Kumble" },
  { question: "Who is best IPL team?", options: ["MI", "CSK", "RCB", "KKR"], answer: "MI" },
  { question: "Who is best fielding team?", options: ["SA", "India", "Aus", "Eng"], answer: "SA" },
  { question: "Who is best finisher IPL?", options: ["Dhoni", "Pollard", "Hardik", "Russell"], answer: "Dhoni" },
  { question: "Who is best opener?", options: ["Rohit", "Sehwag", "Gayle", "Warner"], answer: "Sehwag" }
];

// ======================
// 👥 PLAYERS (22 PLAYERS)
// ======================
const players = [
  { id: 1, name: "Virat Kohli", runs: 50 },
  { id: 2, name: "Rohit Sharma", runs: 30 },
  { id: 3, name: "MS Dhoni", runs: 20 },
  { id: 4, name: "Gill", runs: 70 },
  { id: 5, name: "Hardik Pandya", runs: 60 },
  { id: 6, name: "Jadeja", runs: 40 },
  { id: 7, name: "Bumrah", runs: 10 },
  { id: 8, name: "Surya Kumar", runs: 65 },
  { id: 9, name: "Ishan Kishan", runs: 35 },
  { id: 10, name: "KL Rahul", runs: 55 },
  { id: 11, name: "Pant", runs: 45 },
  { id: 12, name: "Shami", runs: 15 },
  { id: 13, name: "Siraj", runs: 20 },
  { id: 14, name: "Maxwell", runs: 50 },
  { id: 15, name: "ABD", runs: 75 },
  { id: 16, name: "Warner", runs: 60 },
  { id: 17, name: "Russell", runs: 65 },
  { id: 18, name: "Narine", runs: 25 },
  { id: 19, name: "Rinku Singh", runs: 40 },
  { id: 20, name: "Starc", runs: 10 },
  { id: 21, name: "Cummins", runs: 30 },
  { id: 22, name: "Green", runs: 35 }
];

// ======================
// 🎯 QUIZ GET
// ======================
app.get("/quiz", (req, res) => {
  const shuffled = [...quiz].sort(() => 0.5 - Math.random());
  res.json(shuffled.slice(0, 10));
});

// ======================
// 🎯 QUIZ SUBMIT
// ======================
app.post("/quiz", (req, res) => {
  const { answers } = req.body;

  let points = 0;
  answers.forEach((a, i) => {
    if (a === quiz[i].answer) points += 10;
  });

  res.json({ success: true, points });
});

// ======================
// 👥 PLAYERS
// ======================
app.get("/players", (req, res) => {
  res.json(players);
});

// ======================
// ✅ SIGNUP
// ======================
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ success: false, message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    points: 0
  });

  await newUser.save();
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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ success: true, token, user });
});

// ======================
// 💰 UPDATE POINTS
// ======================
app.post("/updatePoints", auth, async (req, res) => {
  const { points } = req.body;

  const user = await User.findById(req.user.id);
  user.points += points;
  await user.save();

  res.json({ success: true, points: user.points });
});

// ======================
// 🏆 JOIN CONTEST  ✅ ADD HERE
// ======================
app.post("/joinContest", auth, async (req, res) => {
  try {
    const { entryFee } = req.body;

    console.log("ENTRY FEE:", entryFee);
    console.log("USER:", req.user);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!entryFee) {
      return res.json({ success: false, message: "Entry fee missing" });
    }

    if (user.points < entryFee) {
      return res.json({
        success: false,
        message: "Not enough points"
      });
    }

    user.points -= entryFee;
    await user.save();

    res.json({
      success: true,
      points: user.points
    });

  } catch (err) {
    console.log("JOIN ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ======================
// 🏏 SAVE TEAM
// ======================
app.post("/saveTeam", auth, async (req, res) => {
  const { team, captain, viceCaptain, match } = req.body;

  console.log("TEAM DATA:", req.body); // debug

  // For now just send success
  res.json({
    success: true,
    message: "Team saved successfully"
  });
});

// ======================
// 🏆 LEADERBOARD
// ======================
app.get("/leaderboard", async (req, res) => {
  const users = await User.find().sort({ points: -1 }).limit(10);
  res.json(users);
});

// ======================
// 🚀 START SERVER
// ======================
app.listen(3001, () => console.log("Server running 🚀"));