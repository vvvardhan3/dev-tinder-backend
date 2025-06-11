const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { userAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestsRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestsRouter);

// Connect to MongoDB and Start the server
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
