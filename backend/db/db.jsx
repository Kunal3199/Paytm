const mongoose = require("mongoose");
const express = require("express");

async function ConnectDB() {
  await mongoose.connect(
    "mongodb+srv://Kunal:Ayush@paytm.n6rckn4.mongodb.net/"
  );
  console.log("DataBase Connected");
}

module.exports = ConnectDB;
