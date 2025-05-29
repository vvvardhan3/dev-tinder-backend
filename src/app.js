const express = require("express");

const app = express();

/**
 * Request Handlers
 * Order of the routes matters.
 * The first matching route will be executed.
 * If no route matches, the last handler will be executed.
 */

// this will only handle GET requests to the path "/user"
app.get('/user', (req, res) => {
  res.send({firstname: "John", lastname: "Doe"});
});

// this will only handle POST requests to the path "/user"
app.post('/user', (req, res) => {
  res.send("User created successfully!");
});

// these will match all the HTTP methods API calls of the path "/server"
app.use("/server", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
