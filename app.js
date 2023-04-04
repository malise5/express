const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/*===================MiddleWAre=========================== */

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

/*========================================================== */
/*====================Routes================================ */

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
