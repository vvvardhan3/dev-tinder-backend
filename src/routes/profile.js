const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

/**
 * User Profile API Endpoint
 */

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // The user object is attached to the request by the userAuth middleware
    
    // send the user data as response
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});


module.exports = profileRouter;