const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// apis
app.post("/signup", async (req, res) => {
  console.log(req.body);

  userObject = req.body;

  // Creating a new user Instance and saving it to the database.
  const user = new User(userObject);
  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error adding User: " + err.message);
  }
});

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
