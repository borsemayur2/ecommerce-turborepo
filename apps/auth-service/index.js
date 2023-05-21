const express = require("express");
const app = express();
const PORT = process.env.PORT_AUTH || 8001;
const mongoose = require("mongoose");
const User = require("./User");
const jwt = require("jsonwebtoken");
const cors = require("cors");

mongoose.connect(
  `${process.env.MONGODB_URL}/userDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());

app.use(express.json());

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "Email and Password required!" });
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User doesn't exist" });
  } else {
    if (password !== user.password) {
      return res.json({ message: "Password Incorrect" });
    }
    const payload = {
      email,
      name: user.name,
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else
        return res.json({ token: token, message: "Logged in successfully!" });
    });
  }
});

app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.json({ message: "Email, Name and Password required!" });
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "User already exists" });
  } else {
    const newUser = new User({
      email,
      name,
      password,
    });
    newUser.save();
    return res.json({ user: newUser, message: "User created!" });
  }
});

app.listen(PORT, () => {
  console.log(`Auth-Service at ${PORT}`);
});
