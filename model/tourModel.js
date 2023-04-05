const mongoose = require("mongoose");

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

module.exports = Tour;
