const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();

/**
 * User Signup API Endpoint
 * This endpoint allows users to sign up by providing their details.
 */
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Password Encryption using bcrypt
    const passwordHashed = await bcrypt.hash(password, 10);

    // Creating a new user Instance and saving it to the database.
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHashed,
    });

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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // find the user by emailId
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid email or password");
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // If the password is valid, create a JWT token.
      const jwToken = await user.getJWT();

      // Set the JWT token in a cookie and send it to the user.
      res.cookie("token", jwToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // cookie expires in 1 day
      });
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

module.exports = authRouter;
