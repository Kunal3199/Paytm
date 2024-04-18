const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel.jsx");
const AccountModel = require("../models/AccountModel.jsx");

const Router = express.Router();

Router.post("/transfer", async (req, res) => {
  const { to, amount } = req.body;
  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    const FromUser = await AccountModel.findOne({ userId: req.userID })
      .session(sess)
      .populate("userId");

    console.log(FromUser);
    if (!FromUser) {
      return res.status(400).json({ error: "Accont doesnot found" });
    }
    if (FromUser.Balance < amount) {
      return res.status(400).json({ error: "Insufficient Balance" });
    }

    const ToUser = await AccountModel.findOne({ userId: to }).session(sess);
    if (!FromUser) {
      return res
        .status(400)
        .json({ error: "Sending To Account doesnot found" });
    }
    await FromUser.updateOne(
      { userId: req.userID },
      { $inc: { Balance: -amount } }
    ).session(sess);
    await AccountModel.updateOne(
      { userId: to },
      { $inc: { Balance: amount } }
    ).session(sess);
    sess.commitTransaction();
    res.status(200).json({ message: "Tranfer Amount Successfully" });
  } catch (error) {
    console.log(error);
  }
});

Router.get("/balance", async (req, res) => {
  const UserAccount = await AccountModel.findOne({ userId: req.userID });
  // if(!UserAccount){
  //   return res.status(200).json({error:"Invalid Attempt or userAccount doesnot exist"})
  // }

  res.status(200).json({ Balance: UserAccount.Balance });
});
module.exports = Router;
