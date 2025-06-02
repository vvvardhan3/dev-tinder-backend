const mongoose = require("mongoose");

// MongoDB Connection URL
const url =
  "mongodb+srv://NamasteNodeJs:UInkajndkjsnUIUHBGIbdkjasnkj@cluster0.m2y48vo.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(url);
};

module.exports = connectDB;


