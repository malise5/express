const fs = require("fs");

/*========================================================== */

//get the data from db.json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

/*====================PARAMS=================================== */
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  console.log("kudez");

  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "Error",
      message: "Invalid id passed",
    });
  }
  next();
};
/*========================================================== */

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.createTour = (req, res) => {
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
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "Success",
    data: {
      tours: tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "Success",
    data: {
      tours: "<Updated tur hear>",
    },
  });
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === id);
  res.status(204).json({
    status: "Deleted Success",
    data: null,
  });
};

/*========================================================== */
