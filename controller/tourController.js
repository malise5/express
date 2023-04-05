const Tour = require("./../model/tourModel");
const APIFeatures = require("./../utis/apiFeatures");

//MIDDLEWARE
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

//getting all the tours
exports.getAllTours = async (req, res) => {
  try {
    // //1 query FILTERING the linked list
    // const queryObj = { ...req.query };
    // const excludedFields = ["page", "sort", "limit", "fields"];
    // excludedFields.forEach((field) => delete queryObj[field]);

    // //Advance filtering adding $gte
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // // const query = Tour.find(queryObj);
    // let query = Tour.find(JSON.parse(queryStr));

    //2 SORTING query
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   // query = query.sort(req.query.sort);
    //   query = query.sort(sortBy);
    // } else {
    //   // query = query.sort(req.query.sort);
    //   query = query.sort("-createdAt");
    // }

    // 3 FIELD LIMITING
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    //4 PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // //page=2$limit=10  (1-10 = page1, 11-20 =page2, 21-30 =page3)
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip > numTours) throw new Error("This page does not exist");
    // }

    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    // const tours = await query;
    const tours = await features.query;
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
//AGGREGATES BY RATINGS AVERAGE pipeline()
exports.getTourStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 3.0 } },
      },
      {
        $group: {
          // _id: "$difficulty",
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: "EASY" } },
      // },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//AGGREGATES BY MONTHLY PLAN pipeline()

exports.getMonthlyPlan = async (req, res) => {
  try {
    // const year = parseInt(req.params.year, 10);
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDate", //destructuring
      },
      {
        $match: {
          startDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDate" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" }, //array of tour
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 15,
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
