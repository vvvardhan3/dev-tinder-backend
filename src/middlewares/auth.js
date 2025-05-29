/**
 * Admin and User Authentication Middlewares
 * This module exports two middleware funtions: adminAuth and userAuth.
 * These functions simulate authentication for admin and user roles.
 * They check a hardcoded token and either allow the request to proceed or deny access.
 */

const adminAuth = (req, res, next) => {
  console.log("Admin authentication started!");
  // Simulate admin authentication logic
  const token = "xyz";
  const isAuthenticated = token === "xyz";
    if (isAuthenticated) {
        console.log("Admin authenticated successfully!");
        next(); // Proceed to the next middleware or route handler
    } else {
        console.log("Admin authentication failed!");
        res.status(403).send("Access denied: Admins only");
    }
};


const userAuth = (req, res, next) => {
  console.log("user authentication started!");
  // Simulate user authentication logic
  const token = "xyz";
  const isAuthenticated = token === "xyz";
    if (isAuthenticated) {
        console.log("User authenticated successfully!");
        next(); // Proceed to the next middleware or route handler
    } else {
        console.log("User authentication failed!");
        res.status(403).send("Access denied: Users only");
    }
};

module.exports = {
  adminAuth, userAuth
};
