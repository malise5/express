const Tour = require("./../model/tourModel");

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "Success",
  //   data: {
  //     tours: tour,
  //   },
  // });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      tours: "<Updated tur hear>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "Deleted Success",
    data: null,
  });
};

/*========================================================== */
