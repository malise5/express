const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { log } = require("console");
const morgan = require("morgan");

const app = express();
const port = 6000;

//middleware for posting data
app.use(morgan("dev"));
app.use(express.json());

//MIDDLEWARE
app.use((req, res, next) => {
  console.log("Hallow from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//get the data from db.json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

//GET
app.get("/api/v1/tours", (req, res) => {
  console.log(req.requestTime);
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

  if (!tour) {
    return res.status(404).json({
      status: "Error",
      message: "Invalid id passed",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tours: tour,
    },
  });
});

//PATCH REQUEST
app.patch("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "Error",
      message: "Invalid id passed",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tours: "<Updated tur hear>",
    },
  });
});

//DELETE
app.delete("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "Error",
      message: "Invalid id passed",
    });
  }

  res.status(204).json({
    status: "Deleted Success",
    data: null,
  });
});

//Users routes
app.get("/api/v1/users", (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Not yet defined",
  });
});

app.post("/api/v1/users", (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Not yet defined",
  });
});

app.get("/api/v1/users/:id", (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Not yet defined",
  });
});
app.patch("/api/v1/users/:id", (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Not yet defined",
  });
});

app.delete("/api/v1/users/:id", (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Not yet defined",
  });
});

app.listen(port, () => {
  console.log("====================================");
  console.log(`Listening on port ${port}......`);
  console.log("====================================");
});
