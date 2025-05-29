const express = require("express");

const app = express();

app.get("/getUserData", (req,res) => {
  try{
    throw new Error("User data not found");
    res.send("User data retrieved successfully");
  } catch (err){
    res.status(500).send("An error occurred while retriving the user data.")
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
