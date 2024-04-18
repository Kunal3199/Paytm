const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel.jsx");
const { JWT_TOKEN, JWT_SECRET } = require("../config.jsx");
const AccountModel = require("../models/AccountModel.jsx");

const inputValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string(),
});

router.post("/user/signup", async (req, res) => {
  const { success } = inputValidation.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ error: "Please provide the Valid Input Details" });
  }
  const { username, password, email } = req.body;

  const user = await UserModel.findOne({ email });
  console.log(user);
  if (user) {
    return res.status(411).json({ error: "User ALready Exist" });
  }
  const hashPasssword = await bcrypt.hash(password, 12);
  // console.log(hashPasssword);
  const newUser = await UserModel.create({
    username,
    password: hashPasssword,
    email,
  });
  if (newUser) {
    await AccountModel.create({
      userId: newUser._id,
      Balance: 1 + Math.random() * 10000,
    });
  }
  res.json({ message: "User created Successfully" });
});

router.post("/user/signin", async (req, res) => {
  const { success } = inputValidation.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ error: "Please provide the Valid Input Details" });
  }
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(411).json({ error: "Invalid User email/password" });
  }

  const passordVerify = await bcrypt.compare(password, user.password);
  if (!passordVerify) {
    return res.status(411).json({ error: "Invalid User email/password" });
  }

  const token = jwt.sign({ userID: user._id }, JWT_SECRET);

  res.status(200).json({ message: "User Succesfully login", token });
});
module.exports = router;
