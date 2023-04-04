const express = require("express");
const fs = require("fs");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
} = require("../controller/tourController");

const router = express.Router();

router.param("id", checkID);

/*========================================================== */

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

// app.use("/api/v1/tours", router);

/*========================================================== */
module.exports = router;
