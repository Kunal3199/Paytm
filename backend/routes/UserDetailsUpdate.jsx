const express = require("express");
const UserModel = require("../models/UserModel.jsx");

const Router = express.Router();

Router.patch("/user", async (req, res) => {
  const { Fname, Lname, username } = req.body;
  console.log("userId", req.userID);
  await UserModel.findByIdAndUpdate(req.userID, {
    Fname,
    Lname,
    username,
  });
  res.status(200).send("UserDetails Updated");
});

Router.get("/users", async (req, res, next) => {
  try {
    const filter = req.query.filter || ""; // No need to convert to string
    console.log("Filter:", filter);

    const users = await UserModel.find({
      $or: [
        { Fname: { $regex: filter } }, // Case-insensitive match
        { Lname: { $regex: filter } },
      ],
    });

    res.status(200).json({
      user: users.map((user) => ({
        username: user.username,
        email: user.email,
        firstname: user.Fname,
        lastname: user.Lname,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});
module.exports = Router;
