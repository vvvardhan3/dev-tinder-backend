const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Admin
app.use("/admin", adminAuth, (req, res, next) => {
  console.log("Admin middleware executed");
  next();
});

app.get("/admin/getallData", (req, res, next) => {
  res.send("All data retrieved successfully");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted successfully");
});

// User
app.post("user/login", (req, res, next) => {
  console.log("User login successful");
});

app.get("user/data", userAuth, (req, res, next) => {
  res.send("User data retrieved successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
