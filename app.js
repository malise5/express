const express = require("express");
const app = express();

const port = 6000;

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome from the SERVER sIDE" });
// });

app.get("/api/v1/tours", (req, res) => {});

app.listen(port, () => {
  console.log("====================================");
  console.log(`Listening on port ${port}......`);
  console.log("====================================");
});
