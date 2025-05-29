const express = require("express");

const app = express();

app.use("/", (req,res, next) => {
  next()
})

app.use(
  "/user",
  (req, res, next) => {
    // res.send("User-1 route is working!");
    next();
  },
  (req, res) => {
    res.send("User-2 route is working!");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
