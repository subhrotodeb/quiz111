const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary storage
let users = [];

// Quiz Data
const quiz = [
  { question: "Who is called King of Cricket?", options: ["Virat Kohli","Rohit Sharma","Babar Azam","Steve Smith"], answer: "Virat Kohli" },
  { question: "Who won IPL 2023?", options: ["CSK","MI","RCB","GT"], answer: "CSK" },
  { question: "Who has most IPL trophies?", options: ["MI","CSK","KKR","RCB"], answer: "MI" },
  { question: "Who scored 100 centuries?", options: ["Sachin Tendulkar","Kohli","Ponting","Lara"], answer: "Sachin Tendulkar" },
  { question: "Who is fastest bowler?", options: ["Shoaib Akhtar","Bumrah","Starc","Lee"], answer: "Shoaib Akhtar" },
  { question: "Who is captain of India (ODI)?", options: ["Rohit","Kohli","Rahul","Gill"], answer: "Rohit" },
  { question: "IPL started in which year?", options: ["2008","2007","2010","2005"], answer: "2008" },
  { question: "Who is CSK captain?", options: ["Dhoni","Raina","Jadeja","Bravo"], answer: "Dhoni" },
  { question: "Who hit 6 sixes in an over?", options: ["Yuvraj","Dhoni","Kohli","Rohit"], answer: "Yuvraj" },
  { question: "Who won WC 2011?", options: ["India","Australia","England","NZ"], answer: "India" },

  { question: "Who is highest run scorer IPL?", options: ["Kohli","Rohit","Dhoni","Warner"], answer: "Kohli" },
  { question: "Who is yorker king?", options: ["Malinga","Bumrah","Wasim","Starc"], answer: "Malinga" },
  { question: "Who won WC 2019?", options: ["England","India","NZ","Aus"], answer: "England" },
  { question: "Who is Mr.360?", options: ["AB de Villiers","Kohli","Gayle","Smith"], answer: "AB de Villiers" },
  { question: "Who hit fastest 100?", options: ["AB","Gayle","Afridi","Maxwell"], answer: "AB" },

  { question: "Who is captain of MI?", options: ["Rohit","Pollard","Hardik","Bumrah"], answer: "Rohit" },
  { question: "Who is Universe Boss?", options: ["Gayle","Kohli","Warner","ABD"], answer: "Gayle" },
  { question: "Who has most wickets IPL?", options: ["Malinga","Bravo","Chahal","Bumrah"], answer: "Bravo" },
  { question: "Who is fastest 50 IPL?", options: ["KL Rahul","Kohli","Russell","ABD"], answer: "KL Rahul" },
  { question: "Who won WC 2007?", options: ["Australia","India","SA","Pak"], answer: "Australia" },

  { question: "Who is best finisher?", options: ["Dhoni","Kohli","ABD","Hardik"], answer: "Dhoni" },
  { question: "Who hit 264 ODI?", options: ["Rohit","Kohli","Sehwag","Sachin"], answer: "Rohit" },
  { question: "Who is best spinner?", options: ["Muralitharan","Warne","Ashwin","Jadeja"], answer: "Muralitharan" },
  { question: "Who is fastest century?", options: ["ABD","Gayle","Afridi","Maxwell"], answer: "ABD" },
  { question: "Who is best captain?", options: ["Dhoni","Ponting","Kohli","Clarke"], answer: "Dhoni" },

  { question: "Who plays for RCB?", options: ["Kohli","Dhoni","Rohit","Gill"], answer: "Kohli" },
  { question: "Who plays for GT?", options: ["Gill","Rohit","Kohli","Warner"], answer: "Gill" },
  { question: "Who is left-arm pacer?", options: ["Starc","Bumrah","Shami","Archer"], answer: "Starc" },
  { question: "Who is swing king?", options: ["Wasim Akram","Anderson","Bumrah","Shami"], answer: "Wasim Akram" },
  { question: "Who is IPL orange cap 2023?", options: ["Gill","Kohli","Rohit","Warner"], answer: "Gill" },

  { question: "Who is IPL purple cap 2023?", options: ["Shami","Bumrah","Chahal","Rashid"], answer: "Shami" },
  { question: "Who is fastest bowler India?", options: ["Srinath","Bumrah","Shami","Siraj"], answer: "Bumrah" },
  { question: "Who hit most sixes?", options: ["Gayle","Dhoni","Rohit","ABD"], answer: "Gayle" },
  { question: "Who is best all-rounder?", options: ["Kapil Dev","Imran Khan","Botham","Hadlee"], answer: "Kapil Dev" },
  { question: "Who is captain of Australia?", options: ["Cummins","Smith","Warner","Finch"], answer: "Cummins" },

  { question: "Who is best ODI player?", options: ["Sachin","Kohli","Ponting","Lara"], answer: "Sachin" },
  { question: "Who is best T20 player?", options: ["Kohli","Rohit","Gayle","ABD"], answer: "Kohli" },
  { question: "Who is best test player?", options: ["Bradman","Sachin","Kohli","Smith"], answer: "Bradman" },
  { question: "Who is fastest 200?", options: ["Rohit","Sehwag","Sachin","Gayle"], answer: "Rohit" },
  { question: "Who is best wicketkeeper?", options: ["Dhoni","Gilchrist","Sangakkara","Boucher"], answer: "Dhoni" },

  { question: "Who is best bowler India?", options: ["Kapil","Bumrah","Kumble","Shami"], answer: "Kumble" },
  { question: "Who is best IPL team?", options: ["MI","CSK","RCB","KKR"], answer: "MI" },
  { question: "Who is best fielding team?", options: ["SA","India","Aus","Eng"], answer: "SA" },
  { question: "Who is best finisher IPL?", options: ["Dhoni","Pollard","Hardik","Russell"], answer: "Dhoni" },
  { question: "Who is best opener?", options: ["Rohit","Sehwag","Gayle","Warner"], answer: "Sehwag" }
];

// Players Data
const players = [
  { id: 1, name: "Virat Kohli", runs: 50 },
  { id: 2, name: "Rohit Sharma", runs: 30 },
  { id: 3, name: "MS Dhoni", runs: 20 },
  { id: 4, name: "Gill", runs: 70 }
];

// ================= QUIZ =================

app.get("/quiz", (req, res) => {

  // 🔀 Step 1: Shuffle questions randomly
  const shuffled = [...quiz].sort(() => 0.5 - Math.random());

  // 🎯 Step 2: Pick only 10 questions
  const selected = shuffled.slice(0, 10);

  // 📤 Step 3: Send to frontend
  res.json(selected);
});

app.post("/quiz", (req, res) => {
  const { answers } = req.body;

  if (!answers || answers.length === 0) {
    return res.json({
      success: false,
      message: "No answers submitted"
    });
  }

  let points = 0;

  answers.forEach((a, i) => {
    if (a === quiz[i].answer) points += 10;
  });

  res.json({
    success: true,
    points
  });
});

// ================= PLAYERS =================

app.get("/players", (req, res) => {
  res.json(players);
});

// ================= SIGNUP =================

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Validate empty
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required"
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({
      success: false,
      message: "Invalid email format"
    });
  }

  // Check duplicate
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.json({
      success: false,
      message: "User already exists"
    });
  }

  // Save user
  users.push({ name, email, password });

  console.log("Users after signup:", users);

  res.json({
    success: true,
    message: "Signup successful"
  });
});

// ================= LOGIN =================

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Users:", users);
  console.log("Login input:", req.body);

  // Validate empty
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required"
    });
  }

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials"
    });
  }

  res.json({
    success: true,
    user
  });
});

// ================= SERVER =================

app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});