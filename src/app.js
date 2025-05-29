const express = require("express");

const app = express();

/**
 * Request Handlers
 */

app.use("/server", (req, res) => {
  res.send("Hello from the server!");
});

app.use((req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
