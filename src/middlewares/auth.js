const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * User Authentication Middlewares
 * This module exports two middleware funtions: adminAuth and userAuth.
 * These functions simulate authentication for admin and user roles.
 * They check a hardcoded token and either allow the request to proceed or deny access.
 */

const userAuth = async (req, res, next) => {
  /**
   * Read the token from the request cookies.
   * validate the token.
   * if valid, find the user in the database.
   */

  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Please login again.");
    }

    const decodedObj = await jwt.verify(token, "VISHnu@1107");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!_id) {
      throw new Error("User not found!");
    }

    req.user = user; // Attaching the user object to the request for further use in the route handlers
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = {
  userAuth,
};
