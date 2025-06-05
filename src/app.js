const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

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
 * User Login API Endpoint
 * First, It will check the user by emailId and then compare the provided password with the hashed password in the database.
 */

/**
 * Implementation of JWT
 * We will generate a JWT token after successful login and send it back to the user.
 * The user can then use this token to access the protected routes in the application.
 */

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // find the user by emailId
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // If the password is valid, create a JWT token.
      const jwToken = await jwt.sign({ _id: user._id }, "VISHnu@1107");

      // Set the JWT token in a cookie and send it to the user.
      res.cookie("token", jwToken);
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

/**
 * User Profile API Endpoint
 */

app.get("/profile", async (req, res) => {
  try {
    // define cookie
    const cookies = req.cookies;

    // get the token from the cookie
    const { token } = cookies;

    if (!token) {
      throw new Error("Please login again.")
    }

    // validate the token
    const decodedMessage = jwt.verify(token, "VISHnu@1107");

    const { _id } = decodedMessage;

    // find the user by _id
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found!");
    }

    // send the user data as response
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
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
