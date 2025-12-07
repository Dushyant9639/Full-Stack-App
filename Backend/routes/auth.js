let express = require("express");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let authRouter = express.Router();
let UserModel = require("../models/User");

// Register a user

authRouter.post("/register", async (req, res) => {
  let { name, password, email, role } = req.body;
  if (!name || !email || !password)
    return res.status(404).json({ msg: "Missing details" });
  try {
    let existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error in registration", err });
  }
});

//LogIn user

authRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ msg: "Missing credentials" });
  try {
    let user = await UserModel.findOne({email});
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
    let match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });
    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      msg: "Logged In",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Error in logging user" });
  }
});

module.exports = authRouter;
