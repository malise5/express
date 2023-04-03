const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 6000;
//middleware for posting data
app.use(express.json());

//get the data from db.json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/db.json`));

//GET
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

//POST
app.post("/api/v1/tours", (req, res) => {
  console.log("================DATA================");
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id;
  const newtour = Object.assign({ id: newId }, req.body);
  tours.push(newtour);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(tours), (err) => {
    res.status(201).json{};
  });
  res.send("Done");
  console.log("=================DATA================");
});

app.listen(port, () => {
  console.log("====================================");
  console.log(`Listening on port ${port}......`);
  console.log("====================================");
});
