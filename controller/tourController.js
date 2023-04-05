const Tour = require("./../model/tourModel");

//getting all the tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

//create a new tour
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
    res.status(400).json({
      status: "Failed to create tour",
      message: err,
    });
  }
};

//Get one tour
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        tours: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

//Patch a tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//delete tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Deleted Success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Deleted Error",
      message: err,
    });
  }
};

/*========================================================== */
