const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 6000;
//middleware for posting data
app.use(express.json());

//get the data from db.json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

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
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id;
  const newtour = Object.assign({ id: newId }, req.body);
  tours.push(newtour);
  fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "Success",
      data: {
        tour: newtour,
      },
    });
  });
});

//GET BY ID
app.get("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "Success",
    data: {
      tours: tour,
    },
  });
});

app.listen(port, () => {
  console.log("====================================");
  console.log(`Listening on port ${port}......`);
  console.log("====================================");
});
