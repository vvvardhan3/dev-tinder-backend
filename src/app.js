const express = require("express");

const app = express();

// one-way error handling
app.use("/", (err, req, res, next) => {
  res.status(500).send("An error occurred while retrieving the user data( method-2).")
})

// two-way error handling
app.get("/getUserData", (req,res) => {
  try{
    throw new Error("User data not found");
    res.send("User data retrieved successfully");
  } catch (err){
    res.status(500).send("An error occurred while retrieving the user data.")
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
