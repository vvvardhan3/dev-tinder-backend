const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

/**
 * User Signup API Endpoint
 * This endpoint allows users to sign up by providing their details.
 */
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  // Password Encryption using bcrypt
  const passwordHashed = await bcrypt.hash(password, 10);
  console.log("Password Hashed: ", passwordHashed);

  // Creating a new user Instance and saving it to the database.
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHashed,
  });
  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error adding User: " + err.message);
  }
});

/**
 * Feed data API Endpoint
 * Show all the Users in the database.
 */

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

/**
 * User Delete API Endpoint
 * This endpoint allows users to delete their account by providing their ID's
 */

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

/**
 * User Update API Endpoint
 * This endpoint allows users to update their details by providing their ID's
 */

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    /**
     * API Level Validation
     */

    const ALLOWED_FIELDS = ["age", "about", "skills", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_FIELDS.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error(
        "Invalid fields provided for update. Allowed fields are: " +
          ALLOWED_FIELDS.join(", ")
      );
    }

    // Validation to check if the user is sending more than 10 skills into the DB.
    if (data?.skills.length > 10) {
      throw new Error("You can only add up to 10 Skills!");
    }

    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

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
