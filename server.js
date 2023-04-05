const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  "process.env.DATABASE_PASSWORD"
);
mongoose
  //.connect(process.env.DATABASE_LOCAL,
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!!!"));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "A  tour must have a Rating"],
  },
  price: {
    type: Number,
    required: [true, "A  tour must have a Price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "Test",
  rating: 4.5,
  price: 495,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });

const port = process.env.PORT || 8000;

/*========================================================== */
/*=======================Server Port======================*/

app.listen(port, () => {
  console.log("====================================");
  console.log(`Listening on port ${port}......`);
  console.log("====================================");
});
/*========================================================== */
/*========================Server Port===================== */
