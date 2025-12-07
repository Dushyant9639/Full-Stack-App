let express = require("express");
let userRouter = express.Router();
let userModel = require("../models/User");
let { verifyToken, requireRole } = require("../middlewares/auth");

// Admin role should only get all the users

userRouter.get("/", verifyToken, requireRole("admin"), async (req, res) => {
  let users = await userModel.find().select("-password");
  res.json(users);
});

//Get own profile

userRouter.get("/me", verifyToken, async (req, res) => {
  let user = await userModel.findById(req.user.id).select("-password");
  res.json(user);
});

// Update own profile

userRouter.put("/me", verifyToken, async (req, res) => {
  let { name } = req.body;
  let user = await userModel
    .findByIdAndUpdate(req.user.id, { name }, { new: true })
    .select("-password");
  res.status(200).json({msg:"User Updated",user});
});

module.exports = userRouter;
